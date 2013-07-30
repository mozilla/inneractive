/********
This file is a demo of how to use the Inneractive library.
You will want to replace most of these values for 
your implementation.
*******/
var adOptions = {
	APP_ID: "Mozilla_AppTest_other",
	
	IS_INTERSTITIAL_AD: false,
	REFRESH_RATE: -1
};

//create the Ad object based on the above options
var ad = Inneractive.createAd(adOptions);
ad
	.placement("bottom", "center")
	.addTo(document.getElementById("ad-frame"));
