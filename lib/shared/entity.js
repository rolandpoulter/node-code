"use strict";


module.exports = Entity;


function Entity (context, cache, cache_method, path) {

	this.context = context;

	this.cache = cache || {};


	if (cache_method) this.cache_method = cache_method;

	if (path) this.path = path;


	context.getAbsolutePath = this.getAbsolutePath.bind(this);

	context.getRelativePath = this.getRelativeEntityPath.bind(this);

	context.getProjectPath = this.getProjectPath.bind(this);

	context.getBaseName = this.getBaseName.bind(this);

}


Entity.prototype.path = require('path');


Entity.prototype.cache_method = 'getAbsolutePath';

Entity.prototype.cacheUpsert = function (break_method_cache) {

	var cached_path = this[this.cache_method](break_method_cache);


	if (this.cache[cached_path]) {
		return this.cache[cached_path];
	}


	return this.cache[cached_path] = this.context;

};


Entity.prototype.setRootPath = function (root_path) {

	return this.root_path = root_path;

};


Entity.prototype.getRootPath = function () {

	return this.root_path || this.path.sep;

};


Entity.prototype.setProjectPath = function (project_path) {

	return this.project_path = project_path;

};


Entity.prototype.getProjectPath = function () {

	return this.project_path || '';

};


Entity.prototype.setRelativeEntityPath = function (relative_entity_path) {

	return this.relative_entity_path = relative_entity_path;

};


Entity.prototype.getRelativeEntityPath = function () {

	return this.relative_entity_path || '';

};


Entity.prototype.setAbsolutePath = function (project_path, entity_path, root_path) {

	entity_path = entity_path || '';


	if (root_path) {
		if (project_path.indexOf(root_path) === 0) {
			project_path = this.path.relative(root_path, project_path);
		}

		if (entity_path.indexOf(root_path) === 0) {
			entity_path = this.path.relative(root_path, entity_path);
		}
	}


	if (entity_path.indexOf(project_path) === 0) {
		entity_path = this.path.relative(
			this.path.resolve(root_path, project_path),
			this.path.resolve(root_path, entity_path)
		);
	}


	this.setProjectPath(project_path);

	this.setRelativeEntityPath(entity_path);

	this.setRootPath(root_path);


	return this.getAbsolutePath(true);

};


Entity.prototype.getAbsolutePath = function (break_method_cache) {

	if (!break_method_cache && this.absolute_path) {
		return this.absolute_path;
	}

	return this.absolute_path = this.path.resolve(
		this.getRootPath(),
		this.getProjectPath(),
		this.getRelativeEntityPath()
	);

};


Entity.prototype.getBaseName = function (break_method_cache) {

	if (!break_method_cache && this.base_name) {
		return this.base_name;
	}

	return this.base_name = this.path.basename(this.getAbsolutePath(break_method_cache));

};

