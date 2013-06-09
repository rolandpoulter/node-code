"use strict";


module.exports = AppSocketSubscribers;


function AppSocketSubscribers (
	io_socket,
	socket_publishers,
	ProjectSocketSubscriber,
	DirectorySocketSubscriber,
	FileSocketSubscriber
) {

	this.io_socket = io_socket;

	this.publishers = socket_publishers;


	if (ProjectSocketSubscriber) this.ProjectSocketSubscriber = ProjectSocketSubscriber;

	if (DirectorySocketSubscriber) this.DirectorySocketSubscriber = DirectorySocketSubscriber;

	if (FileSocketSubscriber) this.FileSocketSubscriber = FileSocketSubscriber;


	this.project = new this.ProjectSocketSubscriber(this.io_socket, this.publishers);

	this.directory = new this.DirectorySocketSubscriber(this.io_socket, this.publishers.directory);

	this.file = new this.FileSocketSubscriber(this.io_socket, this.publishers.file);

}


AppSocketSubscribers.prototype.ProjectSocketSubscriber = require('./project_socket_subscriber');

AppSocketSubscribers.prototype.DirectorySocketSubscriber = require('./directory_socket_subscriber');

AppSocketSubscribers.prototype.FileSocketSubscriber = require('./file_socket_subscriber');
