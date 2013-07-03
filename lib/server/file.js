"use strict";


module.exports = File;


function File (project_location, project_name, absolute_path, file_publisher, cachedEntity, fs) {

	if (cachedEntity) this.cachedEntity = cachedEntity;


	if (fs) this.fs = fs;


	this.project_name = project_name;


	this.publisher = file_publisher;


	this.watchers = {};


	return this.cachedEntity(this, project_location, absolute_path);

}


File.prototype.cachedEntity = require('./cached_entity');

File.prototype.fs = require('fs');


File.prototype.getInfo = function () {

	return {
		type: 'File',
		base_name: this.base_name,
		relative_path: this.relative_path
	};

};


File.prototype.publish = function (socket, type, args) {

	this.publisher[type].apply(this.publisher, [
		socket,
		this.project_name,
		this.relative_path

	].concat(args || []));

};



File.prototype.open = function (socket) {

	// TODO: create a WatcherManager class

	if (this.watchers[socket.id]) return;

	this.watchers[socket.id] = true;


	this.read(socket);


	// TODO: flatten this

	var that = this;

	this.fs.watchFile(this.absolute_path, function (curr, prev) {

		console.log(that.absolute_path, curr.mtime > prev.mtime);

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

	this.fs.readFile(this.absolute_path, 'utf8', function (error, file_data) {

		that.publish(socket, 'emitFileData', [file_data]);

	});

};

File.prototype.modified = function (socket) {

	if (this.ignore_modify) return;

	// TODO: flatten

	var that = this;

	this.fs.readFile(this.absolute_path, 'utf8', function (error, file_data) {

		that.publish(socket, 'emitFileModified', [file_data]);

	});

};


File.prototype.save = function (socket, file_data, file_format) {

	// TODO: since this is an async write, they should be queued to prevent data loss 

	// TODO: flatten this

	var that = this;

	this.ignore_modify = true;

	this.fs.writeFile(
		this.absolute_path,
		file_data,
		file_format || 'utf8',

		function (error) {

			delete that.ignore_modify;

			if (error) that.publish(socket, 'emitFileSaveError', [error]);

			else that.publish(socket, 'emitFileSaveSuccess');

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

