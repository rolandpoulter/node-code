"use strict";


exports = module.exports = AppSocketIO;


function AppSocketIO (socket_uri, app_ui, ClientSession) {

	this.socket = io.connect(socket_uri);

	this.app_ui = app_ui;


	if (ClientSession) this.ClientSession = ClientSession;


	new this.ClientSession(this.socket).initialize(this.app_ui);

}


AppSocketIO.prototype.ClientSession = require('./client_session');
