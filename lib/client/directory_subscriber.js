"use strict";


require('./entity_subscriber');


exports = module.exports = dependency.injection(DirectorSubscriber);


function DirectorSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	new EntitySubscriber(this, 'directory', this.socket, EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.index = function (directory_index) {

	this.directory.index(directory_index);

};
