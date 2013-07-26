"use strict";


module.exports = DirectorSubscriber;


function DirectorSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;


	new this.EntitySubscriber(this, 'directory', this.socket, this.EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');


DirectorSubscriber.prototype.index = function (directory_index) {

	this.directory.index(directory_index);

};
