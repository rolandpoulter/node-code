"use strict";


module.exports = ProjectPublisher;


function ProjectPublisher (project, socket, EntityPublisher) {

	this.project = project;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('file', this.socket, this.file).bindPublish();

};


ProjectPublisher.prototype.EntityPublisher = require('./entity_publisher');
