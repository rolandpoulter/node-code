"use strict";


module.exports = File;


File.get = function (project, relative_file_path) {

	return project.cache[relative_file_path];

};


function File (directory, file_info, file_publisher, app_ui, FileUI, File) {

	this.directory = directory;

	this.project = directory.project;


	this.info = file_info;

	this.publisher = file_publisher;


	this.app_ui = app_ui;


	if (FileUI) this.FileUI = FileUI;

	if (File) this.File = File;


	this.ui = new this.FileUI(this);


	return this.cacheUpsert();

}


File.prototype.File = File;

File.prototype.FileUI = require('./file_ui');


File.prototype.cacheUpsert = function () {

	var file = this.File.get(this.project, this.info.relative_path) || this;


	return this.project.cache[this.info.relative_path] = file;

};


File.prototype.render = function () {

	this.ui.render();

};


File.prototype.open = function (file_data) {

	this.ui.open(file_data);

};

File.prototype.close = function () {

	this.ui.close();

};
