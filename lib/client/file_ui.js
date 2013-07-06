"use strict";


module.exports = FileUI;


function FileUI (file, ShelfItemUI, TabUI, EditorUI) {

	this.file = file;

	this.app_ui = this.file.app_ui;


	if (ShelfItemUI) this.ShelfItemUI = ShelfItemUI;

	if (TabUI) this.TabUI = TabUI;

	if (EditorUI) this.EditorUI = EditorUI;


	this.shelf_item = new this.ShelfItemUI(
		this.file,
		this.file.info,
		this.onClickShelfItem.bind(this)
	);

	this.tab = new this.TabUI(
		this.file,
		this.file.info,
		this.onClickTab.bind(this),
		this.onClickTabClose.bind(this)
	);

	this.editor = new this.EditorUI(
		this,
		this.file,
		this.file.info
	);

}


FileUI.prototype.ShelfItemUI = require('./shelf_item_ui');

FileUI.prototype.TabUI = require('./tab_ui');

FileUI.prototype.EditorUI = require('./editor_ui');


FileUI.prototype.render = function () {

	var shelf_item_parent_node = this.file.directory.ui.list_node;

	this.shelf_item.createDom(this.setupShelfItemUI.bind(this));

	this.shelf_item.render(shelf_item_parent_node);

	this.shelf_item.link_node.classList.add('file');

};


FileUI.prototype.setupShelfItemUI = function () {

	this.shelf_item.dom_node.classList.add('file');

};


FileUI.prototype.onClickShelfItem = function () {

	this.file.open();

};


FileUI.prototype.onClickTab = function () {

	this.open();

};

FileUI.prototype.onClickTabClose = function (dom_event) {

	dom_event.stopPropagation();

	this.file.close();

};


FileUI.prototype.open = function (file_data) {

	if (FileUI.opened && FileUI.opened !== this) {
		FileUI.opened.unfocus();
	}

	if (FileUI.opened === this) return;

	FileUI.opened = this;


	this.shelf_item.link_node.classList.add('open');


	this.tab.render(this.app_ui.getComponent('tabs').dom_node);

	this.editor.render(this.app_ui.getComponent('editor').dom_node);


	this.focus();

};


FileUI.prototype.close = function () {

	this.shelf_item.link_node.classList.remove('open');

	this.unfocus();

	this.tab.remove();

	this.editor.destroy();

};


FileUI.prototype.focus = function () {

	this.shelf_item.link_node.classList.add('current');

	this.tab.dom_node.classList.add('current');

}


FileUI.prototype.unfocus = function () {

	this.shelf_item.link_node.classList.remove('current');

	this.tab.dom_node.classList.remove('current');


	this.editor.remove();

};


FileUI.prototype.setData = function (file_data) {

	this.editor.setData(file_data);

};

FileUI.prototype.getData = function () {

	return this.editor.getData();

};

