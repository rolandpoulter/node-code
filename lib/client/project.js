"use strict";


module.exports = Project;


Project.get = function (project_name) {

	return Project.cache[project_name];

};


Project.cache = {};


function Project (project_name, project_data, app_events, app_publisher, app_ui, Directory) {

	this.name = project_name;

	this.data = project_data;

	this.events = app_events;

	this.publisher = app_publisher;


	this.shelf_ui = app_ui.getComponent('shelf');


	if (Directory) this.Directory = Directory;


	return this.cacheUpsert();

}


Project.prototype.Directory = require('./directory');


Project.prototype.cacheUpsert = function () {

	var project = Project.cache[this.name] || this;


	project.createDirectory();


	return project;

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
		this.publisher
	);

	this.directory.render(this.shelf_ui.dom_node);

};
