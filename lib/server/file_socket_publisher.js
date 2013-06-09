"use strict";


module.exports = FileSocketPublisher;


function FileSocketPublisher (io_socket) {

	this.io_socket = io_socket;

};


FileSocketPublisher.prototype.emitFileOpen = function (socket, project_name, relative_file_path, file_data) {

	socket.emit('file open', project_name, relative_file_path, file_data);

};
