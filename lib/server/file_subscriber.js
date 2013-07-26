"use strict";


module.exports = FileSubscriber;


function FileSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;


	new this.EntitySubscriber(this, 'file', this.socket, this.EntitySubscriber.getFileEntity);

}


FileSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');


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
