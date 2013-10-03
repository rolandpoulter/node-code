"use strict";


require('./entity_subscriber');


exports = module.exports = dependency.injection(FileSubscriber);


function FileSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	new EntitySubscriber(this, 'file', this.socket, EntitySubscriber.getFileEntity);

}


FileSubscriber.prototype.open = function () {

	this.file.open(this.socket);

};


FileSubscriber.prototype.close = function () {

	this.file.close(this.socket);

};


FileSubscriber.prototype.read = function () {

	this.file.read(this.socket);

};


FileSubscriber.prototype.save = function (file_data, file_format) {

	this.file.save(this.socket, file_data, file_format);

};
