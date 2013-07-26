"use strict";


module.exports = ProjectSubscriber;


function ProjectSubscriber (socket, EntitySubscriber) {

	this.socket = socket;


	if (EntitySubscriber) this.EntitySubscriber = EntitySubscriber;


	new this.EntitySubscriber(this, 'project', this.socket, this.EntitySubscriber.getProjectEntity);

}


ProjectSubscriber.prototype.EntitySubscriber = require('./entity_subscriber');
