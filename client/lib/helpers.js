exports.cleanName = function (name) {
	return name.replace(/[^A-Za-z0-9]/, '_');
};

exports.$ = function (name) {
	return window.$('#' + exports.cleanName(name));
};

exports.mixinDomStore = function (ctor, store_name) {
	store_name += '_store';

	ctor.cleanName = exports.cleanName;
	ctor.$ = exports.$

	ctor.get = function (name, object) {
		object = object || ctor;

		var store = object[store_name] = object[store_name] || {};

		if (store[name]) return store[name];
	};

	ctor.set = function (value, name, object) {
		object = object || ctor;

		var store = object[store_name] = object[store_name] || {};

		return store[name] = value;
	};
};
