"use strict";


dependency.assign('Async', require('async'));

dependency.assign('Path', require('path'));

dependency.assign('FS', require('fs'));


require('../../shared/entity');

require('./file');


exports = module.exports = dependency.injection(Directory);


function Directory (
	project,
	directory_path,
	Entity,
	Directory,
	File,
	FS,
	Path,
	Async
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


Directory.prototype.publish = function (messenger, method, args) {

	var publisher = messenger.createEntityPublisher('Directory', this);

	publisher[method].apply(publisher, args);

};


Directory.prototype.open = function (messenger) {

	// TODO: create a WatcherManager class

	if (this.watchers[messenger.id]) return;

	this.watchers[messenger.id] = true;


	this.index(messenger);


	// TODO: flatten this

	var that = this;

	this.FS.watchFile(this.getAbsolutePath(), function (curr, prev) {

		if (curr.mtime > prev.mtime) that.index(messenger);

	});

};


Directory.prototype.close = function (messenger) {

	if (!this.watchers[messenger.id]) return;

	delete this.watchers[messenger.id];


	this.FS.unwatchFile(this.getAbsolutePath());

};


Directory.prototype.index = function (messenger) {

	this.FS.readdir(this.getAbsolutePath(), this.handleIndex.bind(this, messenger));

};

Directory.prototype.handleIndex = function (messenger, error, directory_index) {

	// TODO: handle error

	if (directory_index) {
		this.Async.map(
			directory_index,
			this.indexStat.bind(this),
			this.indexCallback.bind(this, messenger)
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


	next(null, item.getInfo());

};

Directory.prototype.indexCallback = function (messenger, error, directory_index) {

	this.publish(messenger, 'index', [directory_index]);

};


Directory.prototype.create = function (messenger, name) {

	// this.FS.mkdir

};

Directory.prototype.remove = function (messenger) {

	// this.FS.rmdir

};

// TODO: add copy, and move
