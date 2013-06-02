"use strict";


module.exports = AppSocketIO;


function AppSocketIO (app_server, socket_io, AppSocketPublisher, AppSocketSubscriber) {

	this.app_server = app_server;


	if (socket_io) this.socket_io = socket_io;

}


AppSocketIO.prototype.socket_io = require('socket_io');

AppSocketIO.prototype.AppSocketPublisher = require('./app_socket_publisher');

AppSocketIO.prototype.AppSocketSubscriber = require('./app_socket_subscriber');


AppSocketIO.prototype.connect = function () {

	this.socket_io.listen(this.app_server.http_server);

};