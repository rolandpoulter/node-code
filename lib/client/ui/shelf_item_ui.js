"use strict";


exports = module.exports = dependency.register(ShelfItemUI);


function ShelfItemUI (owner, context, onClick, onDoubleClick, onRightClick) {

	this.owner = owner;

	this.context = context;


	if (onClick) this.onClick = onClick;

	if (onDoubleClick) this.onDoubleClick = onDoubleClick;

	if (onRightClick) this.onRightClick = onRightClick;

}


ShelfItemUI.prototype.destroy = function () {

	this.removeEvents();

};


ShelfItemUI.prototype.render = function (parent_node) {

	parent_node.appendChild(this.dom_node);

};


ShelfItemUI.prototype.createDom = function (setupCallback) {

	if (this.dom_node) return;


	this.dom_node = document.createElement('div');

	this.link_node = document.createElement('a');


	this.link_node.setAttribute('title', this.context.base_name);

	this.link_node.innerHTML = this.context.base_name;


	this.dom_node.appendChild(this.link_node);


	this.dom_node.owner_object = this.owner;


	this.setupEvents();


	if (setupCallback) setupCallback(this);

};


ShelfItemUI.prototype.setupEvents = function () {

	if (this.bound_onClick) return;


	this.bound_onClick = this.onClick.bind(this);

	this.bound_onDoubleClick = this.onDoubleClick.bind(this);

	this.bound_onRightClick = this.onRightClick.bind(this);


	this.link_node.addEventListener('click', this.bound_onClick);

	this.link_node.addEventListener('dblclick', this.bound_onDoubleClick);

	this.link_node.addEventListener('contextmenu', this.bound_onRightClick);

};

ShelfItemUI.prototype.removeEvents = function () {

	if (!this.bound_onClick) return;


	this.link_node.removeEventListener('click', this.bound_onClick);

	this.link_node.removeEventListener('dblclick', this.bound_onDoubleClick);

	this.link_node.removeEventListener('contextmenu', this.bound_onRightClick);


	delete this.bound_onClick;

	delete this.bound_onDoubleClick;

	delete this.bound_onRightClick;

};


ShelfItemUI.prototype.onClick =
ShelfItemUI.prototype.onDoubleClick =
ShelfItemUI.prototype.onRightClick = function (dom_event) {};


ShelfItemUI.prototype.select = function (shift_select) {

	this.link_node.classList.add('selected');

};

ShelfItemUI.prototype.unselect = function (shift_select) {

	this.link_node.classList.remove('selected');

};

ShelfItemUI.prototype.toggleSelect = function (shift_select) {

	if (this.link_node.classList.contains('selected')) {
		this.unselect(shift_select);
	}

	else {
		this.select(shift_select);
	}

};

