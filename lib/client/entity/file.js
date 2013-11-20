"use strict";


require('../../shared/entity');

require('../ui/file_ui');


exports = module.exports = dependency.injection(File);


exports.get = File.get = function (project, relative_file_path) {

	return project.getFile(relative_file_path);

};


function File (messenger, project, directory, file_info, app_ui, Entity, FileUI, File) {

	this.messenger = messenger;

	this.project = project;

	this.directory = directory;


	this.info = file_info;


	this.app_ui = app_ui;


	this.entity = new Entity(this, this.project.child_cache, 'getRelativeEntityPath');

	this.entity.setAbsolutePath(
		this.project.getProjectPath(),
		this.info.relative_path
	);


	var file = this.entity.cacheUpsert();

	if (!file.ui) file.ui = new FileUI(file);


	return file;

}


File.prototype.render = function () {

	this.ui.render();

};


File.prototype.publish = function (method, args) {

	var publisher = this.messenger.createEntityPublisher('File', this);

	publisher[method].apply(publisher, args);

};


File.prototype.open = function () {

	if (this.is_open) return;

	this.is_open = true;

	this.publish('open');

	this.ui.open();

};

File.prototype.close = function () {

	if (!this.is_open) return;

	delete this.is_open;

	this.publish('close');

	this.ui.close();

};


File.prototype.save = function () {

	var file_data = this.ui.getData();

	this.publish('save', [file_data]);

};

File.prototype.saveSuccess = function () {

	console.log('saved');

};

File.prototype.saveError = function (save_error) {

	console.error(save_error);

};


File.prototype.setData = function (file_data) {

	this.original_file_data = file_data;


	this.ui.setData(file_data);

};


File.prototype.modified = function (new_file_data) {

	var current_file_data = this.ui.getData();


	console.log('modified');

	if (equal_data(this.original_file_data, current_file_data)) {

		this.setData(new_file_data);

	}

	else if (!equal_data(current_file_data, new_file_data)) {

		if (window.confirm('File on disk has changed. Reload?')) {

			this.setData(new_file_data);

		}

	}


	// TODO: flatten this

	function equal_data (data_a, data_b) {

		if (data_a.length !== data_b.length) return false;


		var length = data_a.length,
		    middle = Math.floor(length / 2),
		    end = length - 1;

		return (
			data_a.charAt(0) === data_b.charAt(0) &&
			data_a.charAt(end) === data_b.charAt(end) &&
			data_a.charAt(middle) === data_b.charAt(middle) &&
			data_a === data_b
		);

	}

};
