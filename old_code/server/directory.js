"use strict";


var helpers = require('./helpers');


module.exports = Directory;


Directory.cache = {};

function Directory (path_location, relative_path) {
	return helpers.cached_path_entity(this, path_location, relative_path, Directory.cache);
}


Directory.prototype.get_file = function (relative_file_path) {
	return new File(this.absolute_path, relative_file_path);
};


Directory.prototype.get_info = function () {
	return {
		base_name: this.base_name,
		relative_path: this.relative_path
	};
};


Directory.prototype.open = function (socket, session, callback) {
	return this;
};

Directory.prototype.close = function (socket, session, callback) {
	return this;
};


Directory.prototype.index = function (socket, session, callback) {
	return this;
};


Directory.prototype.avoid = function (socket, session, callback) {
	return this;
};

Directory.prototype.ignore = function (socket, session, callback) {
	return this;
};


Directory.prototype.remove = function (socket, session, callback) {
	return this;
};

Directory.prototype.rename = function (socket, session, callback) {
	return this;
};


Directory.prototype.copy = function (socket, session, callback) {
	return this;
};

Directory.prototype.move = function (socket, session, callback) {
	return this;
};
