"use strict";


module.exports = File;


function File (project_location, absolute_path, cachedEntity, fs) {

	if (cachedEntity) this.cachedEntity = cachedEntity;


	if (fs) this.fs = fs;


	return this.cachedEntity(this, project_location, absolute_path);

}


File.prototype.cachedEntity = require('./cached_entity');


File.prototype.fs = require('fs');


File.prototype.getInfo = function () {

	return {
		type: 'File',
		base_name: this.base_name,
		relative_path: this.relative_path
	};

};


File.prototype.open = function (callback) {

	var that = this;

	this.fs.readFile(this.absolute_path, 'utf8', function (error, file_data) {

		callback(file_data);

	});

};

File.prototype.close = function () {

};
