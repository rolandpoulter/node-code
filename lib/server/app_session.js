"use strict";


module.exports = AppSession;


function AppSession (app, io_socket, session_store, parseCookie, Project) {

  this.app = app;

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


AppSession.prototype.socketAutorizer = function (session_handshake, acceptSession) {

	var cookies = this.parseCookie(session_handshake.headers.cookie),
      session_id = cookies[this.cookie_key];

  this.session_store.load(session_id, this.loadSessionAndAuthorize.bind(
  	this,
  	session_id,
  	session_handshake,
  	cookies,
  	acceptSession
  ));

};


AppSession.prototype.loadSessionAndAuthorize = function (
	session_id,
	session_handshake,
	cookies,
	acceptSession,
	error,
	session
) {

  if (error) return accept(error);
 

  if (!session) session = this.session_store.createSession({
    sessionID: session_id,
    sessionStore: this.session_store
  }, {
    cookie: cookies
  });


  session_handshake.session = session;


  this.Project.load_session(
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
