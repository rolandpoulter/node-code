"use strict";


module.exports = AppSocketPublishers;


function AppSocketPublishers (
	io_socket,
	ProjectSocketPublisher,
	DirectorySocketPublisher,
	FileSocketPublisher
) {

	this.io_socket = io_socket;


	if (ProjectSocketPublisher) this.ProjectSocketPublisher = ProjectSocketPublisher;

	if (DirectorySocketPublisher) this.DirectorySocketPublisher = DirectorySocketPublisher;

	if (FileSocketPublisher) this.FileSocketPublisher = FileSocketPublisher;


	this.project = new this.ProjectSocketPublisher(this.io_socket);

	this.directory = new this.DirectorySocketPublisher(this.io_socket);

	this.file = new this.FileSocketPublisher(this.io_socket);

}


AppSocketPublishers.prototype.ProjectSocketPublisher = require('./project_socket_publisher');

AppSocketPublishers.prototype.DirectorySocketPublisher = require('./directory_socket_publisher');

AppSocketPublishers.prototype.FileSocketPublisher = require('./file_socket_publisher');
