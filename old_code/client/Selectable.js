"use strict";


module.exports = Selectable;


function Selectable (item, dom_key, parent_node) {
	this.item = item;
	this.dom_key = dom_key;
	this.parent_node = parent_node;

	var selectable = item.selectable = this;

	['shiftSelect', 'controlSelect', 'onlySelect'].forEach(function (method) {
		item[method] = function () {
			var result = selectable[method].apply(selectable, arguments);
			return result === selectable ? item : result;
		};
	});
}


Selectable.prototype.shiftSelect = function () {
	// TODO: find item inbetween this and the last selected and select them
	return this.toggleSelect();
};

Selectable.prototype.controlSelect = function () {
	return this.toggleSelect();
};

Selectable.prototype.onlySelect = function () {
	var this_node = this.item[this.dom_key];

	var selected = Array.prototype.slice.call(
		this.parent_node.querySelectorAll('.selected')
	);

	selected.forEach(function (node) {
		if (node !== this_node) {
			node.js_object.selectable.unselect();
		}
	});

	return this.toggleSelect();
};

Selectable.prototype.toggleSelect = function () {
	if (this.item[this.dom_key]) {
		if (this.item[this.dom_key].classList.contains('selected')) {
			this.unselect();
		} else {
			this.select()
		}
	}

	return this;
};

Selectable.prototype.select = function () {
	if (this.item[this.dom_key]) {
		this.item[this.dom_key].classList.add('selected');

		Selectable.lastSelected = this;

		if (this.item.select) this.item.select();
	}

	return this;
};

Selectable.prototype.unselect = function () {
	if (this.item[this.dom_key]) {
		this.item[this.dom_key].classList.remove('selected');

		if (this.item.unselect) this.item.unselect();
	}

	return this;
};
