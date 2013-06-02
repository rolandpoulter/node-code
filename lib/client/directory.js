"use strict";


// var Notification = require('./Notification'),
    // ContextMenu = require('./ContextMenu'),
    // Selectable = require('./Selectable'),
    // Dialog = require('./Dialog');


// var path_sep = '/';


// var File = require('./File');


module.exports = Directory;


// Directory.create_from_list = function (files, app) {
	// return new Directory('', null, app).create_from_list(files);
// };


// require('./helpers').mixin_store(Directory, 'dirs');


Directory.get = function (relative_project_path) {

	return Directory.cache[relative_project_path];

};


Directory.cache = {};


function Directory (directory_data, project, app_events, app_publisher) {

	this.data = directory_data;

	this.project = project;

	this.events = app_events;

	this.publisher = app_publisher;


	return this.cacheUpsert();

}


Directory.prototype.cacheUpsert = function () {

	var directory = Directory.cache[this.data.relative_path] || this;

	return directory;

};


// function Directory (name, parent, app) {

	// this.app = app;
	// this.root = parent && parent.parent || parent;
	// this.base = name.split(path_sep).pop();
	// this.name = name;
	// this.parent = parent;
	// this.children = {};

	// new Selectable(this, 'file_dom', app.files_dom);

	// return Directory.set(this, name, app);
// }


Directory.prototype.render = function (parent_node) {

	// this.tree_dom = document.createElement('div')
	// this.tree_dom.js_object = this;

	// this.tree_dom.classList.add('tree');

	// if (this.parent) {
		// this.tree_dom.classList.add('collapse');
	// }

	// if (this.parent && this.parent.tree_dom) {
		// this.shelf_ui.dom_node.appendChild(this.tree_dom);
	// } 

	// else this.shelf_ui.dom_node.appendChild(this.tree_dom);

	// if (this.name) {

		this.dom_node = document.createElement('a');

		// this.file_dom.js_object = this;


		this.setupEvents();


		this.dom_node.classList.add('directory');

		this.dom_node.innerHTML = this.data.base_name;


		parent_node.appendChild(this.dom_node);

	// }

	// return this.render_children();
};


Directory.prototype.setupEvents = function () {

	this.dom_node.addEventListener('click', this.onClick.bind(this));

};

Directory.prototype.onClick = function (dom_event) {

	console.log('click directory: ', this.data);


	if (this.is_opened) {

		this.publisher.directory.emitCloseDirectory(this.project.name, this.data.relative_path);

	}

	else {

		this.publisher.directory.emitOpenDirectory(this.project.name, this.data.relative_path);

		this.publisher.directory.emitIndexDirectory(this.project.name, this.data.relative_path);

	}

};

// Directory.prototype.render_children = function () {
// 	var that = this,
// 	    directories = [],
// 	    files = [];

// 	Object.keys(this.children).forEach(function (key) {
// 		var child = that.children[key];

// 		if (child instanceof Directory) {
// 			directories.push(child);

// 		} else if (child instanceof File) {
// 			files.push(child);
// 		}
// 	});

// 	directories.forEach(function (directory) {
// 		directory.render();
// 	});

// 	files.forEach(function (file) {
// 		file.render();
// 	});

// 	return this;
// };

// Directory.prototype.create_from_list = function (list, app) {
// 	app = app || this.app;

// 	var parent = this,
// 	    name = this.name.split(path_sep);

// 	name.pop();
// 	name = name.join(path_sep);

// 	if (typeof list !== 'object') {
// 		return this;
// 	}

// 	Object.keys(list).sort(function (a, b) {
// 		if (a > b) return 1;
// 		if (b > a) return -1;
// 		return 0;

// 	}).forEach(function (key) {
// 		if (!key) return;

// 		var type = typeof list[key];

// 		if (type === 'string') {
// 			parent.create_file(list[key], parent, app);

// 		} else if (type === 'object' && list[key])  {
// 			var fullname = (name ? name + path_sep : '') + key,
// 			    directory = parent.create_directory(fullname, parent, app);

// 			directory.create_from_list(list[key]);
// 		}
// 	});

// 	return this;
// };

// Directory.prototype.create_directory = function (name, parent, app) {
// 	app = app || this.app;

// 	var segments = name.split(path_sep),
// 	    parent = parent || this;

// 	segments = segments.map(function (segment) {
// 		var directory = parent.children[segment];

// 		if (!(directory instanceof Directory)) {
// 			var fullname = (parent.name ? parent.name + path_sep : '') + segment;

// 			return parent.children[segment] = new Directory(fullname, parent, app);
// 		}

// 		return directory;
// 	})

// 	return segments.pop();
// };

// Directory.prototype.create_file = function (name, parent, app) {
// 	app = app || this.app;

// 	var segments = name.split(path_sep),
// 	    last = segments.pop();

// 	if (!parent) {
// 		parent = segments.length ?
// 			this.root.create_directory(segments.join(path_sep), parent, app) :
// 			this.root;
// 	}

// 	var file = parent.children[last];

// 	if (!(file instanceof File)) {
// 		return parent.children[last] = new File(name, parent, app);
// 	}

// 	return file;
// };

// Directory.prototype.select = function () {
// 	return this;
// };

// Directory.prototype.unselect = function () {
// 	return this;
// };

// Directory.prototype.open_file_list = function (list) {
// 	var app = this.app;

// 	list.forEach(function (name) {
// 		File.get(name, app).open();
// 	});

// 	return this;
// };

// Directory.prototype.open = function () {
// 	this.tree_dom.classList.toggle('collapse');

// 	return this;
// };

// Directory.prototype.close = function () {
// 	return this;
// };

// Directory.prototype.changed = function () {
// 	//console.log('changed', this);

// 	new Notification({message: this.name + ' changed'}).render();

// 	return this;
// };

// Directory.prototype.removed = function () {
// 	//console.log('removed', this);

// 	new Notification({message: this.name + ' removed'}).render();

// 	return this.remove();
// };

// Directory.prototype.remove = function () {
// 	Directory.set(undefined, this.name, this.app);

// 	this.tree_dom.parentNode.removeChild(this.tree_dom);

// 	if (this.file_dom) {
// 		this.file_dom.parentNode.removeChild(this.file_dom);
// 	}

// 	return this.remove_children();
// };

// Directory.prototype.remove_children = function () {
// 	var that = this;

// 	Object.keys(this.children).forEach(function (key) {
// 		that.children[key].remove();
// 	});

// 	return this;
// };
