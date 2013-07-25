"use strict";


module.exports = ClientSessionSubscriber;


function ClientSessionSubscriber (client, socket, Subscriber) {

	this.client = client;

	this.socket = socket;


	if (Subscriber) this.Subscriber = Subscriber;


	new this.Subscriber('client', this.socket).subscribe(
		this,
		this.Subscriber.onMessageCallMethod
	);

}


ClientSessionSubscriber.prototype.Subscriber = require('../shared/socket_subscriber');


ClientSessionSubscriber.prototype.projects = function () {

	this.client.publishProjects();

};
