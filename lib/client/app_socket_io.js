"use strict";


exports = module.exports = AppSocketIO;


function AppSocketIO (app_events, socket_uri, app_ui, AppSocketPublisher, AppSocketSubscriber) {

	this.events = app_events;

	this.socket = io.connect(socket_uri);

	this.app_ui = app_ui;


	AppSocketPublisher = AppSocketPublisher || this.AppSocketPublisher;

	AppSocketSubscriber = AppSocketSubscriber || this.AppSocketSubscriber;


	this.publisher = new AppSocketPublisher(this.events, this.socket, this.app_ui);

	this.subscriber = new AppSocketSubscriber(this.events, this.socket, this.publisher, this.app_ui);

}


AppSocketIO.prototype.AppSocketPublisher = require('./app_socket_publisher');

AppSocketIO.prototype.AppSocketSubscriber = require('./app_socket_subscriber');
