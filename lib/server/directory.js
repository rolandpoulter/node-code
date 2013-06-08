"use strict";


module.exports = Directory;


Directory.cache = {};


function Directory (path_location, relative_path, cachedPathEntity, Directory, File, fs, async) {

	if (cachedPathEntity) this.cachedPathEntity = cachedPathEntity;

	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	if (async) this.async = async;

	if (fs) this.fs = fs;


	return this.cachedPathEntity(this, path_location, relative_path, this.Directory.cache);

}


Directory.prototype.cachedPathEntity = require('./cached_path_entity');

Directory.prototype.Directory = Directory;

Directory.prototype.File = require('./file');


Directory.prototype.async = require('async');

Directory.prototype.fs = require('fs');


Directory.prototype.getInfo = function () {

	return {
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
		this.absolute_path + '/' + relative_path,
		this.createSubDirectoryOrFile.bind(this, relative_path, next)
	);

};

Directory.prototype.createSubDirectoryOrFile = function (relative_path, next, error, stats) {

	var descriptor = {relative_path: relative_path};


	if (stats.isDirectory()) {
		new this.Directory(this.absolute_path, relative_path);

		descriptor.type = 'Directory';
	}

	else {
		new this.File(this.absolute_path, relative_path);

		descriptor.type = 'File';
	}


	next(null, descriptor);

};

Directory.prototype.indexCallback = function (callback, error, directory_index) {

	callback(directory_index);

};
