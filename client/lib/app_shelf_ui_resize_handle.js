"use strict";


exports = module.exports = AppShelfUIResizeHandle;


function AppShelfUIResizeHandle (app_ui_resizer) {
	this.app_ui_resizer = app_ui_resizer;
}


AppShelfUIResizeHandle.prototype.render = function (parent_node) {
	this.dom_node = document.createElement('div');
	this.dom_node.classList.add('shelf-resize-handle');

	this.setup_events();

	parent_node.appendChild(this.dom_node);
};


AppShelfUIResizeHandle.prototype.resize = function (app_ui_resizer) {
	if (!this.dom_node) return;

	var dom_node_style = this.dom_node.style;

	dom_node_style.left = Math.max(0, app_ui_resizer.shelf_width - 4) + 'px';
	dom_node_style.height = app_ui_resizer.shelf_height + 'px';
};


AppShelfUIResizeHandle.prototype.setup_events = function () {
	this.dom_node.ondblclick = this.toggle_shelf_width.bind(this);
	this.dom_node.onmousedown = this.drag_shelf_width.bind(this);
};

AppShelfUIResizeHandle.prototype.toggle_shelf_width = function (event) {
	if (this.app_ui_resizer.shelf_width >= 50) {
		this.app_ui_resizer.shelf_width = 0;
	}

	else {
		this.app_ui_resizer.shelf_width = Math.max(100, Math.min(200, Math.floor(window.innerWidth * 0.2)));
	}

	this.app_ui_resizer.resize();
};

AppShelfUIResizeHandle.prototype.drag_shelf_width = function (down) {
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
	    pending,
	    app_ui_resizer = this.app_ui_resizer;

	function mousemove (move) {
		if (pending) return;

		pending = true;

		requestAnimationFrame(function () {
			var diffX = move.pageX - last.pageX;

			app_ui_resizer.shelf_width = Math.max(0, Math.min(400, app_ui_resizer.shelf_width + diffX));

			app_ui_resizer.resize();

			last = move;
			pending = false;
		});
	}

	window.addEventListener('mouseup', mouseup);
	window.addEventListener('mousemove', mousemove);
};
