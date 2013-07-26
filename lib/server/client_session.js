"use strict";


var ClientSession = module.exports = require('../shared/client_session_factory')();


var pubsub_names = ['ClientSession', 'Project', 'Directory', 'File'];

ClientSession.prototype.publishers = ClientSession.createPubSubDictionary(pubsub_names, 'publisher', require);

ClientSession.prototype.subscribers = ClientSession.createPubSubDictionary(pubsub_names, 'subscriber', require);


ClientSession.prototype.entity_names = ['Project', 'Directory', 'File'];


ClientSession.prototype.isServer = true;

ClientSession.prototype.initialize = function (app, Project, objectForEach) {

	this.app = app;


	if (Project) this.Project = Project;

	if (objectForEach) this.objectForEach = objectForEach;


	this.loadProjects();

};


ClientSession.prototype.Project = require('./project');

ClientSession.prototype.objectForEach = require('../shared/object_for_each');


ClientSession.prototype.publishProjects = function () {

	this.publish.projects(this.session.projects);

};


ClientSession.prototype.loadProjects = function () {

	if (!this.session.projects) {
		this.session.projects = {};

		new this.Project(this.app.dir, '', {}, this.session.projects);
	}

	else {
		this.objectForEach(this.session.projects, function (project_info, project_path) {

			new this.Project(this.app.dir, project_path, project_info.configuration, this.session.projects);

		});
	}


	var client = this;

	this.objectForEach(this.session.projects, function (project_info, project_path) {

		client.Project.get(project_path).attachClient(client);

	});

};
