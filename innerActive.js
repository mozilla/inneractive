/*
 * innerActive.js 
 * version 1.50
 * Date: June 20th, 2010
 * 
 * Added extended optional parameters:
  	 * innerActive_ad_params.external_id 
	 * innerActive_ad_params.age
	 * innerActive_ad_params.gender
	 * innerActive_ad_params.msisdn
	 * innerActive_ad_params.keywords
	 * innerActive_ad_params.category
	 * innerActive_ad_params.location
	 * innerActive_ad_params.gps_location
 */

var innerActive_logo_url = 'http://m2m1.inner-active.com/inneractive_logo.png';

if (typeof innerActive_splash_bg_color === 'undefined') {
	var innerActive_splash_bg_color = '#999';
}
if (typeof innerActive_splash_text_color === 'undefined') {
	var innerActive_splash_text_color = '#fff';
}
if (typeof innerActive_splash_border_color === 'undefined') {
	var innerActive_splash_border_color = '#333';
}
if (typeof innerActive_splash_y_offset === 'undefined') {
	var innerActive_splash_y_offset = 0;
}

var innerActive_ad_params = [];

var innerActiveIntervalID = 0;

function showSplash(sec) {
	var screenHeight = window.innerHeight;
	var screenWidth = window.innerWidth;
	var splash = document.getElementById("inneractive-splash");
	var innerActive_timer_container = document.getElementById("innerActiveSplashTimer");
	splash.style.display = 'block';	
	var innerActive_counter = parseInt(sec);
	var duration = parseInt(sec);

	if (screenHeight < 300 || screenWidth < 300) {
		var innerActiveSplashSkipWC = "80px";
		var innerActiveSplashSkipWF = "110px";
	} else {
		var innerActiveSplashSkipWC = "150px";
		var innerActiveSplashSkipWF = "200px";		
	}
	
	if (duration>0) {
		document.getElementById("innerActiveSplashSkip").style.cssFloat = "left";
		innerActive_timer_container.innerHTML = innerActive_counter;
		innerActive_timer_container.style.display = 'block';
		document.getElementById("innerActiveSplashSkip").style.width = innerActiveSplashSkipWC;
		innerActiveIntervalID = setInterval(function() {
			innerActive_counter -= 1;			
			innerActive_timer_container.innerHTML = innerActive_counter;
			if (innerActive_counter <= 0) {
				clearInterval(innerActiveIntervalID);
				splash.style.display = 'none';	
			}
		}, 1000);
	} else {
		innerActive_timer_container.style.display = 'none';
		document.getElementById("innerActiveSplashSkip").style.width = innerActiveSplashSkipWF;
		document.getElementById("innerActiveSplashSkip").style.cssFloat = "";
	}
}

function hideSplash() {
	document.getElementById("inneractive-splash").style.display = 'none';
	clearInterval(innerActiveIntervalID);
}

function getSmallBannerAd(div_id, showtext) {
	getInnerActiveAd(div_id, showtext);
}

function createInnerActiveSplashAd() {
	createInnerActiveSplashElement();
	setSplashPosition();
	window.onresize = function(){
		setSplashPosition();
	}
	var innerActiveSplashOk = document.getElementById("splash-ad-ok");
	innerActiveSplashOk.onclick = function() {
		var open_url_array = document.getElementById("splash-ad").getElementsByTagName("a");
		var open_url = open_url_array[0].getAttribute("href");
		var open_url_enc = encodeURI(open_url);

		try {
			widget.openURL(open_url);
		} catch (e) {
			window.location = open_url;
		}
		document.getElementById("inneractive-splash").style.display = 'none';
		getInnerActiveAd("splash-ad", "showAdText");
		clearInterval(innerActiveIntervalID);
		return false;
	}
		
	getInnerActiveAd("splash-ad", "showAdText");	
	
	var hideSplash = document.getElementById("splash-ad-cont");
	hideSplash.onclick = function(){		
		document.getElementById("inneractive-splash").style.display = 'none';
		getInnerActiveAd("splash-ad", "showAdText");
		clearInterval(innerActiveIntervalID);
	}
}


