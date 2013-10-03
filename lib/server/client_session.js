"use strict";


require('../shared/object_for_each');

require('./project');


exports = module.exports = dependency.register(
	require('../shared/client_session_factory')()
);

var ClientSession = exports;


var pubsub_names = ['ClientSession', 'Project', 'Directory', 'File'];

ClientSession.prototype.publishers = ClientSession.createPubSubDictionary(pubsub_names, 'publisher', require);

ClientSession.prototype.subscribers = ClientSession.createPubSubDictionary(pubsub_names, 'subscriber', require);


ClientSession.prototype.entity_names = ['Project', 'Directory', 'File'];


ClientSession.prototype.isServer = true;

ClientSession.prototype.initialize = dependency.injection(
	function (app, Project, objectForEach) {

		this.app = app;


		this.loadProjects();

	}
);


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
