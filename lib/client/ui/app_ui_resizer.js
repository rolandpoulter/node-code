"use strict";


exports = module.exports = dependency.register(AppUIResizer);


function AppUIResizer (app_ui_components) {
	this.app_ui_components = app_ui_components;
}


AppUIResizer.prototype.setup = function () {
	this.shelf_width = Math.max(100, Math.min(200, Math.floor(window.innerWidth * 0.2)));
	this.tabs_height = 30;
	this.status_bar_height = 20;

	this.resize();

	if (!this.resize_handler) {
		this.resize_handler = this.resize.bind(this);

		window.addEventListener('resize', this.resize_handler);
	}
};


AppUIResizer.prototype.resize = function () {
	this.shelf_height = window.innerHeight - this.status_bar_height;
	this.editor_height = (window.innerHeight - this.status_bar_height) - this.tabs_height;

	var tabs_and_editor_width = window.innerWidth - this.shelf_width;

	this.tabs_width = tabs_and_editor_width;
	this.editor_width = tabs_and_editor_width;

	this.app_ui_components.invokeForEachComponent('resize', [this]);
};
