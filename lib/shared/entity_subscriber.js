"use strict";


exports = module.exports = dependency.injection(EntitySubscriber);

require('./entity_getters')(exports);


function EntitySubscriber (owner, entity_name, messenger, getEntity, MessageSubscriber) {

	this.owner = owner;

	this.entity_name = entity_name;


	this.getEntity = getEntity;


	new MessageSubscriber(this.entity_name, messenger).subscribe(this);

}


EntitySubscriber.prototype.onMessage = function (method) {

	var method_args = Array.prototype.slice.call(arguments, 1),
			entity_args = [],
			entity_args_length = this.getEntity.length;

	while (entity_args_length--) entity_args.push(method_args.shift());


	var entity = this.getEntity.apply(this, entity_args);


	this.owner[this.entity_name] = entity;

	this.owner[method].apply(this.owner, method_args);

};