function createInnerActiveSplashElement() {
	var splash  = document.createElement("div");
	splash.id='inneractive-splash';
	splash.setAttribute('style','position:absolute; z-index:99999; display:none; vertical-align:middle; text-align:center;');
	splash.style.backgroundColor = innerActive_splash_bg_color;
	splash.style.border = "2px solid " + innerActive_splash_border_color;
	splash.style.color = innerActive_splash_text_color;
	document.body.appendChild(splash);
	
	var splash_c0 = document.createElement("div");
	splash_c0.id = 'innerActive-splash-title';
	splash_c0.style.paddingBottom = '5px';
	splash_c0.style.textAlign = 'center';
	splash.appendChild(splash_c0);

	var splash_c0_img = document.createElement("img");
	splash_c0_img.id = 'innerActive-splash-title-img';
	splash_c0_img.src = innerActive_logo_url;
	splash_c0.appendChild(splash_c0_img);
		
	var splash_c1 = document.createElement("div");
	splash_c1.id = 'splash-ad';
	splash.appendChild(splash_c1);
	
	var splash_c2 = document.createElement("div");
	splash_c2.id = 'splash-ad-ok';
	splash_c2.innerHTML = "Click";
	splash_c2.style.padding = "5px";
	splash_c2.style.fontFamily = "Times New Roman";
	splash_c2.style.fontSize = "1.6em";
	splash_c2.style.fontColor = "#333";
	splash_c2.style.color = "#333";
	splash_c2.style.background = "#43aa10";
	splash_c2.style.border = "2px solid #333";
	splash_c2.style.height = "26px";
	splash_c2.style.paddingTop = "2px";	
	var innerActive_Splash_c2_Offset = (window.innerWidth - parseInt(splash_c2.style.width))/2;
	splash_c2.style.marginLeft = innerActive_Splash_c2_Offset + "px";
	splash.appendChild(splash_c2);	
	
	var splash_c3 = document.createElement("div");
	splash_c3.id = 'splash-ad-cont';
	splash_c3.innerHTML = "<div id='innerActiveSplashSkip' style='float:left'>Skip</div><div id='innerActiveSplashTimer' style='display:none; float:left'></div>";
	splash_c3.style.height = "22px";
	splash_c3.style.padding = "2px";
	splash_c3.style.background = "#DDD";
	splash_c3.style.fontFamily = "Times New Roman";
	splash_c3.style.fontSize = "1.2em";
	splash_c3.style.fontColor = "#333";
	splash_c3.style.color = "#333";	
	splash_c3.style.border = "2px solid #333";
	splash_c3.style.marginBottom = "20px";
	var innerActive_Splash_c3_Offset = (window.innerWidth - parseInt(splash_c3.style.width))/2;
	splash_c3.style.marginLeft = innerActive_Splash_c3_Offset + "px";
	splash.appendChild(splash_c3);
}

function setSplashPosition() {
	
	var screenHeight = window.innerHeight;
	var screenWidth = window.innerWidth;	
	var phoneIsPortrait = phoneIsInPortrait(screenHeight, screenWidth);
	var splash = document.getElementById("inneractive-splash");
	var splash_c0 = document.getElementById("innerActive-splash-title");
	var splash_c1 = document.getElementById("splash-ad");
	var splash_c2 = document.getElementById("splash-ad-ok");
	var splash_c3 = document.getElementById("splash-ad-cont");

	if (screenHeight<300 || screenWidth<300) {
		innerActive_splash_style='full';
		splash_c2.style.width = "150px";
		splash_c3.style.width = "110px";
		splash_c2.style.marginBottom = "10px";
		
		if (phoneIsPortrait) {
			splash_c0.style.borderBottom = '40px solid '+innerActive_splash_bg_color;
			splash_c1.style.borderBottom = '30px solid '+innerActive_splash_bg_color;
		} else {
			splash_c0.style.borderBottom = '10px solid '+innerActive_splash_bg_color;
			splash_c1.style.borderBottom = '15px solid '+innerActive_splash_bg_color;
		}
		
		
	} else {
		splash_c2.style.width = "240px";
		splash_c3.style.width = "200px";	
		splash_c1.style.borderBottom = '60px solid '+innerActive_splash_bg_color;
		splash_c0.style.borderBottom = '50px solid '+innerActive_splash_bg_color;
		splash_c2.style.marginBottom = "20px";
	}

	splash_c0.style.background = "#FFF";
	
	if (innerActive_splash_style=='full') {
		var posH = 0;
		var posW = 0; 
		
		splash.style.textAlign = "center";
		
		splash.style.border = "0px";
		splash.style.height = "100%";
		splash.style.width = "100%";
		
		if (phoneIsPortrait) {
			splash_c0.style.width = "100%";
			if (screenHeight<300 || screenWidth<300) {
				splash_c0.style.marginTop = "0px";
			} else {
				splash_c0.style.marginTop = "100px";
			}
		} else {
			splash_c0.style.marginTop = "0px";
		}
		
	} else {
	
		if (phoneIsPortrait) {
			var posW = 2;
			var posH = (screenHeight - 356 ) / 2 + innerActive_splash_y_offset;
			splash.style.width = "98%";
			splash.style.height = "360px";
		} else {
			var posH = 2 + innerActive_splash_y_offset;
			var posW = (screenWidth - 356 ) / 2;	
			splash.style.height = "98%";
			splash.style.width = "360px";
		}
		
	}
		
	splash.style.top = posH + "px";
	splash.style.left = posW + "px";
	
	splash_c2.style.marginLeft = (window.innerWidth - parseInt(splash_c2.style.width))/2 - posW - 10 + "px";	
	splash_c3.style.marginLeft = (window.innerWidth - parseInt(splash_c3.style.width))/2 - posW - 5 + "px";	
	
}

