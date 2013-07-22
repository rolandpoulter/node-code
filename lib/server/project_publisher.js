"use strict";


module.exports = ProjectPublisher;


function ProjectPublisher (project, socket, publish) {

	this.project = project;

	this.socket = socket;

	this.publish = publish;

};

