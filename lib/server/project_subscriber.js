"use strict";


module.exports = ProjectSubscriber;


function ProjectSubscriber (socket, EntitySubscriber, Project) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;

	if (Project) this.Project = Project;


	new this.EntitySubscriber('project', this.socket, this.getEntity.bind(this));

}


ProjectSubscriber.prototype.getEntity = function (project_name) {

	return this.Project.get(project_name);

};