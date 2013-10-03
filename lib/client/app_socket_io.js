"use strict";


require('./client_session');


exports = module.exports = dependency.injection(AppSocketIO);


function AppSocketIO (socket_uri, app_ui, ClientSession) {

	this.socket = io.connect(socket_uri);

	this.app_ui = app_ui;


	new ClientSession(this.socket).initialize(this.app_ui);

}
