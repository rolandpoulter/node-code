"use strict";


dependency.assign('Async', require('async'));

dependency.assign('Path', require('path'));

dependency.assign('FS', require('fs'));


require('../../shared/entity');

require('./file');


exports = module.exports = dependency.injection(Directory);


function Directory (
	parent,
	directory_path,
	Entity,
	Directory,
	File,
	FS,
	Path,
	Async
) {

	this.parent = parent;

	this.project = parent.project || parent;


	this.watchers = {};


	return this.project.createEntity(this, Entity.fileCacheUpsert.bind(
		this.parent,
		directory_path
	));

}


Directory.prototype.getSafeInfo = function () {

	return this.info || (this.info = {
		type: 'Directory',
		base_name: this.getBaseName(),
		relative_path: this.getRelativePath(),
		absolute_path: this.getAbsolutePath()
	});

};


Directory.prototype.open = function () {

	// TODO: create a WatcherManager class

	if (this.watchers[this.messenger.id]) return;

	this.watchers[this.messenger.id] = true;


	this.index();


	// TODO: flatten this

	var that = this;

	this.FS.watchFile(this.getAbsolutePath(), function (curr, prev) {

		if (curr.mtime > prev.mtime) that.index();

	});

};


Directory.prototype.close = function () {

	if (!this.watchers[this.messenger.id]) return;

	delete this.watchers[this.messenger.id];


	this.FS.unwatchFile(this.getAbsolutePath());

};


Directory.prototype.index = function () {

	this.FS.readdir(this.getAbsolutePath(), this.handleIndex.bind(this));

};

Directory.prototype.handleIndex = function (error, directory_index) {

	// TODO: handle error

	if (directory_index) {
		this.Async.map(
			directory_index,
			this.indexStat.bind(this),
			this.indexCallback.bind(this)
		);
	}

};

Directory.prototype.indexStat = function (relative_path, next) {

	this.FS.stat(
		this.Path.join(this.getAbsolutePath(), relative_path),
		this.createSubDirectoryOrFile.bind(this, relative_path, next)
	);

};

Directory.prototype.createSubDirectoryOrFile = function (relative_path, next, error, stats) {

	var item_absolute_path = this.Path.join(this.getAbsolutePath(), relative_path),
	    item;

	// TODO: detect removed files and cleanup references on the server

	if (stats.isDirectory()) {
		item = this.project.getDirectory(item_absolute_path);
	}

	else {
		item = this.project.getFile(item_absolute_path);
	}


	next(null, item.getSafeInfo());

};

Directory.prototype.indexCallback = function (error, directory_index) {

	this.publish('index', [directory_index]);

};


Directory.prototype.create = function (name) {

	// this.FS.mkdir

};

Directory.prototype.remove = function () {

	// this.FS.rmdir

};

// TODO: add copy, and move
