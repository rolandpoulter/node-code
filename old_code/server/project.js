"use strict";


var helpers = require('./helpers');


var Directory = require('./Directory'),
    File = require('./File');


// HACK
if (global.Project) return module.exports = global.Project;

module.exports = Project;

global.Project = Project;


Project.load_session = function (app, session, callback) {
	if (!session.projects) {
		session.projects = {};

		Project.upsert(app, '', session.projects, {});

	} else {
		// TODO: revive projects list
	}

	callback();
};

Project.upsert = function (app, relative_project_path, projects_session_store, configuration) {
	return new Project(app.dir, relative_project_path, projects_session_store, configuration);
};


Project.cache = {};

Project.relative_cache = {};console.log("GOT HERE");


function Project (path_location, relative_path, projects_session_store, configuration) {
	this.directory = new Directory(path_location, relative_path);

	this.projects_session_store = projects_session_store;
	this.configuration = configuration;

	if (!this.directory.project) {
		this.directory.project = this;
	}

	var project = helpers.cached_path_entity(this, path_location, relative_path, Project.cache);

	projects_session_store[this.relative_path] = this.get_info();

	Project.relative_cache[this.relative_path] = this;

	console.log('add project: ', this.relative_path, Project.relative_cache);
	console.log(Project);

	return project;
}


Project.prototype.get_directory = function (relative_directory_path) {
	return new Directory(this.absolute_path, relative_directory_path);
};

Project.prototype.get_file = function (relative_file_path) {
	return new File(this.absolute_path, relative_file_path);
};


Project.prototype.get_info = function () {
	return {
		configation: this.configation,
		directory: this.directory.get_info()
	};
};

// TODO: Project.prototype.join for joining socket.io rooms

Project.prototype.remove = function (socket, session, callback) {
	// TODO: leave socket.io room, use Project.prototype.leave

	if (this.projects_session_store[this.absolute_path] !== this) return;

	delete this.projects_session_store[this.absolute_path];

	callback();
};

Project.prototype.destroy = function (socket, session, callback) {
	this.remove();

	if (Project.cache[this.absolute_path] !== this) return;

	delete Project.cache[this.absolute_path];

	callback();
};

