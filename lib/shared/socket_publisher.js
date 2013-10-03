"use strict";


exports = module.exports = dependency.register(SocketPublisher);


function SocketPublisher (message_name, socket) {
	
	this.message_name = message_name;

	this.socket = socket;

}


var slice = Array.prototype.slice;


SocketPublisher.prototype.publish = function (method) {

	var args = slice.call(arguments);

	args.unshift(this.message_name);


	this.socket.emit.apply(this.socket, args);

};


SocketPublisher.prototype.bindPublish = function () {

	return this.publish.bind(this);

};
