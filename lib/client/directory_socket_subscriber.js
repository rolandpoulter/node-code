"use strict";


exports = module.exports = DirectorySocketSubscriber;


function DirectorySocketSubscriber (events, socket, publisher, app_ui, Directory, objectForEach) {

	this.events = events;

	this.socket = socket;

	this.publisher = publisher;

	this.app_ui = app_ui;


	if (Directory) this.Directory = Directory;


	if (objectForEach) this.objectForEach = objectForEach;


	this.socket.on('directories list', this.onDirectoriesList.bind(this));

}


DirectorySocketSubscriber.prototype.Directory = require('./directory');


DirectorySocketSubscriber.prototype.objectForEach = require('./object_for_each');


DirectorySocketSubscriber.prototype.onDirectoriesList = function (directories_map) {

	this.objectForEach(directories_map, this.createDirectory.bind(this), this);

};

DirectorySocketSubscriber.prototype.createDirectory = function (directory_data, directory_name) {

	new this.Directory(directory_name, directory_data, this.events, this.publisher, this.app_ui);

};
