"use strict";


module.exports = DirectoryPublisher;


function DirectoryPublisher (directory, socket, EntityPublisher) {

	this.directory = directory;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('directory', this.socket, this.directory).bindPublish();

};


DirectoryPublisher.prototype.EntityPublisher = require('./entity_publisher');


DirectoryPublisher.prototype.open = function () {

	this.publish('open');

};


DirectoryPublisher.prototype.index = function () {

	this.publish('close');

};


DirectoryPublisher.prototype.index = function () {

	this.publish('index');

};
