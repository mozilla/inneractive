var APP_ID = "Mozilla_AppTest_other";
var PORTAL = 642;
var IS_MOBILE_WEB = false;
var IS_ORMMA_SUPPORT = false;
var IS_MRAID_SUPPORT = true;
var IS_INTERSTITIAL_AD = false;
 
var IMEI_MD5 = "";
var IMEI_SHA1 = "";
var MAC_MD5 = "";
var MAC_SHA1 = "";
var UDID_MD5 = "";
var UDID_SHA1 = "";
var IMSI_MD5 = "";
var IMSI_SHA1 = "";
var ANDROID_ID_MD5 = "";
var ANDROID_ID_SHA1 = "";
var IDFA = "";
var IDFV = "";
var CLIENT_ID = "-1";
var CATEGORY = "Music";
var AGE = "";
var GENDER = "";
var KEYWORDS = "Rock,Pop,Jazz,Blues";
var LOCATION = "";
var GPS_COORDINATES = "";
var DEVICE_WIDTH = window.innerWidth; //resolution width of the device
var DEVICE_HEIGHT = window.innerHeight; //resolution height of the device
var MOBILE_NETWORK_CODE = "";
var MOBILE_COUNTRY_CODE = "";
var NETWORK = ""; //values are 3G and WIFI
var OPTIONAL_WIDTH = ""; //optional ad width
var OPTIONAL_HEIGHT = ""; //optional ad height
var REQUIRED_WIDTH = ""; //required ad width
var REQUIRED_HEIGHT = ""; //required ad height
var IMPRESSION_PIXEL = "";
var CLICK_PIXEL = "";
var FAILOVER = "";
var TEMPLATE = "inneractiveBanner";
 
//Use code from JavaScript Ad Tag 
//(https://inneractive.jira.com/wiki/display/DevWiki/JavaScript+Ad+Tag)
var url = "<script language='javascript' src='http://ad-tag.inner-active.mobi/simpleM2M/RequestTagAd?v=" +
((IS_ORMMA_SUPPORT) ? ((IS_MRAID_SUPPORT) ? "Stag-2.1.0&f=116" : "Stag-2.1.0&f=52") : ((IS_MRAID_SUPPORT) ? "Stag-2.1.0&f=84" : "Stag-2.0.1&f=20")) +
((IS_INTERSTITIAL_AD) ? "&fs=true" : "&fs=false") +
"&aid=" + encodeURIComponent(APP_ID) +
"&po=" + PORTAL +
"&c=" + encodeURIComponent(CATEGORY) +
"&k=" + encodeURIComponent(KEYWORDS) +
((FAILOVER) ? "&noadstring=" + encodeURIComponent(FAILOVER) : "&test=true") +
"&lg=" + encodeURIComponent(GPS_COORDINATES) +
"&l=" + encodeURIComponent(LOCATION) +
"&mw=" + ((IS_MOBILE_WEB) ? "true" : "false") +
"&iemd=" + encodeURIComponent(IMEI_MD5) +
"&iesha=" + encodeURIComponent(IMEI_SHA1) +
"&mmd=" + encodeURIComponent(MAC_MD5) +
"&msha=" + encodeURIComponent(MAC_SHA1) +
"&dmd=" + encodeURIComponent(UDID_MD5) +
"&dsha=" + encodeURIComponent(UDID_SHA1) +
"&ismd=" + encodeURIComponent(IMSI_MD5) +
"&issha=" + encodeURIComponent(IMSI_SHA1) +
"&amd=" + encodeURIComponent(ANDROID_ID_MD5) +
"&asha=" + encodeURIComponent(ANDROID_ID_SHA1) +
"&idfa=" + encodeURIComponent(IDFA) +
"&idfv=" + encodeURIComponent(IDFV) +
"&a=" + encodeURIComponent(AGE) +
"&g=" + encodeURIComponent(GENDER) +
"&w=" + encodeURIComponent(DEVICE_WIDTH) +
"&h=" + encodeURIComponent(DEVICE_HEIGHT) +
"&mnc=" + encodeURIComponent(MOBILE_NETWORK_CODE) +
"&mcc=" + encodeURIComponent(MOBILE_COUNTRY_CODE) +
"&nt=" + encodeURIComponent(NETWORK) +
"&ow=" + encodeURIComponent(OPTIONAL_WIDTH) +
"&oh=" + encodeURIComponent(OPTIONAL_HEIGHT) +
"&rw=" + encodeURIComponent(REQUIRED_WIDTH) +
"&rh=" + encodeURIComponent(REQUIRED_HEIGHT);

url += "'><\/script>";

//use the base tag to open all links in a new window (escape the IFrame)
var pre_html = "<base target=\"_blank\" \/>";

var frame = document.getElementById('frame');
frame.style.border = "0";

//set the source of the iframe to the generated code to avoid CSP issues
frame.src = "data:text/html;charset=utf-8," + pre_html + url;
