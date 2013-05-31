"use strict";


exports = module.exports = AppStatusBarUI;


function AppStatusBarUI () {}


AppStatusBarUI.prototype.render = function (parent_node) {
	this.dom_node = document.createElement('div');
	this.dom_node.classList.add('status-bar');

	parent_node.appendChild(this.dom_node);
};


AppStatusBarUI.prototype.resize = function (app_ui_resizer) {
	if (!this.dom_node) return;

	var dom_node_style = this.dom_node.style;

	dom_node_style.width = window.innerWidth + 'px';
	dom_node_style.height = app_ui_resizer.status_bar_height + 'px';
};
