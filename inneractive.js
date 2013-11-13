var defaults = {
	PORTAL: 8471,
	IS_ORMMA_SUPPORT: false,
	IS_MRAID_SUPPORT: false,
	CATEGORY: "",
	KEYWORDS: "",
	GPS_COORDINATES: "",
	LOCATION: "",
	IS_MOBILE_WEB: true,
	IMEI_MD5: "",
	IMEI_SHA1: "",
	MAC_MD5: "",
	MAC_SHA1: "",
	UDID_MD5: "",
	UDID_SHA1: "",
	IMSI_MD5: "",
	IMSI_SHA1: "",
	ANDROID_ID_MD5: "",
	ANDROID_ID_SHA1: "",
	IDFA: "",
	IDFV: "",
	AGE: "",
	GENDER: "",
	DEVICE_WIDTH: "",
	DEVICE_HEIGHT: "",
	MOBILE_NETWORK_CODE: "",
	MOBILE_COUNTRY_CODE: "",
	NETWORK: "",
	OPTIONAL_WIDTH: "",
	OPTIONAL_HEIGHT: "",
	REQUIRED_WIDTH: "",
	REQUIRED_HEIGHT: "",
	BG_COLOR: "black"
};

function Ad (opts) {
	this._el = document.createElement("div");
	this.frame = document.createElement("iframe");
	this.frame.style.border = "0";
	this.visible = true;
	this.needsRefresh = false;

	// add some defaults if not specified in options
	for (var key in defaults) {
		if (opts[key] === undefined) {
			opts[key] = defaults[key];
		}
	}

	if (!opts.DEVICE_WIDTH && !opts.DEVICE_HEIGHT) {
		opts.DEVICE_WIDTH = window.innerWidth;
		opts.DEVICE_HEIGHT = window.innerHeight;
	}

	if (opts.TYPE === "Interstitial") {
		// if portrait
		if (opts.DEVICE_WIDTH < opts.DEVICE_HEIGHT) {
			opts.IS_INTERSTITIAL_AD = true;
		} else {
			// if landscape
			opts.REQUIRED_WIDTH = 300;
			opts.REQUIRED_HEIGHT = 250;	
		}

		opts.FS = true;
	} else if (opts.TYPE === "Rectangle") {
		opts.REQUIRED_WIDTH = 300;
		opts.REQUIRED_HEIGHT = 250;
	}

	var refreshRate = opts.REFRESH_RATE || 30;
	if (refreshRate < 15) refreshRate = 15;
	this.refreshRate = refreshRate;

	var html = [
		"<html><head>",
		"<base target='_blank' />",
		"</head><body style='padding:0;margin:0;overflow:hidden;text-align:center;'>",
		"<table style='width:100%;height:100%;padding:0;margin:0;border-collapse:collapse'><tr><td style='text-align: center; vertical-align: middle;padding:0'>",
		"<input id='iaAdtruthCollectorInput' type='hidden' value='' />",
		"<script src='http://cdn2.inner-active.mobi/wv-js/adtruth.js'></script>",
		"<div id='iaAdPlaceholder'></div>",
		"<script>ia = {}; ia.adSettings = " + JSON.stringify(opts) + ";</script>",
		"<script src='http://cdn2.inner-active.mobi/wv-js/iaAdTagInternal.min.js' type='text/javascript'></script>",
		"</td></tr></table>",
		"<script>document.body.addEventListener('click', function () { setTimeout(function() { parent.postMessage('click', '*'); }, 100); }, false);",
		"window.addEventListener('message',function(e){if(e.data=='refresh')location.reload();},false);",
		"</script>",
		(opts.TYPE === "Interstitial" ? "<script>window.onload = function () { document.getElementById('ad').style.margin = 'auto'; };</script>" : ""),
		(opts.TYPE === "Banner" ? "<script>window.onload = function () { var ad = document.getElementById('ad'); ad && parent.postMessage('resize:' + ad.width + ',' + ad.height, '*') };</script>" : ""),
		"</body></html>"
	];

	if (opts.FS) {
		//fullscreen
		this.setSize(opts.DEVICE_WIDTH, opts.DEVICE_HEIGHT);

		var closeBtn = document.createElement("a");
		closeBtn.textContent = "close";
		closeBtn.style.cssText = "position: absolute; right: 3px; top: 3px; z-index: 1000; color: white" + (opts.CLOSE_STYLE || "");
		closeBtn.onclick = function () {
			this.remove();
		}.bind(this);
		this._el.appendChild(closeBtn);
		this.closeBtn = closeBtn;
	} else {
		if (opts.REQUIRED_WIDTH && opts.REQUIRED_HEIGHT) {
			this.setSize(opts.REQUIRED_WIDTH, opts.REQUIRED_HEIGHT);
		} else {
			if (opts.TYPE === "Banner") {
				this.setSize(320, 50);
			}
		}
	}

	// set to a blank page
	setTimeout(function () {
		this.frame.src = "data:text/html;charset=utf-8," + html.join(" ");
	}.bind(this), 0);

	this.frame.style.overflow = "hidden";
	this.frame.style.background = opts.BG_COLOR;
	this.frame.setAttribute("scrolling", "no");

	window.addEventListener("message", function (e) {
		// clicked the ad, remove it
		if (e.data === "click") {
			// remove if interstital
			if (opts.FS) this.remove();
			// refresh if banner
			else this.needsRefresh = true;
		} else if (e.data.indexOf('resize:') === 0) {
			var dims = e.data.substr(7).split(",");
			this.setSize(+dims[0], +dims[1]);
		}
	}.bind(this), false);

	this._el.appendChild(this.frame);

	if (opts.TYPE === "Banner") {
		this.placement("top", "center");
	}

	this.startTimer();

	document.addEventListener("blur", function () {
		this.visible = false;
		this.stopTimer();
	}.bind(this), false);

	document.addEventListener("focus", function () {
		this.visible = true;
		this.startTimer();
		if (this.needsRefresh) { this.refreshAd(); }
	}.bind(this), false);

	document.addEventListener("mozvisibilitychange", function () {
		this.visible = !document.mozHidden;
		if (this.needsRefresh && this.visible) { this.refreshAd(); }
		if (this.visible) { this.startTimer(); }
		else { this.stopTimer(); }
	}.bind(this), false)
}

