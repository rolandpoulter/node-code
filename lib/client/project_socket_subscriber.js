"use strict";


exports = module.exports = ProjectSocketSubscriber;


function ProjectSocketSubscriber (events, socket, publishers, app_ui, Project, objectForEach) {

	this.events = events;

	this.socket = socket;

	this.publishers = publishers;

	this.app_ui = app_ui;


	if (Project) this.Project = Project;


	if (objectForEach) this.objectForEach = objectForEach;


	this.socket.on('projects list', this.onProjectsList.bind(this));

}


ProjectSocketSubscriber.prototype.Project = require('./project');


ProjectSocketSubscriber.prototype.objectForEach = require('./object_for_each');


ProjectSocketSubscriber.prototype.onProjectsList = function (projects_map) {

	this.objectForEach(projects_map, this.createProject.bind(this), this);

};

ProjectSocketSubscriber.prototype.createProject = function (project_data, project_name) {

	new this.Project(project_name, project_data, this.events, this.publishers, this.app_ui);

};
