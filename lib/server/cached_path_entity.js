"use strict";


module.exports = function (entity, path_location, relative_path, cache, path) {

	path = path || require('path');


	entity.path_location = path_location;

	entity.relative_path = relative_path;

	entity.absolute_path = path.join(path_location, relative_path);


	entity.base_name = path.basename(entity.absolute_path);


	if (cache[entity.absolute_path]) {
		return cache[entity.absolute_path];
	}


	return cache[entity.absolute_path] = entity;

};
