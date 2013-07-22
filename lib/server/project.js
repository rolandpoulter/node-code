"use strict";


module.exports = Project;


Project.get = function (project_name) {

	return this.name_cache[project_name];

};


Project.cache = {};

Project.name_cache = {};


function Project (
	working_directory,
	project_path,
	projects_session_store,
	configuration,
	Entity,
	Directory,
	File
) {

	if (Entity) this.Entity = Entity;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	var project = new this.Entity(this, working_directory, project_path, Project.cache);


	project.configuration = configuration;


	project.directory = new this.Directory(
		project.project_name, 
		project.relative_path, 
		project.absolute_path, 
		project
	);

	project.directory.project = project;


	projects_session_store[project.project_name] = project.getInfo();

	Project.name_cache[project.project_name] = project;


	return project;

}


Project.prototype.Entity = require('./entity');

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


Project.prototype.getDirectory = function (relative_directory_path) {

	return new this.Directory(this.absolute_path, this.relative_path, relative_directory_path, this);

};

Project.prototype.getFile = function (relative_file_path) {

	return new this.File(this.absolute_path, this.relative_path, relative_file_path, this);

};
