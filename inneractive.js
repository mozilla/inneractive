function Ad (opts) {
	this._el = document.createElement("iframe");
	this._el.style.border = "0";

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

	var html = [
		"<base target='_blank' />",
		url
	];

	if (opts.REQUIRED_WIDTH && opts.REQUIRED_HEIGHT) {
		this.setSize(opts.REQUIRED_WIDTH, opts.REQUIRED_HEIGHT);
	}

	this._el.src = "data:text/html;charset=utf-8," + html.join("\n");
}

Ad.prototype = {
	setSize: function (width, height) {
		this._el.width = width;
		this._el.height = height;

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
		this._el.style.position = "fixed";

		if (vertical) { this.placeVertical = vertical; }
		if (horizontal) { this.placeHorizontal = horizontal; }

		//position the vertical position
		switch (vertical) {
			case "bottom":
				this._el.style.bottom = "0px";
				break;
			case "top":
				this._el.style.top = "0px";
				break;
		}

		switch (horizontal) {
			case "left":
				this._el.style.left = "0px";
				break;
			case "right":
				this._el.style.left = "0px";
				break;
			case "center":
			case "centre":
				var pos = (window.innerWidth - this._el.width) / 2;
				this._el.style.left = Math.floor(pos) + "px";
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
	}
};

var Inneractive = {
	createAd: function (opts) {
		return new Ad(opts);
	}
}
