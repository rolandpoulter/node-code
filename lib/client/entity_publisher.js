"use strict";


module.exports = EntityPublisher;


function EntityPublisher (message_name, socket, entity, Publisher) {

	this.message_name = message_name;

	this.socket = socket;

	this.entity = entity;

	
	if (Publisher) this.Publisher = Publisher;


	this.publisher = new this.Publisher(this.message_name, this.socket);

}


EntityPublisher.prototype.Publisher = require('../shared/socket_publisher');


var slice = Array.prototype.slice;


EntityPublisher.prototype.publish = function (method) {

	var args = slice.call(arguments, 1);

	args.unshift(this.entity.info.relative_path);

	args.unshift(this.entity.project.name);

	args.unshift(method);


	this.publisher.publish.apply(this.publisher, args);

};


EntityPublisher.prototype.bindPublish = function () {

	return this.publish.bind(this);

};
