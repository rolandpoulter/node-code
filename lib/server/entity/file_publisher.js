"use strict";


require('../../shared/entity_publisher');


exports = module.exports = dependency.injection(FilePublisher);


function FilePublisher (file, messenger, EntityPublisher) {

	this.publish = new EntityPublisher('file', messenger, file).bindPublish();

};


FilePublisher.prototype.data = function (file_data) {

	this.publish('data', file_data);

};


FilePublisher.prototype.modified = function (new_file_data) {

	this.publish('modified', new_file_data);

};


FilePublisher.prototype.saveSuccess = function () {

	this.publish('saveSuccess');

};


FilePublisher.prototype.saveError = function (error) {

	this.publish('saveError', error);

};
