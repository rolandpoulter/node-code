"use strict";


module.exports = Directory;


Directory.get = function (project, relative_directory_path) {

	return project.cache[relative_directory_path];

};


function Directory (
	project,
	parent_directory,
	directory_info,
	app_publishers,
	app_ui,
	DirectoryUI,
	Directory,
	File
) {

	this.project = project;

	this.parent_directory = parent_directory;


	this.info = directory_info;

	this.publishers = app_publishers;

	this.app_ui = app_ui;


	this.directory_publisher = this.publishers.directory;


	if (DirectoryUI) this.DirectoryUI = DirectoryUI;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	this.ui = new this.DirectoryUI(this);


	return this.cacheUpsert();

}


Directory.prototype.DirectoryUI = require('./directory_ui');

Directory.prototype.Directory = Directory;

Directory.prototype.File = require('./file');


Directory.prototype.cacheUpsert = function () {

	var directory = this.Directory.get(this.project, this.info.relative_path) || this;


	return this.project.cache[this.info.relative_path] = directory;

};


Directory.prototype.render = function () {

	this.ui.render();

};


Directory.prototype.isProjectRoot = function () {

	return this.project.directory === this;

};


Directory.prototype.publish = function (type, args) {

	var directory_project_name = this.project.name,
			relative_directory_path = this.info.relative_path;

	this.directory_publisher[type].apply(this.directory_publisher, [
		directory_project_name,
		relative_directory_path

	].concat(args || []));

};


Directory.prototype.open = function () {

	if (this.is_opened) return;

	this.is_opened = true;

	this.ui.open();

	this.publish('emitOpenDirectory');

};

Directory.prototype.close = function () {

	if (!this.is_opened) return;

	delete this.is_opened;

	this.ui.close();

	this.publish('emitCloseDirectory');

};

Directory.prototype.toggleOpenAndClose = function () {

	if (this.is_opened) this.close();

	else this.open();

};


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
			this.project,
			this,
			index_item,
			this.publishers,
			this.app_ui
		);
	}

	else if (index_item.type === 'File') {
		item = new this.File(
			this,
			index_item,
			this.publishers.file,
			this.app_ui
		);
	}

	item.render();

};
