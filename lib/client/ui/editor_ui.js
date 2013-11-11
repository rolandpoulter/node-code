"use strict";


exports = module.exports = dependency.register(EditorUI);


function EditorUI (app_ui) {

	this.app_ui = app_ui;

}


EditorUI.prototype.render = function (parent_node) {

	this.secondary_split_view = new UI.SplitViewInPixels({
		split_size: 20,
		invert_size: true,
		one: {},
		two: {names: 'status-bar'}
	});

	this.primary_split_view = new UI.SplitViewInPixels({
		element: {
			other_names: 'editor-container',
			parent: parent_node
		},
		split_size: 30,
		one: {names: 'tabs-container'},
		two: {
			css: {position: 'relative'},
			children: [
				this.secondary_split_view.element
			]
		}
	});

};
