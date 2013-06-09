"use strict";


module.exports = Directory;


Directory.get = function (project, relative_directory_path) {

	return project.cache[relative_directory_path];

};


function Directory (
	project,
	directory_info,
	app_publishers,
	DirectoryUI,
	Directory,
	File
) {

	this.project = project;

	this.info = directory_info;

	this.publishers = app_publishers;


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


Directory.prototype.render = function (shelf_item_parent_node) {

	this.ui.render(shelf_item_parent_node);

};



Directory.prototype.updateIndex = function (directory_index) {

	var that = this;

	directory_index.sort(function (item_a, item_b) {

		if (item_a.type === item_b.type) {

			var string_a = item_a.base_name.toLowerCase(),
			    string_b = item_b.base_name.toLowerCase();

			if (string_a < string_b) return -1;

			if (string_a > string_b) return 1;

			return 0;

		}

		if (item_a.type === 'Directory') return -1;

		return 1;

	});

	directory_index.forEach(function (index_item) {

		var item;

		if (index_item.type === 'Directory') {
			item = new that.Directory(
				that.project,
				index_item,
				that.publishers
			);
		}

		else if (index_item.type === 'File') {
			item = new that.File(
				that,
				index_item,
				that.publishers.file
			);
		}

		item.render(that.ui.list_node);

	});

};
