"use strict";


//var Notification = require('./lib/Notification'),
//    Directory = require('./lib/Directory'),
//    Dialog = require('./lib/Dialog'),
//    File = require('./lib/File');
var directory = require('./messages/directory'),
    project = require('./messages/project'),
    session = require('./messages/session'),
    file = require('./messages/file');


module.exports = function (app) {
	project(app, app.socket);

	directory(app, app.socket);
	file(app, app.socket);

	session(app, app.socket);

	/*
	app.socket.on('list files', function (files) {
		var existed = !!app.directory;

		if (existed) return;
		//if (existed) app.directory.remove();

		app.directory = Directory.create_from_list(files, app).render();

		//if (!existed) app.emit('directory ready');
	});

	function onceDirectoryReady (callback) {
		if (app.directory) callback();

		else app.on('directory ready', callback);
	}

	app.socket.on('list opened', function (opened) {
		onceDirectoryReady(function () {
			app.directory.open_file_list(opened);
		});
	});

	app.socket.on('dir created', function (name) {
		onceDirectoryReady(function () {
			app.directory.create_directory(name);
		});
	});

	app.socket.on('file created', function (name) {
		onceDirectoryReady(function () {
			app.directory.create_file(name);
		});
	});

	app.socket.on('dir changed', function (name) {
		Directory.get(name, app).changed();
	});

	app.socket.on('file changed', function (name) {
		File.get(name, app).changed();
	});

	app.socket.on('dir removed', function (name) {
		Directory.get(name, app).removed();
	});

	app.socket.on('file removed', function (name) {
		File.get(name, app).removed();
	});

	app.socket.on('read file', function (name, data) {
		File.get(name, app).read(data);
	});

	app.socket.on('read file error', function (name, error) {
		app.error('file', name, error);
	});

	app.socket.on('wrote file', function (name) {
		File.get(name, app).saved();
	});

	app.socket.on('write file error', function (name, error) {
		app.error('file', name, error);

		new Dialog({
			close: true,
			header: 'Error while saving ' + name,
			content: error,
			buttons: [
				{name: 'OK', action: 'close'}
			]
		}).render();
	});
	*/
};
