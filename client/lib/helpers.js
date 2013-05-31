"use strict";


var slice = Array.prototype.slice;


exports.mixin_store = function (ctor, store_name) {
	store_name += '_store';

	ctor.get = function (name, object) {
		object = object || ctor;

		var store = object[store_name] = object[store_name] || {};

		if (store[name]) return store[name];
	};

	ctor.set = function (value, name, object) {
		object = object || ctor;

		var store = object[store_name] = object[store_name] || {};

		return store[name] = value;
	};
};


exports.socket_responder_creator = function (socket, ctor, message_prefix) {
	return function (message, method) {
		if (message_prefix) {
			message = message_prefix + ' ' + message;
		}

		exports.socket_responder(socket, ctor, message, method);
	};
};

exports.socket_responder = function (socket, ctor, message, method) {
	method = method || message.split(' ').pop();

	socket.on(message, function (relative_entity_path) {
		var args = slice.call(arguments, 1),
		    entity = ctor.get(relative_entity_path);

		entity[method].apply(entity, args);
	});
};
