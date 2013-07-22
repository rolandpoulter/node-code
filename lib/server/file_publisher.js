"use strict";


module.exports = FilePublisher;


function FilePublisher (file, socket, publish) {

	this.file = file;

	this.socket = socket;

	this.publish = publish;

};


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
