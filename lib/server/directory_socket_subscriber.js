"use strict";


module.exports = DirectorySocketSubscriber;


function DirectorySocketSubscriber (app_server, io_socket, publisher, Directory) {

	this.app_server = app_server;

	this.io_socket = io_socket;

	this.publisher = publisher;


	if (Directory) this.Directory = Directory;

}


DirectorySocketSubscriber.prototype.Directory = require('./directory');
