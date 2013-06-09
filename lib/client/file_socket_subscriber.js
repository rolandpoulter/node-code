"use strict";


module.exports = FileSocketSubscriber;


function FileSocketSubscriber (socket, File, Project) {

	this.socket = socket;


	if (File) this.File = File;

	if (Project) this.Project = Project;


	this.socket.on('file open', this.onFileOpen.bind(this));

}


FileSocketSubscriber.prototype.File = require('./file');

FileSocketSubscriber.prototype.Project = require('./project');


FileSocketSubscriber.prototype.onFileOpen = function (project_name, relative_file_path, file_data) {

	this.File.get(this.Project.get(project_name), relative_file_path).open(file_data);

};
