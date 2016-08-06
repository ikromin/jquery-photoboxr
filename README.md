# jQuery Photoboxr

A jQuery UI compatible plugin that frames photos into a standard constant ratio box with optional panoramic controls and FancyBox integration.

This plugin started off as part of the [Travel &micro;Blog](https://travelblog.ws) photo viewing implementation and has since been split off as a reusable module.

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
wrapSizingClass        // wrapping DIV CSS sizing class
loadingOverlay         // image loading overlay text
```

The *wrapSizingClass* defines the width of the DIV that will wrap your photo, there are three classes provided and stretch to 100%, 50% and 33%, these are: *ui-pbxr-full*, *ui-pbxr-half* and *ui-pbxr-third* respectively.

# Example

![Photoboxr Example](https://github.com/ikromin/jquery-photoboxr/raw/master/screenshot.png "Photoboxr Example")

Photoboxr requires an Image element that hasn't had the image loaded yet.

See the provided *example.html* file for a full implementation.

HTML:

```
<div id="photoboxr-container" style="width: 100%;">
	<img id="photoboxr-example">
</div>
```

JavaScript:

```
$('#photoboxr-example').photoboxr({
	src: 'fog_panorama.jpg',
	wrapSizingClass: 'ui-pbxr-half'
})
.photoboxr('wrapper')
.appendTo(container);
```

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