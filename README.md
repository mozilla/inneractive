# Inneractive Library

This library used the Inneractive ad network to create an ad and place it in a webpage.

## Usage

See the docs on the [Dev Wiki](https://inneractive.jira.com/wiki/display/DevWiki/JavaScript+Ad+Tag) for the available options on your ad.

### `Inneractive.createAd(options)`

This method will create a new Ad instance based on the provided options. Options are specified in an object and use the keys defined in the [JavaScript Ad Tag](https://inneractive.jira.com/wiki/display/DevWiki/JavaScript+Ad+Tag) example.

~~~javascript
var ad = Inneractive.createAd({
	APP_ID: "myAppId",
	PORTAL: 642
});
~~~

### `.setSize(width, height)`
Set the size of the ad container.

~~~javascript
ad.setSize(300, 50);
~~~ 

### `.placement(vertical, horizontal)`
Place the ad at a fixed position on the webpage. Possible options for vertical are: `top`, `bottom`. Possible options for horizontal are `left`, `right` and `center`.

You may mix these two options are set one to null to leave as default.

~~~javascript
ad.placement("bottom", "center");
~~~

### `.addTo(node)`
Append the ad to a DOM node in the tree. This is required for your ad to be visible. A simple use is to set the body of the webpage as the parent.

~~~javascript
ad.addTo(document.body);
~~~
