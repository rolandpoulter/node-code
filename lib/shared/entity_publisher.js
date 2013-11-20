"use strict";


var MessagePublisher = require('./message_publisher');


exports = module.exports = dependency.injection(EntityPublisher);


function EntityPublisher (message_name, messenger, entity, MessagePublisher) {

	this.entity = entity;

	this.message_publisher = new this.MessagePublisher(message_name, messenger);

}


EntityPublisher.prototype.publish = function (method) {

	var args = Array.prototype.slice.call(arguments, 1);

	args.unshift(this.entity.getRelativePath());

	args.unshift(this.entity.getProjectPath());

	args.unshift(method);


	this.message_publisher.publish.apply(this.message_publisher, args);

};


EntityPublisher.prototype.bindPublish = MessagePublisher.prototype.bindPublish;
