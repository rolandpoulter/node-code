"use strict";


exports = module.exports = dependency.injection(AppUI);


function AppUI (app_events, EditorUI) {

	this.events = app_events;


	// this.warnBeforeExit();

}


AppUI.prototype.warnBeforeExit = function () {

	window.onbeforeunload = this.onWarnBeforeExit.bind(this);

};

AppUI.prototype.onWarnBeforeExit = function (event) {

	return 'Are you sure you want to exit this session?';

};


AppUI.prototype.render = function (parent_node) {

	this.main_split_view = new UI.SplitView({
		element: {
			id: 'app',
			parent: parent_node
		},
		orientation: 'horizontal',
		split_ratio: 0.2,
		one: {id: 'shelf'},
		two: {id: 'main'}
	});


	this.main_editor = new this.EditorUI(this);

	this.main_editor.render(this.main_split_view.two_element);


	this.active_editor = this.main_editor;

};
