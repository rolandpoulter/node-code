"use strict";


exports = module.exports = DirectorySocketPublisher;


function DirectorySocketPublisher (socket) {

	this.socket = socket;

}


DirectorySocketPublisher.prototype.emitOpenDirectory = function (project_name, relative_directory_path) {

	this.socket.emit('open directory', project_name, relative_directory_path);

};


DirectorySocketPublisher.prototype.emitCloseDirectory = function (project_name, relative_directory_path) {

	this.socket.emit('close directory', project_name, relative_directory_path);

};


DirectorySocketPublisher.prototype.emitIndexDirectory = function (project_name, relative_directory_path) {

	this.socket.emit('index directory', project_name, relative_directory_path);

};
