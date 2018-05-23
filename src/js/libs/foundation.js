// jQuery
var $ = require('jquery');
global.jQuery = $;

// if you want all features of foundation
require('foundation-sites/js/foundation.core.js');
require('foundation-sites/js/foundation.offcanvas.js');
require('foundation-sites/js/foundation.util.keyboard.js');
require('foundation-sites/js/foundation.util.mediaQuery.js');
require('foundation-sites/js/foundation.util.triggers.js');

// if you want only some features
// require('./node_modules/what-input/what-input');
// require('./node_modules/foundation-sites/js/foundation.core');
// require('./node_modules/foundation-sites/js/....');

export default Foundation;
