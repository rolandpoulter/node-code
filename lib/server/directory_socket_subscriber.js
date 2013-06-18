"use strict";


module.exports = DirectorySocketSubscriber;


function DirectorySocketSubscriber (io_socket, directory_publisher, Directory, Project) {

	this.io_socket = io_socket;

	this.directory_publisher = directory_publisher;


	if (Directory) this.Directory = Directory;

	if (Project) this.Project = Project;


	this.io_socket.sockets.on('connection', this.handleSocketConnection.bind(this));

}


DirectorySocketSubscriber.prototype.Directory = require('./directory');

DirectorySocketSubscriber.prototype.Project = require('./project');


DirectorySocketSubscriber.prototype.handleSocketConnection = function (socket) {

	socket.on('open directory', this.onOpenDirectory.bind(this, socket));

	socket.on('close directory', this.onCloseDirectory.bind(this, socket));

	socket.on('index directory', this.onIndexDirectory.bind(this, socket));

};


DirectorySocketSubscriber.prototype.onOpenDirectory = function (socket, project_name, relative_directory_path) {

	this.Project.get(project_name).getDirectory(relative_directory_path).open(socket);

};

DirectorySocketSubscriber.prototype.onCloseDirectory = function (socket, project_name, relative_directory_path) {

	this.Project.get(project_name).getDirectory(relative_directory_path).close(socket);	

};

DirectorySocketSubscriber.prototype.onIndexDirectory = function (socket, project_name, relative_directory_path) {

	this.Project.get(project_name).getDirectory(relative_directory_path).index(socket);

};
