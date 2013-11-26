"use strict";


require('../../shared/entity');

require('../ui/directory_ui');

require('./file');


exports = module.exports = dependency.injection(Directory);


exports.get = Directory.get = function (project, relative_directory_path) {

	return project.getDirectory(relative_directory_path);

};


function Directory (
	parent,
	directory_info,
	app_ui,
	Entity,
	DirectoryUI,
	Directory,
	File
) {

	this.parent = parent;

	this.project = parent.project || parent;


	this.info = directory_info;

	this.app_ui = app_ui;


	var directory = this.project.createEntity(this, Entity.fileCacheUpsert.bind(
		this.directory,
		this.info.absolute_path
	));


	if (!directory.ui) directory.ui = new DirectoryUI(directory);


	return directory;

}


Directory.prototype.render = function () {

	this.ui.render();

};


Directory.prototype.isProjectRoot = function () {

	return this.project.directory === this;

};


Directory.prototype.open = function () {

	if (this.is_opened) return;

	this.is_opened = true;

	this.ui.open();

	this.publish('open');

};

Directory.prototype.close = function () {

	if (!this.is_opened) return;

	delete this.is_opened;

	this.ui.close();

	this.publish('close');

};

Directory.prototype.toggleOpenAndClose = function () {

	if (this.is_opened) this.close();

	else this.open();

};


Directory.prototype.index =
Directory.prototype.updateIndex = function (directory_index) {

	// TODO: detect removed files and remove them individually instead of emptying the whole list
	this.ui.list_node.innerHTML = '';

	directory_index.sort(this.directoryIndexSorter);

	directory_index.forEach(this.createSubDirectoryOrFile.bind(this));

};

Directory.prototype.directoryIndexSorter = function (item_a, item_b) {

	if (item_a.type === item_b.type) {

		var string_a = item_a.base_name.toLowerCase(),
		    string_b = item_b.base_name.toLowerCase();

		if (string_a < string_b) return -1;

		if (string_a > string_b) return 1;

		return 0;

	}

	if (item_a.type === 'Directory') return -1;

	return 1;

};

Directory.prototype.createSubDirectoryOrFile = function (index_item) {

	var item;

	if (index_item.type === 'Directory') {
		item = new this.Directory(
			this.messenger,
			this.project,
			this,
			index_item,
			this.app_ui
		);
	}

	else if (index_item.type === 'File') {
		item = new this.File(
			this.messenger,
			this.project,
			this,
			index_item,
			this.app_ui
		);
	}

	item.render();

};
