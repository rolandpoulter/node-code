"use strict";


exports = module.exports = ProjectSocketPublisher;


function ProjectSocketPublisher (events, socket, app_ui, Project) {

	this.events = events;

	this.socket = socket;

	this.app_ui = app_ui;


	this.emitListProjects();

}


ProjectSocketPublisher.prototype.emitListProjects = function () {

	this.socket.emit('list projects');

};
