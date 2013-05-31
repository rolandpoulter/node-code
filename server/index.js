"use strict";


var browserify = require('browserify'),
    socket_io = require('socket.io'),
    commander = require('commander'),
    express = require('express'),
    http = require('http'),
    path = require('path');


var package_json = require('../package.json');


var program = require('commander'),
    version = package_json.version;

program.
  version(version).
  parse(process.argv);


var app = express();

app.program = program;

app.cwd = process.cwd();
app.dir = path.join(__dirname, '..');

app.editor_name = package_json.name;
app.config_dir = '.' + app.editor_name;
app.relative_config_path = path.join(app.config_dir, 'config.json');

app.bundle = browserify([path.join(__dirname, '..', 'client', 'index.js')]);

app.server = http.createServer(app);

app.io = socket_io.listen(app.server);


require('./config')(app);
require('./routes')(app);


require('./messages')(app);
//require('./monitor')(app);


app.server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
