"use strict";


exports = module.exports = ProjectSocketPublisher;


function ProjectSocketPublisher (socket, Project) {

	this.socket = socket;


	this.emitListProjects();

}


ProjectSocketPublisher.prototype.emitListProjects = function () {

	this.socket.emit('client', 'projects');

};
