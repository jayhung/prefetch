/**
 * Prefetch logic for priming browser cache for subsequent page components (is "priming" even a word?)
 * https://gist.github.com/4357524
 *
 * Copyright (c) 2012 Jay Hung
 * http://webmocha.com | http://jayhung.com
 * 
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * 
 * Prefetched components can be any filetype (js, css, png, jpg, etc) and will only be downloaded
 * but _not_ parsed. As long as the correct http expires/cache-control headers are in place, 
 * subsequent pages that use these components will be able to load these from the browser cache.
 *
 * This plugin also waits for a specified delay period _after_ the window onload event fires before
 * prefetching components. If you call this code after the onload event fires, or if you use
 * control.js or similar libraries, you will need to modify this.
 *
 * This plugin detects duplicates and only loads them once (uses delay from _first_ prefetch attempt).
 * 
 * USAGE - On domready, you can use it like the following:

	// load after default delay AFTER onload event fires
	$(window).prefetch('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/jquery-ui.min.js');

	// load after 1s delay AFTER onload event fires
	$(window).prefetch('http://placehold.it/400x200', 1000);

 */
(function($){

	// plugin method
	$.fn.prefetch = function(url, delay) {
		var _components = $.fn.prefetch.components;
		delay = delay || 500;	// in milliseconds

		// loop thru existing components array and add if not a duplicate
		for(var i=0;i<_components.length;i++){
			if (url == _components[i].url) return $;
		}

		// add component for prefetching
		_components.push({ 'url':url, 'delay':delay, isLoaded:false });

		return $;
	};

	// array for storing components to prefetch
	$.fn.prefetch.components = [];

	// trigger downloading via onload event
	$(window).load(function(){

		if ($.fn.prefetch.components && $.isArray($.fn.prefetch.components)) {

			var _components = $.fn.prefetch.components,
				_isIE 		= (-1 != navigator.userAgent.indexOf("MSIE")),
				_isOpera 	= (-1 != navigator.userAgent.indexOf("Opera"));
			
			$(_components).each(function(){
				var c = this,
					t = null;			// use closure

				t = setTimeout(function(){
					if (_isIE || _isOpera) {
						var i = new Image();
						i.onload = i.onerror = function(){ c.isLoaded = true };
						i.src = c.url; 
					} else {
						var o = document.createElement("object");
						o.onload = o.onerror = function(){ c.isLoaded = true };
						o.data = c.url; o.width = 0; o.height = 0; 
						document.body.appendChild(o);
					}
					clearTimeout(t);	// release handle
				}, c.delay);
			});

		}

	});

})( jQuery );