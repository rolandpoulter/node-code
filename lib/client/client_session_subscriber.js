"use strict";


var ClientSessionSubscriber = require('../shared/client_session_subscriber_factory')();

module.exports = ClientSessionSubscriber;


ClientSessionSubscriber.prototype.projects = function (projects) {

	this.client_session.updateProjects(projects);

};
