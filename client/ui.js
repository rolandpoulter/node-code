"use strict";/*jslint smarttabs:true*/


var Notification = require('./lib/Notification'),
    File = require('./lib/File');


module.exports = function (app) {
	require('./ui/status')(app);
	require('./ui/opened')(app);
	require('./ui/files')(app);

	setTimeout(function () {
		new Notification({message: 'Welcome to node code.'}).render();
	}, 500);


	// window.onbeforeunload = function (event) {
		// return 'Are you sure you want to exit this session?';
	// };


	setTimeout(resize, 50);

	window.addEventListener('resize', resize);

	app.files_width = Math.max(100, Math.min(200, Math.floor(window.innerWidth * 0.2)));

	app.opened_increment_height = app.opened_height = app.opened_dom.clientHeight || 30;
	app.status_increment_height = app.status_height = app.status_dom.clientHeight || 20;

	function resize () {
		app.emit('resize');

		app.files_height = window.innerHeight - app.status_height;
		app.editors_height = (window.innerHeight - app.status_height) - app.opened_height;

		app.opened_width =
		app.editors_width = window.innerWidth - app.files_width;

		app.opened_dom.style.left =
		app.resize_opened_dom.style.left =
		app.editors_dom.style.left =
		app.files_dom.style.width = app.files_width + 'px';

		app.resize_status_dom.style.width =
		app.status_dom.style.width = window.innerWidth + 'px';

		app.resize_opened_dom.style.width =
		app.opened_dom.style.width = app.opened_width + 'px';

		app.editors_dom.style.width = app.editors_width + 'px';

		app.resize_files_dom.style.height =
		app.files_dom.style.height = app.files_height + 'px';

		app.status_dom.style.height = app.status_height + 'px';
		app.editors_dom.style.height = app.editors_height + 'px';

		app.editors_dom.style.top =
		app.opened_dom.style.height = app.opened_height + 'px';

		app.resize_files_dom.style.left = Math.max(0, app.files_width - 4) + 'px';

		app.resize_opened_dom.style.top = Math.max(0, app.opened_height - 4) + 'px';
		app.resize_status_dom.style.bottom = Math.max(0, app.status_height - 4) + 'px';

		if (File.current) {
			File.current.current();
		}
	}


	app.resize_files_dom.ondblclick = function () {
		if (app.files_width >= 50) {
			app.files_width = 0;
		} else {
			app.files_width = Math.max(100, Math.min(200, Math.floor(window.innerWidth * 0.2)));
		}

		resize();
	};

	app.resize_files_dom.onmousedown = function (down) {
		document.body.classList.add('row-resize');

		function mouseup (up) {
			document.body.classList.remove('row-resize');

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
		}

		window.addEventListener('mouseup', mouseup);
		window.addEventListener('mousemove', mousemove);
	};


	app.resize_opened_dom.ondblclick = function () {
		if (app.opened_height >= 20) {
			app.last_opened_height = app.opened_height;
			app.opened_height = 0;
		} else {
			app.opened_height = app.last_opened_height;
		}

		resize();
	};

	app.resize_opened_dom.onmousedown = function (down) {
		document.body.classList.add('col-resize');

		function mouseup (up) {
			document.body.classList.remove('col-resize');

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
				var diffY = move.pageY - last.pageY;

				app.opened_height = Math.max(0, Math.min(400, app.opened_height + diffY));
				// TODO: snap to opened_increment_height

				resize();

				last = move;
				pending = false;
			});
		}

		window.addEventListener('mouseup', mouseup);
		window.addEventListener('mousemove', mousemove);
	};


	app.resize_status_dom.ondblclick = function () {
		if (app.status_height >= 10) {
			app.last_status_height = app.status_height;
			app.status_height = 0;
		} else {
			app.status_height = app.last_status_height;
		}

		resize();
	};

	app.resize_status_dom.onmousedown = function (down) {
		document.body.classList.add('row-resize');

		function mouseup (up) {
			document.body.classList.remove('row-resize');

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
				var diffY = last.pageY - move.pageY;

				app.status_height = Math.max(0, Math.min(400, app.status_height + diffY));
				// TODO: snap to status_increment_height

				resize();

				last = move;
				pending = false;
			});
		}

		window.addEventListener('mouseup', mouseup);
		window.addEventListener('mousemove', mousemove);
	};
};
