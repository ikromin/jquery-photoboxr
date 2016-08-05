/*
# Copyright 2016 Igor Kromin
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
(function($) { $.widget('igorkromin.photoboxr', $.ui.mouse, {

	_dStart: undefined,    // drag start coordinate
	_dScalar: undefined,   // Drag delta scalar
	_lastAdj: 0,           // last % adjustment
	_curAdj: 0,            // current % adjustment
	_maxAdj: undefined,    // max % adjustment
	_direction: undefined, // scroll direction 0 = horizontal, 1 = vertical
	_overlay: undefined,   // overlay DIV for enable/disable toggle
	_wrapper: undefined,   // wrapping DIV around the image

	options: {
		src: undefined,                    // image source URL
		href: undefined,                   // full scale image used for Fancybox integration
		rel: 'gallery',                    // Fancybox 
		enabled: true,                     // whether scroll controls are enabled
		disabledOpacity: 0.5,              // scroll control overlay disabled opacity
		enabledOpacity: 0.9,               // scroll control overlay enabled opacity
		wrapSizingClass: 'ui-pbxr-full',  // wrapping DIV CSS sizing class
		loadingOverlay: 'Loading image...' // image loading overlay text
	},
	
	// enables/disables photo scroll or fetches scroll enabled status if no value passed
	scroll: function(onoff) {
		if (onoff == 'on') {
			this._overlay.css('opacity', this.options.enabledOpacity);
			this.options.enabled = true;
			this._mouseInit();
		}
		else if (onoff = 'off') {
			this._overlay.css('opacity', this.options.disabledOpacity);
			this.options.enabled = false;
			this._mouseDestroy();
		}
		else if (onoff == undefined) {
			return this.options.enabled;
		}
	},

	// returns the wrapping DIV created around the image
	wrapper: function() {
		return this._wrapper;
	},

	_create: function() {
		var t = this;
		var e = t.element;
		var o = t.options;

		// only initialise for image elements
		if (e.is('img')) {
			e.wrap('<div class="ui-pbxr"><div class="ui-pbxr-clip"></div></div>').addClass('ui-pbxr-img');
			t._wrapper = e.parents('.ui-pbxr').addClass(t.options.wrapSizingClass);

			// add loading overlay
			if (o.loadingOverlay != undefined) {
				t._wrapper.append('<div class="ui-pbxr-loading">' + o.loadingOverlay + '</div>');
			}
			
			// add Fancybox overlay
			if (o.href != undefined) {
				t._wrapper.append('<a class="fancybox"><div class="ui-pbxr-ind ui-pbxr-expand"></div></a>')
					.find('.fancybox')
					.attr({href: o.href, rel: o.rel});
			}
			
			e.attr('src', o.src).on('load', function(e) { t._imgLoaded(this); });
		}
	},

	_imgLoaded: function(img) {
		var p = this.element;
		var pp = p.parents('.ui-pbxr');

		// determine whether image has vertical/horizontal bias
		var ratio = img.height/img.width;
		var scalar = 1; // used since Chrome rounds img dimensions up
		if (ratio < 0.75) { // 4:3 ratio
			scalar = pp.height() / img.naturalHeight;
			p.addClass('ui-pbxr-landscape');
		}
		else {
			scalar = pp.width() / img.naturalWidth;
			p.addClass('ui-pbxr-portrait');
		}

		// remove loading placeholder
		pp.children('.ui-pbxr-loading').remove();

		if (Math.floor(img.naturalWidth * scalar) > pp.width()) {
			this._direction = 0;
			this._overlay = $('<div class="ui-pbxr-ind ui-pbxr-horz"></div>');
		}

		if (Math.floor(img.naturalHeight * scalar) > pp.height()) {
			this._direction = 1;
			this._overlay = $('<div class="ui-pbxr-ind ui-pbxr-vert"></div>');
		}

		if (this._direction != undefined) {
			var t = this;
			this._overlay.appendTo(pp).on('click', function(e) { t._toggle(e); });

			if (this.options.enabled) {
				this.scroll('on');
			}
		}
	},

	_toggle: function(e) {
		e.preventDefault();
		this.scroll((this.options.enabled) ? 'off' : 'on');
	},

	_mouseStart: function(e) {
		if (this._direction == undefined) { return; }

		var p = this.element;
		var pp = p.parents('.ui-pbxr');

		if (this._direction == 0) {
			this._dStart = e.screenX;
			this._dScalar = pp.width() / 100;
			this._maxAdj = ((p.width() - pp.width()) / 2) / pp.width() * 100;
		}
		else {
			this._dStart = e.screenY;
			this._dScalar = pp.height() / 100;
			this._maxAdj = ((p.height() - pp.height()) / 2) / pp.height() * 100;
		}
	},

	_mouseDrag: function(e) {
		if (this._direction == undefined) { return; }

		if (this._direction == 0) {
			var dx = (e.screenX - this._dStart) / this._dScalar;
			this._curAdj = this._constrain(this._lastAdj + dx, this._maxAdj);
			this.element.css('left', Math.round(50 + this._curAdj) + '%');
		}
		else {
			var dy = (e.screenY - this._dStart) / this._dScalar;
			this._curAdj = this._constrain(this._lastAdj + dy, this._maxAdj);
			this.element.css('top', Math.round(50 + this._curAdj) + '%');
		}
	},

	_mouseStop: function(e) {
		// Remember last adjustment so new drags won't 'pop' the image
		this._lastAdj = this._curAdj;
	},

	/**
	 * Constrains the adjustment percentage to the image dimensions.
	 */
	_constrain: function (val, maxVal) {
		if (val > 0 && val > maxVal) {
			return maxVal;
		}
		if (val < 0 && val < -maxVal) {
			return -maxVal;
		}
		return val;
	},

	_destroy: function() {
		this.element.off('load');
		this._mouseDestroy();

		if (this._overlay != undefined) {
			this._overlay.off('click');
			this._overlay = undefined;
		}
	}
	
}); })(jQuery);