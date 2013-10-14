## Inneractive Library

This library used the Inneractive platform to create an ad and place it in a webpage.

### Usage

#### Inneractive.createAd(options)

This method will create a new Ad instance based on the provided options. 

~~~javascript
var ad = Inneractive.createAd({
	APP_ID: "myAppId",
	TYPE: "Banner" | "Rectangle" | "Interstitial",
	REFRESH_RATE: 30
});
~~~

#### Options

- `APP_ID`: Application ID generated through the inneractive console.
- `REFRESH_RATE`: Time in seconds between rotating the ads. Should not be smaller than 15.
- `TYPE`: The type of the ad. Can be Banner, Rectangle, or Interstitial. 

#### .placement(vertical, horizontal)
Place the ad at a fixed position on the webpage. Possible options for vertical are: `top`, `bottom` and `center`. Possible options for horizontal are `left`, `right` and `center`.

You may mix these two options or set one to `null` to leave as default.

~~~javascript
ad.placement("bottom", "center");
~~~

#### .addTo(node)
Append the ad to a DOM node in the tree. This is required for your ad to be visible. A simple use is to set the body of the webpage as the parent.

~~~javascript
ad.addTo(document.body);
~~~

#### .show()
Show the ad container.

#### .hide()
Hide the ad container.

#### .remove()
Removes the ad container from the parent.

**Note: It is recommended to create the ad at the very start of the page and show or hide it when needed.**
