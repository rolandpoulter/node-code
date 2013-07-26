"use strict";


module.exports = ClientSessionFactory;


function ClientSessionFactory () {

	ClientSession.Factory = ClientSessionFactory;


	function ClientSession (
		socket,
		session,
		publishers,
		subscribers,
		entity_names
	) {

		this.socket = socket;

		this.session = session;


		if (publishers) this.publishers = publishers;

		if (subscribers) this.subscribers = subscribers;

		if (entity_names) this.entity_names = entity_names;


		this.publish = new this.publishers.ClientSession(this, this.socket);

		this.subscriber = new this.subscribers.ClientSession(this, this.socket);


		this.entity_subscribers = {};

		this.entity_names.forEach(this.subscribeEntity.bind(this));


		this.socket.createEntityPublisher = this.createEntityPublisher.bind(this);

	}


	ClientSession.camelCaseToUnderscore = require('./camel_case_to_underscore');


	ClientSession.prototype.publishers = {};

	ClientSession.prototype.subscribers = {};

	ClientSession.prototype.entity_names = [];


	ClientSession.prototype.subscribeEntity = function (entity_name) {

		var EntitySubscriber = this.subscribers[entity_name],
		    subscriber_name = ClientSession.camelCaseToUnderscore(entity_name);

		this.entity_subscribers[subscriber_name] = new EntitySubscriber(this.socket);

	};


	ClientSession.prototype.getPublisher = function (name) {

		return this.publishers[name];

	};


	ClientSession.prototype.createEntityPublisher = function (name, entity) {

		if (this.entity_names.indexOf(name) === -1) return;


		var Publisher = this.getPublisher(name);


		return new Publisher(entity, this.socket);

	};


	ClientSession.createPubSubDictionary = function (names, type, require) {

		var register_dictionary = {};


		names.forEach(function (name) {

			register_dictionary[name] = require('./' + ClientSession.camelCaseToUnderscore(name) + '_' + type);

		});


		return register_dictionary;

	};


	return ClientSession;

};
