"use strict";


var cached_path_entity = require('./helpers').cached_path_entity;


module.exports = File;


File.cache = {};

function File (path_location, relative_path) {
	return cached_path_entity(this, path_location, relative_path, File.cache);
}


File.prototype.open = function (socket, session, callback) {
	return this;
};

File.prototype.close = function (socket, session, callback) {
	return this;
};


File.prototype.read = function (socket, session, callback) {
	return this;
};

File.prototype.write = function (data, socket, session, callback) {
	return this;
};


File.prototype.avoid = function (socket, session, callback) {
	return this;
};

File.prototype.ignore = function (socket, session, callback) {
	return this;
};


File.prototype.remove = function (socket, session, callback) {
	return this;
};

File.prototype.rename = function (socket, session, callback) {
	return this;
};


File.prototype.copy = function (socket, session, callback) {
	return this;
};

File.prototype.move = function (socket, session, callback) {
	return this;
};
