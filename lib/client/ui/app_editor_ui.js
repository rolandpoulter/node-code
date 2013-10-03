"use strict";


exports = module.exports = dependency.register(AppEditorUI);


function AppEditorUI () {}


AppEditorUI.prototype.render = function (parent_node) {
	this.dom_node = document.createElement('div');
	this.dom_node.classList.add('editor-container');

	parent_node.appendChild(this.dom_node);
};


AppEditorUI.prototype.resize = function (app_ui_resizer) {
	if (!this.dom_node) return;

	var dom_node_style = this.dom_node.style;

	dom_node_style.top = app_ui_resizer.tabs_height + 'px';
	dom_node_style.left = app_ui_resizer.shelf_width + 'px';
	dom_node_style.width = app_ui_resizer.editor_width + 'px';
	dom_node_style.height = app_ui_resizer.editor_height + 'px';
};
