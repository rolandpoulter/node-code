"use strict";


require('./entity_subscriber')


exports = module.exports = dependency.injection(DirectorSubscriber);


function DirectorSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	new EntitySubscriber(this, 'directory', this.socket, EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.open = function () {

	this.directory.open(this.socket);

};


DirectorSubscriber.prototype.close = function () {

	this.directory.close(this.socket);

};


DirectorSubscriber.prototype.index = function () {

	this.directory.index(this.socket);

};
