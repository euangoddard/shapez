
define('animation',['exports'], function (exports) {
    

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    var last_time = 0;
    var vendors = ['webkit', 'moz', 'o', 'ms'];
    var request_animation_frame;
    var cancal_animation_frame;

    for (var x = 0; x < vendors.length && !request_animation_frame; ++x) {
        request_animation_frame = window[vendors[x] + 'request_animation_frame'];
        cancal_animation_frame = window[vendors[x] + 'cancal_animation_frame'] || window[vendors[x] + 'Cancelrequest_animation_frame'];
    }

    if (!request_animation_frame) {
        request_animation_frame = function (callback, element) {
            var current_time = new Date().getTime();
            var time_to_call = Math.max(0, 16 - (current_time - last_time));
            var id = window.setTimeout(function () {
                callback(current_time + time_to_call);
            }, time_to_call);
            last_time = current_time + time_to_call;
            return id;
        };
    }

    if (!cancal_animation_frame) {
        cancal_animation_frame = function (id) {
            clearTimeout(id);
        };
    }

    var start_animation_loop = function start_animation_loop(callback) {
        var loop = (function (_loop) {
            function loop(_x) {
                return _loop.apply(this, arguments);
            }

            loop.toString = function () {
                return _loop.toString();
            };

            return loop;
        })(function (timestamp) {
            request_animation_frame(loop);
            callback(timestamp);
        });
        loop();
    };

    var loop = start_animation_loop;
    exports.loop = loop;
});
define('hsla',['exports', 'module'], function (exports, module) {
    

    module.exports = convert_hsla_to_rgba_string;
    var convert_to_percent = function convert_to_percent(amount, limit) {
        return amount / limit;
    };

    var convert_hsla_to_rgba = function convert_hsla_to_rgba(h, s, l, a) {
        var rgba;
        h = convert_to_percent(parseInt(h, 10) % 360, 360);
        s = convert_to_percent(parseInt(s, 10) % 101, 100);
        l = convert_to_percent(parseInt(l, 10) % 101, 100);
        a = parseFloat(a);

        if (s === 0) {
            var value = parseInt(Math.round(255 * l));
            rgba = {
                r: value,
                g: value,
                b: value,
                a: a
            };
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            rgba = {
                r: parseInt((convert_hue_to_rgb(p, q, h + 1 / 3) * 256).toFixed(0), 10),
                g: parseInt((convert_hue_to_rgb(p, q, h) * 256).toFixed(0), 10),
                b: parseInt((convert_hue_to_rgb(p, q, h - 1 / 3) * 256).toFixed(0), 10),
                a: a
            };
        }
        return rgba;
    };

    var convert_to_percent = function convert_to_percent(amount, limit) {
        return amount / limit;
    };

    var convert_hue_to_rgb = function convert_hue_to_rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    };

    function convert_hsla_to_rgba_string(h, s, l, a) {
        var rgba = convert_hsla_to_rgba(h, s, l, a);
        var rgba_string = 'rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', ' + rgba.a + ')';
        return rgba_string;
    }

    ;
});
define('shapes',['exports'], function (exports) {
    

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    var RADIUS = {
        MIN: 10,
        MAX: 100
    };

    var PolyShape = function PolyShape(ctx, colour) {
        this.ctx = ctx;
        this.colour = colour;
        this.x = null;
        this.y = null;

        this.radius = RADIUS.MIN;
        this.angle = 0;
    };;

    PolyShape.prototype = {
        move: function move(x, y) {
            if (this.x && this.y) {
                var delta_x = this.x - x;
                var delta_y = this.y - y;
                var delta_r = Math.sqrt(delta_x * delta_x + delta_y * delta_y);

                this.radius = Math.min(Math.max(delta_r, RADIUS.MIN), RADIUS.MAX);
                this.angle = Math.atan(delta_x / delta_y);
            }

            this.x = x;
            this.y = y;
        },

        draw: function draw() {
            throw new Error('not implemented');
        }
    };

    var Polygon = function Polygon(ctx, colour, vertices) {
        PolyShape.call(this, ctx, colour);
        this.vertices = vertices;
    };
    Polygon.prototype = Object.create(PolyShape.prototype);
    Polygon.prototype.draw = function () {
        this.ctx.beginPath();
        this._draw_polygon_points();
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();

        this.ctx.beginPath();
        set_ctx_stoke_styles(this.ctx);
        this._draw_polygon_points();
        this.ctx.closePath();
        this.ctx.stroke();
    };
    Polygon.prototype._draw_polygon_points = function () {
        var x, y, angle;
        for (var i = 0; i < this.vertices; i += 1) {
            angle = this.angle + 2 * Math.PI * i / this.vertices;
            x = this.x + this.radius * Math.cos(angle);
            y = this.y + this.radius * Math.sin(angle);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
    };

    var Polystar = function Polystar(ctx, colour, vertices) {
        PolyShape.call(this, ctx, colour);
        this.vertices = vertices * 2;
    };
    Polystar.prototype = Object.create(PolyShape.prototype);
    Polystar.prototype.draw = function () {
        this.ctx.beginPath();
        this._draw_polystar_points();
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();

        this.ctx.beginPath();
        set_ctx_stoke_styles(this.ctx);
        this._draw_polystar_points();
        this.ctx.closePath();
        this.ctx.stroke();
    };
    Polystar.prototype._draw_polystar_points = function () {
        var x, y, radius, angle;
        for (var i = 0; i < this.vertices; i += 1) {
            angle = this.angle + 2 * Math.PI * i / this.vertices;
            if (i % 2) {

                radius = 0.6 * this.radius;
            } else {
                radius = this.radius;
            }

            x = this.x + radius * Math.cos(angle);
            y = this.y + radius * Math.sin(angle);

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
    };

    var set_ctx_stoke_styles = function set_ctx_stoke_styles(ctx) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
    };

    var get_random_shape = function get_random_shape(ctx, colour) {
        var contructor, vertices;
        var style_choice = Math.random();
        if (style_choice < 0.5) {
            contructor = Polygon;
            vertices = 3 + Math.round(Math.random() * 6);
        } else {
            contructor = Polystar;
            vertices = 4 + Math.round(Math.random() * 7);
        }
        return new contructor(ctx, colour, vertices);
    };

    var random = get_random_shape;
    exports.random = random;
});
define('utils',["exports"], function (exports) {
    

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var iter = function iter(iterable, callback) {
        return Array.prototype.forEach.call(iterable, callback);
    };
    exports.iter = iter;
});
/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('lib/domReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

define('dialogs',['exports', 'utils', 'lib/domReady'], function (exports, _utils, _libDomReady) {
	

	var DIALOGS = ['welcome', 'menu'];

	var DIALOG_OPEN_CSS_CLASS = 'dialog-open';

	var show_dialog = function show_dialog(id) {
		var body_classlist = get_body_classlist();
		if (body_classlist.contains(DIALOG_OPEN_CSS_CLASS)) {
			return false;
		}
		var classes = get_css_classes_for_dialog_id(id);
		body_classlist.add.apply(body_classlist, classes);
	};

	var hide_dialog = function hide_dialog(id) {
		var body_classlist = get_body_classlist();
		var classes = get_css_classes_for_dialog_id(id);
		body_classlist.remove.apply(body_classlist, classes);
	};

	var get_css_classes_for_dialog_id = function get_css_classes_for_dialog_id(id) {
		var classes = [DIALOG_OPEN_CSS_CLASS, id + '-' + DIALOG_OPEN_CSS_CLASS];
		return classes;
	};

	var get_body_classlist = function get_body_classlist() {
		return document.body.classList;
	};

	var check_close_dialog = function check_close_dialog(event) {
		if (event.target.tagName === 'BUTTON') {
			var action = event.target.getAttribute('data-action');
			if (action === 'close') {
				hide_dialog(this.id);
			}
		}
	};

	_libDomReady(function () {
		_utils.iter(document.querySelectorAll('.dialog'), function (dialog) {
			dialog.addEventListener('click', check_close_dialog, false);
		});
	});

	DIALOGS.forEach(function (dialog_id) {
		exports['show_' + dialog_id + '_dialog'] = function () {
			show_dialog(dialog_id);
		};
		exports['hide_' + dialog_id + '_dialog'] = function () {
			hide_dialog(dialog_id);
		};
	});
});
/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						window.open(object_url, "_blank");
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				// FF for Android has a nasty garbage collection mechanism
				// that turns all objects that are not pure javascript into 'deadObject'
				// this means `doc` and `save_link` are unusable and need to be recreated
				// `view` is usable though:
				doc = view.document;
				save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
				save_link.href = object_url;
				save_link.download = name;
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, view, 0, 0, 0, 0, 0
					, false, false, false, false, 0, null
				);
				save_link.dispatchEvent(event);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	saveAs.unload = function() {
		process_deletion_queue();
		view.removeEventListener("unload", process_deletion_queue, false);
	};
	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define('lib/FileSaver',[], function() {
    return saveAs;
  });
}
;
/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2013-12-27
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

