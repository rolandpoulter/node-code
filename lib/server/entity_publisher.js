"use strict";


module.exports = EntityPublisher;


function EntityPublisher (message_name, socket, entity, Publisher) {

	this.entity_name = entity_name;

	this.socket = socket;

	this.entity = entity;

	
	if (Publisher) this.Publisher = Publisher;


	this.publisher = new this.Publisher(this.message_name, this.socket);

}


EntityPublisher.prototype.Publisher = require('./socket_publisher');


var slice = Array.prototype.slice;


EntityPublisher.prototype.publish = function (method) {

	var args = slice.call(arugments, 1);

	args.unshift(method);

	args.unshift(this.entity.project_name);

	args.unshift(this.entity.relative_path);


	this.publisher.publish.apply(this.publisher, args);

};


EntityPublisher.prototype.bindPublish = function () {

	return this.publish.bind(this);

};
