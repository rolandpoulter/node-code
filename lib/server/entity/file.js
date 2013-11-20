"use strict";


dependency.assign('FS', require('fs'));

dependency.assign('Path', require('path'));


require('../../shared/entity');


exports = module.exports = dependency.injection(File);


function File (project, file_path, Entity, FS, Path) {

	this.project = project;

	this.watchers = {};


	this.entity = new Entity(this, this.project.child_cache, 'getRelativeEntityPath');

	this.entity.setAbsolutePath(
		this.project.getProjectPath(),
		file_path,
		this.project.getRootPath()
	);


	return this.entity.cacheUpsert();

}


File.prototype.getInfo = function () {

	return this.info || (this.info = {
		type: 'File',
		base_name: this.getBaseName(),
		extention: this.Path.extname(this.getBaseName()).substr(1),
		relative_path: this.getRelativePath()
	});

};


File.prototype.publish = function (messenger, method, args) {

	var publisher = messenger.createEntityPublisher('File', this);

	publisher[method].apply(publisher, args);

};



File.prototype.open = function (messenger) {

	// TODO: create a WatcherManager class

	if (this.watchers[messenger.id]) return;

	this.watchers[messenger.id] = true;


	this.read(messenger);


	// TODO: flatten this

	var that = this;

	this.FS.watchFile(this.getAbsolutePath(), function (curr, prev) {

		console.log(that.getAbsolutePath(), curr.mtime > prev.mtime);

		if (curr.mtime > prev.mtime) that.modified(messenger);

	});

};

File.prototype.close = function (messenger) {

	if (!this.watchers[messenger.id]) return;

	delete this.watchers[messenger.id];


	this.FS.unwatchFile(this.getAbsolutePath());

};


File.prototype.read = function (messenger) {

	// TODO: flatten this

	var that = this;

	this.FS.readFile(this.getAbsolutePath(), 'utf8', function (error, file_data) {

		that.publish(messenger, 'data', [file_data]);

	});

};

File.prototype.modified = function (messenger) {

	// if (this.ignore_next_modify) {
		// delete this.ignore_next_modify;

		// return;
	// }

	// TODO: flatten

	var that = this;

	this.FS.readFile(this.getAbsolutePath(), 'utf8', function (error, file_data) {

		that.publish(messenger, 'modified', [file_data]);

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

			if (error) that.publish(messenger, 'saveError', [error]);

			else that.publish(messenger, 'saveSuccess');

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

