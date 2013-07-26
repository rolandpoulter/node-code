"use strict";


module.exports = FilePublisher;


function FilePublisher (file, socket, EntityPublisher) {

	this.file = file;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('file', this.socket, this.file).bindPublish();

};


FilePublisher.prototype.EntityPublisher = require('../shared/entity_publisher');


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
