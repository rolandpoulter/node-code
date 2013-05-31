"use strict";


var entity_message_handler = require('../lib/helpers').entity_message_handler;


module.exports = function (app, socket, session) {
	var directory_message_handler = entity_message_handler(socket, session, 'get_directory');

	directory_message_handler.api({
		open: {on: 'open directory', emit: 'directory opened'},
		close: {on: 'close directory', emit: 'directory closed'},

		index: {on: 'index directory', emit: 'directory index'},

		avoid: {on: 'avoid directory', emit: 'directory avoided'},
		ignore: {on: 'ignore directory', emit: 'directory ignored'},

		remove: {on: 'remove directory', emit: 'directory removed'},
		rename: {on: 'rename directory', emit: 'directory renamed'},

		copy: {on: 'copy directory', emit: 'directory copied'},
		move: {on: 'move directory', emit: 'directory moved'}
	});
};
