"use strict";


exports = module.exports = dependency.injection(EntitySubscriber);

require('./entity_getters')(exports);


function EntitySubscriber (owner, entity_name, messenger, entity_cache, getEntity, MessageSubscriber) {

	this.owner = owner;

	this.entity_name = entity_name;


	this.entity_cache = entity_cache;


	if (getEntity)	this.getEntity = getEntity;


	new MessageSubscriber(this.entity_name, messenger).subscribe(this);

}


EntitySubscriber.prototype.getEntity = function (entity_cache, entity_hash_key) {

	return entity_cache[entity_hash_key];

};


EntitySubscriber.prototype.onMessage = function (method) {

	var method_args = Array.prototype.slice.call(arguments, 1),
			entity_args = [this.entity_cache],
			entity_args_length = this.getEntity.length;

	while (entity_args_length--) entity_args.push(method_args.shift());


	var entity = this.getEntity.apply(this, entity_args);


	this.owner[this.entity_name] = entity;

	this.owner[method].apply(this.owner, method_args);

};
