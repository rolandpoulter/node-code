"use strict";


var Project = require('../lib/Project');


var entity_message_handler = require('../lib/helpers').entity_message_handler;


module.exports = function (app, socket, session) {
	session.projects = session.projects || {};

	socket.on('list projects', function () {
		socket.emit('projects list', session.projects);
	});


	socket.on('upsert project', function (relative_project_path, configuration) {
		var project = Project.upsert(app, relative_project_path, session.projects, configuration);

		socket.emit('project upserted', relative_project_path, project.configuration);
	});


	var project_message_handler = entity_message_handler(socket, session);

	project_message_handler.api({
		remove: {on: 'remove project', emit: 'project removed'},
		destroy: {on: 'destroy project', emit: 'project destroyed'},
	});

	/*
	socket.on('open project', function (relative_project_path) {
		var project = session.projects[relative_project_path],
		    absolute_project_path = path.join(process.cwd(), relative_project_path);

		if (!project) {
			try {
				project = Object.create(require(path.join(absolute_project_path, app.relative_config_path)));
			} catch (err) {
				if (app.config_json.project_config) {
					project = Object.create(app.config_json.project_config);
				} else {
					project = {};
				}
			}

			session.projects[relative_project_path] = project;
		}

		if (!project.is_open) {
			project.is_open = true;

			session.opened_projects.push(relative_project_path);
		}

		session.save();

		socket.emit('project opened', project);
	});

	socket.on('close project', function (relative_project_path) {
		var project = session.projects[relative_project_path],
		    index;

		if (project && project.is_open) {
			index = session.opened_projects.indexOf(relative_project_path);

			if (index !== -1) {
				session.opened_projects.splice(index, 1);
			}
		}

		socket.emit('project closed');
	});
	*/
};
