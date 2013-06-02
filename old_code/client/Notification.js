"use strict";


module.exports = Notification;


function Notification (options) {
	this.options = options;
}


Notification.prototype.render = function (parent) {
	parent = parent || window.$('#overlay');

	this.message_dom = document.createElement('div');

	this.message_dom.classList.add('notification');

	this.message_dom.innerHTML = this.options.message;

	this.message_dom.onclick = this.remove.bind(this);

	parent.appendChild(this.message_dom);

	setTimeout(this.message_dom.onclick, 8000);

	return this;
};

Notification.prototype.remove = function () {
	this.message_dom.parentNode.removeChild(this.message_dom);

	this.message_dom.onclick = null;

	return this;
};
