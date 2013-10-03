"use strict";


require('../shared/entity');

require('./directory');


exports = module.exports = dependency.injection(Project);


exports.get = Project.get = function (project_name) {

	return Project.cache[project_name];

};


exports.cache = Project.cache = {};


function Project (
	socket,
	project_path,
	project_info,
	app_ui,
	Entity,
	Project,
	Directory
) {

	this.socket = socket;

	this.info = project_info;

	this.app_ui = app_ui;


	this.child_cache = {};


	this.entity = new Entity(this, Project.cache, 'getProjectPath');

	this.entity.setAbsolutePath(project_path);


	var project = this.entity.cacheUpsert();

	project.createDirectory();


	return project;

}


Project.prototype.publish = function (method, args) {

	var publisher = this.socket.createEntityPublisher('Project', this);

	publisher[method].apply(publisher, args);

};


Project.prototype.createDirectory = function () {

	if (this.directory) return;


	if (!this.info.directory) {
		throw new Error('Project: missing directory data.');
	}


	this.directory = new this.Directory(
		this.socket,
		this,
		null,
		this.info.directory,
		this.app_ui
	);

	this.directory.render();
	this.directory.open();

};


Project.prototype.getDirectory = function (relative_directory_path) {

	return this.child_cache[relative_directory_path];

};

Project.prototype.getFile = function (relative_file_path) {

	return this.child_cache[relative_file_path];

};

