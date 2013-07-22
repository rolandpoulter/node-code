"use strict";


module.exports = AppPublisherFactories;


function AppPublisherFactories (
	socket,
	context,
	PublisherFactory,
	ProjectPublisher,
	DirectoryPublisher,
	FilePublisher
) {

	this.socekt = socket;

	this.context = context || this;


	if (PublisherFactory) this.PublisherFactory = PublisherFactory;

	if (ProjectPublisher) this.ProjectPublisher = ProjectPublisher;

	if (DirectoryPublisher) this.DirectoryPublisher = DirectoryPublisher;

	if (FilePublisher) this.FilePublisher = FilePublisher;


	this.defineFactory('project', this.ProjectPublisher);

	this.defineFactory('directory', this.DirectoryPublisher);

	this.defineFactory('file', this.FilePublisher);

}


AppPublisherFactories.prototype.PublisherFactory = require('./publisher_factory');

AppPublisherFactories.prototype.ProjectPublisher = require('./project_publisher');

AppPublisherFactories.prototype.DirectoryPublisher = require('./directory_publisher');

AppPublisherFactories.prototype.FilePublisher = require('./file_publisher');


AppPublisherFactories.prototype.defineFactory = function (name, publisher) {

	this.context[name] = new this.PublisherFactory(this.socket, publisher);

};
