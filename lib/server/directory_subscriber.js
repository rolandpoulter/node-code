"use strict";


module.exports = DirectorSubscriber;


function DirectorSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;


	new this.EntitySubscriber('project', this.socket, this.EntitySubscriber.getDirectoryEntity);

}


DirectorSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');


DirectorSubscriber.prototype.open = function () {

	this.directory.open(this.socket);

};


DirectorSubscriber.prototype.close = function () {

	this.directory.close(this.socket);

};


DirectorSubscriber.prototype.index = function () {

	this.directory.index(this.socket);

};
