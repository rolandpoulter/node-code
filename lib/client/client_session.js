"use strict";


var ClientSession = module.exports = require('../shared/client_session_factory')();


ClientSession.prototype.publishers = {
	ClientSession: require('./client_session_publisher'),
	Project:       require('./project_publisher'),
	Directory:     require('./directory_publisher'),
	File:          require('./file_publisher')
};


ClientSession.prototype.subscribers = {
	ClientSession: require('./client_session_subscriber'),
	Project:       require('./project_subscriber'),
	Directory:     require('./directory_subscriber'),
	File:          require('./file_subscriber')
};


ClientSession.prototype.entity_names = ['Project', 'Directory', 'File'];


ClientSession.prototype.isClient = true;

ClientSession.prototype.initialize = function (app_ui, Project, objectForEach) {

	this.app_ui = app_ui;


	if (Project) this.Project = Project;

	if (objectForEach) this.objectForEach = objectForEach;


	this.loadProjects();

};


ClientSession.prototype.Project = require('./Project');

ClientSession.prototype.objectForEach = require('../shared/object_for_each');


ClientSession.prototype.loadProjects = function () {

	this.publish.projects();

};


ClientSession.prototype.updateProjects = function (projects) {

	this.objectForEach(projects, this.createProject.bind(this), this);

};

ClientSession.prototype.createProject = function (project_info, project_name) {

	new this.Project(this.socket, project_name, project_info, this.app_ui);

};
