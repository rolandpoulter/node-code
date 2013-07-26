"use strict";


module.exports = File;


function File (project, file_path, Entity, fs, path) {

	if (Entity) this.Entity = Entity;


	if (fs) this.fs = fs;

	if (path) this.path = path;


	this.project = project;

	this.watchers = {};


	this.entity = new this.Entity(this, this.project.child_cache, 'getRelativeEntityPath');

	this.entity.setAbsolutePath(
		this.project.getProjectPath(),
		file_path,
		this.project.getRootPath()
	);


	return this.entity.cacheUpsert();

}


File.prototype.Entity = require('../shared/entity');

File.prototype.fs = require('fs');

File.prototype.path = require('path');


File.prototype.getInfo = function () {

	return this.info || (this.info = {
		type: 'File',
		base_name: this.getBaseName(),
		extention: this.path.extname(this.getBaseName()),
		relative_path: this.getRelativePath()
	});

};


File.prototype.publish = function (socket, method, args) {

	var publisher = socket.createEntityPublisher('File', this);

	publisher[method].apply(publisher, args);

};



File.prototype.open = function (socket) {

	// TODO: create a WatcherManager class

	if (this.watchers[socket.id]) return;

	this.watchers[socket.id] = true;


	this.read(socket);


	// TODO: flatten this

	var that = this;

	this.fs.watchFile(this.getAbsolutePath(), function (curr, prev) {

		console.log(that.getAbsolutePath(), curr.mtime > prev.mtime);

		if (curr.mtime > prev.mtime) that.modified(socket);

	});

};

File.prototype.close = function (socket) {

	if (!this.watchers[socket.id]) return;

	delete this.watchers[socket.id];


	this.fs.unwatchFile(this.absolute_path);

};


File.prototype.read = function (socket) {

	// TODO: flatten this

	var that = this;

	this.fs.readFile(this.getAbsolutePath(), 'utf8', function (error, file_data) {

		that.publish(socket, 'data', [file_data]);

	});

};

File.prototype.modified = function (socket) {

	if (this.ignore_next_modify) {
		delete this.ignore_next_modify;

		return;
	}

	// TODO: flatten

	var that = this;

	this.fs.readFile(this.getAbsolutePath(), 'utf8', function (error, file_data) {

		that.publish(socket, 'modified', [file_data]);

	});

};


File.prototype.save = function (socket, file_data, file_format) {

	// TODO: since this is an async write, they should be queued to prevent data loss 

	// TODO: flatten this

	var that = this;

	this.ignore_next_modify = true;

	this.fs.writeFile(
		this.absolute_path,
		file_data,
		file_format || 'utf8',

		function (error) {

			// delete that.ignore_modify;

			if (error) that.publish(socket, 'saveError', [error]);

			else that.publish(socket, 'saveSuccess');

		}
	);

};


File.prototype.create = function () {

	// this.fs.writeFile

};

File.prototype.remove = function () {

	// this.fs.unlink

};

// TODO: add copy, and move