function phoneIsInPortrait(h,w) {
	if (h > w) {
		return true;
	} else {
		return false;
	}
}
 
 
function getInnerActiveAd(div_id, showtext) {	
	var currentTime = (new Date()).getTime();
	if (innerActive_ad_params.portal === undefined || innerActive_ad_params.portal == '') {
		innerActive_ad_params.portal = '551';
	}  
	
	var innerActiveUrl = "http://m2m1.inner-active.com/simpleM2M/clientRequestHtmlAd";

	innerActiveUrl += "?aid="+innerActive_aid;
	//innerActiveUrl += "&cid="+client_id;
	innerActiveUrl += "&po="+innerActive_ad_params.portal;
	innerActiveUrl += "&o=true&test=true";
	innerActiveUrl += "&time="+currentTime;
	innerActiveUrl += "&v=Sm2m-1.5.1";

	if (innerActive_ad_params.external_id !== undefined) { innerActiveUrl += "&eid="+innerActive_ad_params.external_id; }
	if (innerActive_ad_params.age !== undefined) { innerActiveUrl += "&a="+innerActive_ad_params.age; }
	if (innerActive_ad_params.gender !== undefined) { innerActiveUrl += "&g="+innerActive_ad_params.gender; }
	if (innerActive_ad_params.msisdn !== undefined) { innerActiveUrl += "&mn="+innerActive_ad_params.msisdn; }
	if (innerActive_ad_params.keywords !== undefined) { innerActiveUrl += "&k="+innerActive_ad_params.keywords; }
	if (innerActive_ad_params.category !== undefined) { innerActiveUrl += "&c="+innerActive_ad_params.category; }
	if (innerActive_ad_params.location !== undefined) { innerActiveUrl += "&l="+innerActive_ad_params.location; }
	if (innerActive_ad_params.gps_location !== undefined) { innerActiveUrl += "&lg="+innerActive_ad_params.gps_location; }
	
	var innerActiveAd_div_id = document.getElementById(div_id);

	try { 
		netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	} catch(e) {
		
	}
	
	try{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {

			if(xmlHttp.readyState != 4) {
				innerActiveAd_div_id.innerHTML += '.';
			}
		 
			if (xmlHttp.readyState == 4) {
				try
				{			
					var ad = xmlHttp.responseText;
					if(!ad) {
						innerActiveAd_div_id.innerHTML += ".";
					} else {
						var ad_type = '';
						var text_begin = ad.indexOf("type=")+6;
						var type_indicator = ad.substr(text_begin, 4);
						if (type_indicator=='Bann') {
							ad_type = 'banner';
						} else {
							ad_type = 'text';
						}
					
						innerActiveAd_div_id.innerHTML = ad;		
						var elementArr = innerActiveAd_div_id.getElementsByTagName("a");
						
						var ad_text = elementArr[0].getAttribute("title");
						
						if (ad_type=='banner') {
							innerActiveAd_div_id.innerHTML = ad;		
							if (ad_text!='Bring your mobile to life. Games, Themes, and much more.' && showtext=='showAdText') {
								innerActiveAd_div_id.innerHTML += '<br>'+ad_text;
							}
						} else {
							innerActiveAd_div_id.innerHTML = ad_text;
						}
					}
				}
			  	catch (e) {
					innerActiveAd_div_id.innerHTML = "Error processing Ad Format";
			    }
			}
		}
		xmlHttp.open('GET', innerActiveUrl, true);
		xmlHttp.send(null);
	}
	catch(e)
	{
		innerActiveAd_div_id.innerHTML = "Error opening connection to Ad server";
	}
}


function innerActiveAdClick(obj) {
	var div_id = obj.parentNode.id;
	var open_url = obj.href;
	//var open_url_enc = encodeURI(open_url);
	widget.openURL(open_url);
	if (div_id!='inneractive-splash') {
		getInnerActiveAd(div_id, "showAdText");	
	} else {
		hideSplash();
		getInnerActiveAd("splash-ad", "showAdText");	
	}   
	return false;
}