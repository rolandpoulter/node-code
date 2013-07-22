"use strict";


module.exports = SocketPublisher;


function SocketPublisher (message_name, socket, slice) {
	
	this.message_name = message_name;

	this.socket = socket;


	if (slice) this.slice = slice;

}


SocketPublisher.prototype.slice = Array.prototype.slice;


SocketPublisher.prototype.publish = function (method) {

	var args = this.slice.call(arguments);

	args.unshift(this.message_name);


	this.socket.emit.apply(this.socket, args);

};