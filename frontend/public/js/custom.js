
$(document).ready(function () {
	"use strict";
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();

	$('[data-magnify]').magnify({
		headToolbar: [
			'close'
		],
		initMaximized: true
	});
});