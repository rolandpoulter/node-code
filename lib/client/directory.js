"use strict";


module.exports = Directory;


Directory.get = function (project, relative_directory_path) {

	return project.cache[relative_directory_path];

};


function Directory (directory_data, project, app_events, app_publishers, Directory, File) {

	this.data = directory_data;

	this.project = project;

	this.events = app_events;

	this.publishers = app_publishers;


	if (Directory) this.Directory = Directory;

	if (File) this.File = File;


	return this.cacheUpsert();

}


Directory.prototype.Directory = Directory;

Directory.prototype.File = require('./file');


Directory.prototype.cacheUpsert = function () {

	var directory = Directory.get(this.project, this.data.relative_path) || this;


	return this.project.cache[this.data.relative_path] = directory;

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

	// console.log('click directory: ', this.data);


	if (this.is_opened) {

		this.publishers.directory.emitCloseDirectory(this.project.name, this.data.relative_path);

	}

	else {

		this.publishers.directory.emitOpenDirectory(this.project.name, this.data.relative_path);

		this.publishers.directory.emitIndexDirectory(this.project.name, this.data.relative_path);

	}

};


Directory.prototype.updateIndex = function (directory_index) {

	var that = this;

	directory_index.forEach(function (index_item) {

		var item;

		if (index_item.type === 'Directory') {
			item = new that.Directory({
				relative_path: index_item.relative_path,
				base_name: index_item.relative_path
			}, that.project, that.events, that.publishers);

			item.render(that.dom_node);
		}

		else if (index_item.type === 'File') {
			item = new that.File();
		}

	});

};
