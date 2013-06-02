"use strict";


var File = require('../lib/File'),
    socket_responder_creator = require('../lib/helpers').socket_responder_creator;


module.exports = function (app, socket) {
	var file_socket_responder = socket_responder_creator(socket, File, 'file');

	file_socket_responder('opened');
	file_socket_responder('closed');

	file_socket_responder('read');
	file_socket_responder('written');

	file_socket_responder('avoided');
	file_socket_responder('ignored');

	file_socket_responder('removed');
	file_socket_responder('renamed');

	file_socket_responder('copied');
	file_socket_responder('moved');
};
