"use strict";


module.exports = SubscriberFactory;


function SubscriberFactory (identifier, Subscriber, get_entity_method_name, Project, slice) {

	if (slice) this.slice = slice;

	this.identifier = identifier;

	this.Subscriber = Subscriber;


	this.get_entity_method_name = get_entity_method_name;

};


SubscriberFactory.prototype.Project = require('./project');

SubscriberFactory.prototype.slice = Array.prototype.slice;


SubscriberFactory.prototype.listen = function (socket) {

	socket.on(this.identifier, this.onMessage.bind(this, socket));

};


SubscriberFactory.prototype.getEntity = function (project_name, relative_path) {

	var project = this.Project.get(project_name),
	    entity = project;


	if (this.get_entity_method_name) {
		entity = this.project[this.get_entity_method_name](relative_path);
	}

	return entity;

};


SubscriberFactory.prototype.onMessage = function (project_name, relative_path, method) {

	var args = this.slice.call(arguments, 3),
	    entity = this.getEntity(project_name, relative_path),
	    subscriber = this.createSubscriber(enitty, socket);


	subscriber[method].apply(subscriber, args);

};


SubscriberFactory.prototype.createSubscriber = function (entity, socket) {


	var subscribers = entity.subscribers = entity.subscribers || {};


	if (entity.subscribers[socket.id]) {
		return entity.subscribers[socket.id];
	}


	return entity.subscribers[socket.id] = new this.Subscriber(entity, socket);

};
