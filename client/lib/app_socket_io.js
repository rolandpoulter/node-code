"use strict";


exports = module.exports = AppSocketIO;


function AppSocketIO (app_events, socket_uri, AppSocketPublisher, AppSocketSubscriber) {
	this.events = app_events;
	this.socket = io.connect(socket_uri);

	AppSocketPublisher = AppSocketPublisher || this.AppSocketPublisher;
	AppSocketSubscriber = AppSocketSubscriber || this.AppSocketSubscriber;

	this.publisher = new AppSocketPublisher(this.events, this.socket);
	this.subscriber = new AppSocketSubscriber(this.events, this.socket);
}


AppSocketIO.prototype.AppSocketPublisher = require('./app_socket_publisher');
AppSocketIO.prototype.AppSocketSubscriber = require('./app_socket_subscriber');
