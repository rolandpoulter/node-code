"use strict";


module.exports = TabUI;


function TabUI (owner, context, onClick) {

	this.owner = owner;

	this.context = context;


	if (onClick) this.onClick = onClick;

}


TabUI.prototype.render = function (parent_node) {

	this.createDom();


	parent_node.appendChild(this.dom_node);

};


TabUI.prototype.createDom = function (setupCallback) {

	if (this.dom_node) return;


	this.dom_node = document.createElement('a');

	this.dom_node.innerHTML = this.context.base_name;

	this.dom_node.owner_object = this.owner;


	this.setupEvents();


	if (setupCallback) setupCallback(this);

};

TabUI.prototype.setupEvents = function () {

	this.dom_node.addEventListener('click', this.onClick.bind(this));

};

TabUI.prototype.onClick = function (dom_event) {};
