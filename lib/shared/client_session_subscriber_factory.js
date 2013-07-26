"use strict";


module.exports = ClientSessionSubscriberFactory;


function ClientSessionSubscriberFactory () {

	ClientSessionSubscriber.Factory = ClientSessionSubscriber;


	function ClientSessionSubscriber (client_session, socket, Subscriber) {

		this.client_session = client_session;

		this.socket = socket;


		if (Subscriber) this.Subscriber = Subscriber;


		new this.Subscriber('client_session', this.socket).subscribe(
			this,
			this.Subscriber.onMessageCallMethod
		);

	}


	ClientSessionSubscriber.prototype.Subscriber = require('./socket_subscriber');


	return ClientSessionSubscriber;

}
