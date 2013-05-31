"use strict";


//var path = require('path'),
//    fs = require('fs');


var directory = require('./messages/directory'),
    project = require('./messages/project'),
    session = require('./messages/session'),
    file = require('./messages/file');


module.exports = function (app) {
	app.io.configure(function () {
		app.io.set('authorization', function (data, accept) {
			session.authorize(app, data, accept);
		});
	});

	app.io.sockets.on('connection', function (socket) {
		var socket_session = socket.handshake.session;

		project(app, socket, socket_session);

		directory(app, socket, socket_session);
		file(app, socket, socket_session);

		session(app, socket, socket_session);

		/*
		if (app.monitor) {
			sendFiles();
		} else {
			app.on('monitor ready', sendFiles);
		}

		function sendFiles () {
			socket.emit('list files', app.files);

			setTimeout(function () {
				socket.emit('list opened', Object.keys(opened));
			}, 250);
		}


		app.on('dir created', function (name) {
			socket.emit('dir created', name);
		});

		app.on('file created', function (name) {
			socket.emit('file created', name);
		});

		app.on('unknown created', function (name) {
			socket.emit('unknown created', name);
		});

		app.on('dir changed', function (name) {
			socket.emit('dir changed', name);
		});

		app.on('file changed', function (name, mtime) {
			var saved = saving[name];

			if (saved) {
				delete saving[name];

				if (saved >= mtime) return;
			}

			socket.emit('file changed', name);
		});

		app.on('unknown changed', function (name) {
			socket.emit('unknown changed', name);
		});

		app.on('dir removed', function (name) {
			socket.emit('dir removed', name);
		});

		app.on('file removed', function (name) {
			socket.emit('file removed', name);
		});

		app.on('unknown removed', function (name) {
			socket.emit('unknown removed', name);
		});



		socket.on('create dir', function (name) {
			fs.mkdir(getAbsolute(name));
		});

		socket.on('create file', function (name) {
			fs.writeFile(getAbsolute(name), '', 'utf8');
		});

		socket.on('remove dir', function (name) {
			removeDir(name);
		});

		socket.on('remove file', function (name) {
			removeFile(name);
		});

		function removeDir (name, callback) {
			fs.rmdir(getAbsolute(name), callback);
		}

		function removeFile (name, callback) {
			fs.unlink(getAbsolute(name), callback);
		}

		socket.on('copy dir', function (name, dest) {
			copyDir(name, dest);
		});

		socket.on('copy file', function (name, dest) {
			copyFile(name, dest)
		});

		function copyDir (name, dest, callback) {
			name = getAbsolute(name);
		}

		function copyFile (name, dest, callback) {
			name = getAbsolute(name);
		}

		socket.on('move dir', function (name, dest) {
			copyDir(name, dest, function () {
				removeDir(name);
			});
		});

		socket.on('move file', function (name, dest) {
			copyFile(name, dest, function () {
				removeFile(name);
			});
		});

		var opened = {};

		socket.on('read file', function (name) {
			opened[name] = true;

			fs.readFile(getAbsolute(name), 'utf8', function (error, data) {
				if (error) {
					socket.emit('read file error', name, error);

				} else {
					socket.emit('read file', name, data);
				}
			});
		});

		socket.on('close file', function (name) {
			delete opened[name];
		});

		var saving = {};

		socket.on('write file', function (name, data) {
			saving[name] = Date.now();

			fs.writeFile(getAbsolute(name), data, 'utf8', function (error) {
				if (error) socket.emit('write file error', name, error, data);

				else socket.emit('wrote file', name);
			});
		});

		function getAbsolute (name) {
			return app.dir + path.sep + name;
		}
		*/
	});
};
