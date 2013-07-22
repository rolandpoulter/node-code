"use strict";


module.exports = AppSubscriberFactories;


function AppSubscriberFactories (
	socket,
	context,
	SubscriberFactory,
	ProjectSubscriber,
	DirectorySubscriber,
	FileSubscriber
) {

	this.socket = socket;

	this.context = context || this;


	if (SubscriberFactory) this.SubscriberFactory = SubscriberFactory;

	if (ProjectSubscriber) this.ProjectSubscriber = ProjectSubscriber;

	if (DirectorySubscriber) this.DirectorySubscriber = DirectorySubscriber;

	if (FileSubscriber) this.FileSubscriber = FileSubscriber;


	this.defineFactory('project', this.ProjectSubscriber);

	this.defineFactory('directory', this.DirectorySubscriber, 'getDirectory');

	this.defineFactory('file', this.FileSubscriber, 'getFile');

}


AppSubscriberFactories.prototype.SubscriberFactory = require('./Subscriber_factory');

AppSubscriberFactories.prototype.ProjectSubscriber = require('./project_Subscriber');

AppSubscriberFactories.prototype.DirectorySubscriber = require('./directory_Subscriber');

AppSubscriberFactories.prototype.FileSubscriber = require('./file_Subscriber');


AppSubscriberFactories.prototype.defineFactory = function (name, Subscriber, get_entity_method_name) {

	var subscriber_factory = new this.SubscriberFactory(name, Subscriber, get_entity_method_name);

	subscriber_factory.listen(this.socket);


	this.context[name] = subscriber_factory;

};
