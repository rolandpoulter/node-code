"use strict";


var Notification = require('./Notification'),
    ContextMenu = require('./ContextMenu'),
    Dialog = require('./Dialog');


var path_sep = '/';


var File = require('./File');


module.exports = Directory;


Directory.createFromList = function (files, app) {
	return new Directory('', null, app).createFromList(files);
};


require('./helpers').mixinStore(Directory, 'dirs');


function Directory (name, parent, app) {
	this.app = app;
	this.root = parent && parent.parent || parent;
	this.base = name.split(path_sep).pop();
	this.name = name;
	this.parent = parent;
	this.children = {};

	return Directory.set(this, name, app);
}


Directory.prototype.render = function () {
	this.tree_dom = document.createElement('div')
	this.tree_dom.object = this;

	this.tree_dom.classList.add('tree');

	if (this.parent) {
		this.tree_dom.classList.add('collapse');
	}

	if (this.parent && this.parent.tree_dom) {
		this.parent.tree_dom.appendChild(this.tree_dom);
	} 

	else this.app.files_dom.appendChild(this.tree_dom);

	if (this.name) {
		this.file_dom = document.createElement('a');
		this.file_dom.object = this;

		this.file_dom.classList.add('directory');
		this.file_dom.innerHTML = this.base;

		this.tree_dom.appendChild(this.file_dom);
	}

	return this.renderChildren();
};

Directory.prototype.renderChildren = function () {
	var that = this,
	    directories = [],
	    files = [];

	Object.keys(this.children).forEach(function (key) {
		var child = that.children[key];

		if (child instanceof Directory) {
			directories.push(child);

		} else if (child instanceof File) {
			files.push(child);
		}
	});

	directories.forEach(function (directory) {
		directory.render();
	});

	files.forEach(function (file) {
		file.render();
	});

	return this;
};

Directory.prototype.createFromList = function (list, app) {
	app = app || this.app;

	var parent = this,
	    name = this.name.split(path_sep);

	name.pop();
	name = name.join(path_sep);

	Object.keys(list).sort(function (a, b) {
		if (a > b) return 1;
		if (b > a) return -1;
		return 0;

	}).forEach(function (key) {
		if (!key) return;

		if (typeof list[key] === 'string') {
			parent.createFile(list[key], parent, app);

		} else {
			var fullname = (name ? name + path_sep : '') + key,
			    directory = parent.createDirectory(fullname, parent, app);

			directory.createFromList(list[key]);
		}
	});

	return this;
};

Directory.prototype.createDirectory = function (name, parent, app) {
	app = app || this.app;

	var segments = name.split(path_sep),
	    parent = parent || this;

	segments = segments.map(function (segment) {
		var directory = parent.children[segment];

		if (!(directory instanceof Directory)) {
			var fullname = (parent.name ? parent.name + path_sep : '') + segment;

			return parent.children[segment] = new Directory(fullname, parent, app);
		}

		return directory;
	})

	return segments.pop();
};

Directory.prototype.createFile = function (name, parent, app) {
	app = app || this.app;

	var segments = name.split(path_sep),
	    last = segments.pop();

	if (!parent) {
		parent = segments.length ?
			this.root.createDirectory(segments.join(path_sep), parent, app) :
			this.root;
	}

	var file = parent.children[last];

	if (!(file instanceof File)) {
		return parent.children[last] = new File(name, parent, app);
	}

	return file;
};

Directory.prototype.openFileList = function (list) {
	var app = this.app;

	list.forEach(function (name) {
		File.get(name, app).open();
	});

	return this;
};

Directory.prototype.select = function () {
	if (this.file_dom) {
		this.file_dom.classList.toggle('selected');
	}

	return this;
};

Directory.prototype.open = function () {
	this.tree_dom.classList.toggle('collapse');

	return this;
};

Directory.prototype.close = function () {
	return this;
};

Directory.prototype.changed = function () {
	//console.log('changed', this);

	new Notification({message: this.name + ' changed'}).render();

	return this;
};

Directory.prototype.removed = function () {
	//console.log('removed', this);

	new Notification({message: this.name + ' removed'}).render();

	return this.remove();
};

Directory.prototype.remove = function () {
	Directory.set(undefined, this.name, this.app);

	this.tree_dom.parentNode.removeChild(this.tree_dom);

	if (this.file_dom) {
		this.file_dom.parentNode.removeChild(this.file_dom);
	}

	return this.removeChildren();
};

Directory.prototype.removeChildren = function () {
	var that = this;

	Object.keys(this.children).forEach(function (key) {
		that.children[key].remove();
	});

	return this;
};
