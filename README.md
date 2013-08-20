## Inneractive Library

This library used the Inneractive ad network to create an ad and place it in a webpage.

### Usage

#### Inneractive.createAd(options)

This method will create a new Ad instance based on the provided options. 

~~~javascript
var ad = Inneractive.createAd({
	APP_ID: "myAppId"
});
~~~

#### Options

- `APP_ID`: The App ID, when you create an Inneractive account.
- `REFRESH_RATE`: Time in seconds between rotating the ads.
- `FS`: If `true`, make the ad fullscreen.
- `IS_INTERSTITIAL_AD`: If `true`, will be a full screen interstitial ad with a Close button.
- `CLOSE_STYLE`: CSS text for custom styling of the close button.

#### .setSize(width, height)
Set the size of the ad container.

~~~javascript
ad.setSize(300, 50);
~~~ 

#### .placement(vertical, horizontal)
Place the ad at a fixed position on the webpage. Possible options for vertical are: `top`, `bottom`. Possible options for horizontal are `left`, `right` and `center`.

You may mix these two options or set one to `null` to leave as default.

~~~javascript
ad.placement("bottom", "center");
~~~

#### .addTo(node)
Append the ad to a DOM node in the tree. This is required for your ad to be visible. A simple use is to set the body of the webpage as the parent.

~~~javascript
ad.addTo(document.body);
~~~

#### Fullscreen
To create a fullscreen ad, include the following options:

~~~javascript
var ad = Inneractive.createAd({
    IS_INTERSTITIAL_AD: true,
    FS: true
});
~~~
