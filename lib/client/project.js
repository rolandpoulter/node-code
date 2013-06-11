"use strict";


module.exports = Project;


Project.get = function (project_name) {

	return Project.cache[project_name];

};


Project.cache = {};


function Project (
	project_name,
	project_info,
	app_publishers,
	app_ui,
	Project,
	Directory
) {

	this.name = project_name;

	this.info = project_info;


	this.publishers = app_publishers;


	this.app_ui = app_ui;


	if (Project) this.Project = Project;

	if (Directory) this.Directory = Directory;


	this.cache = {};


	return this.cacheUpsert();

}


Project.prototype.Project = Project;

Project.prototype.Directory = require('./directory');


Project.prototype.cacheUpsert = function () {

	var project = this.Project.get(this.name) || this;


	project.createDirectory();


	return Project.cache[this.name] = project;

};


Project.prototype.createDirectory = function () {

	if (this.directory) return;


	if (!this.info.directory) {
		throw new Error('Project: missing directory data.');
	}


	this.directory = new this.Directory(
		this,
		null,
		this.info.directory,
		this.publishers,
		this.app_ui
	);

	this.directory.render();

};
