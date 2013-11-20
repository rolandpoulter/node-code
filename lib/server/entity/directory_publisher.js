"use strict";


require('../../shared/entity_publisher')


exports = module.exports = dependency.injection(DirectoryPublisher);


function DirectoryPublisher (directory, messenger, EntityPublisher) {

	this.publish = new EntityPublisher('directory', messenger, directory).bindPublish();

}


DirectoryPublisher.prototype.index = function (directory_index) {

	this.publish('index', directory_index);

};
