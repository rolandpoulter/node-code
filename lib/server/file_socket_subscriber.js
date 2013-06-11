"use strict";


module.exports = FileSocketSubscriber;


function FileSocketSubscriber (io_socket, file_publisher, File, Project) {

	this.io_socket = io_socket;

	this.file_publisher = file_publisher;


	if (File) this.File = File;

	if (Project) this.Project = Project;


	this.io_socket.sockets.on('connection', this.handleSocketConnection.bind(this));

}


FileSocketSubscriber.prototype.File = require('./file');

FileSocketSubscriber.prototype.Project = require('./project');


FileSocketSubscriber.prototype.handleSocketConnection = function (socket) {

	socket.on('open file', this.onOpenFile.bind(this, socket));

	socket.on('close file', this.onCloseFile.bind(this, socket))

};


FileSocketSubscriber.prototype.onOpenFile = function (socket, project_name, relative_file_path) {

	this.Project.get(project_name).getFile(relative_file_path).open(
		this.file_publisher.emitFileOpen.bind(
			this.file_publisher,
			socket,
			project_name,
			relative_file_path
		)
	);

};


FileSocketSubscriber.prototype.onCloseFile = function (socket, project_name, relative_file_path) {

	this.Project.get(project_name).getFile(relative_file_path).close();

};
