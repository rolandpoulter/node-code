"use strict";


module.exports = Directory;


Directory.get = function (relative_project_path) {

	return Directory.cache[relative_project_path];

};


Directory.cache = {};


function Directory (directory_data, project, app_events, app_publisher) {

	this.data = directory_data;

	this.project = project;

	this.events = app_events;

	this.publisher = app_publisher;


	return this.cacheUpsert();

}


Directory.prototype.cacheUpsert = function () {

	var directory = Directory.cache[this.data.relative_path] || this;

	return directory;

};


Directory.prototype.render = function (parent_node) {

	this.dom_node = document.createElement('a');

	this.setupEvents();


	this.dom_node.classList.add('directory');

	this.dom_node.innerHTML = this.data.base_name;


	parent_node.appendChild(this.dom_node);

};


Directory.prototype.setupEvents = function () {

	this.dom_node.addEventListener('click', this.onClick.bind(this));

};

Directory.prototype.onClick = function (dom_event) {

	console.log('click directory: ', this.data);


	if (this.is_opened) {

		this.publisher.directory.emitCloseDirectory(this.project.name, this.data.relative_path);

	}

	else {

		this.publisher.directory.emitOpenDirectory(this.project.name, this.data.relative_path);

		this.publisher.directory.emitIndexDirectory(this.project.name, this.data.relative_path);

	}

};
