"use strict";


module.exports = DirectoryUI;


function DirectoryUI (directory, ShelfItemUI) {

	this.directory = directory;


	if (ShelfItemUI) this.ShelfItemUI = ShelfItemUI;


	this.shelf_item = new this.ShelfItemUI(
		this.directory,
		this.directory.info,
		this.onClickShelfItem.bind(this)
	);

}


DirectoryUI.prototype.ShelfItemUI = require('./shelf_item_ui');



DirectoryUI.prototype.render = function (shelf_item_parent_node) {

	this.shelf_item.createDom(this.setupShelfItemUI.bind(this));

	this.shelf_item.render(shelf_item_parent_node);

};


DirectoryUI.prototype.setupShelfItemUI = function () {

	this.list_node = document.createElement('div');

	this.list_node.classList.add('list');

	this.shelf_item.dom_node.classList.add('directory');

	this.shelf_item.dom_node.appendChild(this.list_node);

};


DirectoryUI.prototype.onClickShelfItem = function () {

	// TODO: fix these LOD violations

	var directory_publisher = this.directory.publishers.directory,
			directory_project_name = this.directory.project.name,
			relative_directory_path = this.directory.info.relative_path;

	// console.log('click directory: ', this.data);

	if (this.directory.is_opened) {
		directory_publisher.emitCloseDirectory(directory_project_name, relative_directory_path);
	}

	else {
		directory_publisher.emitOpenDirectory(directory_project_name, relative_directory_path);

		directory_publisher.emitIndexDirectory(directory_project_name, relative_directory_path);
	}

};
