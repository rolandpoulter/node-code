"use strict";


exports = module.exports = dependency.register(AppTabsUIResizeHandle);


function AppTabsUIResizeHandle (app_ui_resizer) {
	this.app_ui_resizer = app_ui_resizer;
}


AppTabsUIResizeHandle.prototype.render = function (parent_node) {
	this.dom_node = document.createElement('div');
	this.dom_node.classList.add('tabs-resize-handle');

	this.setup_events();

	parent_node.appendChild(this.dom_node);
};


AppTabsUIResizeHandle.prototype.resize = function (app_ui_resizer) {
	if (!this.dom_node) return;

	var dom_node_style = this.dom_node.style;

	dom_node_style.width = app_ui_resizer.tabs_width + 'px';
	dom_node_style.left = app_ui_resizer.shelf_width + 'px';
	dom_node_style.top = Math.max(0, app_ui_resizer.tabs_height - 4) + 'px';
};


AppTabsUIResizeHandle.prototype.setup_events = function () {
	this.dom_node.ondblclick = this.toggle_tabs_width.bind(this);
	this.dom_node.onmousedown = this.drag_tabs_width.bind(this);
};

AppTabsUIResizeHandle.prototype.toggle_tabs_width = function (event) {
	if (this.app_ui_resizer.tabs_height >= 20) {
		this.last_opened_height = this.app_ui_resizer.tabs_height;

		this.app_ui_resizer.tabs_height = 0;
	}

	else {
		this.app_ui_resizer.tabs_height = this.last_opened_height;
	}

	this.app_ui_resizer.resize();
};

AppTabsUIResizeHandle.prototype.drag_tabs_width = function (down) {
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
			var diffY = move.pageY - last.pageY;

			app_ui_resizer.tabs_height = Math.max(0, Math.min(400, app_ui_resizer.tabs_height + diffY));
			// TODO: snap to opened_increment_height

			app_ui_resizer.resize();

			last = move;
			pending = false;
		});
	}

	window.addEventListener('mouseup', mouseup);
	window.addEventListener('mousemove', mousemove);
};
