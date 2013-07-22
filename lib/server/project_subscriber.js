"use strict";


module.exports = ProjectSubscriber;


function ProjectSubscriber (socket, EntitySubscriber, Project) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;

	if (Project) this.Project = Project;


	new this.EntitySubscriber('project', this.socket, this.EntitySubscriber.getProjectEntity);

}


ProjectSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');
