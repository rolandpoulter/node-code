"use strict";


module.exports = AppSocketIO;


function AppSocketIO (app_server, socket_io, AppSocketPublisher, AppSocketSubscriber) {

	this.app_server = app_server;


	if (socket_io) this.socket_io = socket_io;


	if (AppSocketPublisher) this.AppSocketPublisher = AppSocketPublisher;

	if (AppSocketSubscriber) this.AppSocketSubscriber = AppSocketSubscriber;

}


AppSocketIO.prototype.socket_io = require('socket.io');


AppSocketIO.prototype.AppSocketPublisher = require('./app_socket_publisher');

AppSocketIO.prototype.AppSocketSubscriber = require('./app_socket_subscriber');


AppSocketIO.prototype.connect = function () {

	this.io_socket = this.socket_io.listen(this.app_server.http_server);


	this.publisher = new this.AppSocketPublisher(this.app_server, this.io_socket);

	this.subscriber = new this.AppSocketSubscriber(this.app_server, this.io_socket, this.publisher);

};
