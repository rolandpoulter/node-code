"use strict";


exports = module.exports = AppSocketSubscribers;


function AppSocketSubscribers (
	events,
	socket,
	publishers,
	app_ui,
	ProjectSocketSubscriber,
	DirectorySocketSubscriber
) {

	this.events = events;

	this.socket = socket;

	this.publishers = publishers;

	this.app_ui = app_ui;


	if (ProjectSocketSubscriber) this.ProjectSocketSubscriber = ProjectSocketSubscriber;

	if (DirectorySocketSubscriber) this.DirectorySocketSubscriber = DirectorySocketSubscriber;


	this.project = new this.ProjectSocketSubscriber(this.events, this.socket, this.publishers, this.app_ui);

	this.directory = new this.DirectorySocketSubscriber(this.events, this.socket, this.publishers, this.app_ui);

}


AppSocketSubscribers.prototype.ProjectSocketSubscriber = require('./project_socket_subscriber');

AppSocketSubscribers.prototype.DirectorySocketSubscriber = require('./directory_socket_subscriber');
