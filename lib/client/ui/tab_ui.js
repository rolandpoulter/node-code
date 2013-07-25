"use strict";


module.exports = TabUI;


function TabUI (owner, context, onClick, onClickClose) {

	this.owner = owner;

	this.context = context;


	if (onClick) this.onClick = onClick;

	if (onClickClose) this.onClickClose = onClickClose;

}


TabUI.prototype.render = function (parent_node) {

	this.createDom();


	if (this.dom_node.parentNode !== parent_node) {
		parent_node.appendChild(this.dom_node);
	}

};

TabUI.prototype.remove = function () {

	this.dom_node.parentNode.removeChild(this.dom_node);

};


TabUI.prototype.createDom = function (setupCallback) {

	if (this.dom_node) return;


	this.dom_node = document.createElement('a');

	this.close_node = document.createElement('span');


	this.dom_node.innerHTML = this.context.base_name;

	this.dom_node.owner_object = this.owner;


	this.close_node.classList.add('close');

	this.close_node.innerHTML = '&#x2715;';

	this.dom_node.appendChild(this.close_node);


	this.setupEvents();


	if (setupCallback) setupCallback(this);

};

TabUI.prototype.setupEvents = function () {

	this.dom_node.addEventListener('click', this.onClick.bind(this));

	this.close_node.addEventListener('click', this.onClickClose.bind(this));

};

TabUI.prototype.onClick = function (dom_event) {};

TabUI.prototype.onClickClose = function (dom_event) {};

