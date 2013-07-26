"use strict";

module.exports = ClientSessionPublisherFactory;


function ClientSessionPublisherFactory () {

	ClientSessionPublisher.Factory = ClientSessionPublisherFactory;


	function ClientSessionPublisher (client_session, socket, Publisher) {

		this.client_session = client_session;

		this.socket = socket;


		if (Publisher) this.Publisher = Publisher;


		this.publish = new this.Publisher('client_session', this.socket).bindPublish();

	}


	ClientSessionPublisher.prototype.Publisher = require('./socket_publisher');


	return ClientSessionPublisher;

}
