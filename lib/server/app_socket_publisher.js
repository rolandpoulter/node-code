"use strict";


module.exports = AppSocketPublisher;


function AppSocketPublisher (
	app_server,
	io_socket,
	ProjectSocketPublisher,
	DirectorySocketPublisher
) {

	this.app_server = app_server;

	this.io_socket = io_socket;


	if (ProjectSocketPublisher) this.ProjectSocketPublisher = ProjectSocketPublisher;

	if (DirectorySocketPublisher) this.DirectorySocketPublisher = DirectorySocketPublisher;


	this.project = new this.ProjectSocketPublisher(this.app_server, this.io_socket);

	this.directory = new this.DirectorySocketPublisher(this.app_server, this.io_socket);

}


AppSocketPublisher.prototype.ProjectSocketPublisher = require('./project_socket_publisher');

AppSocketPublisher.prototype.DirectorySocketPublisher = require('./directory_socket_publisher');
