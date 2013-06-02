"use strict";


var App = require('./server/app');

var package_json = require('../package.json');


var parameters = require('commander');


parameters.version(package_json.version);

parameters.parse(process.argv);


var app = new App(parameters, package_json);


module.exports = app;
