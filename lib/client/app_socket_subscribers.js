"use strict";


exports = module.exports = AppSocketSubscribers;


function AppSocketSubscribers (
	socket,
	publishers,
	app_ui,
	ProjectSocketSubscriber,
	DirectorySocketSubscriber,
	FileSocketSubscriber
) {

	this.socket = socket;

	this.publishers = publishers;

	this.app_ui = app_ui;


	if (ProjectSocketSubscriber) this.ProjectSocketSubscriber = ProjectSocketSubscriber;

	if (DirectorySocketSubscriber) this.DirectorySocketSubscriber = DirectorySocketSubscriber;

	if (FileSocketSubscriber) this.FileSocketSubscriber = FileSocketSubscriber;


	this.project = new this.ProjectSocketSubscriber(this.socket, this.publishers, this.app_ui);

	this.directory = new this.DirectorySocketSubscriber(this.socket);

	this.file = new this.FileSocketSubscriber(this.socket)

}


AppSocketSubscribers.prototype.ProjectSocketSubscriber = require('./project_socket_subscriber');

AppSocketSubscribers.prototype.DirectorySocketSubscriber = require('./directory_socket_subscriber');

AppSocketSubscribers.prototype.FileSocketSubscriber = require('./file_socket_subscriber');
