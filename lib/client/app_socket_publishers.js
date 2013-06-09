"use strict";


exports = module.exports = AppSocketPublishers;


function AppSocketPublishers (
	socket,
	ProjectSocketPublisher,
	DirectorySocketPublisher,
	FileSocketPublisher
) {

	this.socket = socket;


	if (ProjectSocketPublisher) this.ProjectSocketPublisher = ProjectSocketPublisher;

	if (DirectorySocketPublisher) this.DirectorySocketPublisher = DirectorySocketPublisher;

	if (FileSocketPublisher) this.FileSocketPublisher = FileSocketPublisher;


	this.project = new this.ProjectSocketPublisher(this.socket);

	this.directory = new this.DirectorySocketPublisher(this.socket);

	this.file = new this.FileSocketPublisher(this.socket);

}


AppSocketPublishers.prototype.ProjectSocketPublisher = require('./project_socket_publisher');

AppSocketPublishers.prototype.DirectorySocketPublisher = require('./directory_socket_publisher');

AppSocketPublishers.prototype.FileSocketPublisher = require('./file_socket_publisher');
