"use strict";


require('../../shared/entity_publisher');


exports = module.exports = dependency.injection(ProjectPublisher);


function ProjectPublisher (project, messenger, EntityPublisher) {

	this.publish = new EntityPublisher('project', messenger, project).bindPublish();

};
