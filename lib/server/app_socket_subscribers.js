"use strict";


module.exports = AppSocketSubscribers;


function AppSocketSubscribers (
	io_socket,
	socket_publishers,
	ProjectSocketSubscriber,
	DirectorySocketSubscriber
) {

	this.io_socket = io_socket;

	this.publishers = socket_publishers;


	if (ProjectSocketSubscriber) this.ProjectSocketSubscriber = ProjectSocketSubscriber;

	if (DirectorySocketSubscriber) this.DirectorySocketSubscriber = DirectorySocketSubscriber;


	this.project = new this.ProjectSocketSubscriber(this.io_socket, this.publishers);

	this.directory = new this.DirectorySocketSubscriber(this.io_socket, this.publishers);

}


AppSocketSubscribers.prototype.ProjectSocketSubscriber = require('./project_socket_subscriber');

AppSocketSubscribers.prototype.DirectorySocketSubscriber = require('./directory_socket_subscriber');
