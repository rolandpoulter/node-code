exports.mixinStore = function (ctor, store_name) {
	store_name += '_store';

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