Ad.prototype = {
	startTimer: function () {
		if (this.interval != null) { return; }

		// refresh rate checks if visible
		this.interval = setInterval(function () {
			if (this.visible) {
				this.refreshAd();
			}
		}.bind(this), this.refreshRate * 1000);
	},

	stopTimer: function () {
		if (typeof this.interval === "number") {
			clearInterval(this.interval);
			this.interval = null;
		}
	},

	setSize: function (width, height) {
		this.frame.width = width;
		this.frame.height = height;

		if (this.placeVertical || this.placeHorizontal) {
			//re calculate the placement on size change
			this.placement(
				this.placeVertical, 
				this.placeHorizontal
			);
		}

		return this;
	},

	placement: function (vertical, horizontal) {
		this.frame.style.position = "fixed";

		if (vertical) { this.placeVertical = vertical; }
		if (horizontal) { this.placeHorizontal = horizontal; }

		this.frame.style.top = 
			this.frame.style.left =
			this.frame.style.bottom =
			this.frame.style.right = "";

		//position the vertical position
		switch (vertical) {
			case "bottom":
				this.frame.style.bottom = "0px";
				break;
			case "top":
				this.frame.style.top = "0px";
				break;
			case "center":
			case "centre":
				var pos = (window.innerHeight - this.frame.height) / 2;
				this.frame.style.top = Math.floor(pos) + "px";
				break;
		}

		switch (horizontal) {
			case "left":
				this.frame.style.left = "0px";
				break;
			case "right":
				this.frame.style.right = "0px";
				break;
			case "center":
			case "centre":
				var pos = (window.innerWidth - this.frame.width) / 2;
				this.frame.style.left = Math.floor(pos) + "px";
				break;
		}

		return this;
	},

	addTo: function (parent) {
		if (this._el.parentNode) {
			this._el.parentNode.removeChild(this._el);	
		}

		parent.appendChild(this._el);
		return this;
	},

	refresh: function () {
		this.placement(
			this.placeVertical, 
			this.placeHorizontal
		);
	},

	refreshAd: function () {
		this.frame.contentWindow.postMessage("refresh", "*");
		this.needsRefresh = false;
	},

	show: function () {
		this.refreshAd();
		this._el.style.display = "block";
		this.visible = true;
	},

	hide: function () {
		this._el.style.display = "none";
		this.visible = false;
	},

	remove: function () {
		if (this.interval) {
			clearInterval(this.interval);
		}

		this._el.parentNode.removeChild(this._el);
	}
};

var Inneractive = {
	createAd: function (opts) {
		return new Ad(opts);
	}
}
