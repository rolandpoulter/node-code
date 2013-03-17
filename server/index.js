"use strict";


var browserify = require('browserify'),
    socket_io = require('socket.io'),
    express = require('express'),
    http = require('http'),
    path = require('path');


var app = express();

app.dir = path.join(__dirname, '..');

app.bundle = browserify([path.join(__dirname, '..', 'client', 'index.js')]);

app.server = http.createServer(app);

app.io = socket_io.listen(app.server);


require('./config')(app);
require('./routes')(app);


require('./messages')(app);
require('./monitor')(app);


app.server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
