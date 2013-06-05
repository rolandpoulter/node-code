"use strict";


exports = module.exports = DirectorySocketSubscriber;


function DirectorySocketSubscriber (events, socket, publishers, app_ui, Directory, objectForEach) {

	this.events = events;

	this.socket = socket;

	this.publishers = publishers;

	this.app_ui = app_ui;


	if (Directory) this.Directory = Directory;


	// if (objectForEach) this.objectForEach = objectForEach;


	this.socket.on('directory index', this.onDirectoryIndex.bind(this));

}


DirectorySocketSubscriber.prototype.Directory = require('./directory');


// DirectorySocketSubscriber.prototype.objectForEach = require('./object_for_each');


DirectorySocketSubscriber.prototype.onDirectoryIndex = function (directories_map) {

	console.log('got here', arguments);

	// this.objectForEach(directories_map, this.createDirectory.bind(this), this);

};

// DirectorySocketSubscriber.prototype.createDirectory = function (directory_data, directory_name) {

	// new this.Directory(directory_name, directory_data, this.events, this.publishers, this.app_ui);

// };
