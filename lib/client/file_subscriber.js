"use strict";


require('./entity_subscriber');


exports = module.exports = dependency.injection(FileSubscriber);


function FileSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	new EntitySubscriber(this, 'file', this.socket, EntitySubscriber.getFileEntity);

}


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
