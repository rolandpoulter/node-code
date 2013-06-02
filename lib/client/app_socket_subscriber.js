"use strict";


exports = module.exports = AppSocketSubscriber;


function AppSocketSubscriber (
	events,
	socket,
	publisher,
	app_ui,
	ProjectSocketSubscriber,
	DirectorySocketSubscriber
) {

	this.events = events;

	this.socket = socket;

	this.publisher = publisher;

	this.app_ui = app_ui;


	ProjectSocketSubscriber = ProjectSocketSubscriber || this.ProjectSocketSubscriber

	DirectorySocketSubscriber = DirectorySocketSubscriber || this.DirectorySocketSubscriber


	this.project = new ProjectSocketSubscriber(this.events, this.socket, this.publisher, this.app_ui);

	this.directory = new DirectorySocketSubscriber(this.events, this.socket, this.publisher, this.app_ui);

}


AppSocketSubscriber.prototype.ProjectSocketSubscriber = require('./project_socket_subscriber');

AppSocketSubscriber.prototype.DirectorySocketSubscriber = require('./directory_socket_subscriber');
