"use strict";


require('../../shared/entity_subscriber');


exports = module.exports = dependency.injection(ProjectSubscriber);


function ProjectSubscriber (messenger, EntitySubscriber) {

	new EntitySubscriber(this, 'project', messenger, EntitySubscriber.getProjectEntity);

}
