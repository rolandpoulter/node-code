"use strict";


require('../../shared/entity_subscriber')


exports = module.exports = dependency.injection(DirectorSubscriber);


function DirectorSubscriber (messenger, entity_cache, EntitySubscriber) {

	this.messenger = messenger;


	new EntitySubscriber(this, 'directory', messenger, entity_cache, EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.open = function () {

	this.directory.open(this.messenger);

};


DirectorSubscriber.prototype.close = function () {

	this.directory.close(this.messenger);

};


DirectorSubscriber.prototype.index = function () {

	this.directory.index(this.messenger);

};
