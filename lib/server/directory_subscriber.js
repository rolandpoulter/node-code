"use strict";


module.exports = DirectorSubscriber;


function DirectorSubscriber (directory, socket) {

	this.directory = directory;

	this.socket = socket;

}


DirectorSubscriber.prototype.open = function () {

	this.directory.open(this.socket);

};


DirectorSubscriber.prototype.close = function () {

	this.directory.close(this.socket);

};


DirectorSubscriber.prototype.index = function () {

	this.directory.index(this.socket);

};
