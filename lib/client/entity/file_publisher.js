"use strict";


require('../../shared/entity_publisher');


exports = module.exports = dependency.injection(FilePublisher);


function FilePublisher (file, messenger, EntityPublisher) {

	this.publish = new EntityPublisher('file', messenger, file).bindPublish();

};


FilePublisher.prototype.open = function () {

	this.publish('open');

};


FilePublisher.prototype.close = function () {

	this.publish('close');

};


FilePublisher.prototype.read = function () {

	this.publish('read');

};


FilePublisher.prototype.save = function (file_data, file_format) {

	this.publish('save', file_data, file_format);

};
