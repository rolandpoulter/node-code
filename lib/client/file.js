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


File.prototype.publish = function (type, args) {

	var file_project_name = this.directory.project.name,
			relative_file_path = this.info.relative_path;

	this.publisher[type].apply(this.publisher, [
		file_project_name,
		relative_file_path

	].concat(args || []));

};


File.prototype.open = function () {

	if (this.is_open) return;

	this.is_open = true;

	this.publish('emitOpenFile');

	this.ui.open();

};

File.prototype.close = function () {

	if (!this.is_open) return;

	delete this.is_open;

	this.publish('emitCloseFile');

	this.ui.close();

};


File.prototype.save = function () {

	var file_data = this.ui.editor_session.getValue();

	this.publish('emitSaveFile', [file_data]);

};

File.prototype.saveSuccess = function () {

	console.log('saved');

};

File.prototype.saveError = function (save_error) {

	console.error(save_error);

};


File.prototype.setData = function (file_data) {

	this.ui.setData(file_data);

};

File.prototype.modified = function (new_file_data) {

	var old_file_data = this.ui.editor_session.getValue();

	// TODO: open dialog asking if the file data should be reloaded
	// console.log(this, 'modified');

	if (old_file_data.length !== new_file_data.length || old_file_data !== new_file_data) {

		if (window.confirm('File has changed. Reload?')) {

			this.publish('emitReadFile');

		}

	}

};
