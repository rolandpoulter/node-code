"use strict";


var Notification = require('./lib/Notification'),
    Directory = require('./lib/Directory'),
    Dialog = require('./lib/Dialog'),
    File = require('./lib/File');


module.exports = function (app) {
	app.socket.on('list files', function (files) {
		var existed = !!app.directory;

		if (existed) app.directory.remove();

		app.directory = Directory.createFromList(files, app).render();

		if (!existed) app.emit('directory ready');
	});

	function onceDirectoryReady (callback) {
		if (app.directory) callback();

		else app.on('directory ready', callback);
	}

	app.socket.on('list opened', function (opened) {
		onceDirectoryReady(function () {
			app.directory.openFileList(opened);
		});
	});

	app.socket.on('dir created', function (name) {
		onceDirectoryReady(function () {
			app.directory.createDirectory(name);
		});
	});

	app.socket.on('file created', function (name) {
		onceDirectoryReady(function () {
			app.directory.createFile(name);
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
};
