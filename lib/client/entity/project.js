"use strict";


require('../../shared/entity');

require('./directory');


exports = module.exports = dependency.injection(Project);


function Project (
	messenger,
	entity_cache,
	entity_id,
	project_info,
	app_ui,
	Entity,
	Project,
	Directory
) {

	this.messenger = messenger;

	this.entity_cache = entity_cache;

	this.entity_id = entity_id;


	this.info = project_info;


	this.app_ui = app_ui;


	return this.createEntity(this);

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


Project.prototype.createDirectory = function () {

	if (this.directory) return;


	if (!this.info.directory) {
		throw new Error('Project: missing directory data.');
	}


	this.directory = new this.Directory(
		this.messenger,
		this,
		null,
		this.info.directory,
		this.app_ui
	);

	this.directory.render();

	this.directory.open();

};
