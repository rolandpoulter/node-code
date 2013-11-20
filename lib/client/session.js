"use strict";


require('./entity/project');

require('../shared/object_for_each');


exports = module.exports = dependency.injection(Session);


function Session (channel_io, app_ui, Project, ObjectForEach) {

	this.channel_io = channel_io;

	this.app_ui = app_ui;


	this.channel_io.createSessionChannel(this);

	this.loadProjects();

}


Session.prototype.loadProjects = function () {

	this.publish.projects();

};


Session.prototype.updateProjects = function (projects) {

	this.ObjectForEach(projects, this.createProject.bind(this), this);

};

Session.prototype.createProject = function (project_info, project_name) {

	new this.Project(this.messenger, project_name, project_info, this.app_ui);

};
