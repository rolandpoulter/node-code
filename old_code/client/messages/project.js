"use strict";


var Project = require('../lib/Project'),
    socket_responder_creator = require('../lib/helpers').socket_responder_creator;


module.exports = function (app, socket) {
	setTimeout(function () {
		socket.emit('list projects');
	}, 50);

	socket.on('projects list', function (projects_list) {
		console.log('load', projects_list);
		Project.load(app, projects_list);
	});

	socket.on('project upserted', function (relative_project_path, project) {
		Project.upsert(relative_project_path, project);
	});

	var project_socket_responder = socket_responder_creator(socket, Project, 'project');

	project_socket_responder('removed');
	project_socket_responder('destroyed');
};
