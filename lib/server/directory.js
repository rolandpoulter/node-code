"use strict";


module.exports = Directory;


function Directory (
	project_location,
	project_name,
	absolute_path,
	app_publishers,
	cachedEntity,
	Directory,
	File,
	fs,
	path,
	async
) {

	if (cachedEntity) this.cachedEntity = cachedEntity;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	if (async) this.async = async;

	if (path) this.path = path;

	if (fs) this.fs = fs;


	this.project_name = project_name;


	this.publishers = app_publishers;

	this.directory_publisher = this.publishers.directory;


	this.watchers = {};


	return this.cachedEntity(this, project_location, absolute_path);

}


Directory.prototype.cachedEntity = require('./cached_entity');

Directory.prototype.Directory = Directory;

Directory.prototype.File = require('./file');


Directory.prototype.async = require('async');

Directory.prototype.path = require('path');

Directory.prototype.fs = require('fs');


Directory.prototype.getInfo = function () {

	return {
		type: 'Directory',
		base_name: this.base_name,
		relative_path: this.relative_path
	};

};


Directory.prototype.publish = function (socket, type, args) {

	this.directory_publisher[type].apply(this.directory_publisher, [
		socket,
		this.project_name,
		this.relative_path

	].concat(args || []));

};


Directory.prototype.open = function (socket) {

	if (this.watchers[socket.id]) return;

	this.index(socket);

	var that = this;

	this.watchers[socket.id] = true;

	this.fs.watchFile(this.absolute_path, function (curr, prev) {

		if (curr.mtime > prev.mtime) that.index(socket);

	});

};


Directory.prototype.close = function (socket) {

	if (!this.watchers[socket.id]) return;

	delete this.watchers[socket.id];

	this.fs.unwatchFile(this.absolute_path);

};


Directory.prototype.index = function (socket) {

	this.fs.readdir(this.absolute_path, this.handleIndex.bind(this, socket));

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
		this.path.join(this.absolute_path, relative_path),
		this.createSubDirectoryOrFile.bind(this, relative_path, next)
	);

};

Directory.prototype.createSubDirectoryOrFile = function (relative_path, next, error, stats) {

	var item_absolute_path = this.path.join(this.absolute_path, relative_path),
	    item;

	if (stats.isDirectory()) {
		item = new this.Directory(this.project_location, this.project_name, item_absolute_path, this.publishers);
	}

	else {
		item = new this.File(this.project_location, this.project_name, item_absolute_path, this.publishers.file);
	}


	next(null, item.getInfo());

};

Directory.prototype.indexCallback = function (socket, error, directory_index) {

	this.publish(socket, 'emitDirectoryIndex', [directory_index]);

};
