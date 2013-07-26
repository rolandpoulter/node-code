"use strict";


module.exports = DirectoryPublisher;


function DirectoryPublisher (directory, socket, EntityPublisher) {

	this.directory = directory;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('directory', this.socket, this.directory).bindPublish();

};


DirectoryPublisher.prototype.EntityPublisher = require('../shared/entity_publisher');


DirectoryPublisher.prototype.index = function (directory_index) {

	this.publish('index', directory_index);

};
