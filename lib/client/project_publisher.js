"use strict";


module.exports = ProjectPublisher;


function ProjectPublisher (project, socket, EntityPublisher) {

	this.project = project;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('project', this.socket, this.project).bindPublish();

};


ProjectPublisher.prototype.EntityPublisher = require('../shared/entity_publisher');
