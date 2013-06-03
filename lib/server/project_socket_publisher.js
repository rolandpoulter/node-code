"use strict";


module.exports = ProjectSocketPublisher;


function ProjectSocketPublisher (app_server, io_socket, Project) {

	this.app_server = app_server;

	this.io_socket = io_socket;


	if (Project) this.Project = Project;

}


ProjectSocketPublisher.prototype.Project = require('./project');
