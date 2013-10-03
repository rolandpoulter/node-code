"use strict";


require('../shared/entity_publisher');


exports = module.exports = dependency.injection(DirectoryPublisher);


function DirectoryPublisher (directory, socket, EntityPublisher) {

	this.directory = directory;

	this.socket = socket;


	this.publish = new EntityPublisher('directory', this.socket, this.directory).bindPublish();

};


DirectoryPublisher.prototype.open = function () {

	this.publish('open');

};


DirectoryPublisher.prototype.close = function () {

	this.publish('close');

};


DirectoryPublisher.prototype.index = function () {

	this.publish('index');

};
