"use strict";


module.exports = cachedEntity;


cachedEntity.cache = {};


function cachedEntity (entity, project_location, absolute_path, cache, path) {

	path = path || require('path');

	cache = cache || cachedEntity.cache;


	entity.project_location = project_location;

	entity.project_name = path.basename(project_location);

	entity.relative_path = path.relative(project_location, absolute_path);

	entity.absolute_path = absolute_path || project_location;

	entity.base_name = path.basename(this.absolute_path);


	if (cache[this.absolute_path]) {
		return cache[this.absolute_path];
	}


	return cache[this.absolute_path] = entity;

};
