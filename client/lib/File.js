"use strict";


var Notification = require('./Notification'),
    ContextMenu = require('./ContextMenu'),
    Selectable = require('./Selectable'),
    Editable = require('./Editable'),
    Dialog = require('./Dialog');


var path_sep = '/';


module.exports = File;


require('./helpers').mixinStore(File);


File.detectCurrent = function (app) {
    return File.current;
	var location = app.editors_dom.scrollTop,
	    children = Array.prototype.slice.call(app.editors_dom.childNodes),
	    current = document.querySelector('a.current');

	if (!current) children.forEach(function (child) {
		if (current) return;

		var top = child.offsetTop,
		    bottom = top + child.offsetHeight;

		if (location >= top && location < bottom) current = child;
	});

	if (current) {
		current = current.js_object;
	}

	return current;
};


function File (name, parent, app) {
	this.app = app;
	this.ext = (function (list) {return list[list.length - 1];})(name.split('.'));
	this.base = name.split(path_sep).pop();
	this.name = name;
	this.parent = parent;

	new Selectable(this, 'file_dom', app.files_dom);
	new Editable(this, 'editor_dom');

	return File.set(this, name, app);
}


File.prototype.render = function () {
	this.file_dom = document.createElement('a');
	this.open_dom = document.createElement('a');

	this.editor_dom = document.createElement('div');

	this.file_dom.js_object =
	this.open_dom.js_object =
	this.editor_dom.js_object = this;

	this.file_dom.classList.add('file');
	this.editor_dom.classList.add('editor');

	this.file_dom.innerHTML = this.base;
	this.open_dom.innerHTML = this.name + '<span class="close">&#x2715;</span>';

	if (this.parent && this.parent.tree_dom) {
		this.parent.tree_dom.appendChild(this.file_dom);
	}

	else this.app.files_dom.appendChild(this.file_dom);

	this.app.opened_dom.appendChild(this.open_dom);
	this.app.editors_dom.appendChild(this.editor_dom);

	return this;
};

File.prototype.save = function () {
	if (this.saving) {
		clearTimeout(this.save_timer);
		this.save_timer = setTimeout(this.save.bind(this), 250);

		return this;
	}

	this.saving = true;

	this.file_dom.classList.add('saving');
	this.open_dom.classList.add('saving');

	this.app.socket.emit('write file', this.name, this.getEditorValue());

	return this;
};

File.prototype.saved = function () {
	delete this.saving;

	this.data = this.getEditorValue();

	this.file_dom.classList.remove('saving');
	this.open_dom.classList.remove('saving');

	new Notification({message: this.name + ' saved'}).render();

	return this;
};

File.prototype.read = function (data) {
	this.data = data;
	this.setEditorValue(data)

	new Notification({message: this.name + ' loaded'}).render();

	return this;
};

File.prototype.select = function () {
	return this;
};

File.prototype.unselect = function () {
	return this;
};

File.prototype.revert = function () {
	this.app.socket.emit('read file', this.name);

	return this;
}

File.prototype.open = function () {
	if (!this.is_open) {
		this.is_open = true;

		this.file_dom.classList.add('open');
		this.open_dom.classList.add('open');

		this.revert();

		this.createEditor();
	}

	return this.current();
};

File.prototype.close = function () {
	var file = this;

	if (this.is_open) {
		if (this.data !== this.getEditorValue()) {
			new Dialog({
				modal: true,
				header: 'Close file with unsaved changes?',
				content: this.name + ' has unsaved changes. Do you want to close without saving?',
				buttons: [
					{name: 'Close', action: function (e, close) {
						doClose();
						close();
					}},
					{name: 'Save and Close', action: function (e, close) {
						// TODO: make sure the file was saved and then close
						file.save();
						doClose();
						close();
					}},
					{name: 'Cancel', action: 'close'}
				]
			}).render();
		} else {
			doClose();
		}
	}

	function doClose () {
		file.destroyEditor();
	
		file.file_dom.classList.remove('open');
		file.open_dom.classList.remove('open');
	
		delete file.is_open;

		file.app.socket.emit('close', file.name);

		file.uncurrent();
	}

	return this;
};

File.prototype.current = function () {
    if (File.current !== this) {
	    File.current = this;

	    var current_list = Array.prototype.slice.call(
		    this.app.opened_dom.querySelectorAll('.current')
	    );

	    current_list.forEach(function (current) {
		    current.js_object.uncurrent();
	    });

	    this.file_dom.classList.add('current');
	    this.open_dom.classList.add('current');
	    this.editor_dom.classList.add('current');
    }

	this.editor_dom.parentNode.scrollTop = this.editor_dom.offsetTop;

	this.focusEditor();

	return this;
};

File.prototype.uncurrent = function () {
    this.file_dom.classList.remove('current');
    this.open_dom.classList.remove('current');
    this.editor_dom.classList.remove('current');

	if (File.current === this) {
		File.current = File.detectCurrent(this.app);

		if (File.current !== this) {
			File.current.open();

		} else {
			File.current = null;
		}
	}

	return this;
};

File.prototype.changed = function () {
	//console.log('changed', this);

	if (this.is_open) {
		var that = this;

		new Dialog({
			modal: true,
			header: 'Revert file changes?',
			content: this.name + ' was changed while editing. Do you want to revert changes?',
			buttons: [
				{name: 'Revert', action: function (e, close) {
					that.revert();
					close();
				}},
				{name: 'Cancel', action: 'close'}
			]
		}).render();

	} else {
		new Notification({message: this.name + ' changed'}).render();
	}

	return this;
};

File.prototype.removed = function () {
	//console.log('removed', this);

	new Notification({message: this.name + ' removed'}).render();

	return this.remove();
};

File.prototype.remove = function () {
	File.set(undefined, this.name, this.app);

	this.destroyEditor();

	this.file_dom.parentNode.removeChild(this.file_dom);
	this.open_dom.parentNode.removeChild(this.open_dom);
	this.editor_dom.parentNode.removeChild(this.editor_dom);

	return this;
};
