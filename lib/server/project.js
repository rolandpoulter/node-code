"use strict";


module.exports = Project;


Project.get = function (project_path) {

	return this.cache[project_path];

};


Project.cache = {};


function Project (
	root_path,
	project_path,
	configuration,
	projects_session_store,
	Entity,
	Directory,
	File
) {

	if (Entity) this.Entity = Entity;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;



	this.configuration = configuration;

	this.child_cache = {};


	this.entity = new this.Entity(this, Project.cache, 'getProjectPath');

	this.entity.setAbsolutePath(project_path, null, root_path);


	var project = this.entity.cacheUpsert();


	if (!project.directory) {
		project.directory = this.getDirectory(null);

		project.directory.project = this;
	}


	projects_session_store[project.getProjectPath()] = project.getInfo();


	return project;

}


Project.prototype.Entity = require('../shared/entity');

Project.prototype.Directory = require('./directory');

Project.prototype.File = require('./file');


Project.prototype.attachClient = function (new_client) {

	if (!this.clients) this.clients = {};


	var client_id = new_client.socket.id;

	this.clients[client_id] = new_client;

};


Project.prototype.getInfo = function () {

	return {
		configation: this.configation,
		directory: this.directory.getInfo()
	};

};


Project.prototype.getRootPath = function () {

	return this.entity.getRootPath();

};


Project.prototype.getDirectory = function (relative_directory_path) {

	return new this.Directory(this, relative_directory_path);

};


Project.prototype.getFile = function (relative_file_path) {

	return new this.File(this, relative_file_path);

};
