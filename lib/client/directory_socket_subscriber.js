"use strict";


exports = module.exports = DirectorySocketSubscriber;


function DirectorySocketSubscriber (events, socket, publishers, app_ui, Directory, Project) {

	this.events = events;

	this.socket = socket;

	this.publishers = publishers;

	this.app_ui = app_ui;


	if (Directory) this.Directory = Directory;

	if (Project) this.Project = Project;


	this.socket.on('directory index', this.onDirectoryIndex.bind(this));

}


DirectorySocketSubscriber.prototype.Directory = require('./directory');

DirectorySocketSubscriber.prototype.Project = require('./project');


DirectorySocketSubscriber.prototype.onDirectoryIndex = function (project_name, relative_directory_path, directories_index) {

	this.Directory.get(this.Project.get(project_name), relative_directory_path).updateIndex(directories_index);

};
