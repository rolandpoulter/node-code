"use strict";


exports = module.exports = DirectorySocketPusher;


function DirectorySocketPusher (events, socket, app_ui, Directory) {

	this.events = events;

	this.socket = socket;

	this.app_ui = app_ui;

}


DirectorySocketPusher.prototype.emitOpenDirectory = function (project_name, relative_directory_path) {

	this.socket.emit('open directory', project_name, relative_directory_path);

};


DirectorySocketPusher.prototype.emitCloseDirectory = function (project_name, relative_directory_path) {

	this.socket.emit('close directory', project_name, relative_directory_path);

};


DirectorySocketPusher.prototype.emitIndexDirectory = function (project_name, relative_directory_path) {

	this.socket.emit('index directory', project_name, relative_directory_path);

};
