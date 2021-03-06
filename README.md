# jQuery Photoboxr 0.2

A jQuery UI compatible plugin that frames photos into a standard constant ratio box with optional panoramic controls and FancyBox integration.

This plugin started off as part of the [Travel &micro;Blog](https://travelmicroblog.com) photo viewing implementation and has since been split off as a reusable module.

The intent behind this plugin is to allow any sized photo with any aspect ratio to be displayed in a constant ratio (4:3) box. Having a predictable framing box allows for easier layouts of photos especially on 'wall' style inifnite scroll pages.

## Features

  * 4:3 Constant Ratio framing box
  * Panoramic scroll controls (horizonal and vertical)
  * Integration with [FancyBox](http://fancyapps.com)

# Requirements

 * jQuery
 * jQuery UI
 * FancyBox (optional)

# Installation

Add the CSS and JS files to your web page (after jQuery and jQuery UI CSS and JS files).

```
<link rel="stylesheet" href="src/css/jquery-ui-photoboxr.css">
<script src="src/js/jquery-ui-photoboxr.js"></script>
```
# Options
These options can be passed to the .photoboxr() call to initialise the plugin.

```
src                    // image source URL (required)
href                   // full scale image used for Fancybox integration
rel                    // Fancybox galley rel tag
enabled                // whether scroll controls are enabled
disabledOpacity        // scroll control overlay disabled opacity
enabledOpacity         // scroll control overlay enabled opacity
threshold              // % threshold that src image must be larger by to enable
wrapSizingClass        // wrapping DIV CSS sizing class
loadingOverlay         // image loading overlay text
```

**src** -  [default = *undefined*] Must be provided in order for the plugin to activate.

**href** - [default = *undefined*] If provided will enable Fancybox integration, should point to the unscaled, full resolution version of the photo, this is shown in the Fancybox pop up.

**rel** - [default = *'gallery'*] The *rel* attribute value used with Fancybox integration, for grouping photos into the same gallery.

**enabled** - [default = *true*] Whether the scroll controls are enabled after initialisation. Useful to disable if on a mobile and using *jQuery UI Touch Punch*.

**disabledOpacity** - [default = *0.5*] Opacity of the scroll control overlay when disabled.

**enabledOpacity** - [default = *0.9*] Opacity of the scroll control overlay when enabled.

**threshold** - [default = *1.05*] Image size threshold cut off to initialise the plugin. Image size must exceed this % value in either width/height otherwise the plugin will not initialise.  Specified as a decimal with default value meaning 105% i.e. source image is 5% larger than the viewport. Useful to not show scroll controls when source images are only slightly larger than the viewport.

**wrapSizingClass** - [default = *'ui-pbxr-full'*] CSS class used for the DIV that will wrap the <img> element. There are three classes provided and stretch to 100%, 50% and 33%, these are: *ui-pbxr-full*, *ui-pbxr-half* and *ui-pbxr-third* respectively.

**loadingOverlay** - [default = *'Loading image...'*] Overlay text displayed while the image is loading.

# Methods
These methods can be called to control the plugin after it has been initialised.

Calling a method is done using standard jQuery UI way i.e. *.photoboxr('wrapper')* will call the *wrapper()* method.

```
// enables/disables scroll controls or returns whether scroll controls are enabled
scroll
	input: 'on'|'off' will enable/disable scroll controls
	no input: returns the state of the scroll controls
```

```
// returns the wrapper DIV around the <img> element
wrapper
	no input: returns the wrapping DIV created around the <img> element
```

# Example

![Photoboxr Example](https://github.com/ikromin/jquery-photoboxr/raw/0.2/screenshot.png "Photoboxr Example")

Photoboxr requires an Image element that hasn't had the image loaded yet.

See the provided [example.html](https://github.com/ikromin/jquery-photoboxr/raw/0.2/example.html) file for a full implementation.

HTML:

```
<div id="photoboxr-container" style="width: 100%;">
</div>
```

JavaScript:

```
var container = $('#photoboxr-container');

$(new Image()).photoboxr({
	src: 'fog_panorama.jpg',
	wrapSizingClass: 'ui-pbxr-half'
})
.photoboxr('wrapper')
.appendTo(container);
```
# Building a Minified Version
To build the minified version run the following Maven command in the directory where the *pom.xml* file is found:

```
mvn clean package
```

The minified version will then be available in the *target* directory.

# Change Log

**0.1**

* Initial release

**0.2**

* Additional examples added showing multi size instances and FancyBox integration
* Updated for a more slick look and feel
* Switched offset calculation to pixels instead of using percentages

# License

```
Copyright 2016 Igor Kromin

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```