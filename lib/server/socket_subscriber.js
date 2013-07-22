"use strict";


module.exports = SocketSubscriber;


function SocketSubscriber (message_name, socket) {

	this.message_name = message_name;

	this.socket = socket;

};


SocketSubscriber.prototype.subscribe = function (context, onMessage) {

	var that = this;

	this.socket.on(this.message_name, onMessage.bind(context));

};


var slice = Array.prototype.slice;


SocketSubscriber.onMessageCallMethod = function (method) {

	var args = slice.call(arguments, 1);

	args.unshift(this.socket);


	this[method].apply(this, args);

};


SocketSubscriber.onMessageGetEntityAndCallMethod = function (method) {

	var method_args = slice.call(arguments, 1),
			entity_args = [],
			entity_args_length = this.getEntity.length;

	while (entity_args_length--) entity_args.push(method_args.shift());


	var entity = this.getEntity.apply(this, entity_args);


	method_args.unshift(this.socket);

	entity[method].apply(entity, method_args);

};

