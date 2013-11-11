"use strict";


exports = module.exports = dependency.register(AceEditorUI);


function AceEditorUI (file_ui, file, file_info) {

	this.file_ui = file_ui;

	this.file = file;

	this.file_info = file_info;

}


AceEditorUI.prototype.render = function (parent_node) {

	this.createEditorNode();

	this.createAceEditor();


	this.configureAceEditor();


	parent_node.appendChild(this.editor_node);

};

AceEditorUI.prototype.createEditorNode = function () {

	if (this.editor_node) return;


	this.editor_node = document.createElement('div');

	this.editor_node.classList.add('editor');

};

AceEditorUI.prototype.createAceEditor = function () {

	if (this.ace_editor) return;


	this.ace_editor = ace.edit(this.editor_node);

	this.ace_editor_session = this.ace_editor.getSession();


	this.setupAceEditorCommands();

};

AceEditorUI.prototype.setupAceEditorCommands = function () {

	this.ace_editor.commands.addCommand({
		name: 'save',
		bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
		exec: this.file.save.bind(this.file),
		readOnly: true
	});

};

AceEditorUI.prototype.configureAceEditor = function () {

	this.ace_editor.setTheme('ace/theme/monokai');


	this.ace_editor.setShowInvisibles(true);


	this.ace_editor_session.setTabSize(2);

	this.ace_editor_session.setUseSoftTabs(false);


	var ace_editor_mode = 'ace/mode/' + (
		this.file_extention_mode_map[this.file_info.extention] ||
		this.default_mode
	);

	this.ace_editor_session.setMode(ace_editor_mode);

}


AceEditorUI.prototype.remove = function () {

	if (this.editor_node && this.editor_node.parentNode) {
		this.editor_node.parentNode.removeChild(this.editor_node);
	}

};

AceEditorUI.prototype.destroy = function () {

	this.ace_editor.destroy();

};

AceEditorUI.prototype.setData = function (file_data) {

	if (!this.ace_editor) return;

	this.ace_editor.setValue(file_data);

	this.ace_editor.clearSelection();

	this.ace_editor.moveCursorTo(0, 0);


	this.ace_editor_session.getUndoManager().reset();

	this.ace_editor.focus();

};

AceEditorUI.prototype.getData = function () {

	return this.ace_editor.getValue();

};


AceEditorUI.prototype.default_mode = 'text';

AceEditorUI.prototype.file_extention_mode_map = {
	'md': 'markdown',
	'js': 'javascript',
	'json': 'json',
	'html': 'html',
	'css': 'css',
	'txt': 'text'

	// TODO: add all modes
};
