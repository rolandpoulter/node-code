"use strict";


exports = module.exports = UIComponents;


function UIComponents (components) {
	this.components = components || {};
}


UIComponents.prototype.addComponent = function (component_name, component) {
	this.components[component_name] = component;
};


UIComponents.prototype.forEachComponent = function (iterator, keys) {
	keys = keys || Object.keys(this.components);
	keys.forEach(this.forEachComponentIterator.bind(this, iterator));
};

UIComponents.prototype.forEachComponentIterator = function (iterator, key) {
	iterator.call(this, this.components[key]);
};


UIComponents.prototype.invoke = function (component_name, method, args) {
	var component = this.components[component_name];

	if (component) return component[method].apply(component, args);
};


UIComponents.prototype.invokeForEachComponent = function (method, args, keys) {
	this.forEachComponent(this.invokeForEachComponentIterator.bind(this, method, args), keys);
};

UIComponents.prototype.invokeForEachComponentIterator = function (method, args, component) {
	if (component[method]) component[method].apply(component, args);
};
