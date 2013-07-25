"use strict";


module.exports = ShelfItemUI;


function ShelfItemUI (owner, context, onClick) {

	this.owner = owner;

	this.context = context;


	if (onClick) this.onClick = onClick;

}


ShelfItemUI.prototype.render = function (parent_node) {

	parent_node.appendChild(this.dom_node);

};


ShelfItemUI.prototype.createDom = function (setupCallback) {

	if (this.dom_node) return;


	this.dom_node = document.createElement('div');

	this.link_node = document.createElement('a');


	this.link_node.innerHTML = this.context.base_name;


	this.dom_node.appendChild(this.link_node);


	this.dom_node.owner_object = this.owner;


	this.setupEvents();


	if (setupCallback) setupCallback(this);

};

ShelfItemUI.prototype.setupEvents = function () {

	this.link_node.addEventListener('click', this.onClick.bind(this));

};

ShelfItemUI.prototype.onClick = function (dom_event) {};
