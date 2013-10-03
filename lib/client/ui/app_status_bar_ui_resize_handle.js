"use strict";


exports = module.exports = dependency.register(AppStatusBarUIResizeHandle);


function AppStatusBarUIResizeHandle (app_ui_resizer) {
	this.app_ui_resizer = app_ui_resizer;
}


AppStatusBarUIResizeHandle.prototype.render = function (parent_node) {
	this.dom_node = document.createElement('div');
	this.dom_node.classList.add('status-bar-resize-handle');

	this.setup_events();

	parent_node.appendChild(this.dom_node);
};


AppStatusBarUIResizeHandle.prototype.resize = function (app_ui_resizer) {
	if (!this.dom_node) return;

	var dom_node_style = this.dom_node.style;

	dom_node_style.width = window.innerWidth + 'px';
	dom_node_style.bottom = Math.max(0, app_ui_resizer.status_bar_height - 4) + 'px';
};


AppStatusBarUIResizeHandle.prototype.setup_events = function () {
	this.dom_node.ondblclick = this.toggle_status_bar_width.bind(this);
	this.dom_node.onmousedown = this.drag_status_bar_width.bind(this);
};


AppStatusBarUIResizeHandle.prototype.toggle_status_bar_width = function (event) {
	if (this.app_ui_resizer.status_bar_height >= 10) {
		this.last_status_height = this.app_ui_resizer.status_bar_height;

		this.app_ui_resizer.status_bar_height = 0;
	}

	else {
		this.app_ui_resizer.status_bar_height = this.last_status_height;
	}

	this.app_ui_resizer.resize();
};

AppStatusBarUIResizeHandle.prototype.drag_status_bar_width = function (down) {
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
	    pending,
	    app_ui_resizer = this.app_ui_resizer;

	function mousemove (move) {
		if (pending) return;

		pending = true;

		requestAnimationFrame(function () {
			var diffY = last.pageY - move.pageY;

			app_ui_resizer.status_bar_height = Math.max(0, Math.min(400, app_ui_resizer.status_bar_height + diffY));
			// TODO: snap to status_increment_height

			app_ui_resizer.resize();

			last = move;
			pending = false;
		});
	}

	window.addEventListener('mouseup', mouseup);
	window.addEventListener('mousemove', mousemove);
};
