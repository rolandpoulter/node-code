"use strict";


module.exports = DirectorSubscriber;


function DirectorSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;


	new this.EntitySubscriber('directory', this.socket, this.EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');


DirectorSubscriber.prototype.index = function () {

	this.directory.index(this.socket);

};
