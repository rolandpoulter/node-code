"use strict";


dependency.assign('ParseCookie', require('express/node_modules/cookie').parse);


require('./channel_io');

require('./session');


exports = module.exports = dependency.injection(SessionManager);


function SessionManager (
  app_config,
  entity_cache,
  web_socket_io_connection,
  nedb_database_client,
  NedbSessionStore,
  ChannelIO,
  Session,
  ParseCookie
) {

  this.app_config = app_config;

  this.entity_cache = entity_cache;


	this.session_store = new this.NedbSessionStore(nedb_database_client);


  this.io = web_socket_io_connection;

	this.io.configure(this.configureSocketAuthorizer.bind(this));

  this.io.sockets.on('connection', this.onSocketConnection.bind(this));

}


SessionManager.prototype.onSocketConnection = function (messenger) {

  messenger.session_data = messenger.handshake.session;

  messenger.channel_io = new this.ChannelIO(messenger);


  messenger.session = new this.Session(
    messenger.channel_io,
    messenger.session_data,
    this.entity_cache
  );

};


SessionManager.prototype.configureSocketAuthorizer = function () {

	this.io.set('authorization', this.socketAuthorizer.bind(this));

};


SessionManager.prototype.socketAuthorizer = function (session_handshake, acceptSession) {

	var cookies = this.ParseCookie(session_handshake.headers.cookie),
      session_id = cookies[this.app_config.cookie_key];

  this.session_store.load(session_id, this.loadSessionAndAuthorize.bind(
  	this,
  	session_id,
  	session_handshake,
  	cookies,
  	acceptSession
  ));

};


SessionManager.prototype.loadSessionAndAuthorize = function (
	session_id,
	session_handshake,
	cookies,
	acceptSession,
	error,
	session
) {

  if (error) return accept(error);
 

  if (!session) {
    session = this.session_store.createSession({
      sessionID: session_id,
      sessionStore: this.session_store
    }, {
      cookie: cookies
    });
  }


  session_handshake.session = session;


  acceptSession(null, true);

};
