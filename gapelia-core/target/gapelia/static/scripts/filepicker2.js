(function () {
	var a = (function () {
		var a = {};
		var b = function (b, c, d) {
			var e = b.split(".");
			for (var f = 0; f < e.length - 1; f++) {
				if (!d[e[f]]) d[e[f]] = {};
				d = d[e[f]];
			}
			if (typeof c === "function")
				if (c.isClass) d[e[f]] = c;
				else d[e[f]] = function () {
					return c.apply(a, arguments);
				};
				else d[e[f]] = c;
		};
		var c = function (c, d, e) {
			b(c, d, a);
			if (e) b(c, d, window.filepicker);
		};
		var d = function (b, d, e) {
			if (typeof b === "function") {
				e = d;
				d = b;
				b = '';
			}
			if (b) b += ".";
			var f = d.call(a);
			for (var g in f) c(b + g, f[g], e);
		};
		var e = function (b) {
			b.apply(a, arguments);
		};
		return {
			extend: d,
			internal: e
		};
	})();
	if (!window.filepicker) window.filepicker = a;
	else
		for (attr in a) window.filepicker[attr] = a[attr];
})();


filepicker.extend("ajax", function () {
	var a = this;
	var b = function (a, b) {
		b.method = 'GET';
		f(a, b);
	};
	var c = function (b, c) {
		c.method = 'POST';
		b += (b.indexOf('?') >= 0 ? '&' : '?') + '_cacheBust=' + a.util.getId();
		f(b, c);
	};
	var d = function (b, c) {
		var e = [];
		for (var f in b) {
			var g = b[f];
			if (c) f = c + '[' + f + ']';
			var h;
			switch (a.util.typeOf(g)) {
			case 'object':
				h = d(g, f);
				break;
			case 'array':
				var i = {};
				for (var j = 0; j < g.length; j++) i[j] = g[j];
				h = d(i, f);
				break;
			default:
				h = f + '=' + encodeURIComponent(g);
				break;
			}
			if (g !== null) e.push(h);
		}
		return e.join('&');
	};
	var e = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (a) {
			try {
				return new window.ActiveXObject("Msxml2.XMLHTTP");
			} catch (a) {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch (a) {
					return null;
				}
			}
		}
	};
	var f = function (b, c) {
		b = b || "";
		var f = c.method ? c.method.toUpperCase() : "POST";
		var h = c.success || function () {};
		var i = c.error || function () {};
		var j = c.async === undefined ? true : c.async;
		var k = c.data || null;
		var l = c.processData === undefined ? true : c.processData;
		var m = c.headers || {};
		var n = a.util.parseUrl(b);
		var o = window.location.protocol + '//' + window.location.host;
		var p = o !== n.origin;
		var q = false;
		if (k && l) k = d(c.data);
		var r;
		if (c.xhr) r = c.xhr;
		else {
			r = e();
			if (!r) {
				c.error("Ajax not allowed");
				return r;
			}
		} if (p && window.XDomainRequest && !("withCredentials" in r)) return g(b, c);
		if (c.progress && r.upload) r.upload.addEventListener("progress", function (a) {
			if (a.lengthComputable) c.progress(Math.round((a.loaded * 95) / a.total));
		}, false);
		var s = function () {
			if (r.readyState == 4 && !q) {
				if (c.progress) c.progress(100);
				if (r.status >= 200 && r.status < 300) {
					var b = r.responseText;
					if (c.json) try {
						b = a.json.decode(b);
					} catch (d) {
						t.call(r, "Invalid json: " + b);
						return;
					}
					h(b, r.status, r);
					q = true;
				} else {
					t.call(r, r.responseText);
					q = true;
				}
			}
		};
		r.onreadystatechange = s;
		var t = function (a) {
			if (q) return;
			if (c.progress) c.progress(100);
			q = true;
			if (this.status == 400) {
				i("bad_params", this.status, this);
				return;
			} else if (this.status == 403) {
				i("not_authorized", this.status, this);
				return;
			} else if (this.status == 404) {
				i("not_found", this.status, this);
				return;
			}
			if (p)
				if (this.readyState == 4 && this.status === 0) {
					i("CORS_not_allowed", this.status, this);
					return;
				} else {
					i("CORS_error", this.status, this);
					return;
				}
			i(a, this.status, this);
		};
		r.onerror = t;
		if (k && f == 'GET') {
			b += (b.indexOf('?') != -1 ? '&' : '?') + k;
			k = null;
		}
		r.open(f, b, j);
		if (c.json) r.setRequestHeader('Accept', 'application/json, text/javascript');
		else r.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
		var u = m['Content-Type'] || m['content-type'];
		if (k && l && (f == "POST" || f == "PUT") && u == undefined) r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		if (m)
			for (var v in m) r.setRequestHeader(v, m[v]);
		r.send(k);
		return r;
	};
	var g = function (b, c) {
		if (!window.XDomainRequest) return null;
		var e = c.method ? c.method.toUpperCase() : "POST";
		var f = c.success || function () {};
		var g = c.error || function () {};
		var h = c.data || {};
		if (window.location.protocol == "http:") b = b.replace("https:", "http:");
		else if (window.location.protocol == "https:") b = b.replace("http:", "https:");
		if (c.async) throw new a.FilepickerException("Asyncronous Cross-domain requests are not supported");
		if (e != "GET" && e != "POST") {
			h._method = e;
			e = "POST";
		}
		if (c.processData !== false) h = h ? d(h) : null;
		if (h && e == 'GET') {
			b += (b.indexOf('?') >= 0 ? '&' : '?') + h;
			h = null;
		}
		b += (b.indexOf('?') >= 0 ? '&' : '?') + '_xdr=true&_cacheBust=' + a.util.getId();
		var i = new window.XDomainRequest();
		i.onload = function () {
			var b = i.responseText;
			if (c.progress) c.progress(100);
			if (c.json) try {
				b = a.json.decode(b);
			} catch (d) {
				g("Invalid json: " + b, 200, i);
				return;
			}
			f(b, 200, i);
		};
		i.onerror = function () {
			if (c.progress) c.progress(100);
			g(i.responseText || "CORS_error", this.status || 500, this);
		};
		i.onprogress = function () {};
		i.ontimeout = function () {};
		i.timeout = 30000;
		i.open(e, b, true);
		i.send(h);
		return i;
	};
	return {
		get: b,
		post: c,
		request: f
	};
});

