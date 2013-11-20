"use strict";


exports = module.exports = dependency.register(MessageSubscriber);


function MessageSubscriber (message_name, messenger, subscribe_method_name) {

	this.message_name = message_name;

	this.messenger = messenger;


	if (subscribe_method_name) this.subscribe_method_name = subscribe_method_name;

};


MessageSubscriber.prototype.subscribe_method_name = 'on';


MessageSubscriber.prototype.subscribe = function (context, onMessage) {

	context = context || this;

	onMessage = onMessage || context.onMessage || this.onMessage;


	this.messenger[this.subscribe_method_name](
		this.message_name, onMessage.bind(context)
	);

};


MessageSubscriber.prototype.onMessage = function (method) {

	var args = Array.prototype.slice.call(arguments, 1);


	this[method].apply(this, args);

};
