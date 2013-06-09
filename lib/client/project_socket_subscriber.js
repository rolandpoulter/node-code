"use strict";


exports = module.exports = ProjectSocketSubscriber;


function ProjectSocketSubscriber (socket, publishers, app_ui, Project, objectForEach) {

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

ProjectSocketSubscriber.prototype.createProject = function (project_info, project_name) {

	new this.Project(project_name, project_info, this.publishers, this.app_ui);

};
