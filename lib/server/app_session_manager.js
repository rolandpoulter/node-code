"use strict";


module.exports = AppSession;


function AppSession (
  app,
  config,
  io,
  session_store,
  parseCookie,
  Client
) {

  this.app = app;

  this.config = config;

	this.io = io;

	this.session_store = session_store;


  if (parseCookie) this.parseCookie = parseCookie;

  if (Client) this.Client = Client;


	this.io.configure(this.configureSocketAuthorizer.bind(this));

  this.io.sockets.on('connection', this.onSocketConnection.bind(this));

}


AppSession.prototype.parseCookie = require('express/node_modules/cookie').parse;

AppSession.prototype.Client = require('./client');


AppSession.prototype.onSocketConnection = function (socket) {

  socket.session = socket.handshake.session;

  new this.Client(this.app, socket, socket.session);

};


AppSession.prototype.configureSocketAuthorizer = function () {

	this.io.set('authorization', this.socketAuthorizer.bind(this));

};


AppSession.prototype.socketAuthorizer = function (session_handshake, acceptSession) {

	var cookies = this.parseCookie(session_handshake.headers.cookie),
      session_id = cookies[this.config.cookie_key];

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


  acceptSession(null, true);

};
