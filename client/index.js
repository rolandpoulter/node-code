"use strict";


var $ = function (sel, doc) {
	var list = (doc || document).querySelectorAll(sel);
	return list && list.length === 1 ? list[0] : list;
};


var EventEmitter = require('events').EventEmitter;


var app = new EventEmitter();

app.overlay_dom = $('#overlay');
app.editors_dom = $('#editors');
app.opened_dom = $('#opened');
app.status_dom = $('#status');
app.files_dom = $('#files');

app.resize_files_dom = $('#resize-files');


window.$ = app.$ = $;

app.socket = io.connect(window.location);


app.error = function () {
	console.error.apply(console, arguments);
};


require('./messages')(app);
require('./opened')(app);
require('./files')(app);
require('./ui')(app);