filepicker.extend("base64", function () {
	var a = this;
	var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var c = function (a, c) {
		c = c || c === undefined;
		var d = "";
		var f, g, h, i, j, k, l;
		var m = 0;
		if (c) a = e(a);
		while (m < a.length) {
			f = a.charCodeAt(m);
			g = a.charCodeAt(m + 1);
			h = a.charCodeAt(m + 2);
			m += 3;
			i = f >> 2;
			j = ((f & 3) << 4) | (g >> 4);
			k = ((g & 15) << 2) | (h >> 6);
			l = h & 63;
			if (isNaN(g)) k = l = 64;
			else if (isNaN(h)) l = 64;
			d = d + b.charAt(i) + b.charAt(j) + b.charAt(k) + b.charAt(l);
		}
		return d;
	};
	var d = function (a, c) {
		c = c || c === undefined;
		var d = "";
		var e, g, h;
		var i, j, k, l;
		var m = 0;
		a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (m < a.length) {
			i = b.indexOf(a.charAt(m));
			j = b.indexOf(a.charAt(m + 1));
			k = b.indexOf(a.charAt(m + 2));
			l = b.indexOf(a.charAt(m + 3));
			m += 4;
			e = (i << 2) | (j >> 4);
			g = ((j & 15) << 4) | (k >> 2);
			h = ((k & 3) << 6) | l;
			d = d + String.fromCharCode(e);
			if (k != 64) d = d + String.fromCharCode(g);
			if (l != 64) d = d + String.fromCharCode(h);
		}
		if (c) d = f(d);
		return d;
	};
	var e = function (a) {
		a = a.replace(/\r\n/g, "\n");
		var b = "";
		for (var c = 0; c < a.length; c++) {
			var d = a.charCodeAt(c);
			if (d < 128) b += String.fromCharCode(d);
			else if ((d > 127) && (d < 2048)) {
				b += String.fromCharCode((d >> 6) | 192);
				b += String.fromCharCode((d & 63) | 128);
			} else {
				b += String.fromCharCode((d >> 12) | 224);
				b += String.fromCharCode(((d >> 6) & 63) | 128);
				b += String.fromCharCode((d & 63) | 128);
			}
		}
		return b;
	};
	var f = function (a) {
		var b = "";
		var c = 0;
		var d = c1 = c2 = 0;
		while (c < a.length) {
			d = a.charCodeAt(c);
			if (d < 128) {
				b += String.fromCharCode(d);
				c++;
			} else if ((d > 191) && (d < 224)) {
				c2 = a.charCodeAt(c + 1);
				b += String.fromCharCode(((d & 31) << 6) | (c2 & 63));
				c += 2;
			} else {
				c2 = a.charCodeAt(c + 1);
				c3 = a.charCodeAt(c + 2);
				b += String.fromCharCode(((d & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				c += 3;
			}
		}
		return b;
	};
	return {
		encode: c,
		decode: d
	};
}, true);

filepicker.extend("browser", function () {
	var a = this;
	var b = function () {
		return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
	};
	var c = function () {
		return !!navigator.userAgent.match(/Android/i);
	};
	var d = function () {
		return !!navigator.userAgent.match(/MSIE 7\.0/i);
	};
	return {
		isIOS: b,
		isAndroid: c,
		isIE7: d
	};
});

filepicker.extend("comm", function () {
	var a = this;
	var b = "filepicker_comm_iframe";
	var c = function () {
		if (window.frames[b] === undefined) {
			f();
			var c;
			c = document.createElement("iframe");
			c.id = c.name = b;
			c.src = a.urls.COMM;
			c.style.display = 'none';
			document.body.appendChild(c);
		}
	};
	var d = function (b) {
		if (b.origin != a.urls.BASE) return;
		var c = a.json.parse(b.data);
		a.handlers.run(c);
	};
	var e = false;
	var f = function () {
		if (e) return;
		else e = true; if (window.addEventListener) window.addEventListener("message", d, false);
		else if (window.attachEvent) window.attachEvent("onmessage", d);
		else throw new a.FilepickerException("Unsupported browser");
	};
	var g = function () {
		if (window.removeEventListener) window.removeEventListener("message", d, false);
		else if (window.attachEvent) window.detachEvent("onmessage", d);
		else throw new a.FilepickerException("Unsupported browser"); if (!e) return;
		else e = false;
		var c = document.getElementsByName(b);
		for (var f = 0; f < c.length; f++) c[f].parentNode.removeChild(c[f]);
		try {
			delete window.frames[b];
		} catch (g) {}
	};
	return {
		openChannel: c,
		closeChannel: g
	};
});

filepicker.extend("comm_fallback", function () {
	var a = this;
	var b = "filepicker_comm_iframe";
	var c = "host_comm_iframe";
	var d = "";
	var e = 200;
	var f = function () {
		g();
	};
	var g = function () {
		if (window.frames[c] === undefined) {
			var b;
			b = document.createElement("iframe");
			b.id = b.name = c;
			d = b.src = a.urls.constructHostCommFallback();
			b.style.display = 'none';
			var e = function () {
				d = b.contentWindow.location.href;
				h();
			};
			if (b.attachEvent) b.attachEvent('onload', e);
			else b.onload = e;
			document.body.appendChild(b);
		}
	};
	var h = function () {
		if (window.frames[b] === undefined) {
			var c;
			c = document.createElement("iframe");
			c.id = c.name = b;
			c.src = a.urls.FP_COMM_FALLBACK + "?host_url=" + encodeURIComponent(d);
			c.style.display = 'none';
			document.body.appendChild(c);
		}
		m();
	};
	var i = false;
	var j = undefined;
	var k = "";
	var l = function () {
		var d = window.frames[b];
		if (!d) return;
		var e = d.frames[c];
		if (!e) return;
		var f = e.location.hash;
		if (f && f.charAt(0) == "#") f = f.substr(1);
		if (f === k) return;
		k = f;
		if (!k) return;
		var g;
		try {
			g = a.json.parse(f);
		} catch (h) {}
		if (g) a.handlers.run(g);
	};
	var m = function () {
		if (i) return;
		else i = true;
		j = window.setInterval(l, e);
	};
	var n = function () {
		window.clearInterval(j);
		if (!i) return;
		else i = false;
		var a = document.getElementsByName(b);
		for (var d = 0; d < a.length; d++) a[d].parentNode.removeChild(a[d]);
		try {
			delete window.frames[b];
		} catch (e) {}
		a = document.getElementsByName(c);
		for (d = 0; d < a.length; d++) a[d].parentNode.removeChild(a[d]);
		try {
			delete window.frames[c];
		} catch (e) {}
	};
	var o = !('postMessage' in window);
	var p = function (a) {
		if (a !== o) {
			o = !! a;
			if (o) r();
			else s();
		}
	};
	var q;
	var r = function () {
		q = a.comm;
		a.comm = {
			openChannel: f,
			closeChannel: n
		};
	};
	var s = function () {
		a.comm = q;
		q = undefined;
	};
	if (o) r();
	return {
		openChannel: f,
		closeChannel: n,
		isEnabled: o
	};
});

filepicker.extend("conversions", function () {
	var a = this;
	var b = {
		width: 'number',
		height: 'number',
		fit: 'string',
		format: 'string',
		watermark: 'string',
		watermark_size: 'number',
		watermark_position: 'string',
		align: 'string',
		crop: 'string or array',
		quality: 'number',
		text: 'string',
		text_font: 'string',
		text_size: 'number',
		text_color: 'string',
		text_align: 'string',
		text_padding: 'number',
		policy: 'string',
		signature: 'string',
		storeLocation: 'string',
		storePath: 'string',
		storeAccess: 'string',
		rotate: 'string or number'
	};
	var c = function (c) {
		var d;
		for (var e in c) {
			d = false;
			for (var f in b)
				if (e == f) {
					d = true;
					if (b[f].indexOf(a.util.typeOf(c[e])) === -1) throw new a.FilepickerException("Conversion parameter " + e + " is not the right type: " + c[e] + ". Should be a " + b[f]);
				}
			if (!d) throw new a.FilepickerException("Conversion parameter " + e + " is not a valid parameter.");
		}
	};
	var d = function (b, d, e, f, g) {
		c(d);
		if (d.crop && a.util.isArray(d.crop)) d.crop = d.crop.join(",");
		a.ajax.post(b + '/convert', {
			data: d,
			json: true,
			success: function (b) {
				e(a.util.standardizeFPFile(b));
			},
			error: function (b, c, d) {
				if (b == "not_found") f(new a.errors.FPError(141));
				else if (b == "bad_params") f(new a.errors.FPError(142));
				else if (b == "not_authorized") f(new a.errors.FPError(403));
				else f(new a.errors.FPError(143));
			},
			progress: g
		});
	};
	return {
		convert: d
	};
});

filepicker.extend("cookies", function () {
	var a = this;
	var b = function (b) {
		var c = function (c) {
			if (c.type !== "ThirdPartyCookies") return;
			a.cookies.THIRD_PARTY_COOKIES = !! c.payload;
			if (b && typeof b === "function") b( !! c.payload);
		};
		return c;
	};
	var c = function (c) {
		var d = b(c);
		a.handlers.attach('cookies', d);
		a.comm.openChannel();
	};
	return {
		checkThirdParty: c
	};
});

filepicker.extend("dragdrop", function () {
	var a = this;
	var b = function () {
		return ( !! window.FileReader || navigator.userAgent.indexOf("Safari") >= 0) && ('draggable' in document.createElement('span'));
	};
	var c = function (c, d) {
		var e = "No DOM element found to create drop pane";
		if (!c) throw new a.FilepickerException(e);
		if (c.jquery) {
			if (c.length === 0) throw new a.FilepickerException(e);
			c = c[0];
		}
		if (!b()) {
			a.util.console.error("Your browser doesn't support drag-drop functionality");
			return false;
		}
		d = d || {};
		var f = d.dragEnter || function () {};
		var g = d.dragLeave || function () {};
		var h = d.onStart || function () {};
		var i = d.onSuccess || function () {};
		var j = d.onError || function () {};
		var k = d.onProgress || function () {};
		var l = d.mimetypes;
		if (!l)
			if (d.mimetype) l = [d.mimetype];
			else l = ["*/*"];
		if (a.util.typeOf(l) == 'string') l = l.split(',');
		var m = d.extensions;
		if (!m)
			if (d.extension) m = [d.extensions];
		if (a.util.typeOf(m) == 'string') m = m.split(',');
		var n = {
			location: d.location,
			path: d.path,
			access: d.access,
			policy: d.policy,
			signature: d.signature
		};
		c.addEventListener("dragenter", function (a) {
			f();
			a.stopPropagation();
			a.preventDefault();
			return false;
		}, false);
		c.addEventListener("dragleave", function (a) {
			g();
			a.stopPropagation();
			a.preventDefault();
			return false;
		}, false);
		c.addEventListener("dragover", function (a) {
			a.preventDefault();
			return false;
		}, false);
		c.addEventListener("drop", function (b) {
			b.stopPropagation();
			b.preventDefault();
			var c;
			var d;
			var e;
			if (b.dataTransfer.items) {
				d = b.dataTransfer.items;
				for (c = 0; c < d.length; c++) {
					e = d[c] && d[c].webkitGetAsEntry ? d[c].webkitGetAsEntry() : undefined;
					if (e && !! e.isDirectory) {
						j("WrongType", "Uploading a folder is not allowed");
						return;
					}
				}
			}
			var f = b.dataTransfer.files;
			var g = f.length;
			if (u(f)) {
				h(f);
				for (c = 0; c < f.length; c++) a.store(f[c], n, q(c, g), r, s(c, g));
			}
		});
		var o = {};
		var p = [];
		var q = function (a, b) {
			return function (c) {
				if (!d.multiple) i([c]);
				else {
					p.push(c);
					if (p.length == b) {
						i(p);
						p = [];
					} else {
						o[a] = 100;
						t(b);
					}
				}
			};
		};
		var r = function (a) {
			j("UploadError", a.toString());
		};
		var s = function (a, b) {
			return function (c) {
				o[a] = c;
				t(b);
			};
		};
		var t = function (a) {
			var b = 0;
			for (var c in o) b += o[c];
			var d = b / a;
			k(d);
		};
		var u = function (b) {
			if (b.length > 0) {
				if (b.length > 1 && !d.multiple) {
					j("TooManyFiles", "Only one file at a time");
					return false;
				}
				var c;
				var e;
				var f;
				for (var g = 0; g < b.length; g++) {
					c = false;
					e = b[g];
					f = e.name || e.fileName || '"Unknown file"';
					for (var h = 0; h < l.length; h++) {
						var i = a.mimetypes.getMimetype(e);
						c = c || a.mimetypes.matchesMimetype(i, l[h]);
					}
					if (!c) {
						j("WrongType", f + " isn't the right type of file");
						return false;
					}
					if (m) {
						c = false;
						for (h = 0; h < m.length; h++) c = c || a.util.endsWith(f, m[h]);
						if (!c) {
							j("WrongType", f + " isn't the right type of file");
							return false;
						}
					}
					if (e.size && !! d.maxSize && e.size > d.maxSize) {
						j("WrongSize", f + " is too large (" + e.size + " Bytes)");
						return false;
					}
				}
				return true;
			} else j("NoFilesFound", "No files uploaded");
			return false;
		};
		return true;
	};
	return {
		enabled: b,
		makeDropPane: c
	};
});

filepicker.extend("errors", function () {
	var a = this;
	var b = function (a) {
		if (this === window) return new b(a);
		this.code = a;
		if (filepicker.debug) {
			var c = filepicker.error_map[this.code];
			this.message = c.message;
			this.moreInfo = c.moreInfo;
			this.toString = function () {
				return "FPError " + this.code + ": " + this.message + ". For help, see " + this.moreInfo;
			};
		} else this.toString = function () {
			return "FPError " + this.code + ". Include filepicker_debug.js for more info";
		};
		return this;
	};
	b.isClass = true;
	var c = function (b) {
		if (filepicker.debug) a.util.console.error(b.toString());
	};
	return {
		FPError: b,
		handleError: c
	};
}, true);

filepicker.extend("exporter", function () {
	var a = this;
	var b = function (b) {
		var c = function (c, d, e) {
			if (b[d] && !a.util.isArray(b[d])) b[d] = [b[d]];
			else if (b[c]) b[d] = [b[c]];
			else if (e) b[d] = e;
		};
		if (b.mimetype && b.extension) throw a.FilepickerException("Error: Cannot pass in both mimetype and extension parameters to the export function");
		c('service', 'services');
		if (b.services)
			for (var d = 0; d < b.services.length; d++) {
				var e = ('' + b.services[d]).replace(" ", "");
				var f = a.services[e];
				b.services[d] = (f === undefined ? e : f);
			}
		if (b.openTo) b.openTo = a.services[b.openTo] || b.openTo;
		a.util.setDefault(b, 'container', 'modal');
	};
	var c = function (b, c) {
		var d = function (d) {
			if (d.type !== "filepickerUrl") return;
			if (d.error) {
				a.util.console.error(d.error);
				c(a.errors.FPError(132));
			} else {
				var e = {};
				e.url = d.payload.url;
				e.filename = d.payload.data.filename;
				e.mimetype = d.payload.data.type;
				e.size = d.payload.data.size;
				e.isWriteable = true;
				b(e);
			}
			a.modal.close();
		};
		return d;
	};
	var d = function (e, f, g, h) {
		b(f);
		if (f.debug) {
			setTimeout(function () {
				g({
					url: "https://www.filepicker.io/api/file/-nBq2onTSemLBxlcBWn1",
					filename: 'test.png',
					mimetype: 'image/png',
					size: 58979
				});
			}, 1);
			return;
		}
		if (a.cookies.THIRD_PARTY_COOKIES === undefined) {
			a.cookies.checkThirdParty(function () {
				d(e, f, g, h);
			});
			return;
		}
		var i = a.util.getId();
		var j = false;
		var k = function (a) {
			j = true;
			g(a);
		};
		var l = function (a) {
			j = true;
			h(a);
		};
		var m = function () {
			if (!j) {
				j = true;
				h(a.errors.FPError(131));
			}
		};
		if (f.container == 'modal' && (f.mobile || a.window.shouldForce())) f.container = 'window';
		a.window.open(f.container, a.urls.constructExportUrl(e, f, i), m);
		a.handlers.attach(i, c(k, l));
	};
	return {
		createExporter: d
	};
});

filepicker.extend("files", function () {
	var a = this;
	var b = function (b, d, e, f, g) {
		var h = d.base64encode === undefined;
		if (h) d.base64encode = true;
		d.base64encode = d.base64encode !== false;
		var i = function (b) {
			if (h) b = a.base64.decode(b, !! d.asText);
			e(b);
		};
		c.call(this, b, d, i, f, g);
	};
	var c = function (b, c, d, e, f) {
		if (c.cache !== true) c._cacheBust = a.util.getId();
		a.ajax.get(b, {
			data: c,
			headers: {
				'X-NO-STREAM': true
			},
			success: d,
			error: function (b, c, d) {
				if (b == "CORS_not_allowed") e(new a.errors.FPError(113));
				else if (b == "CORS_error") e(new a.errors.FPError(114));
				else if (b == "not_found") e(new a.errors.FPError(115));
				else if (b == "bad_params") e(new a.errors.FPError(400));
				else if (b == "not_authorized") e(new a.errors.FPError(403));
				else e(new a.errors.FPError(118));
			},
			progress: f
		});
	};
	var d = function (b, c, d, e, f) {
		if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
			f(10);
			a.files.storeFile(b, {}, function (b) {
				f(50);
				a.files.readFromFPUrl(b.url, c, d, e, function (a) {
					f(50 + a / 2);
				});
			}, e, function (a) {
				f(a / 2);
			});
			return;
		}
		var g = !! c.base64encode;
		var h = !! c.asText;
		var i = new FileReader();
		i.onprogress = function (a) {
			if (a.lengthComputable) f(Math.round((a.loaded / a.total) * 100));
		};
		i.onload = function (b) {
			f(100);
			if (g) d(a.base64.encode(b.target.result, h));
			else d(b.target.result);
		};
		i.onerror = function (b) {
			switch (b.target.error.code) {
			case b.target.error.NOT_FOUND_ERR:
				e(new a.errors.FPError(115));
				break;
			case b.target.error.NOT_READABLE_ERR:
				e(new a.errors.FPError(116));
				break;
			case b.target.error.ABORT_ERR:
				e(new a.errors.FPError(117));
				break;
			default:
				e(new a.errors.FPError(118));
				break;
			}
		};
		if (h || !i.readAsBinaryString) i.readAsText(b);
		else i.readAsBinaryString(b);
	};
	var e = function (b, c, d, e, f, g) {
		var h = d.mimetype || 'text/plain';
		a.ajax.post(a.urls.constructWriteUrl(b, d), {
			headers: {
				'Content-Type': h
			},
			data: c,
			processData: false,
			json: true,
			success: function (b) {
				e(a.util.standardizeFPFile(b));
			},
			error: function (b, c, d) {
				if (b == "not_found") f(new a.errors.FPError(121));
				else if (b == "bad_params") f(new a.errors.FPError(122));
				else if (b == "not_authorized") f(new a.errors.FPError(403));
				else f(new a.errors.FPError(123));
			},
			progress: g
		});
	};
	var f = function (b, c, d, e, f, g) {
		var h = function (b, c, d) {
			if (b == "not_found") f(new a.errors.FPError(121));
			else if (b == "bad_params") f(new a.errors.FPError(122));
			else if (b == "not_authorized") f(new a.errors.FPError(403));
			else f(new a.errors.FPError(123));
		};
		var i = function (b) {
			e(a.util.standardizeFPFile(b));
		};
		k(c, a.urls.constructWriteUrl(b, d), i, h, g);
	};
	var g = function (b, c, d, e, f, g) {
		var h = function (b, c, d) {
			if (b == "not_found") f(new a.errors.FPError(121));
			else if (b == "bad_params") f(new a.errors.FPError(122));
			else if (b == "not_authorized") f(new a.errors.FPError(403));
			else f(new a.errors.FPError(123));
		};
		var i = function (b) {
			e(a.util.standardizeFPFile(b));
		};
		d.mimetype = c.type;
		k(c, a.urls.constructWriteUrl(b, d), i, h, g);
	};
	var h = function (b, c, d, e, f, g) {
		a.ajax.post(a.urls.constructWriteUrl(b, d), {
			data: {
				'url': c
			},
			json: true,
			success: function (b) {
				e(a.util.standardizeFPFile(b));
			},
			error: function (b, c, d) {
				if (b == "not_found") f(new a.errors.FPError(121));
				else if (b == "bad_params") f(new a.errors.FPError(122));
				else if (b == "not_authorized") f(new a.errors.FPError(403));
				else f(new a.errors.FPError(123));
			},
			progress: g
		});
	};
	var i = function (b, c, d, e, f) {
		if (b.files) {
			if (b.files.length === 0) e(new a.errors.FPError(115));
			else j(b.files[0], c, d, e, f);
			return;
		}
		a.util.setDefault(c, 'storage', 'S3');
		if (!c.filename) c.filename = b.value.replace("C:\\fakepath\\", "") || b.name;
		var g = b.name;
		b.name = "fileUpload";
		a.iframeAjax.post(a.urls.constructStoreUrl(c), {
			data: b,
			processData: false,
			json: true,
			success: function (c) {
				b.name = g;
				d(a.util.standardizeFPFile(c));
			},
			error: function (b, c, d) {
				if (b == "not_found") e(new a.errors.FPError(121));
				else if (b == "bad_params") e(new a.errors.FPError(122));
				else if (b == "not_authorized") e(new a.errors.FPError(403));
				else e(new a.errors.FPError(123));
			}
		});
	};
	var j = function (b, c, d, e, f) {
		a.util.setDefault(c, 'storage', 'S3');
		var g = function (b, c, d) {
			if (b == "not_found") e(new a.errors.FPError(121));
			else if (b == "bad_params") e(new a.errors.FPError(122));
			else if (b == "not_authorized") e(new a.errors.FPError(403));
			else {
				a.util.console.error(b);
				e(new a.errors.FPError(123));
			}
		};
		var h = function (b) {
			d(a.util.standardizeFPFile(b));
		};
		if (!c.filename) c.filename = b.name || b.fileName;
		k(b, a.urls.constructStoreUrl(c), h, g, f);
	};
	var k = function (b, c, d, e, f) {
		if (b.files) b = b.files[0];
		var g = !! window.FormData && !! window.XMLHttpRequest;
		if (g) {
			data = new FormData();
			data.append('fileUpload', b);
			a.ajax.post(c, {
				json: true,
				processData: false,
				data: data,
				success: d,
				error: e,
				progress: f
			});
		} else a.iframeAjax.post(c, {
			data: b,
			json: true,
			success: d,
			error: e
		});
	};
	var l = function (b, c, d, e, f) {
		a.util.setDefault(c, 'storage', 'S3');
		a.util.setDefault(c, 'mimetype', 'text/plain');
		a.ajax.post(a.urls.constructStoreUrl(c), {
			headers: {
				'Content-Type': c.mimetype
			},
			data: b,
			processData: false,
			json: true,
			success: function (b) {
				d(a.util.standardizeFPFile(b));
			},
			error: function (b, c, d) {
				if (b == "not_found") e(new a.errors.FPError(121));
				else if (b == "bad_params") e(new a.errors.FPError(122));
				else if (b == "not_authorized") e(new a.errors.FPError(403));
				else e(new a.errors.FPError(123));
			},
			progress: f
		});
	};
	var m = function (b, c, d, e, f) {
		a.util.setDefault(c, 'storage', 'S3');
		a.ajax.post(a.urls.constructStoreUrl(c), {
			data: {
				'url': b
			},
			json: true,
			success: function (b) {
				d(a.util.standardizeFPFile(b));
			},
			error: function (b, c, d) {
				if (b == "not_found") e(new a.errors.FPError(151));
				else if (b == "bad_params") e(new a.errors.FPError(152));
				else if (b == "not_authorized") e(new a.errors.FPError(403));
				else e(new a.errors.FPError(153));
			},
			progress: f
		});
	};
	var n = function (b, c, d, e) {
		var f = ['uploaded', 'modified', 'created'];
		if (c.cache !== true) c._cacheBust = a.util.getId();
		a.ajax.get(b + "/metadata", {
			json: true,
			data: c,
			success: function (a) {
				for (var b = 0; b < f.length; b++)
					if (a[f[b]]) a[f[b]] = new Date(a[f[b]]);
				d(a);
			},
			error: function (b, c, d) {
				if (b == "not_found") e(new a.errors.FPError(161));
				else if (b == "bad_params") e(new a.errors.FPError(400));
				else if (b == "not_authorized") e(new a.errors.FPError(403));
				else e(new a.errors.FPError(162));
			}
		});
	};
	var o = function (b, c, d, e) {
		c.key = a.apikey;
		a.ajax.post(b + "/remove", {
			data: c,
			success: function (a) {
				d();
			},
			error: function (b, c, d) {
				if (b == "not_found") e(new a.errors.FPError(171));
				else if (b == "bad_params") e(new a.errors.FPError(400));
				else if (b == "not_authorized") e(new a.errors.FPError(403));
				else e(new a.errors.FPError(172));
			}
		});
	};
	return {
		readFromUrl: c,
		readFromFile: d,
		readFromFPUrl: b,
		writeDataToFPUrl: e,
		writeFileToFPUrl: g,
		writeFileInputToFPUrl: f,
		writeUrlToFPUrl: h,
		storeFileInput: i,
		storeFile: j,
		storeUrl: m,
		storeData: l,
		stat: n,
		remove: o
	};
});

filepicker.extend("handlers", function () {
	var a = this;
	var b = {};
	var c = function (a, c) {
		if (b.hasOwnProperty(a)) b[a].push(c);
		else b[a] = [c];
		return c;
	};
	var d = function (a, c) {
		var d = b[a];
		if (!d) return;
		if (c) {
			for (var e = 0; e < d.length; e++)
				if (d[e] === c) {
					d.splice(e, 1);
					break;
				}
			if (d.length === 0) delete b[a];
		} else delete b[a];
	};
	var e = function (a) {
		var c = a.id;
		if (b.hasOwnProperty(c)) {
			var d = b[c];
			for (var e = 0; e < d.length; e++) d[e](a);
			return true;
		}
		return false;
	};
	return {
		attach: c,
		detach: d,
		run: e
	};
});

filepicker.extend("iframeAjax", function () {
	var a = this;
	var b = "ajax_iframe";
	var c = [];
	var d = false;
	var e = function (a, b) {
		b.method = 'GET';
		h(a, b);
	};
	var f = function (b, c) {
		c.method = 'POST';
		b += (b.indexOf('?') >= 0 ? '&' : '?') + '_cacheBust=' + a.util.getId();
		h(b, c);
	};
	var g = function () {
		if (c.length > 0) {
			var a = c.shift();
			h(a.url, a.options);
		}
	};
	var h = function (e, f) {
		if (d) {
			c.push({
				url: e,
				options: f
			});
			return;
		}
		e += (e.indexOf('?') >= 0 ? '&' : '?') + '_cacheBust=' + a.util.getId();
		e += "&Content-Type=text%2Fhtml";
		a.comm.openChannel();
		var g;
		try {
			g = document.createElement('<iframe name="' + b + '">');
		} catch (h) {
			g = document.createElement('iframe');
		}
		g.id = g.name = b;
		g.style.display = 'none';
		var k = function () {
			d = false;
		};
		if (g.attachEvent) {
			g.attachEvent("onload", k);
			g.attachEvent("onerror", k);
		} else g.onerror = g.onload = k;
		g.id = b;
		g.name = b;
		g.style.display = 'none';
		g.onerror = g.onload = function () {
			d = false;
		};
		document.body.appendChild(g);
		a.handlers.attach('upload', i(f));
		var l = document.createElement("form");
		l.method = f.method || 'GET';
		l.action = e;
		l.target = b;
		var m = f.data;
		if (a.util.isFileInputElement(m) || a.util.isFile(m)) l.encoding = l.enctype = "multipart/form-data";
		document.body.appendChild(l);
		if (a.util.isFile(m)) {
			var n = j(m);
			if (!n) throw a.FilepickerException("Couldn't find corresponding file input.");
			m = {
				'fileUpload': n
			};
		} else if (a.util.isFileInputElement(m)) {
			var o = m;
			m = {};
			m.fileUpload = o;
		} else if (m && a.util.isElement(m) && m.tagName == "INPUT") {
			o = m;
			m = {};
			m[o.name] = o;
		} else if (f.processData !== false) m = {
			'data': m
		};
		m.format = 'iframe';
		var p = {};
		for (var q in m) {
			var r = m[q];
			if (a.util.isElement(r) && r.tagName == "INPUT") {
				p[q] = {
					par: r.parentNode,
					sib: r.nextSibling,
					name: r.name,
					input: r,
					focused: r == document.activeElement
				};
				r.name = q;
				l.appendChild(r);
			} else {
				var s = document.createElement("input");
				s.name = q;
				s.value = r;
				l.appendChild(s);
			}
		}
		d = true;
		window.setTimeout(function () {
			l.submit();
			for (var a in p) {
				var b = p[a];
				b.par.insertBefore(b.input, b.sib);
				b.input.name = b.name;
				if (b.focused) b.input.focus();
			}
			l.parentNode.removeChild(l);
		}, 1);
	};
	var i = function (b) {
		var c = b.success || function () {};
		var e = b.error || function () {};
		var f = function (b) {
			if (b.type !== "Upload") return;
			d = false;
			var f = b.payload;
			if (f.error) e(f.error);
			else c(f);
			a.handlers.detach("upload");
			g();
		};
		return f;
	};
	var j = function (a) {
		var b = document.getElementsByTagName("input");
		for (var c = 0; c < b.length; c++) {
			var d = b[0];
			if (d.type != "file" || !d.files || !d.files.length) continue;
			for (var e = 0; e < d.files.length; e++)
				if (d.files[e] === a) return d;
		}
		return null;
	};
	return {
		get: e,
		post: f,
		request: h
	};
});

filepicker.extend("json", function () {
	var a = this;
	var b = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	};
	var c = function (a) {
		return b[a] || '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	};
	var d = function (a) {
		a = a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
		return (/^[\],:{}\s]*$/).test(a);
	};
	var e = function (b) {
		if (window.JSON && window.JSON.stringify) return window.JSON.stringify(b);
		if (b && b.toJSON) b = b.toJSON();
		var d = [];
		switch (a.util.typeOf(b)) {
		case 'string':
			return '"' + b.replace(/[\x00-\x1f\\"]/g, c) + '"';
		case 'array':
			for (var f = 0; f < b.length; f++) d.push(e(b[f]));
			return '[' + d + ']';
		case 'object':
		case 'hash':
			var g;
			var h;
			for (h in b) {
				g = e(b[h]);
				if (g) d.push(e(h) + ':' + g);
				g = null;
			}
			return '{' + d + '}';
		case 'number':
		case 'boolean':
			return '' + b;
		case 'null':
			return 'null';
		default:
			return 'null';
		}
		return null;
	};
	var f = function (b, c) {
		if (!b || a.util.typeOf(b) != 'string') return null;
		if (window.JSON && window.JSON.parse) return window.JSON.parse(b);
		else {
			if (c)
				if (!d(b)) throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');
			return eval('(' + b + ')');
		}
	};
	return {
		validate: d,
		encode: e,
		stringify: e,
		decode: f,
		parse: f
	};
});

filepicker.extend(function () {
	var a = this;
	a.API_VERSION = "v1";
	var b = function (b) {
		a.apikey = b;
	};
	var c = function (a) {
		this.text = a;
		this.toString = function () {
			return "FilepickerException: " + this.text;
		};
		return this;
	};
	c.isClass = true;
	var d = function () {
		if (!a.apikey) throw new a.FilepickerException("API Key not found");
	};
	var e = function (b, c, e) {
		d();
		if (typeof b === "function") {
			e = c;
			c = b;
			b = {};
		}
		b = b || {};
		c = c || function () {};
		e = e || a.errors.handleError;
		a.picker.createPicker(b, c, e, false);
	};
	var f = function (b, c, e) {
		d();
		if (typeof b === "function") {
			e = c;
			c = b;
			b = {};
		}
		b = b || {};
		c = c || function () {};
		e = e || a.errors.handleError;
		a.picker.createPicker(b, c, e, true);
	};
	var g = function (b, c, e, f) {
		d();
		if (!b || !c || typeof b === "function" || typeof b === "function") throw new a.FilepickerException("Not all required parameters given, missing picker or store options");
		f = f || a.errors.handleError;
		var g = !! b.multiple;
		var h = !! b ? a.util.clone(b) : {};
		h.storeLocation = c.location || 'S3';
		h.storePath = c.path;
		h.storeAccess = c.access || 'private';
		if (g && h.storePath)
			if (h.storePath.charAt(h.storePath.length - 1) != "/") throw new a.FilepickerException("pickAndStore with multiple files requires a path that ends in '/'");
		var i = e;
		if (!g) i = function (a) {
			e([a]);
		};
		a.picker.createPicker(h, i, f, g);
	};
	var h = function (b, c, e) {
		d();
		if (typeof b === "function") {
			e = c;
			c = b;
			b = {};
		}
		b = b || {};
		c = c || function () {};
		e = e || a.errors.handleError;
		a.picker.createPicker(b, c, e, false, true);
	};
	var i = function (b, c, e, f, g) {
		d();
		if (!b) throw new a.FilepickerException("No input given - nothing to read!");
		if (typeof c === "function") {
			g = f;
			f = e;
			e = c;
			c = {};
		}
		c = c || {};
		e = e || function () {};
		f = f || a.errors.handleError;
		g = g || function () {};
		if (typeof b == "string")
			if (a.util.isFPUrl(b)) a.files.readFromFPUrl(b, c, e, f, g);
			else a.files.readFromUrl(b, c, e, f, g);
			else if (a.util.isFileInputElement(b))
			if (!b.files) j(b, c, e, f, g);
			else if (b.files.length === 0) f(new a.errors.FPError(115));
		else a.files.readFromFile(b.files[0], c, e, f, g);
		else if (a.util.isFile(b)) a.files.readFromFile(b, c, e, f, g);
		else if (b.url) a.files.readFromFPUrl(b.url, c, e, f, g);
		else throw new a.FilepickerException("Cannot read given input: " + b + ". Not a url, file input, DOM File, or FPFile object.");
	};
	var j = function (b, c, d, e, f) {
		f(10);
		a.store(b, function (b) {
			f(50);
			a.read(b, c, d, e, function (a) {
				f(50 + a / 2);
			});
		}, e);
	};
	var k = function (b, c, e, f, g, h) {
		d();
		if (!b) throw new a.FilepickerException("No fpfile given - nothing to write to!");
		if (c === undefined || c === null) throw new a.FilepickerException("No input given - nothing to write!");
		if (typeof e === "function") {
			h = g;
			g = f;
			f = e;
			e = {};
		}
		e = e || {};
		f = f || function () {};
		g = g || a.errors.handleError;
		h = h || function () {};
		var i;
		if (a.util.isFPUrl(b)) i = b;
		else if (b.url) i = b.url;
		else throw new a.FilepickerException("Invalid file to write to: " + b + ". Not a filepicker url or FPFile object."); if (typeof c == "string") a.files.writeDataToFPUrl(i, c, e, f, g, h);
		else if (a.util.isFileInputElement(c))
			if (!c.files) a.files.writeFileInputToFPUrl(i, c, e, f, g, h);
			else if (c.files.length === 0) g(new a.errors.FPError(115));
		else a.files.writeFileToFPUrl(i, c.files[0], e, f, g, h);
		else if (a.util.isFile(c)) a.files.writeFileToFPUrl(i, c, e, f, g, h);
		else if (c.url) a.files.writeUrlToFPUrl(i, c.url, e, f, g, h);
		else throw new a.FilepickerException("Cannot read from given input: " + c + ". Not a string, file input, DOM File, or FPFile object.");
	};
	var l = function (b, c, e, f, g, h) {
		d();
		if (!b) throw new a.FilepickerException("No fpfile given - nothing to write to!");
		if (c === undefined || c === null) throw new a.FilepickerException("No input given - nothing to write!");
		if (typeof e === "function") {
			h = g;
			g = f;
			f = e;
			e = {};
		}
		e = e || {};
		f = f || function () {};
		g = g || a.errors.handleError;
		h = h || function () {};
		var i;
		if (a.util.isFPUrl(b)) i = b;
		else if (b.url) i = b.url;
		else throw new a.FilepickerException("Invalid file to write to: " + b + ". Not a filepicker url or FPFile object.");
		a.files.writeUrlToFPUrl(i, c, e, f, g, h);
	};
	var m = function (b, c, e, f) {
		d();
		if (typeof c === "function") {
			f = e;
			e = c;
			c = {};
		}
		c = !! c ? a.util.clone(c) : {};
		e = e || function () {};
		f = f || a.errors.handleError;
		var g;
		if (typeof b == "string" && a.util.isUrl(b)) g = b;
		else if (b.url) {
			g = b.url;
			if (!c.mimetype && !c.extension) c.mimetype = b.mimetype;
			if (!c.suggestedFilename) c.suggestedFilename = b.filename;
		} else throw new a.FilepickerException("Invalid file to export: " + b + ". Not a valid url or FPFile object. You may want to use filepicker.store() to get an FPFile to export");
		a.exporter.createExporter(g, c, e, f);
	};
	var n = function (b, c, e, f, g) {
		d();
		if (typeof c === "function") {
			g = f;
			f = e;
			e = c;
			c = {};
		}
		c = !! c ? a.util.clone(c) : {};
		e = e || function () {};
		f = f || a.errors.handleError;
		g = g || function () {};
		if (typeof b == "string") a.files.storeData(b, c, e, f, g);
		else if (a.util.isFileInputElement(b))
			if (!b.files) a.files.storeFileInput(b, c, e, f, g);
			else if (b.files.length === 0) f(new a.errors.FPError(115));
		else a.files.storeFile(b.files[0], c, e, f, g);
		else if (a.util.isFile(b)) a.files.storeFile(b, c, e, f, g);
		else if (b.url) {
			if (!c.filename) c.filename = b.filename;
			a.files.storeUrl(b.url, c, e, f, g);
		} else throw new a.FilepickerException("Cannot store given input: " + b + ". Not a string, file input, DOM File, or FPFile object.");
	};
	var o = function (b, c, e, f, g) {
		d();
		if (typeof c === "function") {
			g = f;
			f = e;
			e = c;
			c = {};
		}
		c = c || {};
		e = e || function () {};
		f = f || a.errors.handleError;
		g = g || function () {};
		a.files.storeUrl(b, c, e, f, g);
	};
	var p = function (b, c, e, f) {
		d();
		if (typeof c === "function") {
			f = e;
			e = c;
			c = {};
		}
		c = c || {};
		e = e || function () {};
		f = f || a.errors.handleError;
		var g;
		if (a.util.isFPUrl(b)) g = b;
		else if (b.url) g = b.url;
		else throw new a.FilepickerException("Invalid file to get metadata for: " + b + ". Not a filepicker url or FPFile object.");
		a.files.stat(g, c, e, f);
	};
	var q = function (b, c, e, f) {
		d();
		if (typeof c === "function") {
			f = e;
			e = c;
			c = {};
		}
		c = c || {};
		e = e || function () {};
		f = f || a.errors.handleError;
		var g;
		if (a.util.isFPUrl(b)) g = b;
		else if (b.url) g = b.url;
		else throw new a.FilepickerException("Invalid file to remove: " + b + ". Not a filepicker url or FPFile object.");
		a.files.remove(g, c, e, f);
	};
	var r = function (b, c, e, f, g, h) {
		d();
		if (!b) throw new a.FilepickerException("No fpfile given - nothing to convert!");
		if (typeof e === "function") {
			h = g;
			g = f;
			f = e;
			e = {};
		}
		options = !! c ? a.util.clone(c) : {};
		e = e || {};
		f = f || function () {};
		g = g || a.errors.handleError;
		h = h || function () {};
		if (e.location) options.storeLocation = e.location;
		if (e.path) options.storePath = e.path;
		options.storeAccess = e.access || 'private';
		var i;
		if (a.util.isFPUrl(b)) i = b;
		else if (b.url) {
			i = b.url;
			if (!a.mimetypes.matchesMimetype(b.mimetype, 'image/*')) {
				g(new a.errors.FPError(142));
				return;
			}
		} else throw new a.FilepickerException("Invalid file to convert: " + b + ". Not a filepicker url or FPFile object.");
		a.conversions.convert(i, options, f, g, h);
	};
	var s = function (b) {
		return a.widgets.constructWidget(b);
	};
	var t = function (b, c) {
		return a.dragdrop.makeDropPane(b, c);
	};
	return {
		setKey: b,
		pick: e,
		pickFolder: h,
		pickMultiple: f,
		pickAndStore: g,
		read: i,
		write: k,
		writeUrl: l,
		'export': m,
		exportFile: m,
		store: n,
		storeUrl: o,
		stat: p,
		metadata: p,
		remove: q,
		convert: r,
		constructWidget: s,
		makeDropPane: t,
		FilepickerException: c
	};
}, true);

filepicker.extend('mimetypes', function () {
	var a = this;
	var b = {
		'.stl': 'applicaiton/sla',
		'.hbs': 'text/html',
		'.pdf': 'application/pdf',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg',
		'.jpe': 'image/jpeg',
		'.imp': 'application/x-impressionist'
	};
	var c = ['application/octet-stream', 'application/download', 'application/force-download', 'octet/stream', 'application/unknown', 'application/x-download', 'application/x-msdownload', 'application/x-secure-download'];
	var d = function (a) {
		if (a.type) {
			var d = a.type;
			d = d.toLowerCase();
			var e = false;
			for (var f = 0; f < c.length; f++) e = e || d == c[f];
			if (!e) return a.type;
		}
		var g = a.name || a.fileName;
		var h = g.match(/\.\w*$/);
		if (h) return b[h[0].toLowerCase()] || '';
		else if (a.type) return a.type;
		else return '';
	};
	var e = function (b, d) {
		if (!b) return d == "*/*";
		b = a.util.trim(b).toLowerCase();
		d = a.util.trim(d).toLowerCase();
		for (var e = 0; e < c.length; e++)
			if (b == c[e]) return true;
		test_parts = b.split("/");
		against_parts = d.split("/");
		if (against_parts[0] == "*") return true;
		if (against_parts[0] != test_parts[0]) return false;
		if (against_parts[1] == "*") return true;
		return against_parts[1] == test_parts[1];
	};
	return {
		getMimetype: d,
		matchesMimetype: e
	};
});

filepicker.extend("modal", function () {
	var a = this;
	var b = "filepicker_shade";
	var c = "filepicker_dialog_container";
	var d = function (b, c) {
		var d = e(c);
		var h = f();
		var i = g(c);
		var j = document.createElement("iframe");
		j.name = a.window.WINDOW_NAME;
		j.id = a.window.WINDOW_NAME;
		var k = a.window.getSize();
		var l = Math.min(k[1] - 40, 500);
		j.style.width = '100%';
		j.style.height = l - 32 + 'px';
		j.style.border = "none";
		j.style.position = "relative";
		j.setAttribute('border', 0);
		j.setAttribute('frameborder', 0);
		j.setAttribute('frameBorder', 0);
		j.setAttribute('marginwidth', 0);
		j.setAttribute('marginheight', 0);
		j.src = b;
		document.body.appendChild(d);
		h.appendChild(i);
		h.appendChild(j);
		document.body.appendChild(h);
		return j;
	};
	var e = function (a) {
		var c = document.createElement("div");
		c.id = b;
		c.style.position = 'fixed';
		c.style.top = 0;
		c.style.bottom = 0;
		c.style.right = 0;
		c.style.left = 0;
		c.style.backgroundColor = '#000000';
		c.style.opacity = '0.5';
		c.style.filter = 'alpha(opacity=50)';
		c.style.zIndex = 10000;
		c.onclick = h(a);
		return c;
	};
	var f = function () {
		var b = document.createElement("div");
		b.id = c;
		b.style.position = 'fixed';
		b.style.padding = "10px";
		b.style.background = '#ffffff url("https://www.filepicker.io/static/img/spinner.gif") no-repeat 50% 50%';
		b.style.top = '10px';
		b.style.bottom = 'auto';
		b.style.right = 'auto';
		var d = a.window.getSize();
		var e = Math.min(d[1] - 40, 500);
		var f = Math.max(Math.min(d[0] - 40, 800), 620);
		var g = (d[0] - f - 40) / 2;
		b.style.left = g + "px";
		b.style.height = e + 'px';
		b.style.width = f + 'px';
		b.style.overflow = 'hidden';
		b.style.webkitOverflowScrolling = 'touch';
		b.style.border = '1px solid #999';
		b.style.webkitBorderRadius = '3px';
		b.style.borderRadius = '3px';
		b.style.margin = '0';
		b.style.webkitBoxShadow = '0 3px 7px rgba(0, 0, 0, 0.3)';
		b.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.3)';
		b.style.zIndex = 10001;
		b.style.boxSizing = "content-box";
		b.style.webkitBoxSizing = "content-box";
		b.style.mozBoxSizing = "content-box";
		return b;
	};
	var g = function (a) {
		var b = document.createElement("a");
		b.appendChild(document.createTextNode('\u00D7'));
		b.onclick = h(a);
		b.style.cssFloat = "right";
		b.style.styleFloat = "right";
		b.style.cursor = "default";
		b.style.padding = '0 5px 0 0px';
		b.style.fontSize = '1.5em';
		b.style.color = '#555555';
		b.style.textDecoration = 'none';
		return b;
	};
	var h = function (d, e) {
		e = !! e;
		return function () {
			if (a.uploading && !e)
				if (!window.confirm("You are currently uploading. If you choose 'OK', the window will close and your upload will not finish. Do you want to stop uploading and close the window?")) return;
			a.uploading = false;
			var f = document.getElementById(b);
			if (f) document.body.removeChild(f);
			var g = document.getElementById(c);
			if (g) document.body.removeChild(g);
			try {
				delete window.frames[a.window.WINDOW_NAME];
			} catch (h) {}
			if (d) d();
		};
	};
	var i = h(function () {});
	return {
		generate: d,
		close: i
	};
});

filepicker.extend("picker", function () {
	var a = this;
	var b = function (b) {
		var c = function (c, d, e) {
			if (b[d]) {
				if (!a.util.isArray(b[d])) b[d] = [b[d]];
			} else if (b[c]) b[d] = [b[c]];
			else if (e) b[d] = e;
		};
		c('service', 'services');
		c('mimetype', 'mimetypes');
		c('extension', 'extensions');
		if (b.services)
			for (var d = 0; d < b.services.length; d++) {
				var e = ('' + b.services[d]).replace(" ", "");
				if (a.services[e] !== undefined) e = a.services[e];
				b.services[d] = e;
			}
		if (b.mimetypes && b.extensions) throw a.FilepickerException("Error: Cannot pass in both mimetype and extension parameters to the pick function");
		if (!b.mimetypes && !b.extensions) b.mimetypes = ['*/*'];
		if (b.openTo) b.openTo = a.services[b.openTo] || b.openTo;
		a.util.setDefault(b, 'container', 'modal');
	};
	var c = function (b, c) {
		var d = function (d) {
			if (d.type !== "filepickerUrl") return;
			a.uploading = false;
			if (d.error) {
				a.util.console.error(d.error);
				c(a.errors.FPError(102));
			} else {
				var e = {};
				e.url = d.payload.url;
				e.filename = d.payload.data.filename;
				e.mimetype = d.payload.data.type;
				e.size = d.payload.data.size;
				if (d.payload.data.key) e.key = d.payload.data.key;
				e.isWriteable = true;
				b(e);
			}
			a.modal.close();
		};
		return d;
	};
	var d = function (b, c) {
		var d = function (d) {
			if (d.type !== "filepickerUrl") return;
			a.uploading = false;
			if (d.error) {
				a.util.console.error(d.error);
				c(a.errors.FPError(102));
			} else {
				d.payload.data.url = d.payload.url;
				b(d.payload.data);
			}
			a.modal.close();
		};
		return d;
	};
	var e = function (b) {
		b = b || function () {};
		var c = function (c) {
			if (c.type !== "uploading") return;
			a.uploading = !! c.payload;
			b(a.uploading);
		};
		return c;
	};
	var f = function (b, c) {
		var d = function (d) {
			if (d.type !== "filepickerUrl") return;
			a.uploading = false;
			if (d.error) {
				a.util.console.error(d.error);
				c(a.errors.FPError(102));
			} else {
				var e = [];
				if (!a.util.isArray(d.payload)) d.payload = [d.payload];
				for (var f = 0; f < d.payload.length; f++) {
					var g = {};
					var h = d.payload[f];
					g.url = h.url;
					g.filename = h.data.filename;
					g.mimetype = h.data.type;
					g.size = h.data.size;
					if (h.data.key) g.key = h.data.key;
					g.isWriteable = true;
					e.push(g);
				}
				b(e);
			}
			a.modal.close();
		};
		return d;
	};
	var g = function (h, i, j, k, l) {
		b(h);
		if (h.debug) {
			setTimeout(function () {
				i({
					url: "https://www.filepicker.io/api/file/-nBq2onTSemLBxlcBWn1",
					filename: 'test.png',
					mimetype: 'image/png',
					size: 58979
				});
			}, 1);
			return;
		}
		if (a.cookies.THIRD_PARTY_COOKIES === undefined) {
			a.cookies.checkThirdParty(function () {
				g(h, i, j, !! k);
			});
			return;
		}
		var m = a.util.getId();
		var n = false;
		var o = function (a) {
			n = true;
			i(a);
		};
		var p = function (a) {
			n = true;
			j(a);
		};
		var q = function () {
			if (!n) {
				n = true;
				j(a.errors.FPError(101));
			}
		};
		if (h.container == 'modal' && (h.mobile || a.window.shouldForce())) h.container = 'window';
		var r;
		var s;
		if (k) {
			r = a.urls.constructPickUrl(h, m, true);
			s = f(o, p);
		} else if (l) {
			r = a.urls.constructPickFolderUrl(h, m);
			s = d(o, p);
		} else {
			r = a.urls.constructPickUrl(h, m, false);
			s = c(o, p);
		}
		a.window.open(h.container, r, q);
		a.handlers.attach(m, s);
		var t = m + "-upload";
		a.handlers.attach(t, e(function () {
			a.handlers.detach(t);
		}));
	};
	return {
		createPicker: g
	};
});

filepicker.extend('services', function () {
	return {
		COMPUTER: 1,
		DROPBOX: 2,
		FACEBOOK: 3,
		GITHUB: 4,
		GMAIL: 5,
		IMAGE_SEARCH: 6,
		URL: 7,
		WEBCAM: 8,
		GOOGLE_DRIVE: 9,
		SEND_EMAIL: 10,
		INSTAGRAM: 11,
		FLICKR: 12,
		VIDEO: 13,
		EVERNOTE: 14,
		PICASA: 15,
		WEBDAV: 16,
		FTP: 17,
		ALFRESCO: 18,
		BOX: 19,
		SKYDRIVE: 20
	};
}, true);

filepicker.extend('util', function () {
	var a = this;
	var b = function (a) {
		return a.replace(/^\s+|\s+$/g, "");
	};
	var c = /^(http|https)\:.*\/\//i;
	var d = function (a) {
		return !!a.match(c);
	};
	var e = function (a) {
		if (!a || a.charAt(0) == '/') a = window.location.protocol + "//" + window.location.host + a;
		var b = document.createElement('a');
		b.href = a;
		var c = b.hostname.indexOf(":") == -1 ? b.hostname : b.host;
		var d = {
			source: a,
			protocol: b.protocol.replace(':', ''),
			host: c,
			port: b.port,
			query: b.search,
			params: (function () {
				var a = {}, c = b.search.replace(/^\?/, '').split('&'),
					d = c.length,
					e = 0,
					f;
				for (; e < d; e++) {
					if (!c[e]) continue;
					f = c[e].split('=');
					a[f[0]] = f[1];
				}
				return a;
			})(),
			file: (b.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
			hash: b.hash.replace('#', ''),
			path: b.pathname.replace(/^([^\/])/, '/$1'),
			relative: (b.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
			segments: b.pathname.replace(/^\//, '').split('/')
		};
		d.origin = d.protocol + "://" + d.host + (d.port ? ":" + d.port : '');
		return d;
	};
	var f = function (a, b) {
		return a.indexOf(b, a.length - b.length) !== -1;
	};
	return {
		trim: b,
		parseUrl: e,
		isUrl: d,
		endsWith: f
	};
});

filepicker.extend("urls", function () {
	var a = this;
	var b = "https://www.filepicker.io";
	if (window.filepicker.hostname) b = window.filepicker.hostname;
	var c = b + "/dialog/open/";
	var d = b + "/dialog/save/";
	var e = b + "/dialog/folder/";
	var f = b + "/api/store/";
	var g = function (b, d, e) {
		return c + "?key=" + a.apikey + "&id=" + d + "&referrer=" + window.location.hostname + "&iframe=" + (b.container != 'window') + "&version=" + a.API_VERSION + (b.services ? "&s=" + b.services.join(",") : "") + (e ? "&multi=" + !! e : "") + (b.mimetypes !== undefined ? "&m=" + b.mimetypes.join(",") : "") + (b.extensions !== undefined ? "&ext=" + b.extensions.join(",") : "") + (b.openTo !== undefined ? "&loc=" + b.openTo : "") + (b.maxSize ? "&maxSize=" + b.maxSize : "") + (b.signature ? "&signature=" + b.signature : "") + (b.policy ? "&policy=" + b.policy : "") + (b.mobile !== undefined ? "&mobile=" + b.mobile : "") + (b.storeLocation ? "&storeLocation=" + b.storeLocation : "") + (b.storePath ? "&storePath=" + b.storePath : "") + (b.storeAccess ? "&storeAccess=" + b.storeAccess : "");
	};
	var h = function (b, c) {
		return e + "?key=" + a.apikey + "&id=" + c + "&referrer=" + window.location.hostname + "&iframe=" + (b.container != 'window') + "&version=" + a.API_VERSION + (b.services ? "&s=" + b.services.join(",") : "") + (b.openTo !== undefined ? "&loc=" + b.openTo : "") + (b.signature ? "&signature=" + b.signature : "") + (b.policy ? "&policy=" + b.policy : "") + (b.mobile !== undefined ? "&mobile=" + b.mobile : "");
	};
	var i = function (b, c, e) {
		if (b.indexOf("&") >= 0 || b.indexOf("?") >= 0) b = encodeURIComponent(b);
		return d + "?url=" + b + "&key=" + a.apikey + "&id=" + e + "&referrer=" + window.location.hostname + "&iframe=" + (c.container != 'window') + "&version=" + a.API_VERSION + (c.services ? "&s=" + c.services.join(",") : "") + (c.openTo !== undefined ? "&loc=" + c.openTo : "") + (c.mimetype !== undefined ? "&m=" + c.mimetype : "") + (c.extension !== undefined ? "&ext=" + c.extension : "") + (c.mobile !== undefined ? "&mobile=" + c.mobile : "") + (c.suggestedFilename !== undefined ? "&defaultSaveasName=" + c.suggestedFilename : "") + (c.signature ? "&signature=" + c.signature : "") + (c.policy ? "&policy=" + c.policy : "");
	};
	var j = function (b) {
		return f + b.storage + "?key=" + a.apikey + (b.base64decode ? "&base64decode=true" : "") + (b.mimetype ? "&mimetype=" + b.mimetype : "") + (b.filename ? "&filename=" + b.filename : "") + (b.path ? "&path=" + b.path : "") + (b.access ? "&access=" + b.access : "") + (b.signature ? "&signature=" + b.signature : "") + (b.policy ? "&policy=" + b.policy : "");
	};
	var k = function (a, b) {
		return a + "?nonce=fp" + ( !! b.base64decode ? "&base64decode=true" : "") + (b.mimetype ? "&mimetype=" + b.mimetype : "") + (b.signature ? "&signature=" + b.signature : "") + (b.policy ? "&policy=" + b.policy : "");
	};
	var l = function () {
		var b = a.util.parseUrl(window.location.href);
		return b.origin + "/404";
	};
	return {
		BASE: b,
		COMM: b + "/dialog/comm_iframe/",
		FP_COMM_FALLBACK: b + "/dialog/comm_hash_iframe/",
		STORE: f,
		PICK: c,
		EXPORT: d,
		constructPickUrl: g,
		constructPickFolderUrl: h,
		constructExportUrl: i,
		constructWriteUrl: k,
		constructStoreUrl: j,
		constructHostCommFallback: l
	};
});

filepicker.extend("util", function () {
	var a = this;
	var b = function (a) {
		return a && Object.prototype.toString.call(a) === '[object Array]';
	};
	var c = function (a) {
		return a && Object.prototype.toString.call(a) === '[object File]';
	};
	var d = function (a) {
		if (typeof HTMLElement === "object") return a instanceof HTMLElement;
		else return a && typeof a === "object" && a.nodeType === 1 && typeof a.nodeName === "string";
	};
	var e = function (a) {
		return d(a) && a.tagName == "INPUT" && a.type == "file";
	};
	var f = function (a) {
		if (a === null) return 'null';
		else if (b(a)) return 'array';
		else if (c(a)) return 'file';
		return typeof a;
	};
	var g = function () {
		var a = new Date();
		return a.getTime().toString();
	};
	var h = function (a, b, c) {
		if (a[b] === undefined) a[b] = c;
	};
	var i = function (a) {
		if (window.jQuery) window.jQuery(function () {
			a();
		});
		else {
			var b = "load";
			if (window.addEventListener) window.addEventListener(b, a, false);
			else if (window.attachEvent) window.attachEvent("on" + b, a);
			else if (window.onload) {
				var c = window.onload;
				window.onload = function () {
					c();
					a();
				};
			} else window.onload = a;
		}
	};
	var j = function (a) {
		return typeof a == "string" && a.match("www.filepicker.io/api/file/");
	};
	var k = function (a) {
		return function () {
			if (window.console && typeof window.console[a] == "function") try {
				window.console[a].apply(window.console, arguments);
			} catch (b) {
				alert(Array.prototype.join.call(arguments, ","));
			}
		};
	};
	var l = {};
	l.log = k("log");
	l.error = k("error");
	var m = function (a) {
		var b = {};
		for (key in a) b[key] = a[key];
		return b;
	};
	var n = function (a) {
		var b = {};
		b.url = a.url;
		b.filename = a.filename || a.name;
		b.mimetype = a.mimetype || a.type;
		b.size = a.size;
		b.key = a.key || a.s3_key;
		b.isWriteable = !! (a.isWriteable || a.writeable);
		return b;
	};
	return {
		isArray: b,
		isFile: c,
		isElement: d,
		isFileInputElement: e,
		getId: g,
		setDefault: h,
		typeOf: f,
		addOnLoad: i,
		isFPUrl: j,
		console: l,
		clone: m,
		standardizeFPFile: n
	};
});

filepicker.extend("widgets", function () {

	var a = this;

	var b = function (a, b, c, d) {
		var e = d.getAttribute(c);
		if (e) b[a] = e;
	};

	var c = function (a, b) {

		var c;

		if (document.createEvent) {
			c = document.createEvent('Event');
			c.initEvent("change", true, false);
			c.fpfile = b ? b[0] : undefined;
			c.fpfiles = b;
			a.dispatchEvent(c);
		} else if (document.createEventObject) {
			c = document.createEventObject('Event');
			c.eventPhase = 2;
			c.currentTarget = c.srcElement = c.target = a;
			c.fpfile = b ? b[0] : undefined;
			c.fpfiles = b;
			a.fireEvent('onchange', c);
		} else if (a.onchange) a.onchange(b);

	};

	var d = function (d) {

		var e = document.createElement("button");
		e.setAttribute("type", "button");
		e.innerHTML = d.getAttribute("data-fp-button-text") || d.getAttribute("data-fp-text") || "Change Photo";
		e.className = d.getAttribute("data-fp-button-class") || d.getAttribute("data-fp-class") || d.className;
		d.style.display = "none";

		var f = {};
		b("container", f, "data-fp-option-container", d);
		b("maxSize", f, "data-fp-option-maxsize", d);
		b("mimetype", f, "data-fp-mimetype", d);
		b("mimetypes", f, "data-fp-mimetypes", d);
		b("extension", f, "data-fp-extension", d);
		b("extensions", f, "data-fp-extensions", d);
		b("container", f, "data-fp-container", d);
		b("maxSize", f, "data-fp-maxSize", d);
		b("openTo", f, "data-fp-openTo", d);
		b("debug", f, "data-fp-debug", d);
		b("signature", f, "data-fp-signature", d);
		b("policy", f, "data-fp-policy", d);
		b("storeLocation", f, "data-fp-store-location", d);
		b("storePath", f, "data-fp-store-path", d);
		b("storeAccess", f, "data-fp-store-access", d);

		var g = d.getAttribute("data-fp-services");
		if (!g) g = d.getAttribute("data-fp-option-services");

		if (g) {
			g = g.split(",");
			for (var h = 0; h < g.length; h++) g[h] = a.services[g[h].replace(" ", "")];
			f.services = g;
		}

		var i = d.getAttribute("data-fp-service");
		if (i) f.service = a.services[i.replace(" ", "")];
		if (f.mimetypes) f.mimetypes = f.mimetypes.split(",");
		if (f.extensions) f.extensions = f.extensions.split(",");

		var j = d.getAttribute("data-fp-apikey");
		if (j) a.setKey(j);

		var k = (d.getAttribute("data-fp-multiple") || d.getAttribute("data-fp-option-multiple") || "false") == "true";

		if (k) e.onclick = function () {

			e.blur();

			a.pickMultiple(f, function (a) {

				var b = [];
				for (var e = 0; e < a.length; e++) b.push(a[e].url);
				d.value = b.join();
				c(d, a);

			});

			return false;

		};

		else e.onclick = function () {

			e.blur();

			a.pick(f, function (a) {
				d.value = a.url;
				c(d, [a]);
			});

			return false;

		};

		d.parentNode.insertBefore(e, d.nextSibling);

	};

	var e = function (d) {

		var e = document.createElement("div");
		e.className = d.getAttribute('data-fp-class') || d.className;
		e.style.padding = "1px";
		d.style.display = "none";
		d.parentNode.insertBefore(e, d.nextSibling);

		var i = document.createElement("button");
		i.setAttribute("type", "button");
		i.innerHTML = d.getAttribute("data-fp-button-text") || "Change Photo";
		i.className = d.getAttribute("data-fp-button-class") || "";
		e.appendChild(i);

		var j = document.createElement("div");
		g(j);
		j.innerHTML = d.getAttribute('data-fp-drag-text') || "Or drop files here";
		j.className = d.getAttribute('data-fp-drag-class') || '';
		e.appendChild(j);

		var k = {};
		b("container", k, "data-fp-option-container", d);
		b("maxSize", k, "data-fp-option-maxsize", d);
		b("mimetype", k, "data-fp-mimetype", d);
		b("mimetypes", k, "data-fp-mimetypes", d);
		b("extension", k, "data-fp-extension", d);
		b("extensions", k, "data-fp-extensions", d);
		b("container", k, "data-fp-container", d);
		b("maxSize", k, "data-fp-maxSize", d);
		b("openTo", k, "data-fp-openTo", d);
		b("debug", k, "data-fp-debug", d);
		b("signature", k, "data-fp-signature", d);
		b("policy", k, "data-fp-policy", d);
		b("storeLocation", k, "data-fp-store-location", d);
		b("storePath", k, "data-fp-store-path", d);
		b("storeAccess", k, "data-fp-store-access", d);

		var l = d.getAttribute("data-fp-services");
		if (!l) l = d.getAttribute("data-fp-option-services");

		if (l) {
			l = l.split(",");
			for (var m = 0; m < l.length; m++) l[m] = a.services[l[m].replace(" ", "")];
			k.services = l;
		}

		var n = d.getAttribute("data-fp-service");
		if (n) k.service = a.services[n.replace(" ", "")];
		if (k.mimetypes) k.mimetypes = k.mimetypes.split(",");
		if (k.extensions) k.extensions = k.extensions.split(",");

		var o = d.getAttribute("data-fp-apikey");
		if (o) a.setKey(o);

		var p = (d.getAttribute("data-fp-multiple") || d.getAttribute("data-fp-option-multiple") || "false") == "true";
		if (a.dragdrop.enabled()) h(j, p, k, d);

		else j.innerHTML = "&nbsp;"; if (p) j.onclick = i.onclick = function () {

			i.blur();

			a.pickMultiple(k, function (a) {

				var b = [];
				var e = [];

				for (var g = 0; g < a.length; g++) {
					b.push(a[g].url);
					e.push(a[g].filename);
				}

				d.value = b.join();
				f(d, j, e.join(', '));
				c(d, a);

			});

			return false;

		};

		else j.onclick = i.onclick = function () {

			i.blur();

			a.pick(k, function (a) {

				d.value = a.url;
				f(d, j, a.filename);
				c(d, [a]);

			});

			return false;

		};

	};

	var f = function (b, d, e) {

		d.innerHTML = e;
		d.style.padding = "2px 4px";
		d.style.cursor = "default";
		d.style.width = '';

		var f = document.createElement("span");
		f.innerHTML = "X";
		f.style.borderRadius = "8px";
		f.style.fontSize = "14px";
		f.style.cssFloat = "right";
		f.style.padding = "0 3px";
		f.style.color = "#600";
		f.style.cursor = "pointer";

		var h = function (e) {

			if (!e) e = window.event;
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
			g(d);
			if (!a.dragdrop.enabled) d.innerHTML = '&nbsp;';
			else d.innerHTML = b.getAttribute('data-fp-drag-text') || "Or drop files here";
			b.value = '';
			c(b);
			return false;

		};

		if (f.addEventListener) f.addEventListener("click", h, false);
		else if (f.attachEvent) f.attachEvent("onclick", h);
		d.appendChild(f);

	};

	var g = function (a) {
		a.style.border = "1px dashed #AAA";
		a.style.display = "inline-block";
		a.style.margin = "0 0 0 4px";
		a.style.borderRadius = "3px";
		a.style.backgroundColor = "#F3F3F3";
		a.style.color = "#333";
		a.style.fontSize = "14px";
		a.style.lineHeight = "22px";
		a.style.padding = "2px 4px";
		a.style.verticalAlign = "middle";
		a.style.cursor = "pointer";
		a.style.overflow = "hidden";
	};
	var h = function (b, d, e, g) {
		var h = b.innerHTML;
		var j;
		a.dragdrop.makeDropPane(b, {
			multiple: d,
			maxSize: e.maxSize,
			mimetypes: e.mimetypes,
			mimetype: e.mimetype,
			extensions: e.extensions,
			extension: e.extension,
			location: e.storeLocation,
			path: e.storePath,
			access: e.storeAccess,
			policy: e.policy,
			signature: e.signature,
			dragEnter: function () {
				b.innerHTML = "Drop to upload";
				b.style.backgroundColor = "#E0E0E0";
				b.style.border = "1px solid #000";
			},
			dragLeave: function () {
				b.innerHTML = h;
				b.style.backgroundColor = "#F3F3F3";
				b.style.border = "1px dashed #AAA";
			},
			onError: function (a, c) {
				if (a == "TooManyFiles") b.innerHTML = c;
				else if (a == "WrongType") b.innerHTML = c;
				else if (a == "NoFilesFound") b.innerHTML = c;
				else if (a == "UploadError") b.innerHTML = "Oops! Had trouble uploading.";
			},
			onStart: function (a) {
				j = i(b);
			},
			onProgress: function (a) {
				if (j) j.style.width = a + "%";
			},
			onSuccess: function (a) {
				var d = [];
				var e = [];
				for (var h = 0; h < a.length; h++) {
					d.push(a[h].url);
					e.push(a[h].filename);
				}
				g.value = d.join();
				f(g, b, e.join(', '));
				c(g, a);
			}
		});
	};
	var i = function (a) {
		var b = document.createElement("div");
		var c = a.offsetHeight - 2;
		b.style.height = c + "px";
		b.style.backgroundColor = "#0E90D2";
		b.style.width = "2%";
		b.style.borderRadius = "3px";
		a.style.width = a.offsetWidth + "px";
		a.style.padding = "0";
		a.style.border = "1px solid #AAA";
		a.style.backgroundColor = "#F3F3F3";
		a.style.boxShadow = "inset 0 1px 2px rgba(0, 0, 0, 0.1)";
		a.innerHTML = "";
		a.appendChild(b);
		return b;
	};
	var j = function (c) {
		c.onclick = function () {
			var d = c.getAttribute("data-fp-url");
			if (!d) return true;
			var e = {};
			b("container", e, "data-fp-option-container", c);
			b("suggestedFilename", e, "data-fp-option-defaultSaveasName", c);
			b("container", e, "data-fp-container", c);
			b("suggestedFilename", e, "data-fp-suggestedFilename", c);
			b("mimetype", e, "data-fp-mimetype", c);
			b("extension", e, "data-fp-extension", c);
			var f = c.getAttribute("data-fp-services");
			if (!f) f = c.getAttribute("data-fp-option-services");
			if (f) {
				f = f.split(",");
				for (var g = 0; g < f.length; g++) f[g] = a.services[f[g].replace(" ", "")];
				e.services = f;
			}
			var h = c.getAttribute("data-fp-service");
			if (h) e.service = a.services[h.replace(" ", "")];
			apikey = c.getAttribute("data-fp-apikey");
			if (apikey) a.setKey(apikey);
			a.exportFile(d, e);
			return false;
		};
	};
	var k = function () {
		if (document.querySelectorAll) {
			var a;
			var b = document.querySelectorAll('input[type="filepicker"]');
			for (a = 0; a < b.length; a++) d(b[a]);
			var c = document.querySelectorAll('input[type="filepicker-dragdrop"]');
			for (a = 0; a < c.length; a++) e(c[a]);
			var f = [];
			var g = document.querySelectorAll('button[data-fp-url]');
			for (a = 0; a < g.length; a++) f.push(g[a]);
			g = document.querySelectorAll('a[data-fp-url]');
			for (a = 0; a < g.length; a++) f.push(g[a]);
			g = document.querySelectorAll('input[type="button"][data-fp-url]');
			for (a = 0; a < g.length; a++) f.push(g[a]);
			for (a = 0; a < f.length; a++) j(f[a]);
		}
	};
	var l = function (a) {
		if (a.jquery) a = a[0];
		var b = a.getAttribute('type');
		if (b == 'filepicker') d(a);
		else if (b == 'filepicker-dragdrop') e(a);
		else j(a);
	};
	return {
		constructPickWidget: d,
		constructDragWidget: e,
		constructExportWidget: j,
		buildWidgets: k,
		constructWidget: l
	};
});
filepicker.extend('window', function () {
	var a = this;
	var b = {
		OPEN: '/dialog/open/',
		SAVEAS: '/dialog/save/'
	};
	var c = "filepicker_dialog";
	var d = "left=100,top=100,height=600,width=800,menubar=no,toolbar=no,location=no,personalbar=no,status=no,resizable=yes,scrollbars=yes,dependent=yes,dialog=yes";
	var e = 1000;
	var f = function () {
		if (document.body && document.body.offsetWidth) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
		if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
			winW = document.documentElement.offsetWidth;
			winH = document.documentElement.offsetHeight;
		}
		if (window.innerWidth && window.innerHeight) {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		return [winW, winH];
	};
	var g = function () {
		var b = f()[0] < 768;
		var c = a.cookies.THIRD_PARTY_COOKIES === false;
		return a.browser.isIOS() || a.browser.isAndroid() || b || c;
	};
	var h = function (b, f, h) {
		h = h || function () {};
		if (!b) b = 'modal';
		if (b == 'modal' && g()) b = 'window';
		if (b == 'window') {
			var i = c + a.util.getId();
			var j = window.open(f, i, d);
			var k = window.setInterval(function () {
				if (!j || j.closed) {
					window.clearInterval(k);
					h();
				}
			}, e);
		} else if (b == 'modal') a.modal.generate(f, h);
		else {
			var l = document.getElementById(b);
			if (!l) throw new a.FilepickerException("Container '" + b + "' not found. This should either be set to 'window','modal', or the ID of an iframe that is currently in the document.");
			l.src = f;
		}
	};
	return {
		open: h,
		WINDOW_NAME: c,
		getSize: f,
		shouldForce: g
	};
});
(function () {
	filepicker.internal(function () {
		var a = this;
		a.util.addOnLoad(a.cookies.checkThirdParty);
		a.util.addOnLoad(a.widgets.buildWidgets);
	});
	delete filepicker.internal;
	delete filepicker.extend;
	var a = filepicker._queue || [];
	var b;
	var c = a.length;
	if (c)
		for (var d = 0; d < c; d++) {
			b = a[d];
			filepicker[b[0]].apply(filepicker, b[1]);
		}
	if (filepicker._queue) delete filepicker._queue;
})();