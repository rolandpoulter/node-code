"use strict";


require('../shared/object_for_each');

require('./entity/project');


exports = module.exports = dependency.injection(Session);


function Session (channel_io, session_data, app_dir, Project, ObjectForEach) {

	this.channel_io = channel_io;


	this.data = session_data;

	this.app_dir = app_dir;


	this.channel_io.createSessionChannel(this);

	this.loadProjects();

}


Session.prototype.publishProjects = function () {

	this.publish.projects(this.data.projects);

};


Session.prototype.loadProjects = function () {

	if (!this.data.projects) {
		this.data.projects = {};

		new this.Project(this.app_dir, '', {}, this.data.projects);
	}

	else {
		this.ObjectForEach(this.data.projects, function (project_info, project_path) {

			new this.Project(this.app_dir, project_path, project_info.configuration, this.data.projects);

		});
	}


	var session = this;

	this.ObjectForEach(this.data.projects, function (project_info, project_path) {

		session.Project.get(project_path).attachSession(session);

	});

};
