"use strict";


require('../../shared/entity_subscriber');


exports = module.exports = dependency.injection(ProjectSubscriber);


function ProjectSubscriber (messenger, entity_cache, EntitySubscriber) {

	this.messenger = messenger;


	new EntitySubscriber(this, 'project', messenger, entity_cache, EntitySubscriber.getFileEntity);

}


ProjectSubscriber.prototype.activate = function () {

	this.project.activate(this.messenger);

};