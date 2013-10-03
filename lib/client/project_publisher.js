"use strict";


require('../shared/entity_publisher');


exports = module.exports = dependency.injection(ProjectPublisher);


function ProjectPublisher (project, socket, EntityPublisher) {

	this.project = project;

	this.socket = socket;


	this.publish = new EntityPublisher('project', this.socket, this.project).bindPublish();

};
