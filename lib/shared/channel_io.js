"use strict";


require('./camel_case_to_underscore');


exports = module.exports = dependency.register(ChannelIO);


function ChannelIO (
	messenger,
	publishers,
	subscribers,
	entity_cache,
	entity_channel_names,
	session_channel_name
) {

	this.messenger = messenger;

	this.entity_cache = entity_cache;


	if (publishers) this.publishers = publishers;

	if (subscribers) this.subscribers = subscribers;


	if (entity_channel_names) this.entity_channel_names = entity_channel_names;

	if (session_channel_name) this.session_channel_name = session_channel_name;


	this.entity_subscribers = {};

	this.entity_channel_names.forEach(this.subscribeEntity.bind(this));


	this.messenger.createEntityPublisher = this.createEntityPublisher.bind(this);

}


ChannelIO.setDefaults = function (defaults) {

	defaults = defaults || {};


	this.prototype.publishers = defaults.publishers || {};

	this.prototype.subscribers = defaults.subscribers || {};

	this.prototype.entity_channel_names =
		defaults.entity_channel_names || [];

	this.prototype.session_channel_name =
		defaults.session_channel_name || 'Session';

};


ChannelIO.setDefaults();


ChannelIO.prototype.createSessionChannel = function (session_object) {

	var SessionPublisher = this.publishers[this.session_channel_name],
	    SessionSubscriber = this.subscribers[this.session_channel_name];


	session_object.messenger = this.messenger;

	session_object.publish = new SessionPublisher(session_object, this.messenger);

	session_object.subscribe = new SessionSubscriber(session_object, this.messenger);

};


ChannelIO.prototype.subscribeEntity = function (entity_name) {

	var EntitySubscriber = this.subscribers[entity_name],
	    subscriber_name = dependency.get('CamelCaseToUnderscore')(entity_name);

	this.entity_subscribers[subscriber_name] = new EntitySubscriber(this.messenger, this.entity_cache);

};


ChannelIO.prototype.getPublisher = function (name) {

	return this.publishers[name];

};


ChannelIO.prototype.createEntityPublisher = function (name, entity) {

	if (this.entity_channel_names.indexOf(name) === -1) return;


	var EntityPublisher = this.getPublisher(name);


	return new EntityPublisher(entity, this.messenger);

};


ChannelIO.addEntityChannel = function (entity_name, EntityPublisher, EntitySubscriber) {

	if (this.entity_channel_names.indexOf(entity_name) !== -1) return;


	this.publishers[entity_name] = EntityPublisher;

	this.subscribers[entity_name] = EntitySubscriber;

	this.entity_channel_names.push(entity_name);


	if (this.messenger) {
		this.subscribeEntity(entity_name);
	}

};
