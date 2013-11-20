"use strict";


exports = module.exports = dependency.register(MessagePublisher);


function MessagePublisher (message_name, messenger, publish_method_name) {

	this.message_name = message_name;

	this.messenger = messenger;


	if (publish_method_name) this.publish_method_name = publish_method_name;

}


MessagePublisher.prototype.publish_method_name = 'emit';


MessagePublisher.prototype.publish = function (method) {

	var args = Array.prototype.slice.call(arguments);

	args.unshift(this.message_name);


	this.messenger[this.publish_method_name].apply(this.messenger, args);

};


MessagePublisher.prototype.bindPublish = function () {

	return this.publish.bind(this);

};
