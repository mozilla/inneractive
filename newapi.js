function getValueById(elementId){
	if(document.getElementById(elementId)){
		return document.getElementById(elementId).value;
	}
	return -1;
}

function getInneractiveClientId() {
	return getValueById("inneractive-cid");
}

function getInneractiveAdType() {
	return getValueById("inneractive-ad-type");
}

function getInneractiveErrorString() {
	return getValueById("inneractive-error");
}

function addTrackingPixel(trackingPixelSrc, shouldSendArguments, argumentsObj) {
	if (trackingPixelSrc != '') {
		var track = new Image();
        if (shouldSendArguments) {
            track.src = trackingPixelSrc + encodeURI(JSON.stringify(argumentsObj));
        } else {
            track.src = trackingPixelSrc;
        }
		track.width = '1';
		track.height = '1';

		document.getElementById("track_href").appendChild(track);
   }
}

function redirect(hrefObj, argumentsObj) {
	var timeout = setTimeout(function() {
		if (IS_MRAID_SUPPORT) {
			mraid.open(hrefObj.href);
		} else {
			ormma.open(hrefObj.href);
		}
   }, 400);
}

function addTrackingPixelForClick(hrefObj) {
		// This will be done inside the ormma/mraid open
}

function reportOpen(hrefObj) {
	try {
		addTrackingPixelForClick(hrefObj);
	} catch(err) {
		// does nothing TODO
	}

	if (oldOnClick) {
		oldOnClick.apply();
	}
	redirect(hrefObj);
	return false;
}

function redirectToAdPage(adPageUrl){
	top.location.href = adPageUrl;
}

function attachHrefHandler(hrefObj) {
   if(hrefObj.id && hrefObj.id.substring(0,2) == 'ia') {
		return false;
   }
   if (hrefObj.href.substring(0,10) == 'javascript') {
		return false;
   }

   oldOnClick = hrefObj.onclick;
   hrefObj.onclick=function(){
		reportOpen(hrefObj, oldOnClick);

		return false;
	}
}

function onResponse () {
	if (!IS_ORMMA_SUPPORT) return;

	var linksArray = document.getElementsByTagName('a');
	for(var i = 0 ; i < linksArray.length ; i++){
		var currentLink = linksArray[i];
		attachHrefHandler(currentLink);
	}
}


