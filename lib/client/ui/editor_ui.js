"use strict";


exports = module.exports = dependency.register(EditorUI);


function EditorUI (app_ui) {

	this.app_ui = app_ui;

}


EditorUI.prototype.render = function (parent_node) {

	this.secondary_split_view = new UI.SplitViewInPixels({
		split_size: 30,
		one: {names: 'tool-bar'},
		two: {names: 'editor-container'}
	});

	this.primary_split_view = new UI.SplitViewInPixels({
		element: {
			parent: parent_node
		},
		collapse: 'two',
		split_size: 20,
		invert_size: true,
		one: {
			children: [
				this.secondary_split_view.element
			]
		},
		two: {names: 'status-bar'}
	});

};
