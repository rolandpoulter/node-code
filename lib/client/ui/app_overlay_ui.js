"use strict";


exports = module.exports = dependency.register(AppOverlayUI);


function AppOverlayUI () {}


AppOverlayUI.prototype.render = function (parent_node) {
	this.dom_node = document.createElement('div');
	this.dom_node.classList.add('overlay');

	parent_node.appendChild(this.dom_node);
};
