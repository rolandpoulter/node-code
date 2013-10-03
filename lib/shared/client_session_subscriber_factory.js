"use strict";


require('./socket_subscriber');


exports = module.exports = dependency.register(ClientSessionSubscriberFactory);


function ClientSessionSubscriberFactory () {

	ClientSessionSubscriber.Factory = ClientSessionSubscriber;


	function ClientSessionSubscriber (client_session, socket, Subscriber) {

		this.client_session = client_session;

		this.socket = socket;


		Subscriber = Subscriber || dependency.get('SocketSubscriber');


		new Subscriber('client_session', this.socket).subscribe(
			this,
			Subscriber.onMessageCallMethod
		);

	}


	return ClientSessionSubscriber;

}
