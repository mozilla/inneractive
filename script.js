/********
This file is a demo of how to use the Inneractive library.
You will want to replace most of these values for 
your implementation.
*******/
var adOptions = {
	APP_ID: "Mozilla_AppTest_other",
	PORTAL: 642,
	IS_MOBILE_WEB: true,
	IS_ORMMA_SUPPORT: false,
	IS_MRAID_SUPPORT: false,
	IS_INTERSTITIAL_AD: false,
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
	CATEGORY: "Music",
	AGE: "",
	GENDER: "",
	KEYWORDS: "Rock,Pop,Jazz,Blues",
	LOCATION: "",
	GPS_COORDINATES: "",
	DEVICE_WIDTH: window.innerWidth, //resolution width of the devic,
	DEVICE_HEIGHT: window.innerHeight, //resolution height of the devic,
	MOBILE_NETWORK_CODE: "",
	MOBILE_COUNTRY_CODE: "",
	NETWORK: "", //values are 3G and WIF,
	OPTIONAL_WIDTH: "", //optional ad widt,
	OPTIONAL_HEIGHT: "", //optional ad heigh,
	REQUIRED_WIDTH: "", //required ad widt,
	REQUIRED_HEIGHT: "", //required ad heigh,
	IMPRESSION_PIXEL: "",
	CLICK_PIXEL: "",
	FAILOVER: "",
};

//create the Ad object based on the above options
var ad = Inneractive.createAd(adOptions);
ad
	.placement("bottom", "center")
	.setSize(300, 53)
	.addTo(document.getElementById("ad-frame"));
