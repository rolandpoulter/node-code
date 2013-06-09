"use strict";


module.exports = Project;


Project.load_session = function (app, session, callback) {

	if (!session.projects) {
		session.projects = {};

		new Project(app.dir, '', session.projects, {});
	}

	else {
		// TODO: revive projects list
	}

	callback();

};


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
	Directory,
	File
) {

	this.projects_session_store = projects_session_store;

	this.configuration = configuration;


	if (cachedEntity) this.cachedEntity = cachedEntity;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	var project = this.cachedEntity(this, working_directory, project_location, Project.cache);


	project.directory = new this.Directory(project_location, this.absolute_path);

	project.directory.project = this;


	projects_session_store[this.relative_path] = this.getInfo();

	Project.relative_cache[this.relative_path] = this;


	return project;

}


Project.prototype.cachedEntity = require('./cached_entity');

Project.prototype.Directory = require('./directory');

Project.prototype.File = require('./file');


Project.prototype.getInfo = function () {

	return {
		configation: this.configation,
		directory: this.directory.getInfo()
	};

};


Project.prototype.getDirectory = function (relative_directory_path) {

	return new this.Directory(this.absolute_path, relative_directory_path);

};

Project.prototype.getFile = function (relative_file_path) {

	return new this.File(this.absolute_path, relative_file_path);

};

