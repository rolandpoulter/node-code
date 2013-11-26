"use strict";


require('../shared/object_for_each');

require('./entity/project');


exports = module.exports = dependency.injection(Session);


function Session (channel_io, session_data, entity_cache, Project, ObjectForEach) {

	this.channel_io = channel_io;


	this.data = session_data || {};

	this.data.projects = this.data.projects || {};


	this.entity_cache = entity_cache;


	this.channel_io.createSessionChannel(this);

	this.loadProjects();

}


Session.prototype.publishProjects = function () {

	this.publish.projects(this.data.projects);

};


Session.prototype.createProject = function (entity_id, project_info) {

	return new this.Project(
		this.messenger,
		this.entity_cache,
		entity_id,
		project_info,
		this.data.projects
	);

};


Session.prototype.loadProjects = function () {

	this.createProject('', {name: 'default'}).attachMessenger(this.messenger);


	this.ObjectForEach(this.data.projects, function (project_info, project_id) {

		this.createProject(project_id, project_info).attachMessenger(this.messenger);

	}, this);

};
