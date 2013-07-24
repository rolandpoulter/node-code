"use strict";


exports = module.exports = AppSocketIO;


function AppSocketIO (socket_uri, app_ui, AppSocketPublishers, AppSocketSubscribers) {

	this.socket = io.connect(socket_uri);

	this.app_ui = app_ui;


	if (AppSocketPublishers) this.AppSocketPublishers = AppSocketPublishers;

	if (AppSocketSubscribers) this.AppSocketSubscribers = AppSocketSubscribers;


	this.publishers = new this.AppSocketPublishers(this.socket);

	this.subscribers = new this.AppSocketSubscribers(this.socket, this.publishers, this.app_ui);

	var DirectorySubscriber = require('./directory_subscriber');

	new DirectorySubscriber(this.socket);

}


AppSocketIO.prototype.AppSocketPublishers = require('./app_socket_publishers');

AppSocketIO.prototype.AppSocketSubscribers = require('./app_socket_subscribers');
