"use strict";


require('../shared/message_subscriber');


exports = module.exports = dependency.injection(SessionSubscriber);


function SessionSubscriber (session, messenger, MessageSubscriber) {

	this.session = session;


	new MessageSubscriber('session', messenger).subscribe(this);

}


SessionSubscriber.prototype.projects = function () {

	this.session.publishProjects();

};
