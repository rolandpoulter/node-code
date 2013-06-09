"use strict";


module.exports = FileUI;


function FileUI (file, ShelfItemUI) {

	this.file = file;


	if (ShelfItemUI) this.ShelfItemUI = ShelfItemUI;


	this.shelf_item = new this.ShelfItemUI(
		this.file,
		this.file.info,
		this.onClickShelfItem.bind(this)
	);

}


FileUI.prototype.ShelfItemUI = require('./shelf_item_ui');


FileUI.prototype.render = function (shelf_item_parent_node) {

	this.shelf_item.createDom(this.setupShelfItemUI.bind(this));

	this.shelf_item.render(shelf_item_parent_node);

	this.shelf_item.link_node.classList.add('file');

};


FileUI.prototype.setupShelfItemUI = function () {

	this.shelf_item.dom_node.classList.add('file');

};


FileUI.prototype.onClickShelfItem = function () {

	// TODO: fix these LOD violations

	var file_publisher = this.file.publisher,
			file_project_name = this.file.directory.project.name,
			relative_file_path = this.file.info.relative_path;


	if (this.file.is_opened) {
		delete this.file.is_opened;

		file_publisher.emitCloseFile(file_project_name, relative_file_path);
	}

	else {
		this.file.is_opened = true;

		file_publisher.emitOpenFile(file_project_name, relative_file_path);
	}

};
