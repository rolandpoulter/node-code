"use strict";


module.exports = window.Project || Project;

if (window.Project) return; // TODO: fix this hack

window.Project = Project;


Project.get = function (project_name) {

	return Project.cache[project_name];

};


Project.cache = {};


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


	if (Entity) this.Entity = Entity;

	if (Project) this.Project = Project;

	if (Directory) this.Directory = Directory;


	this.child_cache = {};


	this.entity = new this.Entity(this, this.Project.cache, 'getProjectPath');

	this.entity.setAbsolutePath(project_path);


	var project = this.entity.cacheUpsert();

	project.createDirectory();


	return project;

}


Project.prototype.Entity = require('../shared/entity');

Project.prototype.Project = Project;

Project.prototype.Directory = require('./directory');


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

