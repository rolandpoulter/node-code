"use strict";


require('../../shared/entity_subscriber');


exports = module.exports = dependency.injection(ProjectSubscriber);


function ProjectSubscriber (messenger, entity_cache, EntitySubscriber) {

	new EntitySubscriber(this, 'project', messenger, entity_cache);

}
