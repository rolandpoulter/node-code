"use strict";


exports = module.exports = AppUI;


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


	UIComponents = UIComponents || this.UIComponents;
	
	AppUIResizer = AppUIResizer || this.AppUIResizer;

	
	AppTabsUI = AppTabsUI || this.AppTabsUI;
	
	AppShelfUI = AppShelfUI || this.AppShelfUI;

	AppEditorUI = AppEditorUI || this.AppEditorUI;

	AppOverlayUI = AppOverlayUI || this.AppOverlayUI;

	AppStatusBarUI = AppStatusBarUI || this.AppStatusBarUI;


	AppTabsUIResizeHandle = AppTabsUIResizeHandle || this.AppTabsUIResizeHandle;

	AppShelfUIResizeHandle = AppShelfUIResizeHandle || this.AppShelfUIResizeHandle;

	AppStatusBarUIResizeHandle = AppStatusBarUIResizeHandle || this.AppStatusBarUIResizeHandle;


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


AppUI.prototype.UIComponents = require('./ui_components');

AppUI.prototype.AppUIResizer = require('./app_ui_resizer');


AppUI.prototype.AppTabsUI = require('./app_tabs_ui');

AppUI.prototype.AppShelfUI = require('./app_shelf_ui');

AppUI.prototype.AppEditorUI = require('./app_editor_ui');

AppUI.prototype.AppOverlayUI = require('./app_overlay_ui');

AppUI.prototype.AppStatusBarUI = require('./app_status_bar_ui');


AppUI.prototype.AppTabsUIResizeHandle = require('./app_tabs_ui_resize_handle');

AppUI.prototype.AppShelfUIResizeHandle = require('./app_shelf_ui_resize_handle');

AppUI.prototype.AppStatusBarUIResizeHandle = require('./app_status_bar_ui_resize_handle');


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

