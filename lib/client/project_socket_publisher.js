"use strict";


exports = module.exports = ProjectSocketPusher;


function ProjectSocketPusher (events, socket, app_ui, Project) {

	this.events = events;

	this.socket = socket;

	this.app_ui = app_ui;


	this.emitListProjects();

}


ProjectSocketPusher.prototype.emitListProjects = function () {

	this.socket.emit('list projects');

};
