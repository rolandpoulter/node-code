"use strict";


require('./shelf_ui');

require('./editor_ui');


exports = module.exports = dependency.injection(AppUI);


function AppUI (app_events, ShelfUI, EditorUI) {

	this.events = app_events;


	// this.warnBeforeExit();

}


AppUI.prototype.warnBeforeExit = function () {

	window.onbeforeunload = this.onWarnBeforeExit.bind(this);

};

AppUI.prototype.onWarnBeforeExit = function (event) {

	return 'Are you sure you want to exit this session?';

};


AppUI.prototype.render = function () {

	window.app = UI.dom.create({
		id: 'app',
		parent: document.body
	});

	window.overlay = UI.dom.create({
		id: 'overlay',
		parent: document.body
	});


	this.secondary_split_view = new UI.SplitView({
		collapse: 'one',
		split_ratio: 0.2,
		orientation: 'horizontal',
		one: {id: 'shelf', names: 'file-view'},
		two: {id: 'main'}
	});

	this.primary_split_view = new UI.SplitViewInPixels({
		element: {
			parent: window.app
		},
		orientation: 'horizontal',
		split_size: 20,
		resizable: false,
		one: {id: 'toolbar'},
		two: {
			children: [
				this.secondary_split_view.element
			]
		}
	});


	this.main_shelf = new this.ShelfUI(this);

	this.main_shelf.render(this.secondary_split_view.one_element);


	this.main_editor = new this.EditorUI(this);

	this.main_editor.render(this.secondary_split_view.two_element);


	this.active_editor = this.main_editor;

};
