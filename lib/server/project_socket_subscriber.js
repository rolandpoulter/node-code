"use strict";


module.exports = ProjectSocketSubscriber;


function ProjectSocketSubscriber (io_socket, publishers, Project) {

	this.io_socket = io_socket;

	this.publishers = publishers;

	this.project_publisher = publishers.project;


	if (Project) this.Project = Project;


	this.io_socket.sockets.on('connection', this.handleSocketConnection.bind(this));

}


ProjectSocketSubscriber.prototype.Project = require('./project');


ProjectSocketSubscriber.prototype.handleSocketConnection = function (socket) {

	socket.on('list projects', this.onListProjects.bind(this, socket));

};


ProjectSocketSubscriber.prototype.onListProjects = function (socket) {

	this.project_publisher.emitProjectsList(socket);

};
