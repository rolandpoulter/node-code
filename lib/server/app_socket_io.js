"use strict";


dependency.assign('socket_io', require('socket.io'));


exports = module.exports = dependency.injection(AppSocketIO);


function AppSocketIO (app_server, socket_io) {

	this.app_server = app_server;

}


AppSocketIO.prototype.connect = function () {

	this.io = this.socket_io.listen(this.app_server.http_server);

};
