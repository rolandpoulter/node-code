"use strict";


module.exports = EntitySubscriber;


function EntitySubscriber (entity_name, socket, getEntity, Subscriber) {

	this.entity_name = entity_name;

	this.socket = socket;


	this.getEntity = getEntity;


	if (Subscriber) this.Subscriber = Subscriber;

}


EntitySubscriber.prototype.Subscriber = require('./socket_subscriber');


EntitySubscriber.prototype.listen = function () {

	new this.Subscriber(this.entity_name, this.socket).subscribe(
		this,
		this.Subscriber.onMessageGetEntityAndCallMethod
	);

};
