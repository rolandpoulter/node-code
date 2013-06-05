"use strict";


exports = module.exports = AppSocketPublishers;


function AppSocketPublishers (
	events,
	socket,
	app_ui,
	ProjectSocketPublisher,
	DirectorySocketPublisher
) {

	this.events = events;

	this.socket = socket;

	this.app_ui = app_ui;


	if (ProjectSocketPublisher) this.ProjectSocketPublisher = ProjectSocketPublisher;

	if (DirectorySocketPublisher) this.DirectorySocketPublisher = DirectorySocketPublisher;


	this.project = new this.ProjectSocketPublisher(this.events, this.socket, this.app_ui);

	this.directory = new this.DirectorySocketPublisher(this.events, this.socket, this.app_ui);

}


AppSocketPublishers.prototype.ProjectSocketPublisher = require('./project_socket_publisher');

AppSocketPublishers.prototype.DirectorySocketPublisher = require('./directory_socket_publisher');
