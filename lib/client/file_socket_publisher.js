"use strict";


module.exports = FileSocketPublisher;


// TODO: create a FileSocketPublisherFactory(socket) to create FileSocketPublisher(socket, project_name, relative_file_path)

function FileSocketPublisher (socket) {

	this.socket = socket;

}


FileSocketPublisher.prototype.emitOpenFile = function (project_name, relative_file_path) {

	this.socket.emit('open file', project_name, relative_file_path);

};


FileSocketPublisher.prototype.emitCloseFile = function (project_name, relative_file_path) {

	this.socket.emit('close file', project_name, relative_file_path);

};


FileSocketPublisher.prototype.emitReadFile = function (project_name, relative_file_path) {

	this.socket.emit('read file', project_name, relative_file_path);

};


FileSocketPublisher.prototype.emitSaveFile = function (project_name, relative_file_path, file_data, file_format) {

	this.socket.emit('save file', project_name, relative_file_path, file_data, file_format);

};

// TODO: add create, remove, copy and move
