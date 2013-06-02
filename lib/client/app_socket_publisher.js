"use strict";


exports = module.exports = AppSocketPublisher;


function AppSocketPublisher (
	events,
	socket,
	app_ui,
	ProjectSocketPublisher,
	DirectorySocketPublisher
) {

	this.events = events;

	this.socket = socket;

	this.app_ui = app_ui;


	ProjectSocketPublisher = ProjectSocketPublisher || this.ProjectSocketPublisher;

	DirectorySocketPublisher = DirectorySocketPublisher || this.DirectorySocketPublisher;


	this.project = new ProjectSocketPublisher(this.events, this.socket, this.app_ui);

	this.directory = new DirectorySocketPublisher(this.events, this.socket, this.app_ui);

}


AppSocketPublisher.prototype.ProjectSocketPublisher = require('./project_socket_publisher');

AppSocketPublisher.prototype.DirectorySocketPublisher = require('./directory_socket_publisher');
