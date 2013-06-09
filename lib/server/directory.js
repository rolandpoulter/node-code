"use strict";


module.exports = Directory;


function Directory (project_location, absolute_path, cachedEntity, Directory, File, fs, path, async) {

	if (cachedEntity) this.cachedEntity = cachedEntity;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	if (async) this.async = async;

	if (path) this.path = path;

	if (fs) this.fs = fs;


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


Directory.prototype.open = function (callback) {};


Directory.prototype.close = function (callback) {};


Directory.prototype.index = function (callback) {

	this.fs.readdir(this.absolute_path, this.handleIndex.bind(this, callback));

};

Directory.prototype.handleIndex = function (callback, error, directory_index) {

	// TODO: handle error

	if (directory_index) {
		this.async.map(
			directory_index,
			this.indexStat.bind(this),
			this.indexCallback.bind(this, callback)
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
		item = new this.Directory(this.project_location, item_absolute_path);
	}

	else {
		item = new this.File(this.project_location, item_absolute_path);
	}


	next(null, item.getInfo());

};

Directory.prototype.indexCallback = function (callback, error, directory_index) {

	callback(directory_index);

};
