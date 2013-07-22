"use strict";


module.exports = PublisherFactory;


function PublisherFactory (identifier, Publisher, slice) {

	if (slice) this.slice = slice;


	this.identifier = identifier;

	this.Publisher = Publisher;

};


PublisherFactory.prototype.slice = Array.prototype.slice;


PublisherFactory.prototype.createPublisher = function (entity, socket) {

	var publishers = this.entity.publishers = this.entity.publishers || {};


	if (publishers[socket.id]) return publishers[socket.id];


	return publishers[socket.id] = new this.Publisher(
		entity,
		socket,
		this.publish.bind(this, entity, socket)
	);

};


PublisherFactory.prototype.publish = function (entity, socket, method) {

	var message = [this.identifier, entity.project_name, entity.relative_path, method],
	    args = this.slice.call(arguments, 3);

	message.concat(args);


	socket.emit.apply(socket, args);

};