(function(view) {

var
	  Uint8Array = view.Uint8Array
	, HTMLCanvasElement = view.HTMLCanvasElement
	, canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype
	, is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
	, to_data_url = "toDataURL"
	, base64_ranks
	, decode_base64 = function(base64) {
		var
			  len = base64.length
			, buffer = new Uint8Array(len / 4 * 3 | 0)
			, i = 0
			, outptr = 0
			, last = [0, 0]
			, state = 0
			, save = 0
			, rank
			, code
			, undef
		;
		while (len--) {
			code = base64.charCodeAt(i++);
			rank = base64_ranks[code-43];
			if (rank !== 255 && rank !== undef) {
				last[1] = last[0];
				last[0] = code;
				save = (save << 6) | rank;
				state++;
				if (state === 4) {
					buffer[outptr++] = save >>> 16;
					if (last[1] !== 61 /* padding character */) {
						buffer[outptr++] = save >>> 8;
					}
					if (last[0] !== 61 /* padding character */) {
						buffer[outptr++] = save;
					}
					state = 0;
				}
			}
		}
		// 2/3 chance there's going to be some null bytes at the end, but that
		// doesn't really matter with most image formats.
		// If it somehow matters for you, truncate the buffer up outptr.
		return buffer;
	}
;
if (Uint8Array) {
	base64_ranks = new Uint8Array([
		  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
		, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
		, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
		, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
		, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
	]);
}
if (HTMLCanvasElement && !canvas_proto.toBlob) {
	canvas_proto.toBlob = function(callback, type /*, ...args*/) {
		  if (!type) {
			type = "image/png";
		} if (this.mozGetAsFile) {
			callback(this.mozGetAsFile("canvas", type));
			return;
		}
		var
			  args = Array.prototype.slice.call(arguments, 1)
			, dataURI = this[to_data_url].apply(this, args)
			, header_end = dataURI.indexOf(",")
			, data = dataURI.substring(header_end + 1)
			, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
			, blob
		;
		if (Blob.fake) {
			// no reason to decode a data: URI that's just going to become a data URI again
			blob = new Blob
			if (is_base64) {
				blob.encoding = "base64";
			} else {
				blob.encoding = "URI";
			}
			blob.data = data;
			blob.size = data.length;
		} else if (Uint8Array) {
			if (is_base64) {
				blob = new Blob([decode_base64(data)], {type: type});
			} else {
				blob = new Blob([decodeURIComponent(data)], {type: type});
			}
		}
		callback(blob);
	};

	if (canvas_proto.toDataURLHD) {
		canvas_proto.toBlobHD = function() {
			to_data_url = "toDataURLHD";
			var blob = this.toBlob();
			to_data_url = "toDataURL";
			return blob;
		}
	} else {
		canvas_proto.toBlobHD = canvas_proto.toBlob;
	}
}
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));

