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
	path_location,
	relative_path,
	projects_session_store,
	configuration,
	Directory,
	cachedPathEntity
) {

	if (Directory) this.Directory = Directory;

	if (cachedPathEntity) this.cachedPathEntity = cachedPathEntity;


	this.directory = new this.Directory(path_location, relative_path);

	this.projects_session_store = projects_session_store;

	this.configuration = configuration;

	if (!this.directory.project) {
		this.directory.project = this;
	}

	var project = this.cachedPathEntity(this, path_location, relative_path, Project.cache);

	projects_session_store[this.relative_path] = this.getInfo();

	Project.relative_cache[this.relative_path] = this;

	return project;

}


Project.prototype.Directory = require('./directory');

Project.prototype.cachedPathEntity = require('./cached_path_entity');


Project.prototype.getInfo = function () {

	return {
		configation: this.configation,
		directory: this.directory.getInfo()
	};

};


Project.prototype.getDirectory = function (relative_directory_path) {

	return new this.Directory(this.absolute_path, relative_directory_path);

};
