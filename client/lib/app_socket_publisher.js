"use strict";


exports = module.exports = AppSocketPublisher;


function AppSocketPublisher (events, socket, AppSocketProjectPublisher) {
	this.evnets = events;
	this.socket = socket;

	AppSocketProjectPublisher = AppSocketProjectPublisher || this.AppSocketProjectPublisher;

	this.project = new AppSocketProjectPublisher(this.events, this.socket);
}


AppSocketPublisher.prototype.AppSocketProjectPublisher = require('./app_socket_project_publisher');