define("lib/canvas-toBlob", function(){});

/*
 *
 * Find more about this plugin by visiting
 * http://alxgbsn.co.uk/
 *
 * Copyright (c) 2010-2012 Alex Gibson
 * Released under MIT license
 *
 */

define('lib/shake',[], function () {

    

    var Shake = function () {

        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.threshold = 20;

        this.lastTime = new Date();

        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else { 
          return false;
        }
    };

    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) { 
            window.addEventListener('devicemotion', this, false);
        }
    };

    Shake.prototype.stop = function () {

        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };


    Shake.prototype.devicemotion = function (e) {

        var current = e.accelerationIncludingGravity,
            currentTime,
            timeDifference,
            deltaX = 0,
            deltaY = 0,
            deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.threshold) && (deltaY > this.threshold)) || ((deltaX > this.threshold) && (deltaZ > this.threshold)) || ((deltaY > this.threshold) && (deltaZ > this.threshold))) {
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > 1000) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    Shake.prototype.handleEvent = function (e) {

        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    var shake = new Shake();
    shake && shake.start();

    return {};

});
define('main',['exports', 'animation', 'hsla', 'shapes', 'dialogs', 'utils', 'lib/FileSaver', 'lib/canvas-toBlob', 'lib/shake', 'lib/domReady'], function (exports, _animation, _hsla, _shapes, _dialogs, _utils, _libFileSaver, _libCanvasToBlob, _libShake, _libDomReady) {
    

    _libDomReady(function () {
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');

        var size_canvas = function size_canvas() {
            var window_width = window.innerWidth;
            var window_height = window.innerHeight;
            canvas.setAttribute('width', window_width);
            canvas.setAttribute('height', window_height);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, window_width, window_height);
        };
        window.addEventListener('resize', size_canvas, false);
        size_canvas();

        var shapes_by_id = {};

        var handle_touch_start = function handle_touch_start(event) {
            event.preventDefault();
            var touches = event.changedTouches;

            _utils.iter(touches, function (touch) {
                var current_time = new Date().getTime();
                var shape = _shapes.random(ctx, _hsla(current_time % 360, 100, 50, 1));
                shapes_by_id[touch.identifier] = shape;
                shape.move(touch.pageX, touch.pageY);
                shape.draw();
            });
        };

        var handle_touch_move = function handle_touch_move(event) {
            event.preventDefault();
            var touches = event.changedTouches;
            _utils.iter(touches, function (touch) {
                var shape = shapes_by_id[touch.identifier];
                shape.move(touch.pageX, touch.pageY);
            });
        };

        var handle_touch_end = function handle_touch_end(event) {
            event.preventDefault();
            var touches = event.changedTouches;
            _utils.iter(touches, function (touch) {
                delete shapes_by_id[touch.identifier];
            });
        };

        canvas.addEventListener('touchstart', handle_touch_start, false);
        canvas.addEventListener('touchend', handle_touch_end, false);
        canvas.addEventListener('touchcancel', handle_touch_end, false);
        canvas.addEventListener('touchleave', handle_touch_end, false);
        canvas.addEventListener('touchmove', handle_touch_move, false);

        var save_canvas = function save_canvas() {
            canvas.toBlob(function (blob) {
                _libFileSaver(blob, 'Shapez.png');
            });
        };

        window.addEventListener('deviceorientation', function (event) {
            if (event.beta > 170 || event.beta < -170) {
                _dialogs.show_menu_dialog();
            }
        }, false);

        var menu_buttons = document.querySelectorAll('#menu button');
        _utils.iter(menu_buttons, function (button) {
            var data_action = button.getAttribute('data-action');
            if (data_action === 'clear') {
                button.addEventListener('click', function () {
                    size_canvas();
                    _dialogs.hide_menu_dialog();
                }, false);
            } else if (data_action === 'save') {
                button.addEventListener('click', save_canvas, false);
            }
        });

        window.addEventListener('shake', _dialogs.show_menu_dialog, false);
        window.addEventListener('keyup', _dialogs.show_menu_dialog, false);
        _dialogs.show_welcome_dialog();

        _animation.loop(function (timestamp) {
            for (var key in shapes_by_id) {
                if (shapes_by_id.hasOwnProperty(key)) {
                    var shape = shapes_by_id[key];
                    shape.draw();
                }
            }
        });
    });
});