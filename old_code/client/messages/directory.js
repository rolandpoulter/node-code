"use strict";


var Directory = require('../lib/Directory'),
    socket_responder_creator = require('../lib/helpers').socket_responder_creator;


module.exports = function (app, socket) {
	var directory_socket_responder = socket_responder_creator(socket, Directory, 'directory');

	directory_socket_responder('opened');
	directory_socket_responder('closed');

	directory_socket_responder('index', 'set_index');

	directory_socket_responder('avoided');
	directory_socket_responder('ignored');

	directory_socket_responder('removed');
	directory_socket_responder('renamed');

	directory_socket_responder('copied');
	directory_socket_responder('moved');
};
