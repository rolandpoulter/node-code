"use strict";


module.exports = Client;


Client.get = function (socket) {

	return Client.cache[socket.id];

};


Client.cache = {};


function Client (
	app,
	socket,
	session,
	publishers,
	subscribers,
	entity_names,
	Project,
	objectForEach
) {

	this.app = app;

	this.socket = socket;

	this.session = session;


	if (publishers) this.publishers = publishers;

	if (subscribers) this.subscribers = subscribers;

	if (entity_names) this.entity_names = entity_names;


	if (Project) this.Project = Project;


	this.publish = new this.publishers.Client(this, this.socket);

	this.subscriber = new this.subscribers.Client(this, this.socket);


	this.enitty_subscribers = {};

	this.entity_names.forEach(this.subscribeEntity.bind(this));


	this.socket.createEntityPublisher = this.createEntityPublisher.bind(this);


	this.loadProjects();

}


Client.prototype.Project = require('./project');

Client.prototype.objectForEach = require('../shared/object_for_each');


var register_names = ['Client', 'Project', 'Directory', 'File'];

Client.prototype.publishers = createRegisterDictionary(register_names, 'publisher');

Client.prototype.subscribers = createRegisterDictionary(register_names, 'subscriber');


Client.prototype.entity_names = ['Project', 'Directory', 'File'];


Client.prototype.subscribeEntity = function (entity_name) {

	var EntitySubscriber = this.subscribers[entity_name];

	this.enitty_subscribers[entity_name.toLowerCase()] = new EntitySubscriber(this.socket);

};


Client.prototype.publishProjects = function () {

	this.publish.projects(this.session.projects);

};


Client.prototype.loadProjects = function () {

	if (!this.session.projects) {
		this.session.projects = {};

		new this.Project(this.app.dir, '', this.session.projects, {});
	}

	else {
		this.objectForEach(this.session.projects, function (project_info, name) {

			new this.Project(this.app.dir, '', this.session.projects, project_info.configuration);

		});
	}


	var client = this;

	this.objectForEach(this.session.projects, function (project_info, name) {

		client.Project.get(name).attachClient(client)

	});

};


Client.prototype.getPublisher = function (name) {

	return this.publishers[name];

};


Client.prototype.createEntityPublisher = function (name, entity) {

	if (this.entity_names.indexOf(name) === -1) return;


	var Publisher = this.getPublisher(name);


	return new Publisher(entity, this.socket);

};


function createRegisterDictionary (names, type) {

	var register_dictionary = {};


	names.forEach(function (name) {

		register_dictionary[name] = require('./' + name.toLowerCase() + '_' + type);

	});


	return register_dictionary;

};
