"use strict";


exports = module.exports = AppSocketSubscriber;


function AppSocketSubscriber (events, socket, AppSocketProjectSubscriber) {
	this.evnets = events;
	this.socket = socket;

	AppSocketProjectSubscriber = AppSocketProjectSubscriber || this.AppSocketProjectSubscriber

	this.project = new AppSocketProjectSubscriber(this.events, this.socket);
}


AppSocketSubscriber.prototype.AppSocketProjectSubscriber = require('./app_socket_project_subscriber');
