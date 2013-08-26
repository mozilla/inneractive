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
	this._el = document.createDocumentFragment();
	this.frame = document.createElement("iframe");
	this.frame.style.border = "0";

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

	var url = "<script language='javascript' src='http://ad-tag.inner-active.mobi/simpleM2M/RequestTagAd?v=" +
		((opts.IS_ORMMA_SUPPORT) ? ((opts.IS_MRAID_SUPPORT) ? "Stag-2.1.0&f=116" : "Stag-2.1.0&f=52") : ((opts.IS_MRAID_SUPPORT) ? "Stag-2.1.0&f=84" : "Stag-2.0.1&f=20")) +
		((opts.IS_INTERSTITIAL_AD) ? "&fs=true" : "&fs=false") +
		"&aid=" + encodeURIComponent(opts.APP_ID) +
		"&po=" + opts.PORTAL +
		"&c=" + encodeURIComponent(opts.CATEGORY) +
		"&k=" + encodeURIComponent(opts.KEYWORDS) +
		((opts.FAILOVER) ? "&noadstring=" + encodeURIComponent(opts.FAILOVER) : "&test=true") +
		"&lg=" + encodeURIComponent(opts.GPS_COORDINATES) +
		"&l=" + encodeURIComponent(opts.LOCATION) +
		"&mw=" + ((opts.IS_MOBILE_WEB) ? "true" : "false") +
		"&iemd=" + encodeURIComponent(opts.IMEI_MD5) +
		"&iesha=" + encodeURIComponent(opts.IMEI_SHA1) +
		"&mmd=" + encodeURIComponent(opts.MAC_MD5) +
		"&msha=" + encodeURIComponent(opts.MAC_SHA1) +
		"&dmd=" + encodeURIComponent(opts.UDID_MD5) +
		"&dsha=" + encodeURIComponent(opts.UDID_SHA1) +
		"&ismd=" + encodeURIComponent(opts.IMSI_MD5) +
		"&issha=" + encodeURIComponent(opts.IMSI_SHA1) +
		"&amd=" + encodeURIComponent(opts.ANDROID_ID_MD5) +
		"&asha=" + encodeURIComponent(opts.ANDROID_ID_SHA1) +
		"&idfa=" + encodeURIComponent(opts.IDFA) +
		"&idfv=" + encodeURIComponent(opts.IDFV) +
		"&a=" + encodeURIComponent(opts.AGE) +
		"&g=" + encodeURIComponent(opts.GENDER) +
		"&w=" + encodeURIComponent(opts.DEVICE_WIDTH) +
		"&h=" + encodeURIComponent(opts.DEVICE_HEIGHT) +
		"&mnc=" + encodeURIComponent(opts.MOBILE_NETWORK_CODE) +
		"&mcc=" + encodeURIComponent(opts.MOBILE_COUNTRY_CODE) +
		"&nt=" + encodeURIComponent(opts.NETWORK) +
		"&ow=" + encodeURIComponent(opts.OPTIONAL_WIDTH) +
		"&oh=" + encodeURIComponent(opts.OPTIONAL_HEIGHT) +
		"&rw=" + encodeURIComponent(opts.REQUIRED_WIDTH) +
		"&rh=" + encodeURIComponent(opts.REQUIRED_HEIGHT);

	url += "'><\/script>";

	var refreshRate = opts.REFRESH_RATE || 30;
	if (refreshRate < 15) refreshRate = 15;

	var html = [
		"<html><head>",
		"<meta http-equiv='refresh' content='" + refreshRate + "'/>",
		"<base target='_blank' />",
		"</head><body style='padding:0;margin:0;overflow:hidden;text-align:center;'>",
		"<table style='width:100%;height:100%;padding:0;margin:0;border-collapse:collapse'><tr><td style='text-align: center; vertical-align: middle;padding:0'>",
		url,
		"</td></tr></table>",
		"<script>document.body.addEventListener('click', function () { setTimeout(function() { parent.postMessage('click', '*'); location.reload(); }, 100); }, false);</script>",
		"</body></html>"
	];

	if (opts.REQUIRED_WIDTH && opts.REQUIRED_HEIGHT) {
		this.setSize(opts.REQUIRED_WIDTH, opts.REQUIRED_HEIGHT);
	}

	if (opts.FS) {
		//fullscreen
		if (!opts.REQUIRED_WIDTH && !opts.REQUIRED_HEIGHT) {
			this.setSize(320, 480);
		}

		var closeBtn = document.createElement("a");
		closeBtn.textContent = "close";
		closeBtn.style.cssText = "position: absolute; right: 3px; top: 3px; z-index: 1000; color: white" + (opts.CLOSE_STYLE || "");
		closeBtn.onclick = function () {
			this.frame.parentNode.removeChild(this.frame);
			closeBtn.parentNode.removeChild(closeBtn);
		}.bind(this);
		this._el.appendChild(closeBtn);
		this.closeBtn = closeBtn;
	}

	this.frame.src = "data:text/html;charset=utf-8," + html.join("\n");
	this.frame.style.overflow = "hidden";
	this.frame.style.background = opts.BG_COLOR;
	this.frame.setAttribute("scrolling", "no");

	window.addEventListener("message", function (e) {
		// clicked the ad, remove it
		if (opts.FS && e.data === "click") {
			this.frame.parentNode.removeChild(this.frame);
			closeBtn.parentNode.removeChild(closeBtn);
		}
	}.bind(this), false);

	this._el.appendChild(this.frame);
}

Ad.prototype = {
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
	}
};

var Inneractive = {
	createAd: function (opts) {
		return new Ad(opts);
	}
}
