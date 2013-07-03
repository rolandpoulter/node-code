"use strict";


module.exports = FileSocketSubscriber;


function FileSocketSubscriber (socket, File, Project) {

	this.socket = socket;


	if (File) this.File = File;

	if (Project) this.Project = Project;


	this.socket.on('file data', this.onFileData.bind(this));

	this.socket.on('file modified', this.onFileModified.bind(this));

	this.socket.on('file save success', this.onFileSaveSuccess.bind(this));

	this.socket.on('file save error', this.onFileSaveError.bind(this));

}


FileSocketSubscriber.prototype.File = require('./file');

FileSocketSubscriber.prototype.Project = require('./project');


FileSocketSubscriber.prototype.onFileData = function (project_name, relative_file_path, file_data) {

	this.File.get(this.Project.get(project_name), relative_file_path).setData(file_data);

};

FileSocketSubscriber.prototype.onFileModified = function (project_name, relative_file_path, new_file_data) {

	this.File.get(this.Project.get(project_name), relative_file_path).modified(new_file_data);

};

FileSocketSubscriber.prototype.onFileSaveSuccess = function (project_name, relative_file_path) {

	this.File.get(this.Project.get(project_name), relative_file_path).saveSuccess();

};

FileSocketSubscriber.prototype.onFileSaveError = function (project_name, relative_file_path, error) {

	this.File.get(this.Project.get(project_name), relative_file_path).saveError(error);

};
