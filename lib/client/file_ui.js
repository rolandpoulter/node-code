"use strict";


module.exports = FileUI;


function FileUI (file, ShelfItemUI, TabUI) {

	this.file = file;


	if (ShelfItemUI) this.ShelfItemUI = ShelfItemUI;

	if (TabUI) this.TabUI = TabUI;


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

}


FileUI.prototype.ShelfItemUI = require('./shelf_item_ui');

FileUI.prototype.TabUI = require('./tab_ui');


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
		FileUI.opened.removeEditor();
	}

	if (FileUI.opened === this) return;

	FileUI.opened = this;


	this.shelf_item.link_node.classList.add('open');
	this.shelf_item.link_node.classList.add('current');


	this.tab.render(this.file.app_ui.getComponent('tabs').dom_node);
	this.tab.dom_node.classList.add('current');


	this.createEditorDom();

	this.file.app_ui.getComponent('editor').dom_node.appendChild(this.editor_node);

};

FileUI.prototype.createEditorDom = function () {

	if (this.editor_node) return;

	this.editor_node = document.createElement('div');
	this.editor_node.classList.add('editor');


	this.editor = ace.edit(this.editor_node);

	this.editor.setTheme("ace/theme/monokai");

	this.editor_session = this.editor.getSession();

	this.editor.setShowInvisibles(true);
	this.editor_session.setTabSize(2);
	this.editor_session.setUseSoftTabs(false);

	// var JavaScriptMode = window.require("ace/mode/javascript").Mode;

	this.editor_session.setMode(
		// Editable.ext_map[this.item.ext] || 'ace/mode/text'
		// new JavaScriptMode()
		"ace/mode/javascript"
	);


	this.editor.commands.addCommand({
		name: 'save',
		bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
		exec: this.file.save.bind(this.file),
		readOnly: true
	});

};

FileUI.prototype.removeEditor = function () {

	this.shelf_item.link_node.classList.remove('current');
	this.tab.dom_node.classList.remove('current');

	if (this.editor_node && this.editor_node.parentNode) {
		this.editor_node.parentNode.removeChild(this.editor_node);
	}

};

FileUI.prototype.close = function () {

	this.shelf_item.link_node.classList.remove('open');

	this.removeEditor();

	this.tab.remove();

};

FileUI.prototype.setData = function (file_data) {

	if (!this.editor) return;

	this.editor.setValue(file_data);

	this.editor.clearSelection();


	this.editor_session.getUndoManager().reset();

};
