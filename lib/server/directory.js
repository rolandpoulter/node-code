"use strict";


module.exports = Directory;


Directory.cache = {};


function Directory (path_location, relative_path, cachedPathEntity) {

	if (cachedPathEntity) this.cachedPathEntity = cachedPathEntity;


	return this.cachedPathEntity(this, path_location, relative_path, Directory.cache);

}


Directory.prototype.cachedPathEntity = require('./cached_path_entity');


Directory.prototype.getInfo = function () {

	return {
		base_name: this.base_name,
		relative_path: this.relative_path
	};

};


Directory.prototype.open = function (callback) {};

Directory.prototype.close = function (callback) {};

Directory.prototype.index = function (callback) {
	callback({directory_index: true});
};