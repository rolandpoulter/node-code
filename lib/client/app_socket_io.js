"use strict";


exports = module.exports = AppSocketIO;


function AppSocketIO (app_events, socket_uri, app_ui, AppSocketPublishers, AppSocketSubscribers) {

	this.events = app_events;

	this.socket = io.connect(socket_uri);

	this.app_ui = app_ui;


	if (AppSocketPublishers) this.AppSocketPublishers = AppSocketPublishers;

	if (AppSocketSubscribers) this.AppSocketSubscribers = AppSocketSubscribers;


	this.publishers = new this.AppSocketPublishers(this.events, this.socket, this.app_ui);

	this.subscribers = new this.AppSocketSubscribers(this.events, this.socket, this.publishers, this.app_ui);

}


AppSocketIO.prototype.AppSocketPublishers = require('./app_socket_publishers');

AppSocketIO.prototype.AppSocketSubscribers = require('./app_socket_subscribers');
