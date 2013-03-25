"use strict";


var Notification = require('./lib/Notification');


module.exports = function (app) {
	setTimeout(function () {
		new Notification({message: 'Welcome to node code.'}).render();
	}, 500);


	//window.onbeforeunload = function (event) {
		//return 'Are you sure you want to exit this session?';
	//};


	setTimeout(resize, 50);

	window.onresize = resize;

	app.files_width = Math.max(100, Math.min(200, Math.floor(window.innerWidth * 0.2)));

	function resize () {
		app.emit('resize');

		app.status_height = app.status_dom.clientHeight;
		app.opened_height = app.opened_dom.clientHeight;
		app.files_height = window.innerHeight - app.status_height;
		app.editors_height = (window.innerHeight - app.status_height) - app.opened_height;

		app.opened_width =
		app.editors_width = window.innerWidth - app.files_width;

		app.opened_dom.style.left =
		app.editors_dom.style.left =
		app.files_dom.style.width = app.files_width + 'px';

		app.status_dom.style.width = window.innerWidth + 'px';
		app.opened_dom.style.width = app.opened_width + 'px';
		app.editors_dom.style.width = app.editors_width + 'px';

		app.resize_files_dom.style.height =
		app.files_dom.style.height = app.files_height + 'px';

		app.status_dom.style.height = app.status_height + 'px';
		app.editors_dom.style.height = app.editors_height + 'px';

		app.editors_dom.style.top =
		app.opened_dom.style.height = app.opened_height + 'px';

		app.resize_files_dom.style.left = Math.max(0, app.files_width - 4) + 'px';

		var current = document.querySelector('a.current');

		if (current && current.js_object) {
			current.js_object.current();
		}
	}


	app.resize_files_dom.ondblclick = function () {
		if (app.files_width >= 50) {
			app.files_width = 0;
		} else {
			app.files_width = Math.max(100, Math.min(200, Math.floor(innerWidth * 0.2)));
		}

		resize();
	};

	app.resize_files_dom.onmousedown = function (down) {
		document.body.classList.add('col-resize');

		function mouseup (up) {
			document.body.classList.remove('col-resize')

			window.removeEventListener('mouseup', mouseup);
			window.removeEventListener('mousemove', mousemove);
		}

		var requestAnimationFrame = 
			window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame;

		var last = down,
		    pending;

		function mousemove (move) {
			if (pending) return;

			pending = true;

			requestAnimationFrame(function () {
				var diffX = move.pageX - last.pageX;

				app.files_width = Math.max(0, Math.min(400, app.files_width + diffX));

				resize();

				last = move;
				pending = false;
			});
		};

		window.addEventListener('mouseup', mouseup);
		window.addEventListener('mousemove', mousemove);
	}
};
