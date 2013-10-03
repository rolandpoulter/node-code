"use strict";


dependency.assign('async', require('async'));

dependency.assign('path', require('path'));

dependency.assign('fs', require('fs'));


require('../shared/entity');

require('./file');


exports = module.exports = dependency.injection(Directory);


function Directory (
	project,
	directory_path,
	Entity,
	Directory,
	File,
	fs,
	path,
	async
) {

	this.project = project;

	this.watchers = {};


	this.entity = new Entity(this, this.project.child_cache, 'getRelativeEntityPath');

	this.entity.setAbsolutePath(
		this.project.getProjectPath(),
		directory_path,
		this.project.getRootPath()
	);


	return this.entity.cacheUpsert();

}


Directory.prototype.getInfo = function () {

	return this.info || (this.info = {
		type: 'Directory',
		base_name: this.getBaseName(),
		relative_path: this.getRelativePath()
	});

};


Directory.prototype.publish = function (socket, method, args) {

	var publisher = socket.createEntityPublisher('Directory', this);

	publisher[method].apply(publisher, args);

};


Directory.prototype.open = function (socket) {

	// TODO: create a WatcherManager class

	if (this.watchers[socket.id]) return;

	this.watchers[socket.id] = true;


	this.index(socket);


	// TODO: flatten this

	var that = this;

	this.fs.watchFile(this.getAbsolutePath(), function (curr, prev) {

		if (curr.mtime > prev.mtime) that.index(socket);

	});

};


Directory.prototype.close = function (socket) {

	if (!this.watchers[socket.id]) return;

	delete this.watchers[socket.id];


	this.fs.unwatchFile(this.getAbsolutePath());

};


Directory.prototype.index = function (socket) {

	this.fs.readdir(this.getAbsolutePath(), this.handleIndex.bind(this, socket));

};

Directory.prototype.handleIndex = function (socket, error, directory_index) {

	// TODO: handle error

	if (directory_index) {
		this.async.map(
			directory_index,
			this.indexStat.bind(this),
			this.indexCallback.bind(this, socket)
		);
	}

};

Directory.prototype.indexStat = function (relative_path, next) {

	this.fs.stat(
		this.path.join(this.getAbsolutePath(), relative_path),
		this.createSubDirectoryOrFile.bind(this, relative_path, next)
	);

};

Directory.prototype.createSubDirectoryOrFile = function (relative_path, next, error, stats) {

	var item_absolute_path = this.path.join(this.getAbsolutePath(), relative_path),
	    item;

	// TODO: detect removed files and cleanup references on the server

	if (stats.isDirectory()) {
		item = this.project.getDirectory(item_absolute_path);
	}

	else {
		item = this.project.getFile(item_absolute_path);
	}


	next(null, item.getInfo());

};

Directory.prototype.indexCallback = function (socket, error, directory_index) {

	this.publish(socket, 'index', [directory_index]);

};


Directory.prototype.create = function (socket, name) {

	// this.fs.mkdir

};

Directory.prototype.remove = function (socket) {

	// this.fs.rmdir

};

// TODO: add copy, and move
