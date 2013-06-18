"use strict";


module.exports = AppSocketIO;


function AppSocketIO (app_server, socket_io, AppSocketPublishers, AppSocketSubscribers) {

	this.app_server = app_server;


	if (socket_io) this.socket_io = socket_io;


	if (AppSocketPublishers) this.AppSocketPublishers = AppSocketPublishers;

	if (AppSocketSubscribers) this.AppSocketSubscribers = AppSocketSubscribers;

}


AppSocketIO.prototype.socket_io = require('socket.io');


AppSocketIO.prototype.AppSocketPublishers = require('./app_socket_publishers');

AppSocketIO.prototype.AppSocketSubscribers = require('./app_socket_subscribers');


AppSocketIO.prototype.connect = function () {

	this.io_socket = this.socket_io.listen(this.app_server.http_server);


	this.publishers = new this.AppSocketPublishers(this.io_socket);

	this.subscribers = new this.AppSocketSubscribers(this.io_socket, this.publishers);

};
