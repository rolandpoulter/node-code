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


Editable.prototype.destroy_editor = function () {
	if (this.editor) {
		this.editor.destroy();

		delete this.editor;

		this.item[this.dom_key].className = 'editor';
		this.item[this.dom_key].innerHTML = '';
	}

	return this;
};

Editable.prototype.create_editor = function () {
	if (this.editor || !this.item[this.dom_key]) return this;

	this.editor = ace.edit(this.item[this.dom_key]);

	this.editor.setTheme("ace/theme/monokai");

	this.editor_session = this.editor.getSession();

	this.editor.setShowInvisibles(true);
	this.editor_session.setTabSize(2);
	this.editor_session.setUseSoftTabs(false);

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

Editable.prototype.set_editor_value = function (data) {
	this.editor.setValue(data);
	this.editor.clearSelection();

	this.editor_session.getUndoManager().reset();

	return this;
};

Editable.prototype.get_editor_value = function () {
	return this.editor.getValue();
};

Editable.prototype.focus_editor = function () {
	this.editor.focus();

	return this;
};
