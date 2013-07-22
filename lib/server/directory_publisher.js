"use strict";


module.exports = DirectoryPublisher;


function DirectoryPublisher (directory, socket, EntityPublisher) {

	this.directory = directory;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('file', this.socket, this.file).bindPublish();

};


DirectoryPublisher.prototype.EntityPublisher = require('./entity_publisher');


DirectoryPublisher.prototype.index = function (directory_index) {

	this.publisher.publish('index', directory_index);

};
