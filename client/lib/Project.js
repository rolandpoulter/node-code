"use strict";


var Directory = require('./Directory');


module.exports = Project;


Project.load = function (app, project_list) {
	Object.keys(project_list).forEach(function (relative_project_path) {
		Project.upsert(app, relative_project_path, project_list[relative_project_path]);
	});
};

Project.upsert = function (app, relative_project_path, project_info) {
	return new Project(app, relative_project_path, project_info);
};

Project.get = function (relative_project_path) {
	return Project.cache[relative_project_path];
};


Project.cache = {};

function Project (app, relative_path, info) {
	var project = Project.cache[relative_path];

	project = project || this;
	info = info || {};

	project.configuration = info.configuration || {};
	project.directory = new Directory(info.directory.base_name, null, app);

	project.directory.project = project;

	project.directory.render();

	return project;
}


Project.prototype.remove = function () {

};

Project.prototype.destroy = function () {

};
