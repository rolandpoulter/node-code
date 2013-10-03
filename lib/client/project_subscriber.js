"use strict";


require('./entity_subscriber')


exports = module.exports = dependency.injection(ProjectSubscriber);


function ProjectSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	new EntitySubscriber(this, 'project', this.socket, EntitySubscriber.getProjectEntity);

}
