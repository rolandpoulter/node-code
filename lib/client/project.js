"use strict";


module.exports = Project;


Project.get = function (project_name) {

	return Project.cache[project_name];

};


Project.cache = {};


function Project (project_name, project_data, app_events, app_publishers, app_ui, Directory) {

	this.name = project_name;

	this.data = project_data;

	this.events = app_events;

	this.publishers = app_publishers;


	this.shelf_ui = app_ui.getComponent('shelf');


	if (Directory) this.Directory = Directory;


	this.cache = {};


	return this.cacheUpsert();

}


Project.prototype.Directory = require('./directory');


Project.prototype.cacheUpsert = function () {

	var project = Project.get(this.name) || this;


	project.createDirectory();


	return Project.cache[this.name] = project;

};


Project.prototype.createDirectory = function () {

	if (this.directory) return;


	if (!this.data.directory) {
		throw new Error('Project: missing directory data.');
	}


	this.directory = new this.Directory(
		this.data.directory,
		this,
		this.events,
		this.publishers
	);

	this.directory.render(this.shelf_ui.dom_node);

};
