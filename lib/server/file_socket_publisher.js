"use strict";


module.exports = FileSocketPublisher;


function FileSocketPublisher (io_socket) {

	this.io_socket = io_socket;

};


FileSocketPublisher.prototype.emitFileData = function (socket, project_name, relative_file_path, file_data) {

	socket.emit('file data', project_name, relative_file_path, file_data);

};


FileSocketPublisher.prototype.emitFileModified = function (socket, project_name, relative_file_path, new_file_data) {

	socket.emit('file modified', project_name, relative_file_path, new_file_data);

};


FileSocketPublisher.prototype.emitFileSaveSuccess = function (socket, project_name, relative_file_path) {

	socket.emit('file save success', project_name, relative_file_path);

};


FileSocketPublisher.prototype.emitFileSaveError = function (socket, project_name, relative_file_path, error) {

	socket.emit('file save error', project_name, relative_file_path, file_data);

};
