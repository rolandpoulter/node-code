"use strict";


module.exports = Project;


Project.get = function (project_name) {

	return this.relative_cache[project_name];

};


Project.cache = {};

Project.relative_cache = {};


function Project (
	working_directory,
	project_location,
	projects_session_store,
	configuration,
	cachedEntity,
	PublisherFactory,
	SubscriberFactory,
	Directory,
	File
) {

	this.projects_session_store = projects_session_store;

	this.configuration = configuration;


	if (cachedEntity) this.cachedEntity = cachedEntity;

	if (PublisherFactory) this.PublisherFactory = PublisherFactory;

	if (SubscriberFactory) this.SubscriberFactory = SubscriberFactory;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	var project = this.cachedEntity(this, working_directory, project_location, Project.cache);


	project.directory = new this.Directory(this.project_location, this.relative_path, this.absolute_path, this);

	project.directory.project = this;


	projects_session_store[this.relative_path] = this.getInfo();

	Project.relative_cache[this.relative_path] = this;


	return project;

}


Project.prototype.cachedEntity = require('./cached_entity');

Project.prototype.PublisherFactory = require('./publisher_factory');

Project.prototype.SubscriberFactory = require('./publisher_factory');

Project.prototype.Directory = require('./directory');

Project.prototype.File = require('./file');


Project.prototype.attachClient = function (new_client) {

	if (!this.clients) this.clients = {};


	var client_id = new_client.socket.id;

	this.clients[client_id] = new_client;

};


Project.prototype.getInfo = function () {

	return {
		configation: this.configation
	};

};


Project.prototype.getDirectory = function (relative_directory_path) {

	return new this.Directory(this.absolute_path, this.relative_path, relative_directory_path, this);

};

Project.prototype.getFile = function (relative_file_path) {

	return new this.File(this.absolute_path, this.relative_path, relative_file_path, this);

};


Project.prototype.getPublisherFactory = function (socket, name) {

	var client = this.clients[socket.id];

	return client.getPublisherFactory('project');

};


Project.prototype.list = function (socket) {

	this.getPublisherFactory('project').createPublisher(this, socket).list();

};
