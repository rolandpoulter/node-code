"use strict";


module.exports = FileSubscriber;


function FileSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;


	new this.EntitySubscriber(this, 'file', this.socket, this.EntitySubscriber.getFileEntity);

}


FileSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');


FileSubscriber.prototype.data = function (file_data) {

	this.file.setData(file_data);

};


FileSubscriber.prototype.modified = function (new_file_data) {

	this.file.modified(new_file_data);

};


FileSubscriber.prototype.saveSuccess = function () {

	this.file.saveSuccess();

};


FileSubscriber.prototype.saveError = function (error) {

	this.file.saveError(error);

};
