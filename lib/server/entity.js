"use strict";


module.exports = Entity;


Entity.get = function (absolute_path) {

	return Entity.cache[absolute_path];

};


Entity.cache = {};


function Entity (context, relative_path_root, absolute_path, cache, path) {

	if (cache) this.cache = cache;

	if (path) this.path = path;


	if (this.cache[absolute_path]) {
		return this.cache[absolute_path];
	}


	context.project_location = relative_path_root;

	context.project_name = this.path.basename(context.project_location);

	context.relative_path = this.path.relative(relative_path_root, absolute_path);


	context.relative_path_root = relative_path_root;

	context.absolute_path = absolute_path || relative_path_root;

	context.base_name = this.path.basename(context.absolute_path);


	return context;

}


Entity.prototype.cache = Entity.cache;

Entity.prototype.path = require('path');
