"use strict";


module.exports = AppSession;


function AppSession (app_server, io_socket, session_store, parseCookie, Project) {

	this.app_server = app_server;

	this.io_socket = io_socket;

	this.session_store = session_store;


	if (Project) this.Project = Project;


	this.io_socket.configure(this.configureSocketAuthorizer.bind(this));

}


AppSession.prototype.parseCookie = require('express/node_modules/cookie').parse;

AppSession.prototype.Project = require('./project');


AppSession.prototype.configureSocketAuthorizer = function () {

	this.io_socket.set('authorization', this.socketAutorizer.bind(this));

};


AppSession.prototype.socketAutorizer = function (session_data, acceptSession) {

	var cookies = this.parseCookie(session_data.headers.cookie),
      session_id = cookies[this.cookie_key];

  this.session_store.load(session_id, this.loadSessionAndAuthorize.bind(
  	this,
  	session_id,
  	session_data,
  	cookies,
  	acceptSession
  ));

};


AppSession.prototype.loadSessionAndAuthorize = function (
	session_id,
	session_data,
	cookies,
	acceptSession,
	error,
	session
) {

  if (error) return accept(error);
 

  if (!session) session = this.session_store.createSession({
    sessionID: session_id,
    sessionStore: session_store
  }, {
    cookie: cookies
  });


  session_data.session = session;


  Project.load_session(
  	this.app,
  	session,
  	this.loadProjectsFromSessionAndAuthorize.bind(this, session, acceptSession)
  );

};


AppSession.prototype.loadProjectsFromSessionAndAuthorize = function (session, acceptSession, error) {

  session.save();

	if (error) return acceptSession(error);

	acceptSession(null, true);

};
