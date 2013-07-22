"use strict";


module.exports = ClientSubscriber;


function ClientSubscriber (client, socket, Subscriber) {

	this.client = client;

	this.socket = socket;


	if (Subscriber) this.Subscriber = Subscriber;


	new this.Subscriber('client', this.socket).subscribe(
		this,
		this.Subscriber.onMessageCallMethod
	);

}


ClientSubscriber.prototype.Subscriber = require('./socket_subscriber');


ClientSubscriber.prototype.projects = function () {

	this.client.publishProjects();

};
