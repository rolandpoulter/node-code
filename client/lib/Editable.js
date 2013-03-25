"use strict";


module.exports = Editable;


Editable.ext_map = {
	'md': 'ace/mode/markdown',
	'js': 'ace/mode/javascript',
	'json': 'ace/mode/json',
	'html': 'ace/mode/html',
	'css': 'ace/mode/css'
};


function Editable (item, dom_key) {
	this.item = item;
	this.dom_key = dom_key;

	var editable = item.editable = this;

	Object.keys(Editable.prototype).forEach(function (method) {
		item[method] = function () {
			var result = editable[method].apply(editable, arguments);
			return result === editable ? item : result;
		};
	});
}


Editable.prototype.destroyEditor = function () {
	if (this.editor) {
		this.editor.destroy();
	}

	return this;
};

Editable.prototype.createEditor = function () {
	if (this.editor || !this.item[this.dom_key]) return this;

	this.editor = ace.edit(this.item[this.dom_key]);

	this.editor.setTheme("ace/theme/monokai");

	this.editor_session = this.editor.getSession();

	this.editor_session.setMode(
		Editable.ext_map[this.item.ext] || 'ace/mode/text'
	);

	this.editor.commands.addCommand({
		name: 'save',
		bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
		exec: this.item.save.bind(this.item),
		readOnly: true
	});

	return this;
};

Editable.prototype.setEditorValue = function (data) {
	this.editor.setValue(data);
	this.editor.clearSelection();

	return this;
};

Editable.prototype.getEditorValue = function () {
	return this.editor.getValue();
};

Editable.prototype.toggleEditor = function () {
	if (this.item[this.dom_key] && this.item[this.dom_key].style.display !== 'none') {
		this.hideEditor();

	} else {
		this.showEditor();
	}

	return this;
};

Editable.prototype.showEditor = function () {
	if (!this.editor) {
		this.createEditor();

	} else if (this.item[this.dom_key]) {
		this.item[this.dom_key].style.display = 'block';
	}

	return this.editor;
};

Editable.prototype.hideEditor = function () {
	if (this.item[this.dom_key]) {
		this.item[this.dom_key].style.display = 'none';
	}

	return this;
};

Editable.prototype.focusEditor = function () {
	this.editor.focus();

	return this;
};
