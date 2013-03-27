"use strict";


var watch = require('watch'),
    async = require('async'),
    path = require('path'),
    fs = require('fs');


module.exports = function (app) {
	watch.createMonitor(app.dir, {persistent: false, interval: 3005}, function (monitor) {
		app.files = {};

		Object.keys(monitor.files).forEach(function (name) {
			addFile(name);
		});

		function addFile (name, callback, stat) {
			if (stat) finish(null, stat);

			else getStat(name, finish);

			// TODO: use dont ignore to allow opening of ignored directories
			function finish (error, stat, dont_ignore) {
				if (error) throw error;

				function ignore_check (name) {
					// TODO: use a config file to determine directory names to ignore
					return !dont_ignore && (name.charAt(0) === '.' || name === 'node_modules');
				}

				var relative = getRelativeSplit(name),
				    ignore = false,
				    scope = app.files,
				    last = relative.pop();

				relative.forEach(function (segment) {
					if (!dont_ignore && ignore) return;

					scope = scope[segment] = scope[segment] || {};

					if (ignore_check(segment)) {
						scope[segment] = 0;
						ignore = true;
					}

					if (typeof dont_ignore !== 'number' && dont_ignore) {
						dont_ignore -= 1;
					}
				});

				if (!ignore) {
					if (stat.isFile()) {
						scope[last] = getRelative(name);

					} else if (stat.isDirectory()) {
						scope[last] = ignore_check(last) ? 0 : {};
						finish();

					} else {
						scope[last] = null;
						finish();
					}
				}

				function finish () {
					if (callback) callback(scope[last]);
				}
			}
		}

		function getStat (name, callback) {
			if (monitor.files[name]) return callback(null, monitor.files[name]);

			fs.stat(name, callback);
		}

		function getRelative (name) {
			return path.relative(app.dir, name);
		}

		function getRelativeSplit (name) {
			return getRelative(name).split(path.sep);
		}

		monitor.on('created', function (name, stat) {
			addFile(name, function (file) {
				if (file === null) {
					app.emit('unknown created', getRelative(name));

				} else if (typeof file === 'string') {
					app.emit('file created', getRelative(name));
	
				} else {
					app.emit('dir created', getRelative(name));
				}
			}, stat);
		});

		monitor.on('changed', function (name, curr, prev) {
			if (curr.mtime <= prev.mtime) return;

			getStat(name, function (error, stat) {
				if (error) throw error;

				if (stat.isFile()) {
					app.emit('file changed', getRelative(name), curr.mtime);
	
				} else if (stat.isDirectory()) {
					app.emit('directory changed', getRelative(name));
	
				} else {
					app.emit('unknown changed', getRelative(name));
				}
			});
		});

		monitor.on('removed', function (name, stat) {
			var relative = getRelativeSplit(name),
			    scope = app.files,
			    last = relative.pop();

			relative.forEach(function (segment) {
				scope = scope[segment] = scope[segment] || {};
			});

			scope[last] = null;
			delete scope[last];

			if (stat.isFile()) {
				app.emit('file removed', getRelative(name));

			} else if (stat.isDirectory()) {
				app.emit('directory removed', getRelative(name));

			} else {
				app.emit('unknown removed', getRelative(name));
			}
		});

		app.monitor = monitor;

		app.emit('monitor ready');
	});
};
