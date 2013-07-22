"use strict";


module.exports = SocketSubscriber;


function SocketSubscriber (message_name, socket, slice) {

	this.message_name = message_name;

	this.socket = socket;


	if (slice) this.slice = slice;

};


SocketSubscriber.prototype.slice = Array.prototype.slice;


SocketSubscriber.prototype.subscribe = function (context, onMessage) {

	this.socket.on(this.message_name, onMessage.bind(context));

};


SocketSubscriber.onMessageCallMethod = function (method) {

	var args = this.slice.call(arguments, 1);

	this[method].apply(this, args);

};


SocketSubscriber.onMessageGetEntityAndCallMethod = function (method) {

	var method_args = this.slice.call(arguments, 1),
			entity_args = [],
			entity_args_length = this.getEntity.length;

	while (entity_args_length--) entity_args.push(args.shift());

	var entity = this.getEntity.apply(this, entity_args);

	entity[method].apply(entity, method_args);

};

