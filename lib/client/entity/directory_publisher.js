"use strict";


require('../../shared/entity_publisher');


exports = module.exports = dependency.injection(DirectoryPublisher);


function DirectoryPublisher (directory, messenger, EntityPublisher) {

	this.publish = new EntityPublisher('directory', messenger, directory).bindPublish();

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
