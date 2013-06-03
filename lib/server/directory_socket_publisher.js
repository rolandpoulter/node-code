"use strict";


module.exports = DirectorySocketPublisher;


function DirectorySocketPublisher (app_server, io_socket, Directory) {

	this.app_server = app_server;

	this.io_socket = io_socket;


	if (Directory) this.Directory = Directory;

}


DirectorySocketPublisher.prototype.Directory = require('./directory');
