"use strict";


require('../shared/entity_publisher');


exports = module.exports = ProjectPublisher;


function ProjectPublisher (project, socket, EntityPublisher) {

	this.project = project;

	this.socket = socket;


	this.publish = new EntityPublisher('file', this.socket, this.file).bindPublish();

};
