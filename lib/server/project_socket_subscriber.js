"use strict";


module.exports = ProjectSocketSubscriber;


function ProjectSocketSubscriber (app_server, io_socket, publisher, Project) {

	this.app_server = app_server;

	this.io_socket = io_socket;

	this.publisher = publisher;


	if (Project) this.Project = Project;


	this.io_socket.sockets.on('connection', function (socket) {
		var socket_session = socket.handshake.session;

		socket_session.projects = socket_session.projects || {};

		socket.on('list projects', function () {
			socket.emit('projects list', socket_session.projects);
		});
	});

}


ProjectSocketSubscriber.prototype.Project = require('./project');
