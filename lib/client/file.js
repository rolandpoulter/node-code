"use strict";


module.exports = File;


File.get = function (directory, relative_file_path) {

	return directory.cache[relative_file_path];

};


function File (directory, file_info, file_publisher, FileUI, File) {

	this.directory = directory;


	this.info = file_info;

	this.publisher = file_publisher;


	if (FileUI) this.FileUI = FileUI;

	if (File) this.File = File;


	this.ui = new this.FileUI(this);


	return this.cacheUpsert();

}


File.prototype.File = File;

File.prototype.FileUI = require('./file_ui');


File.prototype.cacheUpsert = function () {

	var file = this.File.get(this.directory, this.info.base_name) || this;


	return this.directory.cache[this.info.base_name] = file;

};


File.prototype.render = function (shelf_item_parent_node) {

	this.ui.render(shelf_item_parent_node);

};
