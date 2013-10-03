"use strict";


exports = module.exports = dependency.register(EntityPublisher);


function EntityPublisher (message_name, socket, entity, Publisher) {

	this.message_name = message_name;

	this.socket = socket;

	this.entity = entity;

	
	if (Publisher) this.Publisher = Publisher;


	this.publisher = new this.Publisher(this.message_name, this.socket);

}


var SocketPublisher = require('./socket_publisher');


EntityPublisher.prototype.Publisher = SocketPublisher;


var slice = Array.prototype.slice;


EntityPublisher.prototype.publish = function (method) {

	var args = slice.call(arguments, 1);

	args.unshift(this.entity.getRelativePath());

	args.unshift(this.entity.getProjectPath());

	args.unshift(method);


	this.publisher.publish.apply(this.publisher, args);

};


EntityPublisher.prototype.bindPublish = SocketPublisher.prototype.bindPublish;
