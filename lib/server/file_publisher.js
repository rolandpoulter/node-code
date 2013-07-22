"use strict";


module.exports = FilePublisher;


function FilePublisher (file, socket, EntityPublisher) {

	this.file = file;

	this.socket = socket;


	if (EntityPublisher) this.EntityPublisher = EntityPublisher;

	this.publish = new this.EntityPublisher('file', this.socket, this.file).bindPublish();

};


FilePublisher.prototype.EntityPublisher = require('./entity_publisher');


FilePublisher.prototype.data = function (file_data) {

	this.publish('data', file_data);

};


FilePublisher.prototype.modified = function (new_file_data) {

	this.publish('modified', new_file_data);

};


FilePublisher.prototype.saveSuccess = function () {

	this.publish('save success');

};


FilePublisher.prototype.saveError = function (error) {

	this.publish('save error', error);

};
