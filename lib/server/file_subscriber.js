"use strict";


module.exports = FileSubscriber;


function FileSubscriber (file, socket) {

	this.file = file;

	this.socket = socket;

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
