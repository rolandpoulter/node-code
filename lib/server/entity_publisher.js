"use strict";


module.exports = EntityPublisher;


function EntityPublisher (message_name, socket, entity, Publisher, slice) {

	this.entity_name = entity_name;

	this.socket = socket;

	this.entity = entity;

	
	if (Publisher) this.Publisher = Publisher;

	if (slice) this.slice = slice;


	this.publisher = new this.Publisher(this.message_name, this.socket);

}


EntityPublisher.prototype.Publisher = require('./socket_publisher');

EntityPublisher.prototype.slice = Array.prototype.slice;


EntityPublisher.prototype.publish = function (method) {

	var args = this.slice.call(arugments, 1);

	args.unshift(method);

	args.unshift(this.entity.project_name);

	args.unshift(this.entity.relative_path);


	this.publisher.publish.apply(this.publisher, args);

};
