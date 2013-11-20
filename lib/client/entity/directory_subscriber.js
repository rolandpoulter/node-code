"use strict";


require('../../shared/entity_subscriber');


exports = module.exports = dependency.injection(DirectorSubscriber);


function DirectorSubscriber (messenger, EntitySubscriber) {

	new EntitySubscriber(this, 'directory', messenger, EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.index = function (directory_index) {

	this.directory.index(directory_index);

};
