"use strict";


dependency.assign('Path', require('path'));


require('./object_for_each');


exports = module.exports = dependency.injection(Entity);


function Entity (messenger, cache, id, context, beforeCacheUpsert, Path) {

	this.messengers = {};

	this.context = context;

	this.cache = cache;


	this.setId(id);


	this.type = context.constructor.name;


	if (beforeCacheUpsert) beforeCacheUpsert.call(this, this);


	context = this.cacheUpsert();


	if (!context.entity) {
		context.entity = this;

		alias('publish');

		alias('broadcast');

		alias('attachMessenger');


		alias('getId');

		alias('getHashKey');

		alias('getRootPath');

		alias('getRelativePath');

		alias('getAbsolutePath');

		alias('getBaseName');
	}


	context.entity.attachMessenger(messenger);


	return context;


	function alias (method) {

		var entity = context.entity;

		context[method] = entity[method].bind(entity);

	}

}


Entity.fileCacheUpsert = function (parent, path, entity) {

	entity.cache_method = 'getAbsolutePath';

	entity.setRootPath(parent.getAbsolutePath());

	entity.setRelativePath(path);

};


Entity.prototype.cache_method = 'getHashKey';


Entity.prototype.cacheUpsert = function (break_method_cache) {

	var cached_path = this[this.cache_method](break_method_cache);


	if (this.cache[cached_path]) {
		return this.cache[cached_path];
	}


	return this.cache[cached_path] = this.context;

};


Entity.prototype.publish = function (method, args, messenger_id) {

	if (messenger_id) {
		messenger_id = messenger_id.id || messenger_id;
	}

	var messenger = messenger_id && this.messengers[messenger_id] || this.messenger,
	    publisher = messenger.createEntityPublisher(this.type, this);

	publisher[method].apply(publisher, args);

};


Entity.prototype.broadcast = function (method, args) {

	this.ObjectForEach(this.messengers, function (messenger) {

		this.publish(method, args, messenger);

	}, this);

};


Entity.prototype.attachMessenger = function (new_messenger, replace_default) {

	var new_messenger_id = new_messenger.id;

	this.messengers[new_messenger_id] = new_messenger;


	if (!this.messenger || replace_default) {
		this.messenger = new_messenger;
	}

};


Entity.prototype.setId = function (id) {

	return this.id = id;

};


Entity.prototype.getId = function () {

	return this.id || '';

};


Entity.prototype.setRootPath = function (root_path) {

	return this.root_path = root_path;

};


Entity.prototype.getRootPath = function () {

	return this.root_path || this.Path.sep;

};


Entity.prototype.setRelativePath = function (relative_path) {

	if (relative_path.indexOf(this.root_path) === 0) {
		relative_path = this.Path.relative(this.root_path, relative_path);
	}


	return this.relative_path = relative_path;

};


Entity.prototype.getRelativePath = function () {

	return this.relative_path || '';

};


Entity.prototype.getAbsolutePath = function (break_method_cache) {

	if (!this.absolute_path || break_method_cache) {
		this.absolute_path = this.root_path + this.Path.sep + this.relative_path;
	}


	return this.absolute_path;

};


Entity.prototype.setHashKey = function () {

	return this.hash_key = this.getId() + this.Path.resolve(
		this.getRootPath(),
		this.getRelativePath()
	);

};


Entity.prototype.getHashKey = function (break_method_cache) {

	if (!break_method_cache && this.absolute_path) {
		return this.hash_key;
	}

	return this.setHashKey();

};


Entity.prototype.getBaseName = function (break_method_cache) {

	if (!break_method_cache && this.base_name) {
		return this.base_name;
	}

	return this.base_name = this.Path.basename(this.getRelativePath());

};

