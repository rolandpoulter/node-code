"use strict";


exports = module.exports = dependency.injection(
	require('../shared/client_session_subscriber_factory')()
);

var ClientSessionSubscriber = exports;


ClientSessionSubscriber.prototype.projects = function () {

	this.client_session.publishProjects();

};
