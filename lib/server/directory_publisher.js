"use strict";


module.exports = DirectoryPublisher;


function DirectoryPublisher (directory, socket, publish) {

	this.directory = directory;

	this.socket = socket;

	this.publish = publish;

};


DirectoryPublisher.prototype.index = function (directory_index) {

	this.publish('index', directory_index);

};
