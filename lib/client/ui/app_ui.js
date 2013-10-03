"use strict";


require('./ui_components');

require('./app_ui_resizer');


require('./app_tabs_ui');

require('./app_shelf_ui');

require('./app_editor_ui');

require('./app_overlay_ui');

require('./app_status_bar_ui');


require('./app_tabs_ui_resize_handle');

require('./app_shelf_ui_resize_handle');

require('./app_status_bar_ui_resize_handle');


exports = module.exports = dependency.injection(AppUI);


function AppUI (
	app_events,
	UIComponents,
	AppUIResizer,
	AppTabsUI,
	AppShelfUI,
	AppEditorUI,
	AppOverlayUI,
	AppStatusBarUI,
	AppTabsUIResizeHandle,
	AppShelfUIResizeHandle,
	AppStatusBarUIResizeHandle
) {

	this.events = app_events;


	this.ui_components = new UIComponents({
		tabs: new AppTabsUI(),
		shelf: new AppShelfUI(),
		editor: new AppEditorUI(),
		overlay: new AppOverlayUI(),
		status_bar: new AppStatusBarUI()
	});


	this.resizer = new AppUIResizer(this.ui_components);


	this.ui_components.addComponent('tabs_resize_handle', new AppTabsUIResizeHandle(this.resizer));

	this.ui_components.addComponent('shelf_resize_handle', new AppShelfUIResizeHandle(this.resizer));


	this.ui_components.addComponent(
		'status_bar_resize_handle', new AppStatusBarUIResizeHandle(this.resizer)
	);


	// this.warnBeforeExit();

}


AppUI.prototype.warnBeforeExit = function (message) {

	window.onbeforeunload = this.onWarnBeforeExit;

};

AppUI.prototype.onWarnBeforeExit = function (event) {

	return message || 'Are you sure you want to exit this session?';

};


AppUI.prototype.render = function (parent_node) {

	this.createDomNode();


	this.ui_components.invokeForEachComponent('render', [this.dom_node], [
		'shelf',
		'tabs',
		'editor',
		'status_bar',
		'tabs_resize_handle',
		'shelf_resize_handle',
		'status_bar_resize_handle',
		'overlay'
	]);


	parent_node.appendChild(this.dom_node);


	this.resizer.setup();

};


AppUI.prototype.createDomNode = function () {

	this.dom_node = document.createElement('div');

	this.dom_node.classList.add('app');

};


AppUI.prototype.resize = function () {

	this.resizer.resize();

};


AppUI.prototype.getComponent = function (component_name) {

	return this.ui_components.getComponent(component_name);

};

