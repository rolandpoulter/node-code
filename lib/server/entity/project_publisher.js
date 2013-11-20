"use strict";


require('../../shared/entity_publisher');


exports = module.exports = ProjectPublisher;


function ProjectPublisher (project, messenger, EntityPublisher) {

	this.publish = new EntityPublisher('file', messenger, project).bindPublish();

};
