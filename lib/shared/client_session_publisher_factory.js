"use strict";


require('./socket_publisher');


exports = module.exports = dependency.register(ClientSessionPublisherFactory);


function ClientSessionPublisherFactory () {

	ClientSessionPublisher.Factory = ClientSessionPublisherFactory;


	function ClientSessionPublisher (client_session, socket, Publisher) {

		this.client_session = client_session;

		this.socket = socket;


		Publisher = Publisher || dependency.get('SocketPublisher');


		this.publish = new Publisher('client_session', this.socket).bindPublish();

	}


	return ClientSessionPublisher;

}
