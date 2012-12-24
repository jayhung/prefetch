# jquery.prefetch.js 
### Prefetch logic for priming browser cache for subsequent page components (is "priming" even a word?)

 - Copyright (c) 2012 Jay Hung
 - http://webmocha.com | http://jayhung.com

Licensed under the MIT license:
http://www.opensource.org/licenses/MIT

Prefetched components can be any filetype (js, css, png, jpg, etc) and will only be downloaded
but _not_ parsed. As long as the correct http expires/cache-control headers are in place, 
subsequent pages that use these components will be able to load these from the browser cache.

This plugin also waits for a specified delay period _after_ the window onload event fires before
prefetching components. If you call this code after the onload event fires, or if you use
control.js or similar libraries, you will need to modify this.

This plugin detects duplicates and only loads them once (uses delay from _first_ prefetch attempt).


## Usage

On domready, you can use it like the following:

<pre>

// load after default delay AFTER onload event fires
$(window).prefetch('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/jquery-ui.min.js');

// load after 1s delay AFTER onload event fires
$(window).prefetch('http://placehold.it/400x200', 1000);

</pre>


## Demo

To see the prefetch plugin in action:

 - Open your browser's developer tools
 - Clear your browser cache
 - Select the network tab to verify prefetched components
 - Load/refresh this [DEMO PAGE](http://jayhung.github.com/prefetch/)
 - See the timing of when each file loads in the waterfall timeline

Feel free to try it out yourself with varying delays and multiple files, including duplicates.

