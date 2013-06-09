"use strict";


module.exports = FileSocketPublisher;


function FileSocketPublisher (socket) {

	this.socket = socket;

}


FileSocketPublisher.prototype.emitOpenFile = function (project_name, relative_file_path) {

	this.socket.emit('open file', project_name, relative_file_path);

};


FileSocketPublisher.prototype.emitCloseFile = function (project_name, relative_file_path) {

	this.socket.emit('close file', project_name, relative_file_path);

};