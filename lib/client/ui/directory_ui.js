"use strict";


require('./shelf_item_ui');


exports = module.exports = dependency.injection(DirectoryUI);


function DirectoryUI (directory, ShelfItemUI) {

	this.directory = directory;


	this.shelf_item = new ShelfItemUI(
		this.directory,
		this.directory.info,
		this.onClickShelfItem.bind(this)
	);

}


DirectoryUI.prototype.render = function () {

	var shelf_item_parent_node;

	if (this.directory.parent_directory) {
		shelf_item_parent_node = this.directory.parent_directory.ui.list_node;
	}

	else {
		shelf_item_parent_node = this.directory.app_ui.main_split_view.one_element;
	}


	this.shelf_item.createDom(this.setupShelfItemUI.bind(this));

	this.shelf_item.render(shelf_item_parent_node);

};


DirectoryUI.prototype.setupShelfItemUI = function () {

	// TODO: fix these LOD violations

	this.list_node = document.createElement('div');


	this.list_node.classList.add('list');

	this.shelf_item.dom_node.classList.add('tree', 'collapse');

	this.shelf_item.link_node.classList.add('directory');


	if (this.directory.isProjectRoot()) {
		this.shelf_item.dom_node.classList.add('project');
	}

	this.shelf_item.dom_node.appendChild(this.list_node);

};


DirectoryUI.prototype.onClickShelfItem = function () {

	this.directory.toggleOpenAndClose();

};

DirectoryUI.prototype.close = function () {

	this.shelf_item.dom_node.classList.add('collapse');

};

DirectoryUI.prototype.open = function () {

	this.shelf_item.dom_node.classList.remove('collapse');

};
