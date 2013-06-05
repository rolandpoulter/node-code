"use strict";


module.exports = ProjectSocketPublisher;


function ProjectSocketPublisher (io_socket, Project) {

	this.io_socket = io_socket;


	if (Project) this.Project = Project;

}


ProjectSocketPublisher.prototype.Project = require('./project');


ProjectSocketPublisher.prototype.emitProjectsList = function (socket) {

	var socket_session = socket.handshake.session;

	socket.emit('projects list', socket_session.projects);

};
