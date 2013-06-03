"use strict";


module.exports = AppSocketSubscriber;


function AppSocketSubscriber (
	app_server,
	io_socket,
	socket_publisher,
	ProjectSocketSubscriber,
	DirectorySocketSubscriber
) {

	this.app_server = app_server;

	this.io_socket = io_socket;

	this.publisher = socket_publisher;


	if (ProjectSocketSubscriber) this.ProjectSocketSubscriber = ProjectSocketSubscriber;

	if (DirectorySocketSubscriber) this.DirectorySocketSubscriber = DirectorySocketSubscriber;


	this.project = new this.ProjectSocketSubscriber(this.app_server, this.io_socket, this.publisher);

	this.directory = new this.DirectorySocketSubscriber(this.app_server, this.io_socket, this.publisher);

}


AppSocketSubscriber.prototype.ProjectSocketSubscriber = require('./project_socket_subscriber');

AppSocketSubscriber.prototype.DirectorySocketSubscriber = require('./directory_socket_subscriber');
