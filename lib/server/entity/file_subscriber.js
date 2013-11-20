"use strict";


require('../../shared/entity_subscriber');


exports = module.exports = dependency.injection(FileSubscriber);


function FileSubscriber (messenger, EntitySubscriber) {

	this.messenger = messenger;


	new EntitySubscriber(this, 'file', messenger, EntitySubscriber.getFileEntity);

}


FileSubscriber.prototype.open = function () {

	this.file.open(this.messenger);

};


FileSubscriber.prototype.close = function () {

	this.file.close(this.messenger);

};


FileSubscriber.prototype.read = function () {

	this.file.read(this.messenger);

};


FileSubscriber.prototype.save = function (file_data, file_format) {

	this.file.save(this.messenger, file_data, file_format);

};
