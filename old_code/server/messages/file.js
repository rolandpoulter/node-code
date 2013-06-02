"use strict";


var entity_message_handler = require('../lib/helpers').entity_message_handler;


module.exports = function (app, socket, session) {
	var file_message_handler = entity_message_handler(socket, session, 'get_file');

	file_message_handler.api({
		open: {on: 'open file', emit: 'file opened'},
		close: {on: 'close file', emit: 'file closed'},

		read: {on: 'read file', emit: 'file read'},
		write: {on: 'write file', emit: 'file written'},

		avoid: {on: 'avoid file', emit: 'file avoided'},
		ignore: {on: 'ignore file', emit: 'file ignored'},

		remove: {on: 'remove file', emit: 'file removed'},
		rename: {on: 'rename file', emit: 'file renamed'},

		copy: {on: 'copy file', emit: 'file copied'},
		move: {on: 'move file', emit: 'file moved'}
	});
};
