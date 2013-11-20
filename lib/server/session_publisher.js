"use strict";


require('../shared/message_publisher');


exports = module.exports = dependency.injection(SessionPublisher);


function SessionPublisher (session, messenger, MessagePublisher) {

	this.session = session;


	this.publish = new MessagePublisher('session', messenger).bindPublish();

};


SessionPublisher.prototype.projects = function (projects) {

	this.publish('projects', projects);

};
