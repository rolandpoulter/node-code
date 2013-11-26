"use strict";


require('../../shared/entity_subscriber');


exports = module.exports = dependency.injection(DirectorSubscriber);


function DirectorSubscriber (messenger, entity_cache, EntitySubscriber) {

	new EntitySubscriber(this, 'directory', messenger, entity_cache, EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.index = function (directory_index) {

	this.directory.index(directory_index);

};
