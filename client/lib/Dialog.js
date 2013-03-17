"use strict";


module.exports = Dialog;


function Dialog (options) {
	this.options = options;
}


Dialog.prototype.render = function (parent) {
	parent = parent || window.$('#overlay');

	this.container_dom = document.createElement('div');

	this.header_dom = document.createElement('div');
	this.content_dom = document.createElement('div');
	this.footer_dom = document.createElement('div');

	this.container_dom.classList.add('dialog');

	this.header_dom.classList.add('header');
	this.content_dom.classList.add('content');
	this.footer_dom.classList.add('footer');

	this.container_dom.appendChild(this.header_dom);
	this.container_dom.appendChild(this.content_dom);
	this.container_dom.appendChild(this.footer_dom);

	parent.appendChild(this.container_dom);

	return this;
};

Dialog.prototype.remove = function () {
	this.container_dom.parentNode.removeChild(this.container_dom);

	return this;
};
