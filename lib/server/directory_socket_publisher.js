"use strict";


module.exports = DirectorySocketPublisher;


function DirectorySocketPublisher (io_socket, Directory) {

	this.io_socket = io_socket;


	if (Directory) this.Directory = Directory;

}


DirectorySocketPublisher.prototype.Directory = require('./directory');


DirectorySocketPublisher.prototype.emitDirectoryIndex = function (socket, project_name, relative_directory_path, directory_index) {

	socket.emit('directory index', project_name, relative_directory_path, directory_index);

};
