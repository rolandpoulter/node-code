"use strict";


require('../../shared/entity');

require('./directory');

require('./file');


exports = module.exports = dependency.injection(Project);


function Project (
	messenger,
	entity_cache,
	entity_id,
	project_info,
	session_cache,
	Entity,
	Directory,
	File
) {

	this.messenger = messenger;

	this.entity_cache = entity_cache;

	this.entity_id = entity_id;


	this.info = project_info;

	this.info.settings = this.info.settings || {};

	this.info.directories = this.info.directories || [];

	this.info.extention_directories = this.info.extention_directories || [];


	var project = this.createEntity(this);


	session_cache[project.getId()] = project.getSafeInfo();


	return project;

}


Project.prototype.createEntity = function (context, beforeCacheUpsert) {

	return new this.Entity(
		this.messenger,
		this.entity_cache,
		this.entity_id,
		context,
		beforeCacheUpsert
	);

};


Project.prototype.getSafeInfo = function () {

	return {
		id: this.entity.getId(),
		name: this.info.name,
		settings: this.info.settings,
		directories: this.info.directories,
		extention_directories: this.info.extention_directories
	};

};


Project.prototype.deactivate = function () {

	delete messenger.active_project;

};


Project.prototype.activate = function (messenger) {

	if (messenger.active_project) {
		messenger.active_project.deactivate();
	}


	messenger.active_project = this;

};
