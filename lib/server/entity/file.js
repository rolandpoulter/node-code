"use strict";


dependency.assign('FS', require('fs'));

dependency.assign('Path', require('path'));


require('../../shared/entity');


exports = module.exports = dependency.injection(File);


function File (directory, file_path, Entity, FS, Path) {

	this.directory = directory;

	this.project = directory.project;


	this.watchers = {};


	return this.project.createEntity(this, Entity.fileCacheUpsert.bind(
		this.directory,
		file_path
	));

}


File.prototype.getSafeInfo = function () {

	return this.info || (this.info = {
		type: 'File',
		base_name: this.getBaseName(),
		extention: this.Path.extname(this.getBaseName()).substr(1),
		relative_path: this.getRelativePath(),
		absolute_path: this.getAbsolutePath()
	});

};


File.prototype.open = function () {

	// TODO: create a WatcherManager class

	if (this.watchers[this.messenger.id]) return;

	this.watchers[this.messenger.id] = true;


	this.read();


	// TODO: flatten this

	var that = this;

	this.FS.watchFile(this.getAbsolutePath(), function (curr, prev) {

		console.log(that.getAbsolutePath(), curr.mtime > prev.mtime);

		if (curr.mtime > prev.mtime) that.modified();

	});

};

File.prototype.close = function (messenger) {

	if (!this.watchers[this.messenger.id]) return;

	delete this.watchers[this.messenger.id];


	this.FS.unwatchFile(this.getAbsolutePath());

};


File.prototype.read = function (messenger) {

	// TODO: flatten this

	var that = this;

	this.FS.readFile(this.getAbsolutePath(), 'utf8', function (error, file_data) {

		that.publish('data', [file_data], messenger);

	});

};

File.prototype.modified = function () {

	// if (this.ignore_next_modify) {
		// delete this.ignore_next_modify;

		// return;
	// }

	// TODO: flatten

	var that = this;

	this.FS.readFile(this.getAbsolutePath(), 'utf8', function (error, file_data) {

		that.broadcast('modified', [file_data]);

	});

};


File.prototype.save = function (messenger, file_data, file_format) {

	// TODO: since this is an async write, they should be queued to prevent data loss 

	// TODO: flatten this

	var that = this;

	// this.ignore_next_modify = true;

	this.FS.writeFile(
		this.getAbsolutePath(),
		file_data,
		file_format || 'utf8',

		function (error) {

			// delete that.ignore_modify;

			if (error) that.publish('saveError', [error], messenger);

			else that.publish('saveSuccess', null, messenger);

		}
	);

};


File.prototype.create = function () {

	// this.FS.writeFile

};

File.prototype.remove = function () {

	// this.FS.unlink

};

// TODO: add copy, and move

