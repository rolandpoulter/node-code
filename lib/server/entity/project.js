"use strict";


require('../../shared/entity');

require('./directory');

require('./file');


exports = module.exports = dependency.injection(Project);


exports.cache = {};

exports.get = function (project_path) {

	return exports.cache[project_path];

};


function Project (
	root_path,
	project_path,
	configuration,
	projects_session_store,
	project_cache,
	Entity,
	Directory,
	File
) {

	this.configuration = configuration;

	this.child_cache = {};


	this.entity = new Entity(this, project_cache || exports.cache, 'getProjectPath');

	this.entity.setAbsolutePath(project_path, null, root_path);


	var project = this.entity.cacheUpsert();


	if (!project.directory) {
		project.directory = this.getDirectory(null);

		project.directory.project = this;
	}


	projects_session_store[project.getProjectPath()] = project.getInfo();


	return project;

}


Project.prototype.attachSession = function (new_session) {

	if (!this.sessions) this.sessions = {};


	var session_id = new_session.messenger.id;

	this.sessions[session_id] = new_session;

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
