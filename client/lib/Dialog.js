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

	this.close_dom = document.createElement('a');

	this.container_dom.classList.add('dialog');

	this.header_dom.classList.add('header');
	this.content_dom.classList.add('content');
	this.footer_dom.classList.add('footer');

	var close = this.remove.bind(this),
	    that = this;

	this.header_dom.innerHTML = this.options.header || '';

	if (this.options.close) {
		this.header_dom.appendChild(this.close_dom);
		this.close_dom.classList.add('close');
		this.close_dom.innerHTML = '&#x2715;';
		this.close_dom.onclick = close;
	}

	this.content_dom.innerHTML = this.options.content || '';
	this.footer_dom.innerHTML = this.options.footer || '';

	if (this.options.buttons) {
		this.buttons = {};

		this.options.buttons.forEach(function (button) {
			if (!button.name) return;

			var button_dom = that.buttons[button.name] = document.createElement('button');

			button_dom.className = button.classes;
			button_dom.innerHTML = button.content || button.name;
			button_dom.onclick = button.action === 'close' ?
				close :
				typeof button.action === 'function' ?
					function (e) {button.action.call(that, e, close);} :
					(that[button.action] && that[button.action].bind && that[button.action].bind(this));

			that.footer_dom.appendChild(button_dom);
		});
	}

	this.container_dom.appendChild(this.header_dom);
	this.container_dom.appendChild(this.content_dom);
	this.container_dom.appendChild(this.footer_dom);

	if (this.options.modal) {
		parent.classList.add('modal');
	}

	parent.appendChild(this.container_dom);

	window.addEventListener('resize', this.resizeHandler = this.center.bind(this));

	return this.center();
};

Dialog.prototype.remove = function () {
	if (this.options.modal) {
		this.container_dom.parentNode.classList.remove('modal');
	}

	this.container_dom.parentNode.removeChild(this.container_dom);

	window.removeEventListener('resize', this.resizeHandler);

	return this;
};

Dialog.prototype.center = function () {
	var cdom = this.container_dom,
	    width = cdom.offsetWidth,
	    height = cdom.offsetHeight,
	    style = cdom.style;

	style.left = Math.max(0, (innerWidth / 2 - (width / 2))) + 'px';
	style.top = Math.max(0, (innerHeight / 2 - (height))) + 'px';
 
	return this;
};
