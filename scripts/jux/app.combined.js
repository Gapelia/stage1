//     Backbone.js 0.9.9
//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org
///////////////////////////////////////////////////////////
// NOTE: removed Backbone.Model and Backbone.Collection  //
///////////////////////////////////////////////////////////
(function () {
  var e = this,
    t = e.Backbone,
    n = [],
    r = n.push,
    i = n.slice,
    s = n.splice,
    o;
  typeof exports != "undefined" ? o = exports : o = e.Backbone = {}, o.VERSION = "0.9.9";
  var u = e._;
  !u && typeof require != "undefined" && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender, o.noConflict = function () {
    return e.Backbone = t, this
  }, o.emulateHTTP = !1, o.emulateJSON = !1;
  var a = /\s+/,
    f = function (e, t, n, r) {
      if (!n) return !0;
      if (typeof n == "object")
        for (var i in n) e[t].apply(e, [i, n[i]].concat(r));
      else {
        if (!a.test(n)) return !0;
        var s = n.split(a);
        for (var o = 0, u = s.length; o < u; o++) e[t].apply(e, [s[o]].concat(r))
      }
    }, l = function (e, t, n) {
      var r, i = -1,
        s = t.length;
      switch (n.length) {
      case 0:
        while (++i < s)(r = t[i]).callback.call(r.ctx);
        return;
      case 1:
        while (++i < s)(r = t[i]).callback.call(r.ctx, n[0]);
        return;
      case 2:
        while (++i < s)(r = t[i]).callback.call(r.ctx, n[0], n[1]);
        return;
      case 3:
        while (++i < s)(r = t[i]).callback.call(r.ctx, n[0], n[1], n[2]);
        return;
      default:
        while (++i < s)(r = t[i]).callback.apply(r.ctx, n)
      }
    }, c = o.Events = {
      on: function (e, t, n) {
        if (!f(this, "on", e, [t, n]) || !t) return this;
        this._events || (this._events = {});
        var r = this._events[e] || (this._events[e] = []);
        return r.push({
          callback: t,
          context: n,
          ctx: n || this
        }), this
      },
      once: function (e, t, n) {
        if (!f(this, "once", e, [t, n]) || !t) return this;
        var r = this,
          i = u.once(function () {
            r.off(e, i), t.apply(this, arguments)
          });
        return i._callback = t, this.on(e, i, n), this
      },
      off: function (e, t, n) {
        var r, i, s, o, a, l, c, h;
        if (!this._events || !f(this, "off", e, [t, n])) return this;
        if (!e && !t && !n) return this._events = {}, this;
        o = e ? [e] : u.keys(this._events);
        for (a = 0, l = o.length; a < l; a++) {
          e = o[a];
          if (r = this._events[e]) {
            s = [];
            if (t || n)
              for (c = 0, h = r.length; c < h; c++) i = r[c], (t && t !== (i.callback._callback || i.callback) || n && n !== i.context) && s.push(i);
            this._events[e] = s
          }
        }
        return this
      },
      trigger: function (e) {
        if (!this._events) return this;
        var t = i.call(arguments, 1);
        if (!f(this, "trigger", e, t)) return this;
        var n = this._events[e],
          r = this._events.all;
        return n && l(this, n, t), r && l(this, r, arguments), this
      },
      listenTo: function (e, t, n) {
        var r = this._listeners || (this._listeners = {}),
          i = e._listenerId || (e._listenerId = u.uniqueId("l"));
        return r[i] = e, e.on(t, n || this, this), this
      },
      stopListening: function (e, t, n) {
        var r = this._listeners;
        if (!r) return;
        if (e) e.off(t, n, this), !t && !n && delete r[e._listenerId];
        else {
          for (var i in r) r[i].off(null, null, this);
          this._listeners = {}
        }
        return this
      }
    };
  c.bind = c.on, c.unbind = c.off, u.extend(o, c);
  var h = o.Router = function (e) {
    e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
  }, p = /\((.*?)\)/g,
    d = /:\w+/g,
    v = /\*\w+/g,
    m = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  u.extend(h.prototype, c, {
    initialize: function () {},
    route: function (e, t, n) {
      return u.isRegExp(e) || (e = this._routeToRegExp(e)), n || (n = this[t]), o.history.route(e, u.bind(function (r) {
        var i = this._extractParameters(e, r);
        n && n.apply(this, i), this.trigger.apply(this, ["route:" + t].concat(i)), o.history.trigger("route", this, t, i)
      }, this)), this
    },
    navigate: function (e, t) {
      return o.history.navigate(e, t), this
    },
    _bindRoutes: function () {
      if (!this.routes) return;
      var e, t = u.keys(this.routes);
      while ((e = t.pop()) != null) this.route(e, this.routes[e])
    },
    _routeToRegExp: function (e) {
      return e = e.replace(m, "\\$&").replace(p, "(?:$1)?").replace(d, "([^/]+)").replace(v, "(.*?)"), new RegExp("^" + e + "$")
    },
    _extractParameters: function (e, t) {
      return e.exec(t).slice(1)
    }
  });
  var g = o.History = function () {
    this.handlers = [], u.bindAll(this, "checkUrl"), typeof window != "undefined" && (this.location = window.location, this.history = window.history)
  }, y = /^[#\/]|\s+$/g,
    b = /^\/+|\/+$/g,
    w = /msie [\w.]+/,
    E = /\/$/;
  g.started = !1, u.extend(g.prototype, c, {
    interval: 50,
    getHash: function (e) {
      var t = (e || this).location.href.match(/#(.*)$/);
      return t ? t[1] : ""
    },
    getFragment: function (e, t) {
      if (e == null)
        if (this._hasPushState || !this._wantsHashChange || t) {
          e = this.location.pathname;
          var n = this.root.replace(E, "");
          e.indexOf(n) || (e = e.substr(n.length))
        } else e = this.getHash();
      return e.replace(y, "")
    },
    start: function (e) {
      if (g.started) throw new Error("Backbone.history has already been started");
      g.started = !0, this.options = u.extend({}, {
        root: "/"
      }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && this.history && this.history.pushState);
      var t = this.getFragment(),
        n = document.documentMode,
        r = w.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
      this.root = ("/" + this.root + "/").replace(b, "/"), r && this._wantsHashChange && (this.iframe = o.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? o.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? o.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = t;
      var i = this.location,
        s = i.pathname.replace(/[^\/]$/, "$&/") === this.root;
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !s) return this.fragment = this.getFragment(null, !0) + (this.fragment ? "&" + this.fragment : ""), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
      this._wantsPushState && this._hasPushState && s && i.hash && (this.fragment = this.getHash().replace(y, ""), this.history.replaceState({}, document.title, this.root + this.fragment + i.search));
      if (!this.options.silent) return this.loadUrl()
    },
    stop: function () {
      o.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), g.started = !1
    },
    route: function (e, t) {
      this.handlers.unshift({
        route: e,
        callback: t
      })
    },
    checkUrl: function (e) {
      var t = this.getFragment();
      t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe)));
      if (t === this.fragment) return !1;
      this.iframe && this.navigate(t), this.loadUrl() || this.loadUrl(this.getHash())
    },
    loadUrl: function (e) {
      var t = this.fragment = this.getFragment(e),
        n = u.any(this.handlers, function (e) {
          if (e.route.test(t)) return e.callback(t), !0
        });
      return n
    },
    navigate: function (e, t) {
      if (!g.started) return !1;
      if (!t || t === !0) t = {
        trigger: t
      };
      e = this.getFragment(e || "");
      if (this.fragment === e) return;
      this.fragment = e;
      var n = this.root + e;
      if (this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
      else {
        if (!this._wantsHashChange) return this.location.assign(n);
        this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
      }
      t.trigger && this.loadUrl(e)
    },
    _updateHash: function (e, t, n) {
      if (n) {
        var r = e.href.replace(/(javascript:|#).*$/, "");
        e.replace(r + "#" + t)
      } else e.hash = "#" + t
    }
  }), o.history = new g;
  var S = o.View = function (e) {
    this.cid = u.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
  }, x = /^(\S+)\s*(.*)$/,
    T = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
  u.extend(S.prototype, c, {
    tagName: "div",
    $: function (e) {
      return this.$el.find(e)
    },
    initialize: function () {},
    render: function () {
      return this
    },
    remove: function () {
      return this.$el.remove(), this.stopListening(), this
    },
    make: function (e, t, n) {
      var r = document.createElement(e);
      return t && o.$(r).attr(t), n != null && o.$(r).html(n), r
    },
    setElement: function (e, t) {
      return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
    },
    delegateEvents: function (e) {
      if (!e && !(e = u.result(this, "events"))) return;
      this.undelegateEvents();
      for (var t in e) {
        var n = e[t];
        u.isFunction(n) || (n = this[e[t]]);
        if (!n) throw new Error('Method "' + e[t] + '" does not exist');
        var r = t.match(x),
          i = r[1],
          s = r[2];
        n = u.bind(n, this), i += ".delegateEvents" + this.cid, s === "" ? this.$el.bind(i, n) : this.$el.delegate(s, i, n)
      }
    },
    undelegateEvents: function () {
      this.$el.unbind(".delegateEvents" + this.cid)
    },
    _configure: function (e) {
      this.options && (e = u.extend({}, u.result(this, "options"), e)), u.extend(this, u.pick(e, T)), this.options = e
    },
    _ensureElement: function () {
      if (!this.el) {
        var e = u.extend({}, u.result(this, "attributes"));
        this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className")), this.setElement(this.make(u.result(this, "tagName"), e), !1)
      } else this.setElement(u.result(this, "el"), !1)
    }
  });
  var N = {
    create: "POST",
    update: "PUT",
    patch: "PATCH",
    "delete": "DELETE",
    read: "GET"
  };
  o.sync = function (e, t, n) {
    var r = N[e];
    u.defaults(n || (n = {}), {
      emulateHTTP: o.emulateHTTP,
      emulateJSON: o.emulateJSON
    });
    var i = {
      type: r,
      dataType: "json"
    };
    n.url || (i.url = u.result(t, "url") || k()), n.data == null && t && (e === "create" || e === "update" || e === "patch") && (i.contentType = "application/json", i.data = JSON.stringify(n.attrs || t.toJSON(n))), n.emulateJSON && (i.contentType = "application/x-www-form-urlencoded", i.data = i.data ? {
      model: i.data
    } : {});
    if (n.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) {
      i.type = "POST", n.emulateJSON && (i.data._method = r);
      var s = n.beforeSend;
      n.beforeSend = function (e) {
        e.setRequestHeader("X-HTTP-Method-Override", r);
        if (s) return s.apply(this, arguments)
      }
    }
    i.type !== "GET" && !n.emulateJSON && (i.processData = !1);
    var a = n.success;
    n.success = function (e, r, i) {
      a && a(e, r, i), t.trigger("sync", t, e, n)
    };
    var f = n.error;
    n.error = function (e, r, i) {
      f && f(t, e, n), t.trigger("error", t, e, n)
    };
    var l = o.ajax(u.extend(i, n));
    return t.trigger("request", t, l, n), l
  }, o.ajax = function () {
    return o.$.ajax.apply(o.$, arguments)
  };
  var C = function (e, t) {
    var n = this,
      r;
    e && u.has(e, "constructor") ? r = e.constructor : r = function () {
      n.apply(this, arguments)
    }, u.extend(r, n, t);
    var i = function () {
      this.constructor = r
    };
    return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
  };
  h.extend = S.extend = g.extend = C;
  var k = function () {
    throw new Error('A "url" property or function must be specified')
  }
}).call(this),
function () {
  var e = Backbone.Events.unbind = function (e, t, n) {
    var r;
    if (!e) this._callbacks = {};
    else if (r = this._callbacks)
      if (!t) r[e] = [];
      else {
        var i = r[e];
        if (!i) return this;
        for (var s = 0, o = i.length; s < o; s++)
          if (i[s] && t === i[s][0] && (!n || n === i[s][1])) {
            i[s] = null;
            break
          }
      }
    return this
  };
  Backbone.Router.prototype.unbind = e, Backbone.View.prototype.unbind = e
}(),
function (e) {
  e.fn.endlessScroll = function (t) {
    var n = {
      bottomPixels: 50,
      fireOnce: !0,
      fireDelay: 150,
      loader: "<br />Loading...<br />",
      data: "",
      insertAfter: "div:last",
      resetCounter: function () {
        return !1
      },
      callback: function () {
        return !0
      },
      ceaseFire: function () {
        return !1
      },
      performInitialKick: !1,
      intervalFrequency: 250
    }, t = e.extend({}, n, t),
      r = !0,
      i = !1,
      s = 0,
      o = !1,
      u = this.get(0),
      a;
    t.ceaseFire.apply(this) === !0 && (r = !1), e(this).scroll(function () {
      o = !0
    }), t.performInitialKick && t.callback();
    var f = e(u).height(),
      l = e(u),
      c = e(document),
      h = e(window);
    setInterval(function () {
      if (o && r === !0) {
        o = !1;
        if (t.ceaseFire.apply(u) === !0) {
          r = !1;
          return
        }
        t.onScroll && t.onScroll.call(u), u == window || u == document ? a = c.height() - h.height() <= h.scrollTop() + t.bottomPixels : a = l.prop("scrollHeight") - f <= l.scrollTop() + t.bottomPixels, a && (t.fireOnce == 0 || t.fireOnce == 1 && i != 1) && (t.resetCounter.apply(u) === !0 && (s = 0), i = !0, s++, e(t.insertAfter).after('<div id="endless_scroll_loader">' + t.loader + "</div>"), data = typeof t.data == "function" ? t.data.apply(u, [s]) : t.data, data !== !1 && (e(t.insertAfter).after('<div id="endless_scroll_data">' + data + "</div>"), e("#endless_scroll_data").hide().fadeIn(250, function () {
          e(this).removeAttr("id")
        }), t.callback.apply(u, [s]), t.fireDelay !== !1 || t.fireDelay !== 0 ? (e('<div id="endless_scroll_marker"></div>').appendTo("body"), e("#endless_scroll_marker").fadeTo(t.fireDelay, 1, function () {
          e(this).remove(), i = !1
        })) : i = !1), e("#endless_scroll_loader").remove())
      }
    }, t.intervalFrequency)
  }
}(jQuery),
function (e) {
  e.Fillmore = function (e) {
    this.init(e)
  }, e.Fillmore.defaultSettings = {
    src: null,
    mode: "cover",
    focusX: 50,
    focusY: 50,
    speed: 0,
    onImageLoad: undefined,
    onImageVisible: undefined,
    callback: undefined
  };
  var t = function (e, t, n) {
    function r(e) {
      v.cssText = e
    }

    function i(e, t) {
      return r(prefixes.join(e + ";") + (t || ""))
    }

    function s(e, t) {
      return typeof e === t
    }

    function o(e, t) {
      return !!~("" + e).indexOf(t)
    }

    function u(e, t) {
      for (var r in e) {
        var i = e[r];
        if (!o(i, "-") && v[i] !== n) return t == "pfx" ? i : !0
      }
      return !1
    }

    function a(e, t, r) {
      for (var i in e) {
        var o = t[e[i]];
        if (o !== n) return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o
      }
      return !1
    }

    function f(e, t, n) {
      var r = e.charAt(0).toUpperCase() + e.slice(1),
        i = (e + " " + b.join(r + " ") + r).split(" ");
      return s(t, "string") || s(t, "undefined") ? u(i, t) : (i = (e + " " + w.join(r + " ") + r).split(" "), a(i, t, n))
    }
    var l = "2.6.2",
      c = {}, h = t.documentElement,
      p = "modernizr",
      d = t.createElement(p),
      v = d.style,
      m, g = {}.toString,
      y = "Webkit Moz O ms",
      b = y.split(" "),
      w = y.toLowerCase().split(" "),
      E = {}, S = {}, x = {}, T = [],
      N = T.slice,
      C, k = {}.hasOwnProperty,
      L;
    !s(k, "undefined") && !s(k.call, "undefined") ? L = function (e, t) {
      return k.call(e, t)
    } : L = function (e, t) {
      return t in e && s(e.constructor.prototype[t], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
      var t = this;
      if (typeof t != "function") throw new TypeError;
      var n = N.call(arguments, 1),
        r = function () {
          if (this instanceof r) {
            var i = function () {};
            i.prototype = t.prototype;
            var s = new i,
              o = t.apply(s, n.concat(N.call(arguments)));
            return Object(o) === o ? o : s
          }
          return t.apply(e, n.concat(N.call(arguments)))
        };
      return r
    }), E.backgroundsize = function () {
      return f("backgroundSize")
    };
    for (var A in E) L(E, A) && (C = A.toLowerCase(), c[C] = E[A](), T.push((c[C] ? "" : "no-") + C));
    return c.addTest = function (e, t) {
      if (typeof e == "object")
        for (var r in e) L(e, r) && c.addTest(r, e[r]);
      else {
        e = e.toLowerCase();
        if (c[e] !== n) return c;
        t = typeof t == "function" ? t() : t, typeof enableClasses != "undefined" && enableClasses && (h.className += " " + (t ? "" : "no-") + e), c[e] = t
      }
      return c
    }, r(""), d = m = null, c._version = l, c._domPrefixes = w, c._cssomPrefixes = b, c.testProp = function (e) {
      return u([e])
    }, c.testAllProps = f, c
  }(this, this.document);
  e.Fillmore.useCss3 = t.backgroundsize && !/i(Phone|Pod|Pad).*OS 4_/.test(window.navigator.userAgent), e.extend(e.Fillmore.prototype, {
    fillmoreElPosition: "absolute",
    imageLoaded: !1,
    imageVisible: !1,
    init: function (t) {
      this.settings = e.extend({}, e.Fillmore.defaultSettings);
      var n = this.$containerEl = e(t);
      n.css("background", "transparent"), n.is("body") ? this.fillmoreElPosition = "fixed" : (this.originalContainerOverflow = n.css("overflow"), n.css("overflow", "hidden"), n.css("position") === "static" && (n.css("position", "relative"), this.containerPositionModified = !0), n.css("z-index") === "auto" && (n.css("z-index", 0), this.containerZIndexModified = !0)), this.$containerEl.is("body") ? this.$containerSizingEl = "onorientationchange" in window ? e(document) : e(window) : this.$containerSizingEl = this.$containerEl, this.createFillmoreEl()
    },
    createFillmoreEl: function () {
      this.$fillmoreEl = e('<div class="fillmoreInner" style="left: 0; top: 0; position: ' + this.fillmoreElPosition + '; overflow: hidden; margin: 0; padding: 0; height: 100%; width: 100%;" />').appendTo(this.$containerEl)
    },
    updateSettings: function (t) {
      this.settings = e.extend(this.settings, t)
    },
    getSrc: function () {
      return this.settings.src
    },
    getImageEl: function () {
      throw new Error("getImageEl() must be implemented in subclass")
    },
    getImageSize: function () {
      if (!this.imageLoaded) return null;
      var e = this.getImageEl(),
        t = e[0];
      return {
        width: t.width || e.width(),
        height: t.height || e.height()
      }
    },
    calculateStretchedSizeAndOffsets: function () {
      var e = this.getImageEl();
      e.css({
        width: "auto",
        height: "auto"
      });
      var t = this.getImageSize(),
        n = t.width,
        r = t.height,
        i = n / r,
        s = this.settings,
        o = this.$containerSizingEl,
        u = 0,
        a = 0,
        f, l, c, h;
      if (s.mode === "frame") {
        l = o.height(), f = o.width();
        if (n > f || r > l) {
          var p = f / l;
          p > i ? (h = l, c = l / r * n) : (c = f, h = f / n * r)
        } else c = n, h = r;
        c < f && (u = (f - c) / 2), h < l && (a = (l - h) / 2)
      } else l = o.outerHeight() || o.height(), f = o.outerWidth() || o.width(), c = f, h = c / i, h >= l ? a = -1 * (h - l) * this.settings.focusY / 100 : (h = l, c = h * i, u = -1 * (c - f) * this.settings.focusX / 100);
      return {
        offsetLeft: u,
        offsetTop: a,
        stretchedWidth: c,
        stretchedHeight: h
      }
    },
    getViewableImageArea: function () {
      if (!this.imageLoaded) return null;
      var e = this.$containerEl,
        t = this.calculateStretchedSizeAndOffsets();
      return {
        width: e.innerWidth(),
        height: e.innerHeight(),
        offsetLeft: t.offsetLeft,
        offsetTop: t.offsetTop,
        stretchedWidth: t.stretchedWidth,
        stretchedHeight: t.stretchedHeight
      }
    },
    showImage: function (e) {
      this.imageLoaded = !1, this.imageVisible = !1, this.loadImage(e)
    },
    loadImage: function () {
      throw new Error("loadImage() must be implemented in subclass")
    },
    isLoaded: function () {
      return this.imageIsVisible()
    },
    imageIsLoaded: function () {
      return this.imageLoaded
    },
    imageIsVisible: function () {
      return this.imageVisible
    },
    resize: function () {
      throw new Error("resize() must be implemented in subclass")
    },
    onImageLoad: function (t) {
      this.imageLoaded = !0;
      var n = this.settings.onImageLoad;
      typeof n == "function" && n(), this.settings.speed ? (this.$fillmoreEl.hide().fadeIn(this.settings.speed, e.proxy(this.onImageVisible, this)), this.settings.speed = 0) : this.onImageVisible()
    },
    onImageVisible: function (e) {
      this.imageVisible = !0;
      var t = this.settings,
        n = t.onImageVisible || t.callback;
      typeof n == "function" && n()
    },
    destroy: function () {
      this.containerPositionModified && this.$containerEl.css("position", ""), this.containerZIndexModified && this.$containerEl.css("z-index", ""), this.$containerEl.css("overflow", this.originalContainerOverflow), this.$fillmoreEl.remove()
    }
  })
}(jQuery),
function (e) {
  e.FillmoreCss3 = function (t) {
    e.Fillmore.apply(this, arguments)
  }, e.extend(e.FillmoreCss3.prototype, e.Fillmore.prototype, {
    $imgEl: null,
    createFillmoreEl: function () {
      e.Fillmore.prototype.createFillmoreEl.apply(this, arguments), this.$fillmoreEl.css("background-repeat", "no-repeat")
    },
    updateSettings: function (t) {
      e.Fillmore.prototype.updateSettings.apply(this, arguments), this.$fillmoreEl.css("background-position", this.settings.focusX + "% " + this.settings.focusY + "%")
    },
    getImageEl: function () {
      return this.$imgEl || null
    },
    resize: function () {},
    loadImage: function (t) {
      this.$imgEl = e("<img />").on("load error", e.proxy(this.onImageLoad, this)), this.$imgEl.attr("src", t)
    },
    onImageLoad: function (t) {
      var n = this.$imgEl.attr("src");
      this.$fillmoreEl.css("background-image", "url('" + n + "')"), e.Fillmore.prototype.onImageLoad.apply(this, arguments)
    }
  })
}(jQuery),
function (e) {
  e.FillmoreCss3Frame = function (t) {
    e.FillmoreCss3.apply(this, arguments)
  }, e.extend(e.FillmoreCss3Frame.prototype, e.FillmoreCss3.prototype, {
    onImageLoad: function (t) {
      e.FillmoreCss3.prototype.onImageLoad.apply(this, arguments);
      var n = this.getImageSize(),
        r = this.$fillmoreEl;
      (r.width() < n.width || r.height() < n.height) && r.css("background-size", "contain")
    }
  })
}(jQuery),
function (e) {
  e.FillmoreCss3Cover = function (t) {
    e.FillmoreCss3.apply(this, arguments)
  }, e.extend(e.FillmoreCss3Cover.prototype, e.FillmoreCss3.prototype, {
    createFillmoreEl: function () {
      e.FillmoreCss3.prototype.createFillmoreEl.apply(this, arguments), this.$fillmoreEl.css("background-size", "cover")
    }
  })
}(jQuery),
function (e) {
  e.FillmoreImageStretch = function (t) {
    e.Fillmore.apply(this, arguments)
  }, e.extend(e.FillmoreImageStretch.prototype, e.Fillmore.prototype, {
    $imgEl: null,
    $oldImage: null,
    init: function (t) {
      e.Fillmore.prototype.init.apply(this, arguments), this.resizeProxy = e.proxy(this.resize, this), e(window).resize(this.resizeProxy)
    },
    getImageEl: function () {
      return this.$imgEl || null
    },
    loadImage: function (t) {
      this.$oldImage = this.$imgEl, this.$imgEl = e('<img style="position: absolute; margin: 0; padding: 0; border: none; z-index: -999999;" />').on("load error", e.proxy(this.onImageLoad, this)).appendTo(this.$fillmoreEl), this.$imgEl.attr("src", t)
    },
    onImageLoad: function (t) {
      var n = t.target,
        r = this.getImageEl();
      if (n !== r[0]) return;
      this.$oldImage && (this.$oldImage.remove(), this.$oldImage = null), e.Fillmore.prototype.onImageLoad.apply(this, arguments), this.resize()
    },
    resize: function () {
      if (this.$imgEl && this.imageLoaded) try {
        var e = this.calculateStretchedSizeAndOffsets(),
          t = {
            left: e.offsetLeft,
            top: e.offsetTop
          };
        this.settings.mode === "frame" ? this.$fillmoreEl.width("100%").height("100%") : this.$fillmoreEl.width(e.stretchedWidth).height(e.stretchedHeight), this.$imgEl.width(e.stretchedWidth).height(e.stretchedHeight).css(t)
      } catch (n) {}
    },
    destroy: function () {
      e(window).unbind("resize", this.resizeProxy), e.Fillmore.prototype.destroy.apply(this, arguments)
    }
  })
}(jQuery),
function (e) {
  var t = {
    init: function (t) {
      for (var n = 0, r = this.length; n < r; n++) {
        var i = this[n],
          s = e(i),
          o = s.data("fillmore");
        if (!o) {
          if (e.Fillmore.useCss3 && !t.noCss3 || t.forceCss3) switch (t.mode) {
          case "frame":
            o = new e.FillmoreCss3Frame(i);
            break;
          default:
            o = new e.FillmoreCss3Cover(i)
          } else o = new e.FillmoreImageStretch(i);
          s.data("fillmore", o)
        }
        o.updateSettings(t), o.showImage(t.src)
      }
      return this
    },
    getSrc: function () {
      var t = this[0],
        n;
      return t && (n = e(t).data("fillmore")) ? n.getSrc() : undefined
    },
    getImageSize: function () {
      var t = this[0],
        n;
      return t && (n = e(t).data("fillmore")) ? n.getImageSize() : undefined
    },
    getViewableImageArea: function () {
      var t = this[0],
        n;
      return t && (n = e(t).data("fillmore")) ? n.getViewableImageArea() : undefined
    },
    isLoaded: function () {
      var t = this[0],
        n;
      return t && (n = e(t).data("fillmore")) ? n.isLoaded() : !1
    },
    imageIsLoaded: function () {
      var t = this[0],
        n;
      return t && (n = e(t).data("fillmore")) ? n.imageIsLoaded() : !1
    },
    imageIsVisible: function () {
      var t = this[0],
        n;
      return t && (n = e(t).data("fillmore")) ? n.imageIsVisible() : !1
    },
    resize: function () {
      for (var t = 0, n = this.length; t < n; t++) {
        var r = e(this[t]),
          i = r.data("fillmore");
        i && i.resize()
      }
      return this
    },
    destroy: function () {
      for (var t = 0, n = this.length; t < n; t++) {
        var r = e(this[t]),
          i = r.data("fillmore");
        i && (i.destroy(), r.removeData("fillmore"))
      }
      return this
    }
  };
  e.fn.fillmore = function (n) {
    if (typeof n == "string" && t[n]) return t[n].apply(this, Array.prototype.slice.call(arguments, 1));
    if (typeof n == "object" || !n) return t.init.apply(this, arguments);
    e.error("Method '" + n + "' does not exist on Fillmore.")
  }, e.fillmore = function (t) {
    return e("body").fillmore(t)
  }
}(jQuery),
function (e) {
  e.fn.fitText = function (t) {
    return this.each(function () {
      var n = e(this);
      n.attr("origFontSize", n.attr("origFontSize") || parseFloat(n.css("font-size")));
      var r = t || 1,
        i = function () {
          n.css("font-size", Math.min(e(window).width() * .58 / (r * 10), n.attr("origFontSize")))
        };
      i();
      var s = n.data("windowResizeHandler");
      s && e(window).unbind("resize", s), e(window).bind("resize", i), n.data("windowResizeHandler", i)
    })
  }
}(jQuery),
function (e) {
  function r(t) {
    var n = t || window.event,
      r = [].slice.call(arguments, 1),
      i = 0,
      s = !0,
      o = 0,
      u = 0;
    return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
  }
  var t = ["DOMMouseScroll", "mousewheel"];
  if (e.event.fixHooks)
    for (var n = t.length; n;) e.event.fixHooks[t[--n]] = e.event.mouseHooks;
  e.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener)
        for (var e = t.length; e;) this.addEventListener(t[--e], r, !1);
      else this.onmousewheel = r
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var e = t.length; e;) this.removeEventListener(t[--e], r, !1);
      else this.onmousewheel = null
    }
  }, e.fn.extend({
    mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    },
    unmousewheel: function (e) {
      return this.unbind("mousewheel", e)
    }
  })
}(jQuery),
function (e) {
  function n(e, t) {
    return e = "//json-proxy.herokuapp.com/?url=" + encodeURIComponent(e), t && (e += "&raw=true"), e
  }
  var t = /^(?:(?:(?:((?:file|https?):))?\/\/)?((?:[\w\-]\.?)+(?::\d+)?)?(\/\S*)?)$/i;
  e.jsonp = function (r) {
    var i = e.jsonp.getLocation(),
      s = r.url || i.href,
      o = s.match(t),
      u = i.protocol,
      a = o[1] || u,
      f = o[2] || i.host,
      l = r.dataType,
      c = l === "text";
    r = e.extend({}, r);
    if (a !== i.protocol || f !== i.host) {
      var h = o[3] || "";
      s = a + "//" + f + h;
      if (e.support.cors) {
        if (!r.corsSupport || u === "https:" && a !== u) r.url = n(s, c)
      } else {
        if (!r.jsonpSupport) {
          r.url = n(s, c);
          var p = r.success;
          c && p && (r.success = function (e) {
            p.call(r.context || this, e.data)
          })
        }
        l = "jsonp"
      }
    }
    return l === "jsonp" && (r.timeout = r.timeout || 1e4), r.dataType = l || "json", e.ajax(r)
  }, e.jsonp.getLocation = function () {
    return window.location
  }
}(jQuery),
function (e) {
  e.tooltipsy = function (t, n) {
    this.options = n, this.$el = e(t), this.title = this.$el.attr("title") || "", this.$el.attr("title", ""), this.random = parseInt(Math.random() * 1e4), this.ready = !1, this.shown = !1, this.width = 0, this.height = 0, this.delaytimer = null, this.$el.data("tooltipsy", this), this.init()
  }, e.tooltipsy.prototype.init = function () {
    var t = this;
    t.settings = e.extend({}, t.defaults, t.options), t.settings.delay = parseInt(t.settings.delay), typeof t.settings.content == "function" && t.readify(), t.settings.showEvent === t.settings.hideEvent && t.settings.showEvent === "click" ? t.$el.toggle(function (e) {
      t.settings.showEvent === "click" && t.$el[0].tagName == "A" && e.preventDefault(), t.settings.delay > 0 ? t.delaytimer = window.setTimeout(function () {
        t.show(e)
      }, t.settings.delay) : t.show(e)
    }, function (e) {
      t.settings.showEvent === "click" && t.$el[0].tagName == "A" && e.preventDefault(), window.clearTimeout(t.delaytimer), t.delaytimer = null, t.hide(e)
    }) : t.$el.bind(t.settings.showEvent, function (e) {
      t.settings.showEvent === "click" && t.$el[0].tagName == "A" && e.preventDefault(), t.settings.delay > 0 ? t.delaytimer = window.setTimeout(function () {
        t.show(e)
      }, t.settings.delay) : t.show(e)
    }).bind(t.settings.hideEvent, function (e) {
      t.settings.showEvent === "click" && t.$el[0].tagName == "A" && e.preventDefault(), window.clearTimeout(t.delaytimer), t.delaytimer = null, t.hide(e)
    })
  }, e.tooltipsy.prototype.show = function (t) {
    var n = this;
    n.ready === !1 && n.readify(), n.shown === !1 && (function (e) {
      var t = 0,
        n;
      for (n in e) e.hasOwnProperty(n) && t++;
      return t
    }(n.settings.css) > 0 && n.$tip.css(n.settings.css), n.width = n.$tipsy.outerWidth(), n.height = n.$tipsy.outerHeight());
    if (n.settings.alignTo === "cursor" && t) {
      var r = [t.pageX + n.settings.offset[0], t.pageY + n.settings.offset[1]];
      if (r[0] + n.width > e(window).width()) var i = {
        top: r[1] + "px",
        right: r[0] + "px",
        left: "auto"
      };
      else var i = {
        top: r[1] + "px",
        left: r[0] + "px",
        right: "auto"
      }
    } else var r = [
      function (e) {
        return n.settings.offset[0] < 0 ? e.left - Math.abs(n.settings.offset[0]) - n.width : n.settings.offset[0] === 0 ? e.left - (n.width - n.$el.outerWidth()) / 2 : e.left + n.$el.outerWidth() + n.settings.offset[0]
      }(n.offset(n.$el[0])),
      function (e) {
        return n.settings.offset[1] < 0 ? e.top - Math.abs(n.settings.offset[1]) - n.height : n.settings.offset[1] === 0 ? e.top - (n.height - n.$el.outerHeight()) / 2 : e.top + n.$el.outerHeight() + n.settings.offset[1]
      }(n.offset(n.$el[0]))
    ];
    n.$tipsy.css({
      top: r[1] + "px",
      left: r[0] + "px"
    }), n.settings.show(t, n.$tipsy.stop(!0, !0))
  }, e.tooltipsy.prototype.hide = function (e) {
    var t = this;
    if (t.ready === !1) return;
    if (e && e.relatedTarget === t.$tip[0]) {
      t.$tip.bind("mouseleave", function (e) {
        if (e.relatedTarget === t.$el[0]) return;
        t.settings.hide(e, t.$tipsy.stop(!0, !0))
      });
      return
    }
    t.settings.hide(e, t.$tipsy.stop(!0, !0))
  }, e.tooltipsy.prototype.readify = function () {
    this.ready = !0, this.$tipsy = e('<div id="tooltipsy' + this.random + '" style="position:absolute;z-index:2147483647;display:none">').appendTo("body"), this.$tip = e('<div class="' + this.settings.className + '">').appendTo(this.$tipsy), this.$tip.data("rootel", this.$el);
    var t = this.$el,
      n = this.$tip;
    this.$tip.html(this.settings.content != "" ? typeof this.settings.content == "string" ? this.settings.content : this.settings.content(t, n) : this.title)
  }, e.tooltipsy.prototype.offset = function (e) {
    var t = ot = 0;
    if (e.offsetParent)
      do e.tagName != "BODY" && (t += e.offsetLeft - e.scrollLeft, ot += e.offsetTop - e.scrollTop); while (e = e.offsetParent);
    return {
      left: t,
      top: ot
    }
  }, e.tooltipsy.prototype.destroy = function () {
    this.$tipsy.remove(), e.removeData(this.$el, "tooltipsy")
  }, e.tooltipsy.prototype.defaults = {
    alignTo: "element",
    offset: [0, -1],
    content: "",
    show: function (e, t) {
      t.fadeIn(100)
    },
    hide: function (e, t) {
      t.fadeOut(100)
    },
    css: {},
    className: "tooltipsy",
    delay: 200,
    showEvent: "mouseenter",
    hideEvent: "mouseleave"
  }, e.fn.tooltipsy = function (t) {
    return this.each(function () {
      new e.tooltipsy(this, t)
    })
  }
}(jQuery),
function (e, t) {
  function A(e) {
    return i === "" ? e : (e = e.charAt(0).toUpperCase() + e.substr(1), i + e)
  }
  var n = Math,
    r = t.createElement("div").style,
    i = function () {
      var e = "t,webkitT,MozT,msT,OT".split(","),
        t, n = 0,
        i = e.length;
      for (; n < i; n++) {
        t = e[n] + "ransform";
        if (t in r) return e[n].substr(0, e[n].length - 1)
      }
      return !1
    }(),
    s = i ? "-" + i.toLowerCase() + "-" : "",
    o = A("transform"),
    u = A("transitionProperty"),
    a = A("transitionDuration"),
    f = A("transformOrigin"),
    l = A("transitionTimingFunction"),
    c = A("transitionDelay"),
    h = /android/gi.test(navigator.appVersion),
    p = /iphone|ipad/gi.test(navigator.appVersion),
    d = /hp-tablet/gi.test(navigator.appVersion),
    v = A("perspective") in r,
    m = "ontouchstart" in e && !d,
    g = i !== !1,
    y = A("transition") in r,
    b = "onorientationchange" in e ? "orientationchange" : "resize",
    w = m ? "touchstart" : "mousedown",
    E = m ? "touchmove" : "mousemove",
    S = m ? "touchend" : "mouseup",
    x = m ? "touchcancel" : "mouseup",
    T = function () {
      if (i === !1) return !1;
      var e = {
        "": "transitionend",
        webkit: "webkitTransitionEnd",
        Moz: "transitionend",
        O: "otransitionend",
        ms: "MSTransitionEnd"
      };
      return e[i]
    }(),
    N = function () {
      return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
        return setTimeout(e, 1)
      }
    }(),
    C = function () {
      return e.cancelRequestAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame || e.mozCancelRequestAnimationFrame || e.oCancelRequestAnimationFrame || e.msCancelRequestAnimationFrame || clearTimeout
    }(),
    k = v ? " translateZ(0)" : "",
    L = function (n, r) {
      var i = this,
        c;
      i.wrapper = typeof n == "object" ? n : t.getElementById(n), i.wrapper.style.overflow = "hidden", i.scroller = i.wrapper.children[0], i.options = {
        hScroll: !0,
        vScroll: !0,
        x: 0,
        y: 0,
        bounce: !0,
        bounceLock: !1,
        momentum: !0,
        lockDirection: !0,
        useTransform: !0,
        useTransition: !1,
        topOffset: 0,
        checkDOMChanges: !1,
        handleClick: !0,
        hScrollbar: !0,
        vScrollbar: !0,
        fixedScrollbar: h,
        hideScrollbar: p,
        fadeScrollbar: p && v,
        scrollbarClass: "",
        zoom: !1,
        zoomMin: 1,
        zoomMax: 4,
        doubleTapZoom: 2,
        wheelAction: "scroll",
        snap: !1,
        snapThreshold: 1,
        onRefresh: null,
        onBeforeScrollStart: function (e) {
          e.preventDefault()
        },
        onScrollStart: null,
        onBeforeScrollMove: null,
        onScrollMove: null,
        onBeforeScrollEnd: null,
        onScrollEnd: null,
        onTouchEnd: null,
        onDestroy: null,
        onZoomStart: null,
        onZoom: null,
        onZoomEnd: null
      };
      for (c in r) i.options[c] = r[c];
      i.x = i.options.x, i.y = i.options.y, i.options.useTransform = g && i.options.useTransform, i.options.hScrollbar = i.options.hScroll && i.options.hScrollbar, i.options.vScrollbar = i.options.vScroll && i.options.vScrollbar, i.options.zoom = i.options.useTransform && i.options.zoom, i.options.useTransition = y && i.options.useTransition, i.options.zoom && h && (k = ""), i.scroller.style[u] = i.options.useTransform ? s + "transform" : "top left", i.scroller.style[a] = "0", i.scroller.style[f] = "0 0", i.options.useTransition && (i.scroller.style[l] = "cubic-bezier(0.33,0.66,0.66,1)"), i.options.useTransform ? i.scroller.style[o] = "translate(" + i.x + "px," + i.y + "px)" + k : i.scroller.style.cssText += ";position:absolute;top:" + i.y + "px;left:" + i.x + "px", i.options.useTransition && (i.options.fixedScrollbar = !0), i.refresh(), i._bind(b, e), i._bind(w), m || i.options.wheelAction != "none" && (i._bind("DOMMouseScroll"), i._bind("mousewheel")), i.options.checkDOMChanges && (i.checkDOMTime = setInterval(function () {
        i._checkDOMChanges()
      }, 500))
    };
  L.prototype = {
    enabled: !0,
    x: 0,
    y: 0,
    steps: [],
    scale: 1,
    currPageX: 0,
    currPageY: 0,
    pagesX: [],
    pagesY: [],
    aniTime: null,
    wheelZoomCount: 0,
    handleEvent: function (e) {
      var t = this;
      switch (e.type) {
      case w:
        if (!m && e.button !== 0) return;
        t._start(e);
        break;
      case E:
        t._move(e);
        break;
      case S:
      case x:
        t._end(e);
        break;
      case b:
        t._resize();
        break;
      case "DOMMouseScroll":
      case "mousewheel":
        t._wheel(e);
        break;
      case T:
        t._transitionEnd(e)
      }
    },
    _checkDOMChanges: function () {
      if (this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale) return;
      this.refresh()
    },
    _scrollbar: function (e) {
      var r = this,
        i;
      if (!r[e + "Scrollbar"]) {
        r[e + "ScrollbarWrapper"] && (g && (r[e + "ScrollbarIndicator"].style[o] = ""), r[e + "ScrollbarWrapper"].parentNode.removeChild(r[e + "ScrollbarWrapper"]), r[e + "ScrollbarWrapper"] = null, r[e + "ScrollbarIndicator"] = null);
        return
      }
      r[e + "ScrollbarWrapper"] || (i = t.createElement("div"), r.options.scrollbarClass ? i.className = r.options.scrollbarClass + e.toUpperCase() : i.style.cssText = "position:absolute;z-index:100;" + (e == "h" ? "height:7px;bottom:1px;left:2px;right:" + (r.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (r.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), i.style.cssText += ";pointer-events:none;" + s + "transition-property:opacity;" + s + "transition-duration:" + (r.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (r.options.hideScrollbar ? "0" : "1"), r.wrapper.appendChild(i), r[e + "ScrollbarWrapper"] = i, i = t.createElement("div"), r.options.scrollbarClass || (i.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + s + "background-clip:padding-box;" + s + "box-sizing:border-box;" + (e == "h" ? "height:100%" : "width:100%") + ";" + s + "border-radius:3px;border-radius:3px"), i.style.cssText += ";pointer-events:none;" + s + "transition-property:" + s + "transform;" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + s + "transition-duration:0;" + s + "transform: translate(0,0)" + k, r.options.useTransition && (i.style.cssText += ";" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), r[e + "ScrollbarWrapper"].appendChild(i), r[e + "ScrollbarIndicator"] = i), e == "h" ? (r.hScrollbarSize = r.hScrollbarWrapper.clientWidth, r.hScrollbarIndicatorSize = n.max(n.round(r.hScrollbarSize * r.hScrollbarSize / r.scrollerW), 8), r.hScrollbarIndicator.style.width = r.hScrollbarIndicatorSize + "px", r.hScrollbarMaxScroll = r.hScrollbarSize - r.hScrollbarIndicatorSize, r.hScrollbarProp = r.hScrollbarMaxScroll / r.maxScrollX) : (r.vScrollbarSize = r.vScrollbarWrapper.clientHeight, r.vScrollbarIndicatorSize = n.max(n.round(r.vScrollbarSize * r.vScrollbarSize / r.scrollerH), 8), r.vScrollbarIndicator.style.height = r.vScrollbarIndicatorSize + "px", r.vScrollbarMaxScroll = r.vScrollbarSize - r.vScrollbarIndicatorSize, r.vScrollbarProp = r.vScrollbarMaxScroll / r.maxScrollY), r._scrollbarPos(e, !0)
    },
    _resize: function () {
      var e = this;
      setTimeout(function () {
        e.refresh()
      }, h ? 200 : 0)
    },
    _pos: function (e, t) {
      if (this.zoomed) return;
      e = this.hScroll ? e : 0, t = this.vScroll ? t : 0, this.options.useTransform ? this.scroller.style[o] = "translate(" + e + "px," + t + "px) scale(" + this.scale + ")" + k : (e = n.round(e), t = n.round(t), this.scroller.style.left = e + "px", this.scroller.style.top = t + "px"), this.x = e, this.y = t, this._scrollbarPos("h"), this._scrollbarPos("v")
    },
    _scrollbarPos: function (e, t) {
      var r = this,
        i = e == "h" ? r.x : r.y,
        s;
      if (!r[e + "Scrollbar"]) return;
      i = r[e + "ScrollbarProp"] * i, i < 0 ? (r.options.fixedScrollbar || (s = r[e + "ScrollbarIndicatorSize"] + n.round(i * 3), s < 8 && (s = 8), r[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = s + "px"), i = 0) : i > r[e + "ScrollbarMaxScroll"] && (r.options.fixedScrollbar ? i = r[e + "ScrollbarMaxScroll"] : (s = r[e + "ScrollbarIndicatorSize"] - n.round((i - r[e + "ScrollbarMaxScroll"]) * 3), s < 8 && (s = 8), r[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = s + "px", i = r[e + "ScrollbarMaxScroll"] + (r[e + "ScrollbarIndicatorSize"] - s))), r[e + "ScrollbarWrapper"].style[c] = "0", r[e + "ScrollbarWrapper"].style.opacity = t && r.options.hideScrollbar ? "0" : "1", r[e + "ScrollbarIndicator"].style[o] = "translate(" + (e == "h" ? i + "px,0)" : "0," + i + "px)") + k
    },
    _start: function (t) {
      var r = this,
        i = m ? t.touches[0] : t,
        s, u, a, f, l;
      if (!r.enabled) return;
      r.options.onBeforeScrollStart && r.options.onBeforeScrollStart.call(r, t), (r.options.useTransition || r.options.zoom) && r._transitionTime(0), r.moved = !1, r.animating = !1, r.zoomed = !1, r.distX = 0, r.distY = 0, r.absDistX = 0, r.absDistY = 0, r.dirX = 0, r.dirY = 0, r.options.zoom && m && t.touches.length > 1 && (f = n.abs(t.touches[0].pageX - t.touches[1].pageX), l = n.abs(t.touches[0].pageY - t.touches[1].pageY), r.touchesDistStart = n.sqrt(f * f + l * l), r.originX = n.abs(t.touches[0].pageX + t.touches[1].pageX - r.wrapperOffsetLeft * 2) / 2 - r.x, r.originY = n.abs(t.touches[0].pageY + t.touches[1].pageY - r.wrapperOffsetTop * 2) / 2 - r.y, r.options.onZoomStart && r.options.onZoomStart.call(r, t));
      if (r.options.momentum) {
        r.options.useTransform ? (s = getComputedStyle(r.scroller, null)[o].replace(/[^0-9\-.,]/g, "").split(","), u = +(s[12] || s[4]), a = +(s[13] || s[5])) : (u = +getComputedStyle(r.scroller, null).left.replace(/[^0-9-]/g, ""), a = +getComputedStyle(r.scroller, null).top.replace(/[^0-9-]/g, ""));
        if (u != r.x || a != r.y) r.options.useTransition ? r._unbind(T) : C(r.aniTime), r.steps = [], r._pos(u, a), r.options.onScrollEnd && r.options.onScrollEnd.call(r)
      }
      r.absStartX = r.x, r.absStartY = r.y, r.startX = r.x, r.startY = r.y, r.pointX = i.pageX, r.pointY = i.pageY, r.startTime = t.timeStamp || Date.now(), r.options.onScrollStart && r.options.onScrollStart.call(r, t), r._bind(E, e), r._bind(S, e), r._bind(x, e)
    },
    _move: function (e) {
      var t = this,
        r = m ? e.touches[0] : e,
        i = r.pageX - t.pointX,
        s = r.pageY - t.pointY,
        u = t.x + i,
        a = t.y + s,
        f, l, c, h = e.timeStamp || Date.now();
      t.options.onBeforeScrollMove && t.options.onBeforeScrollMove.call(t, e);
      if (t.options.zoom && m && e.touches.length > 1) {
        f = n.abs(e.touches[0].pageX - e.touches[1].pageX), l = n.abs(e.touches[0].pageY - e.touches[1].pageY), t.touchesDist = n.sqrt(f * f + l * l), t.zoomed = !0, c = 1 / t.touchesDistStart * t.touchesDist * this.scale, c < t.options.zoomMin ? c = .5 * t.options.zoomMin * Math.pow(2, c / t.options.zoomMin) : c > t.options.zoomMax && (c = 2 * t.options.zoomMax * Math.pow(.5, t.options.zoomMax / c)), t.lastScale = c / this.scale, u = this.originX - this.originX * t.lastScale + this.x, a = this.originY - this.originY * t.lastScale + this.y, this.scroller.style[o] = "translate(" + u + "px," + a + "px) scale(" + c + ")" + k, t.options.onZoom && t.options.onZoom.call(t, e);
        return
      }
      t.pointX = r.pageX, t.pointY = r.pageY;
      if (u > 0 || u < t.maxScrollX) u = t.options.bounce ? t.x + i / 2 : u >= 0 || t.maxScrollX >= 0 ? 0 : t.maxScrollX;
      if (a > t.minScrollY || a < t.maxScrollY) a = t.options.bounce ? t.y + s / 2 : a >= t.minScrollY || t.maxScrollY >= 0 ? t.minScrollY : t.maxScrollY;
      t.distX += i, t.distY += s, t.absDistX = n.abs(t.distX), t.absDistY = n.abs(t.distY);
      if (t.absDistX < 6 && t.absDistY < 6) return;
      t.options.lockDirection && (t.absDistX > t.absDistY + 5 ? (a = t.y, s = 0) : t.absDistY > t.absDistX + 5 && (u = t.x, i = 0)), t.moved = !0, t._pos(u, a), t.dirX = i > 0 ? -1 : i < 0 ? 1 : 0, t.dirY = s > 0 ? -1 : s < 0 ? 1 : 0, h - t.startTime > 300 && (t.startTime = h, t.startX = t.x, t.startY = t.y), t.options.onScrollMove && t.options.onScrollMove.call(t, e)
    },
    _end: function (r) {
      if (m && r.touches.length !== 0) return;
      var i = this,
        s = m ? r.changedTouches[0] : r,
        u, f, l = {
          dist: 0,
          time: 0
        }, c = {
          dist: 0,
          time: 0
        }, h = (r.timeStamp || Date.now()) - i.startTime,
        p = i.x,
        d = i.y,
        v, g, y, b, w;
      i._unbind(E, e), i._unbind(S, e), i._unbind(x, e), i.options.onBeforeScrollEnd && i.options.onBeforeScrollEnd.call(i, r);
      if (i.zoomed) {
        w = i.scale * i.lastScale, w = Math.max(i.options.zoomMin, w), w = Math.min(i.options.zoomMax, w), i.lastScale = w / i.scale, i.scale = w, i.x = i.originX - i.originX * i.lastScale + i.x, i.y = i.originY - i.originY * i.lastScale + i.y, i.scroller.style[a] = "200ms", i.scroller.style[o] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + ")" + k, i.zoomed = !1, i.refresh(), i.options.onZoomEnd && i.options.onZoomEnd.call(i, r);
        return
      }
      if (!i.moved) {
        m && (i.doubleTapTimer && i.options.zoom ? (clearTimeout(i.doubleTapTimer), i.doubleTapTimer = null, i.options.onZoomStart && i.options.onZoomStart.call(i, r), i.zoom(i.pointX, i.pointY, i.scale == 1 ? i.options.doubleTapZoom : 1), i.options.onZoomEnd && setTimeout(function () {
          i.options.onZoomEnd.call(i, r)
        }, 200)) : this.options.handleClick && (i.doubleTapTimer = setTimeout(function () {
          i.doubleTapTimer = null, u = s.target;
          while (u.nodeType != 1) u = u.parentNode;
          u.tagName != "SELECT" && u.tagName != "INPUT" && u.tagName != "TEXTAREA" && (f = t.createEvent("MouseEvents"), f.initMouseEvent("click", !0, !0, r.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, 0, null), f._fake = !0, u.dispatchEvent(f))
        }, i.options.zoom ? 250 : 0))), i._resetPos(400), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r);
        return
      }
      if (h < 300 && i.options.momentum) {
        l = p ? i._momentum(p - i.startX, h, -i.x, i.scrollerW - i.wrapperW + i.x, i.options.bounce ? i.wrapperW : 0) : l, c = d ? i._momentum(d - i.startY, h, -i.y, i.maxScrollY < 0 ? i.scrollerH - i.wrapperH + i.y - i.minScrollY : 0, i.options.bounce ? i.wrapperH : 0) : c, p = i.x + l.dist, d = i.y + c.dist;
        if (i.x > 0 && p > 0 || i.x < i.maxScrollX && p < i.maxScrollX) l = {
          dist: 0,
          time: 0
        };
        if (i.y > i.minScrollY && d > i.minScrollY || i.y < i.maxScrollY && d < i.maxScrollY) c = {
          dist: 0,
          time: 0
        }
      }
      if (l.dist || c.dist) {
        y = n.max(n.max(l.time, c.time), 10), i.options.snap && (v = p - i.absStartX, g = d - i.absStartY, n.abs(v) < i.options.snapThreshold && n.abs(g) < i.options.snapThreshold ? i.scrollTo(i.absStartX, i.absStartY, 200) : (b = i._snap(p, d), p = b.x, d = b.y, y = n.max(b.time, y))), i.scrollTo(n.round(p), n.round(d), y), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r);
        return
      }
      if (i.options.snap) {
        v = p - i.absStartX, g = d - i.absStartY, n.abs(v) < i.options.snapThreshold && n.abs(g) < i.options.snapThreshold ? i.scrollTo(i.absStartX, i.absStartY, 200) : (b = i._snap(i.x, i.y), (b.x != i.x || b.y != i.y) && i.scrollTo(b.x, b.y, b.time)), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r);
        return
      }
      i._resetPos(200), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r)
    },
    _resetPos: function (e) {
      var t = this,
        n = t.x >= 0 ? 0 : t.x < t.maxScrollX ? t.maxScrollX : t.x,
        r = t.y >= t.minScrollY || t.maxScrollY > 0 ? t.minScrollY : t.y < t.maxScrollY ? t.maxScrollY : t.y;
      if (n == t.x && r == t.y) {
        t.moved && (t.moved = !1, t.options.onScrollEnd && t.options.onScrollEnd.call(t)), t.hScrollbar && t.options.hideScrollbar && (i == "webkit" && (t.hScrollbarWrapper.style[c] = "300ms"), t.hScrollbarWrapper.style.opacity = "0"), t.vScrollbar && t.options.hideScrollbar && (i == "webkit" && (t.vScrollbarWrapper.style[c] = "300ms"), t.vScrollbarWrapper.style.opacity = "0");
        return
      }
      t.scrollTo(n, r, e || 0)
    },
    _wheel: function (e) {
      var t = this,
        n, r, i, s, o;
      if ("wheelDeltaX" in e) n = e.wheelDeltaX / 12, r = e.wheelDeltaY / 12;
      else if ("wheelDelta" in e) n = r = e.wheelDelta / 12;
      else {
        if (!("detail" in e)) return;
        n = r = -e.detail * 3
      } if (t.options.wheelAction == "zoom") {
        o = t.scale * Math.pow(2, 1 / 3 * (r ? r / Math.abs(r) : 0)), o < t.options.zoomMin && (o = t.options.zoomMin), o > t.options.zoomMax && (o = t.options.zoomMax), o != t.scale && (!t.wheelZoomCount && t.options.onZoomStart && t.options.onZoomStart.call(t, e), t.wheelZoomCount++, t.zoom(e.pageX, e.pageY, o, 400), setTimeout(function () {
          t.wheelZoomCount--, !t.wheelZoomCount && t.options.onZoomEnd && t.options.onZoomEnd.call(t, e)
        }, 400));
        return
      }
      i = t.x + n, s = t.y + r, i > 0 ? i = 0 : i < t.maxScrollX && (i = t.maxScrollX), s > t.minScrollY ? s = t.minScrollY : s < t.maxScrollY && (s = t.maxScrollY), t.maxScrollY < 0 && t.scrollTo(i, s, 0)
    },
    _transitionEnd: function (e) {
      var t = this;
      if (e.target != t.scroller) return;
      t._unbind(T), t._startAni()
    },
    _startAni: function () {
      var e = this,
        t = e.x,
        r = e.y,
        i = Date.now(),
        s, o, u;
      if (e.animating) return;
      if (!e.steps.length) {
        e._resetPos(400);
        return
      }
      s = e.steps.shift(), s.x == t && s.y == r && (s.time = 0), e.animating = !0, e.moved = !0;
      if (e.options.useTransition) {
        e._transitionTime(s.time), e._pos(s.x, s.y), e.animating = !1, s.time ? e._bind(T) : e._resetPos(0);
        return
      }
      u = function () {
        var a = Date.now(),
          f, l;
        if (a >= i + s.time) {
          e._pos(s.x, s.y), e.animating = !1, e.options.onAnimationEnd && e.options.onAnimationEnd.call(e), e._startAni();
          return
        }
        a = (a - i) / s.time - 1, o = n.sqrt(1 - a * a), f = (s.x - t) * o + t, l = (s.y - r) * o + r, e._pos(f, l), e.animating && (e.aniTime = N(u))
      }, u()
    },
    _transitionTime: function (e) {
      e += "ms", this.scroller.style[a] = e, this.hScrollbar && (this.hScrollbarIndicator.style[a] = e), this.vScrollbar && (this.vScrollbarIndicator.style[a] = e)
    },
    _momentum: function (e, t, r, i, s) {
      var o = 6e-4,
        u = n.abs(e) / t,
        a = u * u / (2 * o),
        f = 0,
        l = 0;
      return e > 0 && a > r ? (l = s / (6 / (a / u * o)), r += l, u = u * r / a, a = r) : e < 0 && a > i && (l = s / (6 / (a / u * o)), i += l, u = u * i / a, a = i), a *= e < 0 ? -1 : 1, f = u / o, {
        dist: a,
        time: n.round(f)
      }
    },
    _offset: function (e) {
      var t = -e.offsetLeft,
        n = -e.offsetTop;
      while (e = e.offsetParent) t -= e.offsetLeft, n -= e.offsetTop;
      return e != this.wrapper && (t *= this.scale, n *= this.scale), {
        left: t,
        top: n
      }
    },
    _snap: function (e, t) {
      var r = this,
        i, s, o, u, a, f;
      o = r.pagesX.length - 1;
      for (i = 0, s = r.pagesX.length; i < s; i++)
        if (e >= r.pagesX[i]) {
          o = i;
          break
        }
      o == r.currPageX && o > 0 && r.dirX < 0 && o--, e = r.pagesX[o], a = n.abs(e - r.pagesX[r.currPageX]), a = a ? n.abs(r.x - e) / a * 500 : 0, r.currPageX = o, o = r.pagesY.length - 1;
      for (i = 0; i < o; i++)
        if (t >= r.pagesY[i]) {
          o = i;
          break
        }
      return o == r.currPageY && o > 0 && r.dirY < 0 && o--, t = r.pagesY[o], f = n.abs(t - r.pagesY[r.currPageY]), f = f ? n.abs(r.y - t) / f * 500 : 0, r.currPageY = o, u = n.round(n.max(a, f)) || 200, {
        x: e,
        y: t,
        time: u
      }
    },
    _bind: function (e, t, n) {
      (t || this.scroller).addEventListener(e, this, !! n)
    },
    _unbind: function (e, t, n) {
      (t || this.scroller).removeEventListener(e, this, !! n)
    },
    destroy: function () {
      var t = this;
      t.scroller.style[o] = "", t.hScrollbar = !1, t.vScrollbar = !1, t._scrollbar("h"), t._scrollbar("v"), t._unbind(b, e), t._unbind(w), t._unbind(E, e), t._unbind(S, e), t._unbind(x, e), t.options.hasTouch || (t._unbind("DOMMouseScroll"), t._unbind("mousewheel")), t.options.useTransition && t._unbind(T), t.options.checkDOMChanges && clearInterval(t.checkDOMTime), t.options.onDestroy && t.options.onDestroy.call(t)
    },
    refresh: function () {
      var e = this,
        t, r, i, s, o = 0,
        u = 0;
      e.scale < e.options.zoomMin && (e.scale = e.options.zoomMin), e.wrapperW = e.wrapper.clientWidth || 1, e.wrapperH = e.wrapper.clientHeight || 1, e.minScrollY = -e.options.topOffset || 0, e.scrollerW = n.round(e.scroller.offsetWidth * e.scale), e.scrollerH = n.round((e.scroller.offsetHeight + e.minScrollY) * e.scale), e.maxScrollX = e.wrapperW - e.scrollerW, e.maxScrollY = e.wrapperH - e.scrollerH + e.minScrollY, e.dirX = 0, e.dirY = 0, e.options.onRefresh && e.options.onRefresh.call(e), e.hScroll = e.options.hScroll && e.maxScrollX < 0, e.vScroll = e.options.vScroll && (!e.options.bounceLock && !e.hScroll || e.scrollerH > e.wrapperH), e.hScrollbar = e.hScroll && e.options.hScrollbar, e.vScrollbar = e.vScroll && e.options.vScrollbar && e.scrollerH > e.wrapperH, t = e._offset(e.wrapper), e.wrapperOffsetLeft = -t.left, e.wrapperOffsetTop = -t.top;
      if (typeof e.options.snap == "string") {
        e.pagesX = [], e.pagesY = [], s = e.scroller.querySelectorAll(e.options.snap);
        for (r = 0, i = s.length; r < i; r++) o = e._offset(s[r]), o.left += e.wrapperOffsetLeft, o.top += e.wrapperOffsetTop, e.pagesX[r] = o.left < e.maxScrollX ? e.maxScrollX : o.left * e.scale, e.pagesY[r] = o.top < e.maxScrollY ? e.maxScrollY : o.top * e.scale
      } else if (e.options.snap) {
        e.pagesX = [];
        while (o >= e.maxScrollX) e.pagesX[u] = o, o -= e.wrapperW, u++;
        e.maxScrollX % e.wrapperW && (e.pagesX[e.pagesX.length] = e.maxScrollX - e.pagesX[e.pagesX.length - 1] + e.pagesX[e.pagesX.length - 1]), o = 0, u = 0, e.pagesY = [];
        while (o >= e.maxScrollY) e.pagesY[u] = o, o -= e.wrapperH, u++;
        e.maxScrollY % e.wrapperH && (e.pagesY[e.pagesY.length] = e.maxScrollY - e.pagesY[e.pagesY.length - 1] + e.pagesY[e.pagesY.length - 1])
      }
      e._scrollbar("h"), e._scrollbar("v"), e.zoomed || (e.scroller.style[a] = "0", e._resetPos(400))
    },
    scrollTo: function (e, t, n, r) {
      var i = this,
        s = e,
        o, u;
      i.stop(), s.length || (s = [{
        x: e,
        y: t,
        time: n,
        relative: r
      }]);
      for (o = 0, u = s.length; o < u; o++) s[o].relative && (s[o].x = i.x - s[o].x, s[o].y = i.y - s[o].y), i.steps.push({
        x: s[o].x,
        y: s[o].y,
        time: s[o].time || 0
      });
      i._startAni()
    },
    scrollToElement: function (e, t) {
      var r = this,
        i;
      e = e.nodeType ? e : r.scroller.querySelector(e);
      if (!e) return;
      i = r._offset(e), i.left += r.wrapperOffsetLeft, i.top += r.wrapperOffsetTop, i.left = i.left > 0 ? 0 : i.left < r.maxScrollX ? r.maxScrollX : i.left, i.top = i.top > r.minScrollY ? r.minScrollY : i.top < r.maxScrollY ? r.maxScrollY : i.top, t = t === undefined ? n.max(n.abs(i.left) * 2, n.abs(i.top) * 2) : t, r.scrollTo(i.left, i.top, t)
    },
    scrollToPage: function (e, t, n) {
      var r = this,
        i, s;
      n = n === undefined ? 400 : n, r.options.onScrollStart && r.options.onScrollStart.call(r), r.options.snap ? (e = e == "next" ? r.currPageX + 1 : e == "prev" ? r.currPageX - 1 : e, t = t == "next" ? r.currPageY + 1 : t == "prev" ? r.currPageY - 1 : t, e = e < 0 ? 0 : e > r.pagesX.length - 1 ? r.pagesX.length - 1 : e, t = t < 0 ? 0 : t > r.pagesY.length - 1 ? r.pagesY.length - 1 : t, r.currPageX = e, r.currPageY = t, i = r.pagesX[e], s = r.pagesY[t]) : (i = -r.wrapperW * e, s = -r.wrapperH * t, i < r.maxScrollX && (i = r.maxScrollX), s < r.maxScrollY && (s = r.maxScrollY)), r.scrollTo(i, s, n)
    },
    disable: function () {
      this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(E, e), this._unbind(S, e), this._unbind(x, e)
    },
    enable: function () {
      this.enabled = !0
    },
    stop: function () {
      this.options.useTransition ? this._unbind(T) : C(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
    },
    zoom: function (e, t, n, r) {
      var i = this,
        s = n / i.scale;
      if (!i.options.useTransform) return;
      i.zoomed = !0, r = r === undefined ? 200 : r, e = e - i.wrapperOffsetLeft - i.x, t = t - i.wrapperOffsetTop - i.y, i.x = e - e * s + i.x, i.y = t - t * s + i.y, i.scale = n, i.refresh(), i.x = i.x > 0 ? 0 : i.x < i.maxScrollX ? i.maxScrollX : i.x, i.y = i.y > i.minScrollY ? i.minScrollY : i.y < i.maxScrollY ? i.maxScrollY : i.y, i.scroller.style[a] = r + "ms", i.scroller.style[o] = "translate(" + i.x + "px," + i.y + "px) scale(" + n + ")" + k, i.zoomed = !1
    },
    isReady: function () {
      return !this.moved && !this.zoomed && !this.animating
    }
  }, r = null, typeof exports != "undefined" ? exports.iScroll = L : e.iScroll = L
}(window, document),
function (e) {
  "use strict";
  var t = {
    decelerate: !0,
    triggerHardware: !1,
    y: !0,
    x: !0,
    slowdown: .9,
    maxvelocity: 40,
    throttleFPS: 60,
    movingClass: {
      up: "kinetic-moving-up",
      down: "kinetic-moving-down",
      left: "kinetic-moving-left",
      right: "kinetic-moving-right"
    },
    deceleratingClass: {
      up: "kinetic-decelerating-up",
      down: "kinetic-decelerating-down",
      left: "kinetic-decelerating-left",
      right: "kinetic-decelerating-right"
    }
  }, n = "kinetic-settings",
    r = "kinetic-active";
  window.requestAnimationFrame || (window.requestAnimationFrame = function () {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
      window.setTimeout(e, 1e3 / 60)
    }
  }()), e.support = e.support || {}, e.extend(e.support, {
    touch: "ontouchend" in document
  });
  var i = function () {
    return !1
  }, s = function (e, t) {
      return Math.floor(Math.abs(e)) === 0 ? 0 : e * t
    }, o = function (e, t) {
      var n = e;
      return e > 0 ? e > t && (n = t) : e < 0 - t && (n = 0 - t), n
    }, u = function (e, t) {
      this.removeClass(e.movingClass.up).removeClass(e.movingClass.down).removeClass(e.movingClass.left).removeClass(e.movingClass.right).removeClass(e.deceleratingClass.up).removeClass(e.deceleratingClass.down).removeClass(e.deceleratingClass.left).removeClass(e.deceleratingClass.right), e.velocity > 0 && this.addClass(t.right), e.velocity < 0 && this.addClass(t.left), e.velocityY > 0 && this.addClass(t.down), e.velocityY < 0 && this.addClass(t.up)
    }, a = function (e, t) {
      typeof t.stopped == "function" && t.stopped.call(e, t)
    }, f = function (e, t) {
      var n = e[0];
      t.x && n.scrollWidth > 0 ? (n.scrollLeft = t.scrollLeft = n.scrollLeft + t.velocity, Math.abs(t.velocity) > 0 && (t.velocity = t.decelerate ? s(t.velocity, t.slowdown) : t.velocity)) : t.velocity = 0, t.y && n.scrollHeight > 0 ? (n.scrollTop = t.scrollTop = n.scrollTop + t.velocityY, Math.abs(t.velocityY) > 0 && (t.velocityY = t.decelerate ? s(t.velocityY, t.slowdown) : t.velocityY)) : t.velocityY = 0, u.call(e, t, t.deceleratingClass), typeof t.moved == "function" && t.moved.call(e, t), Math.abs(t.velocity) > 0 || Math.abs(t.velocityY) > 0 ? window.requestAnimationFrame(function () {
        f(e, t)
      }) : a(e, t)
    }, l = function (t, r) {
      var i = e.kinetic.callMethods[t],
        s = Array.prototype.slice.call(arguments);
      i && this.each(function () {
        var t = s.slice(1),
          r = e(this).data(n);
        t.unshift(r), i.apply(this, t)
      })
    }, c = function (t, n) {
      var r = t[0];
      e.support.touch ? (r.addEventListener("touchstart", n.events.touchStart, !1), r.addEventListener("touchend", n.events.inputEnd, !1), r.addEventListener("touchmove", n.events.touchMove, !1)) : t.mousedown(n.events.inputDown).mouseup(n.events.inputEnd).mousemove(n.events.inputMove), t.click(n.events.inputClick).bind("selectstart", i), t.bind("dragstart", n.events.dragStart)
    }, h = function (t, n) {
      var r = t[0];
      e.support.touch ? (r.removeEventListener("touchstart", n.events.touchStart, !1), r.removeEventListener("touchend", n.events.inputEnd, !1), r.removeEventListener("touchmove", n.events.touchMove, !1)) : t.unbind("mousedown", n.events.inputDown).unbind("mouseup", n.events.inputEnd).unbind("mousemove", n.events.inputMove), t.unbind("click", n.events.inputClick).unbind("selectstart", i), t.unbind("dragstart", n.events.dragStart)
    }, p = function (i) {
      this.addClass(r).each(function () {
        var r = e.extend({}, t, i),
          s = this,
          a = e(this),
          l, h = !1,
          p, d = !1,
          v = !1,
          m, g, y = 1e3 / r.throttleFPS,
          b, w;
        r.velocity = 0, r.velocityY = 0;
        var E = function () {
          l = !1, p = !1, v = !1
        };
        e(document).mouseup(E).click(E);
        var S = function () {
          r.velocity = o(h - l, r.maxvelocity), r.velocityY = o(d - p, r.maxvelocity)
        }, x = function (t) {
            return e.isFunction(r.filterTarget) ? r.filterTarget.call(s, t) !== !1 : !0
          }, T = function (e, t) {
            v = !0, r.velocity = h = 0, r.velocityY = d = 0, l = e, p = t
          }, N = function () {
            l && h && r.decelerate === !1 && (r.decelerate = !0, S(), l = h = v = !1, f(a, r))
          }, C = function (t, n) {
            if (!b || new Date > new Date(b.getTime() + y)) b = new Date, v && (l || p) && (w && (e(w).blur(), w = null, a.focus()), r.decelerate = !1, r.velocity = r.velocityY = 0, a[0].scrollLeft = r.scrollLeft = r.x ? a[0].scrollLeft - (t - l) : a[0].scrollLeft, a[0].scrollTop = r.scrollTop = r.y ? a[0].scrollTop - (n - p) : a[0].scrollTop, h = l, d = p, l = t, p = n, S(), u.call(a, r, r.movingClass), typeof r.moved == "function" && r.moved.call(a, r))
          };
        r.events = {
          touchStart: function (e) {
            x(e.target) && (T(e.touches[0].clientX, e.touches[0].clientY), e.stopPropagation())
          },
          touchMove: function (e) {
            v && (C(e.touches[0].clientX, e.touches[0].clientY), e.preventDefault && e.preventDefault())
          },
          inputDown: function (e) {
            x(e.target) && (T(e.clientX, e.clientY), w = e.target, e.target.nodeName === "IMG" && e.preventDefault(), e.stopPropagation())
          },
          inputEnd: function (e) {
            N(), w = null, e.preventDefault && e.preventDefault()
          },
          inputMove: function (e) {
            v && (C(e.clientX, e.clientY), e.preventDefault && e.preventDefault())
          },
          inputClick: function (e) {
            if (Math.abs(r.velocity) > 0) return e.preventDefault(), !1
          },
          dragStart: function (e) {
            if (w) return !1
          }
        }, c(a, r), a.data(n, r).css("cursor", "move"), r.triggerHardware && a.css("-webkit-transform", "translate3d(0,0,0)")
      })
    };
  e.kinetic = {
    settingsKey: n,
    callMethods: {
      start: function (t, n) {
        var r = e(this);
        t = e.extend(t, n), t && (t.decelerate = !1, f(r, t))
      },
      end: function (t, n) {
        var r = e(this);
        t && (t.decelerate = !0)
      },
      stop: function (e, t) {
        e.velocity = 0, e.velocityY = 0, e.decelerate = !0
      },
      detach: function (t, n) {
        var i = e(this);
        h(i, t), i.removeClass(r).css("cursor", "")
      },
      attach: function (t, n) {
        var i = e(this);
        c(i, t), i.addClass(r).css("cursor", "move")
      }
    }
  }, e.fn.kinetic = function (e) {
    return typeof e == "string" ? l.apply(this, arguments) : p.call(this, e), this
  }
}(window.jQuery || window.Zepto),
function (e) {
  function t(t) {
    var n = t || window.event,
      r = [].slice.call(arguments, 1),
      i = 0,
      s = !0,
      o = 0,
      u = 0;
    return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
  }
  var n = ["DOMMouseScroll", "mousewheel"];
  if (e.event.fixHooks)
    for (var r = n.length; r;) e.event.fixHooks[n[--r]] = e.event.mouseHooks;
  e.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener)
        for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
      else this.onmousewheel = t
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
      else this.onmousewheel = null
    }
  }, e.fn.extend({
    mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    },
    unmousewheel: function (e) {
      return this.unbind("mousewheel", e)
    }
  })
}(jQuery),
function (e) {
  e.widget("thomaskahn.smoothDivScroll", {
    options: {
      scrollingHotSpotLeftClass: "scrollingHotSpotLeft",
      scrollingHotSpotRightClass: "scrollingHotSpotRight",
      scrollableAreaClass: "scrollableArea",
      scrollWrapperClass: "scrollWrapper",
      hiddenOnStart: !1,
      getContentOnLoad: {},
      countOnlyClass: "",
      startAtElementId: "",
      hotSpotScrolling: !0,
      hotSpotScrollingStep: 15,
      hotSpotScrollingInterval: 10,
      hotSpotMouseDownSpeedBooster: 3,
      visibleHotSpotBackgrounds: "hover",
      hotSpotsVisibleTime: 5e3,
      easingAfterHotSpotScrolling: !0,
      easingAfterHotSpotScrollingDistance: 10,
      easingAfterHotSpotScrollingDuration: 300,
      easingAfterHotSpotScrollingFunction: "easeOutQuart",
      mousewheelScrolling: "",
      mousewheelScrollingStep: 70,
      easingAfterMouseWheelScrolling: !0,
      easingAfterMouseWheelScrollingDuration: 300,
      easingAfterMouseWheelScrollingFunction: "easeOutQuart",
      manualContinuousScrolling: !1,
      autoScrollingMode: "",
      autoScrollingDirection: "endlessLoopRight",
      autoScrollingStep: 1,
      autoScrollingInterval: 10,
      touchScrolling: !1,
      scrollToAnimationDuration: 1e3,
      scrollToEasingFunction: "easeOutQuart",
      scrollElementPosition: "center",
      usePositionForOffset: !1,
      initialOffset: 0
    },
    clearIntervals: function (e) {
      var t = this.element;
      e ? e === "left" ? (clearInterval(t.data("leftScrollingInterval")), t.data("leftScrollingInterval", null)) : (clearInterval(t.data("rightScrollingInterval")), t.data("rightScrollingInterval", null)) : (clearInterval(t.data("leftScrollingInterval")), clearInterval(t.data("rightScrollingInterval")), t.data("rightScrollingInterval", null), t.data("leftScrollingInterval", null))
    },
    getHoverBarEl: function (e) {
      var t = this.element;
      return e === "left" ? t.data("scrollingHotSpotLeft") : t.data("scrollingHotSpotRight")
    },
    _create: function () {
      var t = this,
        n = this.options,
        r = this.element;
      r.data("scrollWrapper", r.find("." + n.scrollWrapperClass)), r.data("scrollingHotSpotRight", r.find("." + n.scrollingHotSpotRightClass)), r.data("scrollingHotSpotLeft", r.find("." + n.scrollingHotSpotLeftClass)), r.data("scrollableArea", r.find("." + n.scrollableAreaClass));
      var i = r.data("scrollWrapper"),
        s = Number(i.css("padding-left").replace("px", "")) / 2,
        o = Number(i.css("padding-right").replace("px", "")) / 2;
      r.data("scrollWrapperLeftPadding", o + s), r.data("scrollingHotSpotRight").length > 0 && r.data("scrollingHotSpotRight").detach(), r.data("scrollingHotSpotLeft").length > 0 && r.data("scrollingHotSpotLeft").detach(), r.data("scrollableArea").length === 0 && r.data("scrollWrapper").length === 0 ? (r.wrapInner("<div class='" + n.scrollableAreaClass + "'>").wrapInner("<div class='" + n.scrollWrapperClass + "'>"), r.data("scrollWrapper", r.find("." + n.scrollWrapperClass)), r.data("scrollableArea", r.find("." + n.scrollableAreaClass))) : r.data("scrollWrapper").length === 0 ? (r.wrapInner("<div class='" + n.scrollWrapperClass + "'>"), r.data("scrollWrapper", r.find("." + n.scrollWrapperClass))) : r.data("scrollableArea").length === 0 && (r.data("scrollWrapper").wrapInner("<div class='" + n.scrollableAreaClass + "'>"), r.data("scrollableArea", r.find("." + n.scrollableAreaClass))), r.data("scrollingHotSpotRight").length === 0 ? (r.prepend("<div class='" + n.scrollingHotSpotRightClass + "'></div>"), r.data("scrollingHotSpotRight", r.find("." + n.scrollingHotSpotRightClass))) : r.prepend(r.data("scrollingHotSpotRight")), r.data("scrollingHotSpotLeft").length === 0 ? (r.prepend("<div class='" + n.scrollingHotSpotLeftClass + "'></div>"), r.data("scrollingHotSpotLeft", r.find("." + n.scrollingHotSpotLeftClass))) : r.prepend(r.data("scrollingHotSpotLeft")), r.data("speedBooster", 1), r.data("scrollXPos", 0), r.data("hotSpotWidth", r.data("scrollingHotSpotLeft").innerWidth()), r.data("scrollableAreaWidth", 0), r.data("startingPosition", 0), r.data("rightScrollingInterval", null), r.data("leftScrollingInterval", null), r.data("autoScrollingInterval", null), r.data("hideHotSpotBackgroundsInterval", null), r.data("previousScrollLeft", 0), r.data("pingPongDirection", "right"), r.data("getNextElementWidth", !0), r.data("swapAt", null), r.data("startAtElementHasNotPassed", !0), r.data("swappedElement", null), r.data("originalElements", r.data("scrollableArea").children(n.countOnlyClass)), r.data("visible", !0), r.data("enabled", !0), r.data("scrollableAreaHeight", r.data("scrollableArea").height()), this.updateOffset(), n.touchScrolling && r.data("enabled") && r.data("scrollWrapper").kinetic({
        y: !1,
        moved: function (e) {
          n.manualContinuousScrolling && (r.data("scrollWrapper").scrollLeft() <= 0 ? t._checkContinuousSwapLeft() : t._checkContinuousSwapRight())
        },
        stopped: function (e) {
          r.data("scrollWrapper").stop(!0, !1), t.stopAutoScrolling()
        }
      }), r.data("scrollingHotSpotRight").bind("mousemove", function (e) {
        if (n.hotSpotScrolling) {
          var t = e.pageX - (this.offsetLeft + r.data("scrollerOffset").left);
          r.data("scrollXPos", Math.round(t / r.data("hotSpotWidth") * n.hotSpotScrollingStep)), (r.data("scrollXPos") === Infinity || r.data("scrollXPos") < 1) && r.data("scrollXPos", 1)
        }
      }), this.moveOverRight = function () {
        t.clearIntervals(), n.hotSpotScrolling && (r.data("scrollWrapper").stop(!0, !1), t.stopAutoScrolling(), r.data("rightScrollingInterval", setInterval(function () {
          r.data("scrollXPos") > 0 && r.data("enabled") && (r.data("scrollWrapper").scrollLeft(r.data("scrollWrapper").scrollLeft() + r.data("scrollXPos") * r.data("speedBooster")), n.manualContinuousScrolling && t._checkContinuousSwapRight(), t._showHideHotSpots("left"))
        }, n.hotSpotScrollingInterval)), t._trigger("mouseOverRightHotSpot"))
      }, this.mouseEnterRight = function () {
        t._trigger("mouseEnterRightHotSpot")
      }, this.mouseEnterRight = function () {
        t._trigger("mouseLeaveRightHotSpot")
      }, r.data("scrollingHotSpotRight").bind("mouseover", this.moveOverRight), r.data("scrollingHotSpotRight").bind("mouseenter", this.mouseEnterRight), r.data("scrollingHotSpotRight").bind("mouseleave", this.mouseLeaveRight), r.data("scrollingHotSpotRight").bind("mouseout", function () {
        t.clearIntervals(), n.hotSpotScrolling && (r.data("scrollXPos", 0), n.easingAfterHotSpotScrolling && r.data("enabled") && r.data("scrollWrapper").animate({
          scrollLeft: r.data("scrollWrapper").scrollLeft() + n.easingAfterHotSpotScrollingDistance
        }, {
          duration: n.easingAfterHotSpotScrollingDuration,
          easing: n.easingAfterHotSpotScrollingFunction
        }))
      }), r.data("scrollingHotSpotRight").bind("mousedown", function () {
        t.clearIntervals(), t.hideHoverBar("right")
      }), r.data("leftHotSpotLimitEventEnabled", !0), r.data("rightHotSpotLimitEventEnabled", !0), r.data("scrollingHotSpotLeft").bind("mousemove", function (e) {
        if (n.hotSpotScrolling) {
          var t = this.offsetLeft + r.data("scrollerOffset").left + r.data("hotSpotWidth") - e.pageX;
          r.data("scrollXPos", Math.round(t / r.data("hotSpotWidth") * n.hotSpotScrollingStep)), (r.data("scrollXPos") === Infinity || r.data("scrollXPos") < 1) && r.data("scrollXPos", 1)
        }
      }), this.mouseOverLeft = function () {
        t.clearIntervals(), n.hotSpotScrolling && (r.data("scrollWrapper").stop(!0, !1), t.stopAutoScrolling(), r.data("leftScrollingInterval", setInterval(function () {
          r.data("scrollXPos") > 0 && r.data("enabled") && (r.data("scrollWrapper").scrollLeft(r.data("scrollWrapper").scrollLeft() - r.data("scrollXPos") * r.data("speedBooster")), n.manualContinuousScrolling && t._checkContinuousSwapLeft(), t._showHideHotSpots("right"))
        }, n.hotSpotScrollingInterval)), t._trigger("mouseOverLeftHotSpot"))
      }, this.mouseEnterLeft = function () {
        t._trigger("mouseEnterLeftHotSpot")
      }, this.mouseLeaveLeft = function () {
        t._trigger("mouseLeaveLeftHotSpot")
      }, r.data("scrollingHotSpotLeft").bind("mouseenter", this.mouseEnterLeft), r.data("scrollingHotSpotLeft").bind("mouseover", this.mouseOverLeft), r.data("scrollingHotSpotLeft").bind("mouseleave", this.mouseLeaveLeft), r.data("scrollingHotSpotLeft").bind("mouseout", function () {
        t.clearIntervals(), n.hotSpotScrolling && (r.data("scrollXPos", 0), n.easingAfterHotSpotScrolling && r.data("enabled") && r.data("scrollWrapper").animate({
          scrollLeft: r.data("scrollWrapper").scrollLeft() - n.easingAfterHotSpotScrollingDistance
        }, {
          duration: n.easingAfterHotSpotScrollingDuration,
          easing: n.easingAfterHotSpotScrollingFunction
        }))
      }), r.data("scrollingHotSpotLeft").bind("mousedown", function () {
        t.clearIntervals(), t.hideHoverBar("left")
      }).bind("mouseout", function () {
        t._trigger("mouseOutLeft")
      }), r.data("scrollableArea").bind("mouseout", function () {
        t.clearIntervals()
      }), r.data("scrollableArea").mousewheel(function (e, i, s, o) {
        if (r.data("enabled") && n.mousewheelScrolling.length > 0) {
          var u;
          n.mousewheelScrolling === "vertical" && o !== 0 ? (t.stopAutoScrolling(), e.preventDefault(), u = Math.round(n.mousewheelScrollingStep * o * -1), t.move(u)) : n.mousewheelScrolling === "horizontal" && s !== 0 ? (t.stopAutoScrolling(), e.preventDefault(), u = Math.round(n.mousewheelScrollingStep * s * -1), t.move(u)) : n.mousewheelScrolling === "allDirections" && (t.stopAutoScrolling(), e.preventDefault(), u = Math.round(n.mousewheelScrollingStep * i * -1), t.move(u))
        }
      }), n.mousewheelScrolling && r.data("scrollingHotSpotLeft").add(r.data("scrollingHotSpotRight")).mousewheel(function (e) {
        e.preventDefault()
      }), this.onWindowResize = function () {
        t.element.data("scrollWrapper") ? (t._showHideHotSpots(), t._trigger("windowResized")) : t.destroy()
      }, e(window).bind("resize", this.onWindowResize), jQuery.isEmptyObject(n.getContentOnLoad) || t[n.getContentOnLoad.method](n.getContentOnLoad.content, n.getContentOnLoad.manipulationMethod, n.getContentOnLoad.addWhere, n.getContentOnLoad.filterTag), n.hiddenOnStart && t.hide(), r.data("scrollWrapper").scrollLeft(this.options.initialOffset), r.data("scrollXPos", this.options.initialOffset)
    },
    _setOption: function (e, t) {
      var n = this,
        r = this.options,
        i = this.element;
      r[e] = t, e === "hotSpotScrolling" ? t === !0 ? n._showHideHotSpots() : (i.data("scrollingHotSpotLeft").hide(), i.data("scrollingHotSpotRight").hide()) : e === "autoScrollingStep" || e === "easingAfterHotSpotScrollingDistance" || e === "easingAfterHotSpotScrollingDuration" || e === "easingAfterMouseWheelScrollingDuration" ? r[e] = parseInt(t, 10) : e === "autoScrollingInterval" && (r[e] = parseInt(t, 10), n.startAutoScrolling())
    },
    updateOffset: function () {
      var e = this.element,
        t = e.data("scrollWrapper"),
        n;
      this.options.usePositionForOffset ? n = t.position() : n = t.offset(), e.data("scrollerOffset", n)
    },
    showHotSpotBackgrounds: function (e) {
      var t = this,
        n = this.element,
        r = this.option;
      e !== undefined ? (n.data("scrollingHotSpotLeft").addClass("scrollingHotSpotLeftVisible"), n.data("scrollingHotSpotRight").addClass("scrollingHotSpotRightVisible"), n.data("scrollingHotSpotLeft").add(n.data("scrollingHotSpotRight")).fadeTo(e, .35)) : (n.data("scrollingHotSpotLeft").addClass("scrollingHotSpotLeftVisible"), n.data("scrollingHotSpotLeft").removeAttr("style"), n.data("scrollingHotSpotRight").addClass("scrollingHotSpotRightVisible"), n.data("scrollingHotSpotRight").removeAttr("style")), t._showHideHotSpots()
    },
    hideHotSpotBackgrounds: function (e) {
      var t = this.element,
        n = this.option;
      e !== undefined ? (t.data("scrollingHotSpotLeft").fadeTo(e, 0, function () {
        t.data("scrollingHotSpotLeft").removeClass("scrollingHotSpotLeftVisible")
      }), t.data("scrollingHotSpotRight").fadeTo(e, 0, function () {
        t.data("scrollingHotSpotRight").removeClass("scrollingHotSpotRightVisible")
      })) : (t.data("scrollingHotSpotLeft").removeClass("scrollingHotSpotLeftVisible").removeAttr("style"), t.data("scrollingHotSpotRight").removeClass("scrollingHotSpotRightVisible").removeAttr("style"))
    },
    isAtEndOfScroll: function () {
      var e = this.element;
      return this.getScrollableAreaWidth() <= e.data("scrollWrapper").scrollLeft() + e.data("scrollWrapper").innerWidth()
    },
    isAtBeginningOfScroll: function () {
      return el.data("scrollWrapper").scrollLeft() === 0
    },
    _showHideHotSpots: function (e) {
      var t = this,
        n = this.element,
        r = this.options;
      if (!r.hotSpotScrolling) this.hideHoverBar("both");
      else if (r.manualContinuousScrolling && r.hotSpotScrolling && r.autoScrollingMode !== "always") this.showHoverBar("both");
      else if (r.autoScrollingMode !== "always" && r.hotSpotScrolling) {
        if (n.data("scrollableAreaWidth") < n.data("scrollWrapper").innerWidth()) {
          this.hideHoverBar("both");
          return
        }
        n.data("scrollWrapper").scrollLeft() === 0 ? (this.hideHoverBar("left"), this.showHoverBar("right"), e !== !0 && e !== "left" && t._trigger("scrollerLeftLimitReached")) : n.data("scrollableAreaWidth") <= n.data("scrollWrapper").innerWidth() + n.data("scrollWrapper").scrollLeft() ? (this.showHoverBar("left"), this.hideHoverBar("right"), e !== !0 && e !== "right" && t._trigger("scrollerRightLimitReached")) : this.showHoverBar("both")
      } else this.hideHoverBar("both")
    },
    getScrollableAreaWidth: function () {
      var t = 0,
        n = this.options;
      return this.element.data("scrollableArea").children(n.countOnlyClass).each(function () {
        t += e(this).outerWidth(!0)
      }), t
    },
    hideHoverBar: function (e) {
      var t = this.element;
      switch (e) {
      case "left":
        t.data("scrollingHotSpotLeft").hide();
        break;
      case "right":
        t.data("scrollingHotSpotRight").hide();
        break;
      case "both":
        t.data("scrollingHotSpotRight").hide(), t.data("scrollingHotSpotLeft").hide()
      }
    },
    showHoverBar: function (e) {
      var t = this.element;
      switch (e) {
      case "left":
        t.data("scrollingHotSpotLeft").show();
        break;
      case "right":
        t.data("scrollingHotSpotRight").show();
        break;
      case "both":
        t.data("scrollingHotSpotRight").show(), t.data("scrollingHotSpotLeft").show()
      }
    },
    setWrapperScrollPosition: function (e) {
      var t = this.element;
      t.data("scrollXPos", 0), t.data("scrollWrapper").scrollLeft(e)
    },
    _setElementScrollPosition: function (t, n) {
      var r = this.element,
        i = this.options,
        s = 0;
      switch (t) {
      case "first":
        return r.data("scrollXPos", 0), !0;
      case "start":
        if (i.startAtElementId !== "" && r.data("scrollableArea").has("#" + i.startAtElementId)) return s = e("#" + i.startAtElementId).position().left, r.data("scrollXPos", s), !0;
        return !1;
      case "last":
        return r.data("scrollXPos", r.data("scrollableAreaWidth") - r.data("scrollWrapper").innerWidth()), !0;
      case "number":
        if (!isNaN(n)) return s = r.data("scrollableArea").children(i.countOnlyClass).eq(n - 1).position().left, r.data("scrollXPos", s), !0;
        return !1;
      case "id":
        var o;
        if (n.length > 0 && r.data("scrollableArea").has("#" + n)) {
          o = r.find("#" + n);
          if (o.length) return s = o.position().left, r.data("scrollXPos", this._getScrollPositionDifference(s)), !0
        }
        return !1;
      default:
        return !1
      }
    },
    _getScrollPositionDifference: function (t) {
      return this.options.scrollElementPosition === "center" ? t -= e(window).width() / 2 : this.options.scrollElementPosition === "left", t
    },
    jumpToElement: function (e, t) {
      var n = this,
        r = this.element,
        i;
      if (r.data("enabled") && n._setElementScrollPosition(e, t)) {
        r.data("scrollWrapper").scrollLeft(r.data("scrollXPos")), n._showHideHotSpots();
        switch (e) {
        case "first":
          n._trigger("jumpedToFirstElement");
          break;
        case "start":
          n._trigger("jumpedToStartElement");
          break;
        case "last":
          n._trigger("jumpedToLastElement");
          break;
        case "number":
          n._trigger("jumpedToElementNumber", null, {
            elementNumber: t
          });
          break;
        case "id":
          i = r.data("scrollWrapper").find("#" + t), r.data("scrollWrapper").scrollLeft(i.position().left), n._trigger("jumpedToElementId", null, {
            elementId: t
          });
          break;
        default:
        }
      }
    },
    scrollToElement: function (e, t) {
      var n = this,
        r = this.element,
        i = this.options,
        s = !1;
      r.data("enabled") && n._setElementScrollPosition(e, t) && (r.data("autoScrollingInterval") !== null && (n.stopAutoScrolling(), s = !0), r.data("scrollWrapper").stop(!0, !1), e === "id" && n._trigger("scrollingToElementId", null, {
        elementId: t
      }), r.data("scrollWrapper").animate({
        scrollLeft: r.data("scrollXPos")
      }, {
        duration: i.scrollToAnimationDuration,
        easing: i.scrollToEasingFunction,
        complete: function () {
          if (n.destroyed) return;
          s && n.startAutoScrolling(), n._showHideHotSpots(!0);
          switch (e) {
          case "first":
            n._trigger("scrolledToFirstElement");
            break;
          case "start":
            n._trigger("scrolledToStartElement");
            break;
          case "last":
            n._trigger("scrolledToLastElement");
            break;
          case "number":
            n._trigger("scrolledToElementNumber", null, {
              elementNumber: t
            });
            break;
          case "id":
            n._trigger("scrolledToElementId", null, {
              elementId: t
            });
            break;
          default:
          }
        }
      }))
    },
    move: function (e) {
      var t = this,
        n = this.element,
        r = this.options;
      n.data("scrollWrapper").stop(!0, !0);
      if (e < 0 && n.data("scrollWrapper").scrollLeft() > 0 || e > 0 && n.data("scrollableAreaWidth") > n.data("scrollWrapper").innerWidth() + n.data("scrollWrapper").scrollLeft()) r.easingAfterMouseWheelScrolling ? n.data("scrollWrapper").animate({
        scrollLeft: n.data("scrollWrapper").scrollLeft() + e
      }, {
        duration: r.easingAfterMouseWheelScrollingDuration,
        easing: r.easingAfterMouseWheelFunction,
        complete: function () {
          t._showHideHotSpots(), r.manualContinuousScrolling && (e > 0 ? t._checkContinuousSwapRight() : t._checkContinuousSwapLeft())
        }
      }) : (n.data("scrollWrapper").scrollLeft(n.data("scrollWrapper").scrollLeft() + e), t._showHideHotSpots(), r.manualContinuousScrolling && (e > 0 ? t._checkContinuousSwapRight() : t._checkContinuousSwapLeft()))
    },
    getFlickrContent: function () {},
    getAjaxContent: function () {},
    getHtmlContent: function (t, n, r) {
      var i = this,
        s = this.element,
        o;
      r !== undefined ? r.length > 0 ? o = e("<div>").html(t).find(r) : o = t : o = t;
      switch (n) {
      case "addFirst":
        s.data("scrollableArea").prepend(o), s.data("scrollWrapper").scrollLeft(s.data("startingPosition10")), s.data("scrollXPos", s.data("startingPosition10"));
        break;
      case "addLast":
        s.data("scrollableArea").append(o);
        break;
      default:
        s.data("scrollableArea").html(o)
      }
      i.recalculateScrollableArea(), i._trigger("addedHtmlContent")
    },
    recalculateScrollableArea: function () {
      var e = 0,
        t = !1,
        n = this.options,
        r = this.element;
      r.data("scrollableArea").css("width", ""), e += r.data("scrollWrapper").prop("scrollWidth"), e += r.data("scrollWrapperLeftPadding") * 2, t || r.data("startAtElementId", ""), r.data("scrollableAreaWidth", e)
    },
    getScrollerOffset: function () {
      var e = this.element;
      return e.data("scrollWrapper").scrollLeft()
    },
    stopAutoScrolling: function () {
      var e = this,
        t = this.element;
      t.data("autoScrollingInterval") !== null && (clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._showHideHotSpots(), e._trigger("autoScrollingStopped"))
    },
    startAutoScrolling: function () {
      var e = this,
        t = this.element,
        n = this.options;
      t.data("enabled") && (e._showHideHotSpots(), clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._trigger("autoScrollingStarted"), t.data("autoScrollingInterval", setInterval(function () {
        if (!t.data("visible") || t.data("scrollableAreaWidth") <= t.data("scrollWrapper").innerWidth()) clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null);
        else {
          t.data("previousScrollLeft", t.data("scrollWrapper").scrollLeft());
          switch (n.autoScrollingDirection) {
          case "right":
            t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + n.autoScrollingStep), t.data("previousScrollLeft") === t.data("scrollWrapper").scrollLeft() && (e._trigger("autoScrollingRightLimitReached"), clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._trigger("autoScrollingIntervalStopped"));
            break;
          case "left":
            t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() - n.autoScrollingStep), t.data("previousScrollLeft") === t.data("scrollWrapper").scrollLeft() && (e._trigger("autoScrollingLeftLimitReached"), clearInterval(t.data("autoScrollingInterval")), t.data("autoScrollingInterval", null), e._trigger("autoScrollingIntervalStopped"));
            break;
          case "backAndForth":
            t.data("pingPongDirection") === "right" ? t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + n.autoScrollingStep) : t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() - n.autoScrollingStep), t.data("previousScrollLeft") === t.data("scrollWrapper").scrollLeft() && (t.data("pingPongDirection") === "right" ? (t.data("pingPongDirection", "left"), e._trigger("autoScrollingRightLimitReached")) : (t.data("pingPongDirection", "right"), e._trigger("autoScrollingLeftLimitReached")));
            break;
          case "endlessLoopRight":
            t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + n.autoScrollingStep), e._checkContinuousSwapRight();
            break;
          case "endlessLoopLeft":
            t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() - n.autoScrollingStep), e._checkContinuousSwapLeft();
            break;
          default:
          }
        }
      }, n.autoScrollingInterval)))
    },
    _checkContinuousSwapRight: function () {
      var t = this.element,
        n = this.options;
      t.data("getNextElementWidth") && (n.startAtElementId.length > 0 && t.data("startAtElementHasNotPassed") ? (t.data("swapAt", e("#" + n.startAtElementId).outerWidth(!0)), t.data("startAtElementHasNotPassed", !1)) : t.data("swapAt", t.data("scrollableArea").children(":first").outerWidth(!0)), t.data("getNextElementWidth", !1));
      if (t.data("swapAt") <= t.data("scrollWrapper").scrollLeft()) {
        t.data("swappedElement", t.data("scrollableArea").children(":first").detach()), t.data("scrollableArea").append(t.data("swappedElement"));
        var r = t.data("scrollWrapper").scrollLeft();
        t.data("scrollWrapper").scrollLeft(r - t.data("swappedElement").outerWidth(!0)), t.data("getNextElementWidth", !0)
      }
    },
    _checkContinuousSwapLeft: function () {
      var t = this.element,
        n = this.options;
      t.data("getNextElementWidth") && (n.startAtElementId.length > 0 && t.data("startAtElementHasNotPassed") ? (t.data("swapAt", e("#" + n.startAtElementId).outerWidth(!0)), t.data("startAtElementHasNotPassed", !1)) : t.data("swapAt", t.data("scrollableArea").children(":first").outerWidth(!0)), t.data("getNextElementWidth", !1)), t.data("scrollWrapper").scrollLeft() === 0 && (t.data("swappedElement", t.data("scrollableArea").children(":last").detach()), t.data("scrollableArea").prepend(t.data("swappedElement")), t.data("scrollWrapper").scrollLeft(t.data("scrollWrapper").scrollLeft() + t.data("swappedElement").outerWidth(!0)), t.data("getNextElementWidth", !0))
    },
    restoreOriginalElements: function () {
      var e = this,
        t = this.element;
      t.data("scrollableArea").html(t.data("originalElements")), e.recalculateScrollableArea(), e.jumpToElement("first")
    },
    show: function () {
      var e = this.element;
      e.data("visible", !0), e.show()
    },
    hide: function () {
      var e = this.element;
      e.data("visible", !1), e.hide()
    },
    enable: function () {
      var e = this.element;
      e.data("enabled", !0)
    },
    disable: function () {
      var e = this,
        t = this.element;
      e.stopAutoScrolling(), clearInterval(t.data("rightScrollingInterval")), clearInterval(t.data("leftScrollingInterval")), clearInterval(t.data("hideHotSpotBackgroundsInterval")), t.data("enabled", !1)
    },
    destroy: function () {
      var t = this,
        n = this.element;
      this.destroyed = !0, t.stopAutoScrolling(), clearInterval(n.data("rightScrollingInterval")), clearInterval(n.data("leftScrollingInterval")), clearInterval(n.data("hideHotSpotBackgroundsInterval")), n.data("scrollingHotSpotRight").unbind("mouseover"), n.data("scrollingHotSpotRight").unbind("mouseout"), n.data("scrollingHotSpotRight").unbind("mousedown"), n.data("scrollingHotSpotLeft").unbind("mouseover"), n.data("scrollingHotSpotLeft").unbind("mouseout"), n.data("scrollingHotSpotLeft").unbind("mousedown"), n.unbind("mousenter"), n.unbind("mouseleave"), n.data("scrollingHotSpotRight").remove(), n.data("scrollingHotSpotLeft").remove(), n.data("scrollableArea").remove(), n.data("scrollWrapper").remove(), n.html(n.data("originalElements")), e(window).off("resize", this.onWindowResize), e.Widget.prototype.destroy.apply(this, arguments)
    }
  })
}(jQuery);
var Handlebars = {};
Handlebars.VERSION = "1.0.beta.6", Handlebars.helpers = {}, Handlebars.partials = {}, Handlebars.registerHelper = function (e, t, n) {
  n && (t.not = n), this.helpers[e] = t
}, Handlebars.registerPartial = function (e, t) {
  this.partials[e] = t
}, Handlebars.registerHelper("helperMissing", function (e) {
  if (arguments.length === 2) return undefined;
  throw new Error("Could not find property '" + e + "'")
});
var toString = Object.prototype.toString,
  functionType = "[object Function]";
Handlebars.registerHelper("blockHelperMissing", function (e, t) {
  var n = t.inverse || function () {}, r = t.fn,
    i = "",
    s = toString.call(e);
  s === functionType && (e = e.call(this));
  if (e === !0) return r(this);
  if (e === !1 || e == null) return n(this);
  if (s === "[object Array]") {
    if (e.length > 0)
      for (var o = 0, u = e.length; o < u; o++) i += r(e[o]);
    else i = n(this);
    return i
  }
  return r(e)
}), Handlebars.registerHelper("each", function (e, t) {
  var n = t.fn,
    r = t.inverse,
    i = "";
  if (e && e.length > 0)
    for (var s = 0, o = e.length; s < o; s++) i += n(e[s]);
  else i = r(this);
  return i
}), Handlebars.registerHelper("if", function (e, t) {
  var n = toString.call(e);
  return n === functionType && (e = e.call(this)), !e || Handlebars.Utils.isEmpty(e) ? t.inverse(this) : t.fn(this)
}), Handlebars.registerHelper("unless", function (e, t) {
  var n = t.fn,
    r = t.inverse;
  return t.fn = r, t.inverse = n, Handlebars.helpers["if"].call(this, e, t)
}), Handlebars.registerHelper("with", function (e, t) {
  return t.fn(e)
}), Handlebars.registerHelper("log", function (e) {
  Handlebars.log(e)
}), Handlebars.Exception = function (e) {
  var t = Error.prototype.constructor.apply(this, arguments);
  for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
  this.message = t.message
}, Handlebars.Exception.prototype = new Error, Handlebars.SafeString = function (e) {
  this.string = e
}, Handlebars.SafeString.prototype.toString = function () {
  return this.string.toString()
},
function () {
  var e = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  }, t = /&(?!\w+;)|[<>"'`]/g,
    n = /[&<>"'`]/,
    r = function (t) {
      return e[t] || "&amp;"
    };
  Handlebars.Utils = {
    escapeExpression: function (e) {
      return e instanceof Handlebars.SafeString ? e.toString() : e == null || e === !1 ? "" : n.test(e) ? e.replace(t, r) : e
    },
    isEmpty: function (e) {
      return typeof e == "undefined" ? !0 : e === null ? !0 : e === !1 ? !0 : Object.prototype.toString.call(e) === "[object Array]" && e.length === 0 ? !0 : !1
    }
  }
}(), Handlebars.VM = {
  template: function (e) {
    var t = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function (e, t, n) {
        var r = this.programs[e];
        return n ? Handlebars.VM.program(t, n) : r ? r : (r = this.programs[e] = Handlebars.VM.program(t), r)
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };
    return function (n, r) {
      return r = r || {}, e.call(t, Handlebars, n, r.helpers, r.partials, r.data)
    }
  },
  programWithDepth: function (e, t, n) {
    var r = Array.prototype.slice.call(arguments, 2);
    return function (n, i) {
      return i = i || {}, e.apply(this, [n, i.data || t].concat(r))
    }
  },
  program: function (e, t) {
    return function (n, r) {
      return r = r || {}, e(n, r.data || t)
    }
  },
  noop: function () {
    return ""
  },
  invokePartial: function (e, t, n, r, i, s) {
    options = {
      helpers: r,
      partials: i,
      data: s
    };
    if (e === undefined) throw new Handlebars.Exception("The partial " + t + " could not be found");
    if (e instanceof Function) return e(n, options);
    if (!Handlebars.compile) throw new Handlebars.Exception("The partial " + t + " could not be compiled when running in runtime-only mode");
    return i[t] = Handlebars.compile(e), i[t](n, options)
  }
}, Handlebars.template = Handlebars.VM.template,
function () {
  this.JST || (this.JST = {}), this.JST["gallery-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["gallery-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t) {
        var r = "",
          i;
        r += "\n  ", u = n.show_master_gallery_title, i = u || e.show_master_gallery_title, a = f.noop, a.hash = {}, a.fn = a, a.inverse = f.program(2, m, t), u && typeof i === l ? i = i.call(e, a) : i = d.call(e, i, a);
        if (i || i === 0) r += i;
        r += "\n  \n  ", u = n.show_owner_name, i = u || e.show_owner_name, a = f.noop, a.hash = {}, a.fn = a, a.inverse = f.program(4, g, t), u && typeof i === l ? i = i.call(e, a) : i = d.call(e, i, a);
        if (i || i === 0) r += i;
        r += "\n\n  ", u = n.show_dates, i = u || e.show_dates, a = f.noop, a.hash = {}, a.fn = a, a.inverse = f.program(6, y, t), u && typeof i === l ? i = i.call(e, a) : i = d.call(e, i, a);
        if (i || i === 0) r += i;
        r += "\n\n  ", u = n.show_quark_owner_names, i = u || e.show_quark_owner_names, a = f.noop, a.hash = {}, a.fn = a, a.inverse = f.program(8, b, t), u && typeof i === l ? i = i.call(e, a) : i = d.call(e, i, a);
        if (i || i === 0) r += i;
        r += "\n\n  ", u = n.show_view_counts, i = u || e.show_view_counts, a = f.noop, a.hash = {}, a.fn = a, a.inverse = f.program(10, w, t), u && typeof i === l ? i = i.call(e, a) : i = d.call(e, i, a);
        if (i || i === 0) r += i;
        return r += "\n\n", r
      }

      function m(e, t) {
        return "\n    .parent-gallery-title { display: none; }\n  "
      }

      function g(e, t) {
        return "\n    .monoGallery .introPanel .juxByline { display: none !important; }\n    .multiGallery .introPanel .juxByline { display: none !important; }\n  "
      }

      function y(e, t) {
        return "\n    #gallery .date { display: none; }\n  "
      }

      function b(e, t) {
        var r = "",
          i;
        return r += "\n    ", r += '\n    #gallery .quark[data-owner-id="', u = n.owner, i = u || e.owner, i = i === null || i === undefined || i === !1 ? i : i.id, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "owner.id", {
          hash: {}
        })), r += p(i) + '"] .byline { display: none !important; }\n  ', r
      }

      function w(e, t) {
        return "\n    #gallery .view-count { display: none; }\n    #gallery .date:after { display: none; }\n  "
      }

      function E(e, t) {
        return "\n  #gallery .byline:after { display: none; }\n"
      }

      function S(e, t) {
        var r = "",
          i;
        r += "\n  ", u = n.title_font, i = u || e.title_font, a = f.program(15, x, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof i === l ? i = i.call(e, a) : i = d.call(e, i, a);
        if (i || i === 0) r += i;
        return r += "\n\n  .cornerButton {\n    border-color: ", u = n.title_font, i = u || e.title_font, i = i === null || i === undefined || i === !1 ? i : i.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "title_font.color", {
          hash: {}
        })), r += p(i) + " transparent transparent transparent;\n  }\n\n  .theme-dusk .cornerButton {\n    background-color: ", u = n.title_font, i = u || e.title_font, i = i === null || i === undefined || i === !1 ? i : i.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "title_font.color", {
          hash: {}
        })), r += p(i) + "\n  }\n\n  .galleryInfo .juxByline, \n  .theme-day .linkroll,\n  .theme-day .fullviewHeading .parent-gallery-title {\n    font-family: '", u = n.author_font, i = u || e.author_font, i = i === null || i === undefined || i === !1 ? i : i.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "author_font.family", {
          hash: {}
        })), r += p(i) + "' !important;\n  }\n\n  .galleryPreview .juxTitle,\n  .article.hasTextExtract .title-text,\n  .fullviewHeading .quarkPreview .quarkTextInner .title2 .title-text,\n  .theme-day .blockquote .title-text,\n  .theme-day .countdown .title-text,\n  .theme-day .galleryHeadingWithQuarks .groupOf2-1.photo .title-text,\n  .theme-dusk .thumbstripQuarkDisplayname,\n  .theme-dusk .dockWrapper .galleryTitle  {\n      font-family: '", u = n.quark_title_font, i = u || e.quark_title_font, i = i === null || i === undefined || i === !1 ? i : i.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "quark_title_font.family", {
          hash: {}
        })), r += p(i) + "' !important;\n  }\n\n  .theme-dusk .blockquote .title-text,\n  .theme-dusk .countdown .title-text,\n  .article.noTextExtract,\n  .photo .title-text,\n  .slideshow .title-text,\n  .streetview .title-text,\n  .video .title-text,\n  .theme-day .thumbstripQuarkDisplayname,\n  .theme-day .dockWrapper .galleryTitle {\n      font-family: '", u = n.caption_font, i = u || e.caption_font, i = i === null || i === undefined || i === !1 ? i : i.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "caption_font.family", {
          hash: {}
        })), r += p(i) + "' !important;\n  }\n\n  .description,\n  .extract,\n  .theme-day #socialMenu .dialog-formField-label,  \n  .theme-day #socialMenu textarea,\n  .theme-day #socialMenu .commentText,\n  .theme-dusk .fullviewHeading .parent-gallery-title {\n      font-family: '", u = n.text_font, i = u || e.text_font, i = i === null || i === undefined || i === !1 ? i : i.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "text_font.family", {
          hash: {}
        })), r += p(i) + "' !important;\n  }\n\n", r
      }

      function x(e, t) {
        var r = "",
          i;
        return r += "\n    .handheld .parent-gallery-title, \n    .juxTitle {\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    }\n\n    .theme-day .friendConnectBar {\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    }\n\n    .followName, \n    .subGalleryTitle,\n    .dockedGalleryTitle,\n    .galleryTitle {\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n    }\n\n    .introPanel .juxTitle {\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em;\n    }\n\n    .galleryInfo-sub-child,\n    .titleWrapper {\n      border-top-color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";    \n    }\n\n    .theme-day :not(.hasChildGalleries) .galleryRow:not(.galleryHeadingRow):last-child {\n      border-bottom-color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";        \n    }\n\n    .theme-dusk :not(.hasChildGalleries) .galleryRow:not(.galleryHeadingRow):last-child {\n      border-bottom-color: #000;        \n    }\n\n    .theme-day .fullviewHeading .titleWrapper {\n      border-color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    }\n\n    .theme-day .titleWrapper {\n      border-bottom-color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";        \n    }\n        \n    .theme-day #gallery .quarkPreviewGroup .groupOf1-0.blockquote.hasDisplayname .title2 {\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";    \n    }\n\n    .theme-day #gallery .quarkPreviewGroup .groupOf1-0.article.hasDisplayname.hasTextExtract .title2 {\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";    \n    }    \n  ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.gallery, o = u || t.gallery, a = f.program(1, v, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      s += "\n\n", u = n.hideDotDivider, o = u || t.hideDotDivider, a = f.program(12, E, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      s += "\n\n\n", s += '\n#gallery,\n.fullviewHeading-horizontal .galleryInfo,\n.fullviewHeading-vertical .galleryInfo,\n.fullviewHeading-verticalWide .galleryInfo,\n.fullviewHeading-overlay .galleryInfo:before,\n.fullviewHeading-overlay .galleryInfo.expanded .galleryInfo-child,\n.galleryInfoExpanderArrow,\n.theme-dusk .dockWrapper,\n.theme-dusk .dockWrapper[data-gallery-count="2"] #galleryDock .previewThumbArrowContainer,\n.theme-dusk .dockWrapper .galleryTitle {\n  background-color: ', u = n.galleryInfoBackground, o = u || t.galleryInfoBackground, typeof o === l ? o = o.call(t, {
        hash: {}
      }) : o === h && (o = c.call(t, "galleryInfoBackground", {
        hash: {}
      })), s += p(o) + ';\n}\n.theme-dusk .dockWrapper[data-gallery-count="2"] .galleryButton,\n.theme-dusk .dockWrapper #galleryDock {\n  border-color: ', u = n.galleryInfoBackground, o = u || t.galleryInfoBackground, typeof o === l ? o = o.call(t, {
        hash: {}
      }) : o === h && (o = c.call(t, "galleryInfoBackground", {
        hash: {}
      })), s += p(o) + ";\n}\n.galleryInfoExpander {\n  box-shadow: inset 0px -5.5em 4em -2em ", u = n.galleryInfoBackground, o = u || t.galleryInfoBackground, typeof o === l ? o = o.call(t, {
        hash: {}
      }) : o === h && (o = c.call(t, "galleryInfoBackground", {
        hash: {}
      })), s += p(o) + ";\n}\n\n\n\n", u = n.selected_theme_settings, o = u || t.selected_theme_settings, a = f.program(14, S, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["gallery-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["menus/comments-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["menus/comments-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += '\n  <div class="comment" data-user-id="', u = n.owner, s = u || e.owner, s = s === null || s === undefined || s === !1 ? s : s.id, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "owner.id", {
          hash: {}
        })), i += p(s) + '" data-comment-cid="', u = n.cid, s = u || e.cid, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "cid", {
          hash: {}
        })), i += p(s) + '">\n    <div class="commentByline"><a class="commentUsername" href="', u = n.owner, s = u || e.owner, s = s === null || s === undefined || s === !1 ? s : s.gallery_url, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "owner.gallery_url", {
          hash: {}
        })), i += p(s) + '" target="_blank">', u = n.owner, s = u || e.owner, s = s === null || s === undefined || s === !1 ? s : s.displayname_or_username, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "owner.displayname_or_username", {
          hash: {}
        })), i += p(s) + '</a> said</div>\n    <div class="commentText">', u = n.text, s = u || e.text, u = n.nl2br, o = u || r.nl2br, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...nl2br", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        return i += "</div>\n  </div>\n", i
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.comments, o = u || t.comments, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["menus/comments-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["menus/menuButton-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["menus/menuButton-html"] = Handlebars.template(function (e, t, n, r, i) {
      n = n || e.helpers;
      var s = "",
        o, u, a = this,
        f = "function",
        l = n.helperMissing,
        c = void 0,
        h = this.escapeExpression;
      return s += '<a href="javascript:void(0)" class="menuItem ', u = n.linkCls, o = u || t.linkCls, typeof o === f ? o = o.call(t, {
        hash: {}
      }) : o === c && (o = l.call(t, "linkCls", {
        hash: {}
      })), s += h(o) + " ", u = n.name, o = u || t.name, typeof o === f ? o = o.call(t, {
        hash: {}
      }) : o === c && (o = l.call(t, "name", {
        hash: {}
      })), s += h(o) + '" title="', u = n.hoverTitle, o = u || t.hoverTitle, typeof o === f ? o = o.call(t, {
        hash: {}
      }) : o === c && (o = l.call(t, "hoverTitle", {
        hash: {}
      })), s += h(o) + '">\n  <span class="icon"></span>\n  <span class="iconHover"></span>\n  <div class="menuItemText normal">', u = n.title, o = u || t.title, typeof o === f ? o = o.call(t, {
        hash: {}
      }) : o === c && (o = l.call(t, "title", {
        hash: {}
      })), s += h(o) + '</div>\n  <div class="menuItemText hover">', u = n.hoverTitle, o = u || t.hoverTitle, typeof o === f ? o = o.call(t, {
        hash: {}
      }) : o === c && (o = l.call(t, "hoverTitle", {
        hash: {}
      })), s += h(o) + "</div>\n</a>\n", s
    }), HandlebarsTemplates["menus/menuButton-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["menus/popoverMenu-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["menus/popoverMenu-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t) {
        var r = "",
          i;
        return r += '\n      <li class="popover-list-item">\n        <a class="popover-list-item-link" href="', u = n.url, i = u || e.url, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "url", {
          hash: {}
        })), r += p(i) + '" data-menu-item-id=', u = n.id, i = u || e.id, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "id", {
          hash: {}
        })), r += p(i) + ">", u = n.title, i = u || e.title, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "title", {
          hash: {}
        })), r += p(i) + "</a>\n      </li>\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      s += '<div class="popover">\n  <ul class="popover-list">\n    ', u = n.items, o = u || t.items, a = f.program(1, v, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n  </ul>\n</div>\n", s
    }), HandlebarsTemplates["menus/popoverMenu-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["menus/socialMenu-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["menus/socialMenu-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t) {
        var r = "",
          i;
        return r += '\n        <div class="shareAction" data-elem="', u = n.name, i = u || e.name, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "name", {
          hash: {}
        })), r += p(i) + '"></div>\n      ', r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      s += '<div class="userSocialInfo" data-elem="user-social-info"></div>\n  <div class="shareActions">\n    <div class="shareActions-inner">    \n      ', u = n.shareItems, o = u || t.shareItems, a = f.program(1, v, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += '\n    </div>\n  </div>\n</div>\n<div id="commentsContainer">\n  <div id="newCommentContainer">\n    <div id="noCommentsCallout">Start the conversation!</div>\n    ', s += '\n  </div>\n  <div id="commentsList">', s += "</div>\n</div>\n", s
    }), HandlebarsTemplates["menus/socialMenu-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["menus/userSocialInfo-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["menus/userSocialInfo-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t) {
        var r = "",
          i;
        return r += '\n  <a class="followersContainer isEnabled" href="', a = n.followersUrl, i = a || e.followersUrl, typeof i === c ? i = i.call(e, {
          hash: {}
        }) : i === p && (i = h.call(e, "followersUrl", {
          hash: {}
        })), r += d(i) + '">\n    <div class="followLabel">Followers</div>\n    <div class="followNumber">', a = n.userData, i = a || e.userData, i = i === null || i === undefined || i === !1 ? i : i.follower_count, typeof i === c ? i = i.call(e, {
          hash: {}
        }) : i === p && (i = h.call(e, "userData.follower_count", {
          hash: {}
        })), r += d(i) + "</div>\n  </a>\n", r
      }

      function m(e, t) {
        var r = "",
          i;
        return r += '\n  <div class="followersContainer">\n    <div class="followLabel">Followers</div>\n    <div class="followNumber">', a = n.userData, i = a || e.userData, i = i === null || i === undefined || i === !1 ? i : i.follower_count, typeof i === c ? i = i.call(e, {
          hash: {}
        }) : i === p && (i = h.call(e, "userData.follower_count", {
          hash: {}
        })), r += d(i) + "</div>\n  </div>\n", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += '\n  <a class="followingContainer isEnabled" href="', a = n.followingUrl, i = a || e.followingUrl, typeof i === c ? i = i.call(e, {
          hash: {}
        }) : i === p && (i = h.call(e, "followingUrl", {
          hash: {}
        })), r += d(i) + '">\n    <div class="followLabel">Following</div>\n    <div class="followNumber">', a = n.userData, i = a || e.userData, i = i === null || i === undefined || i === !1 ? i : i.following_count, typeof i === c ? i = i.call(e, {
          hash: {}
        }) : i === p && (i = h.call(e, "userData.following_count", {
          hash: {}
        })), r += d(i) + "</div>\n  </a>\n", r
      }

      function y(e, t) {
        var r = "",
          i;
        return r += '\n  <div class="followingContainer">\n    <div class="followLabel">Following</div>\n    <div class="followNumber">', a = n.userData, i = a || e.userData, i = i === null || i === undefined || i === !1 ? i : i.following_count, typeof i === c ? i = i.call(e, {
          hash: {}
        }) : i === p && (i = h.call(e, "userData.following_count", {
          hash: {}
        })), r += d(i) + "</div>\n  </div>\n", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f, l = this,
        c = "function",
        h = n.helperMissing,
        p = void 0,
        d = this.escapeExpression;
      s += '<div class="followContainer">\n  <a href="', a = n.userData, o = a || t.userData, o = o === null || o === undefined || o === !1 ? o : o.gallery_url, typeof o === c ? o = o.call(t, {
        hash: {}
      }) : o === p && (o = h.call(t, "userData.gallery_url", {
        hash: {}
      })), s += d(o) + '" class="followName">', a = n.userData, o = a || t.userData, o = o === null || o === undefined || o === !1 ? o : o.displayname_or_username, typeof o === c ? o = o.call(t, {
        hash: {}
      }) : o === p && (o = h.call(t, "userData.displayname_or_username", {
        hash: {}
      })), s += d(o) + '</a>\n  <div class="followButtonContainer" data-elem="follow"></div>\n</div>\n\n', a = n.userData, o = a || t.userData, o = o === null || o === undefined || o === !1 ? o : o.follower_count, u = n["if"], f = l.program(1, v, i), f.hash = {}, f.fn = f, f.inverse = l.program(3, m, i), o = u.call(t, o, f);
      if (o || o === 0) s += o;
      s += "\n\n", a = n.userData, o = a || t.userData, o = o === null || o === undefined || o === !1 ? o : o.following_count, u = n["if"], f = l.program(5, g, i), f.hash = {}, f.fn = f, f.inverse = l.program(7, y, i), o = u.call(t, o, f);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["menus/userSocialInfo-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/creditOverlay-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/creditOverlay-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "\n  ", u = n.service_media_url, s = u || e.service_media_url, o = n["if"], a = f.programWithDepth(m, t, r), a.hash = {}, a.fn = a, a.inverse = f.noop, s = o.call(e, s, a);
        if (s || s === 0) i += s;
        i += '\n  <div class="creditWrapper">\n    ', u = n.service_creator_displayname, s = u || e.service_creator_displayname, o = n["if"], a = f.programWithDepth(g, t, r), a.hash = {}, a.fn = a, a.inverse = f.noop, s = o.call(e, s, a);
        if (s || s === 0) i += s;
        i += '\n    <div class="license">\n      ', u = n.shouldLinkToLicense, s = u || r.shouldLinkToLicense, o = n["if"], a = f.programWithDepth(w, t, r), a.hash = {}, a.fn = a, a.inverse = f.programWithDepth(E, t, r), s = o.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n      ", u = n.allowDownload, s = u || r.allowDownload, o = n["if"], a = f.programWithDepth(S, t, r), a.hash = {}, a.fn = a, a.inverse = f.noop, s = o.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n     </div>\n  </div>\n", i
      }

      function m(e, t, r) {
        var i = "",
          s;
        return i += '\n    <a class="linkToService" href="', u = n.service_media_url, s = u || e.service_media_url, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "service_media_url", {
          hash: {}
        })), i += p(s) + '" target="_blank">view&nbsp;on<div class="serviceName">', u = n.serviceName, s = u || r.serviceName, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "......serviceName", {
          hash: {}
        })), i += p(s) + "</div></a>\n  ", i
      }

      function g(e, t, r) {
        var i = "",
          s, o;
        i += '\n      <div class="creator">\n        Photo by\n        ', u = n.creatorHomepage, s = u || r.creatorHomepage, o = n["if"], a = f.programWithDepth(y, t, r), a.hash = {}, a.fn = a, a.inverse = f.program(7, b, t), s = o.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n      </div>\n    ", i
      }

      function y(e, t, r) {
        var i = "",
          s;
        return i += '\n          <a href="', u = n.creatorHomepage, s = u || r.creatorHomepage, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, ".........creatorHomepage", {
          hash: {}
        })), i += p(s) + '" target="_blank" class="serviceCreatorDisplayname">', u = n.service_creator_displayname, s = u || e.service_creator_displayname, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "service_creator_displayname", {
          hash: {}
        })), i += p(s) + "</a>\n        ", i
      }

      function b(e, t) {
        var r = "",
          i;
        return r += "\n          ", u = n.service_creator_displayname, i = u || e.service_creator_displayname, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "service_creator_displayname", {
          hash: {}
        })), r += p(i) + "\n        ", r
      }

      function w(e, t, r) {
        var i = "",
          s;
        return i += '\n        <a class="licenseText" href="', u = n.license, s = u || e.license, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "license", {
          hash: {}
        })), i += p(s) + '" target="_blank">', u = n.licenseText, s = u || r.licenseText, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "......licenseText", {
          hash: {}
        })), i += p(s) + "</a>\n      ", i
      }

      function E(e, t, r) {
        var i = "",
          s;
        return i += "\n        ", u = n.licenseText, s = u || r.licenseText, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "......licenseText", {
          hash: {}
        })), i += p(s) + "\n      ", i
      }

      function S(e, t, r) {
        var i = "",
          s;
        return i += '\n        <a href="', u = n.downloadUrl, s = u || r.downloadUrl, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "......downloadUrl", {
          hash: {}
        })), i += p(s) + '" target="_blank" class="download" title="Download original photo">', u = n.downloadText, s = u || r.downloadText, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "......downloadText", {
          hash: {}
        })), i += p(s) + "</a>\n      ", i
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.picture, o = u || t.picture, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/creditOverlay-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/individual/_twitter_username-html"] = function () {
    Handlebars.registerPartial("_quarks_individual_twitter_username-html", Handlebars.template(function (e, t, n, r, i) {
      function v(e, t) {
        var r = "",
          i, s;
        r += '\n  <span id="twitter-username-wrap" class="twitter-username-color" ', u = n.twitter_username, i = u || e.twitter_username, s = n.unless, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, i = s.call(e, i, a);
        if (i || i === 0) r += i;
        return r += '>\n    <a id="twitter-link" class="twitter-username-color" target="_blank" href="http://twitter.com/#!/', u = n.twitter_username, i = u || e.twitter_username, u = n.encodeURIComponent, s = u || e.encodeURIComponent, typeof s === l ? i = s.call(e, i, {
          hash: {}
        }) : s === h ? i = c.call(e, "encodeURIComponent", i, {
          hash: {}
        }) : i = s, r += p(i) + '">\n      @<span data-elem="twitter-username">', u = n.twitter_username, i = u || e.twitter_username, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "twitter_username", {
          hash: {}
        })), r += p(i) + "</span>\n    </a>\n  </span>\n", r
      }

      function m(e, t) {
        return 'style="display: none;"'
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.owner, o = u || t.owner, a = f.program(1, v, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }))
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/individual/countdown_title-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/individual/countdown_title-html"] = Handlebars.template(function (e, t, n, r, i) {
      function d(e, t, r) {
        var i = "",
          s, o;
        i += '\n  <div data-elem="quarkTitleWrap" class="quark-title ', u = n.subtitle, s = u || e.subtitle, o = n["if"], a = f.program(2, v, t), a.hash = {}, a.fn = a, a.inverse = f.noop, s = o.call(e, s, a);
        if (s || s === 0) i += s;
        i += '">\n    <div class="numSlides" data-elem="numSlides">', u = n.numSlides, s = u || r.numSlides, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...numSlides", {
          hash: {}
        }));
        if (s || s === 0) i += s;
        i += '</div>\n    <div class="slideshowTitle" data-elem="title">', u = n.title, s = u || e.title, u = n.nl2brAndAutolinkUrls, o = u || e.nl2brAndAutolinkUrls, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "nl2brAndAutolinkUrls", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        i += '</div>\n    <div class="slideshowSubtitle" data-elem="subtitle">', u = n.subtitle, s = u || e.subtitle, u = n.nl2brAndAutolinkUrls, o = u || e.nl2brAndAutolinkUrls, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "nl2brAndAutolinkUrls", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        return i += '</div>\n  </div>\n  <div class="start-button">\n    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="52px" viewBox="0 0 32 52" enable-background="new 0 0 32 52" xml:space="preserve"><polyline fill="none" stroke-width="3" points="4.153,2.122 27.084,26.06 4.153,50 "/>\n    </svg>\n  </div>\n\n  <div data-elem="bylineWrap" class="bylineWrap slideshowByline">\n    ', i += "\n  </div>\n", i
      }

      function v(e, t) {
        return "hasSubtitle"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(d, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = p.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/individual/countdown_title-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/individual/countdown_title_handheld-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/individual/countdown_title_handheld-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += '\n  <div class="quark-title-wrap">\n    <div class="quark-title">\n      <div class="quark-title-inner">\n        <div class="quark-title-innermost background">\n          <div class="jux-posted ', u = n.show_posted_time, s = u || e.show_posted_time, o = n.unless, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, s = o.call(e, s, a);
        if (s || s === 0) i += s;
        i += '" data-elem="date">\n            ', i += '\n            <span data-elem="month" class="month">', u = n.date, s = u || r.date, s = s === null || s === undefined || s === !1 ? s : s.month, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...date.month", {
          hash: {}
        })), i += p(s) + '</span>\n              <span data-elem="day" class="day">', u = n.date, s = u || r.date, s = s === null || s === undefined || s === !1 ? s : s.day, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...date.day", {
          hash: {}
        })), i += p(s) + '</span>.\n              <span data-elem="year" class="year">', u = n.date, s = u || r.date, s = s === null || s === undefined || s === !1 ? s : s.year, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...date.year", {
          hash: {}
        })), i += p(s) + '</span>\n          </div>\n          <div class="jux-title-content">\n            <h1 class="slideshowTitle" data-elem="title">', u = n.title, s = u || e.title, u = n.nl2brAndAutolinkUrls, o = u || e.nl2brAndAutolinkUrls, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "nl2brAndAutolinkUrls", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        i += '</h1>\n            <div class="slideshowSubtitle" data-elem="subtitle">', u = n.subtitle, s = u || e.subtitle, u = n.nl2brAndAutolinkUrls, o = u || e.nl2brAndAutolinkUrls, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "nl2brAndAutolinkUrls", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        return i += '</div>\n            <div data-elem="bylineWrap" class="slideshowByline bylineWrap">\n              ', i += "\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n", i
      }

      function m(e, t) {
        return "hidden"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/individual/countdown_title_handheld-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/individual/slideshow_title-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/individual/slideshow_title-html"] = Handlebars.template(function (e, t, n, r, i) {
      function d(e, t) {
        var r = "",
          i, s;
        r += '\n  <div data-elem="quarkTitleWrap" class="quark-title ', u = n.subtitle, i = u || e.subtitle, s = n["if"], a = f.program(2, v, t), a.hash = {}, a.fn = a, a.inverse = f.noop, i = s.call(e, i, a);
        if (i || i === 0) r += i;
        r += '">\n    <div class="slideshowTitle" data-elem="title">', u = n.title, i = u || e.title, u = n.nl2brAndAutolinkUrls, s = u || e.nl2brAndAutolinkUrls, typeof s === l ? i = s.call(e, i, {
          hash: {}
        }) : s === h ? i = c.call(e, "nl2brAndAutolinkUrls", i, {
          hash: {}
        }) : i = s;
        if (i || i === 0) r += i;
        r += '</div>\n    <div class="slideshowSubtitle" data-elem="subtitle">', u = n.subtitle, i = u || e.subtitle, u = n.nl2brAndAutolinkUrls, s = u || e.nl2brAndAutolinkUrls, typeof s === l ? i = s.call(e, i, {
          hash: {}
        }) : s === h ? i = c.call(e, "nl2brAndAutolinkUrls", i, {
          hash: {}
        }) : i = s;
        if (i || i === 0) r += i;
        return r += '</div>\n  </div>\n  <div class="start-button">\n    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="52px" viewBox="0 0 32 52" enable-background="new 0 0 32 52" xml:space="preserve"><polyline fill="none" stroke-width="3" points="4.153,2.122 27.084,26.06 4.153,50 "/>\n    </svg>\n  </div>\n\n  <div data-elem="bylineWrap" class="bylineWrap slideshowByline">\n    ', r += "\n  </div>\n", r
      }

      function v(e, t) {
        return "hasSubtitle"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.program(1, d, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = p.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/individual/slideshow_title-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/individual/slideshow_title_handheld-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/individual/slideshow_title_handheld-html"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += '\n  <div class="quark-title-wrap jux-bg-color">\n    <div class="quark-title">\n      <div class="quark-title-inner">\n        <div class="quark-title-innermost">\n          <div class="jux-posted ', u = n.show_posted_time, s = u || e.show_posted_time, o = n.unless, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, s = o.call(e, s, a);
        if (s || s === 0) i += s;
        i += '" data-elem="date">\n            ', i += '\n            <span data-elem="month" class="month">', u = n.date, s = u || r.date, s = s === null || s === undefined || s === !1 ? s : s.month, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...date.month", {
          hash: {}
        })), i += p(s) + '</span>\n              <span data-elem="day" class="day">', u = n.date, s = u || r.date, s = s === null || s === undefined || s === !1 ? s : s.day, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...date.day", {
          hash: {}
        })), i += p(s) + '</span>.\n              <span data-elem="year" class="year">', u = n.date, s = u || r.date, s = s === null || s === undefined || s === !1 ? s : s.year, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "...date.year", {
          hash: {}
        })), i += p(s) + '</span>\n          </div>\n          <div class="jux-title-content">\n            <h1 class="slideshowTitle" data-elem="title">', u = n.title, s = u || e.title, u = n.nl2brAndAutolinkUrls, o = u || e.nl2brAndAutolinkUrls, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "nl2brAndAutolinkUrls", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        i += '</h1>\n            <div class="slideshowSubtitle" data-elem="subtitle">', u = n.subtitle, s = u || e.subtitle, u = n.nl2brAndAutolinkUrls, o = u || e.nl2brAndAutolinkUrls, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "nl2brAndAutolinkUrls", s, {
          hash: {}
        }) : s = o;
        if (s || s === 0) i += s;
        return i += '</div>\n            <div data-elem="bylineWrap" class="slideshowByline bylineWrap">\n              ', i += "\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n", i
      }

      function m(e, t) {
        return "hidden"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/individual/slideshow_title_handheld-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/individual/streetview-html"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/individual/streetview-html"] = Handlebars.template(function (e, t, n, r, i) {
      function d(e, t) {
        var r = "",
          i, s;
        r += '\n  <div data-elem="streetviewWrap" class="streetviewWrap" style="height: 100%;">\n    <div data-elem="map" class="map" style="width: 100%; height: 100%;"></div>\n    \n    <div data-elem="infoCard" class="infoCard backgroundColor">\n      <div class="infoWrap">\n        <div data-elem="title" class="title titleFont">\n          ', u = n.title, i = u || e.title, u = n.nl2brAndAutolinkUrls, s = u || e.nl2brAndAutolinkUrls, typeof s === l ? i = s.call(e, i, {
          hash: {}
        }) : s === h ? i = c.call(e, "nl2brAndAutolinkUrls", i, {
          hash: {}
        }) : i = s;
        if (i || i === 0) r += i;
        r += '\n        </div>\n        \n        <div data-elem="caption" class="caption captionFont">\n          ', u = n.caption, i = u || e.caption, u = n.nl2brAndAutolinkUrls, s = u || e.nl2brAndAutolinkUrls, typeof s === l ? i = s.call(e, i, {
          hash: {}
        }) : s === h ? i = c.call(e, "nl2brAndAutolinkUrls", i, {
          hash: {}
        }) : i = s;
        if (i || i === 0) r += i;
        return r += '\n        </div>\n        \n        <div class="bylineWrap">\n          ', r += "\n        </div>\n      </div>\n    </div>\n  </div>\n", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.program(1, d, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = p.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/individual/streetview-html"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/article-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/article-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .title-font {\n    ", u = n.title_font, s = u || e.title_font, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .articleContent-author,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .articleContent-title:after {\n    border-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "\n  .notIE #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .titleText {\n    color: transparent !important;\n    text-shadow: 0 0 .09em ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  .notIE #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .articleContent-author {\n    color: transparent !important;\n    text-shadow: 0 0 .18em ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  .notIE #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .text-font   {\n    color: transparent !important;\n    text-shadow: 0 0 .125em ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .articleContent-author,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .articleContent-title:after {\n    border-color: rgba( ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.4);\n  }\n\n  \n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .articleContent-author,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .text-font {\n    color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight-shadow, \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .articleContent-author {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n    box-shadow: -12px 0px 0px 0px ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ", 8px 0px 0px 0px ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + "\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .text-font {\n    background-color: ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + ";\n    box-shadow: -12px 0px 0px 0px ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + ", 8px 0px 0px 0px ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + "\n  }\n  \n\n  ", i += "\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight-shadow {\n    background-color: transparent !important;\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight-shadow, \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .articleContent-author,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .text-font {\n    box-shadow: none;\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .layout-handheld.reverse .wrapper,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .articleContent-background  {\n    background-color: ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n  \n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .transparent .titleText  {\n    color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 ) !important;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .transparent .articleContent-author,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .transparent .articleContent-title:after {\n    border-color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 );\n  }\n\n\n  ", i += "  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .neon .titleText  {\n    text-shadow: 0 0 .625em ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ", 0 0 .25em ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ", 0 0 .04em ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .neon .articleContent-author,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .neon .articleContent-title:after {\n    border-color: ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .shadow .titleText {\n    color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.7 ) !important;\n    text-shadow: .15em .12em 0 rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.3 ) !important;\n  }\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .shadow .articleContent-author,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .shadow .articleContent-title:after {\n    border-color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 );\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + ".multiquark-first .articleContent-title:after {\n    border-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .columns-2 {\n    border-left: 1px solid rgba( ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.2 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-frame.textPosition-right .picture-container {\n    border-right: 1px solid rgba( ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.2 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-frame.textPosition-left .picture-container {\n    border-left: 1px solid rgba( ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.2 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .text-font {\n    ", u = n.text_font, s = u || e.text_font, a = f.program(4, g, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .articleContent-author {\n    color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.9 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";  \n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .text-font::selection {\n    color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n    background-color: ", u = n.text_font, s = u || e.text_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "text_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .layout-handheld .wrapper,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .articleContent-background  {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-fill .articleContent-background {\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.9 );\n  }\n  \n  \n  ", i += "\n  .multiquark-scrollDownBar.quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n    background-color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.5 );\n  }\n  .multiquark-scrollDownBar.quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .multiquark-scrollDownBar-arrow,\n  .multiquark-scrollDownBar.quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + ":before {\n    border-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + " transparent transparent transparent;\n    border-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 ) transparent transparent transparent;\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-frame {\n    box-shadow: inset 0 2px 3px rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 ), inset 0px -2px 3px rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n  ", i += "\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .title-font {\n    font-size: 28px;\n    letter-spacing: -.5px;\n  }\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + ".multiquark-first .title-font,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + ".multiquark-first .bylineItem {\n    color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + ".multiquark-first .articleContent-title,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + ".multiquark-first .articleContent-author {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .text-font:before {\n    border-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + " transparent transparent transparent;\n  }\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .text-font {\n    font-size: 16px;\n  }\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .articleContent-title {\n  }\n\n", i
      }

      function m(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px/1 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) :
          i === h && (i = c.call(e, "family", {
            hash: {}
          })), r += p(i) + "';\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
            hash: {}
          }) : i === h && (i = c.call(e, "size", {
            hash: {}
          })), r += p(i) + "px;\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
            hash: {}
          }) : i === h && (i = c.call(e, "color", {
            hash: {}
          })), r += p(i) + ";\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/article-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/blockquote-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/blockquote-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        return i += "\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .content-wrap, #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineWrap .ui-label {\n    color: ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blockquote-text {\n    font-family: '", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.family, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.family", {
          hash: {}
        })), i += p(s) + "';\n\n    ", i += "\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blockquote-text {\n    font-size: 24px !important;\n  }\n  \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-fit .content-wrap,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-frame .content-wrap {\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.5 ) !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColor {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "\n  .notIE #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .blockquote-text {  ", i += "\n    color: transparent !important;\n    text-shadow: 0 0 .09em ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .blur .bylineWrap .ui-label {\n    opacity: 0.5 !important;\n  }\n  \n  ", i += "  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .neon .blockquote-text  {\n    text-shadow: 0 0 .625em ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + ", 0 0 .25em ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + ", 0 0 .04em ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight  {\n    color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .reverse .highlight-shadow  {\n    background-color: ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + ";\n    box-shadow: -.25em 0px 0px 0px ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + ", .175em 0px 0px 0px ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + "\n  }\n  \n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .shadow .blockquote-text {\n    color: rgba( ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.7 ) !important;\n    text-shadow: .15em .12em 0 rgba( ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.3 ) !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .shadow .bylineWrap .ui-label {\n    color: rgba( ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.7 ) !important;\n  }\n  \n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .transparent .blockquote-text, \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .transparent .bylineWrap .ui-label  {\n    color: ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "font.color", {
          hash: {}
        })), i += p(s) + ";\n    color: rgba( ", u = n.font, s = u || e.font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 ) !important;\n  }\n\n", i
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/blockquote-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/countdown-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/countdown-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "\n  \n  ", i += "\n  ", i += " \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowTitle {\n    ", u = n.title_font, s = u || e.title_font, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowTitle {\n      font-size: 28px !important;\n    }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .hasSubtitle .slideshowTitle {\n    border-bottom: 1px solid rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .hasSubtitle .slideshowTitle {\n      border-bottom: none;\n    }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .numSlides {\n    font-family: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.family, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.family", {
          hash: {}
        })), i += p(s) + ";\n    color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }  \n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowSubtitle {\n    ", u = n.subtitle_font, s = u || e.subtitle_font, a = f.program(4, g, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "  \n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowSubtitle {\n      font-size: 12px !important;\n    }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowByline {\n    border-top: 1px solid rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowByline {\n      border-top: none;\n    }  \n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineItem {\n    color: ", u = n.subtitle_font, s = u || e.subtitle_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "subtitle_font.color", {
          hash: {}
        })), i += p(s) + "; \n  }    \n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + "  .start-button {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " polyline {\n    stroke: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .quark-title:before {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .picture-container:before {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n    background-color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.85 );\n  }\n\n  ", i += "\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideTitle {\n    ", u = n.item_title_font, s = u || e.item_title_font, a = f.program(6, y, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }  \n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideTitle {\n      font-size: 20px !important;\n    }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideNumber {\n    font-family: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.family, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.family", {
          hash: {}
        })), i += p(s) + ";\n    color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  \n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideDescription {\n    ", u = n.body_text_font, s = u || e.body_text_font, a = f.program(8, b, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n  }\n\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideDescription {\n      font-size: 12px !important;\n    }\n\n\n  ", i += "\n\n  ", i += " \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .background {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n  \n  ", i += " \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .background-semitransparent {\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.7 )\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .background-overlay  {\n    background-color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.18 );\n  }  \n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideNumber-background {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";   \n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .quark-title-inner:after {\n    border-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " transparent transparent transparent;\n  }\n\n", i
      }

      function m(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1.4 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function y(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function b(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1.4 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/countdown-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/creation-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/creation-css"] = Handlebars.template(function (e, t, n, r, i) {
      function h(e, t) {
        return "\n\n  \n\n"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.program(1, h, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = c.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/creation-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/creationSubchild-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/creationSubchild-css"] = Handlebars.template(function (e, t, n, r, i) {
      function h(e, t) {
        return "\n\n"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.program(1, h, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = c.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/creationSubchild-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/multiquark-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/multiquark-css"] = Handlebars.template(function (e, t, n, r, i) {
      function h(e, t) {
        return "\n\n"
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.program(1, h, i), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = c.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/multiquark-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/photo-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/photo-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .captionFont {\n    ", u = n.caption_font, s = u || e.caption_font, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .captionColor { color: ", u = n.caption_font, s = u || e.caption_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "caption_font.color", {
          hash: {}
        })), i += p(s) + "; }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .nameFont,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineItem {\n    ", u = n.name_font, s = u || e.name_font, a = f.program(4, g, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n  }\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineWrap {\n    color: ", u = n.name_font, s = u || e.name_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "name_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColor {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  ", i += " \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-fill .backgroundColor {\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.94 ) !important;\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-frame .frameBox {\n    background-color: rgba( ", u = n.caption_font, s = u || e.caption_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 ) !important;\n  }\n\n\n  ", i += "\n\n  ", i += "\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .captionFont {\n    font-size: 18px;\n  }\n\n", i
      }

      function m(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "', serif;\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px;\n    ", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "', serif;\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px;\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/photo-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/slideshow-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/slideshow-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "\n  \n  ", i += "\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowTitle {\n    ", u = n.title_font, s = u || e.title_font, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowTitle {\n      font-size: 28px !important;\n    }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .hasSubtitle .slideshowTitle {\n    border-bottom: 1px solid rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .hasSubtitle .slideshowTitle {\n      border-bottom: none;\n    }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowSubtitle {\n    ", u = n.subtitle_font, s = u || e.subtitle_font, a = f.program(4, g, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "  \n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowSubtitle {\n      font-size: 12px !important;\n    }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .titleSlide .frameBox,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .titleSlide .pictureSize-fit .content-wrap {\n    background-color: rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.12 ) ; \n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + "  .start-button {\n    background-color: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " polyline {\n    stroke: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideTitle {\n    ", u = n.item_title_font, s = u || e.item_title_font, a = f.program(6, y, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }  \n  \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideTitle {\n    font-size: 20px !important;\n  }\n  \n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideDescription {\n    ", u = n.body_text_font, s = u || e.body_text_font, a = f.program(8, b, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideDescription {\n    font-size: 12px;\n  }\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowByline {\n    border-top: 1px solid rgba( ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n    ", i += "\n    .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .slideshowByline {\n      border-top: none;\n    }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineItem {\n    color: ", u = n.subtitle_font, s = u || e.subtitle_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "subtitle_font.color", {
          hash: {}
        })), i += p(s) + "; \n  }\n\n\n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColor,\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .quark-title-innermost {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " !important;\n  }\n\n  ", i += " \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .pictureSize-fill .jux-bg-color {\n    background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " !important;\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.9 ) !important;\n  }\n  \n  ", i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .frameBox {\n    background-color: rgba( ", u = n.item_title_font, s = u || e.item_title_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .quark-title-wrap {\n    background-color: transparent !important;\n  }\n\n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .quark-title-inner:after {\n    border-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " transparent transparent transparent;\n  }\n\n", i
      }

      function m(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof
        i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1.4 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function y(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function b(e, t) {
        var r = "",
          i;
        return r += "\n      font: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "em/1.4 '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "';\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/slideshow-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/streetview-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/streetview-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .titleFont {\n    ", u = n.title_font, s = u || e.title_font, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .captionFont {\n    ", u = n.caption_font, s = u || e.caption_font, a = f.program(4, g, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n  }\n  \n  \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .titleFont {\n    font-size: 24px;\n  }\n  \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .captionFont {\n    font-size: 12px;\n  }\n    \n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineWrap {\n    color: ", u = n.caption_font, s = u || e.caption_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "caption_font.color", {
          hash: {}
        })), i += p(s) + ";\n    color: rgba( ", u = n.caption_font, s = u || e.caption_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 ) !important;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .twitter-username-color { \n    color: ", u = n.caption_font, s = u || e.caption_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "caption_font.color", {
          hash: {}
        })), i += p(s) + ";\n    color: rgba( ", u = n.caption_font, s = u || e.caption_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.6 ) !important;\n  }\n  \n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColor { background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + "; }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .infoCard:after { border-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + " transparent transparent transparent; }\n\n  \n", i
      }

      function m(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "', serif;\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px;\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "', serif;\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px;\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/streetview-css"]
  }.call(this)
}.call(this),
function () {
  this.JST || (this.JST = {}), this.JST["quarks/stylesheets/video-css"] = function () {
    return this.HandlebarsTemplates || (this.HandlebarsTemplates = {}), this.HandlebarsTemplates["quarks/stylesheets/video-css"] = Handlebars.template(function (e, t, n, r, i) {
      function v(e, t, r) {
        var i = "",
          s, o;
        i += "\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .titleFont {\n    ", u = n.title_font, s = u || e.title_font, a = f.program(2, m, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        i += "\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .videoExpanderArrow\n  {\n  	background: -webkit-linear-gradient(left, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",0) 0, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",1.0) 50%);\n    background: -moz-linear-gradient(left, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",0) 0, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",1.0) 50%);\n    opacity: 0.4;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .videoExpanderArrow polyline\n  {\n    stroke: ", u = n.title_font, s = u || e.title_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "title_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n  \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .titleFont {\n    font-size: 24px;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .nameFont {\n    color: ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "description_font.color", {
          hash: {}
        })), i += p(s) + ";\n    color: rgba( ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.5 ) !important;\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .nameFont a {\n    color: ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "description_font.color", {
          hash: {}
        })), i += p(s) + ";\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .byline:before {\n    border-color: rgba( ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.2 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .video-description {\n    ", u = n.description_font, s = u || e.description_font, a = f.program(4, g, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof s === l ? s = s.call(e, a) : s = d.call(e, s, a);
        if (s || s === 0) i += s;
        return i += "\n  }\n  \n  .handheld #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .video-description {\n    font-size: 12px;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .bylineWrap {\n    color: ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "description_font.color", {
          hash: {}
        })), i += p(s) + ";\n    color: rgba( ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.65 ) !important;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .nameAndSocialDivider,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .socialAndDateDivider,\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .socialIcon a {\n    color: ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "description_font.color", {
          hash: {}
        })), i += p(s) + ";\n    color: rgba( ", u = n.description_font, s = u || e.description_font, s = s === null || s === undefined || s === !1 ? s : s.color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.4 ) !important;\n  }\n  \n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColor { background-color: ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "color_scheme.background_color", {
          hash: {}
        })), i += p(s) + "; }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColorFaded {\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.15 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .backgroundColorFadedMore {\n    background-color: rgba( ", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ", 0.05 );\n  }\n\n  #quark_", u = n.clientId, s = u || e.clientId, typeof s === l ? s = s.call(e, {
          hash: {}
        }) : s === h && (s = c.call(e, "clientId", {
          hash: {}
        })), i += p(s) + " .frame_top .textWrapper:after {\n    background: -webkit-linear-gradient(top, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",0) 0, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",1) 70%);\n    background: -moz-linear-gradient(top, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",0) 0, rgba(", u = n.color_scheme, s = u || e.color_scheme, s = s === null || s === undefined || s === !1 ? s : s.background_color, u = n.hexToRgb, o = u || r.hexToRgb, typeof o === l ? s = o.call(e, s, {
          hash: {}
        }) : o === h ? s = c.call(e, "...hexToRgb", s, {
          hash: {}
        }) : s = o, i += p(s) + ",1) 70%);\n  }\n\n", i
      }

      function m(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "', serif;\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px;\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }

      function g(e, t) {
        var r = "",
          i;
        return r += "\n      font-family: '", u = n.family, i = u || e.family, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "family", {
          hash: {}
        })), r += p(i) + "', serif;\n      font-size: ", u = n.size, i = u || e.size, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "size", {
          hash: {}
        })), r += p(i) + "px;\n      color: ", u = n.color, i = u || e.color, typeof i === l ? i = i.call(e, {
          hash: {}
        }) : i === h && (i = c.call(e, "color", {
          hash: {}
        })), r += p(i) + ";\n    ", r
      }
      n = n || e.helpers;
      var s = "",
        o, u, a, f = this,
        l = "function",
        c = n.helperMissing,
        h = void 0,
        p = this.escapeExpression,
        d = n.blockHelperMissing;
      u = n.quark, o = u || t.quark, a = f.programWithDepth(v, i, t), a.hash = {}, a.fn = a, a.inverse = f.noop, u && typeof o === l ? o = o.call(t, a) : o = d.call(t, o, a);
      if (o || o === 0) s += o;
      return s += "\n", s
    }), HandlebarsTemplates["quarks/stylesheets/video-css"]
  }.call(this)
}.call(this), Jux.namespace("app.collections", "app.components", "app.components.contentEditable", "app.components.controls", "app.components.controls.colorSets", "app.components.controls.fonts", "app.components.controls.itemSelector", "app.components.controls.listEditor", "app.components.mediaPicker", "app.components.mediaPicker.thumbnailsContainer", "app.components.mediaPicker.picturePicker", "app.components.mediaPicker.picturePicker.facebook", "app.components.mediaPicker.picturePicker.instagram", "app.components.slideshow", "app.components.slideshow.slide", "app.components.ui.layout", "app.controllers", "app.controllers.gallery.edit", "app.controllers.quark.edit", "app.helpers", "app.managers", "app.models", "app.routers", "app.views", "app.views.appManager", "app.views.gallery", "app.views.palette", "app.views.palette.controls", "app.views.palette.controls.carousel", "app.views.palette.controls.profileCustomizer", "app.views.menu", "app.views.menu.menuItem", "app.views.navBar", "app.views.navigation", "app.views.dock", "app.views.quark", "app.views.quark.article", "app.views.quark.article.layouts.desktop", "app.views.quark.article.layouts.iPad", "app.views.quark.badge", "app.views.quark.blockquote", "app.views.quark.blockquote.layouts", "app.views.quark.blockquote.layouts.desktop", "app.views.quark.blockquote.layouts.iPad", "app.views.quark.countdown", "app.views.quark.countdown.layouts", "app.views.quark.creation", "app.views.quark.creationSubchild", "app.views.quark.creationSubchild.components", "app.views.quark.creationSubchild.components", "app.views.quark.creationSubchild.components.componentLayouts", "app.views.quark.creation.layouts", "app.views.quark.creation.layouts.desktop", "app.views.quark.creation.layouts.desktop.1", "app.views.quark.creation.layouts.handheld", "app.views.quark.creation.layouts.tablet", "app.views.quark.multiquark", "app.views.quark.photo", "app.views.quark.photo.layouts", "app.views.quark.shared", "app.views.quark.slideshow", "app.views.quark.slideshow.layouts", "app.views.quark.streetview", "app.views.quark.video", "app.views.quark.video.layouts", "app.views.quark.video.player", "app.views.quark.video.player.layout", "app.views.galleryTakeover", "app.views.toggle", "app.views.xsome", "app.views.xsome.introPanel"), app.Defaults = {
  titles: {
    explore: "SURF JUX",
    feed: "NEW",
    editable: "CLICK TO TITLE",
    master_static: "EVERYTHING",
    subgallery_static: "My Sweet Jux"
  },
  galleryTitleColorToBackgroundMap: {
    day: {
      "#0195b7": "#e4ece9",
      "#B06D25": "#f8f8f8",
      "#797c7f": "#faf9f5",
      "#de1b1e": "#fcf4e9",
      fallback: "#FFF"
    },
    dusk: {
      "#D8F87A": "#3b3838",
      "#99E6E7": "#3b3838",
      "#70BAF1": "#3b3838",
      "#D25036": "#2E3435",
      "#D22983": "#2E3435",
      fallback: "#1e1e1e"
    }
  },
  creationFiltersByGenreAndMood: {
    Photo: {
      Dawn: ["dawn"],
      Day: ["day"],
      Afternoon: ["afternoon"],
      Dusk: ["dusk"],
      Night: ["night"]
    },
    Article: {
      Dawn: ["dawn"],
      Day: ["day"],
      Afternoon: ["afternoon"],
      Dusk: ["dusk"],
      Night: ["night"]
    },
    Blockquote: {
      Dawn: ["dawn"],
      Day: ["day"],
      Afternoon: ["afternoon"],
      Dusk: ["dusk"],
      Night: ["night"]
    },
    Bubble: {
      Dawn: ["dawn"],
      Day: ["day"],
      Afternoon: ["afternoon"],
      Dusk: ["dusk"],
      Night: ["night"]
    },
    Daydream: {
      Dawn: ["cream"],
      Day: ["blue"],
      Afternoon: ["red"],
      Dusk: ["sepia"],
      Night: ["black_and_white"]
    }
  },
  quarksPerPageDefault: 12,
  galleriesPerPageDefault: 8,
  quarksDefaults: function () {
    var e = {};
    return e.quark = {
      author_enabled: !0,
      badge: ""
    }, e.article = _.extend({
      title: "A Sweet Tale",
      text: 'They were crazily verbal, crazily charismatic, crazy with talent. They sang songs that were parodic and brilliant, which they’d written themselves and which were like a private language: I memorized them, as I would a record by The Residents or Frank Zappa.\n\nThese girls blew hot, and were often mockingly affectionate or even briefly lusty in my direction, but in their willingness to show disdain, to crush unworthiness like a bug, they were fundamentally cool, cool, cool.\n\nWords by Jonathan Lethem\nPhoto by <a href="https://jamesramos.jux.com">James Ramos</a> ',
      font_effect: "",
      layout: "left",
      text_alignment: "justify",
      picture_size: "fit",
      picture_size_is_default: !0,
      color_scheme: {
        background_color: "#fff",
        accent_color: "#000"
      },
      title_font: {
        size: 60,
        color: "#474443",
        family: "alternateGothic"
      },
      text_font: {
        size: 16,
        color: "#808083",
        family: "Muli"
      },
      background_picture: {
        id: "519cff981a1102d449000002",
        source: null,
        url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/25/44/607/article_fit.jpg",
        description: null,
        hidden: !1,
        license: "",
        original_created_at: null,
        service: null,
        service_creator_displayname: null,
        service_creator_id: null,
        service_creator_username: null,
        service_media_id: null,
        service_media_url: null,
        service_uploaded_at: null,
        title: null,
        facial_center: null,
        height: 934,
        width: 860
      }
    }, e.quark), e.countdown = _.extend({
      picture: {
        id: "519cffa31a1102d449000008",
        source: null,
        url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/25/55/68/countdown_fill.jpg",
        description: null,
        hidden: !1,
        license: "",
        original_created_at: null,
        service: null,
        service_creator_displayname: null,
        service_creator_id: null,
        service_creator_username: null,
        service_media_id: null,
        service_media_url: null,
        service_uploaded_at: null,
        title: null,
        facial_center: {
          x: 90.61111111111111,
          y: 63.40033500837521
        },
        height: 935,
        width: 1410
      }
    }, e.quark), e.slideshow = _.extend({
      picture: {
        id: "519cffb21a1102d44900000f",
        source: null,
        url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/26/10/152/slideshow_fill.jpg",
        description: null,
        hidden: !1,
        license: "",
        original_created_at: null,
        service: null,
        service_creator_displayname: null,
        service_creator_id: null,
        service_creator_username: null,
        service_media_id: null,
        service_media_url: null,
        service_uploaded_at: null,
        title: null,
        facial_center: null,
        height: 934,
        width: 1410
      }
    }, e.quark), e.video = _.extend({
      background_picture: {
        id: "50821bef869bbf07cb000004",
        source: null,
        url: "http://jux-user-files-prod.s3.amazonaws.com/2012/10/20/03/35/10/793/slide_blockquote_fill.jpg",
        description: null,
        hidden: !1,
        license: "",
        original_created_at: null,
        service: null,
        service_creator_displayname: null,
        service_creator_id: null,
        service_creator_username: null,
        service_media_id: null,
        service_media_url: null,
        service_uploaded_at: null,
        title: null,
        facial_center: null,
        height: 857,
        width: 1400
      }
    }, e.quark), e
  }(),
  getQuarkDefaults: function (e) {
    var t = this.quarksDefaults[e];
    if (!t) throw new Error("The type name '" + e + "' provided to getQuarkDefaults did not match an available quark type. Missing from the quarksDefaults map? Or just mistyped?");
    return t
  },
  getQuarkDefault: function (e, t) {
    var n = this.getQuarkDefaults(e);
    if (!n.hasOwnProperty(t)) throw new Error("The attr name '" + t + "' for type '" + e + "' provided to getQuarkDefault did not match an available attribute default. Missing from the quarkDefaults map? Or just mistyped?");
    return n[t]
  }
}, app.Comments = {
  maxLength: 500
}, app.Share = {
  setup: function (e) {
    this.appManager = e
  },
  email: function (e, t) {
    var n = this.getTitle(e),
      r = "\nI think you might enjoy:",
      i;
    n ? (i = 'Check out "' + n + '"', r += ' \n\n"' + n + '"') : i = "This caught my eye …", r += "\n\n" + this.getUrl(e) + "\n\n\n┈┈┈┈\nShare big and beautiful on Jux: https://jux.com", Jux.Share.email({
      subject: i,
      message: r,
      newWindow: !Jux.isTouch,
      source: this.getSourcePrefix() + t
    })
  },
  facebookShare: function (e, t) {
    var n = {
      link: this.getUrl(e),
      name: this.getTitle(e),
      picture: this.getImageUrl(this.getImageShareQuark(e)) + "?rand=" + Math.floor(Math.random() * 1e4),
      properties: {}
    }, r = this.appManager;
    if (e instanceof app.models.Quark) {
      var i = r.getGalleryOwner();
      if (i) {
        var s = i.get("displayname_or_username");
        n.properties["More by " + s] = {
          text: r.getGalleryTitle(),
          href: i.get("gallery_url")
        }
      }
    }
    t = this.getSourcePrefix() + t, Jux.Share.facebookShare(n, t)
  },
  getImageShareQuark: function (e) {
    return e instanceof app.models.Multiquark ? e.getPreviewQuark() : e
  },
  tweet: function (e, t) {
    var n = this.appManager.getCurrentUser(),
      r = this.getTitle(e),
      i = n && !n.has("twitter_username"),
      s = this.getOwner(e),
      o;
    if (s && (!n || s !== n)) {
      r += " by ";
      var u = s.get("twitter_username");
      u ? r += "@" + u : r += s.get("displayname_or_username")
    }
    i && (o = function (e) {
      n.set("twitter_username", e)
    }), Jux.Share.tweet(r, {
      shareUrl: this.getUrl(e),
      authorize: i,
      callback: o,
      source: this.getSourcePrefix() + t
    })
  },
  getTitle: function (e) {
    var t;
    return e instanceof app.models.Quark ? t = e.get("displayname") : t = this.appManager.getGalleryTitle(), t
  },
  getUrl: function (e) {
    var t;
    return e instanceof app.models.Quark ? t = e.viewingUrl() : e instanceof app.models.User ? t = e.get("gallery_url") : e instanceof app.models.Gallery ? t = e.get("url") : t = Jux.Share.getShareUrl(), t
  },
  getImageUrl: function (e) {
    var t;
    return e instanceof app.models.Quark ? t = e : t = this.appManager.getNewestQuark(), t ? Jux.Hosts.origin + "/quarks/" + t.getId() + "/thumb" : null
  },
  getOwner: function (e) {
    if (e instanceof app.models.Quark || e instanceof app.models.Gallery) e = e.get("owner");
    if (!e || e instanceof app.models.User) return e;
    throw new Error("can't find the owner to be shared")
  },
  getSourcePrefix: function () {
    return (this.appManager.getCurrentUser() ? "auth" : "unauth") + "_"
  },
  signUpAndReturn: function (e, t, n) {
    var r = Jux.Hosts.origin,
      i = {
        return_to: e
      };
    Jux.Facebook.isKnownAccount() ? r += "/users/auth/facebook" : (r += "/users/sign_up", t && (i.title = t), n && (i.description = n)), window.location = r + "?" + jQuery.param(i)
  }
}, app.Theme = Jux.extend(Object, {
  requiredConfigs: ["titleFontOptions", "titleFontColorOptions", "authorFontOptions", "quarktitleFontOptions", "captionFontOptions", "textFontOptions"],
  constructor: function (e) {
    var t = this.requiredConfigs;
    for (var n = 0, r = t.length; n < r; n++)
      if (!e[t[n]]) throw new Error("'" + t[n] + "' config required");
    Jux.apply(this, e)
  },
  getTitleFontOptions: function () {
    return this.titleFontOptions
  },
  getTitleFontColorOptions: function () {
    return this.titleFontColorOptions
  },
  getAuthorFontOptions: function () {
    return this.authorFontOptions
  },
  getQuarktitleFontOptions: function () {
    return this.quarktitleFontOptions
  },
  getCaptionFontOptions: function () {
    return this.captionFontOptions
  },
  getTextFontOptions: function () {
    return this.textFontOptions
  }
}), app.managers.AbstractGallery = Jux.extend(Object, {
  abstractClass: !0,
  currentUser: null,
  useGalleryInPushState: !0,
  constructor: function (e) {
    if (_.isEmpty(e.galleryData)) throw new Error("'galleryData' needs to be passed to the appManager");
    if (typeof e.userCustomizable == "undefined") throw new Error("'userCustomizable' config required");
    this.$htmlAndBody = jQuery("html,body"), this.$galleryStyleEl = jQuery("#galleryStyleEl"), this.$galleryTakeover = jQuery("body"), this.$galleryTakeoverNavBar = jQuery("#galleryNavbar"), this.$juxMenu = jQuery("#juxMenu"), this.$makeNewPanel = jQuery("#make-new-panel"), this.$makeQuarkMenu = jQuery("#addQuarkMenu"), this.$socialMenu = jQuery("#socialMenuContainer "), this.galleryStyleTpl = JST["gallery-css"], this.hasFullViewHeading = jQuery("html").hasClass("galleryWithFullviewHeading");
    if (typeof this.galleryStyleTpl != "function") throw new Error("'galleryStyleTpl' config required");
    if (this.$galleryStyleEl.length === 0) throw new Error("'$galleryStyleEl' config required");
    var t = new app.models.Gallery(e.galleryData);
    this.appState = new app.models.AppState({
      currentGallery: t
    }), this.setupUsers(e), this.userCustomizable = e.userCustomizable, this.currentGalleryQuarks = new app.collections.GalleryQuarks({
      url: t.get("path")
    }), e.initialQuarks && e.initialQuarks.length > 0 && this.currentGalleryQuarks.add(e.initialQuarks), this.appContainer = new app.views.AppContainer({
      appState: this.appState,
      styleTpl: this.galleryStyleTpl,
      $styleEl: this.$galleryStyleEl
    }), this.$html = jQuery("html"), this.socialMenu = new app.views.menu.SocialMenu({
      contentEl: this.$socialMenu,
      currentGallery: t,
      currentUser: this.currentUser,
      appState: this.appState
    }), this.makeQuarkMenu = new app.views.menu.MakeQuarkMenu({
      contentEl: this.$makeQuarkMenu,
      appManager: this
    }), this.makeQuarkMenu.setCurrentGallery(t), this.juxMenu = new app.views.menu.JuxMenu({
      contentEl: this.$juxMenu,
      currentUser: this.currentUser
    }), this.initialize(e), this.setupGalleryView(jQuery("#gallery")), this.galleryTakeover = new app.views.galleryTakeover.GalleryTakeover({
      $el: this.$galleryTakeover,
      currentUser: this.currentUser,
      currentGallery: t,
      appState: this.appState,
      currentGalleryQuarks: this.currentGalleryQuarks,
      inUserGallery: this.isUserGallery(),
      currentGalleryView: this.galleryView,
      hasFullViewHeading: this.hasFullViewHeading,
      atNewest: !! e.atNewest,
      atOldest: !! e.atOldest,
      $galleryTakeoverNavBar: this.$galleryTakeoverNavBar,
      socialMenu: this.socialMenu,
      makeQuarkMenu: this.makeQuarkMenu,
      juxMenu: this.juxMenu
    }), this instanceof app.managers.MultiGallery || (this.router = new app.routers.Gallery({
      appManager: this
    }), Backbone.history.start({
      pushState: !0,
      root: this.getRouterRoot()
    }), this.galleryTakeover.router = this.router), this.appState.on("changeset", this.onNav, this), app.Share.setup(this), this.afterInitialize(e), this.appState.get("currentQuark") || this.galleryView.initContinuousScroll()
  },
  afterInitialize: Jux.emptyFn,
  getRouterRoot: function () {
    var e;
    return this.useGalleryInPushState || (e = this.getGallery().get("path")), e || "/"
  },
  galleryPaletteShouldBeCreated: function () {
    return this.userCustomizable && this.isOwnerGallery()
  },
  createGalleryPalette: Jux.abstractFn,
  showGalleryView: function () {
    this.galleryTakeover.showGalleryView()
  },
  showQuarkView: function (e, t) {
    var n;
    e instanceof app.models.Quark ? (n = e, e = n.getId()) : n = this.currentGalleryQuarks.getById(e);
    if (n) this.galleryTakeover.showQuark(n, t);
    else {
      var r = this;
      app.models.Quark.load(e, {
        success: function (e) {
          r.galleryTakeover.showQuark(e, t)
        },
        error: function () {
          r.appState.set("currentQuark", null)
        }
      })
    }
  },
  mask: function (e) {
    this.$htmlAndBody.css("height", "100%"), this._mask = new ui.Mask(jQuery("body")), this._mask.show()
  },
  unMask: function () {
    var e = this._mask;
    e && (e.destroy(), this._mask = null, this.$htmlAndBody.css("height", ""))
  },
  hideMenus: function () {
    this.galleryTakeover.hideNavMenus()
  },
  initialize: Jux.emptyFn,
  onNav: function (e, t, n) {
    this.updateHtmlTitle(), this.hideMenus();
    var r = e.get("currentQuark"),
      i = this.useGalleryInPushState ? e.get("currentGallery").get("path") : "";
    r ? this.router.navigate(i + "/" + r.getId()) : this.router.navigate(i)
  },
  getGalleryHtmlTitle: function () {
    return this.getGalleryTitle()
  },
  updateHtmlTitle: function () {
    var e = this.galleryTakeover,
      t = e.getCurrentQuark(),
      n;
    t ? n = t.get("htmlTitle") : n = this.getGalleryHtmlTitle(), n = Jux.util.Html.decode(n), n = Jux.util.Html.stripTags(n), document.title = Jux.Util.condense(n) || "Jux"
  },
  setupUsers: function (e) {
    this.initialUsers = new app.collections.Users;
    var t = this.setupCurrentUser(e.currentUserData),
      n = this.getGalleryOwner();
    if (n) {
      this.initialUsers.add(n);
      var r = n.get("google_analytics");
      r && Jux.Analytics.addAccount(r, !0)
    }
    e.quarkOwnersData && this.initialUsers.add(e.quarkOwnersData), Jux.Analytics.setContentCreatorAndCurrentUser({
      contentCreator: n,
      currentUser: t
    })
  },
  setupCurrentUser: function (e) {
    var t;
    if (e) {
      t = new app.models.User(e), t.get("facebook_token") && Jux.Facebook.setKnownAccount();
      var n = t.getPersistenceProxy(),
        r = n.buildUrl;
      n.buildUrl = function (e, t) {
        return t === "read" ? this.urlRoot + "/me" : r.apply(this, arguments)
      }, t.commit(), this.userModelPersister = new app.components.ModelPersister({
        model: t,
        persistDelay: 2e3
      }), this.initialUsers.add(t), this.currentUser = t
    } else Jux.Facebook.isKnownAccount() || Jux.Facebook.init();
    return t
  },
  createGalleryView: Class.abstractMethod,
  onQuarkEdit: function (e, t) {
    this.showQuarkView(t.id, {
      editMode: !0,
      showNav: !0
    })
  },
  setupGalleryView: function (e) {
    var t = this.getGallery();
    this.galleryPaletteShouldBeCreated() ? (this.themes = this.normalizeThemes(app.PaletteConstants.themes), this.createGalleryPalette(), this.galleryModelPersister = new app.components.ModelPersister({
      model: t,
      persistDelay: 2e3
    })) : this.palette = null;
    var n = this.createGalleryView(e);
    return this.galleryView = n, n.on("quarkedit", this.onQuarkEdit, this), n
  },
  createQuark: function (e, t) {
    t = t || {}, e += e.indexOf("#") === -1 ? "#e" : "&e", jQuery.ajax({
      url: e,
      type: "POST",
      dataType: "json",
      success: function (e, n, r) {
        var i = app.models.Quark.fromJSON(e);
        this.currentGalleryQuarks.insertNewlyCreatedQuark(i), this.onQuarkCreated(i), typeof t.success == "function" && t.success.apply(t.scope || window, arguments)
      },
      error: function (e, n, r) {
        Jux.logError("could not create quark. error args: ", arguments), typeof t.error == "function" && t.error.call(t.scope || window)
      },
      context: this
    })
  },
  onQuarkCreated: function (e) {
    window.location = e.editingUrl()
  },
  getCurrentUser: function () {
    return this.currentUser
  },
  getGalleryOwner: function () {
    return this.appState.getGalleryOwner()
  },
  getGallery: function () {
    return this.appState.get("currentGallery")
  },
  getGalleryTitle: Class.abstractMethod,
  getNewestQuark: function () {
    return this.currentGalleryQuarks.newest()
  },
  isUserGallery: function () {
    return !1
  },
  isOwnerGallery: function () {
    return this.isUserGallery() && this.currentUser && this.currentUser === this.getGalleryOwner()
  },
  normalizeThemes: function (e) {
    var t = {};
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        r instanceof app.Theme || (r = new app.Theme(r)), t[n] = r
      }
    return t
  }
}), app.managers.MultiGallery = Jux.extend(app.managers.AbstractGallery, {
  initialize: function (e) {
    if (!e.galleriesData) throw new Error("'galleriesData' config not provided");
    if (!e.galleryTitle) throw new Error("'galleryTitle' config not provided");
    this.galleriesCollection = new app.collections.Galleries(e.galleriesData), this.galleryTitle = e.galleryTitle, this._super(arguments), this.userCustomizable && this.isOwnerGallery() && this.galleriesCollection.on("remove", this.onGalleryRemove, this)
  },
  afterInitialize: function () {
    this.galleryView.show()
  },
  createGalleryPalette: function () {
    var e = this.getGallery(),
      t = e.get("owner"),
      n = this.palette = new app.views.palette.MultiGalleryPalette({
        user: t
      }),
      r = new app.controllers.gallery.edit.MultiGalleryPalette({
        palette: n,
        user: t,
        gallery: e,
        themes: this.themes
      })
  },
  createGalleryView: function (e) {
    return new app.views.gallery.GalleryList({
      palette: this.palette,
      el: e,
      currentUser: this.currentUser,
      currentGallery: this.getGallery(),
      appState: this.appState,
      galleriesCollection: this.galleriesCollection,
      currentGalleryQuarks: this.currentGalleryQuarks,
      socialMenu: this.socialMenu,
      makeQuarkMenu: this.makeQuarkMenu,
      juxMenu: this.juxMenu
    })
  },
  getGalleryTitle: function () {
    return this.galleryTitle ? this.galleryTitle : this.getGallery().get("type") === "MasterGallery" ? app.Defaults.titles.master_static : ""
  },
  onGalleryRemove: function (e) {
    e.getSubGalleries().length === 1 && window.location.reload()
  }
}), app.managers.AbstractQuarksGallery = Jux.extend(app.managers.AbstractGallery, {
  abstractClass: !0,
  initialize: function (e) {
    this._super(arguments);
    var t = e.initialQuark;
    if (t) {
      var n = this.currentGalleryQuarks.getById(t.id);
      if (!n) {
        var r = app.models.Quark.fromJSON(t);
        this.currentGalleryQuarks.add(r), this.appState.set("currentQuark", r)
      }
    }
    this.appState.on("change:currentGallery", this.onGalleryChange, this)
  },
  afterInitialize: Jux.emptyFn,
  createGalleryPalette: function () {
    var e = this.getGallery(),
      t = e.get("owner");
    this.palette = new app.views.palette.UserGalleryPalette({
      user: t
    }), this.paletteController = new app.controllers.gallery.edit.UserGalleryPalette({
      palette: this.palette,
      user: t,
      gallery: e,
      themes: this.themes
    })
  },
  createGalleryView: function (e) {
    var t;
    return Jux.isTablet ? t = app.views.gallery.TabletGallery : Jux.isHandheld ? t = app.views.gallery.HandheldGallery : t = app.views.gallery.DesktopGallery, new t({
      el: e,
      palette: this.palette,
      appManager: this,
      appState: this.appState,
      currentUserModel: this.currentUser,
      currentGalleryQuarks: this.currentGalleryQuarks,
      styleTpl: this.galleryStyleTpl,
      $styleEl: this.$galleryStyleEl,
      $makeNewPanel: this.$makeNewPanel,
      hasFullViewHeading: this.hasFullViewHeading,
      $galleryTakeoverNavBar: this.$galleryTakeoverNavBar,
      currentGallery: this.getGallery(),
      galleryOwner: this.getGalleryOwner(),
      socialMenu: this.socialMenu,
      makeQuarkMenu: this.makeQuarkMenu,
      juxMenu: this.juxMenu
    })
  },
  onGalleryChange: function (e, t, n) {
    this.mask(), n.un("quarkedit", this.onQuarkView, this), this.galleryView.remove(), this.galleryView = null, this.palette && (this.palette.destroy(), this.palette = null, this.paletteController.destroy(), this.paletteController = null), this.currentGalleryQuarks.setUrl(t.get("path"));
    var r = this.galleryModelPersister;
    r && (r.save(), r.destroy(), this.galleryModelPersister = null), t.get("selected_theme_settings") ? this.onGalleryLoaded(t) : t.reload({
      success: function () {
        this.onGalleryLoaded(t)
      },
      scope: this
    })
  },
  onGalleryLoaded: function (e) {
    this.currentGalleryQuarks.removeAll(), this.currentGalleryQuarks.setUrl(e.get("path")), this.makeQuarkMenu.setCurrentGallery(e);
    var t = jQuery('<div id="gallery">');
    t.insertAfter(this.$galleryTakeoverNavBar);
    var n = this.setupGalleryView(t),
      r = !! this.appState.get("currentQuark"),
      i = r ? jQuery.Deferred().resolve() : n.loadAndShow();
    this.galleryTakeover.setCurrentGallery(e, n), this.appContainer.updateAllStyles(), i.done(this.unMask.createDelegate(this))
  }
}), app.managers.ExploreGallery = Jux.extend(app.managers.AbstractQuarksGallery, {
  useGalleryInPushState: !! window.history.pushState,
  getGalleryTitle: function () {
    return app.Defaults.titles.explore
  }
}), app.managers.FeedGallery = Jux.extend(app.managers.AbstractQuarksGallery, {
  getGalleryTitle: function () {
    return app.Defaults.titles.feed
  }
}), app.managers.FriendsGallery = Jux.extend(app.managers.MultiGallery, {
  loadingNewSuggestions: !1,
  sequentialNewSuggestionCalls: 0,
  constructor: function (e) {
    this._super(arguments), this.$noFriends = jQuery(".noFriends"), this.hasAlert = !! jQuery(".flashMessage.alert").length, this.currentUser.get("needs_follow_suggestions_updated") && (this.galleryView.removeNonHeadings(), this.getUpdatedSuggestions()), this.$noFriends.toggle(this.showNoFriends()), this.updateSuggestionsPresent()
  },
  getUpdatedSuggestions: function () {
    this.loadingNewSuggestions = !0, this.sequentialNewSuggestionCalls += 1, this.sequentialNewSuggestionCalls > 10 && window.location.reload(), this.mask();
    var e = this.currentUser,
      t = this;
    e.reload({
      success: function () {
        if (e.get("needs_follow_suggestions_updated")) setTimeout(function () {
          t.getUpdatedSuggestions()
        }, 1e3);
        else {
          var n = t.galleryView.loadNextPage();
          n.done(function () {
            t.loadingNewSuggestions = !1, t.sequentialNewSuggestionCalls = 0, t.showNoFriends() ? t.$noFriends.slideDown() : t.$noFriends.slideUp(), t.updateSuggestionsPresent(), t.galleryView.updateLazyViews(), t.unMask()
          })
        }
      }
    })
  },
  hasSuggestions: function () {
    return this.galleriesCollection.notOwnedBy(this.currentUser).length > 0
  },
  showNoFriends: function () {
    return !!(!this.loadingNewSuggestions && !this.hasAlert && !this.hasSuggestions() && (this.currentUser.hasCurrentFacebookToken() || this.currentUser.get("twitter_username")))
  },
  updateSuggestionsPresent: function () {
    this.galleryView.$el.toggleClass("empty", !this.hasSuggestions())
  }
}), app.managers.UserGallery = Jux.extend(app.managers.AbstractQuarksGallery, {
  initialize: function (e) {
    this._super(arguments);
    var t = this.getGalleryOwner();
    if (!t) throw new Error("UserGallery must have an owner");
    this.currentGalleryQuarks.bind("change:author_enabled", this.updateHtmlTitle, this), this.currentGalleryQuarks.bind("change:displayname", this.updateHtmlTitle, this), this.currentGalleryQuarks.bind("change:slides", this.updateHtmlTitle, this), t.bind("change:displayname", this.updateHtmlTitle, this);
    var n = this.getGallery();
    this.useGalleryInPushState = !! window.history.pushState || this.hasFullviewHeading || !n.isSubGallery(), n.bind("change:title", this.updateHtmlTitle, this), n.bind("change:show_owner_name", this.updateHtmlTitle, this)
  },
  onQuarkCreated: function (e) {
    this.isOwnerGallery() ? this.showQuarkView(e, {
      editMode: !0,
      newQuark: !0
    }) : this._super(arguments)
  },
  onNav: function () {
    this.palette && this.palette.close(), this._super(arguments)
  },
  getGalleryTitle: function () {
    var e = this.getGallery(),
      t = e.get("title"),
      n = app.Defaults.titles,
      r;
    return t ? r = t : e.isSubGallery() ? r = n.subgallery_static : r = n.master_static, r
  },
  getGalleryHtmlTitle: function () {
    var e = this._super(arguments);
    return this.getGallery().get("show_owner_name") && (e += " by " + this.getGalleryOwner().get("displayname_or_username")), e
  },
  isUserGallery: function () {
    return !0
  }
}), Kevlar.attribute.PictureWithOptions = Kevlar.attribute.ModelAttribute.extend({
  embedded: !0,
  beforeSet: function (e, t, n) {
    if (!t) return null;
    var r = this._super(arguments);
    if (t instanceof app.models.PictureWithOptions) r = t;
    else {
      var i;
      t instanceof app.models.Picture ? i = t : i = new app.models.Picture(t);
      var s;
      e.getPreviewPicture && (s = e.getPreviewPicture()), s && s.get("picture") === i ? r = s : r = new app.models.PictureWithOptions({
        picture: i,
        chosen_center: e.get("chosen_center")
      })
    }
    return r
  },
  raw: function (e) {
    return e ? e.get("picture") : null
  }
}), Kevlar.attribute.Attribute.registerType("picturewithoptions", Kevlar.attribute.PictureWithOptions), Kevlar.attribute.Slides = Kevlar.attribute.CollectionAttribute.extend({
  embedded: !0,
  beforeSet: function (e, t, n) {
    var r, i = [];
    return t instanceof app.collections.Slides ? t : n instanceof app.collections.Slides ? n : (t && (i = i.concat(t)), new app.collections.Slides(i))
  }
}), Kevlar.attribute.Attribute.registerType("slides_collection", Kevlar.attribute.Slides), app.models.Model = Kevlar.Model.extend({}), app.models.Asset = app.models.Model.extend({
  attributes: [{
    name: "id",
    type: "string"
  }, {
    name: "description",
    type: "string"
  }, {
    name: "filter",
    type: "string"
  }, {
    name: "hidden",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "license",
    type: "string"
  }, {
    name: "location",
    type: "object"
  }, {
    name: "original_created_at",
    type: "date"
  }, {
    name: "service",
    type: "string"
  }, {
    name: "service_creator_displayname",
    type: "string"
  }, {
    name: "service_creator_id",
    type: "string"
  }, {
    name: "service_creator_username",
    type: "string"
  }, {
    name: "service_media_id",
    type: "string"
  }, {
    name: "service_media_url",
    type: "string"
  }, {
    name: "service_uploaded_at",
    type: "date"
  }, {
    name: "title",
    type: "string"
  }],
  hasDownloadableLicense: function () {
    var e = this.get("license");
    return e ? !! e.match(/^http:\/\/(creativecommons\.org|www\.flickr\.com\/commons)/) : !1
  },
  getServiceCreatorHomepage: function () {
    var e;
    switch (this.get("service")) {
    case "facebook":
      e = "http://www.facebook.com/" + this.get("service_creator_id");
      break;
    case "flickr":
      e = "http://www.flickr.com/people/" + this.get("service_creator_id")
    }
    return e
  }
}), app.models.Media = app.models.Asset.extend({
  initialize: function () {
    this._super(arguments), this.uuid = Jux.Util.uuid(8)
  },
  getComparator: Jux.abstractFn
}), app.models.Picture = app.models.Media.extend({
  attributes: [{
    name: "url",
    type: "string",
    defaultValue: ""
  }, {
    name: "thumbUrl",
    type: "string",
    persist: !1
  }, {
    name: "facial_center",
    type: "object",
    defaultValue: null,
    persist: !1
  }, {
    name: "width",
    type: "int"
  }, {
    name: "height",
    type: "int"
  }, {
    name: "getSize",
    type: "boolean",
    persist: !1
  }, {
    name: "source",
    type: "string"
  }],
  persistenceProxy: {
    type: "rest",
    urlRoot: "/pictures",
    rootProperty: "picture",
    incremental: !0
  },
  initialize: function () {
    this._super(arguments), this.get("getSize") && (this.bind("change:url", this.updateSize, this), this.get("url") && !this.get("width") && !this.get("height") && this.updateSize())
  },
  updateSize: function () {
    var e = "/images/analyze/dimensions?src=" + encodeURIComponent(this.get("url"));
    jQuery.ajax({
      url: e,
      dataType: "json",
      success: function (e) {
        this.set(e)
      },
      context: this
    })
  },
  getThumbUrl: function (e, t, n, r) {
    var i = this.get("thumbUrl");
    r = r || 85;
    if (!i) {
      e = e || "", t = t || "";
      var s = e + "x" + t,
        o = this.get("url");
      if (n) {
        s += "#";
        var u = this.get("facial_center");
        u && u.x && u.y && (s += Math.round(u.x) + "," + Math.round(u.y))
      }
      i = Jux.Magickly.convertImagePathOrUri(o, {
        quality: r,
        thumb: s
      })
    }
    return i
  },
  isDefaultLicenseable: function () {
    var e = this.get("source");
    return e !== "flickr_search" && e !== "url"
  },
  getComparator: function () {
    return this.get("url") || this.uuid
  }
}), app.models.MediaWithOptions = app.models.Model.extend({
  attributes: [{
    name: "id",
    defaultValue: function () {
      return Jux.Util.uuid(8)
    }
  }],
  getComparator: Jux.abstractFn
}), app.models.PictureWithOptions = app.models.MediaWithOptions.extend({
  attributes: function () {
    var e = [{
      name: "picture",
      type: "model",
      modelClass: app.models.Picture,
      embedded: !0
    }, {
      name: "chosen_center",
      type: "object",
      defaultValue: null
    }, {
      name: "viewableImageArea",
      type: "object",
      persist: !1,
      defaultValue: {
        percentWidth: 1,
        percentHeight: 1
      }
    }];
    return _.each(app.models.Picture.prototype.attributes, function (t) {
      var n = t.name;
      n !== "id" && e.push({
        name: n,
        get: function () {
          var e = this.get("picture");
          return e ? e.get(n) : undefined
        },
        set: function (e) {
          var t = this.get("picture");
          t && t.set(n, e)
        }
      })
    }), e
  }(),
  getComparator: function () {
    return this.get("picture").getComparator()
  },
  getThumbUrl: function (e, t, n) {
    return this.get("picture").getThumbUrl(e, t, n)
  },
  isDefaultLicenseable: function () {
    return this.get("picture").isDefaultLicenseable()
  },
  getFocusPoint: function (e) {
    var t = this.get("chosen_center"),
      n;
    return t && typeof t.x != "undefined" && typeof t.y != "undefined" ? {
      x: t.x,
      y: t.y
    } : e && (n = this.get("facial_center")) ? {
      x: n.x,
      y: n.y
    } : {
      x: 50,
      y: 50
    }
  },
  save: function () {
    this.get("picture").save()
  }
}), app.models.ThemeSettingsMap = app.models.Model.extend({
  attributes: [{
    name: "id",
    type: "string"
  }, {
    name: "title_font",
    type: "object"
  }, {
    name: "author_font",
    type: "object"
  }, {
    name: "quark_title_font",
    type: "object"
  }, {
    name: "caption_font",
    type: "object"
  }, {
    name: "text_font",
    type: "object"
  }]
}), app.models.ThemeSettingsByTheme = app.models.Model.extend({
  attributes: [{
    name: "day",
    type: "model",
    modelClass: app.models.ThemeSettingsMap,
    embedded: !0
  }, {
    name: "dusk",
    type: "model",
    modelClass: app.models.ThemeSettingsMap,
    embedded: !0
  }]
}), app.models.User = app.models.Model.extend({
  attributes: [{
    name: "id",
    type: "string"
  }, {
    name: "displayname"
  }, {
    name: "email",
    type: "string",
    defaultValue: null
  }, {
    name: "current_sign_in_at",
    type: "date"
  }, {
    name: "created_at",
    type: "date"
  }, {
    name: "galleries",
    persist: !1
  }, {
    name: "sub_galleries",
    persist: !1,
    get: function () {
      return _.filter(this.get("galleries"), function (e) {
        return e.type === "Gallery"
      })
    },
    set: function (e) {
      throw new Error("read-only attribute")
    }
  }, {
    name: "has_a_mono_gallery",
    persist: !1,
    get: function () {
      var e = this.get("sub_gallery_ids");
      return e ? e.length <= 1 : !0
    },
    set: function () {
      throw new Error("read-only attribute")
    }
  }, {
    name: "show_email",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "show_facebook_link",
    type: "boolean",
    defaultValue: !0
  }, {
    name: "show_twitter_username",
    type: "boolean",
    defaultValue: !0
  }, {
    name: "custom_links",
    type: "collection",
    collectionClass: "app.collections.CustomLinks",
    embedded: !0,
    defaultValue: []
  }, {
    name: "followed_by_current_user",
    type: "boolean",
    persist: !1
  }, {
    name: "follower_count",
    persist: !1
  }, {
    name: "following_count",
    persist: !1
  }, {
    name: "is_admin",
    type: "boolean",
    persist: !1
  }, {
    name: "default_license",
    persist: !1
  }, {
    name: "facebook_token",
    persist: !1
  }, {
    name: "flickr_token",
    persist: !1
  }, {
    name: "instagram_token",
    persist: !1
  }, {
    name: "twitter_token",
    persist: !1
  }, {
    name: "auth_methods",
    persist: !1
  }, {
    name: "needs_follow_suggestions_updated",
    type: "boolean",
    persist: !1
  }, {
    name: "quark_defaults",
    persist: !1
  }, {
    name: "facebook_id",
    type: "string",
    persist: !1
  }, {
    name: "twitter_username",
    type: "string"
  }, {
    name: "username"
  }, {
    name: "validated_custom_domain"
  }, {
    name: "gallery_url",
    persist: !1
  }, {
    name: "google_analytics"
  }, {
    name: "displayname_or_username",
    persist: !1,
    get: function () {
      return this.get("displayname") || this.get("username")
    },
    set: function (e) {
      throw new Error("read-only attribute")
    }
  }, {
    name: "master_gallery_id",
    type: "string",
    persist: !1
  }, {
    name: "sub_gallery_ids",
    persist: !1
  }, {
    name: "fullview",
    type: "boolean",
    persist: !1
  }],
  persistenceProxy: {
    type: "rest",
    urlRoot: "/api/v1/users",
    rootProperty: "user",
    incremental: !0
  },
  getGalleryById: function (e) {
    var t = this.get("galleries");
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].id === e) return t[n];
    return null
  },
  getFacebookUrl: function () {
    var e = this.get("facebook_id");
    return e ? "http://facebook.com/profile.php?id=" + e : ""
  },
  getTwitterUrl: function () {
    var e = this.get("twitter_username");
    return e ? "http://twitter.com/" + e : ""
  },
  hasCurrentFacebookToken: function () {
    var e = this.get("facebook_token");
    if (e && e.expires_at) {
      var t = new Date(e.expires_at);
      if (t.getTime() >= new Date * 1) return !0
    }
    return !1
  },
  hasFacebookPhotoAccess: function () {
    var e;
    return this.hasCurrentFacebookToken() && (e = this.get("facebook_token").permissions) && _.contains(e, "user_photos")
  },
  getFollowersUrl: function () {
    return this.get("gallery_url") + "/followers"
  },
  getFollowingUrl: function () {
    return this.get("gallery_url") + "/following"
  },
  toggleFollow: function (e, t) {
    t = t || {};
    var n = "/users/" + this.getId() + "/",
      r = this.get("follower_count"),
      i = t.error,
      s;
    if (e) {
      s = !e.isFollowing(this);
      var o = e.get("following_count");
      s ? o++ : o--, e.set("following_count", o)
    } else {
      s = !0;
      var u = this;
      i = function (e) {
        e.status === 401 && app.Share.signUpAndReturn(window.location.href, "Join to follow " + u.get("displayname_or_username"), "and make some goodies of your own"), t.error && t.error.apply(this, arguments)
      }
    }
    s ? (r++, n += "follow") : (r--, n += "unfollow"), this.set("followed_by_current_user", s), this.set("follower_count", r), jQuery.ajax({
      url: n + "?persist_unauth=true",
      type: "POST",
      success: t.success,
      error: i
    }), s && Jux.Analytics.trackSocial("jux", "follow", this.get("username"))
  },
  isFollowing: function (e) {
    return e.get("followed_by_current_user")
  }
}), app.models.Quark = app.models.Model.extend({
  abstractClass: !0,
  statics: {
    load: function (e, t) {
      t = t || {};
      var n = function (e) {
        var n = app.models.Quark.fromJSON(e);
        typeof t.success == "function" && t.success.call(t.scope || window, n)
      };
      jQuery.ajax({
        url: "/quarks/" + e,
        type: "GET",
        dataType: "json",
        success: n,
        error: t.error || Jux.emptyFn,
        context: t.scope || window
      })
    },
    fromJSON: function (e, t) {
      var n = _.capitalize(e.type);
      return new app.models[n](e, t)
    }
  },
  attributes: [{
    name: "id",
    type: "string"
  }, {
    name: "type",
    type: "string",
    persist: !0
  }, {
    name: "clientId",
    type: "string",
    persist: !1,
    get: function () {
      return this.getClientId()
    },
    set: function () {
      throw new Error("Can't set this attribute")
    }
  }, {
    name: "gallery_id",
    type: "string"
  }, {
    name: "created_at",
    type: "date"
  }, {
    name: "sort_time",
    type: "date"
  }, {
    name: "owner",
    type: "model",
    modelClass: "app.models.User",
    embedded: !1,
    persist: !1
  }, {
    name: "twitter_username",
    persist: !1,
    set: function (e) {
      this.get("owner").set("twitter_username", e)
    },
    get: function () {
      return this.get("owner").get("twitter_username")
    }
  }, {
    name: "htmlTitle",
    type: "string",
    get: function () {
      return this.getHtmlTitle()
    },
    set: function () {
      throw new Error("Can't set this attribute")
    }
  }, {
    name: "author_enabled",
    type: "boolean",
    defaultValue: app.Defaults.getQuarkDefault("quark", "author_enabled")
  }, {
    name: "show_posted_time",
    type: "boolean",
    defaultValue: !0
  }, {
    name: "badge",
    type: "string",
    defaultValue: app.Defaults.getQuarkDefault("quark", "badge")
  }, {
    name: "hidden",
    type: "boolean"
  }, {
    name: "updated_at"
  }, {
    name: "deleted_at"
  }, {
    name: "displayname"
  }, {
    name: "like_count",
    type: "int",
    defaultValue: 0,
    persist: !1
  }, {
    name: "liked_by_current_user",
    type: "boolean",
    defaultValue: !1,
    persist: !1
  }, {
    name: "views"
  }, {
    name: "image_url"
  }, {
    name: "repost_count",
    type: "int",
    defaultValue: 0,
    persist: !1
  }, {
    name: "reposted_by_current_user",
    type: "boolean",
    defaultValue: !1,
    persist: !1
  }, {
    name: "comment_count",
    type: "int",
    defaultValue: 0,
    persist: !1
  }, {
    name: "comments",
    type: "collection",
    collectionClass: "app.collections.Comments",
    embedded: !0,
    persist: !1,
    defaultValue: []
  }, {
    name: "next_quark_id",
    persist: !1
  }, {
    name: "prev_quark_id",
    persist: !1
  }, {
    name: "gallery_markup",
    persist: !1
  }, {
    name: "current_gallery_membership_id",
    type: "string",
    persist: !1
  }, {
    name: "current_gallery_id",
    type: "string",
    persist: !1
  }, {
    name: "at_beginning",
    type: "boolean",
    persist: !1
  }, {
    name: "at_end",
    type: "boolean",
    persist: !1
  }, {
    name: "layout_name",
    type: "string",
    persist: !1,
    get: function () {
      return this.get("type")
    }
  }],
  persistenceProxy: {
    type: "rest",
    urlRoot: "/quarks",
    incremental: !0
  },
  initialize: function () {
    this._super(arguments), this.bind("change:" + this.getDisplaynameField(), this.updateDisplayname, this)
  },
  getDisplaynameField: Class.abstractMethod,
  updateDisplayname: function (e, t) {
    this.set({
      displayname: t
    })
  },
  getHtmlTitle: function () {
    var e = Jux.Util.condense(this.get("displayname"));
    return e || (e = app.models.quarkCamelCasedTypes[this.get("type")], this.get("author_enabled") && (e += " from " + this.get("owner").get("displayname_or_username"))), e
  },
  getFonts: Class.abstractMethod,
  getOwnerGalleryUrl: function () {
    return this.get("owner").get("gallery_url")
  },
  url: function () {
    return this.getPersistenceProxy().buildUrl(this)
  },
  viewingUrl: function (e) {
    return e ? e.get("url") + "/" + this.id : this.getOwnerGalleryUrl() + "/" + this.id
  },
  editingUrl: function () {
    return this.viewingUrl() + "#e"
  },
  socialUrl: function () {
    return this.viewingUrl() + "#comment"
  },
  galleryRelPath: function () {
    return this.id.toString()
  },
  getPreviewQuark: function () {
    return this
  },
  getPreviewPicture: Class.abstractMethod,
  getMagicklyPreviewPicture: function () {
    var e = this.getPreviewPicture();
    if (e) {
      e = e.clone();
      var t = e.get("picture").clone();
      e.set("picture", t);
      var n = e.get("url");
      if (n) {
        var r = this.getPreviewImageMagicklyOptions();
        e.set("url", Jux.Magickly.convertImagePathOrUri(n, r))
      }
    }
    return e
  },
  getPreviewImageUrl: function () {
    var e = this.getMagicklyPreviewPicture();
    return e ? e.get("url") : ""
  },
  getPreviewImageMagicklyOptions: function () {
    var e = this.getPreviewPicture(),
      t = [{
        name: "thumb",
        value: this.getPreviewImageThumbGeometry()
      }, {
        name: "interlace",
        value: !0
      }, {
        name: "quality",
        value: 80
      }];
    return e.source === "instagram" && t.push({
      name: "trim_border",
      value: !0
    }), t
  },
  getPreviewImageThumbGeometry: function () {
    return "x598>"
  },
  incrementViewCount: function () {
    jQuery.ajax({
      url: this.getPersistenceProxy().buildUrl(this) + "/increment_views",
      type: "POST",
      dataType: "json"
    })
  },
  fetchComments: function () {
    jQuery.ajax({
      url: this.getPersistenceProxy().buildUrl(this) + "/comments",
      dataType: "json",
      success: function (e) {
        this.get("comments").add(e)
      },
      context: this
    })
  },
  addComment: function (e, t) {
    var n = new app.models.Comment({
      owner: t,
      quark_id: this.getId(),
      text: e
    });
    this.get("comments").insert(n, 0), this.set("comment_count", this.get("comment_count") + 1);
    var r = {};
    t || (r.error = function () {
      this.signUpFromSocial("Join to share your thoughts", "Please provide your email or connect to Facebook")
    }, r.scope = this), n.save(r), Jux.Analytics.trackSocial("jux", "comment", this.viewingUrl())
  },
  removeComment: function (e) {
    var t = this.get("comments").getByClientId(e);
    t.destroy(), this.set("comment_count", this.get("comment_count") - 1)
  },
  toggleLike: function (e) {
    e = e || {};
    var t = this.get("liked_by_current_user"),
      n = 0,
      r;
    t ? (r = "/unlike", n = -1) : (r = "/like?persist_unauth=true", n = 1), this.set({
      like_count: this.get("like_count") + n,
      liked_by_current_user: !t
    });
    var i = this;
    jQuery.ajax({
      url: this.getPersistenceProxy().buildUrl(this) + r,
      type: "POST",
      dataType: "json",
      success: function () {
        e.success.apply(e.scope, arguments), i.trigger("quark_liked_or_not", n === -1 ? !1 : !0)
      },
      error: function (t) {
        t.status === 401 && i.signUpFromSocial("Spread the Like", "Join Jux. "), e.error && e.error(t.status)
      },
      context: e.scope
    }), n > 0 && Jux.Analytics.trackSocial("jux", "like", this.viewingUrl())
  },
  toggleRepost: function (e) {
    e = e || {};
    var t = this.get("reposted_by_current_user"),
      n = 0,
      r, i = this;
    t ? (r = "/unrepost", n = -1) : (r = "/repost", n = 1), e.gallery_id && (r += "?gallery_id=" + e.gallery_id), this.set({
      repost_count: this.get("repost_count") + n,
      reposted_by_current_user: !t
    }), jQuery.ajax({
      url: this.getPersistenceProxy().buildUrl(this) + r,
      type: "POST",
      dataType: "json",
      success: function () {
        e.success.apply(e.scope, arguments), i.trigger("quark_reposted_or_not", n === -1 ? !1 : !0)
      },
      context: e.scope
    }), n > 0 && Jux.Analytics.trackSocial("jux", "repost", this.viewingUrl())
  },
  signUpFromSocial: function (e, t) {
    app.Share.signUpAndReturn(this.socialUrl(), e, t)
  },
  save: function (e) {
    this.getPersistenceProxy().setRootProperty(this.get("type"));
    var t = this;
    e || (e = {});
    var n = {
      success: function () {
        e.success && e.success.apply(this, arguments), t.onSaveSuccess.apply(t, arguments), t.trigger("afterSave")
      }
    }, r = [_.extend({}, e, n)];
    this._super(r)
  },
  onSaveSuccess: Jux.emptyFn
}), app.models.AbstractMonoQuark = app.models.Quark.extend({
  abstractClass: !0,
  attributes: [{
    name: "background_picture",
    type: "picturewithoptions"
  }, {
    name: "picture_size",
    type: "string"
  }, {
    name: "picture_size_is_default",
    type: "boolean"
  }, {
    name: "chosen_center",
    set: function (e) {
      var t = this.get("background_picture");
      return t && t.set("chosen_center", e), e
    },
    raw: function () {
      var e = this.get("background_picture");
      return e ? e.get("chosen_center") : null
    }
  }, {
    name: "greyscale",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "flip",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "mustachify",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "cross_process",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "lomo",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "tilt_shift",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "blur",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "mirror_in",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "mirror_out",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "fade",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "layout",
    type: "string"
  }, {
    name: "color_scheme",
    type: "object"
  }],
  initialize: function () {
    this._super(arguments), this.on({
      "change:background_picture.chosen_center": function (e, t) {
        this.set("chosen_center", t)
      },
      scope: this
    })
  },
  getPreviewPicture: function () {
    return this.get("background_picture")
  },
  getPreviewImageMagicklyOptions: function () {
    var e = this._super(arguments);
    return e = this.getMagicklyEffectsOptions().concat(e), e
  },
  getMagicklyEffectsOptions: function () {
    var e = this.get("mustachify") ? "rand" : !1;
    return [{
      name: "flop",
      value: this.get("flip")
    }, {
      name: "mustachify",
      value: e
    }, {
      name: "greyscale",
      value: this.get("greyscale")
    }, {
      name: "cross_process",
      value: this.get("cross_process")
    }, {
      name: "lomo",
      value: this.get("lomo")
    }, {
      name: "tilt_shift",
      value: this.get("tilt_shift")
    }, {
      name: "blur",
      value: this.get("blur")
    }, {
      name: "mirror_in",
      value: this.get("mirror_in")
    }, {
      name: "mirror_out",
      value: this.get("mirror_out")
    }, {
      name: "fade",
      value: this.get("fade")
    }]
  }
}), app.models.Multiquark = Class.extend(app.models.Quark, {
  attributes: [{
    name: "quarks",
    type: "collection",
    collectionClass: "app.collections.Quarks",
    embedded: !0,
    defaultValue: []
  }, {
    name: "selectedQuark",
    type: "model",
    modelClass: "app.models.Quark",
    persist: !1,
    get: function (e) {
      return e ? e : this.getPreviewQuark()
    }
  }],
  initialize: function () {
    this._super(arguments);
    var e = this.get("quarks");
    e.on({
      add: this.onQuarkAdded,
      scope: this
    }), this.setParentOnQuarks(e.getModels())
  },
  getDisplaynameField: function () {
    return "displayname"
  },
  getFonts: function () {
    var e = this.get("quarks").getModels(),
      t = [];
    for (var n = 0, r = e.length; n < r; n++) t = t.concat(e[n].getFonts());
    return _.unique(t)
  },
  getPreviewQuark: function () {
    return this.get("quarks").getAt(0)
  },
  getPreviewPicture: function () {
    return this.getPreviewQuark().getPreviewPicture()
  },
  onQuarkAdded: function (e, t) {
    this.setParentOnQuark(t)
  },
  setParentOnQuark: function (e) {
    e.set("parentQuark", this)
  },
  setParentOnQuarks: function (e) {
    e = e || this.get("quarks").getModels(), _.each(e, this.setParentOnQuark.createDelegate(this))
  }
}), app.models.AbstractSlideshow = app.models.Quark.extend({
  abstractClass: !0,
  attributes: [{
    name: "title",
    type: "string"
  }, {
    name: "subtitle",
    type: "string"
  }, {
    name: "cover_picture",
    type: "picturewithoptions"
  }, {
    name: "chosen_center",
    set: function (e) {
      var t = this.get("cover_picture");
      return t && t.set("chosen_center", e), e
    },
    raw: function () {
      var e = this.get("cover_picture");
      return e ? e.get("chosen_center") : null
    }
  }, {
    name: "picture_size",
    type: "string"
  }, {
    name: "picture_size_is_default",
    type: "boolean"
  }, {
    name: "slides",
    type: "slides_collection"
  }, {
    name: "numSlides",
    type: "integer",
    persist: !1
  }, {
    name: "activeItemId",
    type: "string",
    persist: !1
  }, {
    name: "viewableImageAreas",
    type: "object"
  }],
  initialize: function () {
    this._super(arguments), this.on({
      "change:cover_picture.chosen_center": function (e, t) {
        this.set("chosen_center", t)
      },
      scope: this
    }), this.updateNumSlides(), this.get("slides").on({
      addset: this.updateNumSlides,
      removeset: this.updateNumSlides,
      scope: this
    })
  },
  updateNumSlides: function () {
    this.set("numSlides", this.get("slides").getCount())
  },
  getPreviewPicture: function () {
    return this.get("cover_picture")
  },
  getDisplaynameField: function () {
    return "title"
  },
  getMagicklyEffectsOptions: function () {
    return []
  }
}), app.models.VideoPropertySet = app.models.Model.extend({
  attributes: [{
    name: "_id",
    type: "string",
    defaultValue: null
  }, {
    name: "created_at",
    type: "date",
    defaultValue: null
  }, {
    name: "creator_displayname",
    type: "string",
    defaultValue: null
  }, {
    name: "creator_id",
    type: "string",
    defaultValue: null
  }, {
    name: "creator_username",
    type: "string",
    defaultValue: null
  }, {
    name: "description",
    type: "string",
    defaultValue: null
  }, {
    name: "dimensions",
    type: "object",
    defaultValue: null
  }, {
    name: "license",
    type: "string",
    defaultValue: null
  }, {
    name: "link",
    type: "string",
    defaultValue: null
  }, {
    name: "location",
    type: "object",
    defaultValue: null
  }, {
    name: "media_id",
    type: "string",
    defaultValue: null
  }, {
    name: "service",
    type: "string",
    defaultValue: null
  }, {
    name: "thumbnail_dimensions",
    type: "object",
    defaultValue: null
  }, {
    name: "thumbnail_url",
    type: "string",
    defaultValue: null
  }, {
    name: "title",
    type: "string",
    defaultValue: null
  }, {
    name: "updated_at",
    type: "date",
    defaultValue: null
  }, {
    name: "uploaded_at",
    type: "date",
    defaultValue: null
  }]
}), app.models.AppState = app.models.Model.extend({
  attributes: [{
    name: "currentGallery",
    type: "model",
    modelClass: "app.models.Gallery",
    embedded: !1,
    persist: !1
  }, {
    name: "currentQuark",
    type: "model",
    modelClass: "app.models.Quark",
    embedded: !1,
    persist: !1
  }],
  save: function () {
    throw new Error("AppState shouldn't be saved")
  },
  getGalleryOwner: function () {
    return this.get("currentGallery").get("owner")
  }
}), app.models.Article = app.models.AbstractMonoQuark.extend({
  attributes: [{
    name: "title",
    type: "string"
  }, {
    name: "subtitle",
    type: "string"
  }, {
    name: "text",
    type: "string"
  }, {
    name: "text_alignment",
    type: "string"
  }, {
    name: "title_font",
    type: "object"
  }, {
    name: "text_font",
    type: "object"
  }, {
    name: "font_effect",
    type: "string"
  }, {
    name: "detail_image_url",
    type: "string",
    persist: !1
  }, {
    name: "layout_name",
    type: "string",
    persist: !1,
    get: function () {
      return this.get("is_creation_subchild") ? "creationSubchild" : this.get("type")
    }
  }, {
    name: "is_creation_subchild",
    type: "boolean",
    persist: !1,
    get: function () {
      var e = this.get("parentQuark");
      return e ? e.get("type") === "creation" : !1
    },
    set: function () {
      throw new Error("read-only attribute")
    }
  }, {
    name: "parentQuark",
    type: "model",
    modelClass: "app.models.Multiquark",
    embedded: !1,
    persist: !1,
    defaultValue: !1
  }, {
    name: "current_canvas_layout",
    type: "string",
    persist: !1
  }],
  getDisplaynameField: function () {
    return "title"
  },
  getFonts: function () {
    return ["Francois One", this.get("title_font").family, this.get("text_font").family]
  },
  getMagicklyEffectsOptions: function () {
    var e = this._super(arguments),
      t = this.get("parentQuark");
    if (t.get("type") === "creation") {
      var n = app.Defaults.creationFiltersByGenreAndMood[t.get("genre")][t.get("mood")];
      _.each(n, function (t) {
        e.push({
          name: t,
          value: !0
        })
      })
    }
    return e
  }
}), app.models.Blockquote = app.models.AbstractMonoQuark.extend({
  attributes: [{
    name: "text",
    type: "string",
    set: function (e) {
      return this.updateImportedText(), e
    }
  }, {
    name: "importedText",
    type: "boolean",
    persist: !1
  }, {
    name: "font",
    type: "object"
  }, {
    name: "font_effect",
    type: "string"
  }],
  initialize: function () {
    this._super(arguments), this.updateImportedText()
  },
  updateImportedText: function () {
    var e = this.get("background_picture");
    e && this.set("importedText", this.get("text") === e.get("title"))
  },
  getDisplaynameField: function () {
    return "text"
  },
  getFonts: function () {
    return ["Muli", this.get("font").family]
  }
}), app.models.Comment = app.models.Model.extend({
  attributes: [{
    name: "id",
    type: "string"
  }, {
    name: "created_at",
    type: "date"
  }, {
    name: "quark_id",
    type: "int"
  }, {
    name: "text",
    type: "string"
  }, {
    name: "owner",
    type: "model",
    modelClass: "app.models.User",
    persist: !1
  }],
  persistenceProxy: {
    type: "rest",
    incremental: !0,
    rootProperty: "comment",
    buildUrl: function (e, t) {
      var n = Kevlar.persistence.RestProxy.prototype.buildUrl.apply(this, arguments);
      return t === "create" && (n += "?persist_unauth=true"), n
    }
  },
  initialize: function () {
    this._super(arguments), this.getPersistenceProxy().urlRoot = "/quarks/" + this.get("quark_id") + "/comments"
  }
}), app.models.Countdown = app.models.AbstractSlideshow.extend({
  attributes: [{
    name: "ordering",
    type: "string",
    defaultValue: "up"
  }, {
    name: "title_font",
    type: "object"
  }, {
    name: "subtitle_font",
    type: "object"
  }, {
    name: "item_title_font",
    type: "object"
  }, {
    name: "body_text_font",
    type: "object"
  }, {
    name: "color_scheme",
    type: "object"
  }, {
    name: "layout",
    type: "string"
  }, {
    name: "image_effect",
    type: "string"
  }],
  getHtmlTitle: function () {
    var e = Jux.Util.condense(this.get("displayname"));
    return e ? this.get("numSlides") + " " + e : this._super()
  },
  getFonts: function () {
    return ["Francois One", this.get("title_font").family, this.get("subtitle_font").family, this.get("item_title_font").family, this.get("body_text_font").family]
  }
}), app.models.Creation = Class.extend(app.models.Multiquark, {
  attributes: [{
    name: "style_id"
  }, {
    name: "quarks",
    type: "collection",
    collectionClass: "app.collections.CreationQuarks",
    embedded: !0,
    defaultValue: []
  }, {
    name: "genre",
    persist: !1,
    get: function () {
      var e = this.get("style_id");
      return e ? e.split("-")[0] : null
    },
    set: function (e) {
      var t = this.get("mood");
      return this.setStyleId(e, t), e
    }
  }, {
    name: "mood",
    persist: !1,
    get: function () {
      var e = this.get("style_id");
      return e ? e.split("-")[1] : null
    },
    set: function (e) {
      var t = this.get("genre");
      return this.setStyleId(t, e), e
    }
  }, {
    name: "activeItemId",
    type: "string",
    persist: !1
  }, {
    name: "slides",
    get: function () {
      return this.get("quarks")
    },
    persist: !1
  }, {
    name: "canvas_layouts",
    persist: !1
  }, {
    name: "default_canvas_laouyt",
    persist: !1,
    defaultValue: "1-photoLandscapeCenter"
  }, {
    name: "style_filter_enabled",
    type: "boolean"
  }],
  setStyleId: function (e, t) {
    if (arguments.length !== 2) throw "Style id requires two arguments to set";
    this.set("style_id", _.capitalize(e) + "-" + _.capitalize(t))
  },
  initialize: function () {
    this._super(arguments);
    var e = this.get("quarks");
    e.on({
      add: this.onQuarkAdded,
      scope: this
    }), this.setAllCanvasLayouts(), this.on("change:canvas_layouts", this.setAllCanvasLayouts, this)
  },
  setAllCanvasLayouts: function () {
    _.each(this.get("quarks").getModels(), this.setCanvasLayoutForSubquark.createDelegate(this))
  },
  setCanvasLayoutForSubquark: function (e) {
    var t = this.canvasLayoutFor(e);
    e.set("current_canvas_layout", t)
  },
  onQuarkAdded: function (e, t) {
    this.setCanvasLayoutForSubquark(t), t.set("parentQuark", this)
  },
  canvasLayoutFor: function (e) {
    var t = this.get("quarks").getModels().indexOf(e),
      n = this.get("canvas_layouts"),
      r = this.get("default_canvas_laouyt");
    return n ? n[t] || this.get("default_canvas_laouyt") : r
  },
  onSaveSuccess: function (e, t) {
    this._super(arguments), this.set("canvas_layouts", t.canvas_layouts), _.each(t.quarks, function (e) {
      var t = this.get("quarks").getById(e.id);
      t && t.set("detail_image_url", e.detail_image_url)
    }.createDelegate(this))
  }
}), app.models.CustomLink = app.models.Model.extend({
  attributes: [{
    name: "id",
    defaultValue: function () {
      return Jux.Util.uuid(8)
    },
    persist: !1
  }, {
    name: "label",
    type: "string",
    defaultValue: ""
  }, {
    name: "value",
    type: "string",
    defaultValue: ""
  }, {
    name: "show",
    type: "boolean",
    defaultValue: !0
  }]
}), app.models.Gallery = app.models.Model.extend({
  attributes: [{
    name: "id",
    type: "string"
  }, {
    name: "type",
    type: "string"
  }, {
    name: "title",
    type: "string"
  }, {
    name: "about",
    type: "string"
  }, {
    name: "created_at",
    type: "date"
  }, {
    name: "name",
    type: "string"
  }, {
    name: "email",
    type: "string"
  }, {
    name: "fullview_heading_look",
    type: "string"
  }, {
    name: "show_master_gallery_title",
    type: "boolean"
  }, {
    name: "show_owner_name",
    type: "boolean"
  }, {
    name: "show_quark_owner_names",
    type: "boolean"
  }, {
    name: "show_dates",
    type: "boolean"
  }, {
    name: "show_view_counts",
    type: "boolean"
  }, {
    name: "child_gallery_ids",
    type: "object"
  }, {
    name: "custom_ordering",
    type: "boolean"
  }, {
    name: "text_alignment",
    type: "string"
  }, {
    name: "theme",
    type: "string"
  }, {
    name: "theme_settings_by_theme",
    type: "model",
    modelClass: app.models.ThemeSettingsByTheme,
    embedded: !0
  }, {
    name: "selected_theme_settings",
    persist: !1,
    get: function () {
      var e = this.get("theme_settings_by_theme");
      return e ? e.get(this.get("theme")) : null
    },
    set: function (e) {
      var t = this.get("theme_settings_by_theme");
      t && this.get("theme_settings_by_theme").set(this.get("theme"), e)
    }
  }, {
    name: "owner",
    type: "model",
    modelClass: "app.models.User",
    persist: !1
  }, {
    name: "path",
    type: "string",
    persist: !1,
    get: function () {
      if (this.isSubGallery()) return "/" + this.get("name");
      switch (this.get("type")) {
      case "AllQuarksGallery":
        return "/quarks";
      case "CreationsGallery":
        return "/creations";
      case "FeaturedGallery":
        return "/gallery";
      case "FeedGallery":
        return "/feed";
      default:
        return ""
      }
    },
    set: function () {
      throw new Error("read-only attribute")
    }
  }, {
    name: "url",
    type: "string",
    persist: !1,
    get: function () {
      return this.get("owner").get("gallery_url") + this.get("path")
    },
    set: function () {
      throw new Error("read-only attribute")
    }
  }, {
    name: "fullview_heading_height",
    type: "number",
    defaultValue: $(window).innerHeight(),
    persist: !1
  }],
  persistenceProxy: {
    type: "rest",
    urlRoot: "/galleries",
    rootProperty: "gallery",
    incremental: !0
  },
  getFonts: function () {
    var e = this.get("selected_theme_settings");
    return [e.get("title_font").family, e.get("author_font").family, e.get("quark_title_font").family, e.get("caption_font").family, e.get("text_font").family]
  },
  isMasterGallery: function () {
    return this.get("type") === "MasterGallery"
  },
  isMultiGallery: function () {
    return this.get("child_gallery_ids").length > 0
  },
  isSubGallery: function () {
    return this.get("type") === "Gallery"
  },
  save: function (e) {
    e = e || {};
    var t = e.success,
      n = e.scope || this;
    e = _.extend({}, e, {
      success: function (e, r) {
        this.set("name", r.name), t && t.apply(n, arguments)
      },
      scope: this
    }), this._super([e])
  },
  getUberApiPath: function () {
    var e = this.get("owner").getId(),
      t;
    switch (this.get("type")) {
    case "FollowersGallery":
      t = "/users/" + e + "/followers";
      break;
    case "FollowingGallery":
      t = "/users/" + e + "/following";
      break;
    case "FriendsGallery":
      t = "/users/friends";
      break;
    case "LapsedGallery":
      t = "/lapsed";
      break;
    case "MasterGallery":
      t = app.models.Gallery.getUberApiPath(this.get("id"));
      break;
    case "WelcomeGallery":
      t = "/welcome";
      break;
    default:
      throw new Error("Unknown gallery type.")
    }
    return t + "/uber.js"
  },
  statics: {
    getUberApiPath: function (e) {
      return "/galleries/" + e
    },
    getFullUberApiPath: function (e) {
      return "/galleries/" + e + "/uber.json"
    }
  }
}), app.models.GalleryQuarksState = app.models.Model.extend({
  attributes: [{
    name: "atNewest",
    type: "boolean",
    defaultValue: !0
  }, {
    name: "atOldest",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "gallery",
    type: "model",
    modelClass: "app.models.Gallery",
    embedded: !0
  }, {
    name: "quarks",
    type: "collection",
    collectionClass: "app.collections.GalleryQuarks",
    embedded: !0
  }],
  initialize: function () {
    var e = this.get("gallery");
    if (!e) throw new Error("GalleryQuarksState requires a gallery");
    var t = new app.collections.GalleryQuarks({
      url: e.get("path")
    });
    this.set("quarks", t), t.on("quarksLoaded", this.onQuarksLoaded, this)
  },
  save: function () {
    throw new Error("GalleryQuarksState shouldn't be saved")
  },
  onQuarksLoaded: function (e, t, n) {
    e.length === 0 && (n === 1 ? this.set("atOldest", !0) : this.set("atNewest", !0))
  },
  isFullyLoaded: function () {
    return this.get("atNewest") && this.get("atOldest")
  },
  isEmpty: function () {
    return this.get("quarks").isEmpty()
  }
}), app.models.Photo = app.models.AbstractMonoQuark.extend({
  attributes: [{
    name: "caption",
    type: "string",
    set: function (e) {
      return this.updateImportedCaption(), e
    }
  }, {
    name: "importedCaption",
    type: "boolean",
    persist: !1
  }, {
    name: "caption_font",
    type: "object"
  }, {
    name: "name_font",
    type: "object"
  }],
  initialize: function () {
    this._super(arguments), this.updateImportedCaption()
  },
  updateImportedCaption: function () {
    var e = this.get("background_picture");
    e && this.set("importedCaption", this.get("caption") === e.get("title"))
  },
  getDisplaynameField: function () {
    return "caption"
  },
  getFonts: function () {
    return [this.get("caption_font").family, this.get("name_font").family]
  }
}), app.models.quarkCamelCasedTypes = {
  blockquote: "BlockQuote",
  multiquark: "Article",
  photo: "Photo",
  video: "Video",
  slideshow: "SlideShow",
  countdown: "CountDown",
  streetview: "StreetView",
  creation: "Creation"
}, app.models.Slide = app.models.Model.extend({
  attributes: [{
    name: "id",
    type: "string",
    defaultValue: function () {
      return Jux.Util.uuid(8)
    }
  }, {
    name: "title",
    type: "string",
    defaultValue: ""
  }, {
    name: "description",
    type: "string",
    defaultValue: ""
  }, {
    name: "picture",
    type: "picturewithoptions"
  }, {
    name: "chosen_center",
    type: "object",
    raw: function (e) {
      var t = this.get("picture");
      return t ? t.get("chosen_center") : null
    }
  }, {
    name: "thumbnailSize"
  }, {
    name: "picture_size",
    type: "string",
    defaultValue: "fill"
  }, {
    name: "picture_size_is_default",
    type: "bool",
    defaultValue: !0
  }, {
    name: "layout",
    type: "string",
    defaultValue: "left"
  }, {
    name: "image_url",
    type: "string"
  }],
  initialize: function () {
    this._super(arguments), this.on({
      "change:picture.chosen_center": function (e, t) {
        this.set("chosen_center", t)
      },
      scope: this
    })
  },
  getMagicklyEffectsOptions: function () {
    return []
  }
}), app.models.Slideshow = app.models.AbstractSlideshow.extend({
  attributes: [{
    name: "title_font",
    type: "object"
  }, {
    name: "subtitle_font",
    type: "object"
  }, {
    name: "item_title_font",
    type: "object"
  }, {
    name: "body_text_font",
    type: "object"
  }, {
    name: "color_scheme",
    type: "object"
  }, {
    name: "layout",
    type: "string"
  }, {
    name: "image_effect",
    type: "string"
  }],
  getFonts: function () {
    return ["Francois One", this.get("title_font").family, this.get("subtitle_font").family, this.get("item_title_font").family, this.get("body_text_font").family]
  }
}), app.models.Streetview = app.models.Quark.extend({
  attributes: [{
    name: "address",
    type: "string",
    defaultValue: ""
  }, {
    name: "title",
    type: "string",
    defaultValue: ""
  }, {
    name: "caption",
    type: "string",
    defaultValue: ""
  }, {
    name: "lat_lng",
    type: "object",
    defaultValue: {
      lat: 40.720372,
      lng: -73.999707
    },
    set: function (e) {
      return e || (e = this.getDefault("lat_lng")), e
    }
  }, {
    name: "pov",
    type: "object",
    defaultValue: {
      heading: -143.35714285714283,
      pitch: 1.821428571428573,
      zoom: 0
    },
    set: function (e) {
      return e || (e = this.getDefault("pov")), e
    }
  }, {
    name: "map_view_visible",
    type: "boolean",
    defaultValue: !1
  }, {
    name: "map_view_zoom",
    type: "int",
    defaultValue: 18
  }, {
    name: "mapBounds",
    type: "object",
    persist: !1
  }, {
    name: "title_font",
    type: "object"
  }, {
    name: "caption_font",
    type: "object"
  }, {
    name: "color_scheme",
    type: "object"
  }],
  getPreviewPicture: function () {
    var e = this.getPreviewPictureWidthHeight();
    return new app.models.PictureWithOptions({
      picture: {
        url: this.createStaticImageUrl({
          width: e,
          height: e
        })
      }
    })
  },
  getMagicklyPreviewPicture: function () {
    return this.getPreviewPicture()
  },
  getPreviewPictureWidthHeight: function () {
    var e = this.getPreviewImageThumbGeometry();
    return +e.match(/\d+/)[0]
  },
  createStaticImageUrl: function (e) {
    var t = this,
      n = t.get("lat_lng"),
      r = e.width,
      i = e.height,
      s;
    if (t.get("map_view_visible")) s = Jux.Google.createStaticMapImageUrl({
      center: n,
      width: r,
      height: i,
      zoom: t.get("map_view_zoom"),
      markers: n
    });
    else {
      var o = t.get("pov");
      s = Jux.Google.createStaticStreetViewImageUrl({
        location: n,
        width: r,
        height: i,
        heading: o.heading,
        pitch: o.pitch
      })
    }
    return s
  },
  getPreviewImageMagicklyOptions: function () {
    return []
  },
  getDisplaynameField: function () {
    return "title"
  },
  getFonts: function () {
    return [this.get("title_font").family, this.get("caption_font").family]
  }
}), app.models.Video = app.models.Quark.extend({
  attributes: [{
    name: "youtube_link",
    type: "string",
    set: function (e, t) {
      return e || t
    }
  }, {
    name: "title",
    type: "string"
  }, {
    name: "description",
    type: "string"
  }, {
    name: "property_set",
    type: "model",
    modelClass: "app.models.VideoPropertySet",
    embedded: !0
  }, {
    name: "layout",
    type: "string"
  }, {
    name: "show_asset_creator",
    type: "boolean"
  }, {
    name: "title_font",
    type: "object"
  }, {
    name: "description_font",
    type: "object"
  }, {
    name: "color_scheme",
    type: "object"
  }, {
    name: "video_layout_type",
    type: "string",
    persist: !1
  }, {
    name: "background_picture",
    type: "pictureWithOptions"
  }, {
    name: "background_picture_dimensions",
    get: function () {
      var e = this.get("background_picture");
      return e ? (e = e.get("picture"), e ? {
        width: e.get("width"),
        height: e.get("height")
      } : null) : null
    },
    persist: !1
  }, {
    name: "background_image_extension",
    get: function () {
      var e = this.get("background_picture"),
        t, n, r, i;
      if (e) {
        t = e.get("picture");
        if (t) return t.get("url").split(".").pop()
      }
      return null
    },
    persist: !1
  }, {
    name: "chosen_center",
    type: "object",
    raw: function (e) {
      var t = this.get("picture");
      return t ? t.get("chosen_center") : null
    }
  }, {
    name: "autoPlay",
    type: "boolean",
    defaultValue: !0,
    persist: !1
  }, {
    name: "video_caption_state",
    persist: !1,
    type: "string",
    defaultValue: "open"
  }],
  getPreviewPicture: function () {
    return new app.models.PictureWithOptions({
      picture: {
        url: this.get("image_url")
      }
    })
  },
  getPreviewImageThumbGeometry: function () {
    var e = this.get("property_set"),
      t;
    if (e) {
      var n = e.dimensions,
        r = e.thumbnail_dimensions;
      if (n && r) {
        var i = n.width === r.width,
          s = n.height === r.height;
        if (i && !s || s && !i) t = n.width + "x" + n.height + "#"
      }
    }
    return t || this._super(arguments)
  },
  getDisplaynameField: function () {
    return "title"
  },
  getFonts: function () {
    return [this.get("title_font").family, this.get("description_font").family]
  },
  getMediaUrl: function () {
    var e = this.get("property_set");
    if (e) switch (e.get("service")) {
    case "vimeo":
      return "https://vimeo.com/" + e.get("media_id");
    case "youtube":
      return "https://www.youtube.com/watch?v=" + e.get("media_id")
    }
    return undefined
  },
  getOembedUrl: function () {
    var e = this.get("property_set");
    if (e) {
      var t = this.getMediaUrl();
      switch (e.get("service")) {
      case "vimeo":
        return "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(t);
      case "youtube":
        return "https://omniembed.herokuapp.com/v1.json?url=" + encodeURIComponent(t)
      }
    }
    return undefined
  },
  updateFromOembed: function (e) {
    var t = this.getOembedUrl(),
      n;
    return t ? n = jQuery.jsonp({
      url: t,
      corsSupport: !0,
      jsonpSupport: !0,
      success: function (t) {
        var n = {
          creator_displayname: t.author_name,
          description: t.description,
          thumbnail_dimensions: {
            height: t.thumbnail_height,
            width: t.thumbnail_width
          },
          title: t.title
        };
        t.author_url && (n.creator_username = _.last(t.author_url.split("/"))), n.description = t.description, n.dimensions = {
          height: t.height,
          width: t.width
        }, n.thumbnail_url = t.thumbnail_url;
        var r = this.get("property_set");
        if (e === !0) {
          var i = r.get("description"),
            s = this.get("title");
          i && (n.description = i), s && (n.title = s)
        }
        r.set(n)
      },
      context: this
    }) : (n = jQuery.Deferred(), n.resolve()), n
  },
  updateMetadata: function (e) {
    this.fireEvent("fetchingVideoData");
    var t = this.updateFromOembed(e),
      n = this;
    return t.always(function () {
      n.fireEvent("metadataUpdated")
    }), t
  }
}), app.collections.Quarks = Kevlar.Collection.extend({
  model: app.models.Quark,
  getQuarkIds: function () {
    var e = this.getModels();
    return _.map(e, function (e) {
      return e.getId()
    })
  },
  getQuarkClientIds: function () {
    var e = this.getModels();
    return _.map(e, function (e) {
      return e.getClientId()
    })
  },
  createModel: function (e) {
    return app.models.Quark.fromJSON(e)
  },
  isEmpty: function () {
    return this.getCount() === 0
  }
}), app.collections.Comments = Kevlar.Collection.extend({
  model: app.models.Comment
}), app.collections.CreationQuarks = app.collections.Quarks.extend({
  insert: function () {
    var e = this.getQuarkIds();
    this._super(arguments), this.setIdsOnModels(e), this.setModelsByIds()
  },
  setIdsOnModels: function (e) {
    _.each(e, function (e, t) {
      var n = this.getAt(t);
      n && n.set("id", e)
    }.createDelegate(this))
  },
  setModelsByIds: function () {
    this.modelsById = {}, _.each(this.getModels(), function (e) {
      var t = e.getId();
      t && (this.modelsById[t] = e)
    }.createDelegate(this))
  }
}), app.collections.CustomLinks = Kevlar.Collection.extend({
  model: app.models.CustomLink
}), app.collections.Galleries = Kevlar.Collection.extend({
  url: "/galleries",
  model: app.models.Gallery,
  getSubGalleries: function () {
    return _.filter(this.getModels(), function (e) {
      return e.isSubGallery()
    })
  },
  getMasterGallery: function () {
    return _.filter(this.getModels(), function (e) {
      if (e.get("type") === "MasterGallery") return e
    })[0]
  },
  notOwnedBy: function (e) {
    return _.filter(this.getModels(), function (t) {
      return t.get("owner") !== e
    })
  }
}), app.collections.GalleryQuarks = app.collections.Quarks.extend({
  url: "/quarks",
  newerDeferred: null,
  olderDeferred: null,
  initialize: function () {
    (!this.url || this.url === "/") && delete this.url, this._loading = {
      older: !1,
      newer: !1
    }, this.users = new app.collections.Users, this._super(arguments)
  },
  setUrl: function (e) {
    if (typeof e != "string") return;
    e.charAt(0) !== "/" && (e = "/" + e), this.url = e
  },
  oldest: function () {
    return this.getLast()
  },
  newest: function () {
    return this.getFirst()
  },
  previous: function (e) {
    var t = this.indexOf(e);
    return this.getAt(t - 1)
  },
  next: function (e) {
    var t = this.indexOf(e);
    return this.getAt(t + 1)
  },
  getByOwnerNameAndQuarkName: function (e, t) {
    var n = this.models,
      r;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (i.get("name") === t) {
        var s = i.get("owner");
        if (s && s.get("username") === e) return i
      }
    }
    return null
  },
  getDeferredForDirection: function (e) {
    return this[e + "Deferred"]
  },
  setDerredForDirection: function (e, t) {
    this[e + "Deferred"] = t
  },
  cancelDeferred: function (e) {
    var t = this[e + "Deferred"];
    t && (t.reject(), this[e + "Deferred"] = null)
  },
  cancelAllDeferreds: function () {
    this.cancelDeferred("newer"), this.cancelDeferred("older")
  },
  load: function (e) {
    if (this._loading[e]) return this.getDeferredForDirection(e);
    this._loading[e] = !0;
    var t = {
      per_page: app.Defaults.quarksPerPageDefault
    };
    if (!this.isEmpty())
      if (e === "newer") {
        var n = this.newest();
        t.after_membership_id = n.get("current_gallery_membership_id")
      } else {
        var r = this.oldest();
        t.before_membership_id = r.get("current_gallery_membership_id")
      }
    var i = Jux.util.uri.chompSlash(this.url) + ".js?" + jQuery.param(t);
    this.trigger("quarksLoading", e === "older" ? 1 : -1);
    var s = jQuery.ajax({
      url: i,
      cache: !1,
      dataType: "json",
      timeout: 6e4
    }),
      o = this;
    return s.done(function (t) {
      o.onQuarksLoaded(t, e)
    }).fail(function () {
      Jux.logError("Error loading new set of quarks. ", arguments), Jux.logError("Error loading direction: " + e + " at " + i), o.trigger("quarkLoadError", e, i), Jux.log(" ")
    }).always(function () {
      o._loading[e] = !1
    }), this.setDerredForDirection(e, s), s
  },
  areQuarksLoading: function () {
    return this._loading.older || this._loading.newer
  },
  getLoadingDirection: function () {
    return this._loading
  },
  insertNewlyCreatedQuark: function (e) {
    this.insert(e, 0), this.trigger("newlyCreatedQuark", e)
  },
  onQuarksLoaded: function (e, t) {
    this.trigger("addingFetchedQuarks"), this.setDerredForDirection(t, null), _.each(e.quarkOwnersData, function (e) {
      new app.models.User(e)
    });
    if (e.quarksData.length === 0) this.trigger("quarksLoaded", [], !1, t === "older" ? 1 : -1);
    else {
      switch (t) {
      case "newer":
        this.insert(e.quarksData, 0);
        break;
      default:
        var n = this.getCount() - 1;
        this.add(e.quarksData)
      }
      t === "older" ? this.trigger("quarksLoaded", this.getRange(n), e.quarksHTML, 1) : this.trigger("quarksLoaded", this.getRange(0, e.quarksData.length - 1), e.quarksHTML, -1)
    }
    this.trigger("finishedAddingFetchedQuarks")
  }
}), app.collections.Slides = Kevlar.Collection.extend({
  model: app.models.Slide
}), app.collections.SubGalleries = Kevlar.Collection.extend({
  url: "/galleries",
  model: app.models.Gallery,
  per_page: 12,
  offset: 0,
  constructor: function (e) {
    this._super(arguments), this.setGalleryOwner(e.galleryOwner), this.on("addset", this.handleNewGalleries, this)
  },
  sortBy: function (e, t) {
    var n = (new Date(e.get("created_at"))).getTime(),
      r = (new Date(t.get("created_at"))).getTime();
    return n < r ? -1 : n > r ? 1 : 0
  },
  handleNewGalleries: function (e, t) {
    this.groupQuarksIntoCorrectSubGalleryCollections(this.queuedInitialQuarks), this.fixUrlsOnGalleryQuarkCollections(t), this.offset += t.length
  },
  add: function (e) {
    e = _.filter(e, function (e) {
      if (this.isUsableGalleryType(e.name)) return e
    }, this), this._super(arguments)
  },
  isUsableGalleryType: function (e) {
    var t = ["following", "feed", "master"];
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n] === e) return !1;
    return !0
  },
  fixUrlsOnGalleryQuarkCollections: function (e) {
    var t;
    for (var n = 0, r = e.length; n < r; n++) t = e[n].get("quarks"), t.setUrl(e[n].get("name"))
  },
  groupQuarksIntoCorrectSubGalleryCollections: function (e) {
    var t = "",
      n = null,
      r;
    for (var i = 0, s = e.length; i < s; i++) t = e[i].current_gallery_id, n = this.getById(t), n && (r = n.get("quarks"), r.add(e[i]))
  },
  getSubGalleries: function () {
    return _.filter(this.getModels(), function (e) {
      return e.isSubGallery()
    })
  },
  getMasterGallery: function () {
    return _.filter(this.getModels(), function (e) {
      if (e.get("type") === "MasterGallery") return e
    })[0]
  },
  setGalleryOwner: function (e) {
    this.galleryOwner = e, this.setMasterGalleryId(e.get("master_gallery_id"))
  },
  setMasterGalleryId: function (e) {
    this.masterGalleryId = e, this.uberPath = app.models.Gallery.getFullUberApiPath(this.masterGalleryId)
  },
  getGalleryOwner: function () {
    return this.galleryOwner
  },
  getNumberOfSubGalleries: function () {
    return this.galleryOwner.get("sub_gallery_ids").length
  },
  getOffsetQueryString: function () {
    return "?offset=" + this.offset + "&per_page=" + this.per_page
  },
  getLoadPath: function () {
    return this.uberPath + this.getOffsetQueryString()
  },
  loadMoreGalleries: function () {
    if (this.loadingGalleryData) return;
    this.trigger("loading"), this.loadingGalleryData = !0, $.ajax({
      url: this.getLoadPath(),
      timeout: 6e4,
      dataType: "json",
      success: this.onAjaxSuccess,
      error: function () {
        Jux.logError("Error loading galeryThumbstrip data.", arguments), this.trigger("loadingError")
      },
      complete: function () {
        this.loadingGalleryData = !1, this.trigger("loadingComplete")
      },
      context: this
    })
  },
  onAjaxSuccess: function (e) {
    this.queuedInitialQuarks = e.initialQuarks, this.add(e.galleriesData), this.trigger("loadingSuccess")
  }
}), app.collections.Users = Kevlar.Collection.extend({
  url: "/users",
  model: app.models.User
}), app.components.slideshow.slide.Slide = Jux.extend(ui.Container, {
  layout: "fit",
  active: !1,
  statics: {
    renderTpl: ['<div data-elem="spinner" class="spinner" style="display: none;" />', '<div data-elem="content" class="content" />'].join("")
  },
  initComponent: function () {
    this.cls += " slideshow-slide", this.addEvents("animationcomplete"), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el;
    e.append(app.components.slideshow.slide.Slide.renderTpl), this.$contentEl = e.find('[data-elem="content"]'), this.$spinnerEl = e.find('[data-elem="spinner"]'), this.origWebkitTransition = e.css("-webkit-transition"), this.origMozTransition = e.css("-moz-transition"), this.origTransition = e.css("transition")
  },
  getContentTarget: function () {
    return this.$contentEl
  },
  activate: function () {
    this.active = !0, this.rendered && this.$el.addClass("active"), this.onActivate()
  },
  onActivate: Jux.emptyFn,
  deactivate: function (e) {
    var t = this;
    e && t.isAnimated() ? t.on({
      animationcomplete: function () {
        t.deactivate()
      },
      single: !0
    }) : (t.active = !1, t.rendered && t.$el.removeClass("active"), t.onDeactivate())
  },
  onDeactivate: Jux.emptyFn,
  isActive: function () {
    return this.active
  },
  detach: function (e) {
    var t = this;
    e && t.isAnimated() ? t.on({
      animationcomplete: function () {
        t.detach()
      },
      single: !0
    }) : (t.deactivate(), t._super())
  },
  isAnimated: function () {
    return this.origWebkitTransform !== "none" && this.origWebkitTransition !== "" && this.origWebkitTransition !== null || this.origMozTransition !== "none" && this.origMozTransition !== "" && this.origMozTransition !== null || this.origTransition !== "none" && this.origTransition !== "" && this.origTransition !== null
  },
  setTransformOrigin: function (e, t) {
    this.$el.css("-webkit-transform-origin", e + " " + t)
  },
  move: function (e, t, n, r) {
    typeof r == "undefined" && (r = 0), e && (t = this.$el.width() + t, n = this.$el.height() + n), this.$el.css({
      "-webkit-transform": "translate3d(" + t + "px," + n + "px,0) rotate3d(0,0,1," + r + "deg)",
      "-moz-transform": "translate(" + t + "px," + n + "px) rotate(" + r + "deg)"
    })
  },
  resetPosition: function () {
    this.$el.unbind("webkitTransitionEnd").css({
      "-webkit-transition": "none",
      "-webkit-transform": "translateZ(0)",
      display: "block"
    })
  },
  flip: function (e) {
    var t;
    Jux.isIPad ? (t = {
      x: 40 + Math.floor(Math.random() * 20),
      y: -150,
      angle: -12
    }, e == "left" && (t.x = -t.x, t.angle = -t.angle)) : t = {
      x: 0,
      y: -150,
      angle: 0
    }, this.$el.addClass("moved " + e).one("webkitTransitionEnd", function () {
      this.fireEvent("animationcomplete", this)
    }.createDelegate(this)).css({
      "-webkit-transition": this.origWebkitTransition,
      "-webkit-transform": "translate3d(" + t.x + "%," + t.y + "%," + "0) " + "rotate3d(0,0,1," + t.angle + "deg)"
    }), Jux.Analytics.trackPageView()
  },
  unflip: function () {
    this.$el.removeClass("moved left right")
  },
  onTouchStart: function (e) {
    this.$el && this.$el.addClass("dragging").css({
      "-webkit-transition": "none",
      transition: "none"
    })
  },
  onTouchMove: Jux.emptyFn,
  onTouchEnd: function (e) {
    this.$el && this.$el.removeClass("dragging").css({
      "-webkit-transition": this.origWebkitTransition,
      transition: this.origTransition
    })
  },
  onDestroy: function () {
    this.deactivate(), this._super(arguments)
  }
}), app.components.slideshow.Slideshow = Jux.extend(ui.Container, {
  activeSlide: null,
  animateBetweenSlides: !0,
  initComponent: function (e) {
    this.cls += " slideshowComponent", this.addEvents("activeslidechange"), this.layout || (this.layout = new app.components.slideshow.SlideshowLayout({
      animateBetweenSlides: this.animateBetweenSlides
    }));
    var t = this.activeSlide;
    this._super(arguments), t !== null && this.setActiveSlide(t)
  },
  onRender: function () {
    this._super(arguments), this.updateCssClasses(), this.$slidesContainer = jQuery('<div class="slideshow-slidesContainer" />').appendTo(this.$el)
  },
  getContentTarget: function () {
    return this.$slidesContainer
  },
  onAdd: function (e, t) {
    this._super(arguments), this.activeSlide || this.setActiveSlide(e), e.on({
      next: this.next,
      previous: this.previous,
      restart: this.restart,
      scope: this
    })
  },
  onRemove: function (e, t) {
    this._super(arguments), e.un({
      next: this.next,
      previous: this.previous,
      restart: this.restart,
      scope: this
    }), e === this.getActiveSlide() && this.setActiveSlide(t - 1, !0)
  },
  onReorder: function (e, t, n) {
    this._super(arguments)
  },
  activate: function () {
    this.restart(), this.onActivate()
  },
  deactivate: function () {
    this.onDeactivate()
  },
  onActivate: Jux.emptyFn,
  onDeactivate: Jux.emptyFn,
  setActiveSlide: function (e, t) {
    typeof e == "number" && (e = this.getItemAt(this.normalizeIndex(e)));
    var n = this.getActiveSlide();
    e !== n && (this.activeSlide = e, this.rendered && !t && this.doLayout(), this.onActiveSlideChange(e, n))
  },
  onActiveSlideChange: function (e) {
    this.updateCssClasses(), this.fireEvent("activeslidechange", this, e, this.getItemIndex(e))
  },
  previous: function () {
    var e = this.getActiveSlideIndex();
    e > 0 && this.setActiveSlide(e - 1)
  },
  next: function () {
    var e = this.getActiveSlideIndex();
    e >= 0 && e < this.getCount() - 1 && this.setActiveSlide(e + 1)
  },
  restart: function () {
    this.setActiveSlide(0)
  },
  getActiveSlide: function () {
    return this.activeSlide
  },
  getActiveSlideIndex: function () {
    return this.getItemIndex(this.activeSlide)
  },
  updateCssClasses: function () {
    if (this.rendered) {
      var e = this.getActiveSlideIndex();
      this.$el.toggleClass("slideshowComponent-firstSlideActive", e === 0).toggleClass("slideshowComponent-lastSlideActive", e >= 0 && e === this.getCount() - 1)
    }
  },
  normalizeIndex: function (e) {
    var t = Math.max(this.getCount() - 1, 0);
    if (e > t) e = t;
    else if (e < 0 || typeof e != "number" || !e) e = 0;
    return e
  }
}), app.components.slideshow.TouchSlideshow = Jux.extend(app.components.slideshow.Slideshow, {
  onRender: function () {
    var e = this;
    e._super(arguments);
    var t = e.$el;
    e.$cuePrevious = jQuery('<div class="cue-previous" />').appendTo(t), e.$cueNext = jQuery('<div class="cue-next" />').appendTo(t), e.updateTouchNavigation(), e._touch = {};
    var n = e.onTouchEnd.createDelegate(e);
    t.bind({
      touchstart: e.onTouchStart.createDelegate(e),
      touchmove: e.onTouchMove.createDelegate(e),
      touchend: n,
      touchcancel: n,
      gesturestart: n
    })
  },
  onTouchStart: function (e) {
    var t = e.originalEvent.touches,
      n, r, i, s;
    t.length > 1 && this.resetTouch(), this._touch.directionLocked = !1, this._touch.initiated = !0, this._touch.x1 = this._touch.x2 = t[0].clientX, this._touch.y1 = this._touch.y2 = t[0].clientY, this._touch.last = Date.now(), this._touch.corner = !1, this._touch.area = [], Jux.isIPad ? (r = this._touch.x1 >= jQuery(window).width() * .75, i = this._touch.y1 >= jQuery(window).height() * .75, s = this._touch.x1 <= jQuery(window).width() * .25, n = this._touch.y1 <= jQuery(window).height() * .25, this._touch.hotArea = n && s || n && r || i && r || i && s, this._touch.hotArea && (e.stopPropagation(), this._touch.area = [n ? "top" : "bottom", s ? "left" : "right"])) : (i = this._touch.y1 >= $(window).height() * .5, n = this._touch.y1 <= $(window).height() * .5, this._touch.hotArea = i || n, this._touch.hotArea && (this._touch.area = [n ? "top" : "bottom"]));
    if (!this._touch.hotArea) return !0;
    if (this._touch.area.indexOf("top") > -1) {
      var o = this.layout.getPreviousSlide();
      this._touch.slide = o, o && (o.resetPosition(), o.unflip(), Jux.isIPad ? this._touch.area.indexOf("left") > -1 ? o.move(!0, 175, 175, 12) : o.move(!0, -175, 175, -12) : Jux.isHandheld && o.move(!0, 0, 75, 0), o.onTouchStart(e))
    } else {
      var u = this.layout.getCurrentSlide();
      u.resetPosition(), this._touch.slide = u, u.onTouchStart(e)
    }
  },
  onTouchMove: function (e) {
    var t = e.originalEvent.touches,
      n = this._touch;
    if (t.length > 1 || !this._touch.slide || !this._touch.initiated) return;
    var r = t[0].clientX,
      i = t[0].clientY;
    if (!n.x2 || !n.y2) this._touch.x2 = r, this._touch.y2 = i;
    var s = Math.abs(r - n.x1),
      o = Math.abs(i - n.y1);
    if (!Jux.isIPad && (s > 10 || o > 10)) {
      if (!n.directionLocked && s > o) {
        n.slide.move(!1, 0, 0, 0), this._touch.initiated = !1;
        return
      }
      this._touch.directionLocked = !0
    }
    n.hotArea && (e.preventDefault(), Jux.isIPad ? n.area.indexOf("bottom") > -1 ? (n.slide.setTransformOrigin(n.area.indexOf("left") > -1 ? "20% 80%" : "80% 80%"), n.slide.move(!1, r - n.x1, i - n.y1, (n.area.indexOf("right") > -1 ? 1 : -1) * (1 - i / window.innerHeight) * 12)) : n.slide && n.slide.move(!1, r - n.x1 - (n.area.indexOf("left") > -1 ? 1 : -1) * (n.slide.getWidth() - 175), i - n.y1 - n.slide.getHeight() + 175, (n.area.indexOf("right") > -1 ? 1 : -1) * (1 - i / window.innerHeight) * 12) : n.area.indexOf("bottom") > -1 ? (n.slide.setTransformOrigin("50% 80%"), n.slide.move(!1, 0, Math.min(0, i - n.y1), 0)) : n.slide && n.slide.move(!1, 0, Math.min(0, i - n.y1 - n.slide.getHeight() + 75), 0)), this._touch.x2 = r, this._touch.y2 = i
  },
  onTouchEnd: function (e) {
    var t = this._touch;
    if (!t.slide || !t.initiated) return;
    t.slide.onTouchEnd(e), t.slide.resetPosition();
    if (Jux.isIPad) {
      var n = t.x2 >= t.x1 && t.area.indexOf("left") > -1,
        r = t.x2 <= t.x1 && t.area.indexOf("right") > -1;
      t.y2 <= t.y1 && t.area.indexOf("bottom") > -1 && (n || r) && t.slide !== this.getItemAt(this.getCount() - 1) ? (t.slide.flip(t.area.indexOf("left") > -1 ? "right" : "left"), this.next()) : t.y2 >= t.y1 && t.area.indexOf("top") > -1 && (n || r) && this.previous()
    } else if (t.y2 <= t.y1 - 10 && t.area.indexOf("bottom") > -1)
      if (t.slide !== this.getItemAt(this.getCount() - 1)) t.slide.flip("left"), this.next();
      else {
        var i = t.slide;
        i.move(!1, 0, t.y2 - t.y1, 0), setTimeout(function () {
          i.move(!1, 0, 0, 0)
        }.createDelegate(this), 750)
      } else t.y2 >= t.y1 + 10 && t.area.indexOf("top") > -1 && this.previous();
    this.updateTouchNavigation(), this.resetTouch()
  },
  resetTouch: function () {
    this._touch.x1 = this._touch.x2 = this._touch.y1 = this._touch.y2 = this._touch.last = 0, this._touch.slide = this._touch.hotArea = this._touch.area = null
  },
  updateTouchNavigation: function () {
    var e = this.getActiveSlideIndex();
    e === 0 ? this.$cuePrevious.hide() : this.$cuePrevious.show(), e < this.getCount() - 1 ? this.$cueNext.show() : this.$cueNext.hide()
  },
  activate: function () {
    var e = this.layout.getCurrentSlide();
    e.resetPosition(), this.resetTouch(), this.updateTouchNavigation(), this.onActivate()
  }
}), app.components.slideshow.DesktopSlideshow = Jux.extend(app.components.slideshow.Slideshow, {
  navigationControlVisible: !0,
  animateBetweenSlides: !1,
  onRender: function () {
    this._super(arguments);
    var e = this.navigationControlVisible === !1 ? "display:none;" : "";
    this.$navigationControlEl = jQuery('<ol class="slideshow-navigationControl" style="' + e + '"></ol>').appendTo(this.$el);
    var t = [];
    for (var n = 0, r = this.getCount(); n < r; n++) t.push("<li />");
    this.$navigationControlEl.append(t.join("")), this.$navigationControlEl.delegate("li", "click", this.onDotClick.createDelegate(this)), this.updateNavigationControl()
  },
  onAdd: function (e, t) {
    this._super(arguments), this.rendered && this.$navigationControlEl.append("<li />")
  },
  onRemove: function (e, t) {
    this._super(arguments), this.rendered && (this.$navigationControlEl.children().eq(0).remove(), this.updateNavigationControl())
  },
  onReorder: function (e, t, n) {
    this._super(arguments), this.updateNavigationControl()
  },
  onActivate: function () {
    this._super(arguments), this.enableKeyboardNavigation()
  },
  onDeactivate: function () {
    this.disableKeyboardNavigation(), this._super(arguments)
  },
  onActiveSlideChange: function () {
    this.updateNavigationControl(), this._super(arguments)
  },
  showNavigationControl: function () {
    this.navigationControlVisible = !0, this.rendered && this.$navigationControlEl.show()
  },
  hideNavigationControl: function () {
    this.navigationControlVisible = !1, this.rendered && this.$navigationControlEl.hide()
  },
  updateNavigationControl: function () {
    if (this.rendered) {
      var e = this.$navigationControlEl.find("li");
      e.removeClass("active"), e.eq(this.getActiveSlideIndex()).addClass("active")
    }
  },
  onDotClick: function (e) {
    this.setActiveSlide(this.$navigationControlEl.find("li").index(e.currentTarget))
  },
  enableKeyboardNavigation: function () {
    this.onKeyDownDelegate || (this.onKeyDownDelegate = this.onKeyDown.createDelegate(this), jQuery(document).bind("keydown", this.onKeyDownDelegate))
  },
  disableKeyboardNavigation: function () {
    this.onKeyDownDelegate && (jQuery(document).unbind("keydown", this.onKeyDownDelegate), delete this.onKeyDownDelegate)
  },
  onKeyDown: function (e) {
    if (!_.contains(["textarea", "input", "select"], e.target.tagName.toLowerCase())) switch (e.which) {
    case 37:
      this.onPreviousKey(e);
      break;
    case 39:
      this.onNextKey(e)
    }
  },
  onNextKey: function (e) {
    this.getActiveSlideIndex() < this.getCount() - 1 && (this.next(), e.stopPropagation(), e.preventDefault())
  },
  onPreviousKey: function (e) {
    this.getActiveSlideIndex() > 0 && (this.previous(), e.stopPropagation(), e.preventDefault())
  },
  onDestroy: function () {
    this.disableKeyboardNavigation(), this._super(arguments)
  }
}), app.components.slideshow.HorizontalPagingSlideshow = Jux.extend(app.components.slideshow.DesktopSlideshow, {
  layout: "horizontalscroll",
  initComponent: function () {
    this._super(arguments), this.$window = Jux.Util.getWindowObject(), this.onWindowResizeDelegate = _.debounce(_.bind(this.onWindowResize, this), 100), this.$window.on("resize", this.onWindowResizeDelegate), this.layout.on({
      movedToElement: this.onMovedToElement,
      scrollingToElement: this.onScrollingToElement,
      scope: this
    })
  },
  onWindowResize: function () {
    this.jumpToSlide(this.activeSlide)
  },
  onRender: function () {
    this._super(arguments), this.onCollectionSizeChange(), this.bindToCollectionEvents()
  },
  getSlideCollection: function () {
    return this.model.get("quarks")
  },
  bindToCollectionEvents: function () {
    var e = this.getSlideCollection();
    e.on({
      add: this.onCollectionSizeChange,
      remove: this.onCollectionSizeChange,
      scope: this
    })
  },
  onCollectionSizeChange: function () {
    var e = this.getSlideCollection().getCount();
    this.layout.updateScroller(), e > 1 ? this.$navigationControlEl.fadeIn() : this.$navigationControlEl.hide()
  },
  onActiveSlideChange: function (e, t) {
    this._super(arguments);
    if (this.scrollToSlideDeferred) {
      this.ifAnimationAlreadyRunning(e, t);
      return
    }
    t && this.performScrollAnimation(e, t), t || this._messageSlideModel(e, "entered_view")
  },
  performScrollAnimation: function (e, t) {
    this.oldActiveSlide = t, this.scrollToSlideDeferred = new $.Deferred, this.animationRunning = !0, this.scrollToSlideDeferred.done(function () {
      this.scrollToSlide(e), this.scrollToSlideDeferred = null, this.animationRunning = !1
    }.createDelegate(this)), this._messageSlideModel(t, "exiting_view", this.scrollToSlideDeferred)
  },
  ifAnimationAlreadyRunning: function (e, t) {
    this.scrollToSlideDeferred.reject(), this.scrollToSlideDeferred = null, this.scrollToSlide(t), this.setActiveSlide(t), this._messageSlideModel(this.oldActiveSlide, "out_of_view")
  },
  _messageSlideModel: function (e, t, n) {
    if (!e || !e.getModel) return;
    var r = e.getModel();
    r && r.trigger("paging_slideshow:" + t, n || {})
  },
  scrollToSlide: function (e) {
    this._moveToSlide(e, "scrollToElement")
  },
  jumpToSlide: function (e) {
    this._moveToSlide(e, "jumpToElement")
  },
  _moveToSlide: function (e, t) {
    e && e.isRendered() && (this._messageSlideModel(this.atSlide, "scrolling_to_another_slide"), this.layout[t](e.getEl()))
  },
  onScrollingToElement: function (e, t) {
    this._messageSlideModel(this.activeSlide, "entering_view")
  },
  onMovedToElement: function (e, t, n) {
    this.sendMessageToMultipleSlides(_.filter(this.childComponents, function (e) {
      return e !== this.atSlide
    }), "out_of_view"), this._messageSlideModel(this.activeSlide, "entered_view", {
      animated: n
    })
  },
  sendMessageToMultipleSlides: function (e, t) {
    _.each(e, function (e) {
      this._messageSlideModel(e, t)
    }.createDelegate(this))
  },
  onActivate: function () {
    this._super(arguments), this.layout.onActivate()
  },
  onDeactivate: function () {
    this._super(arguments), this.layout.onDeactivate()
  },
  onDestroy: function () {
    this.$window.off("resize", this.onWindowResizeDelegate);
    var e = this.getSlideCollection();
    e.un({
      add: this.onCollectionSizeChange,
      remove: this.onCollectionSizeChange,
      scope: this
    }), this.scrollToSlideDeferred && (this.scrollToSlideDeferred.reject(), this.scrollToSlideDeferred = null), this._super(arguments)
  }
}), app.components.slideshow.CreationDesktopSlideshow = Jux.extend(app.components.slideshow.HorizontalPagingSlideshow, {
  getAcceptType: function () {
    return app.views.quark.creationSubchild.CreationSubchild
  }
}), app.components.slideshow.CreationTabletSlideshow = Jux.extend(app.components.slideshow.TouchSlideshow, {}), app.components.slideshow.SlideshowLayout = Jux.extend(ui.layout.Layout, {
  previousSlide: null,
  currentSlide: null,
  nextSlide: null,
  animateBetweenSlides: !0,
  onLayout: function (e, t) {
    var n = this,
      r = n.container,
      i = r.getActiveSlide();
    if (r.getCount() === 0) return;
    var s = r.getItemIndex(i),
      o = n.currentSlide,
      u = n.previousSlide,
      a = n.nextSlide,
      f = n.currentSlide = i,
      l = n.previousSlide = r.getItemAt(s - 1),
      c = n.nextSlide = r.getItemAt(s + 1),
      h = [l, f, c];
    o ? o !== f && (_.indexOf(h, o) === -1 ? o.detach(this.animateBetweenSlides) : o.deactivate(this.animateBetweenSlides), f.render(t)) : f.render(t), u && _.indexOf(h, u) === -1 && u.detach(), a && _.indexOf(h, a) === -1 && a.detach(), f.activate(), l && l.render(t, 0), c && c.render(t, 0)
  },
  getCurrentSlide: function () {
    return this.currentSlide
  },
  getPreviousSlide: function () {
    return this.previousSlide
  },
  getNextSlide: function () {
    return this.nextSlide
  }
}), app.components.ScrollableContainer = Jux.extend(ui.Container, {
  constrainHeight: !0,
  overflowX: "hidden",
  overflowY: "auto",
  scrollLeft: 0,
  scrollTop: 0,
  initComponent: function () {
    this.setOverflowX(this.overflowX), this.setOverflowY(this.overflowY), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = "width:100%;" + (this.constrainHeight ? "height:100%;" : "min-height:100%;");
    this.$contentEl = jQuery('<div style="' + e + '" data-elem="ScrollableContainer-ContentEl" />').appendTo(this.$el)
  },
  onLayout: function () {
    this._super(arguments), this.setScrollLeft(this.scrollLeft), this.setScrollTop(this.scrollTop)
  },
  getContentTarget: function () {
    return this.$contentEl
  },
  getContentHeight: function () {
    return this.$contentEl.height()
  },
  setOverflowX: function (e) {
    return this.overflowX = e, this.setStyle("overflow-x", e), this
  },
  setOverflowY: function (e) {
    return this.overflowY = e, this.setStyle("overflow-y", e), this
  },
  getScrollableHeight: function () {
    return Math.max(this.getContentHeight() - this.getHeight(), 0)
  },
  setScrollLeft: function (e) {
    this.scrollLeft = e;
    if (!this.rendered) this.scrollLeft = e;
    else {
      var t = this.$el;
      t.scrollLeft(e), this.scrollLeft = t.scrollLeft()
    }
  },
  setScrollTop: function (e) {
    this.scrollTop = e;
    if (!this.rendered) this.scrollTop = e;
    else {
      var t = this.$el;
      t.scrollTop(e), this.scrollTop = t.scrollTop()
    }
  }
}), ui.ComponentManager.registerType("ScrollableContainer", app.components.ScrollableContainer), app.components.CenteredSpinner = Jux.extend(ui.Component, {
  spinnerImageUrl: Jux.Cdn.BASE_URI + (Jux.isTouch ? "assets/static_spinner.png" : "assets/spinner2e2d2d.gif"),
  $renderContainerEl: null,
  visible: !1,
  initComponent: function () {
    this.cls += " jux-spinner", this.style = Jux.apply({}, {
      display: "none"
    }, this.style), app.components.CenteredSpinner.superclass.initComponent.apply(this, arguments)
  },
  isVisible: function () {
    return this.visible
  },
  onRender: function (e) {
    this.$renderContainerEl = e, app.components.CenteredSpinner.superclass.onRender.apply(this, arguments);
    var t = jQuery('<div class="jux-spinner-inner" />').appendTo(this.$el),
      n = jQuery('<img class="jux-spinner-img" />').bind("load", this.setOffsets.createDelegate(this)).attr("src", this.spinnerImageUrl).appendTo(t);
    this.setOffsets()
  },
  setOffsets: function () {
    this.$el.css({
      "margin-top": -(this.$el.innerHeight() / 2) + "px",
      "margin-left": -(this.$el.innerWidth() / 2) + "px"
    })
  },
  show: function () {
    this.rendered || this.render("body"), this.visible = !0, this.$renderContainerEl.css("position") === "static" && !this.$renderContainerEl.is("body") && this.$renderContainerEl.addClass("jux-spinner-container-relative"), app.components.CenteredSpinner.superclass.show.apply(this, arguments)
  },
  hide: function (e) {
    this.rendered && this.$renderContainerEl.removeClass("jux-spinner-container-relative"), this.visible = !1, app.components.CenteredSpinner.superclass.hide.apply(this, arguments)
  },
  showComplete: function () {
    this.$el && (this.$el.show(), this.visible = !0)
  },
  hideComplete: function () {
    this.$el && (this.$el.hide(), this.visible = !1)
  },
  onDestroy: function () {
    this.rendered && this.$renderContainerEl.removeClass("jux-spinner-container-relative"), this.$renderContainerEl = null, app.components.CenteredSpinner.superclass.onDestroy.apply(this, arguments)
  }
}), app.components.ExpandableContainer = Jux.extend(ui.Container, {
  animated: !0,
  expandedCls: "expanded",
  hScrollbar: !1,
  numCharsForExpand: 120,
  enableExpand: !1,
  expanded: !1,
  justExpanded: !1,
  initComponent: function (e) {
    this.addEvents("expand", "collapse"), this.addCls("expandableContainer expandableContainer-collapsed"), this.touchPos = {}, this.animated && this.setStyle("-webkit-transition", "all 0.3s ease-in-out"), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this,
      t = e.$el;
    e.$innerScrollerEl = jQuery('<div class="inner-scroller" />').appendTo(t), e.scroller = new app.components.IScroll({
      el: t,
      hScrollbar: e.hScrollbar,
      disabled: !0
    }), e.$arrowContainerEl = jQuery('<div class="expandableContainer-arrowContainer" style="display: none;" />').appendTo(t), t.bind({
      touchstart: e.onTouchStart.createDelegate(e),
      touchmove: e.onTouchMove.createDelegate(e),
      touchend: e.onTouchEnd.createDelegate(e),
      webkitTransitionEnd: e.refreshScroller.createDelegate(e)
    })
  },
  onLayout: function () {
    var e = this,
      t = e.$el,
      n = t.text().replace(/\s{2,}/g, "").length;
    e.enableExpand = n >= e.numCharsForExpand, e.$arrowContainerEl[e.enableExpand ? "show" : "hide"]()
  },
  getContentTarget: function () {
    return this.$innerScrollerEl
  },
  expand: function () {
    var e = this;
    e.enableExpand && !e.isExpanded() && (e.expanded = !0, e.$el.removeClass("expandableContainer-collapsed").addClass("expandableContainer-expanded " + e.expandedCls), e.scroller.enable(), e.scroller.refresh(), e.fireEvent("expand", e))
  },
  collapse: function () {
    var e = this;
    e.isExpanded() && (e.expanded = !1, e.$el.removeClass("expandableContainer-expanded " + e.expandedCls).addClass("expandableContainer-collapsed"), e.scroller.disable(), e.fireEvent("collapse", e))
  },
  isExpanded: function () {
    return this.expanded
  },
  refreshScroller: function () {
    this.scroller.refresh()
  },
  onTouchStart: function (e) {
    var t = this;
    t.isExpanded() || (t.expand(), t.justExpanded = !0);
    var n = e.originalEvent.touches[0];
    t.touchPos.x1 = t.touchPos.x2 = n.clientX, t.touchPos.y1 = t.touchPos.y2 = n.clientY, e.stopPropagation(), e.preventDefault()
  },
  onTouchMove: function (e) {
    var t = e.originalEvent.touches[0],
      n = this.touchPos;
    n.x2 = t.clientX, n.y2 = t.clientY, e.stopPropagation(), e.preventDefault()
  },
  onTouchEnd: function (e) {
    var t = this;
    !t.justExpanded && t.expanded && Math.abs(t.touchPos.y2 - t.touchPos.y1) < 10 && t.collapse(), t.touchPos = {}, t.justExpanded = !1, e.stopPropagation(), e.preventDefault()
  }
}), ui.ComponentManager.registerType("ExpandableContainer", app.components.ExpandableContainer), app.components.FastButton = function (e, t) {
  this.element = e, this.handler = t, e.addEventListener && (e.addEventListener("touchstart", this, !1), e.addEventListener("click", this, !1))
}, app.components.FastButton.prototype.handleEvent = function (e) {
  switch (e.type) {
  case "touchstart":
    this.onTouchStart(e);
    break;
  case "touchmove":
    this.onTouchMove(e);
    break;
  case "touchend":
    this.onClick(e);
    break;
  case "click":
    this.onClick(e)
  }
}, app.components.FastButton.prototype.onTouchStart = function (e) {
  this.element.addEventListener("touchend", this, !1), document.body.addEventListener("touchmove", this, !1), this.startX = e.touches[0].clientX, this.startY = e.touches[0].clientY, $(this.element).addClass("active")
}, app.components.FastButton.prototype.onTouchMove = function (e) {
  (Math.abs(e.touches[0].clientX - this.startX) > 10 || Math.abs(e.touches[0].clientY - this.startY) > 10) && this.reset()
}, app.components.FastButton.prototype.onClick = function (e) {
  e.stopPropagation(), this.reset(), this.handler(e), e.type == "touchend" && app.components.preventGhostClick(this.startX, this.startY)
}, app.components.FastButton.prototype.reset = function () {
  this.element.removeEventListener("touchend", this, !1), document.body.removeEventListener("touchmove", this, !1), $(this.element).removeClass("active")
}, app.components.preventGhostClick = function (e, t) {
  app.components.ghostCoords.push(e, t), window.setTimeout(function () {
    app.components.ghostCoords.splice(0, 2)
  }, 2500)
}, app.components.ghostClickHandler = function (e) {
  var t = app.components.ghostCoords;
  for (var n = 0, r = t.length; n < r; n += 2) {
    var i = t[n],
      s = t[n + 1];
    Math.abs(e.clientX - i) < 25 && Math.abs(e.clientY - s) < 25 && (e.stopPropagation(), e.preventDefault())
  }
}, document.addEventListener && document.addEventListener("click", app.components.ghostClickHandler, !0), app.components.ghostCoords = [], app.components.FillmorableImage = Class.extend(ui.Component, {
  src: "",
  fillmore: !0,
  creditsIcon: !0,
  loaded: !1,
  errored: !1,
  blankImg: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  initComponent: function () {
    this.addEvents("load", "error"), this.cls += " ui-image", this.defaultFillmoreOptions = this.defaultFillmoreOptions || {}, this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el;
    if (!this.fillmore) {
      var t = jQuery('<div class="picture-container-noFillmore-innerWrap" />').appendTo(this.$el);
      e = t;
      var n = this.$image = jQuery('<img class="noFillmore" />').appendTo(t);
      this.imgAttr && n.attr(this.imgAttr), this.imgStyle && n.css(this.imgStyle)
    }
    this.$credits = jQuery('<div class="credits" />'), this.creditsIcon && this.$credits.appendTo(e), this.setSrc(this.src, this.currentFillmoreOptions || this.defaultFillmoreOptions)
  },
  onComponentLayout: function () {
    this._super(arguments), this.resize()
  },
  resize: function () {
    this.rendered && this.fillmore && this.src && this.$el.fillmore("resize")
  },
  setSrc: function (e, t) {
    this.src = e;
    if (this.rendered) {
      this.loaded = !1, this.errored = !1;
      if (this.fillmore) {
        t = _.extend({}, this.defaultFillmoreOptions, t, {
          src: this.src,
          onImageLoad: this.onImageLoad.createDelegate(this)
        });
        var n = this.focusPoint;
        n && (t.focusX = n.x, t.focusY = n.y), this.$el.css({
          width: this.width || "100%",
          height: this.height || "100%"
        }).fillmore(t)
      } else {
        var r = this.$image;
        r.unbind(".fillmorableImage"), r.attr("src", this.blankImg), this.$image.bind({
          "load.fillmorableImage": this.onImageLoad.createDelegate(this),
          "error.fillmorableImage": this.onImageError.createDelegate(this)
        }), this.$image.attr("src", this.src)
      }
    }
    this.currentFillmoreOptions = _.extend({}, this.defaultFillmoreOptions, t)
  },
  getSrc: function () {
    return this.src
  },
  isLoaded: function () {
    return this.loaded
  },
  isErrored: function () {
    return this.errored
  },
  onImageLoad: function () {
    this.loaded = !0, this.fireEvent("load", this)
  },
  onImageError: function () {
    this.errored = !0, this.fireEvent("error", this)
  },
  getViewableArea: function () {
    if (!this.isLoaded()) return null;
    if (this.fillmore) {
      var e = this.$el.fillmore("getViewableImageArea");
      return Jux.apply(e, {
        percentWidth: e.width / e.stretchedWidth,
        percentHeight: e.height / e.stretchedHeight
      }), e
    }
    var t = this.$image[0],
      n = t.width,
      r = t.height;
    return {
      width: n,
      height: r,
      offsetLeft: 0,
      offsetTop: 0,
      stretchedWidth: n,
      stretchedHeight: r,
      percentWidth: 1,
      percentHeight: 1
    }
  },
  getImage: function () {
    return this.fillmore ? this.$el : this.$image
  },
  getCreditsEl: function () {
    return this.$credits
  }
}), ui.ComponentManager.registerType("FillmorableImage", app.components.FillmorableImage), app.components.IScroll = Jux.extend(Jux.util.Observable, {
  disabled: !1,
  scrolling: !1,
  destroyed: !1,
  constructor: function (e) {
    Jux.apply(this, e);
    if (!this.el) throw new Error("'el' config required");
    this._super(arguments), this.addEvents("scrollstart", "scrollmove", "scrollend"), this.$el = jQuery(this.el);
    var t = {};
    this.hScroll !== undefined && (t.hScroll = this.hScroll), this.vScroll !== undefined && (t.vScroll = this.vScroll), this.hScrollbar !== undefined && (t.hScrollbar = this.hScrollbar), this.vScrollbar !== undefined && (t.vScrollbar = this.vScrollbar), this.fixedScrollbar !== undefined && (t.fixedScrollbar = this.fixedScrollbar), this.fadeScrollbar !== undefined && (t.fadeScrollbar = this.fadeScrollbar), this.hideScrollbar !== undefined && (t.hideScrollbar = this.hideScrollbar), this.bounce !== undefined && (t.bounce = this.bounce), this.momentum !== undefined && (t.momentum = this.momentum), this.lockDirection !== undefined && (t.lockDirection = this.lockDirection), t.onScrollStart = this.onScrollStart.createDelegate(this), t.onScrollMove = this.onScrollMove.createDelegate(this), t.onScrollEnd = this.onScrollEnd.createDelegate(this), t.onTouchEnd = this.onTouchEnd.createDelegate(this), this.iScroll = new iScroll(this.$el[0], t), this.disabled && this.disable(), this.touchStartDelegate = this.refresh.createDelegate(this), this.$el.one("touchstart", this.touchStartDelegate), this.initialScrollerRefreshTimerId = setTimeout(this.refresh.createDelegate(this), 500)
  },
  refresh: function () {
    this.destroyed || this.iScroll.refresh()
  },
  enable: function () {
    this.destroyed || this.iScroll.enable()
  },
  disable: function () {
    this.destroyed || this.iScroll.disable()
  },
  scrollTo: function () {
    this.destroyed || this.iScroll.scrollTo.apply(this.iScroll, arguments)
  },
  scrollToElement: function () {
    this.destroyed || this.iScroll.scrollToElement.apply(this.iScroll, arguments)
  },
  scrollToPage: function () {
    this.destroyed || this.iScroll.scrollToPage.apply(this.iScroll, arguments)
  },
  getScrollLeft: function () {
    return -1 * this.iScroll.x
  },
  getScrollTop: function () {
    return -1 * this.iScroll.y
  },
  isScrolling: function () {
    return this.scrolling
  },
  onScrollStart: function () {
    this.scrolling = !0, clearInterval(this.scrollMoveIntervalId), this.onScrollMove(), this.fireEvent("scrollstart", this)
  },
  onScrollMove: function () {
    var e = this.getScrollLeft(),
      t = this.getScrollTop();
    if (e !== this.lastScrollLeft || t !== this.lastScrollTop) this.lastScrollLeft = e, this.lastScrollTop = t, this.fireEvent("scrollmove", this)
  },
  onScrollEnd: function () {
    this.scrolling = !1, clearInterval(this.scrollMoveIntervalId), this.onScrollMove(), this.fireEvent("scrollend", this)
  },
  onTouchEnd: function () {
    this.scrollMoveIntervalId = setInterval(this.onScrollMove.createDelegate(this), 10)
  },
  destroy: function () {
    this.destroyed || (this.$el.unbind("touchstart", this.touchStartDelegate), clearTimeout(this.initialScrollerRefreshTimerId), clearInterval(this.scrollMoveIntervalId), this.iScroll.destroy(), this.destroyed = !0, this.purgeListeners())
  }
}), app.components.ManagedScrollableContainer = Jux.extend(app.components.ScrollableContainer, {
  overflowX: "hidden",
  overflowY: "hidden"
}), ui.ComponentManager.registerType("ManagedScrollableContainer", app.components.ManagedScrollableContainer), app.components.ModelPersister = Jux.extend(Jux.util.Observable, {
  persistDelay: 2e3,
  autoPersistOnChange: !0,
  constructor: function (e) {
    Jux.apply(this, e);
    if (!this.model) throw new Error("'model' config required");
    this.addEvents("success", "error", "complete"), this._super(arguments), this.dataPersistTask = new Jux.util.DelayedTask, this.autoPersistOnChange && this.model.on("change", this.onModelChange, this), this.beforeunloadDelegate = function () {
      this.save({
        async: !1
      })
    }.createDelegate(this), jQuery(window).bind("beforeunload", this.beforeunloadDelegate)
  },
  onModelChange: function (e, t, n, r, i) {
    if (e.attributes[t].persist != 0) return i && i.isPersistedValue === !1 ? !1 : (this.delayedSave(), !0)
  },
  delayedSave: function (e) {
    this.dataPersistTask.delay(e || this.persistDelay, this.save, this)
  },
  cancelPendingSave: function () {
    this.dataPersistTask.cancel()
  },
  save: function (e) {
    e = e || {};
    var t = e.scope || window,
      n = Jux.emptyFn,
      r = e.success || n,
      i = e.error || n,
      s = e.complete || n;
    this.cancelPendingSave(), this.model.save({
      async: typeof e.async == "undefined" ? !0 : e.async,
      success: function () {
        r.apply(t, arguments), this.fireEvent("success", this)
      },
      error: function () {
        i.apply(t, arguments), this.fireEvent("error", this)
      },
      complete: function () {
        s.apply(t, arguments), this.fireEvent("complete", this)
      },
      scope: this
    })
  },
  destroy: function () {
    this.model.un("change", this.onModelChange, this), jQuery(window).unbind("beforeunload", this.beforeunloadDelegate)
  }
}), app.components.SwipeView = function () {
  var e = "onorientationchange" in window ? "orientationchange" : "resize",
    t = Jux.isTouch ? "touchstart" : "mousedown",
    n = Jux.isTouch ? "touchmove" : "mousemove",
    r = Jux.isTouch ? "touchend" : "mouseup",
    i = Jux.isTouch ? "touchcancel" : "mouseup",
    s = function (i, s) {
      var o, u, a, f;
      this.$wrapper = jQuery(i), this.wrapper = this.$wrapper.get(0), this.options = {
        text: null,
        snapThreshold: null
      };
      for (o in s) this.options[o] = s[o];
      this.masterPages = [], u = document.createElement("div"), u.id = "swipeview-slider", Jux.isTouch ? u.style.cssText = "position:relative;top:0;height:100%;width:100%;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);-webkit-transition-timing-function:ease-out" : u.style.cssText = "position:relative;top:0;height:100%;width:100%;", this.$wrapper.append(u), this.slider = u, this.$slider = jQuery(this.slider), this.refreshSize();
      for (o = -1; o < 2; o++) a = "position:absolute;top:0;height:100%;width:100%;", Jux.isIPad ? a += "-webkit-transform:translate3d(" + o * 100 + "%, 0, 0);" : (a += "left:" + o * 100 + "%;", Jux.isTouch && (a += "-webkit-transform:translateZ(0);")), $div = jQuery('<div style="' + a + '"/>'), $div[0].id = "swipeview-masterpage-" + (o + 1), this.$slider.append($div), this.masterPages.push($div[0]);
      f = this.masterPages[1].className, this.masterPages[1].className = f ? f + " swipeview-active" : "swipeview-active", this.handleEventDelegate = this.handleEvent.createDelegate(this), $(window).bind(e, this.handleEventDelegate), Jux.isTouch && $(this.wrapper).bind(t, this.handleEventDelegate).bind(n, this.handleEventDelegate).bind(r, this.handleEventDelegate), $(this.slider).bind("webkitTransitionEnd transitionend", this.handleEventDelegate)
    };
  return s.prototype = {
    enabled: !0,
    defaultSnapThreshold: Jux.isIPad ? 0 : .15,
    previousMasterPage: 0,
    currentMasterPage: 1,
    upcomingMasterPage: 2,
    x: 0,
    page: 0,
    lastPage: 0,
    customEvents: [],
    __startFlip: function () {},
    __beforeFlip: function () {},
    onStartFlip: function (e) {
      this.__startFlip = e
    },
    onBeforeFlip: function (e) {
      this.__beforeFlip = e
    },
    onFlip: function (e) {
      this.$wrapper.bind("swipeview-flip", e), this.customEvents.push(["flip", e])
    },
    onMoveOut: function (e) {
      this.$wrapper.bind("swipeview-moveout", e), this.customEvents.push(["moveout", e])
    },
    onMoveIn: function (e) {
      this.$wrapper.bind("swipeview-movein", e), this.customEvents.push(["movein", e])
    },
    onTouchStart: function (e) {
      this.$wrapper.bind("swipeview-touchstart", e), this.customEvents.push(["touchstart", e])
    },
    destroy: function () {
      var i, s;
      for (i = 0, s = customEvents.length; i < s; i++) this.$wrapper.unbind("swipeview-" + this.customEvents[i][0], this.customEvents[i][1]);
      this.customEvents = [], jQuery(window).unbind(e, this.handleEventDelegate), this.$wrapper.unbind(t, this.handleEventDelegate).unbind(n, this.handleEventDelegate).unbind(r, this.handleEventDelegate), this.$slider.unbind("webkitTransitionEnd", this.handleEventDelegate)
    },
    refreshSize: function () {
      this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.pageWidth = this.wrapperWidth, this.maxX = -2 * this.pageWidth + this.wrapperWidth;
      var e;
      this.options.snapThreshold === null ? e = Math.round(this.pageWidth * this.defaultSnapThreshold) : /%/.test(this.options.snapThreshold) ? e = Math.round(this.pageWidth * this.options.snapThreshold.replace("%", "") / 100) : e = this.options.snapThreshold, this.snapThreshold = e
    },
    goToPage: function (e) {
      var t;
      this.getCurrentMasterPage().className = this.getCurrentMasterPage().className.replace(/(^|\s)swipeview-active(\s|$)/, "");
      for (t = 0; t < 3; t++) className = this.masterPages[t].className, /(^|\s)swipeview-loading(\s|$)/.test(className) || (this.masterPages[t].className = className ? className + " swipeview-loading" : "swipeview-loading");
      this.page = e, this.lastPage = e, this.slider.style.webkitTransitionDuration = "0", this.__pos(-e * this.pageWidth), this.previousMasterPage = this.page - Math.floor(this.page / 3) * 3, this.currentMasterPage = this.page + 1 - Math.floor((this.page + 1) / 3) * 3, this.upcomingMasterPage = this.page + 2 - Math.floor((this.page + 2) / 3) * 3, this.getCurrentMasterPage().className = this.getCurrentMasterPage().className + " swipeview-active", Jux.isIPad ? this.currentMasterPage === 0 ? (this.masterPages[2].style.webkitTransform = "translate3d(" + (this.page * 100 - 100) + "%, 0, 0)", this.masterPages[0].style.webkitTransform = "translate3d(" + this.page * 100 + "%, 0, 0)", this.masterPages[1].style.webkitTransform = "translate3d(" + (this.page * 100 + 100) + "%, 0, 0)") : this.currentMasterPage === 1 ? (this.masterPages[0].style.webkitTransform = "translate3d(" + (this.page * 100 - 100) + "%, 0, 0)", this.masterPages[1].style.webkitTransform = "translate3d(" + this.page * 100 + "%, 0, 0)", this.masterPages[2].style.webkitTransform = "translate3d(" + (this.page * 100 + 100) + "%, 0, 0)") : (this.masterPages[1].style.webkitTransform = "translate3d(" + (this.page * 100 - 100) + "%, 0, 0)", this.masterPages[2].style.webkitTransform = "translate3d(" + this.page * 100 + "%, 0, 0)", this.masterPages[0].style.webkitTransform = "translate3d(" + (this.page * 100 + 100) + "%, 0, 0)") : this.currentMasterPage === 0 ? (this.masterPages[2].style.left = this.page * 100 - 100 + "%", this.masterPages[0].style.left = this.page * 100 + "%", this.masterPages[1].style.left = this.page * 100 + 100 + "%") : this.currentMasterPage === 1 ? (this.masterPages[0].style.left = this.page * 100 - 100 + "%", this.masterPages[1].style.left = this.page * 100 + "%", this.masterPages[2].style.left = this.page * 100 + 100 + "%") : (this.masterPages[1].style.left = this.page * 100 - 100 + "%", this.masterPages[2].style.left = this.page * 100 + "%", this.masterPages[0].style.left = this.page * 100 + 100 + "%"), this.__flip()
    },
    goToMasterPage: function (e) {
      var t = parseInt(this.getCurrentMasterPage().style.left, 10),
        n = parseInt(this.masterPages[e].style.left, 10);
      n > t ? this.next() : n < t && this.prev()
    },
    getCurrentMasterPage: function () {
      return this.masterPages[this.currentMasterPage]
    },
    disable: function () {
      this.enabled = !1
    },
    enable: function () {
      this.enabled = !0
    },
    next: function () {
      this.directionX = 1, this.x -= 1, this.__checkPosition()
    },
    prev: function () {
      this.directionX = -1, this.x += 1, this.__checkPosition()
    },
    handleEvent: function (s) {
      if (!this.enabled) return;
      switch (s.type) {
      case t:
        this.__start(s);
        break;
      case n:
        this.__move(s);
        break;
      case i:
      case r:
        this.__end(s);
        break;
      case e:
        this.__resize()
      }
    },
    __pos: function (e) {
      this.x = e, Jux.isTouch ? (this.slider.style.webkitTransform = "translate3d(" + e + "px,0,0)", this.slider.style.mozTransform = "translate(" + e + "px)", this.slider.style.transform = "translate3d(" + e + "px,0,0)") : this.$slider.css("left", e + "px")
    },
    __resize: function () {
      this.refreshSize(), this.slider.style.webkitTransitionDuration = "0", this.__pos(-this.page * this.pageWidth)
    },
    __start: function (e) {
      if (this.initiated) return;
      var t = Jux.isTouch ? e.originalEvent.touches[0] : e;
      this.initiated = !0, this.moved = !1, this.thresholdExceeded = !1, this.startX = t.pageX, this.startY = t.pageY, this.pointX = t.pageX, this.pointY = t.pageY, this.stepsX = 0, this.stepsY = 0, this.directionX = 0, this.directionLocked = !1, this.slider.style.webkitTransitionDuration = "0ms", this.__event("touchstart")
    },
    __move: function (e) {
      if (!this.initiated) return;
      var t = Jux.isTouch ? e.originalEvent.touches[0] : e,
        n = t.pageX - this.pointX,
        r = t.pageY - this.pointY,
        i = this.x + n,
        s = Math.abs(t.pageX - this.startX);
      this.pointX = t.pageX, this.pointY = t.pageY, this.directionX = n < 0 ? 1 : n > 0 ? -1 : 0, this.stepsX += Math.abs(n), this.stepsY += Math.abs(r);
      if (this.stepsX < 5 && this.stepsY < 5) return;
      if (!this.directionLocked && this.stepsY > this.stepsX) {
        this.initiated = !1;
        return
      }
      this.moved || (this.moved = !0, this.__startFlip(this.directionX)), e.preventDefault(), this.directionLocked = !0, !this.thresholdExceeded && s >= this.snapThreshold ? (this.thresholdExceeded = !0, this.__event("moveout")) : this.thresholdExceeded && s < this.snapThreshold && (this.thresholdExceeded = !1, this.__event("movein")), this.__pos(i)
    },
    __end: function (e) {
      if (!this.initiated) return;
      var t = Jux.isTouch ? e.originalEvent.changedTouches[0] : e;
      this.initiated = !1;
      if (!this.moved) return;
      if (Math.abs(t.pageX - this.startX) < this.snapThreshold || !this.__beforeFlip(this.directionX)) {
        this.slider.style.webkitTransitionDuration = "0ms", this.__pos(-this.page * this.pageWidth);
        return
      }
      this.__checkPosition()
    },
    __checkPosition: function () {
      var e, t, n;
      this.lastPage = this.page, this.getCurrentMasterPage().className = this.getCurrentMasterPage().className.replace(/(^|\s)swipeview-active(\s|$)/, ""), this.directionX < 0 ? (this.page = -Math.ceil(this.x / this.pageWidth), this.previousMasterPage = this.page - Math.floor(this.page / 3) * 3, this.currentMasterPage = this.page + 1 - Math.floor((this.page + 1) / 3) * 3, e = this.currentMasterPage - 1, e = e < 0 ? 2 : e, Jux.isIPad ? this.masterPages[e].style.webkitTransform = "translate3d(" + (this.page * 100 - 100) + "%, 0, 0)" : this.masterPages[e].style.left = this.page * 100 - 100 + "%", t = this.page - 1) : (this.page = -Math.floor(this.x / this.pageWidth), this.previousMasterPage = this.page - Math.floor(this.page / 3) * 3, this.currentMasterPage = this.page + 1 - Math.floor((this.page + 1) / 3) * 3, e = this.currentMasterPage + 1, e = e > 2 ? 0 : e, Jux.isIPad ? this.masterPages[e].style.webkitTransform = "translate3d(" + (this.page * 100 + 100) + "%, 0, 0)" : this.masterPages[e].style.left = this.page * 100 + 100 + "%", t = this.page + 1), n = this.getCurrentMasterPage().className, /(^|\s)swipeview-active(\s|$)/.test(n) || (this.getCurrentMasterPage().className = n ? n + " swipeview-active" : "swipeview-active"), n = this.masterPages[e].className, /(^|\s)swipeview-loading(\s|$)/.test(n) || (this.masterPages[e].className = n ? n + " swipeview-loading" : "swipeview-loading"), Jux.isTouch && (this.slider.style.webkitTransitionDuration = "300ms"), newX = -this.page * this.pageWidth, this.x == newX ? this.__flip() : (this.__pos(newX), this.__flip())
    },
    __flip: function () {
      var e = this.page - this.lastPage,
        t;
      e >= 0 ? this.currentMasterPage === 0 ? t = 1 : this.currentMasterPage === 1 ? t = 2 : t = 0 : this.currentMasterPage === 0 ? t = 2 : this.currentMasterPage === 1 ? t = 0 : t = 1, this.upcomingMasterPage = t, this.__event("flip", e);
      for (var n = 0; n < 3; n++) this.masterPages[n].className = this.masterPages[n].className.replace(/(^|\s)swipeview-loading(\s|$)/, "")
    },
    __event: function (e) {
      var t = jQuery.Event("swipeview-" + e);
      this.$wrapper.trigger(t, Array.prototype.slice.call(arguments, 1))
    }
  }, s
}(), $.widget("jux.pulley", {
  options: {
    expandedCls: "expanded",
    expandableCls: "scrollable",
    ignoreChildWithClass: ["galleryInfoExpander", "cornerButton"],
    $targetEl: null,
    $overflowingElements: null,
    includeParentsPaddingTop: !1,
    includeParentsPaddingBottom: !1,
    maxHeightLimiter: 0
  },
  pluginClassPrefix: "ui-pulley",
  calculatedPercentsOfWindowHeight: {},
  _create: function (e) {
    this._super(), this.$window = $(window), this.$el = this.element, this.options.$targetEl = this.$targetEl = this.options.$targetEl || this.$el, this.$targetEl.addClass(this.pluginClassPrefix), this._onWindowResizeDelegate = _.debounce($.proxy(this._onWindowResize, this), 100), this.$window.on("resize", this._onWindowResizeDelegate), this._setupHover(), this.calculateNormalHeight()
  },
  _onWindowResize: function () {
    this.calculatedPercentsOfWindowHeight = {}
  },
  _addClass: function (e) {
    this.$targetEl.addClass(e)
  },
  _removeClass: function (e) {
    this.$targetEl.removeClass(e)
  },
  _setupHover: function () {
    this.$el.hover($.proxy(this._onMouseOver, this), $.proxy(this._onMouseOut, this))
  },
  _getPercentageOfWindowHeight: function (e) {
    var t = e.toString();
    return this.calculatedPercentsOfWindowHeight[t] ? this.calculatedPercentsOfWindowHeight[t] : this.calculatedPercentsOfWindowHeight[t] = $(window).height() * (e / 100)
  },
  _onMouseOver: function () {
    this.afterFirstMouseOver || (this._setStartingHeight(), this.afterFirstMouseOver = !0);
    if (this.isExpandable && this.startingHeight) {
      var e = this._calculateChildHeight(),
        t = this._getPercentageOfWindowHeight(100),
        n = this.$targetEl.height();
      e > t && (e = t), e < n && (e = n), e > this._getMaxHeight() && (e = this._getMaxHeight()), this.$targetEl.css("height", e), this._addClass(this.options.expandedCls), this.isExpanded = !0
    }
  },
  _getCurrentTopPosition: function () {
    return this.$targetEl.position().top
  },
  _getMaxHeight: function () {
    var e = this._getPercentageOfWindowHeight(100),
      t = this._getCurrentTopPosition();
    return e - t - this.options.maxHeightLimiter
  },
  setHeightShortening: function (e) {
    this.options.maxHeightLimiter = e
  },
  _onMouseOut: function () {
    this.isExpandable && this.startingHeight && (this.afterScrollResetDelegate = this._afterScrollResetDelegate || $.proxy(this._afterScrollReset, this), this.$targetEl.scrollTop() >= 10 ? this.$targetEl.animate({
      scrollTop: "0px"
    }, 500, "easeInOutCirc", this.afterScrollResetDelegate) : this.afterScrollResetDelegate())
  },
  _afterScrollReset: function () {
    this.$targetEl.css("height", this.startingHeight), this._removeClass(this.options.expandedCls), this.isExpanded = !1
  },
  removeHeight: function () {
    this.afterFirstMouseOver = !1, this.isExpandable = !1, this.startingHeight = null, this.$targetEl.css("height", "")
  },
  calculateNormalHeight: function () {
    this._setStartingHeight(), this.recalculatePulley()
  },
  _setStartingHeight: function () {
    var e = this.$targetEl.css("height"),
      t;
    e.indexOf("%") !== -1 ? t = this._getPercentageOfWindowHeight(parseInt(e.replace(/%/, ""), 10)) : t = this.$targetEl.height(), this.startingHeight = t
  },
  recalculatePulley: function () {
    if (this.isExpanded) return;
    this._determineIfExpandable() ? (this.isExpandable = !0, this._addClass(this.options.expandableCls)) : (this.isExpandable = !1, this._removeClass(this.options.expandableCls))
  },
  _determineIfExpandable: function () {
    var e = this._getElementHeight(),
      t = this._calculateChildHeight(),
      n = this._getPercentageOfWindowHeight(100);
    return t > e ? !0 : t > n ? !0 : !1
  },
  _calculateChildHeight: function () {
    var e = 0,
      t = this._getChildrenToCalculateHeightWith(),
      n = this._getParentPadding(t),
      r = this;
    return t.each(function () {
      var t = $(this),
        n = r._elementHasIgnoredClass(t);
      n || (e += t.outerHeight(!0))
    }), e += n, e
  },
  _getParentPadding: function (e) {
    var t = 0;
    return e.length && (this.options.includeParentsPaddingTop && (t += parseInt($(e[0]).parent().css("padding-top").replace(/px/, ""), 10)), this.options.includeParentsPaddingBottom && (t += parseInt($(e[0]).parent().css("padding-bottom").replace(/px/, ""), 10))), t
  },
  _elementHasIgnoredClass: function (e) {
    return !!_.filter(this.options.ignoreChildWithClass, function (t) {
      return e.hasClass(t)
    }).length
  },
  _getChildrenToCalculateHeightWith: function () {
    return this.options.$overflowingElements || this.$el.children()
  },
  _getElementHeight: function () {
    return this.$el.height()
  }
}), app.components.ui.layout.LegacyBoxLayout = Class.extend(ui.layout.Layout, {
  abstractClass: !0,
  totalFlex: 1,
  onLayout: function (e, t) {
    this._super(arguments), this.calculateTotalFlex(e)
  },
  scaleChild: function (e, t, n, r) {
    if (t !== "width" && t !== "height") return console.warn("Invalid dimension specified. Child '", e, "' cannot be measured."), null;
    var i = r[t]();
    return n && (i -= n), Math.floor(e.flex / this.totalFlex * i)
  },
  calculateTotalFlex: function (e) {
    this.totalFlex = 0;
    for (var t = 0, n = e.length; t < n; t++) {
      var r = e[t] instanceof ui.Container ? e[t].getLayout() : null;
      r instanceof app.components.ui.layout.LegacyAbsoluteLayout || (this.totalFlex += e[t].flex || 0)
    }
    this.totalFlex === 0 && (this.totalFlex = 1)
  }
}), app.components.ui.layout.CenterFitLayout = Jux.extend(ui.layout.Layout, {
  imagePercentHeight: "50%",
  onLayout: function (e, t) {
    this._super(arguments);
    var n = t.children().detach(),
      r = "100%",
      i = t.height(),
      s = parseInt(this.imagePercentHeight, 10) / 100,
      o = s * i,
      u = (1 - s) * i;
    n.appendTo(t), this.renderComponent(e[0], t, {
      position: 0
    }), this.sizeComponent(e[0], r, o), this.renderComponent(e[1], t, {
      position: 1
    }), e[1].getEl().css("min-height", u + "px")
  }
}), ui.Container.registerLayout("centerfitlayout", app.components.ui.layout.CenterFitLayout), app.components.ui.layout.CenterLayout = Class.extend(ui.layout.Layout, {
  centerX: !0,
  centerY: !0,
  useTable: !0,
  useExactPixelWidth: !1,
  initLayout: function () {
    this._super(arguments), this.lastWrapperElSize = {}
  },
  onLayout: function (e, t) {
    this._super(arguments);
    var n = e.length;
    if (e.length > 0) {
      var r = e[0];
      for (var i = 1; i < n; i++) e[i].detach();
      this.useTable && t.css({
        display: "table",
        "table-layout": "fixed",
        position: "relative"
      }), this.$wrapperEl ? this.sizeWrapperEl(t) : (this.$wrapperEl = this.createWrapperEl(), this.$wrapperEl.attr("data-layoutelem", "CenterLayout-Wrapper"), this.sizeWrapperEl(t), this.$wrapperEl.appendTo(t)), r !== this.lastRenderedComponent && (this.renderComponent(r, this.$wrapperEl), this.lastRenderedComponent = r)
    }
  },
  createWrapperEl: function (e) {
    var t = "";
    return this.centerX && (t += "text-align: center;"), this.centerY && (t += "vertical-align: middle;"), jQuery('<div style="display: table-cell; ' + t + '" />')
  },
  sizeWrapperEl: function (e) {
    var t = this.lastWrapperElSize,
      n = e.children();
    n.detach();
    var r = this.useExactPixelWidth ? e.width() - Jux.getScrollbarWidth() + "px" : "100%",
      i = e.height() + "px";
    n.appendTo(e);
    if (r !== t.width || i !== t.height) this.$wrapperEl.css({
      width: r,
      height: i
    }), t.width = r, t.height = i
  },
  onDestroy: function () {
    this.$wrapperEl && this.$wrapperEl.remove(), this._super(arguments)
  }
}), ui.Container.registerLayout("center", app.components.ui.layout.CenterLayout), app.components.ui.layout.FrameLayout = Jux.extend(ui.layout.Layout, {
  firstRender: !0,
  onLayout: function (e, t) {
    this._super(arguments), this.renderComponent(e[0], t, {
      position: 0
    }), e.length === 2 && this.renderComponent(e[1], t, {
      position: 1
    }), this.setMaximums(e, t)
  },
  setMaximums: function (e, t) {
    var n = Jux.Util.getWindowObject(),
      r = n.width(),
      i = n.height();
    e[0].margins && (r -= (e[0].margins.left || 0) + (e[0].margins.right || 0), i -= (e[0].margins.top || 0) + (e[0].margins.bottom || 0));
    if (e[0] instanceof app.components.FillmorableImage) {
      var s = e[0].getImage();
      if (!s || !s.length) return !1;
      s.css({
        "max-width": r,
        "max-height": i
      });
      var o = function () {
        t.css({
          width: s.width()
        });
        var n = e[0].getEl();
        n && n.length && (n.css({
          width: s.width(),
          height: s.height()
        }), e.length === 2 && e[1] instanceof ui.Container && (e[1].width && e[1].width.match("%") && e[1].getEl().css({
          width: s.width() * (parseInt(e[1].width, 10) / 100)
        }), e[1].height && e[1].height.match("%") && e[1].getEl().css({
          height: s.height() * (parseInt(e[1].height, 10) / 100)
        }), e[1].doLayout()))
      };
      this.loadHandlerBound || (s.bind("load", o.createDelegate(this)), this.loadHandlerBound = !0), o()
    } else e[0].getEl().css({
      "max-width": r,
      "max-height": i
    })
  }
}), ui.Container.registerLayout("frame", app.components.ui.layout.FrameLayout), app.components.ui.layout.LegacyAbsoluteLayout = Class.extend(ui.layout.Layout, {
  onLayout: function (e, t) {
    this._super(arguments);
    var n, r;
    for (n = 0, r = e.length; n < r; n++) e[n].detach();
    t.css("position", this.position || "absolute"), typeof this.left != "undefined" && t.css("left", typeof this.left == "number" ? this.left + "px" : this.left), typeof this.right != "undefined" && t.css("right", typeof this.right == "number" ? this.right + "px" : this.right), typeof this.top != "undefined" && t.css("top", typeof this.top == "number" ? this.top + "px" : this.top), typeof this.bottom != "undefined" && t.css("bottom", typeof this.bottom == "number" ? this.bottom + "px" : this.bottom), this.zIndex && t.css("z-index", this.zIndex);
    for (n = 0, r = e.length; n < r; n++) e[n].render(t), e[n].width && e[n].width.match("%") && e[n].getEl().css({
      width: t.width() * (parseInt(e[n].width, 10) / 100)
    }), e[n].height && e[n].height.match("%") && e[n].getEl().css({
      height: t.height() * (parseInt(e[n].height, 10) / 100)
    }), e[n].doLayout()
  },
  onResize: function (e, t) {
    for (var n = 0, r = e.length; n < r; n++) e[n].width && e[n].width.match("%") && e[n].getEl().css({
      width: t.width() * (parseInt(e[n].width, 10) / 100)
    }), e[n].height && e[n].height.match("%") && e[n].getEl().css({
      height: t.height() * (parseInt(e[n].height, 10) / 100)
    }), typeof e[n].onResize != "undefined" && e[n].onResize()
  }
}), ui.Container.registerLayout("legacyabsolute", app.components.ui.layout.LegacyAbsoluteLayout), app.components.ui.layout.LegacyHBoxLayout = Class.extend(app.components.ui.layout.LegacyBoxLayout, {
  align: "stretch",
  vAlign: "bottom",
  firstLayoutHasRun: !1,
  onLayout: function (e, t) {
    this._super(arguments);
    if (this.firstLayoutHasRun) this.resizeBoxes(e, t);
    else {
      var n, r;
      this.definedWidth = 0;
      var i;
      for (n = 0, r = e.length; n < r; n++) i = e[n].getConfiguredWidth(), i && (this.definedWidth += i);
      var s = t.css("white-space");
      this.align === "stretch" ? t.css({
        "white-space": "nowrap",
        display: "table"
      }) : t.css("white-space", "nowrap");
      var o, u;
      for (n = 0, r = e.length; n < r; n++) {
        var a = e[n] instanceof ui.Container ? e[n].getLayout() : null;
        a instanceof app.components.ui.layout.LegacyAbsoluteLayout ? e[n].render(t) : (u = jQuery('<div data-layoutelem="LegacyHBoxChild" style="display: ' + (this.align === "start" ? "inline-block" : "table-cell; vertical-align: " + (e[n].vAlign ? e[n].vAlign : this.vAlign)) + "; position: relative; white-space: " + s + ';" />').appendTo(t), e[n].flex ? (o = this.scaleChild(e[n], "width", this.definedWidth, t), u.addClass(e[n].cls).css({
          width: o,
          height: t.height()
        })) : u.addClass(e[n].cls).css({
          width: e[n].getConfiguredWidth(),
          height: e[n].getConfiguredHeight() || t.height()
        }), e[n].render(u))
      }
      this.firstLayoutHasRun = !0
    }
  },
  resizeBoxes: function (e, t) {
    var n;
    for (var r = 0, i = e.length; r < i; r++) {
      var s = e[r] instanceof ui.Container ? e[r].getLayout() : null;
      s instanceof app.components.ui.layout.LegacyAbsoluteLayout || (n = this.scaleChild(e[r], "width", this.definedWidth, t), e[r].flex && jQuery(e[r].getEl()).parent().css({
        width: n,
        height: "100%"
      }))
    }
  }
}), ui.Container.registerLayout("legacyhbox", app.components.ui.layout.LegacyHBoxLayout), app.components.ui.layout.LegacyVBoxLayout = Class.extend(app.components.ui.layout.LegacyBoxLayout, {
  align: "stretch",
  firstLayoutHasRun: !1,
  onLayout: function (e, t) {
    this._super(arguments);
    if (this.firstLayoutHasRun) this.resizeBoxes(e, t);
    else {
      var n, r;
      this.definedHeight = 0;
      var i;
      for (n = 0, r = e.length; n < r; n++) i = e[n].getConfiguredHeight(), i && (this.definedHeight += i);
      this.align === "stretch" && t.css("display", "table");
      var s, o;
      for (n = 0, r = e.length; n < r; n++) {
        var u = e[n] instanceof ui.Container ? e[n].getLayout() : null;
        u instanceof app.components.ui.layout.LegacyAbsoluteLayout ? e[n].render(t) : (o = jQuery('<div data-layoutelem="LegacyVBoxChild" style="display: block; position: relative; clear: both;" />').appendTo(t), e[n].flex ? (s = this.scaleChild(e[n], "height", this.definedHeight, t), o.css({
          height: s,
          width: "100%"
        })) : o.css({
          width: e[n].getConfiguredWidth() || "100%",
          height: e[n].getConfiguredHeight()
        }), e[n].render(o))
      }
      this.firstLayoutHasRun = !0
    }
  },
  resizeBoxes: function (e, t) {
    var n;
    for (var r = 0, i = e.length; r < i; r++) {
      var s = e[r] instanceof ui.Container ? e[r].getLayout() : null;
      s instanceof app.components.ui.layout.LegacyAbsoluteLayout || (n = this.scaleChild(e[r], "height", this.definedHeight, t), jQuery(e[r].getEl()).parent().css({
        height: n,
        width: "100%"
      }))
    }
  }
}), ui.Container.registerLayout("legacyvbox", app.components.ui.layout.LegacyVBoxLayout), app.components.ui.layout.ScrollingFitLayout = Class.extend(ui.layout.Layout, {
  initLayout: function () {
    this._super(arguments), this.containerEls = []
  },
  onLayout: function (e, t) {
    this._super(arguments), this.fixContainerEls(e, t);
    var n = this.containerEls;
    for (var r = 0, i = e.length; r < i; r++) this.renderComponent(e[r], n[r])
  },
  fixContainerEls: function (e, t) {
    var n = this.containerEls,
      r = e.length,
      i = t.width(),
      s = t.height(),
      o, u, a;
    o = n.length;
    while (--o >= r) a = n.pop(), a.remove();
    for (o = 0, u = n.length; o < u; o++) n[o].css({
      width: i + "px",
      height: s + "px"
    });
    for (o = n.length; o < r; o++) {
      var f = this.createContainerEl({
        position: "relative",
        width: i + "px",
        height: s + "px"
      });
      t.append(f), n.push(f)
    }
  },
  createContainerEl: function (e) {
    return e = Jux.Css.hashToString(e), jQuery('<div style="' + e + '" data-layoutelem="ScrollingFitLayoutContainerEl" />')
  },
  onDestroy: function () {
    var e = this.containerEls;
    for (var t = 0, n = e.length; t < n; t++) e[t].remove();
    e.length = 0, this._super(arguments)
  }
}), ui.Container.registerLayout("scrollingfit", app.components.ui.layout.ScrollingFitLayout), app.controllers.Controller = Jux.extend(Jux.util.Observable, {
  abstractClass: !0,
  destroyed: !1,
  constructor: function (e) {
    Jux.apply(this, e), this._super(arguments), this.addEvents("destroy"), this.initialize()
  },
  initialize: Jux.emptyFn,
  destroy: function () {
    this.destroyed || (this.onDestroy(), this.destroyed = !0, this.fireEvent("destroy", this), this.purgeListeners())
  },
  onDestroy: Jux.emptyFn
}), app.routers.Gallery = Class.extend(Backbone.Router, {
  initialize: function (e) {
    if (!e.appManager) throw new Error("'appManager' reference not provided to router");
    this.appManager = e.appManager, this.route("*unknownRoute", "unknownRoute"), this.route(/^([^\/]*)\/?(\?.*)?(#.*)?$/, "index"), this.route(/^(?:([^\/]+)\/)?(\d+)\/?(\?.*)?(#.*)?$/, "show")
  },
  index: function (e) {
    this.appManager.showGalleryView()
  },
  show: function (e, t) {
    this.appManager.showQuarkView(t, {
      editMode: Jux.Hash.hasKey("e"),
      newQuark: Jux.Hash.hasKey("new_quark"),
      showComments: Jux.Hash.hasKey("comment"),
      showNav: !0
    }), Jux.Hash.remove("e"), Jux.Hash.remove("new_quark"), Jux.Hash.remove("comment")
  },
  unknownRoute: function (e) {
    var t = window.location.hash.match(/^#\/(\d+)$/);
    t ? this.navigate(t[1], {
      replace: !0,
      trigger: !0
    }) : (Jux.logError("Unknown route: ", e), this.navigate("", {
      replace: !0,
      trigger: !0
    }))
  }
}), app.helpers.OmniAuthorizer = new(Class({
  getAuthUrl: function (e) {
    return Jux.Hosts.origin + "/users/auth/" + e
  },
  authorize: function (e, t) {
    t = t || {};
    var n = e + "OauthCallback",
      r = t.scope || window,
      i = t.user,
      s = this.getAuthUrl(e) + "?js_callback=" + n;
    window[n] = function (e, s) {
      window[n] = null;
      if (e === "success") i && (i.set(s), i.commit()), t.success && t.success.call(r);
      else {
        var o = s.errors;
        o && this.showErrorDialog(o), t.error && t.error.call(r, s)
      }
    }.createDelegate(this);
    var o = t.width || 600,
      u = t.height || 350;
    window.open(s, "omni_authorizer", "width=" + o + ",height=" + u), i && i.save()
  },
  deauthorize: function (e, t) {
    t = t || {};
    var n = t.user;
    n && n.save(), jQuery.ajax({
      url: "/auth/" + e,
      type: "DELETE",
      dataType: "json",
      success: function (e) {
        n && (n.set(e), n.commit()), t.success && t.success.call(this)
      },
      error: t.error,
      context: t.scope || window
    })
  },
  showErrorDialog: function (e) {
    var t = [];
    _.each(e, function (e, n) {
      _.each(e, function (e) {
        t.push(n + " " + e)
      })
    });
    var n = new ui.Dialog({
      cls: "palette alertBox omniauthAlert",
      maxWidth: 550,
      modal: !0,
      autoOpen: !0,
      title: "",
      html: '<div class="alertText"><div class="alertText-heading">' + t.join(" ") + "</div></div>",
      closeButton: new ui.toolButtons.CloseButton({
        size: "tiny",
        handler: function () {
          n.close()
        },
        scope: this
      }),
      buttons: [{
        text: "Ok",
        cls: "alertAction",
        handler: function () {
          n.close()
        }
      }]
    })
  }
})), app.helpers.PictureSize = new(Class({
  getPictureUrl: function (e, t, n) {
    n = n ? _.clone(n) : [], n = n.concat(e.getMagicklyEffectsOptions());
    var r = e.get(t).get("url");
    if (!r.match(Jux.Magickly.GIF_REGEX)) {
      var i = Jux.Util.getWindowObject(),
        s = i.width(),
        o = i.height();
      if (Jux.isTouch) {
        var u = Math.max(s, o);
        window.devicePixelRatio > 1 && (u *= window.devicePixelRatio, n.push({
          name: "quality",
          value: 80
        })), n.push({
          name: "thumb",
          value: u + "x" + u + ">"
        })
      } else {
        var a = this.getViewportWidthUpperBound(s),
          f = this.getViewportHeightUpperBound(a, o),
          l = a + "x" + f;
        e.get("picture_size") === "frame" ? n.push({
          name: "resize",
          value: l + ">"
        }) : e.has("mirror_in") && e.has("mirror_out") && (e.get("mirror_in") || e.get("mirror_out")) ? n.push({
          name: "fit_width",
          value: a.toString()
        }) : n.push({
          name: "big_background",
          value: l
        }), n.push({
          name: "quality",
          value: Jux.Magickly.QUARK_IMAGE_QUALITY
        }), n.push({
          name: "interlace",
          value: !0
        })
      }
    }
    var c = Jux.util.uri.makeAbsolute(r, Jux.util.uri.getWindowOrigin()),
      h = Jux.Magickly.convertImageUrl(c, n);
    return h
  },
  getPictureFillmoreOptions: function (e) {
    var t = Jux.isHandheld,
      n = e.getFocusPoint(t);
    return {
      focusX: n.x,
      focusY: n.y
    }
  },
  getUpperBound: function (e, t, n) {
    if (e == null) return n;
    var r = null;
    for (var i = 0, s = t.length; i < s; i++) {
      r = t[i];
      if (r >= e) return r
    }
    return r
  },
  getViewportHeightUpperBound: function (e, t) {
    var n = Jux.Magickly.VIEWPORT_HEIGHT_UPPER_BOUNDS_BY_WIDTH[e];
    return this.getUpperBound(t, n, n[0])
  },
  getViewportWidthUpperBound: function (e) {
    return this.getUpperBound(e, Jux.Magickly.VIEWPORT_WIDTH_UPPER_BOUNDS, Jux.Magickly.BASE_VIEWPORT_WIDTH)
  }
})), app.views.Mediator = Class.extend(Jux.util.Observable, {
  emit: function () {
    this.fireEvent.apply(this, arguments)
  }
}), app.views.Mediator.Navigation = function () {
  var e = Class.extend(app.views.Mediator, {});
  return new e({})
}(), app.views.Mediator.Quark = function () {
  var e = Class.extend(app.views.Mediator, {});
  return new e({})
}(), app.views.AppContainer = Jux.extend(Jux.util.Observable, {
  constructor: function (e) {
    Jux.apply(this, e);
    if (!this.appState) throw new Error("'appState' config required");
    if (typeof this.styleTpl != "function") throw new Error("'styleTpl' config required");
    if (!this.$styleEl || this.$styleEl.length === 0) throw new Error("'$styleEl' config required");
    this._super(arguments), this.$html = jQuery("html"), Jux.isIPhone && $(function () {
      window.scrollTo(0, 0)
    }), this.loadFnDelegate = this.loadFn.createDelegate(this), Jux.Util.getWindowObject().bind("load", this.loadFnDelegate), this.loadTimeout = setTimeout(this.loadFnDelegate, 1e4), this.setCurrentGallery(this.appState.get("currentGallery")), this.appState.on("change:currentGallery", this.onGalleryChange, this)
  },
  loadFn: function () {
    Jux.Util.getWindowObject().unbind("load", this.loadFnDelegate), clearTimeout(this.loadTimeout), jQuery("#startup-screen-inner").delay(200).fadeOut(400, "easeInExpo"), jQuery("#startup-screen").delay(600).fadeOut(300, "easeInExpo"), this.$html.trigger("startupScreenHidden")
  },
  setCurrentGallery: function (e) {
    var t = this.updateStyleEl;
    e.on({
      "change:theme": this.updateAllStyles,
      "change:theme_settings_by_theme": t,
      "change:show_master_gallery_title": t,
      "change:show_owner_name": t,
      "change:show_quark_owner_names": t,
      "change:show_dates": t,
      "change:show_view_counts": t,
      scope: this
    })
  },
  onGalleryChange: function (e, t, n) {
    var r = this.updateStyleEl;
    n.un({
      "change:theme": this.updateAllStyles,
      "change:theme_settings_by_theme": r,
      "change:show_master_gallery_title": r,
      "change:show_owner_name": r,
      "change:show_quark_owner_names": r,
      "change:show_dates": r,
      "change:show_view_counts": r,
      scope: this
    }), this.setCurrentGallery(t)
  },
  updateAllStyles: function () {
    var e = app.models.ThemeSettingsByTheme.getAttributes(),
      t = this.$html;
    for (var n in e) t.removeClass("theme-" + n);
    var r = this.appState.get("currentGallery").get("theme");
    t.addClass("theme-" + r), this.updateStyleEl()
  },
  updateStyleEl: function () {
    var e = this.appState.get("currentGallery"),
      t = e.getData();
    _.defaults(t, {
      show_quark_owner_names: !0,
      show_dates: !0,
      show_view_counts: !0
    });
    var n = e.get("selected_theme_settings");
    if (n) {
      var r = n.getData(),
        i = r.title_font.color,
        s = app.Defaults.galleryTitleColorToBackgroundMap[e.get("theme")],
        o = s[i] || s.fallback,
        u = {
          gallery: t,
          galleryInfoBackground: o,
          hideDotDivider: !t.show_view_counts && !t.show_dates,
          selected_theme_settings: r
        }, a = this.styleTpl(u);
      Jux.Css.updateStyleEl(this.$styleEl, a)
    }
  }
}), app.views.QuarkPreview = Backbone.View.extend({
  preventDefaultClick: !0,
  initialize: function (e) {
    if (!e.gallery) throw new Error("'gallery' config required");
    if (!("currentUser" in e)) throw new Error("QuarkPreview: currentUser config required");
    if (!("inGalleryHeading" in e)) throw new Error("QuarkPreview: inGalleryHeading config required");
    var t = e.gallery;
    this.gallery = t;
    var n = e.currentUser;
    this.currentUser = n, this.xsomeSize = e.xsomeSize, this.xsomePos = parseInt(this.$el.attr("data-xsome-pos"), 10), this.inGalleryHeading = e.inGalleryHeading, this.xsomeArrangement = e.xsomeArrangement, _.isBoolean(e.preventDefaultClick) && (this.preventDefaultClick = e.preventDefaultClick);
    if (_.isNaN(this.xsomePos)) throw new Error("invalid data-xsome-pos");
    this.bindEventHandlers(), this.model.bind("afterSave", _.debounce(this.onQuarkSave, 500), this), this.model.bind("change:sort_time", this.updateDate, this);
    var r = this.model.get("owner");
    r.bind("change:displayname", this.onOwnerDisplaynameChange, this);
    var i = this.$el.find(".quarkPreviewActions");
    e.hideActions && (i.find("a.edit-quark").hide(), i.find("a.delete-quark").hide()), n && (this.quarkPreviewMenu = new app.views.menu.QuarkPreviewMenu({
      renderTo: i,
      model: this.model,
      currentUser: n,
      gallery: t,
      listeners: {
        overlaysclose: this.onQuarkPreviewMenuOveraysClose,
        unrepost: this.onUnrepost,
        scope: this
      }
    }))
  },
  bindEventHandlers: function () {
    this.$el.bind({
      mousemove: this.onMouseOver.createDelegate(this),
      mouseenter: this.onMouseOver.createDelegate(this),
      mouseleave: this.onMouseOut.createDelegate(this)
    }), this.preventDefaultClick && (Jux.isTouch ? (this.fastbutton = new app.components.FastButton(this.el, this.onQuarkClick.createDelegate(this)), this.$("a").bind("click", function (e) {
      e.preventDefault()
    })) : this.delegateEvents({
      "click .quarkText": "onQuarkClick",
      "click a.quark-link": "onQuarkClick",
      "click a.edit-quark": "onQuarkClick",
      "click a.delete-quark": "deleteQuark"
    }))
  },
  render: function () {
    this.updateImage(), this.updateDate();
    var e = this.model.getPreviewQuark();
    if (e instanceof app.models.Article) {
      var t = this.$(".quarkText-clamp");
      setTimeout(function () {
        Jux.util.Html.clamp(t)
      }, 0)
    }
  },
  hide: function () {
    this.$el.css("visibility", "hidden")
  },
  onMouseOver: function () {
    this.$el.addClass("mouseover")
  },
  onMouseOut: function () {
    (!this.quarkPreviewMenu || !this.quarkPreviewMenu.hasOverlayOpen()) && this.$el.removeClass("mouseover")
  },
  onQuarkPreviewMenuOveraysClose: function () {
    this.$el.removeClass("mouseover")
  },
  onUnrepost: function () {
    this.currentUser && this.gallery.get("owner") === this.currentUser && this.hide()
  },
  onQuarkClick: function (e) {
    if ($(e.target).hasClass("author")) return;
    var t = jQuery(e.currentTarget);
    t.hasClass("edit-quark") ? this.trigger("edit", this, this.model) : (this.trigger("view", this, this.model), Jux.isTouch && this.$el.addClass("touched")), e.type === "click" && this.preventDefaultClick && e.preventDefault()
  },
  deleteQuark: function (e) {
    var t = this,
      n = new ui.Dialog({
        cls: "palette alertBox",
        modal: !0,
        autoOpen: !0,
        title: "",
        html: '<div class="alertText"><div class="alertText-heading">Are you double sure?</div></div>',
        closeButton: new ui.toolButtons.CloseButton({
          size: "tiny",
          handler: function () {
            n.close()
          },
          scope: this
        }),
        buttons: [{
          text: "Delete post!",
          cls: "alertAction",
          handler: function () {
            t.hide(), t.model.destroy(), n.close()
          }
        }, {
          text: "Cancel",
          cls: "alertAction",
          handler: function () {
            n.close()
          }
        }]
      });
    e.preventDefault()
  },
  onQuarkSave: function () {
    var e = this.model,
      t = {
        xsome_size: this.xsomeSize,
        xsome_pos: this.xsomePos,
        xsome_arrangement: this.xsomeArrangement,
        in_gallery_heading: this.inGalleryHeading,
        gallery_id: this.gallery.getId()
      };
    this.xsomeArrangement != null && (t.xsome_arrangement = this.xsomeArrangement);
    var n = e.url() + "/preview?" + jQuery.param(t);
    jQuery.get(n, function (e) {
      var t = this.$el.hasClass("enteredViewport"),
        n = $(e).addClass("lazyView fast");
      this.$el.add(n).css({
        opacity: 0
      }), setTimeout(function () {
        this.$el.replaceWith(n), t && n.addClass("enteredViewport"), this.$el = n, this.el = n.get(0), this.render(), this.bindEventHandlers(), setTimeout(function () {
          n.css({
            opacity: 1
          })
        }, 0)
      }.createDelegate(this), 1e3)
    }.createDelegate(this))
  },
  onOwnerDisplaynameChange: function (e, t) {
    this.$(".author").html(t)
  },
  updateDate: function () {
    var e = new Date(this.model.get("sort_time")),
      t = this.$(".date"),
      n = t.find("span.month"),
      r = t.find("span.day"),
      i = t.find("span.year");
    n.html(jQuery.datepicker.formatDate("M", e)), r.html(jQuery.datepicker.formatDate("dd", e)), i.html(e.getFullYear())
  },
  updateImage: function () {
    var e = this.model.getMagicklyPreviewPicture(),
      t = this.$(".image-container"),
      n = t.find("img"),
      r = {
        src: n.attr("src")
      };
    if (e) {
      var i = e.get("facial_center"),
        s = e.get("chosen_center");
      i ? (r.focusX = i.x, r.focusY = i.y) : s && (r.focusX = s.x, r.focusY = s.y)
    }
    t.fillmore(r), n.remove()
  }
}), app.views.MakeNewPanel = Backbone.View.extend({
  events: {
    'click [data-elem="createQuarkLink"]': "onMakeQuarkClick"
  },
  initialize: function (e) {
    if (!(e.appManager instanceof app.managers.AbstractGallery)) throw new Error("'appManager' config required");
    this.appManager = e.appManager
  },
  onMakeQuarkClick: function (e) {
    var t = jQuery(e.currentTarget).attr("href");
    return this.appManager.createQuark(t), !1
  }
}), app.views.galleryTakeover.GalleryTakeover = Jux.extend(ui.Container, {
  inUserGallery: !1,
  hasThumbstrip: Jux.isDesktop,
  currentQuark: null,
  galleryNeedsRefresh: !1,
  navBarsInitialVisibleTime: 4e3,
  navComponentIdleTimeout: 2e3,
  _navThumbstripIsVisible: !1,
  inQuarkView: !1,
  inGalleryView: !1,
  galleryViewed: !1,
  quarksViewed: !1,
  startupScreenHidden: !1,
  keepThumbstripUp: Jux.Util.getQueryString("thumbstrip_visible"),
  delayToHideGalleryStrip: 1e3,
  _galleryDockVisible: !1,
  _disableNavThumbstrip: !1,
  _disableGalleryDock: !1,
  navStripHeight: 84,
  lastStateViewed: null,
  dockHeight: 0,
  quarkDockVisible: !1,
  initComponent: function () {
    if (!this.currentGalleryView) throw new Error("'currentGalleryView' required");
    this._super(arguments), this.quarkViewportQuarksState = new app.models.GalleryQuarksState({
      gallery: this.currentGallery,
      atNewest: this.atNewest,
      atOldest: this.atOldest
    }), this.$window = Jux.Util.getWindowObject(), this.$html = jQuery("html").one({
      startupScreenHidden: this.onStartupScreenHidden.createDelegate(this)
    }), this.$body = jQuery("body"), Jux.isIPhone && this.$body.height(Jux.Util.getWindowObject().innerHeight() + 60), this.isFeedGallery = this.$html.hasClass("feedGallery");
    var e = this.currentGallery.get("owner");
    e.get("has_a_mono_gallery") ? this.isMonoGallery = !0 : this.isMonoGallery = !1, this.hideGalleryStripInGalleryView = this.isFeedGallery || !this.hasFullViewHeading, this.$galleryTakeoverInner = this.$el, this.onKeyEventDelegate = this.onKeyEvent.createDelegate(this), this.galleryViewed = $.cookie("galleryViewed"), this.quarksViewed = $.cookie("quarksViewed"), this.bindCurrentGalleryEvents(), this.setupGalleryTakeoverNavBar(), this.setupQuarkViewport(), this.hasThumbstrip && (this.$navStripContainer = $("<div class='navStripContainer'></div>"), this.quarkViewport && this.$navStripContainer.appendTo(this.quarkViewport.getEl()), this.setupNavThumbstrip(), this.setupGalleryDock()), this.appState.on("change:currentQuark", this.onQuarkNavigate, this), Jux.isTouch ? jQuery(document).bind({
      touchstart: this.onTouchStart.createDelegate(this),
      touchmove: this.onTouchMove.createDelegate(this),
      touchend: this.onTouchEnd.createDelegate(this)
    }) : this.setupQuarkArrowNav(), this.currentGalleryView.$scrollEl.bind("scrolledToTop", this.showGalleryNavbar.createDelegate(this)), this.onMouseMoveDelegate = _.throttle(this.onMouseMove.createDelegate(this), 250), this.onMouseLeaveDelegate = this.onMouseLeave.createDelegate(this), this.setupKeyboardAndMouseBindings(), this.applyCurrentGalleryQuarksBinding(), this.loadingSpinner = new app.components.CenteredSpinner
  },
  bindCurrentGalleryEvents: function () {
    if (!this.currentGallery) return;
    this.currentGallery.on("quarksFullyLoaded", this.onQuarksFullyLoaded, this)
  },
  onStartupScreenHidden: function () {
    this.startupScreenHidden = !0, this.onViewChange()
  },
  onQuarksFullyLoaded: function () {
    this.currentGalleryView && this.currentGalleryView.$el && this.currentGalleryView.$el.addClass("atOldest"), this.showGalleryDockAtBottomOfGallery()
  },
  onViewChange: function () {
    if (!this.startupScreenHidden) return;
    this.inQuarkView && this.lastStateViewed === "gallery" && this.onSwitchingFromGalleryToQuark(), this.inGalleryView && this.lastStateViewed === "quark" && this.onSwitchingFromQuarkToGallery(), this.lastStateViewed = this.inQuarkView ? "quark" : "gallery", this.inQuarkView && !this.quarksViewed && this.hasThumbstrip ? (this.quarksViewed = !0, $.cookie("quarksViewed", 1, {
      expires: 1,
      path: "/"
    }), this.showNavThumbstrip(), this.navThumbstripHideTask.delay(this.navBarsInitialVisibleTime)) : this.inGalleryView && this.galleryDock && !this.galleryViewed && (this.galleryViewed = !0, $.cookie("galleryViewed", 1, {
      expires: 1,
      path: "/"
    }))
  },
  onSwitchingFromGalleryToQuark: function () {
    this.hasGalleryDock && this.galleryDock.setDockOutOfView(), this.navThumbstrip && this.hideNavThumbstrip()
  },
  onSwitchingFromQuarkToGallery: function () {
    this.hasGalleryDock && (this.galleryDock.setDockAtPeekState(), this.currentGallery.isSubGallery() || this.galleryDock.showDockTask.delay(500)), this.navThumbstrip && this.hideNavThumbstrip(), this.hasQuarkDock && (this.quarkDock.removeCls("animate"), this.quarkDock.setDockOutOfView())
  },
  applyCurrentGalleryQuarksBinding: function () {
    this.currentGalleryQuarks.bind("change:sort_time", this.onSortTimeChange, this)
  },
  setupGalleryTakeoverNavBar: function () {
    var e = new app.views.navBar.GalleryTakeoverNavBar({
      el: this.$galleryTakeoverNavBar,
      gallery: this.currentGallery,
      currentGalleryQuarks: this.currentGalleryQuarks,
      appState: this.appState,
      initialVisibleTime: this.navBarsInitialVisibleTime,
      socialMenu: this.socialMenu,
      makeQuarkMenu: this.makeQuarkMenu,
      juxMenu: this.juxMenu
    });
    this.galleryTakeoverNavBar = e, this.currentUser && app.views.PaletteOpenButton && (this.paletteOpenButton = new app.views.PaletteOpenButton({
      renderTo: this.galleryTakeoverNavBar.$(".nav")
    }), this.updatePaletteOpenButton()), this.currentGallery.isSubGallery() && this.hasThumbstrip ? this.galleryTakeoverNavBar.hideGalleryTitle() : this.galleryTakeoverNavBar.showGalleryTitle(), e.render(), this.galleryTakeoverNavBarHideTask = new Jux.util.DelayedTask(function () {
      e.hide()
    })
  },
  updatePaletteOpenButton: function () {
    var e = this.paletteOpenButton;
    e && (this.currentGalleryView.palette ? (e.setPalette(this.currentGalleryView.palette), e.show()) : (e.setPalette(null), e.hide()))
  },
  showGalleryNavbar: function () {
    this.galleryTakeoverNavBar.show(), this.galleryTakeoverNavBarHideTask.cancel()
  },
  onQuarkNavigate: function (e, t) {
    this.setCurrentQuark(t), t ? this.showQuark(t) : this.showGalleryView()
  },
  showGalleryView: function () {
    this.setInGalleryView(), this.galleryDock && this.hideGalleryStripInGalleryView && (this.hideGalleryDock(), this._disableGalleryDock = !0), this.currentQuark = null, this.updateGalleryStateCls(!1);
    if (this.galleryNeedsRefresh) {
      this.loadingSpinner.show(), this.quarkViewport && (this.quarkViewport.deactivate(), this.quarkViewport.$el.hide()), $.active >= 1 ? jQuery(document).ajaxStop(this.redirectToCurrentGallery.createDelegate(this)) : this.redirectToCurrentGallery();
      return
    }
    var e = this.currentGalleryView.loadAndShow();
    if (this.quarkViewport) {
      this.loadingSpinner.show();
      var t = this;
      e.done(function () {
        t.quarkViewport.deactivate(), t.quarkViewport.$el.hide(), t.loadingSpinner.hide()
      })
    }
    this.updatePaletteOpenButton(), Jux.Util.getWindowObject().off("keydown.quarkNav"), this.appState.set("currentQuark", null), this._galleryDockVisible = !1, this._disableNavThumbstrip = !1, this.lastScroll && this.currentGalleryView.$scrollEl.scrollTop(this.lastScroll), this.onViewChange()
  },
  hideArrowNav: function () {
    this.quarkArrowNav.setCanHide(1)
  },
  setupQuarkArrowNav: function () {
    if (!this.quarkViewport) return;
    this.quarkArrowNav = new app.views.navigation.QuarkArrowNav({
      renderTo: this.quarkViewport.$el,
      $clickArea: this.quarkViewport.$el,
      appState: this.appState,
      currentGallery: this.currentGallery,
      currentGalleryQuarks: this.currentGalleryQuarks,
      quarkTakeover: this
    }), this.arrowNavHideTask = new Jux.util.DelayedTask(this.hideArrowNav, this)
  },
  setupQuarkViewport: function () {
    if (this.currentGalleryView instanceof app.views.gallery.GalleryList) return;
    var e = jQuery('<div class="view-frame-scroller"></div>').appendTo(this.$galleryTakeoverInner);
    this.quarkViewport = new app.views.galleryTakeover.QuarkViewport({
      $el: e,
      quarksState: this.quarkViewportQuarksState,
      currentGalleryQuarks: this.currentGalleryQuarks,
      currentUser: this.currentUser,
      paletteOpenButton: this.paletteOpenButton,
      listeners: {
        blur: function () {
          this.appState.set("currentQuark", null)
        },
        swipedTo: this.onSwipedTo,
        scope: this
      }
    })
  },
  setupNavThumbstrip: function () {
    if (!this.quarkViewport) return;
    var e = jQuery('<div id="navThumbstripWrapper"></div>').appendTo(this.$navStripContainer);
    this.navThumbstrip = new app.views.navBar.NavThumbstrip({
      renderTo: e,
      currentGallery: this.currentGallery,
      currentGalleryQuarks: this.currentGalleryQuarks,
      currentUser: this.currentUser,
      appState: this.appState,
      disableTitlePanel: this.isMonoGallery,
      listeners: {
        galleryTitleActivated: this.showGalleryDock,
        showThumbstrip: this.showNavThumbstrip,
        scope: this
      }
    }), this.navThumbstripShowTask = new Jux.util.DelayedTask(this.showNavThumbstrip, this), this.navThumbstripHideTask = new Jux.util.DelayedTask(this.hideNavThumbstrip, this)
  },
  setupGalleryDock: function () {
    if (this.isFeedGallery || !this.hasFullViewHeading || this.currentGallery.get("owner").get("has_a_mono_gallery")) return;
    app.views.dock.Dock.fetch(function (e, t, n) {
      e ? (Jux.logError("Cannot create gallery dock"), Jux.logError(e)) : (this.createQuarkDock($(n)), this.createGalleryDock($(n)))
    }.createDelegate(this))
  },
  createGalleryDock: function (e) {
    if (e.find("li").length <= 1) {
      this.hasGalleryDock = !1;
      return
    }
    this.hasGalleryDock = !0, this.galleryDock = new app.views.dock.GalleryDock({
      renderTo: this.$el,
      contentEl: e,
      currentGallery: this.currentGallery,
      appState: this.appState,
      listeners: {
        hideDock: function () {
          this.hideGalleryDock()
        },
        showDock: this.showGalleryDock,
        galleryChange: this.onGalleryChange,
        allImagesLoaded: function () {
          this.inGalleryView && (this.showGalleryDock(), this.currentGallery.isSubGallery() && this.galleryDock.hideDockTask.delay(2e3))
        },
        preventClosing: function () {
          this.keepGalleryDockUp = !0, this.showGalleryDock()
        },
        allowClosing: function () {
          this.keepGalleryDockUp = !1
        },
        scope: this
      }
    }), this.dockAboveFold = !0, this._galleryDockVisible = !0, this.insert(this.galleryDock), this.mouseMoveDelegateForGalleryDock = _.throttle(this.onMouseMoveForGalleryDock.createDelegate(this), 10), $(document).on("mousemove", this.mouseMoveDelegateForGalleryDock)
  },
  createQuarkDock: function (e) {
    if (e.find("li").length <= 1) {
      this.hasQuarkDock = !1;
      return
    }
    this.hasQuarkDock = !0, this.quarkDock = new app.views.dock.QuarkDock({
      renderTo: this.$navStripContainer,
      contentEl: e,
      currentGallery: this.currentGallery,
      appState: this.appState,
      currentUser: this.currentUser,
      listeners: {
        hideDock: this.hideQuarkDock,
        showDock: this.showQuarkDock,
        galleryChange: this.onGalleryChange,
        preventClosing: function () {
          this.keepQuarkDockUp = !0, this.showQuarkDock()
        },
        allowClosing: function () {
          this.keepQuarkDockUp = !1
        },
        scope: this
      }
    }), this.navStripHeight += this.quarkDock.getPeekedHeight(), this.insert(this.quarkDock)
  },
  onGalleryChange: function (e) {
    if (this.currentGallery === e) return;
    this._disableNavThumbstrip = !1, this.showGalleryView(), this.appState.set({
      currentGallery: e,
      currentQuark: null
    })
  },
  onAdjustThumbstripPreviews: function (e) {
    this.navThumbstrip && this.navThumbstrip.setCurrentGallery(e)
  },
  setCurrentGallery: function (e, t) {
    if (!t) throw new Error("'newGalleryView' required");
    this.currentGallery.un("quarksFullyLoaded", this.onQuarksFullyLoaded, this), this.currentGallery = e, this.currentGalleryView = t, this.bindCurrentGalleryEvents(), this.updatePaletteOpenButton(), this.applyCurrentGalleryQuarksBinding(), this.appState.set("currentGallery", e), this.navThumbstrip && this.navThumbstrip.setCurrentGallery(e), this.quarkFrameNavBar && this.quarkFrameNavBar.setCurrentGallery(e), this.quarkArrowNav && this.quarkArrowNav.setCurrentGallery(e)
  },
  setCurrentQuark: function (e) {
    this.currentQuark = e
  },
  getCurrentQuark: function () {
    return this.currentQuark
  },
  showQuark: function (e, t) {
    t = t || {};
    if (t.newQuark) {
      var n = new app.models.Gallery({
        id: e.get("gallery_id")
      });
      this.appState.set({
        currentGallery: n,
        currentQuark: e
      }), this.refreshGalleryOnReturn()
    } else this.appState.set("currentQuark", e);
    this.inQuarkView || this.showQuarkViewport(), t = t || {}, this.quarkViewport.show(e, !! t.editMode), this.setCurrentQuark(e), t.showNav && t.showComments && this.galleryTakeoverNavBar.openSocialMenu(), t.newQuark && this.refreshGalleryOnReturn(), this.currentUser && this.currentUser === this.currentGallery.get("owner") && e.on("change:reposted_by_current_user", this.refreshGalleryOnReturn, this)
  },
  onSwipedTo: function (e, t) {
    this.setCurrentQuark(t), this.appState.set("currentQuark", t)
  },
  showQuarkViewport: function () {
    this.setInQuarkView(), this._disableGalleryDock = !1, this.lastScroll = this.currentGalleryView.$scrollEl.scrollTop(), this.currentGalleryView.$scrollEl.get(0).scrollTo(0, 0), this.updateGalleryStateCls(!0), this.currentGalleryView.hide(), this.quarkViewport.$el.show(), this.quarkArrowNav && (this.quarkArrowNav.show(), $.cookie("arrowsHaveBeenHinted") || ($("#startup-screen > #quarkArrowNav").size() || (this.quarkArrowNav.setCanHide(0), this.arrowNavHideTask.delay(this.navBarsInitialVisibleTime)), $.cookie("arrowsHaveBeenHinted", 1, {
      expires: 1,
      path: "/"
    }))), Jux.Util.getWindowObject().off("keydown.quarkNav").on("keydown.quarkNav", this.onKeyEventDelegate), this.onViewChange()
  },
  setupKeyboardAndMouseBindings: function () {
    jQuery(document).off("mouseleave.navBars mousemove.navBars").on({
      "mousemove.navBars": this.onMouseMoveDelegate,
      "mouseleave.navBars": this.onMouseLeaveDelegate
    })
  },
  redirectToCurrentGallery: function () {
    window.location.replace(this.currentGallery.get("url"))
  },
  setInQuarkView: function () {
    this.inQuarkView = !0, this.inGalleryView = !1
  },
  setInGalleryView: function () {
    this.inQuarkView = !1, this.inGalleryView = !0
  },
  forceRenderingOfGalleryStrip: function () {
    if (!this.galleryDock) return;
    this.galleryDock.show(), this.galleryDock.hide()
  },
  updateGalleryStateCls: function (e) {
    this.$html.toggleClass("viewingGallery", !e), this.$html.toggleClass("viewingQuark", !! e)
  },
  showNavThumbstrip: function () {
    if (this._disableNavThumbstrip || this._navThumbstripIsVisible) return;
    this.quarkDock && (this.quarkDock.addCls("animate"), this.quarkDock.setDockAtPeekState()), this.navThumbstrip.setIsVisible(!0), this.navThumbstrip.show(), setTimeout(function () {
      this._navThumbstripIsVisible = !0, this.quarkViewport.$el.css("top", -this.navStripHeight + "px")
    }.createDelegate(this), 100), this.navThumbstripShowTask.cancel()
  },
  hideNavThumbstrip: function () {
    if (this.keepThumbstripUp || this._disableHidingNavThumbstrip || this.quarkDockVisible) return;
    this.quarkDock && this.quarkDock.setDockOutOfView(), this.quarkViewport.$el.css("top", ""), this._navThumbstripIsVisible = !1, this.navThumbstrip.setIsVisible(!1), this.navThumbstripHideTask.cancel()
  },
  showGalleryDock: function (e) {
    this.galleryDock && this.inGalleryView && (this._galleryDockVisible = !0, this.galleryDock.hideDockTask.cancel(), this._showDock(this.galleryDock), this.currentGalleryView.$el.addClass("viewingDock"), this.galleryDock.removeCls("docked"))
  },
  _showDock: function (e) {
    if (!e) return;
    e.setIsVisible(!0), e.hideDockTask.cancel(), e.removeCls("docked"), e.makeDockFullyVisible()
  },
  _hideDock: function (e) {
    if (!e) return;
    e.setIsVisible(!1), e.setDockAtPeekState()
  },
  hideGalleryDock: function (e) {
    this.galleryDock && (this.currentGalleryView.$el.removeClass("viewingDock"), this._hideDock(this.galleryDock), this._galleryDockVisible = !1, this._disableNavThumbstrip = !1)
  },
  hideQuarkDock: function () {
    this.quarkDockVisible = !1, this._hideDock(this.quarkDock)
  },
  showQuarkDock: function () {
    this._navThumbstripIsVisible && (this.quarkDockVisible = !0, this._showDock(this.quarkDock))
  },
  showGalleryDockAtBottomOfGallery: function () {
    this.galleryDock && this.galleryDock.setUserViewedBottomOfGallery(!0)
  },
  hideNavMenus: function () {
    this.galleryTakeoverNavBar.hideMenus()
  },
  refreshGalleryOnReturn: function () {
    this.galleryNeedsRefresh = !0
  },
  _showNextOrPreviousQuark: function (e, t, n) {
    var r = null;
    return typeof e == "function" && t && n && (r = e.call(t, n), r ? this.appState.set("currentQuark", r) : this.currentGalleryQuarks.areQuarksLoading() || this.appState.set("currentQuark", null)), r
  },
  showPreviousQuark: function (e) {
    return this._showNextOrPreviousQuark(this.currentGalleryQuarks.previous, this.currentGalleryQuarks, e)
  },
  showNextQuark: function (e) {
    return this._showNextOrPreviousQuark(this.currentGalleryQuarks.next, this.currentGalleryQuarks, e)
  },
  onKeyEvent: function (e) {
    if (!_.contains(["textarea", "input", "select"], e.target.tagName.toLowerCase())) {
      var t;
      switch (e.which) {
      case 37:
      case 74:
        this.showPreviousQuark(this.currentQuark), e.preventDefault(), e.stopPropagation();
        break;
      case 39:
      case 75:
        this.showNextQuark(this.currentQuark), e.preventDefault(), e.stopPropagation();
        break;
      case 27:
        this.appState.set("currentQuark", null), e.preventDefault(), e.stopPropagation()
      }
    }
  },
  onMouseMove: function (e) {
    if (e.clientX === 0 && e.clientY === 0) return;
    var t = e.clientY,
      n = Jux.Util.getViewportSize().height - t;
    t <= 115 ? (this.galleryTakeoverNavBar.show(), this.galleryTakeoverNavBarHideTask.cancel()) : this.galleryTakeoverNavBarHideTask.isPending() || this.galleryTakeoverNavBarHideTask.delay(this.navComponentIdleTimeout);
    if (this.inQuarkView && this.navThumbstrip) {
      var r = this.thumbstripHeight = this.thumbstripHeight || this.navThumbstrip.getHeight();
      this._navThumbstripIsVisible ? n <= r ? (this.navThumbstripShowTask.cancel(), this.navThumbstripHideTask.cancel()) : this.navThumbstripHideTask.isPending() || (this.navThumbstripShowTask.cancel(), this.navThumbstripHideTask.delay(this.navComponentIdleTimeout)) : n <= 150 ? this.navThumbstripShowTask.isPending() || (this.navThumbstripShowTask.delay(100), this.navThumbstripHideTask.cancel()) : this.navThumbstripShowTask.cancel()
    }
  },
  _getPeekingValue: function (e) {
    var t = e.distanceFromBottom,
      n = e.activeArea,
      r = e.visibleHeight,
      i = e.amplifier || 1.6;
    if (t < n) {
      var s = (n - t) / n,
        o = s * r * i,
        u = o;
      return u < r ? null : u
    }
    return 0
  },
  onMouseMoveForGalleryDock: function (e) {
    if (this.inQuarkView || this._galleryDockVisible || this.keepGalleryDockUp || !this.hasGalleryDock || e.clientX === 0 && e.clientY === 0) return;
    var t = Jux.Util.getViewportSize().height - e.clientY,
      n = 700,
      r = this._getPeekingValue({
        distanceFromBottom: t,
        activeArea: n,
        visibleHeight: this.galleryDock.getPeekedHeight()
      });
    r && this.galleryDock.setBottom(-this.galleryDock.getStoredHeight() + r);
    if (r === null) return;
    r === 0 && !this.galleryDock.isAtPeekState() && this.galleryDock.setDockAtPeekState()
  },
  onMouseLeave: function () {
    setTimeout(function () {
      this.galleryTakeoverNavBarHideTask.isPending() || this.galleryTakeoverNavBarHideTask.delay(this.navComponentIdleTimeout), this.navThumbstrip && (this.navThumbstripShowTask.cancel(), this.navThumbstripHideTask.isPending() && this.navThumbstripHideTask.delay(this.navComponentIdleTimeout)), this.galleryDock && this.galleryDockLoaded && (this.galleryDockShowTask.cancel(), this.galleryDockHideTask.isPending() || this.galleryDockHideTask.delay(this.navComponentIdleTimeout))
    }.createDelegate(this), 100)
  },
  onTouchStart: function (e) {
    this.touch = {
      origX: e.originalEvent.touches[0].clientX,
      origY: e.originalEvent.touches[0].clientY,
      x: e.originalEvent.touches[0].clientX,
      y: e.originalEvent.touches[0].clientY,
      dist: 0
    }, this.galleryTakeoverNavBarHideTask.cancel()
  },
  onTouchMove: function (e) {
    var t = this.galleryTakeoverNavBar,
      n = e.originalEvent.touches[0],
      r = n.clientX,
      i = n.clientY,
      s;
    jQuery(n.target).closest(t.getEl()).length > 0 && e.preventDefault(), this.touch || (this.touch = {
      origX: r,
      origY: i,
      x: r,
      y: i,
      dist: 0
    }), s = Math.sqrt(Math.abs(r - this.touch.origX) + Math.abs(i - this.touch.origY)), !t.isHidden() && s >= 10 && this.galleryTakeoverNavBar.hide(), this.touch = {
      origX: this.touch.origX,
      origY: this.touch.origY,
      x: r,
      y: i,
      dist: s
    }
  },
  onTouchEnd: function (e) {
    var t = this.galleryTakeoverNavBar;
    t.isHidden() && this.touch && this.touch.dist < 10 ? (this.galleryTakeoverNavBarHideTask.cancel(), t.show()) : t.menuIsOpen() || this.galleryTakeoverNavBarHideTask
      .delay(this.navComponentIdleTimeout)
  },
  onSortTimeChange: function (e, t) {
    this.inUserGallery && this.refreshGalleryOnReturn()
  }
}), app.views.galleryTakeover.QuarkContainer = Jux.extend(ui.Viewport, {
  layout: {
    type: "fit",
    browserManagedWidth: !0
  },
  initComponent: function () {
    if (!this.model) throw new Error("'model' config required");
    if (typeof this.currentUser == "undefined") throw new Error("'currentUser' config required");
    this.quark = app.views.quark.Quark.fromModel(this.model, this.currentUser), this.items = [this.quark], this.relayEvents(this.quark, ["load", "showSpinner", "hideSpinner"]), this._super(arguments)
  },
  getModel: function () {
    return this.model
  },
  isLoaded: function () {
    return this.quark.isLoaded()
  },
  activate: function () {
    this.quark.activate()
  },
  deactivate: function () {
    this.quark.deactivate()
  }
}), app.views.galleryTakeover.QuarkViewport = Jux.extend(ui.Container, {
  currentQuarkEditor: null,
  activeQuarkViews: {},
  pinching: !1,
  initComponent: function () {
    this._super(arguments), this.addEvents("blur", "swipedTo"), this.quarkPreviewSpinner = new app.components.CenteredSpinner, this.$quarkLoadingSpinnerEl = jQuery('<div class="quarks-loading"></div>').insertAfter(this.$el), this.setupSwipeView(), Jux.isTouch && this.setupTouchEvents(), this.activateQuarkContainerTask = new Kevlar.util.DelayedTask(this.activateQuarkContainer, this)
  },
  setupSwipeView: function () {
    this.swipeView = new app.components.SwipeView(this.$el), this.currentPage = 0, this.swipeView.onFlip(function (e, t) {
      if (this.currentQuark) {
        var n = this.currentGalleryQuarks.indexOf(this.currentQuark),
          r = this.currentGalleryQuarks.getAt(n + t);
        r ? (this.activateQuark(r), Jux.isTouch && this.fireEvent("swipedTo", this, r)) : this.activateQuark(this.currentQuark)
      }
    }.createDelegate(this)), this.swipeView.onStartFlip(this.beginPageChange.createDelegate(this)), this.swipeView.onBeforeFlip(this.shouldChangePage.createDelegate(this))
  },
  setupTouchEvents: function () {
    Jux.isHandheld && this.touchScrollManager(), this.$el.bind({
      gesturestart: this.onPinchStart.createDelegate(this),
      gesturechange: this.onPinch.createDelegate(this),
      gestureend: this.onPinchEnd.createDelegate(this)
    }), jQuery(".temp-quark-frame").on("gesturestart", this.onPinchStart.createDelegate(this)).on("gesturechange", this.onPinch.createDelegate(this)).on("gestureend", this.onPinchEnd.createDelegate(this))
  },
  show: function (e, t) {
    this.swipeView.enable();
    if (this.visible) {
      if (this.currentQuark !== e)
        for (var n = 0; n < 3; n++)
          if (jQuery(this.swipeView.masterPages[n]).find('[data-quarkid="' + e.getId() + '"]').length) {
            this.swipeView.goToMasterPage(n);
            return
          }
    } else Jux.isHandheld && (this.$el.css("top", 0), this.lastScrollPosition = jQuery(window).scrollTop(), window.scrollTo(0, 0)), this.swipeView.refreshSize(), this.visible = !0, this.swipeView.goToPage(0), Jux.isTouch && (this.$el.css({
      "-webkit-transform": "scale3d(0,0,1)"
    }), function () {
      this.$el.css({
        "-webkit-transform": "scale3d(1,1,1)",
        "-webkit-transition": ".5s all"
      })
    }.defer(16, this));
    this.activateQuark(e, t)
  },
  isShown: function () {
    return this.$el.is(":visible")
  },
  deactivateEditor: function (e) {
    var t = this.currentQuarkEditor;
    t ? (t.closePalette(), t.saveData({
      complete: function () {
        typeof e == "function" && e()
      }
    })) : typeof e == "function" && e()
  },
  deactivate: function (e) {
    var t;
    for (var n in this.activeQuarkViews) t = this.activeQuarkViews[n], t.destroy(), delete this.activeQuarkViews[n];
    this.deactivateEditor(e)
  },
  activateQuarkContainer: function () {
    if (this.oldQuark) {
      var e = this.activeQuarkViews[this.oldQuark.getId()];
      e && e.deactivate()
    }
    var t = this.activeQuarkViews[this.currentQuark.getId()];
    t && t.activate(), this.createQuarkEditor(t), this.openPalette && this.currentQuarkEditor.openPalette(), this.preloadSurroundingQuarks.defer(Jux.isTouch ? 64 : 0, this)
  },
  activateQuark: function (e, t) {
    this.openPalette = t, this.oldQuark = this.currentQuark, this.currentQuark = e;
    var n = this.activeQuarkViews[this.currentQuark.getId()];
    n && n.isLoaded() ? this.quarkPreviewSpinner.hide() : (n = this.loadQuarkContainer(e, this.swipeView.currentMasterPage), n.isLoaded() ? this.quarkPreviewSpinner.hide() : (this.quarkPreviewSpinner.show(), n.on({
      load: function () {
        this.quarkPreviewSpinner.hide()
      },
      scope: this,
      single: !0
    }), n.on({
      showSpinner: function () {
        this.quarkPreviewSpinner.show()
      },
      hideSpinner: function () {
        this.quarkPreviewSpinner.hide()
      },
      scope: this
    })));
    var r = this.currentGalleryQuarks.indexOf(e);
    r === -1 && console.warn("quark " + e.getId() + " not present in collection");
    if (this.oldQuark) {
      var i = r - this.currentGalleryQuarks.indexOf(this.oldQuark) > 0 ? 1 : -1,
        s = r + i;
      i == -1 ? this.needsNewerQuark = !0 : i == 1 && (this.needsOlderQuark = !0)
    } else this.needsOlderQuark = !0, this.needsNewerQuark = !0;
    this.activateQuarkContainerTask.delay(Jux.isTouch ? 125 : 0)
  },
  loadQuarkContainer: function (e, t) {
    var n = jQuery(this.swipeView.masterPages[t]);
    this.emptyMasterPage(t);
    var r = this.activeQuarkViews[e.getId()];
    return r || (r = this.createQuarkContainer(e, n), this.activeQuarkViews[e.getId()] = r), r
  },
  createQuarkContainer: function (e, t) {
    return Jux.FontLoader.load(e.getFonts()), new app.views.galleryTakeover.QuarkContainer({
      model: e,
      currentUser: this.currentUser || null,
      renderTo: t
    })
  },
  createQuarkEditor: function (e) {
    var t = this.currentQuarkEditor,
      n;
    e && (n = e.getModel()), (!t || t.getQuark() !== n) && t && this.deactivateEditor(function () {
      t.destroy()
    }), this.paletteOpenButton && (this.currentUser && this.currentUser === this.currentQuark.get("owner") && n ? (this.paletteOpenButton.show(), this.currentQuarkEditor = new app.controllers.QuarkEditor({
      paletteOpenButton: this.paletteOpenButton,
      model: n,
      currentUser: this.currentUser,
      $buttonContainerEl: jQuery(this.swipeView.getCurrentMasterPage()),
      listeners: {
        palettedoneclick: this.onPaletteDoneClick,
        scope: this
      }
    })) : this.paletteOpenButton.hide())
  },
  preloadSurroundingQuarks: function (e, t, n) {
    var r = this.currentQuark;
    this.$quarkLoadingSpinnerEl.hide();
    if (!r) return;
    this.needsNewerQuark && (this.needsNewerQuark = this.getSurroundingQuark(e, -1)), this.needsOlderQuark && (this.needsOlderQuark = this.getSurroundingQuark(e, 1))
  },
  getSurroundingQuark: function (e, t) {
    var n = this.currentQuark,
      r = this.currentGalleryQuarks.indexOf(n),
      i, s, o, u;
    t < 0 ? (i = "atNewest", o = "newer", u = this.swipeView.previousMasterPage, s = 0) : (i = "atOldest", o = "older", u = this.swipeView.upcomingMasterPage, s = this.currentGalleryQuarks.getCount() - 1);
    if (!this.quarksState.get(i) && r === s) return typeof e != "object" || e.length >= app.Defaults.quarksPerPageDefault ? (this.currentGalleryQuarks.load(o), Jux.isTouch && this.$quarkLoadingSpinnerEl.show(), !0) : !1;
    var a = this.currentGalleryQuarks.getAt(r + t);
    if (a) {
      var f = this.activeQuarkViews[a.getId()];
      f || this.loadQuarkContainer(a, u)
    }
    return !1
  },
  touchScrollManager: function () {
    this.$el.bind("touchstart", function (e) {
      this.pinching || window.scrollTo(0, 1)
    })
  },
  onPinchStart: function (e) {
    Jux.isHandheld && (this.$el.css("top", this.lastScrollPosition), window.scrollTo(0, this.lastScrollPosition)), this.pinching = !0, this.swipeView.disable()
  },
  onPinch: function (e) {
    e.preventDefault(), e.stopImmediatePropagation(), this.$el.css({
      "-webkit-transition": "none",
      "-webkit-transform": "scale3d(" + e.originalEvent.scale + "," + e.originalEvent.scale + ",1)"
    })
  },
  onPinchEnd: function (e) {
    if (!this.pinching) return;
    e.preventDefault(), e.stopImmediatePropagation(), setTimeout(function () {
      this.pinching = !1
    }.createDelegate(this), 250);
    var t = this.$el,
      n = !1;
    (function () {
      e.originalEvent.scale < .72 ? (this.$quarkPreviewEl && this.$quarkPreviewEl.length && (t.add(this.$quarkPreviewEl), this.$quarkPreviewEl.unbind("webkitTransitionEnd"), n = !0), this.visible = !1, t.css("-webkit-transition", "all 0.2s").one("webkitTransitionEnd", function () {
        n && this.$quarkPreviewEl.remove(), this.fireEvent("blur", this)
      }.createDelegate(this)), this.swipeView.disable(), t.css("-webkit-transform", "scale3d(0,0,1)")) : (t.css("-webkit-transition", "all 0.2s").css("-webkit-transform", "scale3d(1,1,1)"), this.$el.css("top", 0), window.scrollTo(0, 1), this.swipeView.enable())
    }).defer(0, this)
  },
  beginPageChange: function (e) {
    var t = this.currentGalleryQuarks.indexOf(this.currentQuark);
    (e > 0 && t === this.currentGalleryQuarks.getCount() - 1 || e < 0 && t === 0) && this.emptyMasterPage(this.swipeView.upcomingMasterPage)
  },
  shouldChangePage: function (e) {
    var t = this.currentGalleryQuarks.indexOf(this.currentQuark);
    return e > 0 && t === this.currentGalleryQuarks.getCount() - 1 || e < 0 && t === 0 ? !1 : !0
  },
  emptyMasterPage: function (e) {
    var t = jQuery(this.swipeView.masterPages[e]),
      n = t.find("[data-quarkid]"),
      r = n.attr("data-quarkid"),
      i = this.activeQuarkViews[r];
    i && (i.destroy(), delete this.activeQuarkViews[r])
  },
  onPaletteDoneClick: function () {
    this.fireEvent("blur", this)
  }
}), app.views.gallery.AbstractGallery = Jux.extend(Backbone.View, {
  abstractClass: !0,
  lazyViewEnabled: !Jux.isTouch,
  isRemoved: !1,
  initialize: function (e) {
    this._super(arguments);
    if (!(e.appState instanceof app.models.AppState)) throw new Error("'appState' config required");
    if (!(e.currentGallery instanceof app.models.Gallery)) throw new Error("'currentGallery' config required");
    this.appState = e.appState, this.currentGallery = e.currentGallery, this.palette = e.palette, this.hasFullViewHeading = e.hasFullViewHeading, this.galleryOwner = this.currentGallery.get("owner"), this.isAMonoGallery = this.galleryOwner.get("has_a_mono_gallery"), this.quarksState = new app.models.GalleryQuarksState({
      gallery: this.currentGallery
    }), this.onWndResizeDelegate = _.throttle(this.onWndResize.createDelegate(this), 100), this.$scrollEl = this.$window = Jux.Util.getWindowObject().bind({
      resize: this.onWndResizeDelegate
    }), this.$body = $("body"), this.$loadingEl = jQuery('<div class="loading"/>'), this.onGalleryInfoMouseEnterDelegate = this.onGalleryInfoMouseEnter.createDelegate(this), this.onGalleryInfoMouseLeaveDelegate = this.onGalleryInfoMouseLeave.createDelegate(this), this.calculateMaxTitleFontSizeDelegate = _.throttle(this.calculateMaxTitleFontSize.createDelegate(this), 100), this.initializeFullview(), this.currentGallery.on({
      "change:theme": this.onThemeChange,
      "change:fullview_heading_look": this.onFullviewHeadingLookChange,
      "change:fullview_heading_height": this.resizeFullViewHeading,
      "change:text_alignment": this.onTextAlignmentChange,
      scope: this
    }), this.resizeFullViewForScrollCues()
  },
  resizeFullViewForScrollCues: function () {
    if (!this.hasFullViewHeading) return;
    this.currentGallery.get("type") === "MasterGallery" && !this.isAMonoGallery && this.currentGallery.set("fullview_heading_height", this.$window.innerHeight() * .76);
    if (this.currentGallery.get("type") === "MasterGallery" && this.isAMonoGallery && this.$fullviewHeading.hasClass("groupOf1-A1") && this.currentGallery.get("fullview_heading_look") === "overlay" || this.currentGallery.get("fullview_heading_look") === "horizontal" && this.$fullviewHeading.find(".quark").length === 1) {
      var e = Jux.Util.getEmValueInPxForElement(this.$fullviewHeading, 4.5);
      this.currentGallery.set("fullview_heading_height", this.$window.innerHeight() - e)
    }
    this.currentGallery.isSubGallery() && this.currentGallery.set("fullview_heading_height", this.$window.innerHeight() - app.views.dock.GalleryDock.getPeekedDockHeight())
  },
  fullviewHeadingPresent: function () {
    return this.$fullviewHeading.length > 0
  },
  initializeFullview: function () {
    this.$fullviewHeading = this.$(".fullviewHeading"), this.$galleryInfo = this.$fullviewHeading.find(".galleryInfo"), this.$galleryInfoInner = this.$fullviewHeading.find(".galleryInfo-child"), this.$galleryInfoSubChild = this.$fullviewHeading.find(".galleryInfo-sub-child"), this.$galleryInfoDescription = this.$fullviewHeading.find(".galleryInfo-descriptionAndLinks"), this.$juxTitle = this.$galleryInfo.find(".juxTitle"), this.fullviewHeadingPresent() && (this.$galleryInfo.pulley({
      $overflowingElements: this.$galleryInfoSubChild.children(),
      includeParentsPaddingBottom: !0,
      includeParentsPaddingTop: !0
    }), this.pulleySetup = !0, this.$galleryInfo.scrollTop(0), this.$galleryInfo.bind({
      mouseenter: this.onGalleryInfoMouseEnterDelegate,
      mouseleave: this.onGalleryInfoMouseLeaveDelegate
    }), this.$juxTitle.bind("blur keyup paste input", this.calculateMaxTitleFontSizeDelegate), this.onTextAlignmentChange())
  },
  onGalleryInfoMouseEnter: function () {
    this.mouseInGalleryInfo = !0
  },
  onGalleryInfoMouseLeave: function () {
    this.mouseInGalleryInfo = !1, this.$galleryInfoInner.scrollTop(0), _.delay(this.calculateMaxTitleFontSizeDelegate, 1e3)
  },
  onFullviewHeadingLookChange: function () {
    this.cachedGalleryInfoHeight = undefined;
    var e = this.currentGallery.get("fullview_heading_look");
    this.$fullviewHeading.length && (this.pulleySetup && this.$galleryInfo.pulley("removeHeight"), this.$fullviewHeading.removeClass("fullviewHeading-horizontal fullviewHeading-overlay fullviewHeading-vertical fullviewHeading-verticalWide").addClass("fullviewHeading-" + e), this.pulleySetup && _.delay(function () {
      this.$galleryInfo.pulley("calculateNormalHeight")
    }.createDelegate(this), 1e3)), _.delay(this.calculateMaxTitleFontSizeDelegate, 1e3)
  },
  onTextAlignmentChange: function () {
    if (this.hasFullViewHeading) {
      var e = this.currentGallery.get("text_alignment");
      switch (e) {
      case "left":
        this.$fullviewHeading.addClass("left-align").removeClass("center-align");
        break;
      case "center":
        this.$fullviewHeading.addClass("center-align").removeClass("left-align")
      }
    }
  },
  calculateMaxTitleFontSize: function () {
    if (!this.$juxTitle.length) return;
    !this.mouseInGalleryInfo && this.pulleySetup && this.$galleryInfo.pulley("recalculatePulley");
    if (!this.palette) return;
    this.$juxTitle.find("*").removeAttr("style");
    var e = this.getTitleHeightLimit();
    if (!e) return;
    var t = this.$juxTitle.attr("style"),
      n = !t || t.indexOf("font-size") === -1 ? null : this.$juxTitle.css("font-size"),
      r, i = 1,
      s = 200,
      o = 200;
    do this.$juxTitle.css("font-size", o + "em"), r = this.$juxTitle.height() - e, r <= 0 ? i = o : r > 0 && (s = o), o = (i + s) / 2; while (Math.abs(i - s) > 1);
    this.setTitleFontMaxSize(i), this.$juxTitle.css("font-size", n || "")
  },
  makeGalleryInfoScrollableOrNot: function () {},
  getTitleHeightLimit: function () {
    return this.cachedGalleryInfoHeight ? this.cachedGalleryInfoHeight : this.mouseInGalleryInfo ? undefined : (this.cachedGalleryInfoHeight = this.$galleryInfoInner.height(), this.cachedGalleryInfoHeight)
  },
  setTitleFontMaxSize: function (e) {
    if (!this.palette) return;
    this.palette.titleFontCustomizer.setMaxSize(e);
    var t = this.currentGallery.get("selected_theme_settings"),
      n = t.get("title_font");
    n.size > e && (n.size = e, t.set("title_font", n))
  },
  onWndResize: function () {
    this.resizeFullViewHeading(), this.calculateMaxTitleFontSize()
  },
  resizeFullViewHeading: function () {
    this.hasFullViewHeading && (this.$fullviewHeading.css({
      height: this.currentGallery.get("fullview_heading_height")
    }), this.pulleySetup && this.$galleryInfo.pulley("setHeightShortening", $(window).innerHeight() - this.currentGallery.get("fullview_heading_height")))
  },
  loadNextPage: Class.abstractMethod,
  initContinuousScroll: function () {
    var e = this,
      t = this.quarksState,
      n = this.currentGallery,
      r = {
        bottomPixels: 500,
        callback: this.loadNextPage.createDelegate(this),
        ceaseFire: function () {
          return t.isFullyLoaded() && n.fireEvent("quarksFullyLoaded"), e.isRemoved || t.isFullyLoaded()
        },
        fireDelay: 1e3,
        fireOnce: !0
      };
    $("html").hasClass("galleryWithFullviewHeading") && (r.performInitialKick = !0), this.lazyViewEnabled && (t.get("atOldest") ? this.showAllLazyViews() : (this.updateLazyViews(), t.on({
      "change:atNewest": this.showAllLazyViews,
      "change:atOldest": this.showAllLazyViews,
      scope: this
    }), r.onScroll = this.updateLazyViews.createDelegate(this))), this.$scrollEl.endlessScroll(r)
  },
  show: function () {
    this.$el.show(), this.onWndResize(), this.calculateMaxTitleFontSize(), this.updateLazyViews()
  },
  remove: function () {
    this._super(arguments), this.currentGallery.un({
      "change:theme": this.onThemeChange,
      "change:fullview_heading_look": this.onFullviewHeadingLookChange,
      "change:fullview_heading_height": this.resizeFullViewHeading,
      "change:text_alignment": this.onTextAlignmentChange,
      scope: this
    }), this.isRemoved = !0
  },
  updateLazyViews: function () {
    var e = this.$scrollEl.scrollTop() + Jux.Util.getViewportSize().height - 20,
      t = this.$(".lazyView:not(.enteredViewport)");
    for (var n = t.length, r; n--;) r = t.eq(n), r.offset().top < e && r.addClass("enteredViewport")
  },
  showAllLazyViews: function () {
    this.$(".lazyView:not(.enteredViewport)").addClass("enteredViewport")
  },
  onThemeChange: function () {
    this.calculateMaxTitleFontSize(), this.$el.css("opacity", 0).animate({
      opacity: 1
    }, 800)
  }
}), app.views.gallery.SingularGallery = app.views.gallery.AbstractGallery.extend({
  trackPageviewAfterContinuousScroll: !0,
  rendered: !1,
  xsomeViews: [],
  initialize: function (e) {
    this._super(arguments);
    var t = this.currentGallery;
    t.isMasterGallery() && (this.$el.addClass("masterGallery"), t.isMultiGallery() && this.$el.addClass("hasChildGalleries")), this.$pagination = jQuery('[data-elem="pagination"]'), this.appManager = e.appManager, this.currentGalleryQuarks = e.currentGalleryQuarks, this.currentUserModel = e.currentUserModel, this.socialMenu = e.socialMenu, this.makeQuarkMenu = e.makeQuarkMenu, this.juxMenu = e.juxMenu, this.$galleryNavbar = jQuery("#galleryNavbar"), this.renderedQuarks = this.quarksState.get("quarks"), this.$window = Jux.Util.getWindowObject(), this.renderedQuarks.on({
      addset: this.onQuarksAdded,
      destroy: this.onQuarkDeleted,
      quarksLoaded: this.onQuarksLoaded,
      quarksLoading: this.onQuarksLoading,
      scope: this
    });
    if (!this.fullviewHeadingPresent()) {
      var n = function () {
        this.initializeFullview(), this.fullviewHeadingPresent() && this.renderedQuarks.un("quarksLoaded", n, this)
      };
      this.renderedQuarks.on("quarksLoaded", n, this)
    }
    e.$makeNewPanel.length && (this.makeNewPanel = new app.views.MakeNewPanel({
      el: e.$makeNewPanel,
      appManager: e.appManager
    })), this.initializeQuarks(this.$el.find(".xsome")), this.visible = !0;
    var r = t.getFonts();
    Jux.FontLoader.load(r)
  },
  isEmpty: function () {
    return this.xsomeViews.length === 0 || this.quarksState.isEmpty()
  },
  loadAndShow: function () {
    var e;
    return this.isEmpty() ? e = this.loadFromTop() : e = jQuery.Deferred().resolve(), e.done(this.show.createDelegate(this)), e
  },
  render: function () {
    _.invoke(this.xsomeViews, "render"), this.rendered = !0
  },
  _quarkIdFromEl: function (e) {
    var t = jQuery(e),
      n = t.attr("data-quark-id");
    if (!n) {
      var r = t.attr("href");
      n = r.slice(r.lastIndexOf("/") + 1)
    }
    return n
  },
  loadNextPage: function () {
    var e = this.renderedQuarks.load("older");
    return this.trackPageviewAfterContinuousScroll && e.done(function () {
      Jux.Analytics.trackPageView(), this.updateLazyViews()
    }.createDelegate(this)), e
  },
  loadFromTop: function () {
    this.renderedQuarks.removeAll(), _.invoke(this.xsomeViews, "remove"), this.xsomeViews = [], this.quarksState.set({
      atNewest: !0,
      atOldest: !1
    });
    var e = this.loadNextPage(),
      t = this;
    return e.done(function () {
      t.updateLazyViews(), t.initContinuousScroll()
    }), e
  },
  loadNewerQuarks: function () {
    return this.renderedQuarks.load("newer")
  },
  onQuarksLoading: Jux.abstractFn,
  onQuarksLoaded: function (e, t, n) {
    if (e.length) {
      var r = jQuery(t),
        i = r.find(".xsome");
      this.$el[n === 1 ? "append" : "prepend"](r), this.initializeQuarks(i)
    }
    this.$loadingEl.remove()
  },
  initializeQuarks: function (e) {
    var t = this.appManager.getGalleryOwner(),
      n = !1,
      r = this;
    e.each(function (e, t) {
      r.initializeXsome(jQuery(t))
    }), n && this.quarksState.set("atNewest", !0)
  },
  initializeXsome: function (e) {
    var t = this.appManager.getGalleryOwner(),
      n;
    e.hasClass("introPanel") ? (n = new app.views.xsome.IntroPanel({
      el: e,
      appState: this.appState,
      gallery: this.currentGallery,
      introPanelOwner: t,
      galleryQuarks: this.currentGalleryQuarks,
      currentUser: this.currentUserModel,
      currentGallery: this.currentGallery,
      socialMenu: this.socialMenu,
      makeQuarkMenu: this.makeQuarkMenu,
      juxMenu: this.juxMenu
    }), reachedNewest = !0) : n = new app.views.xsome.XSome({
      el: e,
      appState: this.appState,
      currentGallery: this.currentGallery,
      currentUser: this.currentUserModel,
      galleryQuarks: this.currentGalleryQuarks
    }), this.renderedQuarks.add(n.getQuarks().getModels()), n.bind("quarkedit", this.onQuarkEdit, this), this.xsomeViews.push(n), this.rendered && n.render()
  },
  onQuarkEdit: function (e, t, n) {
    this.trigger("quarkedit", this, n)
  },
  onQuarkDeleted: function (e) {
    (this.renderedQuarks.isEmpty() || this.$(".quark:visible").length === 0) && window.location.reload(!0)
  },
  onQuarksAdded: function (e, t) {
    this.currentGalleryQuarks.add(t)
  },
  show: function () {
    this.makeVisible(), this.currentPage === 0 && this.$galleryNavbar.css("visibility", "hidden"), this.visible = !0, this.rendered || this.render(), this._super(arguments)
  },
  hide: function () {
    this.makeNotVisible(), this.$galleryNavbar.css("visibility", "")
  },
  remove: function () {
    this._super(arguments), this.renderedQuarks.un({
      addset: this.onQuarksAdded,
      destroy: this.onQuarkDeleted,
      quarksLoaded: this.onQuarksLoaded,
      quarksLoading: this.onQuarksLoading,
      scope: this
    })
  },
  makeVisible: function () {
    this.$el.css({
      display: "block",
      height: "",
      opacity: ""
    })
  },
  makeNotVisible: function () {
    this.$el.hide()
  },
  setOpacity: function (e) {
    this.$el.css({
      opacity: e
    })
  },
  toggleCSSAnimation: function (e) {}
}), app.views.gallery.TouchGallery = app.views.gallery.SingularGallery.extend({
  initializeXsome: function (e) {
    this._super(arguments), this.$pagination.append("<span/>");
    var t = this.$pagination.children();
    t.length == 1 && t.eq(0).addClass("active")
  },
  show: function () {
    this._super(arguments), this.$el.find(".touched").removeClass("touched")
  },
  onQuarksLoading: function (e) {
    e == 1 && this.$el.append(this.$loadingEl)
  }
}), app.views.gallery.DesktopGallery = app.views.gallery.SingularGallery.extend({
  initializeQuarks: function (e) {
    this._super(arguments), e.find(".quarkPreview").addClass("lazyView fast"), e.find(".hastip").tooltipsy({
      offset: [-1, 0],
      show: function (e, t) {
        t.css({
          left: parseInt(t[0].style.left.replace(/[a-z]/g, ""), 10) - 20 + "px",
          opacity: "0.0",
          display: "block"
        }).animate({
          left: parseInt(t[0].style.left.replace(/[a-z]/g, ""), 10) + 20 + "px",
          opacity: "1.0"
        }, 300)
      },
      hide: function (e, t) {
        t.fadeOut(200)
      }
    })
  },
  onQuarksLoading: function (e) {
    e == 1 && this.$el.append(this.$loadingEl)
  }
}), app.views.gallery.GalleryList = app.views.gallery.AbstractGallery.extend({
  initialize: function (e) {
    this._super(arguments), this.currentUser = e.currentUser, this.socialMenu = e.socialMenu, this.makeQuarkMenu = e.makeQuarkMenu, this.juxMenu = e.makeQuarkMenu, this.galleriesCollection = e.galleriesCollection, this.currentGalleryQuarks = e.currentGalleryQuarks, this.numChildGalleriesLoaded = app.Defaults.galleriesPerPageDefault, this.usersCollection = new app.collections.Users, this.introPanels = [];
    var t = this.$(".galleryRow");
    this.initializeGalleryRows(t), this.$el.on("click", ".quarkPreview", this.onQuarkPreviewClick.createDelegate(this))
  },
  onQuarkPreviewClick: function (e) {
    if ($(e.target).closest("a").length) return;
    location.href = $(e.currentTarget).find("a.quark-link").attr("href")
  },
  initializeGalleryRows: function (e) {
    this.quarksState.set("atNewest", !0), this.lazyViewEnabled && e.filter(":not(.lazyView)").addClass("lazyView fast");
    var t = e.find(".introPanel");
    return t.each(function (e, t) {
      var n = jQuery(t).attr("data-gallery-id"),
        r = this.galleriesCollection.getById(n),
        i = r.get("owner") === this.currentUser,
        s = r.isSubGallery() && i,
        o = new app.views.xsome.IntroPanel({
          el: t,
          currentUser: this.currentUser,
          currentGallery: this.currentGallery,
          appState: this.appState,
          gallery: r,
          galleryQuarks: this.currentGalleryQuarks,
          showFollow: !0,
          showDeleteButton: s,
          preventDefaultQuarkClick: !1,
          hideQuarkActions: !0,
          socialMenu: this.socialMenu,
          makeQuarkMenu: this.makeQuarkMenu,
          juxMenu: this.juxMenu
        });
      o.render(), this.introPanels.push(o)
    }.createDelegate(this)), t
  },
  removeNonHeadings: function () {
    this.$el.find(".galleryRow:not(.galleryHeadingRow)").remove();
    var e = _.without(this.galleriesCollection.getModels(), this.currentGallery);
    this.galleriesCollection.remove(e), this.currentGalleryQuarks.removeAll(), this.numChildGalleriesLoaded = 0
  },
  loadNextPage: function (e) {
    e = e || {};
    var t = this.galleryLoadingDeferred;
    if (!t) {
      this.$el.append(this.$loadingEl);
      var n = this.currentGallery.getUberApiPath() + "?" + jQuery.param({
        per_page: app.Defaults.galleriesPerPageDefault,
        offset: this.numChildGalleriesLoaded
      });
      t = jQuery.ajax({
        url: n,
        dataType: "json",
        success: function (t) {
          this.usersCollection.add(t.quarkOwnersData), this.galleriesCollection.add(t.galleriesData), this.currentGalleryQuarks.add(t.initialQuarks), this.$loadingEl.remove();
          var n = jQuery(_.trim(t.galleriesHtml));
          this.$el.append(n);
          var r = this.initializeGalleryRows(n),
            i = r.length;
          this.numChildGalleriesLoaded += i, i < app.Defaults.galleriesPerPageDefault && this.quarksState.set("atOldest", !0), e.success && e.success.call(e.scope || window)
        },
        error: function () {
          Jux.logError("Error loading new set of galleries.", arguments), e.error && e.error.call(e.scope || window)
        },
        complete: function () {
          this.galleryLoadingDeferred = null
        },
        context: this
      }), this.galleryLoadingDeferred = t
    }
    return t
  }
}), app.views.gallery.HandheldGallery = app.views.gallery.TouchGallery.extend({
  initContinuousScroll: function () {
    var e = this.$scrollEl;
    e.scroll(_.throttle(function () {
      !this.quarksState.isFullyLoaded() && this.$body.height() <= e.scrollTop() + e.innerHeight() && this.loadNextPage()
    }.createDelegate(this), 250))
  }
}), app.views.gallery.TabletGallery = app.views.gallery.TouchGallery.extend({
  trackPageviewAfterContinuousScroll: !1,
  initialize: function (e) {
    this._super(arguments), this.currentPage = 0, this.$galleryNavbar.css("visibility", "hidden"), this.$wrapper = jQuery('<div id="gallery-wrapper"/>'), this.$el.wrap(this.$wrapper), this.$wrapper = jQuery("#gallery-wrapper"), this.$el.css("display", "inline-block");
    var t = this;
    this.scroller = new iScroll("gallery-wrapper", {
      snap: !0,
      momentum: !1,
      hScrollbar: !1,
      onScrollEnd: function () {
        t.paginationEvent(this.currPageX, this.pagesX.length)
      }
    }), jQuery(window).resize(function () {
      t.$el.is(":visible") && (t.scroller.refresh(), t.scroller.scrollToPage(t.currentPage, 0, 400))
    }), this.$el.one("touchstart", function () {
      t.scroller.refresh()
    })
  },
  makeVisible: function () {
    this.$wrapper.css({
      display: "inline-block",
      height: "",
      opacity: ""
    })
  },
  makeNotVisible: function () {
    this.$wrapper.hide()
  },
  paginationEvent: function (e, t) {
    e === t - 1 ? this.loadNextPage() : e === 0 && this.loadNewerQuarks(), e === 0 ? this.$galleryNavbar.css("visibility", "hidden") : this.$galleryNavbar.css("visibility", "visible"), this.currentPage = e;
    var n = this.$pagination.children();
    n.removeClass("active"), n.eq(e).addClass("active"), Jux.Analytics.trackPageView()
  },
  onQuarksLoaded: function (e, t, n) {
    this._super(arguments);
    if (e.length) {
      var r = jQuery(t),
        i = r.find(".xsome"),
        s = i.length,
        o = this.$pagination.children(),
        u, a = this.$el.children().length;
      while (o.length > a) o.first().remove(), o = this.$pagination.children();
      u = this.$el.width() / o.length, n === -1 ? (o.removeClass("active"), o.eq(s - 1).addClass("active"), this.scroller.refresh(), this.scroller.scrollToPage(this.currentPage, 0, 0)) : this.scroller.refresh()
    }
  }
}), app.views.menu.SocialMenu = Jux.extend(ui.Overlay, {
  autoDestroy: !1,
  elId: "socialMenu",
  currentQuark: null,
  menuItems: [],
  initComponent: function () {
    if (!this.hasOwnProperty("currentGallery")) throw new Error("'currentGallery' config required");
    if (!this.hasOwnProperty("currentUser")) throw new Error("'currentUser' config required");
    this.openAnim = {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      duration: 300
    }, this.closeAnim = {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      },
      duration: 300
    }, this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = [{
      name: "like"
    }, {
      name: "repost"
    }, {
      name: "twitter"
    }, {
      name: "facebook"
    }, {
      name: "mail"
    }],
      t = this.currentQuark,
      n;
    t ? n = this.currentQuark.socialUrl() : n = window.location.toString(), n = encodeURIComponent(n);
    var r = JST["menus/socialMenu-html"]({
      quark: this.currentQuark,
      shareItems: e,
      fbConnectUrl: Jux.Hosts.origin + "/auth/facebook/proxy?return_to=" + n,
      signUpUrl: Jux.Hosts.origin + "/users/sign_up?return_to=" + n,
      signInUrl: Jux.Hosts.origin + "/users/sign_in?return_to=" + n
    });
    this.contentEl.html(r), _.each(e, function (e) {
      this.addMenuItem(e.name)
    }, this), this.addMenuItem("user-social-info"), this.$window = Jux.Util.getWindowObject(), this.$commentsContainer = this.contentEl.find("#commentsContainer"), this.$newComment = this.$commentsContainer.find("#newCommentContainer"), this.$window.on("resize", this.updateCommentsHeight.createDelegate(this)), this.$commentsList = this.$commentsContainer.find("#commentsList"), this.$commentsList.on("click", ".removeComment", this.onRemoveCommentClick.createDelegate(this)), this.appState.on({
      "change:currentGallery": function (e, t) {
        this.setCurrentGallery(t)
      },
      "change:currentQuark": this.onQuarkNav,
      scope: this
    }), this.setCurrentGallery(this.appState.get("currentGallery")), this.setCurrentQuark(this.appState.get("currentQuark"))
  },
  showHideNewCommentField: function () {
    this.currentQuark ? (this.newCommentField ? this.newCommentField.show() : this.newCommentField = new ui.formFields.TextAreaField({
      autoGrow: !0,
      inputName: "comment[text]",
      label: this.getNewCommentText(),
      labelPosition: "infield",
      renderTo: this.$newComment,
      cls: "boy",
      listeners: {
        keydown: this.onCommentKeydown,
        scope: this
      }
    }), this.newCommentField.focus()) : this.newCommentField && this.newCommentField.hide()
  },
  open: function () {
    this._super(arguments), this.currentQuark && this.currentQuark.fetchComments(), this.showHideNewCommentField()
  },
  onQuarkNav: function (e, t, n) {
    if (n) {
      var r = n.get("comments");
      r.un("addset", this.onCommentsChange, this), r.un("removeset", this.onCommentsChange, this)
    }
    this.setCurrentQuark(t), this.rendered && (t ? this.onCommentsChange(t.get("comments")) : this.onCommentsChange())
  },
  setCurrentGallery: function (e) {
    _.invoke(this.menuItems, "setGallery", e)
  },
  setCurrentQuark: function (e) {
    this.currentQuark = e;
    var t = this.menuItems;
    for (var n = 0, r = t.length; n < r; n++) t[n].setCurrentQuark(e);
    var i;
    e && (i = e.get("comments"), i.on("addset", this.onCommentsChange, this), i.on("removeset", this.onCommentsChange, this), this.isOpen() && e.fetchComments())
  },
  onCommentsChange: function (e) {
    var t = e ? e.getModels() : [],
      n = _.map(t, function (e) {
        var t = e.getData();
        return t.cid = e.getClientId(), t.text = Autolinker.link(t.text, {
          truncate: 25
        }), t
      }),
      r = !! n.length;
    this.$commentsContainer.toggleClass("hasComments", r), this.newCommentField && this.newCommentField.setLabel(this.getNewCommentText());
    var i = JST["menus/comments-html"]({
      comments: n,
      nl2br: Jux.util.Html.nl2br
    });
    this.$commentsList.html(i);
    var s = this.currentUser;
    if (n.length && s) {
      var o = ".comment";
      !s.get("is_admin") && this.currentQuark.get("owner") !== s && (o += '[data-user-id="' + s.getId() + '"]'), this.$commentsList.find(o).append('<a class="removeComment" href="#" title="Remove Comment"></a>')
    }
    this.updateCommentsHeight()
  },
  getNewCommentText: function () {
    var e;
    if (this.currentQuark) {
      var t = this.currentQuark.get("comments").getCount();
      e = t ? "Share your thoughts!" : "Start the conversation!"
    }
    return e
  },
  updateCommentsHeight: function () {
    if (!Jux.isHandheld) {
      var e = this.$window.height() - this.$commentsContainer.offset().top - 8;
      this.$commentsContainer.css("max-height", e + "px")
    }
  },
  addMenuItem: function (e) {
    var t = _.camelize(_.capitalize(e)),
      n = app.views.menu.menuItem[t],
      r;
    r = new n({
      el: this.contentEl.find('[data-elem="' + e + '"]'),
      currentQuark: this.currentQuark,
      currentUser: this.currentUser,
      gallery: this.currentGallery,
      linkCls: this.shareItemCls,
      parentOverlay: this
    }), r.render(), this.menuItems.push(r)
  },
  onCommentKeydown: function (e, t) {
    var n = jQuery.trim(e.getValue()),
      r = n.length >= app.Comments.maxLength;
    this.$newComment.toggleClass("error", r), t.which === 13 && !t.shiftKey && (n !== "" && !r && (this.currentQuark.addComment(n, this.currentUser), e.setValue(""), e.blur()), t.preventDefault())
  },
  onRemoveCommentClick: function (e) {
    var t = jQuery(e.target).closest(".comment").attr("data-comment-cid");
    this.currentQuark.removeComment(t), e.preventDefault()
  }
}), app.views.menu.GalleryListMenu = Jux.extend(ui.Overlay, {
  autoDestroy: !1,
  elId: "galleryListMenu",
  arrow: {
    side: "top",
    offset: 69
  },
  initComponent: function () {
    if (!this.currentUser) throw new Error("'currentUser' config required");
    this.openAnim = {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      duration: 300
    }, this.closeAnim = {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      },
      duration: 300
    }, this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.currentUser.get("sub_galleries"),
      t = JST["menus/popoverMenu-html"]({
        items: e
      }),
      n = this.getContentTarget();
    n.html(t), n.on("click", ".popover-list-item a", function (e) {
      var t = $(e.target).attr("data-menu-item-id");
      this.fireEvent("galleryclicked", t), this.close(), e.preventDefault()
    }.createDelegate(this))
  },
  updateFeedVisibility: function () {
    var e = this.currentUser;
    e && e.get("following_count") ? this.$feedLink.show() : this.$feedLink.hide()
  }
}), app.views.menu.GalleryListMenuQuarkStrip = Jux.extend(app.views.menu.GalleryListMenu, {
  arrow: {
    side: "bottom",
    offset: 74
  }
}), app.views.menu.JuxMenu = Jux.extend(ui.Overlay, {
  autoDestroy: !1,
  elId: "juxMenu",
  initComponent: function () {
    this.openAnim = {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      duration: 300
    }, this.closeAnim = {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      },
      duration: 300
    }, this.$feedLink = this.contentEl.find("#feedLink"), this.updateFeedVisibility(), this.currentUser && this.currentUser.bind("change:following_count", this.updateFeedVisibility, this), app.views.menu.JuxMenu.superclass.initComponent.call(this)
  },
  afterRender: function () {
    this._super(arguments), this.getContentTarget().children().show()
  },
  updateFeedVisibility: function () {
    var e = this.currentUser;
    e && e.get("following_count") ? this.$feedLink.show() : this.$feedLink.hide()
  }
}), app.views.menu.MakeQuarkMenu = Jux.extend(ui.Overlay, {
  autoDestroy: !1,
  elId: "makeQuarkMenu",
  initComponent: function () {
    if (!(this.appManager instanceof app.managers.AbstractGallery)) throw new Error("'appManager' config required");
    this.openAnim = {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      duration: 300
    }, this.closeAnim = {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      },
      duration: 300
    }, this._super(arguments)
  },
  afterRender: function () {
    this._super(arguments), this.adjustLinksOnMenuItems(), this.getContentTarget().children().show(), this.$el.find(".create-link").click(this.mask.createDelegate(this)), this.$el.find('*[data-elem="createQuarkLink"]').click(this.handleCreateQuark.createDelegate(this))
  },
  setCurrentGallery: function (e) {
    if (!e) return;
    this.currentGallery = e, this.adjustLinksOnMenuItems()
  },
  getUrlPath: function (e) {
    var t = e.split("create-link ")[1],
      n = "",
      r = "",
      i = "";
    return t = t.replace("create-", ""), r = t.replace("-link", ""), r !== "gallery" ? i = "/quarks?" + r + $.param({
      "[gallery_id]": this.currentGallery.get("id"),
      type: r
    }) : i = "/galleries", i
  },
  adjustLinksOnMenuItems: function () {
    if (!this.$el || this.currentGallery.get("type") === "MasterGallery" || !this.appManager.isOwnerGallery()) return;
    this.menuLinks || (this.menuLinks = this.$el.find(".create-link"));
    var e = this;
    this.menuLinks.each(function () {
      var t = e.getUrlPath($(this).attr("class"));
      $(this).attr("href", t)
    })
  },
  handleCreateQuark: function (e) {
    var t = jQuery(e.currentTarget).attr("href");
    return Jux.Analytics.trackCreateQuark(), this.appManager.createQuark(t, {
      success: function () {
        this.unMask(), this.close()
      },
      error: function () {
        this.unMask()
      },
      scope: this
    }), !1
  }
}), app.views.menu.QuarkPreviewMenu = Jux.extend(ui.Component, {
  autoDestroy: !1,
  elId: "quarkPreviewMenu",
  initComponent: function () {
    if (!this.model) throw new Error("'model' config required");
    if (!this.currentUser) throw new Error("'currentUser' config required");
    if (!this.gallery) throw new Error("'gallery' config required");
    this.addEvents("overlaysclose", "repost", "unrepost"), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.getContentTarget(),
      t = jQuery('<div class="quarkPreviewAction likeButtonHolder"></div>'),
      n = jQuery('<div class="quarkPreviewAction repostButtonHolder"></div>');
    e.append(t, n);
    var r = this.likeButton = new app.views.menu.menuItem.Like({
      el: t,
      currentQuark: this.model,
      currentUser: this.currentUser,
      gallery: this.gallery,
      hasTooltip: !0,
      tooltipZIndex: 3e3
    });
    r.render();
    var i = this.repostButton = new app.views.menu.menuItem.Repost({
      el: n,
      currentQuark: this.model,
      currentUser: this.currentUser,
      gallery: this.gallery,
      hasTooltip: !0,
      tooltipZIndex: 3e3,
      galleryListMenuAnchor: {
        my: "left top",
        at: "right top",
        offset: "12 -3"
      }
    });
    i.bind("gallerylistmenuclose", this.onRepostGalleryListClose, this), i.bind("repost", this.onRepost, this), i.bind("unrepost", this.onUnrepost, this), i.render()
  },
  onRepostGalleryListClose: function () {
    this.fireEvent("overlaysclose", this)
  },
  onRepost: function () {
    this.fireEvent("repost", this)
  },
  onUnrepost: function () {
    this.fireEvent("unrepost", this)
  },
  hasOverlayOpen: function () {
    return !!this.repostButton && this.repostButton.isGalleryListMenuOpen()
  }
}), app.views.menu.menuItem.AbstractMenuItem = Backbone.View.extend({
  rendered: !1,
  useMask: !0,
  initialize: function (e) {
    if (!e.gallery) throw new Error("'gallery' config not provided");
    this.currentUser = e.currentUser, this.linkCls = e.linkCls || "", this.parentOverlay = e.parentOverlay, this.setGallery(e.gallery), this.setCurrentQuark(e.currentQuark)
  },
  render: function () {
    this.rendered = !0, this.afterRender()
  },
  afterRender: function () {
    this.updateState()
  },
  setCurrentQuark: function (e) {
    this.currentQuark = e, this.updateSocialUser(), this.rendered && this.render()
  },
  setGallery: function (e) {
    this.gallery = e, this.updateSocialUser()
  },
  updateSocialUser: function () {
    this.currentQuark ? this.socialUser = this.currentQuark.get("owner") : this.gallery && (this.socialUser = this.gallery.get("owner"))
  },
  updateState: function () {
    var e = this.isAvailable() ? "" : "none";
    this.$el.css("display", e)
  },
  isAvailable: function () {
    return !0
  },
  getName: function () {
    return this.$el.attr("data-elem")
  },
  getShareItem: function () {
    return this.currentQuark || this.gallery || null
  }
}), app.views.menu.menuItem.AbstractMenuButton = Class.extend(app.views.menu.menuItem.AbstractMenuItem, {
  className: "popover-list-item",
  events: {
    "click a.menuItem": "onClick"
  },
  buttonLocation: "socialMenu",
  initialize: function (e) {
    this._super(arguments), this.buttonLocation = e.buttonLocation || this.buttonLocation, this.hasTooltip = !! e.hasTooltip, this.tooltipZIndex = e.tooltipZIndex || 2147483647
  },
  render: function () {
    var e = this.linkCls,
      t = this.$el,
      n = t.find(".menuItem").data("tooltipsy");
    n && n.ready && n.destroy(), e += this.isEnabled() ? " enabled" : " disabled";
    var r = JST["menus/menuButton-html"]({
      name: this.getName(),
      title: this.getTitle(),
      hoverTitle: this.getHoverTitle(),
      linkCls: e
    }),
      i = this.$menuItem = jQuery(r);
    t.html(i);
    if (this.hasTooltip) {
      var s = this.tooltipZIndex;
      i.tooltipsy({
        offset: [-1, 0],
        show: function (e, t) {
          t.css("z-index", s), t.css({
            left: parseInt(t[0].style.left.replace(/[a-z]/g, ""), 10) - 20 + "px",
            opacity: "0.0",
            display: "block"
          }).animate({
            left: parseInt(t[0].style.left.replace(/[a-z]/g, ""), 10) + 20 + "px",
            opacity: "1.0"
          }, 300)
        },
        hide: function (e, t) {
          t.fadeOut(200)
        }
      })
    }
    app.views.menu.menuItem.AbstractMenuButton.__super__.render.apply(this, arguments)
  },
  isEnabled: function () {
    return this.isAvailable()
  },
  getName: function () {
    return this.$el.attr("data-elem")
  },
  getTitle: Jux.abstractFn,
  getHoverTitle: function () {
    return this.getTitle()
  },
  onClick: Jux.abstractFn
}), app.views.menu.menuItem.AbstractToggle = app.views.menu.menuItem.AbstractMenuButton.extend({
  initialize: function () {
    this.afterActionDelegate = jQuery.proxy(this.afterAction, this), this._super(arguments)
  },
  onClick: function () {
    this.isEnabled() && (this.useMask && this.mask && (this.mask = this.mask || new ui.Mask(this.$el), this.mask.show()), this.doAction())
  },
  doAction: Jux.abstractFn,
  afterAction: function () {
    this.useMask && this.mask && this.mask.hide(), this.render(), setTimeout(function () {
      this.trigger("clicked")
    }.createDelegate(this), 2e3)
  },
  updateActiveClass: function () {
    this.$("a.menuItem").toggleClass("active", this.isActive())
  },
  updateState: function () {
    app.views.menu.menuItem.AbstractToggle.__super__.updateState.apply(this, arguments), this.isAvailable() && this.updateActiveClass()
  },
  isActive: Jux.abstractFn
}), app.views.menu.menuItem.AbstractQuarkToggle = app.views.menu.menuItem.AbstractToggle.extend({
  isAvailable: function () {
    return !!this.currentQuark
  },
  isEnabled: function () {
    return !!this.currentQuark && this.currentQuark.get("owner") !== this.currentUser
  }
}), app.views.menu.menuItem.Facebook = app.views.menu.menuItem.AbstractMenuButton.extend({
  getTitle: function () {
    return "Share"
  },
  onClick: function () {
    app.Share.facebookShare(this.getShareItem(), this.buttonLocation), this.trigger("clicked")
  }
}), app.views.menu.menuItem.Follow = app.views.menu.menuItem.AbstractToggle.extend({
  getTitle: function () {
    return this.isActive() ? "UnFollow" : "Follow"
  },
  doAction: function () {
    this.socialUser.toggleFollow(this.currentUser, {
      success: this.afterActionDelegate,
      error: this.afterActionDelegate
    })
  },
  isAvailable: function () {
    return this.socialUser && this.socialUser !== this.currentUser
  },
  isActive: function () {
    var e = this.currentUser,
      t = this.socialUser;
    return e && t && e.isFollowing(t)
  }
}), app.views.menu.menuItem.Like = app.views.menu.menuItem.AbstractQuarkToggle.extend({
  getTitle: function () {
    var e = "";
    return this.currentQuark && (e = Jux.util.lang.pluralize(this.currentQuark.get("like_count"), "Like")), e
  },
  getHoverTitle: function () {
    return this.isActive() ? "UnLike" : "Like"
  },
  doAction: function () {
    this.currentQuark.toggleLike({
      success: this.afterActionDelegate,
      error: this.onLikeError.createDelegate(this)
    })
  },
  onLikeError: function (e) {
    this.useMask && this.mask && this.mask.hide()
  },
  setCurrentQuark: function (e) {
    this.currentQuark && this.currentQuark.un("quark_liked_or_not", this.afterActionDelegate), this._super(arguments), this.currentQuark && this.currentQuark.on("quark_liked_or_not", this.afterActionDelegate)
  },
  isActive: function () {
    var e = this.currentQuark;
    return !!e && !! e.get("liked_by_current_user")
  }
}), app.views.menu.menuItem.Mail = app.views.menu.menuItem.AbstractMenuButton.extend({
  getTitle: function () {
    return "Email"
  },
  onClick: function () {
    app.Share.email(this.getShareItem(), this.buttonLocation), this.trigger("clicked")
  }
}), app.views.menu.menuItem.Repost = Class.extend(app.views.menu.menuItem.AbstractQuarkToggle, {
  galleryListMenuAnchor: {
    my: "center top",
    at: "center bottom"
  },
  initialize: function (e) {
    this._super(arguments), e.galleryListMenuAnchor && (this.galleryListMenuAnchor = e.galleryListMenuAnchor)
  },
  getTitle: function () {
    var e = "";
    return this.currentQuark && (e = Jux.util.lang.pluralize(this.currentQuark.get("repost_count"), "Repost")), e
  },
  getHoverTitle: function () {
    return this.isActive() ? "UnRepost" : "Repost"
  },
  doAction: function () {
    var e = this.currentUser,
      t = e.get("sub_galleries");
    this.currentQuark.get("reposted_by_current_user") || t.length === 0 ? this.toggleRepost() : (this.useMask && this.mask && this.mask.hide(), this.galleryListMenu || (this.galleryListMenu = this.createGalleryListMenu()), this.openGalleryListMenu(), this.parentOverlay && this.parentOverlay.setDontCloseOn && this.parentOverlay.setDontCloseOn(this.galleryListMenu.getEl()))
  },
  openGalleryListMenu: function () {
    this.galleryListMenu && this.galleryListMenu.open({
      anchor: _.extend({}, this.galleryListMenuAnchor, {
        of: this.$el
      })
    })
  },
  createGalleryListMenu: function () {
    return new app.views.menu.GalleryListMenu({
      currentUser: this.currentUser,
      listeners: {
        open: this.onGalleryListMenuOpen,
        close: this.onGalleryListMenuClose,
        galleryclicked: this.toggleRepost,
        scope: this
      }
    })
  },
  onGalleryListMenuOpen: function () {
    this.trigger("gallerylistmenuopen", this)
  },
  onGalleryListMenuClose: function () {
    this.trigger("gallerylistmenuclose", this)
  },
  isGalleryListMenuOpen: function () {
    return !!this.galleryListMenu && this.galleryListMenu.isOpen()
  },
  setCurrentQuark: function (e) {
    this.currentQuark && this.currentQuark.un("quark_reposted_or_not", this.afterActionDelegate), this._super(arguments), this.currentQuark && this.currentQuark.on("quark_reposted_or_not", this.afterActionDelegate)
  },
  toggleRepost: function (e) {
    this.useMask && this.mask && this.mask.show(), this.currentQuark.toggleRepost({
      success: this.afterActionDelegate,
      error: this.afterActionDelegate,
      gallery_id: e
    })
  },
  isEnabled: function () {
    return !!this.currentUser && !! app.views.menu.menuItem.AbstractQuarkToggle.prototype.isEnabled.call(this)
  },
  isActive: function () {
    var e = this.currentQuark;
    return e && e.get("reposted_by_current_user")
  },
  afterAction: function () {
    this._super(arguments), this.trigger(this.isActive() ? "repost" : "unrepost", this)
  }
}), app.views.menu.menuItem.RepostQuarkStrip = Class.extend(app.views.menu.menuItem.Repost, {
  galleryListMenuAnchor: {
    my: "center top",
    at: "center bottom"
  },
  createGalleryListMenu: function () {
    return new app.views.menu.GalleryListMenuQuarkStrip({
      currentUser: this.currentUser,
      listeners: {
        open: this.onGalleryListMenuOpen,
        close: this.onGalleryListMenuClose,
        galleryclicked: this.toggleRepost,
        scope: this
      }
    })
  },
  hide: function () {
    this.closeGalleryMenu()
  },
  closeGalleryMenu: function () {
    this.galleryListMenu && this.galleryListMenu.close()
  }
}), app.views.menu.menuItem.Twitter = app.views.menu.menuItem.AbstractMenuButton.extend({
  getTitle: function () {
    return "Tweet"
  },
  onClick: function () {
    app.Share.tweet(this.getShareItem(), this.buttonLocation), this.trigger("clicked")
  }
}), app.views.menu.menuItem.UserSocialInfo = app.views.menu.menuItem.AbstractMenuItem.extend({
  render: function () {
    var e = this.socialUser,
      t = JST["menus/userSocialInfo-html"]({
        followersUrl: e.getFollowersUrl(),
        followingUrl: e.getFollowingUrl(),
        galleryUrl: e.get("gallery_url"),
        userData: e.getData()
      });
    this.$el.html(t);
    var n = this.$('[data-elem="follow"]'),
      r = this.followButton;
    r ? r.setElement(n) : (r = new app.views.menu.menuItem.Follow({
      el: n,
      currentQuark: this.currentQuark,
      currentUser: this.currentUser,
      gallery: this.gallery,
      linkCls: this.shareItemCls,
      parentOverlay: this.parentOverlay
    }), this.followButton = r), r.render(), app.views.menu.menuItem.UserSocialInfo.__super__.render.apply(this, arguments)
  },
  setCurrentQuark: function (e) {
    app.views.menu.menuItem.UserSocialInfo.__super__.setCurrentQuark.apply(this, arguments), this.rendered && this.followButton.setCurrentQuark(e)
  },
  setGallery: function (e) {
    app.views.menu.menuItem.UserSocialInfo.__super__.setGallery.apply(this, arguments), this.rendered && this.followButton.setGallery(e)
  },
  updateSocialUser: function () {
    this.socialUser && this.socialUser.unbind("change", this.render, this), app.views.menu.menuItem.UserSocialInfo.__super__.updateSocialUser.apply(this, arguments), this.socialUser && this.socialUser.bind("change", this.render, this)
  },
  isAvailable: function () {
    return !!this.socialUser
  }
}), app.views.navBar.NavThumbstrip = ui.Container.extend({
  elId: "navThumbstrip",
  userIsScrolling: !1,
  hideLeftHotSpotCls: "atLeftEdge",
  hideRightHotSpotCls: "atRightEdge",
  isVisible: !1,
  hasTitlePanel: !0,
  attemptedToFillWidth: !1,
  wasAbleToLoadQuarksInDirection: {
    older: !0,
    newer: !0
  },
  loadDirections: {
    older: "older",
    newer: "newer"
  },
  initComponent: function () {
    if (!this.currentGallery) throw new Error("'currentGallery' config required");
    if (!this.currentGalleryQuarks) throw new Error("'currentGalleryQuarks' config required");
    this.items = {
      id: "navThumbstripScroller",
      elId: "navThumbstripScroller",
      items: [{
        cls: "scrollingHotSpot scrollingHotSpotLeft"
      }, {
        cls: "scrollingHotSpot scrollingHotSpotRight"
      }, {
        id: "scrollWrapper",
        cls: "scrollWrapper",
        items: [{
          id: "scrollArea",
          cls: "scrollableArea"
        }]
      }]
    }, this._super(arguments), this._previewsByQuarkId = {}
  },
  afterRender: function () {
    this._super(arguments), this.scroller = this.findById("navThumbstripScroller"), this.scrollArea = this.findById("scrollArea"), this.renderQuarks(this.currentGalleryQuarks.getModels()), this.attachCurrentGalleryEvents(), this.scrollArea.on("render", this.onScrollAreaRendered, this), this.appState.on("change:currentQuark", this.onQuarkNav, this)
  },
  setCurrentGallery: function (e) {
    this.currentGallery = e, this.clearThumbstrip(), this.renderQuarks(this.currentGalleryQuarks.getModels()), this.setIsVisible(!1), this.galleryTitlePanel && this.galleryTitlePanel.setCurrentGallery(e), this.attemptedToFillWidth = !1, this.wasAbleToLoadQuarksInDirection = {
      older: !0,
      newer: !0
    }, this.adjustThumbstripForPanels(), this.enableHoverBars(0), this.addMorePreviews(this.loadDirections.newer)
  },
  clearThumbstrip: function () {
    this._previewsByQuarkId = {}, this.scrollArea.removeAll()
  },
  attachCurrentGalleryEvents: function () {
    this.currentGalleryQuarks.on({
      quarksLoading: this.showLoadingSpinner,
      quarksLoaded: this.onQuarksLoaded,
      addset: this.onQuarkAdded,
      removeset: this.removeTheseQuarks,
      addingFetchedQuarks: this.onAddingFetchedQuarks,
      finishedAddingFetchedQuarks: this.onFinishedAddingFetchedQuarks,
      newlyCreatedQuark: this.onQuarkCreated,
      quarkLoadError: this.onErrorLoadingQuarks,
      scope: this
    })
  },
  setIsVisible: function (e) {
    this.isVisible = e, this.hoverScroller && this.hoverScroller.setIsVisible(e), this.socialPanel && this.socialPanel.setIsVisible(e)
  },
  onAddingFetchedQuarks: function () {
    this.preventAddSetCallback = !0
  },
  onFinishedAddingFetchedQuarks: function () {
    this.preventAddSetCallback = !1
  },
  onScrollAreaRendered: function () {
    this.setupScroller(), this.setupNavPanel(), this.setupSocialPanel(), this.adjustThumbstripForPanels(), this.setupMouseEvents()
  },
  onErrorLoadingQuarks: function (e, t) {
    this.wasAbleToLoadQuarksInDirection[e] = !1, this.hideLoadingSpinner()
  },
  onQuarkAdded: function (e, t) {
    if (this.preventAddSetCallback) return;
    this.renderQuarks(t, 1), this.enableHoverBars(0)
  },
  onQuarkCreated: function (e) {
    if (!e) return;
    var t = e.getId();
    this._previewsByQuarkId[t] && this.removePreviewById(t), this.renderQuarks([e], -1)
  },
  setupNavPanel: function () {
    if (this.disableTitlePanel) return;
    this.galleryTitlePanel = new app.views.navBar.GalleryTitlePanel({
      currentGallery: this.currentGallery,
      listeners: {
        showingLeftPanel: this.showingLeftPanel,
        hidingLeftPanel: this.hidingLeftPanel,
        scope: this
      }
    }), this.insert(this.galleryTitlePanel, 0)
  },
  setupSocialPanel: function () {
    if (this.disableSocialPanel) return;
    this.socialPanel = new app.views.navBar.SocialPanel({
      appState: this.appState,
      currentGallery: this.currentGallery,
      currentQuark: this.currentQuark,
      currentUser: this.currentUser,
      listeners: {
        showingRightPanel: this.showingRightPanel,
        scope: this
      }
    }), this.insert(this.socialPanel, Infinity)
  },
  setupMouseEvents: function () {
    this.$el.on({
      mouseenter: function () {
        this.trigger("showThumbstrip")
      }.createDelegate(this)
    })
  },
  showingLeftPanel: function () {
    this.isShowingLeftPanel = !0, this.setupWindowResizeBinding()
  },
  hidingLeftPanel: function () {
    this.isShowingLeftPanel = !1, this.adjustThumbstripForPanels()
  },
  showingRightPanel: function () {
    this.isShowingRightPanel = !0, this.setupWindowResizeBinding()
  },
  setupWindowResizeBinding: function () {
    if (!this.onWindowResize) {
      var e = Jux.Util.getWindowObject();
      this.onWindowResize = _.debounce(this.adjustThumbstripForPanels.createDelegate(this), 50), e.bind("resize", this.onWindowResize)
    }
  },
  adjustThumbstripForPanels: function () {
    var e = this.scroller.getEl(),
      t = Jux.Util.getAndUpdateWindowSize().width,
      n = 0;
    this.isShowingLeftPanel && (n += this.galleryTitlePanel.getEl().outerWidth()), this.isShowingRightPanel && (n += this.socialPanel.getEl().outerWidth()), e.css("width", t - n - 1 + "px"), this.updateHoverScroller()
  },
  showLoadingSpinner: function (e) {
    var t;
    e === -1 ? t = this.currentGalleryQuarks.getFirst() : t = this.currentGalleryQuarks.getLast(), this.continuousScrollSpinner && this.hideLoadingSpinner(), t && (this.continuousScrollSpinner = this._previewsByQuarkId[t.id], this.continuousScrollSpinner && this.continuousScrollSpinner.showSpinner())
  },
  hideLoadingSpinner: function () {
    this.continuousScrollSpinner && (this.continuousScrollSpinner.removeSpinner(), this.continuousScrollSpinner = null)
  },
  onQuarksLoaded: function (e, t, n) {
    this.hideLoadingSpinner(), this.attemptedToFillWidth && this.loadedQuarksForDirection(e.length > 0, this.convertDirectionNumberToString(n)), e.length > 0 ? (this.renderQuarks(e, n), this.disableHoverBars(n), setTimeout(function () {
      this.enableHoverBars(n), this.showHoverBarsIfEnoughContent()
    }.createDelegate(this), 400)) : n === 1 && this.hoverScroller ? this.hoverScroller.isAtEndOfScroll() && (this.disableHoverBars(n), this.determineIfEnoughContentForHoverBars() && this.enableHoverBars(-1)) : this.disableHoverBars(n)
  },
  loadedQuarksForDirection: function (e, t) {
    t === this.loadDirections.newer && (this.wasAbleToLoadQuarksInDirection.newer = e), t === this.loadDirections.older && (this.wasAbleToLoadQuarksInDirection.older = e)
  },
  canLoadQuarksForDirection: function (e) {
    return this.attemptedToFillWidth !== !0 ? (this.attemptedToFillWidth = !0, !0) : e === "older" && this.wasAbleToLoadQuarksInDirection[e] ? !0 : e === "newer" && this.wasAbleToLoadQuarksInDirection[e] ? !0 : !1
  },
  setupScroller: function () {
    this.hoverScroller = new ui.utils.SmoothDivScroll({
      $el: this.scroller.getEl(),
      scroller: this.scroller,
      options: {
        initialOffset: 10
      }
    }), this.hoverScroller.on({
      leftLimitHit: this.scrollerLeftLimitHit,
      rightLimitHit: this.scrollerRightLimitHit,
      scope: this
    }), this.hoverScroller.setIsVisible(this.isVisible)
  },
  showHoverBarsIfEnoughContent: function () {
    if (!this.hoverScroller) return;
    this.hoverScroller.showHoverBarsIfEnoughContent()
  },
  enableHoverBars: function () {
    if (!this.hoverScroller) return;
    this.hoverScroller.enableHoverBars.apply(this.hoverScroller, arguments)
  },
  updateHoverScroller: function () {
    if (!this.hoverScroller) return;
    this.hoverScroller.updateHoverScroller.apply(this.hoverScroller, arguments)
  },
  updateScrollerPosition: function () {
    if (!this.hoverScroller) return;
    this.hoverScroller.updateScrollerPosition.apply(this.hoverScroller, arguments)
  },
  disableHoverBars: function (e) {
    this.hoverScroller.disableHoverBars(e)
  },
  determineIfEnoughContentForHoverBars: function () {
    return this.hoverScroller.determineIfEnoughContentForHoverBars()
  },
  show: function () {
    this.adjustThumbstripForPanels(), this.addMorePreviews(this.loadDirections.newer), this._super(arguments)
  },
  scrollerLeftLimitHit: function () {
    this.isVisible && this.loadQuarks(this.loadDirections.newer)
  },
  scrollerRightLimitHit: function () {
    this.isVisible && this.loadQuarks(this.loadDirections.older)
  },
  getIsUserScrolling: function () {
    return this.hoverScroller.getIsUserScrolling()
  },
  addMorePreviews: function (e) {
    if (!this.isVisible) return;
    var t = this.thumbstripIsFilled(),
      n = this,
      r, i;
    this.canLoadQuarksForDirection(e) || (e = this.getOppositeLoadDirection(e)), !t && this.canLoadQuarksForDirection(e) && (r = this.loadQuarks(e), r.always(function () {
      i = n.getOppositeLoadDirection(e), n.canLoadQuarksForDirection(i) || (i = e), n.addMorePreviews(e)
    }))
  },
  getOppositeLoadDirection: function (e) {
    return e === this.loadDirections.newer ? this.loadDirections.older : this.loadDirections.newer
  },
  convertDirectionNumberToString: function (e) {
    if (e === -1) return this.loadDirections.newer;
    if (e === 1) return this.loadDirections.older
  },
  thumbstripIsFilled: function () {
    var e = this.hoverScroller.getScrollableAreaWidth(),
      t = this.getWidth(),
      n = e >= t;
    return n
  },
  loadQuarks: function (e) {
    return this.currentGalleryQuarks.areQuarksLoading() && this.currentGalleryQuarks.getLoadingDirection()[e] ? this.currentGalleryQuarks.getDeferredForDirection(e) : this.canLoadQuarksForDirection(e) ? this.currentGalleryQuarks.load(e) : new jQuery.Deferred
  },
  renderQuarks: function (e, t) {
    var n;
    t = t || 1, didMakeAPreview = !1, didDeleteAPreview = !1, this.hoverScroller && t === -1 && (n = this.hoverScroller.getScrollableAreaWidth()), didMakeAPreview = this.createMultiplePreviews(e, t), didDeleteAPreview = this.removeDeletedQuarks(), this.scrollArea.doLayout();
    if (didMakeAPreview || didDeleteAPreview) this.updateHoverScroller(), this.updateScrollerPosition(t, n);
    this.setCurrentQuark(this.appState.get("currentQuark")), e.length === 1 && this.showHoverBarsIfEnoughContent()
  },
  createMultiplePreviews: function (e, t) {
    var n, r = !1;
    if (t === 1)
      for (n = 0, len = e.length; n < len; n++) r = this.createOnePreview(e[n], t) || r;
    if (t === -1)
      for (n = e.length - 1; n >= 0; n--) r = this.createOnePreview(e[n], t) || r;
    return r
  },
  createOnePreview: function (e, t) {
    var n = e.getId(),
      r, i, s;
    return this._previewsByQuarkId[n] ? !1 : (r = new app.views.navBar.ThumbstripQuarkPreview({
      currentGallery: this.currentGallery,
      quark: e,
      listeners: {
        click: this.onPreviewClick,
        scope: this
      }
    }), t === -1 ? (s = 0, i = "beginning") : (s = Infinity, i = "end"), this.scrollArea.add(r, {
      position: s,
      keepLayout: !0
    }), this.hoverScroller && this.hoverScroller.addElement(r.getEl(), i), this._previewsByQuarkId[n] = r, !0)
  },
  scrollToQuark: function (e) {
    if (!this.hoverScroller || !e) return;
    var t = this._previewsByQuarkId[e.id],
      n;
    t && t !== this.currentQuark && (this.currentQuark = t, n = t.getEl(), n && this.hoverScroller.scrollToElement(n))
  },
  removeDeletedQuarks: function () {
    var e = this.currentGalleryQuarks,
      t = !1;
    for (var n in this._previewsByQuarkId) this._previewsByQuarkId.hasOwnProperty(n) && (e.getById(n) || (t = this.removePreviewById(n) || t));
    return t
  },
  removePreviewById: function (e) {
    return this._previewsByQuarkId[e] ? (this.currentQuark === this._previewsByQuarkId[e] && (this.currentQuark = null), this.scrollArea.remove(this._previewsByQuarkId[e]), delete this._previewsByQuarkId[e], !0) : !1
  },
  removeTheseQuarks: function (e, t) {
    for (var n = 0, r = t.length; n < r; n++) {
      var i = t[n].getId();
      this.removePreviewById(i)
    }
    r && this.updateHoverScroller()
  },
  onPreviewClick: function (e, t) {
    var n = e.getQuark();
    this.appState.set("currentQuark", n), t.preventDefault()
  },
  onQuarkNav: function (e, t, n) {
    if (n) {
      var r = this._previewsByQuarkId[n.getId()];
      r && r.removeCls("current")
    }
    this.setCurrentQuark(t)
  },
  setCurrentQuark: function (e) {
    if (e) {
      var t = this._previewsByQuarkId[e.getId()];
      t && (t.addCls("current"), this.mouseIsHovering() || this.scrollToQuark(e))
    }
  },
  mouseIsHovering: function () {
    if (!this.isRendered()) return !1;
    var e = Jux.Util.getViewportSize().height,
      t = this.getHeight(),
      n = Jux.Util.getMousePosition().y;
    return n >= e - t && n <= e ? !0 : !1
  },
  onDestroy: function () {
    var e = Jux.Util.getWindowObject();
    this.hoverScroller && this.hoverScroller.destroy(), this.currentGalleryQuarks && this.currentGalleryQuarks.un({
      quarksLoading: this.showLoadingSpinner,
      quarksLoaded: this.onQuarksLoaded,
      addset: this.onQuarkAdded,
      removeset: this.removeTheseQuarks,
      addingFetchedQuarks: this.onAddingFetchedQuarks,
      finishedAddingFetchedQuarks: this.onFinishedAddingFetchedQuarks,
      quarkLoadError: this.onErrorLoadingQuarks
    }), e.unbind("resize", this.onWindowResize), this._super(arguments)
  }
}), app.views.navBar.NavBar = Backbone.View.extend({
  menuPositionOffset: "-5 10",
  arrowOffset: -19,
  initialize: function (e) {
    this.$window = Jux.Util.getWindowObject(), this.$titleEl = this.$el.find(".title");
    var t = this.$shareButton = this.$el.find("a.nav-share"),
      n = this.$addButton = this.$el.find("a.nav-add"),
      r = this.$juxButton = this.$el.find("a.nav-user");
    this.socialMenu = e.socialMenu, this.makeQuarkMenu = e.makeQuarkMenu, this.juxMenu = e.juxMenu, this.activationEvent = Jux.isTouch ? "touchstart" : "click", t.bind(this.activationEvent, this.onShareButtonClick.createDelegate(this)), n.bind(this.activationEvent, this.onAddButtonClick.createDelegate(this)), r.bind(this.activationEvent, this.onJuxButtonClick.createDelegate(this)), this.socialMenu.addListener({
      openbegin: function () {
        t.addClass("nav-selected")
      },
      closebegin: function () {
        t.removeClass("nav-selected")
      }
    }), this.makeQuarkMenu.addListener({
      openbegin: function () {
        n.addClass("nav-selected")
      },
      closebegin: function () {
        n.removeClass("nav-selected")
      }
    }), this.juxMenu.addListener({
      openbegin: function () {
        r.addClass("nav-selected")
      },
      closebegin: function () {
        r.removeClass("nav-selected")
      }
    })
  },
  openSocialMenu: function () {
    var e = parseInt(this.menuPositionOffset.split(" ")[0], 10),
      t = this.$juxButton.offset().left,
      n = this.$shareButton.offset().left,
      r = t - n + Math.round(this.$shareButton.width() / 2) + e + this.arrowOffset;
    this.socialMenu.setArrow({
      side: "top",
      offset: -1 * r
    }), this.socialMenu.open({
      anchor: {
        my: "right top",
        at: "right bottom",
        of: this.$juxButton,
        offset: this.menuPositionOffset
      },
      dontCloseOn: this.$shareButton
    })
  },
  closeSocialMenu: function (e) {
    this.socialMenu.close(e)
  },
  openMakeQuarkMenu: function () {
    var e = parseInt(this.menuPositionOffset.split(" ")[0], 10),
      t = this.$addButton,
      n = this.$juxButton.offset().left + this.$juxButton.width(),
      r = t.offset().left + this.$addButton.width(),
      i = t.find('*[data-elem="icon"]').outerWidth(!0),
      s = t.find('*[data-elem="text"]'),
      o = s.css("display") !== "none" ? s.outerWidth(!0) : 0,
      u = n - r + o + Math.round(i / 2) + e + this.arrowOffset;
    this.makeQuarkMenu.setArrow({
      side: "top",
      offset: -1 * u
    }), this.makeQuarkMenu.open({
      anchor: {
        my: "right top",
        at: "right bottom",
        of: this.$juxButton,
        offset: this.menuPositionOffset
      },
      dontCloseOn: this.$addButton
    })
  },
  closeMakeQuarkMenu: function (e) {
    this.makeQuarkMenu.close(e)
  },
  openJuxMenu: function () {
    var e = parseInt(this.menuPositionOffset.split(" ")[0], 10),
      t = Math.round(this.$juxButton.width() / 2) + e + this.arrowOffset;
    this.juxMenu.setArrow({
      side: "top",
      offset: -1 * t
    }), this.juxMenu.open({
      anchor: {
        my: "right top",
        at: "right bottom",
        of: this.$juxButton,
        offset: this.menuPositionOffset
      },
      dontCloseOn: this.$juxButton
    })
  },
  closeJuxMenu: function (e) {
    this.juxMenu.close(e)
  },
  hideMenus: function () {
    this.closeSocialMenu({
      animate: !1
    }), this.closeMakeQuarkMenu({
      animate: !1
    }), this.closeJuxMenu({
      animate: !1
    })
  },
  onShareButtonClick: function (e) {
    e.preventDefault(), e.stopPropagation(), this.socialMenu.isOpen() ? this.closeSocialMenu() : this.openSocialMenu()
  },
  onAddButtonClick: function (e) {
    e.preventDefault(), e.stopPropagation(), this.makeQuarkMenu.isOpen() ? this.closeMakeQuarkMenu() : this.openMakeQuarkMenu()
  },
  onJuxButtonClick: function (e) {
    e.preventDefault(), e.stopPropagation(), this.juxMenu.isOpen() ? this.closeJuxMenu() : this.openJuxMenu()
  }
}), app.views.navBar.GalleryNavBar = app.views.navBar.NavBar.extend({
  initialize: function (e) {
    app.views.navBar.GalleryNavBar.__super__.initialize.apply(this, arguments);
    if (!e.gallery) throw new Error("'gallery' config required");
    this.currentGallery = e.gallery, this.currentGallery.bind("change:title", this.onTitleChange, this)
  },
  onTitleChange: function (e, t) {
    this.$titleEl.text(t)
  }
}), app.views.navBar.GalleryTakeoverNavBar = app.views.navBar.GalleryNavBar.extend({
  menuPositionOffset: "8 13",
  buttonDisabledCls: "ui-state-disabled",
  buttonNoMoreCls: "no-more",
  hidden: !1,
  events: _.extend({}, app.views.navBar.GalleryNavBar.prototype.events, {
    "click .juxTitle": "onHideClick",
    "click #closeGalleryTakeover": "onHideClick",
    "touchstart .juxTitle": "onHideClick",
    "touchstart #closeGalleryTakeover": "onHideClick"
  }),
  initialize: function (e) {
    app.views.navBar.GalleryTakeoverNavBar.__super__.initialize.apply(this, arguments), this.height = this.$el.outerHeight(), this.$nav = this.$el.find(".nav"), this.$commentCount = this.$shareButton.find(".commentCount");
    var t = this.$el.find("#takeover-actions");
    this.$takeoverActions = t, this.appState = e.appState, this.$juxTitle = this.$el.find(".juxTitle"), this.$parentGalleryTitle = this.$el.find(".parent-gallery-title"), Jux.isTouch && this.$el.css({
      "-webkit-transition": "opacity 0.15s ease-in-out",
      transition: "opacity 0.15s ease-in-out",
      "-webkit-perspective": "1000",
      opacity: 1,
      display: "block"
    }), this.$authorEl = this.$(".authordisplayname"), this.setCurrentGallery(e.gallery);
    var n = this.currentGallery.get("owner");
    n && n.bind("change:displayname", this.onOwnerDisplaynameChange, this), this.appState.on("change:currentQuark", this.onQuarkNav, this), this.setCurrentQuark(this.getCurrentQuark())
  },
  setCurrentGallery: function (e) {
    this.currentGallery = e
  },
  onOwnerDisplaynameChange: function (e, t) {
    this.$authorEl.html(t)
  },
  hideGalleryTitle: function () {
    this.$parentGalleryTitle.removeClass("parent-gallery-title-dash"), this.$juxTitle.hide()
  },
  showGalleryTitle: function () {
    this.$parentGalleryTitle.addClass("parent-gallery-title-dash"), this.$juxTitle.show()
  },
  getEl: function () {
    return this.$el
  },
  isHidden: function () {
    return this.hidden
  },
  onHideClick: function (e) {
    typeof e.preventDefault == "function" && e.preventDefault();
    var t = "currentTarget" in e ? jQuery(e.currentTarget) : jQuery(e);
    t.hasClass(this.buttonDisabledCls) || this.appState.set("currentQuark", null)
  },
  onQuarkNav: function (e, t, n) {
    n && n.un("change:comment_count", this.updateCommentCount, this), this.setCurrentQuark(t)
  },
  setCurrentQuark: function (e) {
    e && e.on("change:comment_count", this.updateCommentCount, this), this.updateCommentCount()
  },
  getCurrentQuark: function () {
    return this.appState.get("currentQuark")
  },
  updateCommentCount: function () {
    var e = this.getCurrentQuark(),
      t = e ? e.get("comment_count") : 0;
    this.$shareButton.toggleClass("hasComments", !! t), this.$commentCount.text(t || "")
  },
  show: function () {
    this.hidden && (Jux.isTouch ? (this.$el.css("opacity", 1), this.$nav.css("pointer-events", ""), this.$takeoverActions.css("pointer-events", "")) : this.$el.stop(!0, !0).effect("fade", {
      easing: "easeInExpo",
      mode: "show"
    }, "1000ms"), this.hidden = !1)
  },
  hide: function () {
    !this.hidden && !this.menuIsOpen() && (!this.$el.is(":visible") && !Jux.isTouch ? this.$el.css("display", "none") : Jux.isTouch ? (this.$el.css("opacity", 0), this.$nav.css("pointer-events", "none"), this.$takeoverActions.css("pointer-events", "none")) : this.$el.stop(!0, !0).effect("fade", {
      easing: "easeOutExpo",
      mode: "hide"
    }, "150ms"), this.hidden = !0)
  },
  menuIsOpen: function () {
    return this.makeQuarkMenu.isOpen() || this.socialMenu.isOpen() || this.juxMenu.isOpen()
  }
}), app.views.navBar.GalleryTitlePanel = ui.Container.extend({
  cls: "navPanelContainer",
  initComponent: function () {
    if (!this.currentGallery) throw new Error("'this.currentGallery' config required");
    this.items = {
      id: "subGalleryTitle",
      type: "label",
      elType: "a",
      cls: "subGalleryTitle"
    }, this.on("afterLayout", this.afterLayout, this), this._super(arguments)
  },
  setCurrentGallery: function (e) {
    this.currentGallery = e, this.setupLeftNav()
  },
  afterLayout: function () {
    this.galleryTitle = this.findById("subGalleryTitle"), this.setupLeftNav()
  },
  setupLeftNav: function () {
    this.currentGallery && this.currentGallery.isSubGallery() ? (this.$el.show(), this.currentGallery.on("change:title", this.updateGalleryTitle, this), this.updateGalleryTitle(), this.fireEvent("showingLeftPanel", this.$el)) : (this.$el.hide(), this.fireEvent("hidingLeftPanel", this.$el))
  },
  updateGalleryTitle: function () {
    this.galleryTitle.setText(this.currentGallery.get("title")), this.galleryTitle.setAttr("href", this.currentGallery.get("url"))
  },
  onDestroy: function () {
    this._super(arguments), this.currentGallery.un("change:title", this.updateGalleryTitle)
  }
}), app.views.navBar.SocialPanel = ui.Container.extend({
  cls: "navPanelContainer socialPanelContainer",
  socialItemsToRender: ["like", "repost", "twitter", "facebook"],
  socialMenuItems: [],
  socialMenuItemsHash: {},
  buttonLocation: "quarkStrip",
  isVisible: !1,
  initComponent: function () {
    if (!this.currentGallery) throw new Error("'this.currentGallery' config required");
    this.items = {
      cls: "socialPanel",
      items: [{
        cls: "shareActions",
        items: [{
          cls: "shareActions-inner",
          items: this.createPalleteObjects(this.socialItemsToRender)
        }]
      }]
    }, this.on("afterLayout", this.afterLayout, this), this._super(arguments), this.appState.on("change:currentQuark", this.setCurrentQuark, this)
  },
  afterLayout: function () {
    this.galleryTitle = this.findById("subGalleryTitle"), this.setupSocialActions(), this.$el.show()
  },
  setCurrentQuark: function () {
    var e = this.appState.get("currentQuark");
    e !== null && _.each(this.socialMenuItems, function (t) {
      t.setCurrentQuark(e)
    })
  },
  createPalleteObject: function (e) {
    return {
      cls: "shareAction",
      id: e,
      attr: {
        "data-elem": e
      }
    }
  },
  createPalleteObjects: function (e) {
    var t = _.map(e, this.createPalleteObject);
    return t
  },
  createSocialAction: function (e) {
    var t = _.capitalize(e);
    app.views.menu.menuItem[t + "QuarkStrip"] && (t += "QuarkStrip");
    var n = new app.views.menu.menuItem[t]({
      el: this.$el.find('[data-elem="' + e + '"]'),
      appState: this.appState,
      currentQuark: this.appState.get("currentQuark"),
      currentUser: this.currentUser,
      gallery: this.currentGallery,
      linkCls: "",
      parentOverlay: this,
      buttonLocation: this.buttonLocation
    });
    return n.render(), n
  },
  createSocialActions: function () {
    _.each(this.socialItemsToRender, function (e) {
      var t = this.findById(e),
        n = t.getEl(),
        r = this.createSocialAction(e);
      this.socialMenuItems.push(r), this.socialMenuItemsHash[e] = r
    }, this)
  },
  onVisible: Jux.emptyFn,
  onNotVisible: function () {
    this.socialMenuItemsHash.repost && this.socialMenuItemsHash.repost.hide()
  },
  setupSocialActions: function () {
    this.createSocialActions(), this.trigger("showingRightPanel")
  },
  setCurrentGallery: function (e) {
    this.currentGallery = e
  },
  setIsVisible: function (e) {
    this.isVisible = e, e ? this.onVisible() : this.onNotVisible()
  }
}), app.views.navBar.ThumbstripQuarkPreview = ui.Container.extend({
  cls: "thumbstripQuarkPreview",
  imgWidth: 124,
  imgHeight: 82,
  iconClassPrefix: "icons-v2",
  initComponent: function () {
    var e = this.quark;
    if (!e) throw new Error("'quark' config required");
    if (!this.currentGallery) throw new Error("CurrentGallery not set");
    this.addEvents("click"), this.attr = {
      "data-href": e.viewingUrl(this.currentGallery)
    }, this.items = {
      cls: "thumbstripQuarkPreviewInner",
      items: [{
        elType: "div",
        id: "bgImage",
        width: this.imgWidth,
        height: this.imgHeight
      }, {
        cls: "insetBorder"
      }, {
        cls: "insetBackground"
      }, {
        cls: "quarkText",
        items: {
          cls: "quarkText-table",
          items: {
            cls: "quarkText-row",
            items: {
              id: "quarkTextClamp",
              cls: "quarkText-clamp",
              items: {
                cls: "thumbstripQuarkDisplayname",
                id: "quarkDisplayname"
              }
            }
          }
        }
      }, {
        id: "icon",
        cls: this.iconClassPrefix + " " + this.iconClassPrefix + "-" + e.get("type")
      }]
    }, this._super(arguments), this.displayname = this.findById("quarkDisplayname"), this.icon = this.findById("icon"), this.addCls(e.get("type")), this.updateQuarkDisplayname(), this.updateIcon(), e.on("change:displayname", this.updateQuarkDisplayname, this), e instanceof app.models.Countdown && e.on("change:numSlides", this.updateIcon, this), e.on("change:background_picture", this.updateBgImage, this), this.quark = e
  },
  afterRender: function () {
    this._super(arguments), this.addCls("loaded"), this.$el.on("click", this.onClick.createDelegate(this)), this.bgImage = this.findById("bgImage"), this.bgImage.on("render", this.updateBgImage, this)
  },
  updateBgImage: function () {
    this.bgImage && (this.$bgImage = this.bgImage.getEl(), this.$bgImage && this.$bgImage.fillmore({
      src: this.quark.getPreviewPicture().getThumbUrl(this.imgWidth, this.imgHeight, !0)
    }))
  },
  getQuark: function () {
    return this.quark
  },
  showSpinner: function () {
    var e = this.icon.getEl();
    if (!e) return;
    e.addClass(this.iconClassPrefix + "-spinner"), e.removeClass(this.iconClassPrefix + "-" + this.quark.get("type")), e.removeClass(this.iconClassPrefix)
  },
  removeSpinner: function () {
    var e = this.icon.getEl();
    if (!e) return;
    e.removeClass(this.iconClassPrefix + "-spinner"), e.addClass(this.iconClassPrefix + "-" + this.quark.get("type") + " " + this.iconClassPrefix)
  },
  updateQuarkDisplayname: function () {
    var e = this.displayname,
      t = Jux.Util.condense(this.quark.get("displayname"));
    e.update(t), this.toggleCls("hasDisplayname", !! t), this.toggleCls("noDisplayname", !t), e.isRendered() ? this.clampDisplayname() : e.on("render", this.clampDisplayname, this)
  },
  updateIcon: function () {
    var e;
    switch (this.quark.get("type")) {
    case "blockquote":
      e = "’’";
      break;
    case "countdown":
      e = this.quark.get("numSlides").toString();
      break;
    default:
      e = ""
    }
    this.icon.update(e)
  },
  clampDisplayname: function () {
    Jux.util.Html.clamp(this.displayname.getEl())
  },
  onClick: function (e) {
    this.trigger("click", this, e)
  },
  onDestroy: function () {
    this.quark.un("change:displayname", this.updateQuarkDisplayname, this), this._super(arguments)
  }
}), app.views.dock.Dock = ui.Component.extend({
  cls: "dockWrapper animate",
  statics: {
    dockUrl: "/!/dock.html",
    fetch: function (e) {
      e = e || Jux.emptyFn, $.ajax({
        url: this.dockUrl,
        success: function (t) {
          var n, r;
          try {
            r = $(t)
          } catch (i) {
            n = !0, Jux.logError(i)
          }
          n ? e(!0, null) : e(null, r, t)
        },
        error: function () {
          e(arguments, null)
        }
      })
    }
  },
  allowClosing: !0,
  navigateToGallery: !1,
  galleryLeaveDelay: 400,
  showingLoadingSpinner: 1,
  showDelay: 0,
  isVisible: !1,
  atPeekState: !1,
  peekedDockHeight: 29,
  storedHeight: null,
  imagesToLoad: 0,
  delayToHideDockOnMouseLeave: 1e3,
  initComponent: function () {
    this._super(arguments), this.previewsById = {};
    var e = this.currentGallery.get("owner");
    this.subGalleryCollection = new app.collections.Galleries(e.get("sub_galleries")), _.each(this.subGalleryCollection.getModels(), function (t) {
      t.set("owner", e)
    }), this.noRefreshGallery = this.currentGallery, this.createDockPreviewInstances(), this.setCurrentPreview(this.findPreviewForGallery(this.currentGallery)), this.showDockTask = new Jux.util.DelayedTask(function () {
      this.showDelay && this.hoveringOverDock ? this.showDock() : this.showDelay || this.showDock()
    }, this), this.hideDockTask = new Jux.util.DelayedTask(this.hideDock, this), this.debouncedWindowResizeForDock = _.debounce(this.handleWindowResize.createDelegate(this), 1e3), this.$window = Jux.Util.getWindowObject(), this.$window.on("resize", this.debouncedWindowResizeForDock), this.appState.on("change:currentGallery", this.onCurrentGalleryChange, this)
  },
  afterRender: function () {
    this.hasGalleries() && this.$el.addClass("hasGalleries"), this.setupMouseEvents(), this.setupScroller(), this.applyGalleryCountSpecificDataTag()
  },
  getOuterHeight: function () {
    return this.$el ? this.storedHeight = this.$el.outerHeight() : null
  },
  getPeekedHeight: function () {
    return this.peekedDockHeight
  },
  getStoredHeight: function () {
    return this.storedHeight === null ? this.getOuterHeight() : this.storedHeight
  },
  hasGalleries: function () {
    return this.$el.find("li").length > 1
  },
  hasEnoughGalleriesForScroller: function () {
    return typeof this._hasEnoughGaleries != "undefined" ? this._hasEnoughGaleries : this._hasEnoughGaleries = this.$el.find("li").length > 7
  },
  isAtPeekState: function () {
    return this.atPeekState
  },
  makeDockFullyVisible: function () {
    this.setBottomToZero()
  },
  setBottom: function (e) {
    if (e === null) {
      this.$el.css("bottom", "");
      return
    }
    var t = typeof e == "number" ? e + "px" : e;
    this.$el.css("bottom", t), this.atPeekState = !1, this.fullyVisible = !1, this.completelyHidden = !1
  },
  setBottomToZero: function () {
    this.setBottom("0px"), this.fullyVisible = !0
  },
  setDockAtPeekState: function () {
    this.setBottom(-1 * this.getOuterHeight() + this.getPeekedHeight()), this.atPeekState = !0, this.addCls("docked")
  },
  setDockOutOfView: function () {
    this.setBottom(-this.getOuterHeight()), this.completelyHidden = !0
  },
  setGalleryTitle: function (e) {
    this.$galleryTitle.html(e)
  },
  applyGalleryCountSpecificDataTag: function () {
    var e = this.subGalleryCollection.getCount();
    this.$el.attr("data-gallery-count", e)
  },
  createDockPreviewInstances: function () {
    var e = this.contentEl.find("li"),
      t = this;
    e.each(function () {
      var e = $(this).data("gallery-id"),
        n = $(this).data("gallery-title");
      e && t.createGalleryPreview({
        id: e,
        $el: $(this)
      })
    })
  },
  createGalleryPreview: function (e) {
    var t = this.subGalleryCollection.getById(e.id),
      n;
    this.previewsById[e.id] = n = new app.views.dock.DockPreview({
      contentEl: e.$el,
      gallery: t,
      listeners: {
        onPreviewClicked: this.onPreviewClicked,
        galleryDeleted: this.onGalleryDeleted,
        deleting: function () {
          this.allowClosing = !1, this.trigger("preventClosing")
        },
        deletingFinished: function () {
          this.allowClosing = !0, this.trigger("allowClosing")
        },
        hasAnImageToLoad: function () {
          this.imagesToLoad++
        },
        previewImageLoaded: this.onImageLoad,
        scope: this
      }
    })
  },
  findPreviewForGallery: function (e) {
    if (!e) return null;
    var t = e.get("id"),
      n = this.previewsById[t] || null;
    return n
  },
  galleryPreviewExists: function (e) {
    var t = e.getId();
    return !!this.previewsById[t]
  },
  getPreviewForGallery: function (e) {
    var t = e.get("id");
    return this.previewsById[t] || null
  },
  handleWindowResize: Jux.abstractFn,
  hideDock: function () {
    this.allowClosing && !this.hoveringOverDock && (this.hideDockTask.cancel(), this.trigger("allowClosing"), this.setIsVisible(!1), this.trigger("hideDock"))
  },
  hideDockAfterDelay: function (e) {
    this.hideDockTask.cancel(), e = e || this.delayToHideDockOnMouseLeave, this.hideDockTask.delay(e)
  },
  onCurrentGalleryChange: function (e, t) {
    t !== null && this.setCurrentGallery(t)
  },
  onGalleryDeleted: function (e) {
    this.subGalleryCollection.remove(e);
    if (this.currentGallery === e || this.subGalleryCollection.getCount() <= 1) document.location = "/"
  },
  onImageLoad: function () {
    this.imagesToLoad -= 1, this.imagesToLoad || (this.getOuterHeight(), this.trigger("allImagesLoaded"), this.hoverScroller && this.hoverScroller.updateHoverScroller())
  },
  onMouseEnterAndOver: function () {
    this.delayedSetupOfScroller && (this.setupScroller(), this.hoverScroller.updateHoverScroller(), this.hoverScroller.enableHoverBars(0)), this.hoveringOverDock = !0, this.showDelay ? this.showDockTask.delay(this.showDelay) : this.showDock()
  },
  onMouseLeave: function () {
    this.showDockTask.cancel(), this.hoveringOverDock = !1, this.hideDockTask.delay(this.delayToHideDockOnMouseLeave)
  },
  onPreviewClicked: function (e, t) {
    this.trigger("galleryChange", t), this.setCurrentGallery(t)
  },
  setCurrentGallery: function (e) {
    this.currentGallery = e, this.setCurrentPreview(this.getPreviewForGallery(this.currentGallery))
  },
  setCurrentPreview: function (e) {
    if (!e) return;
    this.currentPreview && this.currentPreview.setSelectedState(!1), this.currentPreview = e, this.currentPreview.setSelectedState(!0)
  },
  setIsVisible: function (e) {
    this.isVisible = e
  },
  setupScroller: function () {
    if (this.hoverscroller) return;
    this.hasEnoughGalleriesForScroller() ? this.$el.css("display") === "none" ? this.delayedSetupOfScroller = !0 : (this.hoverScroller = new ui.utils.SmoothDivScroll({
      $el: this.$el
    }), this.delayedSetupOfScroller = !1) : this.$el.find(".js-hoverBar").remove()
  },
  setupMouseEvents: function () {
    var e = this.onMouseEnterAndOver.createDelegate(this);
    this.$el.on({
      mouseleave: this.onMouseLeave.createDelegate(this),
      mouseenter: e,
      mouseover: e
    })
  },
  show: function () {
    this._super(arguments), this.hoverScroller && (this.hoverScroller.updateHoverScroller(), this.hoverScroller.enableHoverBars(0))
  },
  showDock: function () {
    this.setIsVisible(!0), this.trigger("preventClosing"), this.trigger("showDock")
  },
  showDockAfterDelay: function (e) {
    e = e || this.showDelay, this.showDockTask.cancel(), this.showDockTask.delay(e)
  },
  onDestroy: function () {
    this._super(arguments), this.hoverScroller && this.hoverScroller.destroy(), this.$window.unbind("resize", this.debouncedWindowResizeForDock)
  }
}), app.views.dock.DockPreview = ui.Component.extend({
  initComponent: function () {
    if (!this.gallery) throw new Error("'gallery' required");
    this.$el = this.contentEl, this.$fillmoreContainer = this.$el.find("[data-img-container]"), this.$img = this.$fillmoreContainer.find("img"), this.hasAnImageToLoad = this.$img && this.$img.length, this.setupMouseEvents(), this.hasAnImageToLoad && (this.trigger("hasAnImageToLoad"), this.watchImageLoading(), this.fillmorizeImages())
  },
  afterRender: function () {
    this.setupMouseEvents()
  },
  applySelectedClass: function () {
    this.isSelected ? this.$el.addClass("selected") : this.$el.removeClass("selected")
  },
  fillmorizeImages: function () {
    var e = this.$fillmoreContainer,
      t = this.$img;
    e.fillmore({
      src: t.attr("src")
    }), this.$img.remove(), this.$img = null
  },
  onDeleteBtnClick: function (e) {
    this.trigger("deleting");
    var t = new ui.Dialog.DeleteJux({
      gallery: this.gallery,
      onDelete: function () {
        this.$el.addClass("deleted"), this.trigger("galleryDeleted", this.gallery), this.trigger("deletingFinished")
      }.createDelegate(this),
      onCancel: function () {
        this.trigger("deletingFinished")
      }.createDelegate(this)
    });
    e.preventDefault()
  },
  onImageLoaded: function () {
    this.trigger("previewImageLoaded")
  },
  onMouseClick: function (e) {
    $(e.target).hasClass("deleteJuxBtn") ? this.onDeleteBtnClick(e) : this.handlePreviewClicked(e)
  },
  handlePreviewClicked: function (e) {
    this.$el.data("gallery-empty") || (this.trigger("onPreviewClicked", this, this.gallery), e.preventDefault())
  },
  getGallery: function () {
    return this.gallery
  },
  setSelectedState: function (e) {
    this.isSelected = e, this.applySelectedClass()
  },
  setupMouseEvents: function () {
    this.$el.on("click", this.onMouseClick.createDelegate(this))
  },
  setupTitle: function () {
    this.galleryTitle.setText(this.gallery.get("title"))
  },
  watchImageLoading: function () {
    var e = new Image;
    e.onload = this.onImageLoaded.createDelegate(this), e.src = this.$img.attr("src")
  }
}), app.views.dock.GalleryDock = app.views.dock.Dock.extend({
  statics: {
    peekedDockHeight: 29,
    getPeekedDockHeight: function () {
      return app.views.dock.GalleryDock.peekedDockHeight
    }
  },
  dockIsVisibleThisManyPxFromBottom: 50,
  elId: "gallery-dock",
  constructor: function () {
    this._super(arguments), this.setupScrollingInGallery()
  },
  getPeekedHeight: function () {
    return app.views.dock.GalleryDock.getPeekedDockHeight()
  },
  handleWindowResize: function () {
    var e = this.$el.css("bottom");
    e !== "0px" && this.hideDock()
  },
  setCurrentGallery: function (e) {
    this._super(arguments), this.setUserViewedBottomOfGallery(!1)
  },
  setUserViewedBottomOfGallery: function (e) {
    this.userViewedBottomOfGallery = e
  },
  setupScrollingInGallery: function () {
    this.$html = $("html"), this.dockScrollDelegate = _.debounce(function () {
      if (this.$html.hasClass("viewingQuark")) return;
      var e = Jux.Util.getViewportSize().height,
        t = this.$window.scrollTop(),
        n = 0;
      if (this.userViewedBottomOfGallery) {
        n = $(document).height();
        if (n > e + this.dockIsVisibleThisManyPxFromBottom * 2 && t + e > n - this.dockIsVisibleThisManyPxFromBottom) {
          this.showDock();
          return
        }
      }
      t > this.storedHeight / 2 ? (this.dockAboveFold = !1, this.hideDock()) : this.currentGallery.get("type") === "MasterGallery" && (this.dockAboveFold = !0, this.showDock())
    }.createDelegate(this), 500), this.$window.on("scroll", this.dockScrollDelegate)
  },
  onDestroy: function () {
    this._super(arguments), this.$window.unbind("scroll", this.dockScrollDelegate)
  }
}), app.views.dock.QuarkDock = app.views.dock.Dock.extend({
  elId: "quark-dock",
  showDelay: 900,
  peekedDockHeight: 22,
  handleWindowResize: function () {
    var e = this.$el.css("bottom");
    this.atPeekState && this.setDockAtPeekState(), this.completelyHidden && this.setDockOutOfView()
  },
  onMouseEnterAndOver: function () {
    this.hasGalleries() && this._super(arguments)
  }
}), app.views.navigation.QuarkArrowNav = ui.Container.extend({
  elId: "quarkArrowNav",
  proximityX: .25,
  proximityY: .25,
  stagnateDelay: 100,
  pixelProximityX: 0,
  pixelProximityY: 0,
  arrowWidth: 0,
  vpWidth: 0,
  vpHeight: 0,
  currentQuark: null,
  leftArrow: null,
  rightArrow: null,
  restartArrow: null,
  clientX: 0,
  clientY: 0,
  mdownX: 0,
  mdownY: 0,
  shownArrow: 0,
  atTitleSlide: 0,
  mouseIsDown: 0,
  isBlocking: 0,
  quarkTypePrefix: "arrow-",
  initComponent: function () {
    this.items = [{
      id: "quarkArrowNavContainerLeft",
      cls: "quarkArrowNavContainerLeft",
      items: {
        id: "quarkArrowNavIconLeft",
        cls: "quarkArrowNavIconLeft noshow"
      }
    }, {
      id: "quarkArrowNavContainerRight",
      cls: "quarkArrowNavContainerRight",
      items: [{
        id: "quarkArrowNavIconRight",
        cls: "quarkArrowNavIconRight noshow"
      }, {
        id: "quarkArrowNavIconRestart",
        cls: "quarkArrowNavIconRestart"
      }]
    }], this._super(arguments), this.hideArrowsTask = new Kevlar.util.DelayedTask(this.hideArrows, this), this.stagnantMouseTask = new Kevlar.util.DelayedTask(this.setStagnantMouse, this, [1]), this.onCurrentSlideshowChangeDelegate = this.onCurrentSlideshowChange.createDelegate(this), this.onCurrentVideoLayoutChangeDelegate = this.onCurrentVideoLayoutChange.createDelegate(this), this.onCurrentVideoCaptionStateChangeDelegate = this.onCurrentVideoCaptionStateChange.createDelegate(this)
  },
  afterRender: function () {
    this._super(arguments), this.leftContainer = this.findById("quarkArrowNavContainerLeft"), this.rightContainer = this.findById("quarkArrowNavContainerRight"), this.leftArrow = this.leftContainer.findById("quarkArrowNavIconLeft"), this.rightArrow = this.rightContainer.findById("quarkArrowNavIconRight"), this.restartArrow = this.rightContainer.findById("quarkArrowNavIconRestart"), this.on("afterLayout", this.afterLayout, this), this.appState.on("change:currentQuark", this.onQuarkNav, this), this.setCurrentQuark(this.appState.get("currentQuark"))
  },
  afterLayout: function () {
    this._super(arguments), this.onResize(), this.setupListeners()
  },
  applyCurrentGaleryQuarksBinding: function () {
    this.currentGalleryQuarks.on({
      quarksLoading: this.quarksLoadingDelegate,
      quarksLoaded: this.quarksLoadedDelegate
    })
  },
  setCurrentGallery: function (e) {
    this.gallery = e
  },
  onResize: function (e) {
    var t = Jux.Util.getViewportSize();
    this.vpWidth = t.width, this.vpHeight = t.height, this.pixelProximityX = this.proximityX * t.width, this.pixelProximityY = this.proximityY * t.height, this.arrowWidth = this.rightArrow.getWidth() || this.leftArrow.getWidth(), this.clientX = this.vpWidth / 2, this.clientY = this.vpHeight / 2, this.leftContainer.$el.add(this.rightContainer.$el).css({
      width: this.proximityX * 100 + "%"
    }), this.$el.css({
      top: this.proximityY * 100 + "%",
      height: (1 - this.proximityY * 2) * 100 + "%"
    }), this.onMouseMove()
  },
  setCanHide: function (e) {
    e ? this.removeCls("nohide") : this.addCls("nohide")
  },
  showArrows: function () {
    this.leftArrow.$el.add(this.rightArrow.$el), this.leftArrow.removeCls("noshow"), this.shownArrow = 3
  },
  hideArrows: function () {
    this.leftArrow.$el.add(this.rightArrow.$el), this.leftArrow.addCls("noshow"), this.$clickArea.removeClass("navPointer"), this.shownArrow = 0
  },
  setStagnantMouse: function (e) {
    e ? this.addCls("stagnant") : this.removeCls("stagnant")
  },
  onQuarkNav: function (e, t, n) {
    n && (this.quarkIsASlideShow(n) ? (this.removeCls("titleslide finalslide"), this.atTitleSlide = 0, n.un("change:activeItemId", this.onCurrentSlideshowChangeDelegate)) : n instanceof app.models.Video && (this.isBlocking = 0, this.removeCls("blocking videoCaptionOpen"), n.un({
      "change:video_layout_type": this.onCurrentVideoLayoutChangeDelegate,
      "change:video_caption_state": this.onCurrentVideoCaptionStateChangeDelegate
    }))), this.setCurrentQuark(t)
  },
  setCurrentQuark: function (e) {
    this.currentQuark && this.removeCls(this.quarkTypePrefix + this.currentQuark.get("type")), this.currentQuark = e, this.onQuarkChanged()
  },
  quarkIsASlideShow: function (e) {
    var t = e instanceof app.models.Creation || e instanceof app.models.AbstractSlideshow;
    return t || !1
  },
  currentQuarkIsSlideShow: function () {
    return this.quarkIsASlideShow(this.currentQuark)
  },
  onQuarkChanged: function () {
    this.currentQuark && this.addCls(this.quarkTypePrefix + this.currentQuark.get("type")), this.currentQuarkIsSlideShow() && (this.currentQuark.on("change:activeItemId", this.onCurrentSlideshowChangeDelegate), this.onCurrentSlideshowChange()), this.currentQuark instanceof app.models.Video && (this.currentQuark.on("change:video_layout_type", this.onCurrentVideoLayoutChangeDelegate), this.currentQuark.on("change:video_caption_state", this.onCurrentVideoCaptionStateChangeDelegate), this.onCurrentVideoLayoutChange(), this.onCurrentVideoCaptionStateChange()), this.currentQuark && !this.currentGalleryQuarks.previous(this.currentQuark) && !this.currentQuarkIsSlideShow() ? this.addCls("firstquark") : this.removeCls("firstquark"), this.currentQuark && this.currentGalleryQuarks.areQuarksLoading() && !this.currentGalleryQuarks.next(this.currentQuark) ? (this.addCls("loadingNextQuarks"), this.stagnantMouseTask.delay(this.stagnateDelay), this.removeCls("stagnant"), this.rightArrow.removeCls("noshow")) : this.removeCls("loadingNextQuarks")
  },
  onCurrentSlideshowChange: function () {
    var e = this.currentQuark.get("slides"),
      t = e.indexOfId(this.currentQuark.get("activeItemId"));
    e.getCount() > 1 ? (t == -1 ? (this.atTitleSlide = 1, this.addCls("titleslide")) : (this.atTitleSlide = 0, this.removeCls("titleslide")), t != -1 && t + 1 == e.getCount() ? (this.stagnantMouseTask.delay(this.stagnateDelay), this.addCls("finalslide").removeCls("stagnant"), this.rightArrow.removeCls("noshow")) : this.removeCls("finalslide")) : (this.removeCls("titleslide"), this.removeCls("finalslide"), this.removeCls("nowshow"))
  },
  onCurrentVideoLayoutChange: function () {
    var e = this.currentQuark.get("video_layout_type");
    e == "full_screen" ? (this.addCls("blocking"), this.isBlocking = 1) : (this.removeCls("blocking"), this.isBlocking = 0)
  },
  onCurrentVideoCaptionStateChange: function (e, t) {
    var n = this.currentQuark.get("video_caption_state");
    n == "open" ? this.addCls("videoCaptionOpen") : this.removeCls("videoCaptionOpen")
  },
  restartSlideshow: function () {
    this.currentQuark.set("activeItemId", "")
  },
  navigatePrev: function () {
    this.currentQuarkIsSlideShow() ? this.navigatePrevSlide() : this.navigatePrevQuark()
  },
  navigatePrevQuark: function () {
    var e = this.currentGalleryQuarks.previous(this.currentQuark);
    e ? this.appState.set("currentQuark", e) : this.appState.set("currentQuark", null)
  },
  navigatePrevSlide: function () {
    var e = this.currentQuark.get("slides"),
      t = e.indexOfId(this.currentQuark.get("activeItemId"));
    if (t === -1) return this.navigatePrevQuark();
    t === 0 ? this.currentQuark.set("activeItemId", "") : this.currentQuark.set("activeItemId", e.getAt(t - 1).getId())
  },
  navigateNext: function () {
    this.currentQuarkIsSlideShow() ? this.navigateNextSlide() : this.navigateNextQuark()
  },
  navigateNextQuark: function () {
    var e = this.currentGalleryQuarks.next(this.currentQuark);
    e ? this.appState.set("currentQuark", e) : this.currentGalleryQuarks.areQuarksLoading() || this.appState.set("currentQuark", null)
  },
  navigateNextSlide: function () {
    var e = this.currentQuark.get("slides"),
      t = e.indexOfId(this.currentQuark.get("activeItemId"));
    t === -1 && this.currentQuark instanceof app.models.Creation && (t = 0), t + 1 == e.getCount() ? this.navigateNextQuark() : this.currentQuark.set("activeItemId", e.getAt(t + 1).getId())
  },
  setupListeners: function () {
    this.mouseMoveThrottledDelegate = _.throttle(this.onMouseMove.createDelegate(this), 100), this.mouseDownDelegate = this.onMouseDown.createDelegate(this), this.mouseClickDelegate = this.onMouseClick.createDelegate(this), this.mouseLeaveDelegate = this.onMouseLeave.createDelegate(this), this.onResizeDelegate = this.onResize.createDelegate(this), this.restartSlideshowDelegate = _.debounce(this.restartSlideshow.createDelegate(this), 50), this.$clickArea.add(this.$el).on({
      mousemove: this.mouseMoveThrottledDelegate,
      mousedown: this.mouseDownDelegate,
      mouseleave: this.mouseLeaveDelegate,
      click: this.mouseClickDelegate
    }), this.restartArrow.$el.on("click", this.restartSlideshowDelegate), this.mouseLeaveLeftDelegate = _.throttle(this.mouseLeaveLeft.createDelegate(this), 50), this.mouseLeaveRightDelegate = _.throttle(this.mouseLeaveRight.createDelegate(this), 50), this.leftContainer.$el.mouseleave(this.mouseLeaveLeftDelegate), this.rightContainer.$el.mouseleave(this.mouseLeaveRightDelegate), $(window).on("resize", this.onResizeDelegate), this.quarksLoadingDelegate = this.quarksLoading.createDelegate(this), this.quarksLoadedDelegate = this.quarksLoaded.createDelegate(this), this.applyCurrentGaleryQuarksBinding()
  },
  mouseLeaveLeft: function () {
    this.leftArrow.addCls("noshow")
  },
  mouseLeaveRight: function (e) {
    if (e.target === this.restartArrow.$el.get(0)) return;
    this.rightArrow.addCls("noshow")
  },
  quarksLoading: function () {
    this.currentQuark && !this.currentGalleryQuarks.next(this.currentQuark) && (this.addCls("loadingNextQuarks"), this.stagnantMouseTask.delay(this.stagnateDelay), this.removeCls("stagnant"), this.rightArrow.removeCls("noshow"))
  },
  quarksLoaded: function (e) {
    this.removeCls("loadingNextQuarks")
  },
  onMouseMove: function (e) {
    e && (e.clientX || e.clientY) && (this.clientX != e.clientX && this.clientY != e.clientY && (this.stagnantMouseTask.cancel(), this.setStagnantMouse(!1)), this.clientX = e.clientX, this.clientY = e.clientY);
    if (this.isBlocking && e && e.currentTarget != this.$el.get(0)) return;
    var t = this.clientX,
      n = this.clientY,
      r = 0;
    t * 2 > this.vpWidth && (t = this.vpWidth - t, r = 1), n * 2 > this.vpHeight && (n = this.vpHeight - n);
    if (t > this.pixelProximityX || n <= this.pixelProximityY) {
      this.shownArrow !== 0 && (this.rightArrow.$el.add(this.leftArrow.$el), this.rightArrow.addCls("noshow"), this.shownArrow = 0, this.$clickArea.removeClass("navPointer"));
      return
    }(!r || !this.atTitleSlide) && this.$clickArea.addClass("navPointer");
    if (this.mouseIsDown) return;
    r ? (this.shownArrow & 1 && this.leftArrow.addCls("noshow"), this.shownArrow & 2 || (this.rightArrow.removeCls("noshow"), this.shownArrow = 2)) : (this.shownArrow & 2 && this.rightArrow.addCls("noshow"), this.shownArrow & 1 || (this.leftArrow.removeCls("noshow"), this.shownArrow = 1)), this.stagnantMouseTask.delay(this.stagnateDelay)
  },
  onMouseLeave: function (e) {
    if (e.target == this.restartArrow.$el.get(0)) return;
    this.hideArrowsTask.delay(50), this.mouseIsDown = 0
  },
  onMouseDown: function (e) {
    this.mdownX = e.clientX, this.mdownY = e.clientY, this.mouseIsDown = 1
  },
  onMouseClick: function (e) {
    this.mouseIsDown = 0;
    if (e.target == this.restartArrow.$el.get(0)) return;
    if (this.isBlocking && e.currentTarget != this.$el.get(0)) return;
    if (Math.abs(e.clientX - this.mdownX) > 1 || Math.abs(e.clientY - this.mdownY) > 1) return;
    if (e.result) return;
    var t = !0;
    $(e.target).parentsUntil(e.currentTarget).add(e.target).each(function () {
      var e = $(this);
      if (e.is(":input, a, label")) {
        t = !1;
        return
      }
      var n = $._data(e, "events");
      if (n && n.click) {
        t = !1;
        return
      }
    });
    if (!t) return;
    e.stopPropagation();
    var n = e.clientX,
      r = e.clientY,
      i = 0;
    r * 2 > this.vpHeight && (r = this.vpHeight - r);
    if (r <= this.pixelProximityY) return;
    n * 2 > this.vpWidth ? (n = this.vpWidth - n, i = 2) : i = 1;
    if (n > this.pixelProximityX) return;
    i == 2 ? this.navigateNext() : i == 1 && this.navigatePrev()
  },
  onDestroy: function () {
    this.currentQuark && (this.currentQuarkIsSlideShow() && this.currentQuark.un("change:activeItemId", this.onCurrentSlideshowChangeDelegate), this.currentQuark instanceof app.models.Video && this.currentQuark.un({
      "change:video_layout_type": this.onCurrentVideoLayoutChangeDelegate,
      "change:video_caption_state": this.onCurrentVideoCaptionStateChangeDelegate
    })), this.restartArrow.$el.un("click", this.restartSlideshowDelegate), this.$clickArea.add(this.$el).un("mousemove", this.mouseMoveThrottledDelegate).un("mousedown", this.mouseDownDelegate).un("mouseleave", this.mouseLeaveDelegate).un("click", this.mouseClickDelegate), this.leftContainer.$el.un("mouseleave", this.mouseLeaveLeftDelegate), this.rightContainer.$el.un("mouseleave", this.mouseLeaveRightDelegate), $(window).un("resize", this.onResizeDelegate), this.currentGalleryQuarks.un("quarksLoadingDelegate", this.quarksLoadingDelegate), this.currentGalleryQuarks.un("quarksLoaded", this.quarksLoadedDelegate), this._super(arguments)
  }
}), app.views.xsome.XSome = Backbone.View.extend({
  initialize: function (e) {
    if (!e.appState) throw new Error("'appState' config required");
    if (!e.currentGallery) throw new Error("'currentGallery' config required");
    this.appState = e.appState, this.currentGallery = e.currentGallery, this.xsomeQuarks = new app.collections.GalleryQuarks, this.quarkViews = [], this.size = parseInt(this.$el.attr("data-xsome-size"), 10), this.currentUser = e.currentUser, this.arrangement = this.$el.attr("data-xsome-arrangement");
    if (_.isNaN(this.size)) throw new Error("invalid data-xsome-size");
    var t = this.$el.children(".date");
    this.hasDate = !! t.length, this.hasDate && (this.$monthEl = t.find("span.month"), this.$dayEl = t.find("span.day"), this.$yearEl = t.find("span.year"));
    var n = this.$(".quark"),
      r = this.$el.hasClass("fullviewHeading-vertical") && "fullviewHeading-vertical" || this.$el.hasClass("fullviewHeading-horizontal") && "fullviewHeading-horizontal" || this.$el.hasClass("fullviewHeading-overlay") && "fullviewHeading-overlay" || this.$el.hasClass("fullviewHeading-vertical") && "fullviewHeading-vertical" || this.$el.hasClass("fullviewHeading-verticalWide") && "fullviewHeading-verticalWide" || this.$el.hasClass("galleryHeadingWithQuarks") && "galleryHeadingWithQuarks";
    for (var i = 0, s = n.length; i < s; i++) {
      var o = n.eq(i),
        u = o.attr("data-quark-id"),
        a = e.galleryQuarks.getById(u),
        f = new app.views.QuarkPreview({
          model: a,
          el: o,
          gallery: this.currentGallery,
          currentUser: this.currentUser,
          preventDefaultClick: e.preventDefaultQuarkClick,
          xsomeSize: this.size,
          inGalleryHeading: r,
          hideActions: !! e.hideQuarkActions,
          xsomeArrangement: this.arrangement
        });
      f.bind("view", this.onQuarkView, this), f.bind("edit", this.onQuarkEdit, this), this.xsomeQuarks.add(a), this.quarkViews.push(f)
    }
    this.xsomeQuarks.bind("destroy", this.onQuarkDeleted, this)
  },
  render: function () {
    var e = this.quarkViews;
    for (var t = 0, n = e.length; t < n; t++) e[t].render();
    this.hasDate && this.updateDate()
  },
  getQuarks: function () {
    return this.xsomeQuarks
  },
  onQuarkView: function (e, t) {
    this.appState.set("currentQuark", t)
  },
  onQuarkEdit: function (e, t) {
    this.trigger("quarkedit", this, e, t)
  },
  updateDate: function () {
    var e = this.xsomeQuarks.newest(),
      t = new Date(e.get("sort_time"));
    this.$monthEl.html(jQuery.datepicker.formatDate("M", t)), this.$dayEl.html(jQuery.datepicker.formatDate("dd", t)), this.$yearEl.html(t.getFullYear())
  },
  onQuarkDeleted: function (e) {
    (this.$el.hasClass("groupOf1") || this.xsomeQuarks.isEmpty()) && this.onLastQuarkDeleted(e)
  },
  onLastQuarkDeleted: function (e) {
    this.$el.hide()
  }
}), app.views.xsome.IntroPanel = app.views.xsome.XSome.extend({
  initialize: function (e) {
    if (!e.gallery) throw new Error("'gallery' config required");
    app.views.xsome.IntroPanel.__super__.initialize.apply(this, arguments);
    var t = e.currentUser,
      n = e.gallery,
      r = n.get("owner");
    this.currentUser = t, this.gallery = n, this.introPanelOwner = r;
    if (this.isEditable()) {
      this.galleryTitleView = this.addEditableField(".gallery-title .juxTitle", n, "title", !0), this.titleOwnerNameView = this.addEditableField(".gallery-title .authordisplayname", t, "displayname"), this.infoOwnerNameView = this.addEditableField(".galleryInfo-descriptionAndLinks .authordisplayname", t, "displayname"), this.aboutView = this.addEditableField(".description .editable", n, "about", !0);
      var i = !1,
        s = !1,
        o = function () {
          i && s && (window.location.pathname = "/" + n.get("name"))
        };
      n.bind("change:name", function () {
        i = !0, o()
      }), this.galleryTitleView.on("blur", function () {
        s = !0, o()
      })
    }
    var u = this.$(".nav-bar");
    u.length && (this.navBar = new app.views.navBar.GalleryNavBar({
      el: u,
      gallery: n,
      socialMenu: e.socialMenu,
      makeQuarkMenu: e.makeQuarkMenu,
      juxMenu: e.juxMenu
    }));
    var a = n.getFonts();
    Jux.FontLoader.load(a), e.showFollow && r && (this.followButton = new app.views.menu.menuItem.Follow({
      currentQuark: this.currentQuark,
      currentUser: t,
      gallery: this.gallery,
      linkCls: this.shareItemCls
    })), e.showDeleteButton && jQuery('<div class="galleryPreviewActions"><a href="#" class="galleryPreviewAction delete-jux hastip" title="Delete Jux">Delete</a></div>').bind("click", jQuery.proxy(this.onDeleteClick, this)).appendTo(this.$el);
    var f = new app.views.xsome.introPanel.LinkRoll({
      renderTo: this.$el.find('*[data-elem="descriptionAndLinks"]'),
      gallery: this.gallery,
      currentUser: e.currentUser
    })
  },
  render: function () {
    app.views.xsome.IntroPanel.__super__.render.apply(this, arguments);
    if (this.followButton) {
      var e = jQuery('<div class="followButtonContainer" data-elem="follow"></div>');
      this.$(".galleryInfo .cornerButton").after(e), this.followButton.setElement(e), this.followButton.render()
    }
  },
  addEditableField: function (e, t, n, r) {
    var i = this.$(e),
      s;
    if (i.length) {
      var o = r ? app.components.contentEditable.MultilineField : app.components.contentEditable.SinglelineField;
      s = new o({
        el: i,
        model: t,
        attr: n
      })
    } else window.console.warn("Missing editable field: ", e);
    return s
  },
  onLastQuarkDeleted: Jux.emptyFn,
  isEditable: function () {
    var e = this.currentUser,
      t = this.gallery,
      n = t.get("type");
    return e && e === this.introPanelOwner && (n === "MasterGallery" || n === "Gallery") && t === this.currentGallery
  },
  onDeleteClick: function (e) {
    var t = this,
      n = new ui.Dialog({
        cls: "palette alertBox",
        modal: !0,
        autoOpen: !0,
        title: "",
        html: '<div class="alertText"><div class="alertText-heading">Delete this WHOLE JUX?</div></div>',
        closeButton: new ui.toolButtons.CloseButton({
          size: "tiny",
          handler: function () {
            n.close()
          },
          scope: this
        }),
        buttons: [{
          text: "Yes, delete the Jux and all its posts",
          cls: "alertAction",
          handler: function () {
            t.$el.hide(), t.gallery.destroy(), n.close()
          }
        }, {
          text: "Cancel",
          cls: "alertAction",
          handler: function () {
            n.close()
          }
        }]
      });
    e.preventDefault()
  }
}), app.views.xsome.introPanel.LinkRoll = Class.extend(ui.Component, {
  linkRollItemTpl: ['<div class="linkrollItem <%= extraItemCls %>">', '<span class="label"><%= link %></span>', "</div>"].join(""),
  initComponent: function () {
    this.cls += " linkroll";
    if (!(this.gallery instanceof app.models.Gallery)) throw new Error("'gallery' config required");
    if (typeof this.currentUser == "undefined") throw new Error("'currentUser' config required");
    this.galleryOwnerUser = this.gallery.get("owner"), this._super(arguments);
    var e = this.redraw;
    this.galleryOwnerUser.on({
      "change:email": e,
      "change:twitter_username": e,
      "change:custom_links": e,
      "change:show_email": e,
      "change:show_facebook_link": e,
      "change:show_twitter_username": e,
      scope: this
    })
  },
  onRender: function () {
    this._super(arguments), this.redraw()
  },
  redraw: function () {
    if (this.rendered) {
      var e = this.gallery,
        t = this.galleryOwnerUser,
        n = t.get("show_email") && t.get("email"),
        r = t.get("show_facebook_link") && t.getFacebookUrl(),
        i = t.get("show_twitter_username") && t.getTwitterUrl(),
        s = t.get("custom_links").getModels(),
        o = [],
        u, a, f;
      n && (u = this.createLinkRollItemMarkup("Email", n, "email"), o.push(u)), r && (u = this.createLinkRollItemMarkup("Facebook", r, "facebook"), o.push(u)), i && (u = this.createLinkRollItemMarkup("Twitter", i, "twitter"), o.push(u));
      for (a = 0, f = s.length; a < f; a++) {
        var l = s[a],
          c = l.get("label"),
          h = l.get("value"),
          p = l.get("show");
        c && (this.galleryOwnerUser === this.currentUser || h) && p && (u = this.createLinkRollItemMarkup(c, h), o.push(u))
      }
      if (o.length > 3) {
        this.$el.addClass("twoCol");
        var d = [],
          v = Math.ceil(o.length / 2);
        for (a = 0; a < v; a++) d.push(o[a]), o[v + a] && d.push(o[v + a]);
        o = d
      } else this.$el.removeClass("twoCol");
      this.setHtml(o.join(""))
    }
  },
  createLinkRollItemMarkup: function (e, t, n) {
    return Jux.Util.tmpl(this.linkRollItemTpl, {
      extraItemCls: n || "",
      link: this.createLink(e, t)
    })
  },
  createLink: function (e, t) {
    return e = e.replace(/^(https?:\/\/)?(www\.)?/i, ""), Jux.Email.isValid(t) ? t = "mailto:" + t : t = Jux.util.Uri.addProtocol(t, "http"), '<a href="' + t + '" target="_blank">' + e + "</a>"
  },
  onDestroy: function () {
    var e = this.redraw;
    this.galleryOwnerUser.un({
      "change:twitter_username": e,
      "change:custom_links": e,
      "change:show_email": e,
      "change:show_twitter_username": e,
      scope: this
    }), this._super(arguments)
  }
}), app.views.quark.badge.Badge = Backbone.View.extend({
  abstractClass: !0,
  rendered: !1,
  initialize: function (e) {
    if (typeof e.$parent == "undefined") throw new Error("'$parent' config required");
    if (typeof e.currentUser == "undefined") throw new Error("'currentUser' config required");
    if (typeof e.model == "undefined") throw new Error("'model' config required");
    if (typeof e.quarkTypeName == "undefined") throw new Error("'quarkTypeName' config required");
    this.$parent = e.$parent, this.currentUser = e.currentUser, this.model = e.model, this.quarkTypeName = e.quarkTypeName
  },
  render: function () {
    var e = jQuery(this.createEl());
    this.$parent.append(e), this.$el = e, this.el = e.get(0), this.rendered = !0
  },
  createEl: Class.abstractMethod,
  show: function () {
    this.rendered || this.render(), this.$el.show()
  },
  hide: function () {
    this.rendered && this.$el.hide()
  },
  fadeOut: function () {
    this.rendered && this.$el.fadeOut()
  },
  fadeIn: function () {
    this.rendered || this.render(), this.$el.fadeIn()
  }
}), app.views.quark.badge.HypeBadge = app.views.quark.badge.Badge.extend({
  createEl: function () {
    var e = jQuery('<a class="badge hypeBadge" target="_top"></a>');
    return this.currentUser ? (e.attr("href", Jux.Hosts.origin + "/quarks?type=" + this.quarkTypeName), e.attr("data-method", "post")) : e.attr("href", Jux.Hosts.origin + "/users/sign_in"), e
  }
}), app.views.quark.CreditOverlay = Jux.extend(ui.Overlay, {
  closeOnMouseOut: !0,
  closeOnMouseOutDelay: 250,
  initComponent: function () {
    this.cls += " creditPanel", this.openAnim = {
      effect: {
        type: "slide",
        direction: "right",
        mode: "show",
        easing: "easeOutQuart"
      },
      duration: 550
    }, this.closeAnim = {
      effect: {
        type: "slide",
        direction: "right",
        mode: "hide",
        easing: "easeOutQuart"
      },
      duration: 100
    }, this._super(arguments), this.updateContent()
  },
  updateContent: function () {
    var e = this.quark.getPreviewPicture().get("picture"),
      t = e.get("license") || "",
      n = this.quark.get("owner") === this.currentUser,
      r = n && e.get("source") !== "flickr_search",
      i = Jux.Magickly.convertImagePathOrUri(e.get("url"), {
        download: !0
      });
    t = Jux.util.uri.chompSlash(t);
    var s = JST["quarks/creditOverlay-html"]({
      picture: e.getData(),
      serviceName: _.capitalize(e.get("service") || ""),
      creatorHomepage: e.getServiceCreatorHomepage(),
      shouldLinkToLicense: !! t && t !== "r",
      licenseText: t ? Jux.Licenses.getLicenseText(t) || "View License" : "",
      allowDownload: n || e.hasDownloadableLicense(),
      downloadUrl: i,
      downloadText: r ? "Download my photo" : "Download original"
    });
    typeof s == "string" && (s = _.trim(s)), this._isEmpty = _.isBlank(jQuery(s).text()), this.update(s)
  },
  isEmpty: function () {
    return this._isEmpty
  }
}), app.views.quark.Quark = Jux.extend(ui.Container, {
  abstractClass: !0,
  statics: {
    onClassExtended: function () {
      Handlebars.registerHelper("nl2br", Jux.util.Html.nl2br), Handlebars.registerHelper("encodeURIComponent", encodeURIComponent), Handlebars.registerHelper("nl2brAndAutolinkUrls", function (e) {
        return Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))
      })
    },
    fromModel: function (e, t, n) {
      var r = _.capitalize(e.get("layout_name")),
        i = r.charAt(0).toLowerCase() + r.substr(1),
        s = this.getQuarkViewClassFromModelType(r, app.views.quark[i]);
      return new s({
        model: e,
        parentQuark: n,
        currentUser: t,
        quarkTypeName: i,
        renderTpl: JST["quarks/individual/" + i + "-html"] || null,
        styleTpl: JST["quarks/stylesheets/" + i + "-css"]
      })
    },
    getQuarkViewClassFromModelType: function (e, t) {
      return Jux.isDesktop && t["Desktop" + e] ? QuarkViewClass = t["Desktop" + e] : Jux.isTablet && t["Tablet" + e] ? QuarkViewClass = t["Tablet" + e] : Jux.isHandheld && t["Handheld" + e] ? QuarkViewClass = t["Handheld" + e] : Jux.isIPad && t["IPad" + e] ? QuarkViewClass = t["IPad" + e] : Jux.isIPhone && t["IPhone" + e] ? QuarkViewClass = t["IPhone" + e] : Jux.isTouch && t["Touch" + e] ? QuarkViewClass = t["Touch" + e] : QuarkViewClass = t[e], QuarkViewClass
    },
    fontEffects: ["blur", "neon", "reverse", "shadow", "threeD", "transparent"],
    getFontEffects: function () {
      return this.fontEffects
    },
    autolinkUrls: function (e, t) {
      return t = t || {}, "truncate" in t || (t.truncate = 32), Autolinker.link(e, t)
    }
  },
  spinnerEnabled: !1,
  layout: {
    type: "fit",
    browserManagedWidth: !0
  },
  loaded: !1,
  active: !1,
  lastUsedCssText: "",
  deferSpinnerShow: !1,
  initComponent: function () {
    var e = this.model;
    if (!this.quarkTypeName) throw new Error("'quarkTypeName' config required");
    if (!e) throw new Error("'model' config required");
    if (!this.styleTpl) throw new Error("'styleTpl' config required");
    this.addEvents("load"), this.elId = this.elId || "quark_" + e.getClientId(), this.addCls("quarkCanvas quark-" + e.get("layout_name")), this.setAttr("data-quarkid", e.getId()), this._super(), e.on("change", this.onDataChange, this)
  },
  onRender: function () {
    this._super(arguments), this.isLoaded() || this.showSpinner(), this.$styleEl = jQuery('<style data-forquarkid="' + (this.model.getId() || "(new quark)") + '"></style>').appendTo("head"), this.updateStyles();
    if (this.renderTpl) {
      var e = {
        quark: this.getQuarkData()
      };
      this.$el.append(this.renderTpl(e))
    }
    this.updateBadge()
  },
  onLoad: function () {
    this.loaded || (this.loaded = !0, this.hideSpinner(), this.fireEvent("load", this))
  },
  isLoaded: function () {
    return this.loaded
  },
  activate: function () {
    this.active = !0, this.deferSpinnerShow && this.showSpinner();
    var e = this.model.get("owner").get("google_analytics");
    e && Jux.Analytics.addAccount(e), Jux.Analytics.trackPageView(), this.isOwnerQuark() || this.model.incrementViewCount(), this.onActivate(), app.views.Mediator.Quark.emit("quarkActivated", this)
  },
  deactivate: function () {
    this.active = !1, this.spinner && !this.spinner.hidden && (this.hideSpinner(), this.deferSpinnerShow = !0);
    var e = this.model.get("owner").get("google_analytics");
    e && Jux.Analytics.removeAccount(e), this.onDeactivate()
  },
  onActivate: Jux.emptyFn,
  onDeactivate: Jux.emptyFn,
  isActive: function () {
    return this.active
  },
  getScrollableContentComponent: function () {
    return null
  },
  getContentScrollableHeight: function () {
    var e = this.getScrollableContentComponent();
    return e ? e.getScrollableHeight() : 0
  },
  setContentScrollTop: function (e) {
    var t = this.getScrollableContentComponent();
    t && t.setScrollTop(e)
  },
  onDataChange: function (e, t, n) {
    this.updateStyles(), t == "badge" && this.updateBadge()
  },
  updateStyles: function () {
    var e = this.styleTpl({
      quark: this.model.getData(),
      hexToRgb: this.hexToRgb
    });
    e !== this.lastUsedCssText && (Jux.Css.updateStyleEl(this.$styleEl, e), this.lastUsedCssText = e)
  },
  updateBadge: function () {
    if (Jux.isHandheld) return;
    var e = this.model.get("badge");
    if (e) {
      if (!this.badge) {
        var t = _.capitalize(e) + "Badge";
        this.badge = new app.views.quark.badge[t]({
          $parent: this.$el,
          currentUser: this.currentUser,
          model: this.model,
          quarkTypeName: this.quarkTypeName
        })
      }
      this.badge.show()
    } else this.badge && this.badge.hide()
  },
  getModel: function () {
    return this.model
  },
  hexToRgb: function (e) {
    e.charAt(0) === "#" && (e = e.substr(1));
    if (e.length === 3) {
      var t = e;
      e = "", t = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(t).slice(1);
      for (var n = 0; n < 3; n++) e += t[n] + t[n]
    }
    return e = parseInt(e, 16), (e >> 16) + "," + ((e & 65280) >> 8) + "," + (e & 255)
  },
  getQuarkData: function () {
    return this.model.getData()
  },
  isOwnerQuark: function () {
    var e = this.currentUser,
      t = this.model;
    return e && t && e === t.get("owner")
  },
  showSpinner: function () {
    if (!this.spinnerEnabled) return;
    this.isActive() ? (this.deferSpinnerShow = !1, this.spinner || (this.spinner = new app.components.CenteredSpinner), this.spinner.isVisible() || this.spinner.show()) : this.deferSpinnerShow = !0
  },
  hideSpinner: function () {
    this.deferSpinnerShow = !1, this.spinner && this.spinner.isVisible() && this.spinner.hide({
      effect: "fade",
      duration: 200
    })
  },
  destroy: function () {
    this.isActive() && this.deactivate(), this._super(arguments)
  },
  onDestroy: function () {
    this.spinner && this.spinner.destroy(), this.model.un("change", this.onDataChange, this), this.$styleEl && this.$styleEl.remove(), this._super(arguments)
  }
}), app.views.quark.AbstractMonoQuark = Jux.extend(app.views.quark.Quark, {
  abstractClass: !0,
  onRender: function () {
    this._super(arguments), this.redrawLayoutContainer()
  },
  onActivate: function () {
    this._super(arguments), this.layoutContainer && this.layoutContainer.activate(), this.doLayout()
  },
  onDeactivate: function () {
    this.layoutContainer && this.layoutContainer.deactivate(), this._super(arguments)
  },
  onDataChange: function (e, t, n, r) {
    this._super(arguments);
    switch (t) {
    case "background_picture":
      n !== r && this.redrawLayoutContainer();
      break;
    case "picture_size":
    case "layout":
      this.redrawLayoutContainer()
    }
  },
  getImageIsLoading: function () {
    return this.imageIsLoading
  },
  createLayoutContainer: Class.abstractMethod,
  redrawLayoutContainer: function () {
    this.showSpinner(), this.imageIsLoading = !0;
    var e = this.getPreloadImageUrl();
    e ? Jux.Util.loadImage(e, this.onImagePreload, this) : (Jux.logError("Invalid image url attempted to load"), this.onImagePreload())
  },
  getPreloadImageUrl: function () {
    return app.helpers.PictureSize.getPictureUrl(this.model, "background_picture")
  },
  onImagePreload: function () {
    if (!this.rendered) return;
    this.hideSpinner(), this.imageIsLoading = !1, this.removeAll(), this.layoutContainer = this.createLayoutContainer(), this.add(this.layoutContainer), this.isActive() && this.layoutContainer.activate(), this.onLoad()
  }
}), app.views.quark.AbstractSlideshow = Jux.extend(app.views.quark.Quark, {
  abstractClass: !0,
  spinnerEnabled: !1,
  slideCollectionPropertyName: "slides",
  adjustActiveIndexBy: 0,
  initComponent: function () {
    this.slideshow = this.createSlideshow(), this.slideshow.on("activeslidechange", this.onActiveSlideChange, this), this.createSlides(), this.items = [this.slideshow], this._super(arguments), this.getSlideCollection().on({
      add: this.onSlideAdd,
      remove: this.onSlideRemove,
      reorder: this.onSlideReorder,
      scope: this
    }), this.afterSlideshowSetup()
  },
  afterSlideshowSetup: function () {
    this.onLoad()
  },
  createSlides: function () {
    var e = this.getSlideCollection(),
      t = e.getModels(),
      n = [];
    for (var r = 0, i = t.length; r < i; r++) n.push(this.createGeneralSlide(t[r], r));
    this.slideshow.add(n)
  },
  getSlideCollection: function () {
    return this.model.get(this.slideCollectionPropertyName)
  },
  createSlideshow: Class.abstractMethod,
  createGeneralSlide: Class.abstractMethod,
  onSlideAdd: function (e, t) {
    this.slideshow.add(this.createGeneralSlide(t))
  },
  onSlideRemove: function (e, t, n) {
    var r = this.slideshow.getItemAt(n + this.adjustActiveIndexBy);
    this.slideshow.remove(r)
  },
  onSlideReorder: function (e, t, n, r) {
    var i = this.slideshow.getItemAt(r + this.adjustActiveIndexBy);
    this.slideshow.insert(i, n + this.adjustActiveIndexBy)
  },
  onActivate: function () {
    this._super(arguments), this.slideshow.activate()
  },
  onDeactivate: function () {
    this.slideshow.deactivate(), this._super(arguments)
  },
  onDataChange: function (e, t, n) {
    this._super(arguments);
    if (t === "activeItemId")
      if (n === "") this.slideshow.setActiveSlide(0);
      else {
        var r = this.getSlideCollection();
        n ? this.slideshow.setActiveSlide(r.indexOfId(n) + this.adjustActiveIndexBy) : this.slideshow.setActiveSlide(r.getCount() + this.adjustActiveIndexBy)
      }
  },
  onActiveSlideChange: function (e, t, n) {
    this.model.set("activeItemId", n > 0 ? this.getSlideCollection().getAt(n - this.adjustActiveIndexBy).getId() : ""), this.isActive() && Jux.Analytics.trackPageView()
  },
  onDestroy: function () {
    this.getSlideCollection().un({
      add: this.onSlideAdd,
      remove: this.onSlideRemove,
      reorder: this.onSlideReorder,
      scope: this
    }), this.slideshow.un("activeslidechange", this.onActiveSlideChange, this), this._super(arguments)
  }
}), app.views.quark.AbstractSlideshowWithTitleSlide = Jux.extend(app.views.quark.AbstractSlideshow, {
  abstractClass: !0,
  adjustActiveIndexBy: 1,
  createSlides: function () {
    this.slideshow.add(this.createTitleSlide()), this._super(arguments)
  },
  createTitleSlide: Class.abstractMethod
}), app.views.quark.LayoutContainer = ui.Container.extend({
  abstractClass: !0,
  active: !1,
  hasByline: !0,
  initComponent: function () {
    var e = this,
      t = e.model;
    if (!t) throw new Error("'model' config required");
    var n = e.createConfig();
    Jux.apply(e, n), e._super(arguments), this.hasByline && this.addByline(), t.on("change", e.onDataChange, e)
  },
  addByline: function () {
    var e = this.findById("bylineWrap");
    this.byline = new app.views.quark.shared.Byline({
      quark: this.model
    }), e.add(this.byline)
  },
  onDataChange: Jux.emptyFn,
  createConfig: Class.abstractMethod,
  activate: function () {
    this.active || (this.active = !0, this.onActivate())
  },
  onActivate: Jux.emptyFn,
  deactivate: function () {
    this.active && (this.active = !1, this.onDeactivate())
  },
  onDeactivate: Jux.emptyFn,
  isActive: function () {
    return this.active
  },
  onDestroy: function () {
    var e = this;
    e.model.un("change", e.onDataChange, e), e.deactivate(), e._super(arguments)
  }
}), app.views.quark.BackgroundPictureLayoutContainer = app.views.quark.LayoutContainer.extend({
  abstractClass: !0,
  enableCreditOverlay: !0,
  initComponent: function () {
    var e = this.model;
    this._super(arguments), this.enableCreditOverlay && (this.creditOverlay = new app.views.quark.CreditOverlay({
      autoDestroy: !1,
      currentUser: this.currentUser,
      quark: e
    })), this.backgroundPicture = this.findById("backgroundPicture"), this.backgroundPicture.on("load", this.onBackgroundPictureLoad, this), this.updateBackgroundPicture();
    var t = this.getBackgroundPictureAttributeName();
    e.on("change:" + t + ".chosen_center", this.updateChosenCenter, this)
  },
  onLayout: function () {
    this._super(arguments), this.setupCreditOverlay(), this.backgroundPicture.resize()
  },
  onDeactivate: function () {
    this.enableCreditOverlay && this.creditOverlay.close(), this._super(arguments)
  },
  getBackgroundPictureAttributeName: Class.abstractMethod,
  getBackgroundPictureUrl: Class.abstractMethod,
  getBackgroundPictureFillmoreOptions: function () {
    return {}
  },
  onDataChange: function (e, t, n) {
    this._super(arguments), t === "background_picture" && this.creditOverlay.updateContent()
  },
  setupCreditOverlay: function () {
    if (!this.enableCreditOverlay) return;
    this.$lastCreditsIconBound && (this.$lastCreditsIconBound.unbind("mouseenter", this.creditsIconMouseEnterDelegate), delete this.$lastCreditsIconBound, delete this.creditsIconMouseEnterDelegate);
    var e = this.findById("backgroundPicture"),
      t = e.getCreditsEl(),
      n = this.findById("creditsIcon");
    n && (t.hide(), t = n.getEl());
    var r = this.creditOverlay;
    r.setAnchor({
      my: "right bottom",
      at: "right bottom",
      of: t,
      offset: "14 10"
    }), r.isEmpty() ? t.hide() : (this.$lastCreditsIconBound = t, this.creditsIconMouseEnterDelegate = function () {
      r.isOpen() || r.open()
    }, t.bind("mouseenter", this.creditsIconMouseEnterDelegate))
  },
  updateBackgroundPicture: function () {
    var e = this.getBackgroundPictureUrl(),
      t = this.getBackgroundPictureFillmoreOptions();
    this.backgroundPicture.setSrc(e, t), this.currentlyLoadingImage !== e && this.fireEvent("backgroundPictureLoading", this, this.backgroundPicture), this.currentlyLoadingImage = e
  },
  currentlyLoadingImage: null,
  onBackgroundPictureLoad: function () {
    this.doLayout(), this.doLayout();
    var e = this.model,
      t = e.get(this.getBackgroundPictureAttributeName()),
      n = this.backgroundPicture.getViewableArea(),
      r = {
        percentHeight: n.percentHeight,
        percentWidth: n.percentWidth
      };
    t.set("viewableImageArea", r), this.fireEvent("backgroundPictureLoaded", this, t)
  },
  updateChosenCenter: function (e, t, n) {
    this.backgroundPicture.setSrc(this.backgroundPicture.getSrc(), {
      focusX: t ? t.x : 50,
      focusY: t ? t.y : 50
    })
  },
  onDestroy: function () {
    var e = this.getBackgroundPictureAttributeName();
    this.model.un("change:" + e + ".chosen_center", this.updateChosenCenter, this), this.enableCreditOverlay && this.creditOverlay.destroy(), this._super(arguments)
  }
}), app.views.quark.MonoQuarkLayoutContainer = app.views.quark.BackgroundPictureLayoutContainer.extend({
  abstractClass: !0,
  initComponent: function () {
    var e = this.model;
    if (!this.quarkPackageName) throw new Error("'quarkPackageName' config required");
    this._super(arguments), this.addCls("pictureSize-" + e.get("picture_size"))
  },
  createConfig: function () {
    var e = app.views.quark[this.quarkPackageName].layouts;
    if (Jux.isHandheld) return e.handheld;
    var t = this.model,
      n = t.get("picture_size"),
      r = t.get("layout"),
      i;
    return Jux.isIPad && e.iPad ? i = e.iPad[n][r] : Jux.isDesktop && e.desktop ? i = e.desktop[n][r] : i = e[n][r], i
  },
  getBackgroundPictureAttributeName: function () {
    return "background_picture"
  },
  getBackgroundPictureUrl: function () {
    return app.helpers.PictureSize.getPictureUrl(this.model, "background_picture")
  },
  getBackgroundPictureFillmoreOptions: function () {
    var e = this._super(arguments),
      t = this.model.get("background_picture");
    return Jux.apply(e, app.helpers.PictureSize.getPictureFillmoreOptions(t))
  },
  onDataChange: function (e, t, n) {
    this._super(arguments);
    switch (t) {
    case "greyscale":
    case "flip":
    case "mustachify":
    case "cross_process":
    case "lomo":
    case "tilt_shift":
    case "blur":
    case "mirror_in":
    case "mirror_out":
    case "fade":
      this.updateBackgroundPicture()
    }
  }
}), app.views.quark.SlideContentContainer = ui.Container.extend({
  abstractClass: !0,
  layout: "fit",
  layoutContainer: null,
  initComponent: function () {
    this.addEvents("next");
    var e = this,
      t = e.model;
    if (!t) throw new Error("'model' config required");
    this.spinner = new app.components.CenteredSpinner, e._super(arguments), t.on("change:" + this.getPictureAttr(), e.onPictureChange, e), t.on("change:picture_size", e.redrawLayoutContainer, e), t.on("change:layout", e.redrawLayoutContainer, e)
  },
  onRender: function () {
    this._super(arguments), this.redrawLayoutContainer()
  },
  getPictureAttr: Class.abstractMethod,
  createLayoutContainer: Class.abstractMethod,
  redrawLayoutContainer: function () {
    this.showSpinner();
    var e = app.helpers.PictureSize.getPictureUrl(this.model, this.getPictureAttr());
    Jux.Util.loadImage(e, this.onImagePreload, this)
  },
  onImagePreload: function () {
    if (!this.rendered) return;
    this.hideSpinner(), this.removeAll(), this.layoutContainer = this.createLayoutContainer(), this.add(this.layoutContainer)
  },
  onPictureChange: function (e, t, n) {
    this.rendered && t !== n && this.redrawLayoutContainer()
  },
  showSpinner: function () {
    this.spinner.show()
  },
  hideSpinner: function () {
    this.spinner.hide({
      effect: "fade",
      duration: 200
    })
  },
  onDestroy: function () {
    var e = this,
      t = this.model;
    t.un("change:" + this.getPictureAttr(), e.onPictureChange, e), t.un("change:picture_size", e.redrawLayoutContainer, e), t.un("change:layout", e.redrawLayoutContainer, e), e.spinner.destroy(), this._super(arguments)
  }
}), app.views.quark.SlideLayoutContainer = Jux.extend(app.views.quark.BackgroundPictureLayoutContainer, {
  abstractClass: !0,
  enableCreditOverlay: !1,
  initComponent: function () {
    var e = this;
    e.addEvents("next"), e._super(arguments), e.addCls("pictureSize-" + e.model.get("picture_size"))
  },
  addByline: Jux.emptyFn,
  getBackgroundPictureUrl: function () {
    return app.helpers.PictureSize.getPictureUrl(this.model, this.getBackgroundPictureAttributeName())
  },
  getBackgroundPictureFillmoreOptions: function () {
    var e = this._super(arguments),
      t = this.model.get(this.getBackgroundPictureAttributeName());
    return Jux.apply(e, app.helpers.PictureSize.getPictureFillmoreOptions(t))
  }
}), app.views.quark.TitleSlideLayoutContainer = app.views.quark.SlideLayoutContainer.extend({
  initComponent: function () {
    this._super(arguments), this.picture = this.findById("backgroundPicture"), this.contentWrap = this.findById("contentWrap");
    var e = this.model.get("layout_name"),
      t;
    Jux.isHandheld ? t = JST["quarks/individual/" + e + "_title_handheld-html"] : t = JST["quarks/individual/" + e + "_title-html"];
    var n = t(this.createTemplateConfig());
    this.contentWrap.update(n), this.contentWrap.on("render", this.onContentWrapRender, this), this.model.on({
      "change:title": this.updateTitle,
      "change:subtitle": this.updateSubtitle,
      "change:cover_picture.chosen_center": this.onChosenCenterChange,
      scope: this
    })
  },
  createConfig: function () {
    var e = this.model.get("layout_name"),
      t = Jux.isHandheld ? "handheld" : this.model.get("picture_size");
    return app.views.quark[e].layouts.titleSlide[t]
  },
  createTemplateConfig: function () {
    var e = {
      quark: this.model.getData()
    };
    if (Jux.isHandheld) {
      var t = jQuery.datepicker,
        n = this.model.get("sort_time");
      e.date = {
        month: t.formatDate("M", n),
        day: t.formatDate("d", n),
        year: t.formatDate("yy", n)
      }
    }
    return e
  },
  getBackgroundPictureAttributeName: function () {
    return "cover_picture"
  },
  onContentWrapRender: function () {
    this.$quarkTitleWrap = this.$el.find('*[data-elem="quarkTitleWrap"]'), this.$titleEl = this.$quarkTitleWrap.find('*[data-elem="title"]'), this.$subtitleEl = this.$quarkTitleWrap.find('*[data-elem="subtitle"]'), this.byline = new app.views.quark.shared.Byline({
      renderTo: this.$el.find('*[data-elem="bylineWrap"]'),
      quark: this.model
    })
  },
  onChosenCenterChange: function (e, t, n) {
    this.picture.setSrc(this.picture.getSrc(), {
      focusX: t ? t.x : 50,
      focusY: t ? t.y : 50
    })
  },
  updateTitle: function () {
    var e = this.model.get("title");
    this.$titleEl.html(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e)))
  },
  updateSubtitle: function () {
    var e = this.model.get("subtitle");
    this.$subtitleEl.html(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.$quarkTitleWrap.toggleClass("hasSubtitle", e !== "")
  },
  onDestroy: function () {
    var e = this.model;
    e.un({
      "change:title": this.updateTitle,
      "change:subtitle": this.updateSubtitle,
      "change:cover_picture.chosen_center": this.onChosenCenterChange,
      scope: this
    }), this._super(arguments)
  }
}), app.views.quark.PaletteShared = {
  customizeBylineSection: {
    type: "Section",
    id: "customizeProfileSection",
    layout: "columns",
    items: [{
      columnWidth: "20%",
      type: "Label",
      text: "Byline",
      style: {
        "padding-top": "2px"
      }
    }, {
      columnWidth: "46%",
      type: "button",
      id: "showProfileCustomizer",
      text: "Customize"
    }, {
      columnWidth: "34%",
      type: "ButtonSet",
      key: "author_enabled",
      style: {
        margin: "0 0 0 8px"
      },
      options: [{
        text: "Show",
        value: !0
      }, {
        text: "Hide",
        value: !1
      }]
    }]
  }
}, app.views.quark.shared.Byline = ui.Container.extend({
  cls: "byline dehorse",
  initComponent: function () {
    var e = this.quark.get("owner");
    this.owner = e, this.items = [{
      type: "label",
      id: "displayname",
      cls: "bylineItem bylineText displayname"
    }, {
      cls: "bylineSection socialAndDateSection",
      items: [{
        id: "socialSection",
        cls: "bylineSection socialSection",
        items: [{
          type: "label",
          id: "nameAndSocialDivider",
          cls: "bylineItem bylineText nameAndSocialDivider",
          text: "|"
        }, {
          type: "label",
          id: "facebook",
          cls: "bylineItem socialIcon facebook"
        }, {
          type: "label",
          id: "twitter",
          cls: "bylineItem socialIcon twitter"
        }, {
          type: "label",
          id: "email",
          cls: "bylineItem socialIcon email"
        }]
      }, {
        type: "label",
        id: "socialAndDateDivider",
        cls: "bylineItem bylineText socialAndDateDivider",
        text: "|"
      }, {
        type: "label",
        id: "date",
        cls: "bylineItem bylineText date"
      }]
    }], this._super(arguments), this.displaynameLabel = this.findById("displayname"), this.nameAndSocialDividerLabel = this.findById("nameAndSocialDivider"), this.socialSection = this.findById("socialSection"), this.facebookLabel = this.findById("facebook"), this.twitterLabel = this.findById("twitter"), this.emailLabel = this.findById("email"), this.socialAndDateDividerLabel = this.findById("socialAndDateDivider"), this.dateLabel = this.findById("date"), this.updateDisplayname(), this.updateFacebookLink(), this.updateTwitterLink(), this.updateEmailLink(), this.updateDate(), this.updateNameAndSocialDividerVisibility(), this.updateFacebookVisibility(), this.updateTwitterVisibility(), this.updateEmailVisibility(), this.updateSocialAndDateDividerVisibility(), this.updateAuthorSectionVisibility(), this.updateDateVisibility(), this.updateVisibility(), this.quark.on({
      "change:author_enabled": this.onAuthorEnabledChanged,
      "change:show_posted_time": this.onShowPostedTimeChanged,
      "change:sort_time": this.updateDate,
      scope: this
    }), e.on({
      "change:displayname": this.onOwnerDisplaynameChanged,
      "change:facebook_id": this.onOwnerFacebookIdChanged,
      "change:show_email": this.onOwnerShowEmailChanged,
      "change:show_facebook_link": this.onOwnerShowFacebookChanged,
      "change:show_twitter_username": this.onOwnerShowTwitterChanged,
      "change:twitter_username": this.onOwnerTwitterUsernameChanged,
      scope: this
    })
  },
  fadeOut: function (e, t) {
    e = e || Jux.emptyFn, this.$el.fadeOut(e)
  },
  fadeIn: function (e) {
    e = e || Jux.emptyFn, this.$el.fadeIn(e)
  },
  onAuthorEnabledChanged: function () {
    this.updateAuthorSectionVisibility(), this.updateSocialAndDateDividerVisibility(), this.updateVisibility()
  },
  onOwnerDisplaynameChanged: function () {
    this.updateDisplayname(), this.updateDisplaynameVisibility(), this.updateNameAndSocialDividerVisibility()
  },
  onOwnerFacebookIdChanged: function () {
    this.updateFacebookLink(), this.onOwnerShowFacebookChanged()
  },
  onOwnerShowFacebookChanged: function () {
    this.updateFacebookVisibility(), this.onSocialVisibilityChanged()
  },
  onOwnerTwitterUsernameChanged: function () {
    this.updateTwitterLink(), this.onOwnerShowTwitterChanged()
  },
  onOwnerShowTwitterChanged: function () {
    this.updateTwitterVisibility(), this.onSocialVisibilityChanged()
  },
  onOwnerShowEmailChanged: function () {
    this.updateEmailVisibility(), this.onSocialVisibilityChanged()
  },
  onSocialVisibilityChanged: function () {
    this.updateNameAndSocialDividerVisibility(), this.updateSocialAndDateDividerVisibility(), this.updateVisibility()
  },
  onShowPostedTimeChanged: function () {
    this.updateDateVisibility(), this.updateSocialAndDateDividerVisibility(), this.updateVisibility()
  },
  updateDisplayname: function () {
    var e = this.owner,
      t = e.get("displayname_or_username"),
      n = e.get("gallery_url"),
      r = t.link(n);
    this.displaynameLabel.setText(r)
  },
  updateFacebookLink: function () {
    var e = this.owner.getFacebookUrl();
    this.facebookLabel.setText(e ? '<a href="' + e + '" target="_blank">v</a>' : "")
  },
  updateTwitterLink: function () {
    var e = this.owner.getTwitterUrl();
    this.twitterLabel.setText(e ? '<a href="' + e + '" target="_blank">$</a>' : "")
  },
  updateEmailLink: function () {
    var e = this.owner.get("email");
    this.emailLabel.setText(e ? '<a href="mailto:' + e + '" target="_blank">0</a>' : "")
  },
  updateDate: function () {
    var e = new Date(this.quark.get("sort_time"));
    this.dateLabel.setText(jQuery.datepicker.formatDate("M d, yy", e))
  },
  updateAuthorSectionVisibility: function () {
    this.updateDisplaynameVisibility(), this.updateNameAndSocialDividerVisibility(), this.socialSection.setVisible(this.authorSectionShouldBeVisible())
  },
  updateDisplaynameVisibility: function () {
    this.displaynameLabel.setVisible(this.displaynameShouldBeVisible())
  },
  updateNameAndSocialDividerVisibility: function () {
    this.nameAndSocialDividerLabel.setVisible(this.authorSectionShouldBeVisible() && this.displaynameShouldBeVisible() && this.socialShouldBeVisible())
  },
  updateFacebookVisibility: function () {
    this.facebookLabel.setVisible(this.facebookShouldBeVisible())
  },
  updateTwitterVisibility: function () {
    this.twitterLabel.setVisible(this.twitterShouldBeVisible())
  },
  updateEmailVisibility: function () {
    this.emailLabel.setVisible(this.emailShouldBeVisible())
  },
  updateSocialAndDateDividerVisibility: function () {
    this.socialAndDateDividerLabel.setVisible(this.authorSectionShouldBeVisible() && this.dateShouldBeVisible())
  },
  updateDateVisibility: function () {
    this.dateLabel.setVisible(this.dateShouldBeVisible())
  },
  updateVisibility: function () {
    this.setVisible(this.shouldBeVisible())
  },
  authorSectionShouldBeVisible: function () {
    return this.quark.get("author_enabled")
  },
  displaynameShouldBeVisible: function () {
    return this.authorSectionShouldBeVisible()
  },
  facebookShouldBeVisible: function () {
    var e = this.owner;
    return e.get("show_facebook_link") && !! e.getFacebookUrl()
  },
  twitterShouldBeVisible: function () {
    var e = this.owner;
    return e.get("show_twitter_username") && !! e.getTwitterUrl()
  },
  emailShouldBeVisible: function () {
    var e = this.owner;
    return e.get("show_email") && !! e.get("email")
  },
  socialShouldBeVisible: function () {
    return this.authorSectionShouldBeVisible() && (this.facebookShouldBeVisible() || this.twitterShouldBeVisible() || this.emailShouldBeVisible())
  },
  dateShouldBeVisible: function () {
    return this.quark.get("show_posted_time")
  },
  shouldBeVisible: function () {
    return this.authorSectionShouldBeVisible() || this.dateShouldBeVisible()
  },
  onDestroy: function () {
    this.quark.un({
      "change:author_enabled": this.onAuthorEnabledChanged,
      "change:show_posted_time": this.onShowPostedTimeChanged,
      "change:sort_time": this.updateDate,
      scope: this
    }), this.owner.un({
      "change:displayname": this.onOwnerDisplaynameChanged,
      "change:facebook_id": this.onOwnerFacebookIdChanged,
      "change:show_email": this.onOwnerShowEmailChanged,
      "change:show_facebook_link": this.onOwnerShowFacebookChanged,
      "change:show_twitter_username": this.onOwnerShowTwitterChanged,
      "change:twitter_username": this.onOwnerTwitterUsernameChanged,
      scope: this
    }), this._super(arguments)
  }
}), app.views.quark.shared.InfoCard = ui.Container.extend({
  cls: "infocard",
  renderByline: !0,
  mixins: [Jux.util.Observable],
  initComponent: function () {
    this.$titleEl = this.$el.find(".title"), this.$descriptionEl = this.$el.find(".video-description"), this.model.on({
      "change:title": this._updateTitle,
      "change:description": this._updateDescription,
      scope: this
    }), this.renderByline && (this.byline = new app.views.quark.shared.Byline({
      renderTo: this.$el.find(".bylineWrap"),
      quark: this.model
    })), this._updateDescription(), this._updateTitle()
  },
  update: function () {
    var e = this.model,
      t = !! e.get("title"),
      n = !! e.get("description");
    this.$titleEl[t ? "show" : "hide"](), this.$descriptionEl[n ? "show" : "hide"](), this.$el.css("visibility", t || n || this.byline && this.byline.shouldBeVisible() ? "visible" : "hidden")
  },
  setupByline: function () {
    this.byline && this.byline.doLayout()
  },
  getEl: function () {
    return this.$el
  },
  _updateTitle: function () {
    var e = this.model.get("title");
    this.$titleEl.html(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.update()
  },
  _updateDescription: function () {
    var e = this.model.get("description");
    this.$descriptionEl.html(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.update()
  },
  toggle: function () {
    this.$el.toggle()
  },
  fadeIn: function (e) {
    var t = this;
    e = e || "slow", setTimeout(function () {
      t.$el.fadeIn(e, function () {
        t.fireEvent("visible")
      })
    }, 0)
  },
  fadeOut: function (e) {
    var t = this;
    e = e || "slow", setTimeout(function () {
      t.$el.fadeOut(e, function () {
        t.fireEvent("hidden")
      })
    }.createDelegate(this), 0)
  }
}), app.views.quark.article.Article = Jux.extend(app.views.quark.AbstractMonoQuark, {
  allowBylineToBeShown: !0,
  setAllowBylineToBeVisible: function (e) {
    this.allowBylineToBeShown = e
  },
  createLayoutContainer: function () {
    return new app.views.quark.article.LayoutContainer({
      currentUser: this.currentUser,
      model: this.model,
      quarkPackageName: this.quarkTypeName,
      allowBylineToBeShown: this.allowBylineToBeShown
    })
  }
}), app.views.quark.article.LayoutContainer = app.views.quark.MonoQuarkLayoutContainer.extend({
  allowBylineToBeShown: !0,
  initComponent: function (e) {
    var t = this.model;
    this._super(arguments), e && typeof e.allowBylineToBeShown != "undefined" && (this.allowBylineToBeShown = e.allowBylineToBeShown), this.contentWrapContainer = this.findById("contentWrap"), this.bylineWrap = this.findById("bylineWrap"), this.titleLabel = this.findById("title"), this.textLabel = this.findById("text"), this.updateTitle(), this.updateText(), this.updateFontEffect(), this.updateTextAlignment(), this.on("afterLayout", this.afterLayout, this)
  },
  afterLayout: function () {
    this.showOrHideTextArea()
  },
  onDataChange: function (e, t, n) {
    this._super(arguments);
    switch (t) {
    case "title":
      this.updateTitle(), this.showOrHideTextArea();
      break;
    case "text":
      this.updateText(), this.showOrHideTextArea();
      break;
    case "font_effect":
      this.updateFontEffect();
      break;
    case "text_alignment":
      this.updateTextAlignment();
      break;
    case "author_enabled":
      this.showOrHideTextArea();
      break;
    case "show_posted_time":
      this.showOrHideTextArea()
    }
  },
  showOrHideTextArea: function () {
    var e = !! _.trim(this.model.get("title")) || !! _.trim(this.model.get("text")),
      t;
    this.allowBylineToBeShown && !e && (t = this.model.get("author_enabled") || this.model.get("show_posted_time"), e = t), e ? this.contentWrapContainer.show() : this.contentWrapContainer.hide()
  },
  updateTitle: function () {
    var e = this.model.get("title");
    e = Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e)), this.titleLabel.setText('<span class="highlight-shadow"><span class="highlight">' + e + "</span></span>")
  },
  updateText: function () {
    var e = this.model.get("text");
    this.textLabel.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e)))
  },
  updateFontEffect: function () {
    var e = this.model.get("font_effect"),
      t = app.views.quark.Quark.getFontEffects().join(" ");
    this.removeCls(t).addCls(e)
  },
  updateTextAlignment: function () {
    var e = this.model.get("text_alignment"),
      t = "justify-align left-align right-align center-align",
      n = e + "-align";
    this.contentWrapContainer.removeCls(t).addCls(n), this.titleLabel.removeCls(t).addCls(n), this.bylineWrap.removeCls(t).addCls(n)
  }
}), app.views.quark.article.DesktopArticle = Jux.extend(app.views.quark.article.Article, {
  getScrollableContentComponent: function () {
    return this.layoutContainer ? this.layoutContainer.findById("scrollWrapper") : null
  }
}), app.views.quark.article.IPadArticle = Jux.extend(app.views.quark.article.DesktopArticle, {}), app.views.quark.article.IPhoneArticle = Class.extend(app.views.quark.article.Article, {
  layout: "container"
}), app.views.quark.article.paletteManifest = {
  layout: "tabs",
  cls: "paletteTabs",
  items: [{
    title: "Content",
    items: [{
      layout: "columns",
      style: {
        "padding-top": "6px",
        margin: "0 6px 4px 6px"
      },
      items: [{
        columnWidth: "23%",
        type: "ImageSelector",
        key: "background_picture",
        height: 50,
        width: 60
      }, {
        columnWidth: "77%",
        type: "TextArea",
        key: "title",
        emptyText: "A Sweet Tale",
        height: 58,
        autoGrow: !1,
        restoreEmptyText: !1
      }]
    }, {
      type: "TextArea",
      cls: "articleTextArea",
      key: "text",
      style: {
        margin: "0 6px"
      },
      labelPosition: "top",
      emptyText: 'They were crazily verbal, crazily charismatic, crazy with talent. They sang songs that were parodic and brilliant, which they’d written themselves and which were like a private language: I memorized them, as I would a record by The Residents or Frank Zappa.\n\nThese girls blew hot, and were often mockingly affectionate or even briefly lusty in my direction, but in their willingness to show disdain, to crush unworthiness like a bug, they were fundamentally cool, cool, cool.\n\nWords by Jonathan Lethem\nPhoto by <a href="https://jamesramos.jux.com">James Ramos</a> ',
      autoGrow: !0,
      restoreEmptyText: !1
    }, {
      type: "Section",
      items: [{
        type: "dropdown",
        label: "Photo permissions",
        labelPosition: "top",
        menuCls: "photoPermissionsMenu",
        id: "photoPermissionDropdown",
        style: {
          margin: "0 8px 0 0",
          "padding-top": "2px"
        },
        options: [{
          text: "Choose one (optional)",
          value: ""
        }, {
          text: "Share freely",
          value: "http://creativecommons.org/licenses/by/3.0"
        }, {
          text: "Allow non-commercial use",
          value: "http://creativecommons.org/licenses/by-nc/3.0"
        }, {
          text: "All rights reserved",
          value: "r"
        }]
      }]
    }]
  }, {
    title: "Style",
    items: [{
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "28%",
        type: "Label",
        text: "Photo size",
        style: {
          "padding-top": "2px"
        }
      }, {
        columnWidth: "72%",
        type: "ItemSelector",
        key: "picture_size",
        items: [{
          cls: "pictureSize pictureSize-fill",
          value: "fill"
        }, {
          cls: "pictureSize pictureSize-fitWide",
          value: "fitWide"
        }, {
          cls: "pictureSize pictureSize-fit",
          value: "fit"
        }, {
          cls: "pictureSize pictureSize-frame",
          value: "frame"
        }]
      }]
    }, {
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "28%",
        type: "Label",
        text: "Article position"
      }, {
        columnWidth: "72%",
        type: "ItemSelector",
        key: "layout",
        items: [{
          cls: "textPosition textPosition-left",
          value: "left"
        }, {
          cls: "textPosition textPosition-center",
          value: "center"
        }, {
          cls: "textPosition textPosition-right",
          value: "right"
        }]
      }]
    }, {
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "28%",
        type: "Label",
        text: "Text alignment"
      }, {
        columnWidth: "72%",
        type: "ItemSelector",
        key: "text_alignment",
        items: [{
          cls: "textAlignment textAlignment-justify",
          value: "justify"
        }, {
          cls: "textAlignment textAlignment-left",
          value: "left"
        }, {
          cls: "textAlignment textAlignment-center",
          value: "center"
        }, {
          cls: "textAlignment textAlignment-right",
          value: "right"
        }]
      }]
    }, {
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "28%",
        type: "Label",
        text: "Background"
      }, {
        columnWidth: "72%",
        type: "ColorSetCustomizer",
        key: "color_scheme",
        colors: [{
          name: "background_color"
        }]
      }]
    }, {
      type: "Section",
      items: [{
        items: [{
          type: "FontCustomizer",
          label: "Title",
          key: "title_font",
          style: {
            "padding-bottom": "4px"
          },
          minSize: 20,
          maxSize: 200
        }, {
          type: "ItemSelector",
          key: "font_effect",
          items: [{
            label: "Normal",
            cls: "fontEffect fontEffect-none",
            value: ""
          }, {
            label: "Reverse",
            cls: "fontEffect fontEffect-reverse",
            value: "reverse"
          }, {
            label: "Transparent",
            cls: "fontEffect fontEffect-transparent",
            value: "transparent"
          }, {
            label: "Blur",
            cls: "fontEffect fontEffect-blur",
            value: "blur"
          }, {
            label: "Neon",
            cls: "fontEffect fontEffect-neon",
            value: "neon"
          }, {
            label: "Shadow",
            cls: "fontEffect fontEffect-shadow",
            value: "shadow"
          }, {
            label: "3D",
            cls: "fontEffect fontEffect-threeD",
            value: "threeD"
          }]
        }]
      }]
    }, {
      type: "Section",
      items: [{
        items: [{
          type: "FontCustomizer",
          label: "Text",
          key: "text_font",
          minSize: 10,
          maxSize: 32,
          fontFaceOptions: [{
            text: "Muli",
            value: "Muli",
            style: {
              "font-family": "Muli"
            }
          }, {
            text: "Helvetica",
            value: "HelveticaNeueLt",
            style: {
              "font-family": "HelveticaNeueLt"
            }
          }, {
            text: "Din",
            value: "dinLtCnd",
            style: {
              "font-family": "dinLtCnd"
            }
          }, {
            text: "Francois",
            value: "Francois One",
            style: {
              "font-family": "Francois One"
            }
          }, {
            text: "Sansation",
            value: "sansation",
            style: {
              "font-family": "sansation"
            }
          }, {
            text: "Baskerville",
            value: "baskervilleITC",
            style: {
              "font-family": "baskervilleITC"
            }
          }, {
            text: "Kameron",
            value: "Kameron",
            style: {
              "font-family": "Kameron"
            }
          }, {
            text: "Courier",
            value: "Courier",
            style: {
              "font-family": "Courier"
            }
          }, {
            text: "Anonymous",
            value: "Anonymous Pro",
            style: {
              "font-family": "Anonymous Pro"
            }
          }, {
            text: "Aurore",
            value: "La Belle Aurore",
            style: {
              "font-family": "La Belle Aurore"
            }
          }]
        }]
      }]
    }, {
      type: "Section",
      cls: "photo-effects",
      items: [{
        type: "Label",
        text: "Photo effect"
      }, {
        layout: "columns",
        items: [{
          columnWidth: "20%",
          type: "ToggleItem",
          key: "cross_process",
          label: "Drama",
          buttons: !1,
          onCls: "photoEffect effect-cross_process",
          offCls: "photoEffect effect-cross_process"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "lomo",
          label: "Lomo",
          buttons: !1,
          onCls: "photoEffect effect-lomo",
          offCls: "photoEffect effect-lomo"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "greyscale",
          label: "B&amp;W",
          buttons: !1,
          onCls: "photoEffect effect-bw",
          offCls: "photoEffect effect-bw"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "fade",
          label: "Fade",
          buttons: !1,
          onCls: "photoEffect effect-fade",
          offCls: "photoEffect effect-fade"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "blur",
          label: "Blur",
          buttons: !1,
          onCls: "photoEffect effect-blur",
          offCls: "photoEffect effect-blur"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "tilt_shift",
          label: "TiltShift",
          buttons: !1,
          onCls: "photoEffect effect-tilt_shift",
          offCls: "photoEffect effect-tilt_shift"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "flip",
          label: "Flip",
          buttons: !1,
          onCls: "photoEffect effect-flip",
          offCls: "photoEffect effect-flip"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "mirror_in",
          label: "Mirror in",
          buttons: !1,
          onCls: "photoEffect effect-mirrorIn",
          offCls: "photoEffect effect-mirrorIn"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "mirror_out",
          label: "Mirror out",
          buttons: !1,
          onCls: "photoEffect effect-mirrorOut",
          offCls: "photoEffect effect-mirrorOut"
        }, {
          columnWidth: "20%",
          type: "ToggleItem",
          key: "mustachify",
          label: "Mustachify",
          buttons: !1,
          onCls: "photoEffect effect-mustachify",
          offCls: "photoEffect effect-mustachify"
        }]
      }]
    }]
  }]
}, app.views.quark.article.layouts.handheld = {
  width: "100%",
  cls: "handheld articleContent-background",
  items: [{
    id: "scrollWrapper",
    width: "100%",
    items: [{
      id: "innerScroller",
      width: "100%",
      height: "auto",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        width: "100%",
        height: 280
      }, {
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "100%",
          height: "auto",
          style: {
            "text-align": "center",
            margin: "0 auto"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title",
              style: {
                padding: "15px 0 15px"
              }
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author"
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: "",
            style: {
              padding: "20px 10px 45px",
              "text-align": "left"
            }
          }]
        }]
      }]
    }]
  }]
}, app.views.quark.article.layouts.desktop.fill = {
  left: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-left",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        width: "100%",
        height: "100%",
        layout: {
          type: "center",
          centerX: !1,
          useTable: !0
        },
        items: [{
          id: "innerScroller",
          cls: "articleContent-background",
          width: 480,
          style: {
            "white-space": "normal",
            padding: "45px 90px",
            margin: "100px 28px"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        width: "100%",
        height: "100%",
        layout: {
          type: "center",
          centerX: !1,
          useTable: !0
        },
        items: [{
          id: "innerScroller",
          cls: "articleContent-background",
          width: 480,
          style: {
            "white-space": "normal",
            padding: "45px 90px",
            margin: "100px auto"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        width: "100%",
        height: "100%",
        layout: {
          type: "center",
          centerX: !1,
          useTable: !0
        },
        items: [{
          id: "innerScroller",
          cls: "articleContent-background",
          width: 480,
          style: {
            "white-space": "normal",
            padding: "45px 90px",
            margin: "100px 28px",
            "float": "right"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.desktop.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left",
    items: [{
      flex: 1,
      cls: "articleContent-background"
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        "overflow-x": "hidden"
      },
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        layout: {
          type: "center",
          useTable: !0
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            width: "40%",
            padding: "100px 5% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "fit",
    items: {
      id: "scrollWrapper",
      type: "ManagedScrollableContainer",
      constrainHeight: !1,
      cls: "articleContent-background textPosition-center",
      width: "100%",
      layout: {
        type: "centerfitlayout",
        imagePercentHeight: "55%"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }, {
        layout: {
          type: "center",
          centerY: !1,
          useTable: !0
        },
        style: {
          width: "100%"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "50%",
          height: "auto",
          style: {
            "text-align": "center",
            padding: "45px 45px 100px",
            margin: "0 auto"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      flex: 1,
      cls: "articleContent-background"
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "50%",
        layout: {
          type: "center",
          useTable: !0
        },
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            padding: "100px 10% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.desktop.fitWide = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left",
    items: [{
      flex: 1,
      cls: "articleContent-background"
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 2.333
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        "overflow-y": "auto",
        "overflow-x": "hidden"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            width: "23.34%",
            padding: "100px 3.33% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "fit",
    items: {
      id: "scrollWrapper",
      type: "ManagedScrollableContainer",
      constrainHeight: !1,
      cls: "articleContent-background textPosition-center",
      width: "100%",
      layout: {
        type: "centerfitlayout",
        imagePercentHeight: "68%"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }, {
        layout: {
          type: "center",
          centerY: !1,
          useTable: !1
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "92%",
          height: "auto",
          style: {
            "text-align": "center",
            padding: "40px 4% 20px",
            margin: "0 auto",
            overflow: "auto"
          },
          items: [{
            id: "titleBylineWrap",
            cls: "titleBylineWrap",
            style: {
              width: "40%",
              "float": "left",
              clear: "both"
            },
            items: [{
              cls: "articleContent-title",
              items: [{
                type: "label",
                id: "title",
                cls: "titleText title-font",
                text: "Title"
              }]
            }, {
              id: "bylineWrap",
              cls: "articleContent-author"
            }]
          }, {
            type: "label",
            id: "text",
            cls: "text-font columns-2",
            text: "",
            style: {
              width: "46%",
              "float": "right",
              "padding-left": "4%"
            }
          }]
        }]
      }]
    }
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 2.333
    }, {
      flex: 1,
      cls: "articleContent-background"
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "30%",
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            padding: "100px 11.11% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.desktop.frame = {
  left: {
    layout: "legacyabsolute",
    cls: "articleContent-background textPosition-left",
    style: {
      overflow: "hidden"
    },
    items: [{
      layout: "center",
      cls: "image-container",
      width: "50%",
      height: "100%",
      vAlign: "middle",
      style: {
        "float": "right",
        overflow: "hidden"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        fillmore: !1,
        style: {
          "max-width": "100%",
          "max-height": "100%"
        },
        imgStyle: {
          "max-width": "90%",
          "max-height": "90%"
        }
      }]
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "hidden"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            width: "40%",
            padding: "120px 5% 120px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  },
  center: {
    layout: {
      type: "legacyabsolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    cls: "articleContent-background textPosition-center",
    items: [{
      layout: {
        type: "center",
        useTable: !0
      },
      id: "scrollWrapper",
      type: "ManagedScrollableContainer",
      width: "100%",
      height: "100%",
      items: [{
        id: "frameBox",
        width: "100%",
        height: "auto",
        style: {
          margin: "100px auto 100px"
        },
        items: [{
          cls: "articleContent-title",
          items: [{
            type: "label",
            id: "title",
            cls: "titleText title-font",
            text: "Title",
            style: {
              "text-align": "center !important",
              display: "inline-block",
              margin: "0 12% 25px 12%"
            }
          }]
        }, {
          cls: "image-container",
          items: [{
            type: "FillmorableImage",
            cls: "picture-container",
            id: "backgroundPicture",
            fillmore: !1,
            imgAttr: {
              width: "auto"
            },
            imgStyle: {
              height: "auto",
              width: "auto",
              "max-width": "65%"
            },
            style: {
              margin: "0 auto"
            }
          }]
        }, {
          id: "bylineWrap",
          cls: "articleContent-author",
          style: {
            margin: "40px auto 0",
            "text-align": "center !important"
          }
        }, {
          width: 600,
          height: "100%",
          cls: "textWrap",
          style: {
            margin: "20px auto"
          },
          items: [{
            layout: "center",
            width: "100%",
            height: "100%",
            items: [{
              id: "contentWrap",
              cls: "content-wrap",
              style: {
                overflow: "hidden"
              },
              items: [{
                type: "label",
                id: "text",
                cls: "text-font",
                text: ""
              }]
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyabsolute",
    cls: "articleContent-background textPosition-right",
    style: {
      overflow: "hidden"
    },
    items: [{
      layout: "center",
      cls: "image-container",
      width: "50%",
      height: "100%",
      vAlign: "middle",
      style: {
        "float": "left"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        fillmore: !1,
        style: {
          "max-width": "100%",
          "max-height": "100%"
        },
        imgStyle: {
          "max-width": "90%",
          "max-height": "90%"
        }
      }]
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            "float": "right",
            width: "40%",
            padding: "120px 5% 120px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 20px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.iPad.fill = {
  left: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-left",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        width: "100%",
        height: "100%",
        layout: {
          type: "center",
          centerX: !1,
          useTable: !0
        },
        items: [{
          id: "innerScroller",
          cls: "articleContent-background",
          width: 480,
          style: {
            "white-space": "normal",
            padding: "45px 90px",
            margin: "100px 28px"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        width: "100%",
        height: "100%",
        layout: {
          type: "center",
          centerX: !1,
          useTable: !0
        },
        items: [{
          id: "innerScroller",
          cls: "articleContent-background",
          width: 480,
          style: {
            "white-space": "normal",
            padding: "45px 90px",
            margin: "100px auto"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        width: "100%",
        height: "100%",
        layout: {
          type: "center",
          centerX: !1,
          useTable: !0
        },
        items: [{
          id: "innerScroller",
          cls: "articleContent-background",
          width: 480,
          style: {
            "white-space": "normal",
            padding: "45px 90px",
            margin: "100px 28px",
            "float": "right"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.iPad.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left",
    items: [{
      flex: 1,
      cls: "articleContent-background"
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        "overflow-x": "hidden"
      },
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        layout: {
          type: "center",
          useTable: !0
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            width: "40%",
            padding: "100px 5% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "fit",
    items: {
      id: "scrollWrapper",
      type: "ManagedScrollableContainer",
      constrainHeight: !1,
      cls: "articleContent-background textPosition-center",
      width: "100%",
      layout: {
        type: "centerfitlayout",
        imagePercentHeight: "35%"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }, {
        layout: {
          type: "center",
          centerY: !1,
          useTable: !0
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "50%",
          height: "auto",
          style: {
            "text-align": "center",
            padding: "45px 45px 100px",
            margin: "0 auto"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      flex: 1,
      cls: "articleContent-background"
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "50%",
        layout: {
          type: "center",
          useTable: !0
        },
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            padding: "100px 10% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.iPad.fitWide = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left",
    items: [{
      flex: 1,
      cls: "articleContent-background"
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 2.333
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        "overflow-y": "auto",
        "overflow-x": "hidden"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            width: "23.34%",
            padding: "100px 3.33% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 5
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "fit",
    items: {
      id: "scrollWrapper",
      type: "ManagedScrollableContainer",
      constrainHeight: !1,
      cls: "articleContent-background textPosition-center",
      width: "100%",
      layout: {
        type: "centerfitlayout",
        imagePercentHeight: "55%"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }, {
        layout: {
          type: "center",
          centerY: !1,
          useTable: !0
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "92%",
          height: "auto",
          style: {
            "text-align": "center",
            padding: "40px 4% 100px",
            margin: "0 auto",
            overflow: "auto"
          },
          items: [{
            id: "titleBylineWrap",
            cls: "titleBylineWrap",
            style: {
              width: "40%",
              "float": "left",
              clear: "both"
            },
            items: [{
              cls: "articleContent-title",
              items: [{
                type: "label",
                id: "title",
                cls: "titleText title-font",
                text: "Title"
              }]
            }, {
              id: "bylineWrap",
              cls: "articleContent-author"
            }]
          }, {
            type: "label",
            id: "text",
            cls: "text-font columns-2",
            text: "",
            style: {
              width: "46%",
              "float": "right",
              "padding-left": "4%"
            }
          }]
        }]
      }]
    }
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 2.333
    }, {
      flex: 1,
      cls: "articleContent-background"
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "30%",
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            padding: "100px 11.11% 100px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  }
}, app.views.quark.article.layouts.iPad.frame = {
  left: {
    layout: "legacyabsolute",
    cls: "articleContent-background textPosition-left",
    style: {
      overflow: "hidden"
    },
    items: [{
      layout: "center",
      cls: "image-container",
      width: "50%",
      height: "100%",
      vAlign: "middle",
      style: {
        "float": "right",
        overflow: "hidden"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        fillmore: !1,
        style: {
          "max-width": "90%",
          "max-height": "90%"
        },
        imgStyle: {
          "max-width": "90%",
          "max-height": "90%"
        }
      }]
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "hidden"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            width: "40%",
            padding: "120px 5% 120px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  },
  center: {
    layout: {
      type: "legacyabsolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    cls: "articleContent-background textPosition-center",
    items: [{
      layout: {
        type: "center",
        useTable: !0
      },
      id: "scrollWrapper",
      type: "ManagedScrollableContainer",
      width: "100%",
      height: "100%",
      items: [{
        id: "frameBox",
        width: "100%",
        height: "auto",
        style: {
          margin: "100px auto 100px"
        },
        items: [{
          cls: "articleContent-title",
          items: [{
            type: "label",
            id: "title",
            cls: "titleText title-font",
            text: "Title",
            style: {
              "text-align": "center !important",
              display: "inline-block",
              margin: "0 5% 25px 5%"
            }
          }]
        }, {
          cls: "image-container",
          items: [{
            type: "FillmorableImage",
            cls: "picture-container",
            id: "backgroundPicture",
            fillmore: !1,
            imgAttr: {
              width: "auto"
            },
            imgStyle: {
              "max-width": "65%"
            },
            style: {
              margin: "0 auto"
            }
          }]
        }, {
          id: "bylineWrap",
          cls: "articleContent-author",
          style: {
            margin: "40px auto 0",
            "text-align": "center !important"
          }
        }, {
          width: 600,
          height: "100%",
          cls: "textWrap",
          style: {
            margin: "40px auto"
          },
          items: [{
            layout: "center",
            width: "100%",
            height: "100%",
            items: [{
              id: "contentWrap",
              cls: "content-wrap",
              style: {
                overflow: "hidden"
              },
              items: [{
                type: "label",
                id: "text",
                cls: "text-font",
                text: ""
              }]
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyabsolute",
    cls: "articleContent-background textPosition-right",
    style: {
      overflow: "hidden"
    },
    items: [{
      layout: "center",
      cls: "image-container",
      width: "50%",
      height: "100%",
      vAlign: "middle",
      style: {
        "float": "left"
      },
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        fillmore: !1,
        style: {
          "max-width": "100%",
          "max-height": "100%"
        },
        imgStyle: {
          "max-width": "90%",
          "max-height": "90%"
        }
      }]
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: !0
        },
        id: "scrollWrapper",
        type: "ManagedScrollableContainer",
        height: "100%",
        width: "100%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          height: "auto",
          style: {
            "float": "right",
            width: "40%",
            padding: "120px 5% 120px",
            "text-align": "left",
            "white-space": "normal"
          },
          items: [{
            cls: "articleContent-title",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText title-font",
              text: "Title"
            }]
          }, {
            id: "bylineWrap",
            cls: "articleContent-author",
            style: {
              margin: "0 0 30px"
            }
          }, {
            type: "label",
            id: "text",
            cls: "text-font",
            text: ""
          }]
        }]
      }]
    }]
  }
}, app.views.quark.blockquote.Blockquote = Jux.extend(app.views.quark.AbstractMonoQuark, {
  createLayoutContainer: function () {
    var e = app.views.quark.blockquote,
      t;
    return Jux.isIPhone ? t = e.IPhoneLayoutContainer : Jux.isTouch ? t = e.TouchLayoutContainer : t = e.LayoutContainer, new t({
      currentUser: this.currentUser,
      model: this.model,
      quarkPackageName: this.quarkTypeName
    })
  }
}), app.views.quark.blockquote.LayoutContainer = app.views.quark.MonoQuarkLayoutContainer.extend({
  initComponent: function () {
    var e = this.model;
    this._super(arguments), this.contentWrapContainer = this.findById("contentWrap"), this.infoRowContainer = this.findById("infoRow");
    var t = this.textLabel = this.findById("text");
    t.setAttr("origfontsize", 300), this.updateText(), this.updateFontEffect()
  },
  onLayout: function () {
    this._super(arguments), this.updateTextSize()
  },
  onDataChange: function (e, t, n) {
    this._super(arguments);
    switch (t) {
    case "text":
      this.updateText();
      break;
    case "font":
      this.updateTextSize();
      break;
    case "font_effect":
      this.updateFontEffect()
    }
  },
  updateText: function () {
    var e = this.model.get("text");
    e = app.views.quark.Quark.autolinkUrls(e), e = e.replace(/&nbsp;/i, " ").replace(/([^\s<>]{7})([^\s<>]{4})((?=[^>]+<)|(?=[^>]+$))/g, "$1&shy;$2").replace(/ {2}/g, " &nbsp;"), Jux.isHandheld && (e = jQuery.trim(e)), this.textLabel.setText('<span class="highlight-shadow"><span class="highlight">' + Jux.util.Html.nl2br(e) + "</span></span>")
  },
  updateTextSize: function () {
    if (this.rendered) {
      var e = (200 - this.model.get("font").size) / 10;
      this.textLabel.getEl().fitText(e)
    }
  },
  updateFontEffect: function () {
    var e = this.model.get("font_effect"),
      t = app.views.quark.Quark.getFontEffects().join(" ");
    this.contentWrapContainer.removeCls(t).addCls(e)
  }
}), app.views.quark.blockquote.TouchLayoutContainer = Jux.extend(app.views.quark.blockquote.LayoutContainer, {
  onBeforeLayout: function () {
    this.scroller && this.scroller.destroy(), this._super(arguments)
  },
  onLayout: function () {
    this._super(arguments);
    var e = this.findById("scrollWrapper");
    e && (this.scroller = new app.components.IScroll({
      el: e.getEl()
    }))
  },
  onBackgroundPictureLoad: function () {
    this._super(arguments), this.scroller && this.scroller.refresh()
  },
  onDestroy: function () {
    this.scroller && this.scroller.destroy(), this._super(arguments)
  }
}), app.views.quark.blockquote.IPhoneLayoutContainer = Jux.extend(app.views.quark.blockquote.TouchLayoutContainer, {
  onLayout: function () {
    this._super(arguments);
    if (!this.iPhoneLayoutContainerInitialized) {
      var e = this.contentWrapContainer.getEl();
      e.css("-webkit-transition", "opacity 0.3s ease-in-out"), this.captionVisible = !0, this.captionTouch = {};
      var t = this;
      this.$el.bind("touchstart", function (e) {
        var n = e.originalEvent.touches[0];
        t.captionTouch = {
          x1: n.clientX,
          y1: n.clientY,
          x2: n.clientX,
          y2: n.clientY
        }
      }).bind("touchmove", function (n) {
        var r = n.originalEvent.touches[0];
        t.captionTouch.x2 = r.clientX, t.captionTouch.y2 = r.clientY;
        if (Math.abs(t.captionTouch.y2 - t.captionTouch.y1) > 10 || Math.abs(t.captionTouch.x2 - t.captionTouch.x1) > 10) t.captionVisible = !0, e.css("opacity", 1)
      }).bind("touchend", function (n) {
        Math.abs(t.captionTouch.y2 - t.captionTouch.y1) < 10 && Math.abs(t.captionTouch.x2 - t.captionTouch.x1) < 10 && (t.captionVisible = !t.captionVisible, e.css("opacity", t.captionVisible ? 1 : 0))
      }), this.iPhoneLayoutContainerInitialized = !0
    }
  }
}), app.views.quark.blockquote.paletteManifest = {
  items: {
    id: "mainAccordion",
    layout: "Accordion",
    height: 350,
    items: [{
      title: "Express Yourself",
      items: [{
        type: "Section",
        width: "98%",
        items: {
          type: "TextArea",
          key: "text",
          emptyText: "What's up?",
          autoGrow: !0,
          restoreEmptyText: !1
        }
      }, {
        type: "Section",
        layout: "Columns",
        items: [{
          columnWidth: "26%",
          type: "Label",
          text: "Change photo"
        }, {
          columnWidth: "74%",
          items: {
            type: "PictureSelector",
            cls: "backgroundImage-pictureSelector",
            key: "background_picture",
            height: 75,
            width: 75
          }
        }]
      }]
    }, {
      title: "Stylize",
      id: "styleIt",
      items: [{
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "28%",
          type: "Label",
          text: "Photo size",
          style: {
            "padding-top": "2px"
          }
        }, {
          columnWidth: "72%",
          type: "ItemSelector",
          key: "picture_size",
          items: [{
            cls: "pictureSize pictureSize-fill",
            value: "fill"
          }, {
            cls: "pictureSize pictureSize-fit",
            value: "fit"
          }, {
            cls: "pictureSize pictureSize-frame",
            value: "frame"
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "28%",
          type: "Label",
          text: "Text position"
        }, {
          columnWidth: "72%",
          type: "ItemSelector",
          key: "layout",
          items: [{
            cls: "textPosition textPosition-left",
            value: "left"
          }, {
            cls: "textPosition textPosition-center",
            value: "center"
          }, {
            cls: "textPosition textPosition-right",
            value: "right"
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "28%",
          type: "Label",
          text: "Background (if photo is small)"
        }, {
          columnWidth: "72%",
          type: "ColorSetCustomizer",
          key: "color_scheme",
          colors: [{
            name: "background_color"
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Font",
            key: "font",
            style: {
              "padding-bottom": "4px"
            },
            minSize: 150,
            maxSize: 195
          }, {
            type: "ItemSelector",
            key: "font_effect",
            items: [{
              label: "Normal",
              cls: "fontEffect fontEffect-none",
              value: ""
            }, {
              label: "Reverse",
              cls: "fontEffect fontEffect-reverse",
              value: "reverse"
            }, {
              label: "Transparent",
              cls: "fontEffect fontEffect-transparent",
              value: "transparent"
            }, {
              label: "Shadow",
              cls: "fontEffect fontEffect-shadow",
              value: "shadow"
            }, {
              label: "Blur",
              cls: "fontEffect fontEffect-blur",
              value: "blur"
            }, {
              label: "Neon",
              cls: "fontEffect fontEffect-neon",
              value: "neon"
            }, {
              label: "3D",
              cls: "fontEffect fontEffect-threeD",
              value: "threeD"
            }]
          }]
        }]
      }, {
        type: "Section",
        cls: "photo-effects",
        items: [{
          type: "Label",
          text: "Photo effect"
        }, {
          layout: "columns",
          items: [{
            columnWidth: "20%",
            type: "ToggleItem",
            key: "cross_process",
            label: "Drama",
            buttons: !1,
            onCls: "photoEffect effect-cross_process",
            offCls: "photoEffect effect-cross_process"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "lomo",
            label: "Lomo",
            buttons: !1,
            onCls: "photoEffect effect-lomo",
            offCls: "photoEffect effect-lomo"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "greyscale",
            label: "B&amp;W",
            buttons: !1,
            onCls: "photoEffect effect-bw",
            offCls: "photoEffect effect-bw"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "fade",
            label: "Fade",
            buttons: !1,
            onCls: "photoEffect effect-fade",
            offCls: "photoEffect effect-fade"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "blur",
            label: "Blur",
            buttons: !1,
            onCls: "photoEffect effect-blur",
            offCls: "photoEffect effect-blur"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "tilt_shift",
            label: "TiltShift",
            buttons: !1,
            onCls: "photoEffect effect-tilt_shift",
            offCls: "photoEffect effect-tilt_shift"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "flip",
            label: "Flip",
            buttons: !1,
            onCls: "photoEffect effect-flip",
            offCls: "photoEffect effect-flip"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "mirror_in",
            label: "Mirror in",
            buttons: !1,
            onCls: "photoEffect effect-mirrorIn",
            offCls: "photoEffect effect-mirrorIn"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "mirror_out",
            label: "Mirror out",
            buttons: !1,
            onCls: "photoEffect effect-mirrorOut",
            offCls: "photoEffect effect-mirrorOut"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "mustachify",
            label: "Mustachify",
            buttons: !1,
            onCls: "photoEffect effect-mustachify",
            offCls: "photoEffect effect-mustachify"
          }]
        }]
      }]
    }, {
      title: "Set Options",
      items: [{
          type: "Section",
          id: "galleryDropdownSection",
          items: [{
            type: "dropdown",
            id: "galleryDropdown",
            label: "In Jux",
            labelPosition: "top",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: []
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "DateTime",
            key: "sort_time",
            label: "Schedule post or date in the past",
            labelPosition: "top"
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_posted_time",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "21px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        },
        app.views.quark.PaletteShared.customizeBylineSection, {
          type: "Section",
          items: [{
            type: "dropdown",
            label: "Photo permissions",
            labelPosition: "top",
            menuCls: "photoPermissionsMenu",
            id: "photoPermissionDropdown",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: [{
              text: "Choose one (optional)",
              value: ""
            }, {
              text: "Share freely",
              value: "http://creativecommons.org/licenses/by/3.0"
            }, {
              text: "Allow non-commercial use",
              value: "http://creativecommons.org/licenses/by-nc/3.0"
            }, {
              text: "All rights reserved",
              value: "r"
            }]
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Proudly display the Jux badge",
            style: {
              "padding-top": "7px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "badge",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: "hype"
            }, {
              text: "Hide",
              value: ""
            }]
          }]
        }
      ]
    }]
  }
}, app.views.quark.blockquote.layouts.handheld = {
  layout: "legacyhbox",
  width: "100%",
  height: "100%",
  cls: "picture-fill-screen",
  items: [{
    type: "FillmorableImage",
    cls: "picture-container",
    id: "backgroundPicture",
    flex: 1
  }, {
    layout: {
      type: "legacyabsolute",
      bottom: 0,
      left: 0,
      top: 0,
      right: 0
    },
    id: "contentWrap",
    cls: "content-wrap showCaption",
    items: [{
      layout: {
        type: "center",
        centerX: !1
      },
      id: "scrollWrapper",
      width: "100%",
      height: "100%",
      style: {
        overflow: "hidden"
      },
      items: [{
        id: "innerScroller",
        items: [{
          type: "label",
          id: "text",
          cls: "blockquote-text",
          text: "",
          style: {
            margin: "15px"
          }
        }, {
          id: "bylineWrap",
          cls: "bylineWrap",
          style: {
            display: "inline-block",
            margin: "0 0 0 15px"
          }
        }]
      }]
    }]
  }]
}, app.views.quark.blockquote.layouts.desktop.fill = {
  left: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-left",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        layout: {
          type: "center",
          centerX: !1,
          useTable: !1,
          useExactPixelWidth: !0
        },
        id: "scrollWrapper",
        width: "100%",
        height: "100%",
        style: {
          overflow: "auto"
        },
        items: [{
          id: "innerScroller",
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              margin: "45px 40% 45px 45px",
              "min-height": "97%"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 45
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              display: "inline-block"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 0
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        layout: {
          type: "center",
          useTable: !1,
          useExactPixelWidth: !0
        },
        id: "scrollWrapper",
        width: "100%",
        height: "100%",
        style: {
          overflow: "auto"
        },
        items: [{
          id: "innerScroller",
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              margin: "45px 20% 45px 20%"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            width: "100%",
            style: {
              display: "inline-block"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 0
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        layout: {
          type: "center",
          centerX: !1,
          useTable: !1,
          useExactPixelWidth: !0
        },
        id: "scrollWrapper",
        width: "100%",
        height: "100%",
        style: {
          overflow: "auto",
          "text-align": "right"
        },
        items: [{
          id: "innerScroller",
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              "font-size": "300px",
              margin: "45px 45px 45px 40%"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              right: 45
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              display: "inline-block"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 0
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  }
}, app.views.quark.blockquote.layouts.desktop.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left backgroundColor",
    items: [{
      flex: 1
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: Jux.isTouch ? !1 : !0
        },
        id: "scrollWrapper",
        height: "100%",
        width: "99%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          style: {
            width: "40%",
            padding: "50px 5%",
            "text-align": "center"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: ""
          }, {
            id: "bylineWrap",
            cls: "bylineWrap",
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 0,
              right: "50%"
            },
            style: {
              display: "inline-block"
            }
          }]
        }]
      }]
    }]
  },
  center: {
    width: "100%",
    cls: "backgroundColor textPosition-center",
    style: {
      "overflow-x": "hidden",
      "overflow-y": "scroll"
    },
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      width: "100%",
      style: {
        "max-height": "65%",
        overflow: "hidden"
      }
    }, {
      layout: {
        type: "center",
        useTable: Jux.isTouch ? !1 : !0
      },
      id: "scrollWrapper",
      height: "35%",
      width: "100%",
      items: [{
        id: "contentWrap",
        cls: "content-wrap showCaption",
        style: {
          "text-align": "center",
          padding: "45px"
        },
        items: [{
          type: "label",
          id: "text",
          cls: "blockquote-text",
          text: ""
        }, {
          layout: {
            type: "legacyabsolute",
            bottom: 15,
            left: 0
          },
          id: "bylineWrap",
          cls: "bylineWrap",
          width: "100%",
          style: {
            display: "inline-block"
          }
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: Jux.isTouch ? !1 : !0
        },
        id: "scrollWrapper",
        height: "100%",
        width: "50%",
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          style: {
            "text-align": "center",
            padding: "50px 10%"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 0,
              right: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              display: "inline-block",
              "text-align": "center"
            }
          }]
        }]
      }]
    }]
  }
}, app.views.quark.blockquote.layouts.desktop.frame = {
  left: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-left",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      style: {
        margin: "20px auto",
        background: "rgba(255, 255, 255, 0.075)"
      },
      items: [{
        flex: 1,
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "90%",
          height: "90%",
          style: {
            overflow: "hidden",
            padding: "45px 6% 60px"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              "word-wrap": "pre"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 12,
              left: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            width: "100%",
            style: {
              display: "inline-block"
            }
          }]
        }]
      }, {
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 45,
            right: 0,
            bottom: 45,
            left: 500
          }
        }]
      }]
    }]
  },
  center: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-center",
    items: [{
      id: "frameBox",
      style: {
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.1)"
      },
      items: [{
        type: "container",
        layout: "frame",
        style: {
          position: "relative",
          margin: "0 auto"
        },
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 45,
            right: "10%",
            bottom: 45,
            left: "10%"
          }
        }, {
          layout: {
            type: "legacyabsolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          width: "100%",
          height: "100%",
          items: [{
            layout: "center",
            width: "100%",
            height: "100%",
            items: [{
              id: "contentWrap",
              cls: "content-wrap showCaption",
              style: {
                overflow: "hidden",
                margin: "5%"
              },
              items: [{
                type: "label",
                id: "text",
                cls: "blockquote-text",
                text: "",
                style: {
                  "word-wrap": "pre"
                }
              }, {
                layout: {
                  type: "legacyabsolute",
                  bottom: -20,
                  left: 0
                },
                id: "bylineWrap",
                cls: "bylineWrap",
                width: "100%",
                style: {
                  display: "inline-block"
                }
              }]
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      style: {
        margin: "20px auto",
        background: "rgba(255, 255, 255, 0.1)"
      },
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 45,
            right: 500,
            bottom: 45,
            left: 0
          }
        }]
      }, {
        flex: 1,
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "90%",
          height: "90%",
          style: {
            overflow: "hidden",
            padding: "45px 6% 60px"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              "white-space": "pre-wrap"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 12,
              right: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            width: "100%",
            style: {
              display: "inline-block"
            }
          }]
        }]
      }]
    }]
  }
}, app.views.quark.blockquote.layouts.iPad.fill = {
  left: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-left",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        layout: {
          type: "center",
          centerX: !1,
          useTable: !1,
          useExactPixelWidth: !0
        },
        id: "scrollWrapper",
        width: "100%",
        height: "100%",
        style: {
          overflow: "auto"
        },
        items: [{
          id: "innerScroller",
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              margin: "45px 40% 45px 45px",
              "min-height": "97%"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 45
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              display: "inline-block"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 0
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  center: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        layout: {
          type: "center",
          useTable: !1,
          useExactPixelWidth: !0
        },
        id: "scrollWrapper",
        width: "100%",
        height: "100%",
        style: {
          overflow: "auto"
        },
        items: [{
          id: "innerScroller",
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              margin: "45px 20% 45px 20%"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            width: "100%",
            style: {
              display: "inline-block"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 0
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 0,
        left: 0,
        top: 0,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption",
      items: [{
        layout: {
          type: "center",
          centerX: !1,
          useTable: !1,
          useExactPixelWidth: !0
        },
        id: "scrollWrapper",
        width: "100%",
        height: "100%",
        style: {
          overflow: "auto",
          "text-align": "right"
        },
        items: [{
          id: "innerScroller",
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              "font-size": "300px",
              margin: "45px 45px 45px 40%"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              right: 45
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              display: "inline-block"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 0,
              right: 0
            },
            items: [{
              cls: "picture-container",
              items: {
                type: "button",
                id: "creditsIcon",
                cls: "credits",
                text: ""
              }
            }]
          }]
        }]
      }]
    }]
  }
}, app.views.quark.blockquote.layouts.iPad.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left",
    items: [{
      flex: 1,
      cls: "backgroundColor"
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: Jux.isTouch ? !1 : !0
        },
        id: "scrollWrapper",
        height: "100%",
        width: "99%",
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          style: {
            width: "40%",
            padding: "50px 5%",
            "text-align": "center"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: ""
          }, {
            id: "bylineWrap",
            cls: "bylineWrap",
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 0,
              right: "50%"
            },
            style: {
              display: "inline-block"
            }
          }]
        }]
      }]
    }]
  },
  center: {
    width: "100%",
    cls: "backgroundColor textPosition-center",
    style: {
      "overflow-x": "hidden",
      "overflow-y": "scroll"
    },
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      width: "100%",
      style: {
        "max-height": "65%",
        overflow: "hidden"
      }
    }, {
      layout: {
        type: "center",
        useTable: Jux.isTouch ? !1 : !0
      },
      id: "scrollWrapper",
      height: "35%",
      width: "100%",
      items: [{
        id: "contentWrap",
        cls: "content-wrap showCaption",
        style: {
          "text-align": "center",
          padding: "45px"
        },
        items: [{
          type: "label",
          id: "text",
          cls: "blockquote-text",
          text: ""
        }, {
          layout: {
            type: "legacyabsolute",
            bottom: 15,
            left: 0
          },
          id: "bylineWrap",
          cls: "bylineWrap",
          width: "100%",
          style: {
            display: "inline-block"
          }
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      cls: "backgroundColor",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      style: {
        overflow: "auto"
      },
      items: [{
        layout: {
          type: "center",
          useTable: Jux.isTouch ? !1 : !0
        },
        id: "scrollWrapper",
        height: "100%",
        width: "50%",
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          style: {
            "text-align": "center",
            padding: "50px 10%"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: ""
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 15,
              left: 0,
              right: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              display: "inline-block",
              "text-align": "center"
            }
          }]
        }]
      }]
    }]
  }
}, app.views.quark.blockquote.layouts.iPad.frame = {
  left: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-left",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      style: {
        margin: "20px auto",
        background: "rgba(255, 255, 255, 0.075)"
      },
      items: [{
        flex: 1,
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "90%",
          height: "90%",
          style: {
            overflow: "hidden",
            padding: "45px 6% 60px"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              "word-wrap": "pre"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 12,
              left: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            width: "100%",
            style: {
              display: "inline-block"
            }
          }]
        }]
      }, {
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 45,
            right: 0,
            bottom: 45,
            left: 500
          }
        }]
      }]
    }]
  },
  center: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-center",
    items: [{
      id: "frameBox",
      style: {
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.1)"
      },
      items: [{
        type: "container",
        layout: "frame",
        style: {
          position: "relative",
          margin: "0 auto"
        },
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 45,
            right: "10%",
            bottom: 45,
            left: "10%"
          }
        }, {
          layout: {
            type: "legacyabsolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          width: "100%",
          height: "100%",
          items: [{
            layout: "center",
            width: "100%",
            height: "100%",
            items: [{
              id: "contentWrap",
              cls: "content-wrap showCaption",
              style: {
                overflow: "hidden",
                margin: "5%"
              },
              items: [{
                type: "label",
                id: "text",
                cls: "blockquote-text",
                text: "",
                style: {
                  "word-wrap": "pre"
                }
              }, {
                layout: {
                  type: "legacyabsolute",
                  bottom: -20,
                  left: 0
                },
                id: "bylineWrap",
                cls: "bylineWrap",
                width: "100%",
                style: {
                  display: "inline-block"
                }
              }]
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      style: {
        margin: "20px auto",
        background: "rgba(255, 255, 255, 0.1)"
      },
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 45,
            right: 500,
            bottom: 45,
            left: 0
          }
        }]
      }, {
        flex: 1,
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: "90%",
          height: "90%",
          style: {
            overflow: "hidden",
            padding: "45px 6% 60px"
          },
          items: [{
            type: "label",
            id: "text",
            cls: "blockquote-text",
            text: "",
            style: {
              "white-space": "pre-wrap"
            }
          }, {
            layout: {
              type: "legacyabsolute",
              bottom: 12,
              right: 0
            },
            id: "bylineWrap",
            cls: "bylineWrap",
            width: "100%",
            style: {
              display: "inline-block"
            }
          }]
        }]
      }]
    }]
  }
}, app.views.quark.countdown.Countdown = Jux.extend(app.views.quark.AbstractSlideshowWithTitleSlide, {
  abstractClass: !0,
  initComponent: function () {
    var e = this;
    e._super(arguments), e.model.on("change:ordering", e.onOrderingChange, e)
  },
  createTitleSlide: function () {
    var e = new app.views.quark.countdown.TitleSlideContentContainer({
      id: "contentContainer",
      ownerGalleryUrl: this.model.getOwnerGalleryUrl(),
      model: this.model
    });
    return new app.components.slideshow.slide.Slide({
      cls: "titleSlide",
      items: [e]
    })
  },
  createGeneralSlide: function (e) {
    var t = this.model,
      n = t.get("slides"),
      r = n.getCount(),
      i = n.indexOf(e),
      s = t.get("ordering"),
      o = new app.views.quark.countdown.GeneralSlideContentContainer({
        id: "contentContainer",
        model: e,
        slideNumber: s === "up" ? i + 1 : r - i
      });
    return new app.components.slideshow.slide.Slide({
      cls: "generalSlide",
      items: [o]
    })
  },
  onSlideAdd: function (e, t) {
    this._super(arguments), this.updateSlideNumbers()
  },
  onSlideRemove: function (e, t, n) {
    this._super(arguments), this.updateSlideNumbers()
  },
  onSlideReorder: function (e, t, n, r) {
    this._super(arguments), this.updateSlideNumbers()
  },
  onOrderingChange: function () {
    this.updateSlideNumbers()
  },
  updateSlideNumbers: function () {
    var e = this.slideshow,
      t = e.getItems(),
      n = t.length,
      r = this.model,
      i = r.get("slides"),
      s = r.get("ordering"),
      o, u, a;
    for (o = 1; o < n; o++) a = s === "up" ? o : n - o, t[o].findById("contentContainer").setSlideNumber(a)
  },
  onDestroy: function () {
    var e = this;
    e.model.un("change:ordering", e.onOrderingChange, e), e._super(arguments)
  }
}), app.views.quark.countdown.DesktopCountdown = Jux.extend(app.views.quark.countdown.Countdown, {
  createSlideshow: function () {
    return new app.components.slideshow.DesktopSlideshow({
      navigationControlVisible: !1
    })
  },
  onActiveSlideChange: function (e, t, n) {
    this.slideshow[n > 0 ? "showNavigationControl" : "hideNavigationControl"](), this._super(arguments)
  }
}), app.views.quark.countdown.GeneralSlideContentContainer = app.views.quark.SlideContentContainer.extend({
  createLayoutContainer: function () {
    return new app.views.quark.countdown.GeneralSlideLayoutContainer({
      model: this.model,
      slideNumber: this.slideNumber
    })
  },
  getPictureAttr: function () {
    return "picture"
  },
  setSlideNumber: function (e) {
    this.slideNumber = e, this.layoutContainer && this.layoutContainer.setSlideNumber(e)
  }
}), app.views.quark.countdown.GeneralSlideLayoutContainer = app.views.quark.SlideLayoutContainer.extend({
  initComponent: function () {
    var e = this,
      t = this.model;
    e._super(arguments), e.picture = e.findById("backgroundPicture"), e.contentWrap = e.findById("contentWrap"), e.textContentWrap = e.findById("textContentWrap"), e.slideNumberLabel = e.findById("slideNumber"), e.titleLabel = e.findById("title"), e.descriptionLabel = e.findById("description"), e.setSlideNumber(this.slideNumber), e.updateTitle(), e.updateDescription(), t.on({
      "change:title": e.updateTitle,
      "change:description": e.updateDescription,
      "change:picture.chosen_center": e.onChosenCenterChange,
      scope: e
    })
  },
  createConfig: function () {
    var e = app.views.quark.countdown.layouts;
    if (Jux.isHandheld) return e.handheld;
    var t = this.model,
      n = t.get("picture_size"),
      r = t.get("layout");
    return e[n][r]
  },
  getBackgroundPictureAttributeName: function () {
    return "picture"
  },
  setSlideNumber: function (e) {
    this.slideNumberLabel.setText(e)
  },
  updateTitle: function () {
    var e = this.model.get("title");
    this.titleLabel.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.updateTextContentWrapVisibility()
  },
  updateDescription: function () {
    var e = this.model.get("description");
    this.descriptionLabel.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.updateTextContentWrapVisibility()
  },
  updateTextContentWrapVisibility: function () {
    var e = this.model,
      t = e.get("title"),
      n = e.get("description");
    this.textContentWrap[t || n ? "show" : "hide"]()
  },
  onChosenCenterChange: function (e, t, n) {
    this.picture.setSrc(this.picture.getSrc(), {
      focusX: t ? t.x : 50,
      focusY: t ? t.y : 50
    })
  },
  onDestroy: function () {
    var e = this;
    e.model.un({
      "change:title": e.updateTitle,
      "change:description": e.updateDescription,
      "change:picture.chosen_center": e.onChosenCenterChange,
      scope: e
    }), e._super(arguments)
  }
}), app.views.quark.countdown.TitleSlideContentContainer = app.views.quark.SlideContentContainer.extend({
  initComponent: function () {
    if (!this.ownerGalleryUrl) throw new Error("'ownerGalleryUrl' config required");
    this._super(arguments)
  },
  onRender: function () {
    this._super(arguments)
  },
  createLayoutContainer: function () {
    return new app.views.quark.countdown.TitleSlideLayoutContainer({
      model: this.model,
      ownerGalleryUrl: this.ownerGalleryUrl
    })
  },
  getPictureAttr: function () {
    return "cover_picture"
  }
}), app.views.quark.countdown.TitleSlideLayoutContainer = app.views.quark.TitleSlideLayoutContainer.extend({
  initComponent: function () {
    this._super(arguments), this.model.get("slides").on({
      add: this.updateNumSlides,
      remove: this.updateNumSlides,
      scope: this
    })
  },
  createTemplateConfig: function () {
    var e = this._super(arguments);
    return e.numSlides = this.model.get("slides").getCount(), e
  },
  onContentWrapRender: function () {
    this._super(arguments), this.$numSlidesEl = this.$quarkTitleWrap.find('*[data-elem="numSlides"]')
  },
  updateNumSlides: function () {
    var e = this.model.get("slides").getCount();
    this.$numSlidesEl.html(e)
  },
  onDestroy: function () {
    this.model.get("slides").un({
      add: this.updateNumSlides,
      remove: this.updateNumSlides,
      scope: this
    }), this._super(arguments)
  }
}), app.views.quark.countdown.TouchCountdown = Jux.extend(app.views.quark.countdown.Countdown, {
  createSlideshow: function () {
    return new app.components.slideshow.TouchSlideshow
  }
}), app.views.quark.countdown.paletteManifest = {
  items: {
    layout: "Accordion",
    cls: "accordion-slideshow",
    height: 440,
    items: [{
      title: "Make Your List",
      items: [{
        type: "Section",
        cls: "dialog-section-slideshow",
        items: [{
          type: "carousel_countdown",
          id: "carousel"
        }, {
          cls: "itemEditor",
          id: "slideEditPanelContainer",
          layout: "cards",
          activeItem: 0,
          items: [{
            id: "titleSlideEditPanel",
            items: [{
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "PictureSelector",
                key: "cover_picture",
                picture: {
                  picture: {
                    id: "519cffa31a1102d449000008",
                    source: null,
                    url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/25/55/68/countdown_fill.jpg",
                    description: null,
                    hidden: !1,
                    license: "",
                    original_created_at: null,
                    service: null,
                    service_creator_displayname: null,
                    service_creator_id: null,
                    service_creator_username: null,
                    service_media_id: null,
                    service_media_url: null,
                    service_uploaded_at: null,
                    title: null,
                    facial_center: {
                      x: 90.61111111111111,
                      y: 63.40033500837521
                    },
                    height: 935,
                    width: 1410
                  }
                },
                height: 80,
                width: 80,
                cls: "itemPicture"
              }, {
                columnWidth: "70%",
                items: [{
                  type: "Text",
                  key: "title",
                  emptyText: "Most Glorious Things",
                  restoreEmptyText: !0
                }, {
                  type: "TextArea",
                  key: "subtitle",
                  label: "Say a word or two about your definitive list",
                  labelPosition: "infield",
                  height: 70,
                  autoGrow: !1,
                  restoreEmptyText: !1
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "Label",
                text: "Photo size",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: "70%",
                type: "ItemSelector",
                key: "picture_size",
                items: [{
                  cls: "pictureSize pictureSize-fill",
                  value: "fill"
                }, {
                  cls: "pictureSize pictureSize-fit",
                  value: "fit"
                }, {
                  cls: "pictureSize pictureSize-frame",
                  value: "frame"
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "48%",
                type: "Label",
                text: "Count up or down",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: "52%",
                type: "ButtonSet",
                key: "ordering",
                style: {
                  margin: "0 0 0 8px",
                  "padding-top": "2px"
                },
                options: [{
                  text: "Up",
                  value: "up"
                }, {
                  text: "Down",
                  value: "down"
                }]
              }]
            }]
          }, {
            id: "generalSlideEditPanel",
            items: [{
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "PictureSelector",
                id: "pictureSelector",
                picture: {
                  picture: {
                    id: "519cffa31a1102d449000008",
                    source: null,
                    url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/25/55/68/countdown_fill.jpg",
                    description: null,
                    hidden: !1,
                    license: "",
                    original_created_at: null,
                    service: null,
                    service_creator_displayname: null,
                    service_creator_id: null,
                    service_creator_username: null,
                    service_media_id: null,
                    service_media_url: null,
                    service_uploaded_at: null,
                    title: null,
                    facial_center: {
                      x: 90.61111111111111,
                      y: 63.40033500837521
                    },
                    height: 935,
                    width: 1410
                  }
                },
                height: 80,
                width: 80,
                cls: "itemPicture"
              }, {
                columnWidth: "70%",
                items: [{
                  type: "Text",
                  id: "slideTitleField",
                  label: "Name this thing",
                  labelPosition: "infield"
                }, {
                  type: "TextArea",
                  id: "slideDescriptionField",
                  label: "And tell everyone why it's special",
                  labelPosition: "infield",
                  height: 70,
                  autoGrow: !1,
                  restoreEmptyText: !1
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "Label",
                text: "Photo size",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: "70%",
                type: "ItemSelector",
                id: "pictureSizeSelector",
                items: [{
                  cls: "pictureSize pictureSize-fill",
                  value: "fill"
                }, {
                  cls: "pictureSize pictureSize-fit",
                  value: "fit"
                }, {
                  cls: "pictureSize pictureSize-frame",
                  value: "frame"
                }]
              }]
            }, {
              type: "Section",
              layout: "Columns",
              items: [{
                columnWidth: "28%",
                type: "Label",
                text: "Text position"
              }, {
                columnWidth: "72%",
                type: "ItemSelector",
                id: "layoutSelector",
                items: [{
                  cls: "textPosition textPosition-left",
                  value: "left"
                }, {
                  cls: "textPosition textPosition-center",
                  value: "center"
                }, {
                  cls: "textPosition textPosition-right",
                  value: "right"
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "48%",
                type: "Label",
                text: "Count up or down",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: "52%",
                type: "ButtonSet",
                key: "ordering",
                style: {
                  margin: "0 0 0 8px",
                  "padding-top": "2px"
                },
                options: [{
                  text: "Up",
                  value: "up"
                }, {
                  text: "Down",
                  value: "down"
                }]
              }]
            }]
          }]
        }]
      }]
    }, {
      title: "Stylize",
      items: [{
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "CountDown title (and number background)",
            key: "title_font",
            minSize: 2,
            maxSize: 7,
            step: .1
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "CountDown subtitle",
            key: "subtitle_font",
            minSize: 1,
            maxSize: 4,
            step: .1,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Item name",
            key: "item_title_font",
            minSize: 1,
            maxSize: 7,
            step: .1
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Item descriptions",
            key: "body_text_font",
            minSize: 1,
            maxSize: 3,
            step: .1,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "45%",
          type: "Label",
          text: "Background color"
        }, {
          columnWidth: "55%",
          type: "ColorSetCustomizer",
          key: "color_scheme",
          colors: [{
            name: "background_color"
          }]
        }]
      }]
    }, {
      title: "Set Options",
      items: [{
          type: "Section",
          id: "galleryDropdownSection",
          items: [{
            type: "dropdown",
            id: "galleryDropdown",
            label: "In Jux",
            labelPosition: "top",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: []
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "DateTime",
            key: "sort_time",
            label: "Schedule post or date in the past",
            labelPosition: "top"
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_posted_time",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "21px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        },
        app.views.quark.PaletteShared.customizeBylineSection, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Proudly display the Jux badge",
            style: {
              "padding-top": "2px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "badge",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: "hype"
            }, {
              text: "Hide",
              value: ""
            }]
          }]
        }
      ]
    }]
  }
},
function () {
  app.views.quark.countdown.layouts.fill = {
    left: {
      layout: "legacyhbox",
      cls: "textPosition-left",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        creditsIcon: !1,
        flex: 1
      }, {
        layout: {
          type: "legacyabsolute",
          bottom: 56,
          left: 60
        },
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          "max-width": "50em",
          "white-space": "normal"
        },
        items: [{
          type: "label",
          id: "slideNumber",
          cls: "slideNumber slideNumber-background",
          style: {
            display: "inline",
            "float": "left"
          }
        }, {
          id: "textContentWrap",
          cls: "slideText background",
          style: {
            display: "inline-block",
            "float": "left",
            clear: "both"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    },
    center: {
      layout: "legacyhbox",
      cls: "textPosition-center",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        creditsIcon: !1,
        flex: 1
      }, {
        layout: {
          type: "legacyabsolute",
          bottom: 56,
          left: 0,
          right: 0
        },
        style: {
          "text-align": "center"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          style: {
            display: "inline-block",
            "max-width": "65em",
            "white-space": "normal",
            "text-align": "left"
          },
          items: [{
            type: "container",
            cls: "slideNumber-background",
            items: [{
              type: "label",
              id: "slideNumber",
              cls: "slideNumber",
              style: {
                display: "inline-block",
                "vertical-align": "top"
              }
            }, {
              id: "textContentWrap",
              cls: "slideText background",
              style: {
                display: "inline-block",
                "max-width": "50em",
                "min-height": "3.8em"
              },
              items: [{
                type: "label",
                id: "title",
                cls: "slideTitle"
              }, {
                type: "label",
                id: "description",
                cls: "slideDescription"
              }]
            }]
          }]
        }]
      }]
    },
    right: {
      layout: "legacyhbox",
      cls: "textPosition-right",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        creditsIcon: !1,
        flex: 1
      }, {
        layout: {
          type: "legacyabsolute",
          bottom: 56,
          right: 60
        },
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          "max-width": "50em",
          "text-align": "right",
          "white-space": "normal"
        },
        items: [{
          type: "label",
          id: "slideNumber",
          cls: "slideNumber slideNumber-background",
          style: {
            display: "inline",
            "float": "right"
          }
        }, {
          id: "textContentWrap",
          cls: "slideText background",
          style: {
            display: "inline-block",
            "float": "right",
            clear: "both"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    }
  }
}(), app.views.quark.countdown.layouts.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left background",
    items: [{
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 56,
          right: 0
        },
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          "max-width": "80%",
          "text-align": "right"
        },
        items: [{
          type: "label",
          id: "slideNumber",
          cls: "slideNumber slideNumber-background",
          style: {
            display: "inline",
            "float": "right"
          }
        }, {
          id: "textContentWrap",
          cls: "slideText",
          style: {
            display: "inline-block",
            "float": "right",
            clear: "both"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }]
  },
  center: {
    layout: "legacyvbox",
    cls: "textPosition-center background",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1,
      style: {
        "z-index": 1
      }
    }, {
      height: 200,
      width: "100%",
      id: "contentWrap",
      cls: "content-wrap",
      style: {
        position: "relative"
      },
      items: [{
        type: "container",
        cls: "",
        style: {
          "text-align": "left"
        },
        items: [{
          type: "label",
          id: "slideNumber",
          cls: "slideNumber slideNumber-background",
          style: {
            display: "inline-block"
          }
        }, {
          id: "textContentWrap",
          cls: "slideText",
          style: {
            display: "inline-block",
            "max-width": "70%"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    cls: "textPosition-right background",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          left: 0
        },
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          "max-width": "80%"
        },
        items: [{
          type: "label",
          id: "slideNumber",
          cls: "slideNumber slideNumber-background",
          style: {
            display: "inline",
            "float": "left"
          }
        }, {
          id: "textContentWrap",
          cls: "slideText",
          style: {
            display: "inline-block",
            "float": "left",
            clear: "both"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    }]
  }
}, app.views.quark.countdown.layouts.frame = {
  left: {
    layout: "center",
    cls: "background textPosition-left",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch"
      },
      id: "frameBox",
      width: "100%",
      cls: "background-overlay",
      items: [{
        flex: 1,
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          style: {
            "max-width": "600em",
            "padding-left": "60px",
            position: "relative",
            "text-align": "right",
            "float": "right",
            "margin-bottom": "56px"
          },
          items: [{
            type: "label",
            id: "slideNumber",
            cls: "slideNumber slideNumber-background",
            style: {
              display: "inline",
              "float": "right"
            }
          }, {
            id: "textContentWrap",
            cls: "slideText",
            style: {
              display: "inline-block",
              "float": "right",
              clear: "both"
            },
            items: [{
              type: "label",
              id: "title",
              cls: "slideTitle",
              text: "",
              style: {
                "word-wrap": "pre"
              }
            }, {
              type: "label",
              id: "description",
              cls: "slideDescription"
            }]
          }]
        }]
      }, {
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          margins: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 350
          }
        }]
      }]
    }]
  },
  center: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "background textPosition-center",
    items: [{
      layout: {
        type: "center",
        align: "stretch"
      },
      id: "frameBox",
      height: "100%",
      cls: "background-overlay",
      style: {
        margin: "0 auto"
      },
      items: [{
        type: "container",
        layout: "frame",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          style: {
            margin: "0 auto"
          },
          margins: {
            top: 0,
            right: 0,
            bottom: 150,
            left: 0
          }
        }, {
          style: {
            "min-height": "150px",
            width: "100%"
          },
          items: [{
            id: "contentWrap",
            cls: "content-wrap",
            width: "100%",
            style: {
              position: "relative",
              "text-align": "left"
            },
            items: [{
              type: "container",
              style: {
                "text-align": "left"
              },
              items: [{
                type: "label",
                id: "slideNumber",
                cls: "slideNumber slideNumber-background"
              }, {
                id: "textContentWrap",
                cls: "slideText",
                style: {
                  position: "absolute",
                  left: "9em",
                  top: "0",
                  "max-width": "60em"
                },
                items: [{
                  type: "label",
                  id: "title",
                  cls: "slideTitle"
                }, {
                  type: "label",
                  id: "description",
                  cls: "slideDescription"
                }]
              }]
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "background textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch"
      },
      id: "frameBox",
      width: "100%",
      cls: "background-overlay",
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          margins: {
            top: 0,
            right: 350,
            bottom: 0,
            left: 0
          }
        }]
      }, {
        flex: 1,
        items: [{
          layout: {
            type: "legacyabsolute",
            left: 0,
            bottom: 56
          },
          id: "contentWrap",
          cls: "content-wrap showCaption",
          style: {
            "max-width": "600em",
            "padding-right": "60px",
            "text-align": "left"
          },
          items: [{
            type: "label",
            id: "slideNumber",
            cls: "slideNumber  slideNumber-background",
            style: {
              display: "inline",
              "float": "left"
            }
          }, {
            id: "textContentWrap",
            cls: "slideText",
            style: {
              display: "inline-block",
              "float": "left",
              clear: "both",
              "padding-left": "1.5em"
            },
            items: [{
              type: "label",
              id: "title",
              cls: "slideTitle",
              text: ""
            }, {
              type: "label",
              id: "description",
              cls: "slideDescription"
            }]
          }]
        }]
      }]
    }]
  }
}, app.views.quark.countdown.layouts.handheld = {
  layout: {
    type: "legacyhbox",
    align: "start"
  },
  width: "100%",
  height: "100%",
  items: [{
    type: "FillmorableImage",
    cls: "picture-container",
    id: "backgroundPicture",
    creditsIcon: !1,
    flex: 1
  }, {
    type: "label",
    id: "slideNumber",
    cls: "slideNumber slideNumber-background"
  }, {
    layout: {
      type: "legacyabsolute",
      bottom: 20,
      left: 0
    },
    id: "contentWrap",
    cls: "content-wrap contain-content background-semitransparent",
    style: {
      "max-width": "100%",
      "white-space": "normal",
      "z-index": 9e3
    },
    items: [{
      id: "textContentWrap",
      type: "ExpandableContainer",
      cls: "contentInner",
      items: [{
        type: "label",
        id: "title",
        cls: "slideTitle"
      }, {
        type: "label",
        id: "description",
        cls: "slideDescription"
      }]
    }]
  }]
}, app.views.quark.countdown.layouts.titleSlide = {
  fill: {
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      style: {
        "text-align": "left",
        "z-index": 1
      },
      items: [{
        layout: {
          type: "center",
          centerX: !1,
          useTable: !1
        },
        id: "scrollWrapper",
        height: "100%",
        style: {
          "overflow-y": "auto",
          "overflow-x": "hidden",
          "float": "right"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap background",
          style: {
            display: "inline-block",
            "max-width": "70em",
            "min-width": "30em",
            "white-space": "normal",
            padding: "4em 10em 6em 2em",
            position: "relative",
            "margin-left": "13em"
          }
        }]
      }]
    }]
  },
  fit: {
    layout: "legacyhbox",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      flex: 1,
      cls: "background"
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      items: [{
        layout: {
          type: "center",
          useTable: Jux.isTouch ? !1 : !0
        },
        id: "scrollWrapper",
        height: "100%",
        width: "50.02%",
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap background-overlay",
          style: {
            "text-align": "left",
            padding: "4em 10em 6em 3em",
            "white-space": "normal"
          }
        }]
      }]
    }]
  },
  frame: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "background textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      cls: "background-overlay",
      style: {
        margin: "0 auto",
        position: "relative"
      },
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          margins: {
            top: 150,
            right: 500,
            bottom: 150,
            left: 0
          }
        }]
      }, {
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          padding: "6em 10em 6em 3em",
          "box-sizing": "border-box",
          "-moz-box-sizing": "border-box",
          "text-align": "left",
          "word-break": "break-word"
        }
      }]
    }]
  },
  handheld: {
    layout: {
      type: "legacyhbox",
      align: "start"
    },
    width: "100%",
    height: "100%",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      id: "contentWrap",
      cls: "content-wrap",
      layout: {
        type: "legacyabsolute",
        bottom: 20,
        left: 0
      },
      style: {
        background: "rgba(0,0,0,0.6)",
        "max-width": "100%",
        "white-space": "normal"
      }
    }]
  }
}, app.views.quark.multiquark.Multiquark = Jux.extend(app.views.quark.Quark, {
  abstractClass: !0,
  acceptType: app.views.quark.Quark,
  spinnerEnabled: !1,
  initComponent: function () {
    this._super(arguments), this.setupChildClasses();
    var e = this.model.get("quarks");
    e.on({
      add: this.onQuarkAdd,
      remove: this.onQuarkRemove,
      reorder: this.onQuarkReorder,
      scope: this
    }), this.insertAllChildQuarks();
    var t = this.getItemAt(0);
    t && (t.isLoaded() ? this.onLoad() : t.on("load", this.onLoad, this)), this.disableBylineOnFollowingQuarks()
  },
  setupChildClasses: function () {
    var e = this.model.get("type");
    this.firstChildClass = e + "-first", this.interiorChildClass = e + "-interior"
  },
  insertAllChildQuarks: function () {
    var e = [],
      t = this.model,
      n = t.get("quarks"),
      r = n.getModels(),
      i = app.views.quark.Quark,
      s;
    for (var o = 0, u = r.length; o < u; o++) s = i.fromModel(r[o], this.currentUser, t), e.push(s);
    this.add(e)
  },
  disableBylineOnFollowingQuarks: function () {
    var e = this.getItems();
    for (var t = 1; t < e.length; t++) e[t].setAllowBylineToBeVisible && e[t].setAllowBylineToBeVisible(!1)
  },
  onLayout: function () {
    this._super(arguments);
    var e = this.getItems(),
      t = e.length;
    if (t > 0) {
      e[0].addCls(this.firstChildClass), e[0].removeCls(this.interiorChildClass);
      for (var n = 1; n < t; n++) e[n].removeCls(this.firstChildClass), e[n].addCls(this.interiorChildClass)
    }
  },
  onActivate: function () {
    this._super(arguments);
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++) e[t].activate();
    this.doLayout()
  },
  onDeactivate: function () {
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++) e[t].deactivate();
    this._super(arguments)
  },
  onQuarkAdd: function (e, t) {
    this.add(app.views.quark.Quark.fromModel(t, this.currentUser))
  },
  onQuarkRemove: function (e, t, n) {
    var r = this.getItemAt(n);
    this.remove(r)
  },
  onQuarkReorder: function (e, t, n, r) {
    var i = this.getItemAt(r);
    this.insert(i, n)
  },
  onDestroy: function () {
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++) e[t].removeCls(this.firstChildClass);
    this.model.get("quarks").un({
      add: this.onQuarkAdd,
      remove: this.onQuarkRemove,
      reorder: this.onQuarkReorder,
      scope: this
    }), this._super(arguments)
  }
}), app.views.quark.multiquark.ParallaxScrollMultiquark = Class.extend(app.views.quark.multiquark.Multiquark, {
  abstractClass: !0,
  selectingQuarkFromLayoutScroll: !1,
  initComponent: function () {
    this._super(arguments);
    var e = this.getLayout(),
      t = this.model;
    if (!(e instanceof app.views.quark.multiquark.ParallaxScrollLayout)) throw new Error("'layout' in the ParallaxScrollMultiquark must be a ParallaxScrollLayout");
    e.on("scrolltoquark", this.onLayoutScrollToQuark, this), this.adjustLayoutScrollerHeightTask = new Jux.util.DelayedTask, t.on("change:selectedQuark", this.onQuarkSelect, this), t.get("quarks").on("change", this.onChildQuarkDataChange, this)
  },
  onAdd: function (e) {
    this._super(arguments), e.on("load", this.adjustLayoutScrollerHeight, this)
  },
  onRemove: function (e) {
    e.un("load", this.adjustLayoutScrollerHeight, this), this._super(arguments)
  },
  onQuarkReorder: function (e, t, n, r) {
    this._super(arguments), this.scrollToQuark(this.model.get("selectedQuark"))
  },
  onQuarkSelect: function (e, t) {
    this.selectingQuarkFromLayoutScroll || this.scrollToQuark(t), this.selectingQuarkFromLayoutScroll = !1
  },
  onLayoutScrollToQuark: function (e, t) {
    var n = t.getModel();
    n !== this.model.get("selectedQuark") && (this.selectingQuarkFromLayoutScroll = !0, this.model.set("selectedQuark", n))
  },
  scrollToQuark: function (e) {
    if (e instanceof app.models.Quark) {
      var t = this.model.get("quarks").indexOf(e);
      e = this.getItemAt(t)
    }
    this.layout.scrollToQuark(e, {
      duration: 1e3,
      easing: "easeInOutCubic"
    })
  },
  onChildQuarkDataChange: function () {
    this.adjustLayoutScrollerHeightTask.delay(250, this.adjustLayoutScrollerHeight, this)
  },
  adjustLayoutScrollerHeight: function () {
    this.rendered && this.layout.adjustScrollerHeight()
  },
  onDestroy: function () {
    this.adjustLayoutScrollerHeightTask.cancel(), this.getLayout().un("scrolltoquark", this.onLayoutScrollToQuark, this);
    var e = this.model;
    e.un("change:selectedQuark", this.onQuarkSelect, this), e.get("quarks").un("change", this.onChildQuarkDataChange, this), this._super(arguments)
  }
}), app.views.quark.multiquark.ParallaxScrollLayout = Jux.extend(app.components.ui.layout.ScrollingFitLayout, {
  abstractClass: !0,
  enableScrollDownBar: !0,
  percentVisibleForQuarkActivate: 55,
  lazyViewEnabled: !Jux.isTouch,
  parallaxScrollLayoutInitialized: !1,
  lastQuarkScrolledTo: null,
  scrollerTpl: ['<div data-elem="ParallaxScrollLayout-scrollerEl" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;z-index:990;">', '<div data-elem="scrollerHeightEl" style="position:absolute;top:0;left:0;width:100%;" />', "</div>"].join(""),
  initLayout: function () {
    this._super(arguments), this.addEvents("scrolltoquark"), this.currentScrollTop = 0
  },
  onLayout: function (e, t) {
    this._super(arguments);
    if (e.length === 0) return;
    this.parallaxScrollLayoutInitialized || (this.initParallaxScrollLayout(t), this.parallaxScrollLayoutInitialized = !0), this.injectScrollDownBar(e);
    for (var n = 0, r = e.length; n < r; n++) e[n].doLayout();
    this.adjustScrollerHeight(), this.initialQuarkToScrollTo ? (this.scrollToQuark(this.initialQuarkToScrollTo), delete this.initialQuarkToScrollTo) : this.setScrollTop(this.currentScrollTop)
  },
  createContainerEl: function (e) {
    Jux.apply(e, {
      position: "absolute",
      top: 0,
      left: 0,
      "z-index": 0,
      overflow: "hidden",
      transform: "translate3d(0,0,0)",
      "-moz-transform": "translate3d(0,0,0)",
      "-webkit-transform": "translate3d(0,0,0)"
    });
    var t = this._super([e]);
    return t.attr("data-layoutelem", "ParallaxScrollLayoutContainerEl"), t.addClass("parallaxScrollLayout-container"), this.lazyViewEnabled && t.addClass("lazyView slow"), t
  },
  initParallaxScrollLayout: function (e) {
    e.css("position") === "static" && e.css("position", "relative"), e.css({
      "overflow-x": "hidden",
      "overflow-y": "hidden"
    }), this.$scrollDownBar = jQuery('<div class="multiquark-scrollDownBar" style="position: absolute; height: 31px; width: 100%; text-align: center;"></div>').appendTo(e), this.scrollDownBarHeight = this.$scrollDownBar.outerHeight(!0), this.$scrollDownBar.detach();
    var t = this.$scrollerEl = jQuery(this.scrollerTpl),
      n = this.$scrollerHeightEl = t.find('*[data-elem="scrollerHeightEl"]');
    t.appendTo(e)
  },
  injectScrollDownBar: function (e) {
    var t = e[0].getModel().getClientId();
    this.lastSetQuarkClientId !== t && (this.$scrollDownBar.removeClass("quark_" + this.lastSetQuarkClientId), this.$scrollDownBar.addClass("quark_" + t), this.lastSetQuarkClientId = t), this.enableScrollDownBar && e.length > 1 ? (this.containerEls[0].css("height", "-=" + this.scrollDownBarHeight), this.$scrollDownBar.insertBefore(this.containerEls[1])) : this.$scrollDownBar.detach()
  },
  adjustScrollerHeight: function () {
    if (this.parallaxScrollLayoutInitialized && !this.destroyed) {
      var e = this.containerEls,
        t = this.container.getItems(),
        n = 0,
        r, i;
      for (r = 0, i = e.length; r < i; r++) n += e[r].height() + t[r].getContentScrollableHeight();
      this.enableScrollDownBar && e.length > 1 && (n += this.scrollDownBarHeight), n !== this.lastScrollerHeight && (this.lastScrollerHeight = n, this.$scrollerHeightEl.css("height", n + "px"))
    }
  },
  scrollToQuark: function (e, t) {
    if (!this.parallaxScrollLayoutInitialized) this.initialQuarkToScrollTo = e;
    else {
      if (!this.container.has(e)) return;
      var n = this.containerEls,
        r = this.container.getItems(),
        i = this.container.getItemIndex(e),
        s = 0;
      for (var o = 0; o < i; o++) s += n[o].height() + r[o].getContentScrollableHeight();
      this.enableScrollDownBar && i > 0 && (s += this.scrollDownBarHeight), this.setScrollTop(s, t)
    }
  },
  setScrollTop: function (e, t) {
    if (!this.parallaxScrollLayoutInitialized || this.destroyed) return;
    t = t || {};
    if (t.duration) {
      this.scrollAnimation && this.scrollAnimation.cancel(), this.scrollAnimation = new app.views.quark.multiquark.ParallaxScrollLayout.ScrollAnimation({
        layout: this,
        scrollTopStart: this.currentScrollTop,
        scrollTopEnd: e,
        duration: t.duration,
        easing: t.easing || "swing"
      }), this.scrollAnimation.start();
      return
    }
    t.fromAnim || this.scrollAnimation && this.scrollAnimation.cancel(), this.doScrollTopMove(e, t)
  },
  doScrollTopMove: function (e, t) {
    e = Math.max(e, 0), this.currentScrollTop = e;
    var n = this.containerEls,
      r = this.container.getContentTarget().height(),
      i = this.container.getItems(),
      s = 0,
      o = 0,
      u = 0,
      a = Math.max,
      f = Math.min,
      l = null;
    for (var c = 0, h = i.length; c < h; c++) {
      var p = n[c],
        d = i[c],
        v = n[c].height(),
        m = d.getContentScrollableHeight(),
        g = a(f(e - s - o, m), 0),
        y = a(-e + u + o + g, -v);
      d.setContentScrollTop(g), Jux.isTouch ? p.css({
        transform: "translate3d(0," + y + "px,0)",
        "-webkit-transform": "translate3d(0," + y + "px,0)"
      }) : p.css("top", y + "px"), this.lazyViewEnabled && y < r - 20 && p.addClass("enteredViewport"), s += Math.abs(y), o += g, u += v;
      if (this.enableScrollDownBar && c === 0 && h > 1) {
        var b = a(-e + u + o, -this.scrollDownBarHeight);
        Jux.isTouch ? this.$scrollDownBar.css({
          transform: "translate3d(0," + b + "px,0)",
          "-webkit-transform": "translate3d(0," + b + "px,0)"
        }) : this.$scrollDownBar.css("top", b + "px"), s += Math.abs(b), u += this.scrollDownBarHeight
      }
      if (!l) {
        var w = y + v,
          E = w / v * 100;
        E > 100 - this.percentVisibleForQuarkActivate && (l = d)
      }
    }
    this.onScrollTopChange(e), l && l !== this.lastQuarkScrolledTo && (this.lastQuarkScrolledTo = l, t.fromAnim || this.fireEvent("scrolltoquark", this, l))
  },
  onScrollTopChange: Jux.emptyFn,
  onDestroy: function () {
    this.parallaxScrollLayoutInitialized && (this.scrollAnimation && this.scrollAnimation.cancel(), this.$scrollerHeightEl.remove(), this.$scrollerEl.remove(), this.$scrollDownBar.remove()), this._super(arguments)
  }
}), app.views.quark.multiquark.DesktopMultiquark = Jux.extend(app.views.quark.multiquark.ParallaxScrollMultiquark, {
  layout: "desktopparallaxscroll"
}), app.views.quark.multiquark.DesktopParallaxScrollLayout = Jux.extend(app.views.quark.multiquark.ParallaxScrollLayout, {
  isMouseWheeling: !1,
  scrolledProgrammatically: !1,
  initParallaxScrollLayout: function (e) {
    this._super(arguments), this.$scrollerEl.css("pointer-events", "none"), this.$scrollerEl.on("scroll", jQuery.proxy(this.onScroll, this)), this.onMouseWheelDelegate = jQuery.proxy(this.onMouseWheel, this), e.on("mousewheel", this.onMouseWheelDelegate), this.onMouseMoveDelegate = jQuery.proxy(this.onMouseMove, this), e.on("mousemove", this.onMouseMoveDelegate)
  },
  onMouseWheel: function (e) {
    this.pointerEventsResetTimer && clearTimeout(this.pointerEventsResetTimer), this.enableScrollerPointerEvents(), this.isMouseWheeling = !0, this.pointerEventsResetTimer = setTimeout(jQuery.proxy(function () {
      this.disableScrollerPointerEvents(), this.isMouseWheeling = !1
    }, this), 150)
  },
  onMouseMove: function (e) {
    if (!this.isMouseWheeling) {
      var t = this.container.getContentTarget(),
        n = Jux.getScrollbarWidth(),
        r = t.offset(),
        i = t.width(),
        s = e.pageX > r.left + i - n;
      s ? this.enableScrollerPointerEvents() : this.disableScrollerPointerEvents()
    }
  },
  enableScrollerPointerEvents: function () {
    var e = this.$scrollerEl;
    e.css("pointer-events", "auto"), Jux.isIE && e.css("background-image", "url(" + Jux.getBlankImgUrl() + ")")
  },
  disableScrollerPointerEvents: function () {
    var e = this.$scrollerEl;
    e.css("pointer-events", "none"), Jux.isIE && e.css("background-image", "none")
  },
  onScroll: function (e) {
    this.scrolledProgrammatically || this.setScrollTop(this.$scrollerEl.scrollTop()), this.scrolledProgrammatically = !1
  },
  onScrollTopChange: function (e) {
    this._super(arguments), e !== this.$scrollerEl.scrollTop() && (this.scrolledProgrammatically = !0, this.$scrollerEl.scrollTop(e))
  },
  onDestroy: function () {
    if (this.parallaxScrollLayoutInitialized) {
      var e = this.container.getContentTarget();
      e.off("mousewheel", this.onMouseWheelDelegate), e.off("mousemove", this.onMouseMoveDelegate)
    }
    this._super(arguments)
  }
}), ui.Container.registerLayout("desktopparallaxscroll", app.views.quark.multiquark.DesktopParallaxScrollLayout), app.views.quark.multiquark.IPadMultiquark = Jux.extend(app.views.quark.multiquark.ParallaxScrollMultiquark, {
  layout: "ipadparallaxscroll"
}), app.views.quark.multiquark.IPadParallaxScrollLayout = Jux.extend(app.views.quark.multiquark.ParallaxScrollLayout, {
  scrolledProgrammatically: !1,
  initParallaxScrollLayout: function (e) {
    this._super(arguments), this.scroller = new app.components.IScroll({
      el: this.$scrollerEl,
      listeners: {
        scrollmove: this.onScroll,
        scope: this
      }
    })
  },
  onScroll: function (e) {
    this.scrolledProgrammatically || this.setScrollTop(this.scroller.getScrollTop()), this.scrolledProgrammatically = !1
  },
  onScrollTopChange: function (e) {
    this._super(arguments), e !== this.scroller.getScrollTop() && (this.scrolledProgrammatically = !0, this.scroller.scrollTo(0, e))
  },
  onDestroy: function () {
    this.parallaxScrollLayoutInitialized && this.scroller.destroy(), this._super(arguments)
  }
}), ui.Container.registerLayout("ipadparallaxscroll", app.views.quark.multiquark.IPadParallaxScrollLayout), app.views.quark.multiquark.IPhoneMultiquark = Jux.extend(app.views.quark.multiquark.Multiquark, {
  initComponent: function () {
    this.layout = new app.views.quark.multiquark.IPhoneMultiquarkLayout, this._super(arguments)
  }
}), app.views.quark.multiquark.IPhoneMultiquarkLayout = Class.extend(ui.layout.Layout, {
  onLayout: function (e, t) {
    this.iScroll && this.iScroll.destroy(), this._super(arguments), this.$innerScrollerEl || (this.$innerScrollerEl = jQuery('<div data-elem="MultiquarkTouchLayout-scrollerEl" />').appendTo(t));
    var n = this.$innerScrollerEl;
    for (var r = 0, i = e.length; r < i; r++) this.renderComponent(e[r], n, {
      position: r
    });
    this.iScroll = new app.components.IScroll({
      el: t
    })
  },
  onDestroy: function () {
    this.iScroll && (this.iScroll.destroy(), delete this.iScroll), this.$innerScrollerEl && (this.$innerScrollerEl.remove(), delete this.$innerScrollerEl), this._super(arguments)
  }
}), ui.Container.registerLayout("iphonemultiquarklayout", app.views.quark.multiquark.IPhoneMultiquarkLayout), app.views.quark.multiquark.ParallaxScrollLayout.ScrollAnimation = Class.extend(Object, {
  easing: "swing",
  constructor: function (e) {
    Jux.apply(this, e), this.scrollTopChange = this.scrollTopEnd - this.scrollTopStart
  },
  start: function () {
    this.startTime = new Date, this.endTime = new Date(this.startTime.getTime() + this.duration), this.intervalId = setInterval(this.doAnim.createDelegate(this), 15)
  },
  doAnim: function () {
    var e = Math.min((new Date).getTime() - this.startTime.getTime(), this.duration);
    if (e === this.duration) this.finish();
    else {
      var t = jQuery.easing[this.easing](null, e, this.scrollTopStart, this.scrollTopChange, this.duration);
      this.layout.setScrollTop(t, {
        fromAnim: !0
      })
    }
  },
  finish: function () {
    this.layout.setScrollTop(this.scrollTopEnd), clearTimeout(this.intervalId)
  },
  cancel: function (e) {
    e ? this.finish() : clearTimeout(this.intervalId)
  }
}), app.views.quark.multiquark.paletteManifest = {
  id: "mainAccordion",
  layout: "Accordion",
  height: 430,
  items: [{
    title: "Express Yourself",
    layout: "vbox",
    items: [{
      type: "carousel_article",
      id: "carousel"
    }, {
      flex: 1,
      id: "quarkEditContainer",
      cls: "itemEditor",
      layout: "cards",
      items: []
    }]
  }, {
    title: "Set Options",
    items: [{
        type: "Section",
        id: "galleryDropdownSection",
        items: [{
          type: "dropdown",
          id: "galleryDropdown",
          label: "In Jux",
          labelPosition: "top",
          style: {
            margin: "0 8px 0 0",
            "padding-top": "2px"
          },
          options: []
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "66%",
          type: "DateTime",
          key: "sort_time",
          label: "Schedule post or date in the past",
          labelPosition: "top"
        }, {
          columnWidth: "34%",
          type: "ButtonSet",
          key: "show_posted_time",
          style: {
            margin: "0 0 0 8px",
            "padding-top": "21px"
          },
          options: [{
            text: "Show",
            value: !0
          }, {
            text: "Hide",
            value: !1
          }]
        }]
      },
      app.views.quark.PaletteShared.customizeBylineSection, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "66%",
          type: "Label",
          text: "Proudly display the Jux badge",
          style: {
            "padding-top": "7px"
          }
        }, {
          columnWidth: "34%",
          type: "ButtonSet",
          key: "badge",
          style: {
            margin: "0 0 0 8px",
            "padding-top": "2px"
          },
          options: [{
            text: "Show",
            value: "hype"
          }, {
            text: "Hide",
            value: ""
          }]
        }]
      }
    ]
  }]
}, app.views.quark.photo.Photo = Jux.extend(app.views.quark.AbstractMonoQuark, {
  spinnerEnabled: !0,
  createLayoutContainer: function () {
    var e = app.views.quark.photo,
      t;
    return Jux.isIPhone ? t = e.IPhoneLayoutContainer : t = e.LayoutContainer, new t({
      currentUser: this.currentUser,
      model: this.model,
      quarkPackageName: this.quarkTypeName
    })
  }
}), app.views.quark.photo.LayoutContainer = app.views.quark.MonoQuarkLayoutContainer.extend({
  initComponent: function () {
    this._super(arguments), this.contentWrapContainer = this.findById("contentWrap"), this.captionLabel = this.findById("caption"), this.updateCaption(), this.model.on("change:caption", this.updateCaption, this), this.byline.on({
      show: this.onBylineVisibilityChanged,
      hide: this.onBylineVisibilityChanged,
      scope: this
    }), this.model.get("picture_size") === "frame" && this.on("afterLayout", this.updateContentWrapVisibility, this)
  },
  updateCaption: function () {
    var e = this.model.get("caption");
    this.captionLabel.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.updateContentWrapVisibility()
  },
  onBylineVisibilityChanged: function () {
    this.updateContentWrapVisibility(), this.doLayout()
  },
  updateContentWrapVisibility: function () {
    var e = !! _.trim(this.model.get("caption")),
      t = this.byline.shouldBeVisible(),
      n = e || t;
    this.model.get("picture_size") === "frame" ? this.updateContentVisibilityForFrame(n) : this.contentWrapContainer.setVisible(n)
  },
  updateContentVisibilityForFrame: function (e) {
    var t = this.contentWrapContainer.getEl(),
      n = this.model.get("layout"),
      r;
    if (!t) return;
    switch (n) {
    case "right":
    case "left":
      r = t.parent().parent();
      break;
    case "center":
      r = t.parent()
    }
    if (!r) return;
    e ? r.show() : r.hide()
  },
  onDestroy: function () {
    this.model.un("change:caption", this.updateCaption, this), this._super(arguments)
  }
}), app.views.quark.photo.IPhoneLayoutContainer = Jux.extend(app.views.quark.photo.LayoutContainer, {
  captionVisible: !0,
  initComponent: function () {
    this._super(arguments), this.contentWrapContainer.setStyle("-webkit-transition", "opacity 0.3s ease-in-out"), this.captionContainer = this.findById("captionContainer"), this.captionContainer.on({
      expand: this.cancelHideCaptionTimeout,
      collapse: this.hideCaptionAfterTimeout,
      scope: this
    })
  },
  onRender: function () {
    this._super(arguments);
    var e = {};
    this.$el.bind("touchstart", function (t) {
      var n = t.originalEvent.touches[0];
      e.x1 = e.x2 = n.clientX, e.y1 = e.y2 = n.clientY
    }.createDelegate(this)).bind("touchmove", function (t) {
      var n = t.originalEvent.touches[0];
      e.x2 = n.clientX, e.y2 = n.clientY, (!this.captionContainer.isExpanded() && Math.abs(e.x2 - e.x1) > 10 || Math.abs(e.y2 - e.y1) > 10) && this.toggleCaptionVisibility(!0)
    }.createDelegate(this)).bind("touchend", function (t) {
      Math.abs(e.x2 - e.x1) < 10 && Math.abs(e.y2 - e.y1) < 10 && this.toggleCaptionVisibility(), e = {}
    }.createDelegate(this))
  },
  onActivate: function () {
    this._super(arguments), this.hideCaptionAfterTimeout()
  },
  toggleCaptionVisibility: function (e) {
    this.cancelHideCaptionTimeout(), typeof e == "undefined" && (e = !this.captionVisible), e ? this.contentWrapContainer.setStyle({
      opacity: 1,
      "pointer-events": ""
    }) : this.contentWrapContainer.setStyle({
      opacity: 0,
      "pointer-events": "none"
    }), this.captionVisible = e
  },
  cancelHideCaptionTimeout: function () {
    clearTimeout(this.hideCaptionTimer)
  },
  hideCaptionAfterTimeout: function () {
    this.cancelHideCaptionTimeout(), this.hideCaptionTimer = setTimeout(function () {
      if (!this.captionVisible) return;
      this.toggleCaptionVisibility(!1)
    }.createDelegate(this), 3e3)
  }
}), app.views.quark.photo.layouts.fill = {
  left: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-left",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 50,
        left: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption backgroundColor",
      style: {
        background: "rgba(0,0,0,0.6)",
        "max-width": "400px",
        "white-space": "normal"
      },
      items: [{
        type: "label",
        id: "caption",
        cls: "photo-caption captionFont captionColor",
        text: ""
      }, {
        id: "bylineWrap",
        cls: "bylineWrap"
      }]
    }]
  },
  center: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 50,
        left: 0,
        right: 0
      },
      style: {
        "text-align": "center"
      },
      items: [{
        id: "contentWrap",
        cls: "content-wrap showCaption backgroundColor",
        style: {
          background: "rgba(0,0,0,0.6)",
          "max-width": "450px",
          "white-space": "normal"
        },
        items: [{
          type: "label",
          id: "caption",
          cls: "photo-caption captionFont captionColor",
          text: ""
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        bottom: 50,
        right: 0
      },
      id: "contentWrap",
      cls: "content-wrap showCaption backgroundColor",
      style: {
        background: "rgba(0,0,0,0.6)",
        "max-width": "400px",
        "white-space": "normal"
      },
      items: [{
        type: "label",
        id: "caption",
        cls: "photo-caption captionFont captionColor",
        text: ""
      }, {
        id: "bylineWrap",
        cls: "bylineWrap"
      }]
    }]
  }
}, app.views.quark.photo.layouts.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left backgroundColor",
    items: [{
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          right: 0
        },
        id: "contentWrap",
        cls: "content-wrap showCaption",
        style: {
          width: "50%",
          "text-align": "right"
        },
        items: [{
          type: "label",
          id: "caption",
          cls: "photo-caption captionFont captionColor",
          text: "Default text",
          style: {
            "line-height": "1.2em"
          }
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }]
  },
  center: {
    layout: "vbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center  backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      height: 180,
      width: "100%",
      id: "contentWrap",
      cls: "content-wrap showCaption",
      style: {
        "text-align": "center"
      },
      items: [{
        type: "label",
        id: "caption",
        cls: "photo-caption captionFont captionColor",
        text: "Default text",
        style: {
          "line-height": "1.2em",
          "max-width": "500px",
          margin: ".2em auto"
        }
      }, {
        id: "bylineWrap",
        cls: "bylineWrap"
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          left: 0
        },
        id: "contentWrap",
        cls: "content-wrap showCaption",
        style: {
          width: "50%"
        },
        items: [{
          type: "label",
          id: "caption",
          cls: "photo-caption captionFont captionColor",
          text: "Default text",
          style: {
            "line-height": "1.2em"
          }
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }]
  }
}, app.views.quark.photo.layouts.fitWide = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left backgroundColor",
    items: [{
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          right: 0
        },
        id: "contentWrap",
        cls: "content-wrap showCaption",
        style: {
          width: "80%",
          "text-align": "right"
        },
        items: [{
          type: "label",
          id: "caption",
          cls: "photo-caption captionFont captionColor",
          text: "Default text",
          style: {
            "line-height": "1.2em"
          }
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 2.33
    }]
  },
  center: {
    layout: "vbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 1
    }, {
      height: 85,
      width: "100%",
      id: "contentWrap",
      cls: "content-wrap showCaption",
      style: {
        "text-align": "center"
      },
      items: [{
        type: "label",
        id: "caption",
        cls: "photo-caption captionFont captionColor",
        text: "Default text",
        style: {
          "line-height": "1.2em",
          "max-width": "90em",
          margin: ".2em auto"
        }
      }, {
        id: "bylineWrap",
        cls: "bylineWrap"
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      flex: 2.33
    }, {
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          left: 0
        },
        id: "contentWrap",
        cls: "content-wrap showCaption",
        style: {
          width: "80%"
        },
        items: [{
          type: "label",
          id: "caption",
          cls: "photo-caption captionFont captionColor",
          text: "Default text",
          style: {
            "line-height": "1.2em"
          }
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }]
  }
}, app.views.quark.photo.layouts.frame = {
  left: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-left",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch"
      },
      id: "frameBox",
      cls: "frameBox",
      style: {
        margin: "0 auto"
      },
      items: [{
        width: 280,
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: 280,
          items: [{
            type: "label",
            id: "caption",
            cls: "photo-caption captionFont captionColor",
            text: "Default text",
            style: {
              "line-height": "1.25",
              "text-align": "right"
            }
          }, {
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              "text-align": "right"
            }
          }]
        }]
      }, {
        type: "container",
        layout: "frame",
        cls: "imageBg",
        vAlign: "middle",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 38,
            right: 20,
            bottom: 38,
            left: 280
          }
        }]
      }]
    }]
  },
  center: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-center",
    items: [{
      layout: {
        type: "legacyvbox",
        align: "stretch"
      },
      id: "frameBox",
      cls: "frameBox",
      style: {
        margin: "0 auto"
      },
      items: [{
        type: "container",
        layout: "frame",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          style: {
            margin: "0 auto"
          },
          margins: {
            top: 38,
            right: 40,
            bottom: 90,
            left: 20
          }
        }, {
          style: {
            "min-height": "50px"
          },
          items: [{
            id: "contentWrap",
            cls: "content-wrap showCaption",
            width: "100%",
            items: [{
              type: "label",
              id: "caption",
              cls: "photo-caption captionFont captionColor",
              text: "Default text",
              style: {
                "line-height": "1.2em"
              }
            }, {
              id: "bylineWrap",
              cls: "bylineWrap"
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch"
      },
      id: "frameBox",
      cls: "frameBox",
      style: {
        margin: "0 auto"
      },
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        vAlign: "middle",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          fillmore: !1,
          margins: {
            top: 38,
            right: 280,
            bottom: 38,
            left: 20
          }
        }]
      }, {
        width: 280,
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          width: 280,
          items: [{
            type: "label",
            id: "caption",
            cls: "photo-caption captionFont captionColor",
            text: "Default text",
            style: {
              "line-height": "1.2em",
              "text-align": "left"
            }
          }, {
            id: "bylineWrap",
            cls: "bylineWrap",
            style: {
              "text-align": "left"
            }
          }]
        }]
      }]
    }]
  }
}, app.views.quark.photo.layouts.handheld = {
  layout: {
    type: "legacyhbox",
    align: "start"
  },
  width: "100%",
  height: "100%",
  items: [{
    type: "FillmorableImage",
    cls: "picture-container",
    id: "backgroundPicture",
    flex: 1
  }, {
    id: "contentWrap",
    cls: "content-wrap showCaption backgroundColor",
    layout: {
      type: "legacyabsolute",
      bottom: 20,
      left: 0
    },
    style: {
      background: "rgba(0,0,0,0.6)",
      "max-width": "100%",
      "white-space": "normal"
    },
    items: [{
      id: "captionContainer",
      type: "ExpandableContainer",
      cls: "photo-captionContainer",
      items: {
        type: "label",
        id: "caption",
        cls: "photo-caption captionFont captionColor",
        text: ""
      }
    }, {
      id: "bylineWrap",
      cls: "bylineWrap"
    }]
  }]
}, app.views.quark.photo.paletteManifest = {
  items: {
    id: "mainAccordion",
    layout: "Accordion",
    height: 310,
    items: [{
      title: "Post Your Pic",
      items: [{
        type: "Section",
        layout: "Columns",
        items: [{
          columnWidth: "26%",
          type: "Label",
          text: "Change photo"
        }, {
          columnWidth: "72%",
          type: "ImageSelector",
          cls: "backgroundImage-pictureSelector",
          key: "background_picture",
          height: 75,
          width: 75
        }]
      }, {
        type: "Section",
        layout: "Columns",
        items: [{
          columnWidth: "26%",
          type: "Label",
          text: "Caption"
        }, {
          columnWidth: "72%",
          type: "TextArea",
          key: "caption",
          label: "Add a little caption",
          labelPosition: "infield",
          autoGrow: !0,
          restoreEmptyText: !1
        }]
      }]
    }, {
      title: "Stylize",
      id: "styleIt",
      items: [{
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "30%",
          type: "Label",
          text: "Photo size",
          style: {
            "padding-top": "2px"
          }
        }, {
          columnWidth: "70%",
          type: "ItemSelector",
          key: "picture_size",
          items: [{
            cls: "pictureSize pictureSize-fill",
            value: "fill"
          }, {
            cls: "pictureSize pictureSize-fitWide",
            value: "fitWide"
          }, {
            cls: "pictureSize pictureSize-fit",
            value: "fit"
          }, {
            cls: "pictureSize pictureSize-frame",
            value: "frame"
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "30%",
          type: "Label",
          text: "Text position"
        }, {
          columnWidth: "70%",
          type: "ItemSelector",
          key: "layout",
          items: [{
            cls: "textPosition textPosition-left",
            value: "left"
          }, {
            cls: "textPosition textPosition-center",
            value: "center"
          }, {
            cls: "textPosition textPosition-right",
            value: "right"
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "30%",
          type: "Label",
          text: "Background"
        }, {
          columnWidth: "70%",
          type: "ColorSetCustomizer",
          key: "color_scheme",
          colors: [{
            name: "background_color"
          }]
        }]
      }, {
        type: "Section",
        cls: "photo-effects",
        items: [{
          type: "Label",
          text: "Photo effect"
        }, {
          layout: "columns",
          items: [{
            columnWidth: "20%",
            type: "ToggleItem",
            key: "cross_process",
            label: "Drama",
            buttons: !1,
            onCls: "photoEffect effect-cross_process",
            offCls: "photoEffect effect-cross_process"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "lomo",
            label: "Lomo",
            buttons: !1,
            onCls: "photoEffect effect-lomo",
            offCls: "photoEffect effect-lomo"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "greyscale",
            label: "B&amp;W",
            buttons: !1,
            onCls: "photoEffect effect-bw",
            offCls: "photoEffect effect-bw"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "fade",
            label: "Fade",
            buttons: !1,
            onCls: "photoEffect effect-fade",
            offCls: "photoEffect effect-fade"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "blur",
            label: "Blur",
            buttons: !1,
            onCls: "photoEffect effect-blur",
            offCls: "photoEffect effect-blur"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "tilt_shift",
            label: "TiltShift",
            buttons: !1,
            onCls: "photoEffect effect-tilt_shift",
            offCls: "photoEffect effect-tilt_shift"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "flip",
            label: "Flip",
            buttons: !1,
            onCls: "photoEffect effect-flip",
            offCls: "photoEffect effect-flip"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "mirror_in",
            label: "Mirror in",
            buttons: !1,
            onCls: "photoEffect effect-mirrorIn",
            offCls: "photoEffect effect-mirrorIn"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "mirror_out",
            label: "Mirror out",
            buttons: !1,
            onCls: "photoEffect effect-mirrorOut",
            offCls: "photoEffect effect-mirrorOut"
          }, {
            columnWidth: "20%",
            type: "ToggleItem",
            key: "mustachify",
            label: "Mustachify",
            buttons: !1,
            onCls: "photoEffect effect-mustachify",
            offCls: "photoEffect effect-mustachify"
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Caption",
            key: "caption_font",
            minSize: 12,
            maxSize: 32,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Name",
            key: "name_font",
            minSize: 9,
            maxSize: 32,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }]
    }, {
      title: "Set Options",
      items: [{
          type: "Section",
          id: "galleryDropdownSection",
          items: [{
            type: "dropdown",
            id: "galleryDropdown",
            label: "In Jux",
            labelPosition: "top",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: []
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "DateTime",
            key: "sort_time",
            label: "Schedule post or date in the past",
            labelPosition: "top"
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_posted_time",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "21px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        },
        app.views.quark.PaletteShared.customizeBylineSection, {
          type: "Section",
          items: [{
            type: "dropdown",
            label: "Photo permissions",
            labelPosition: "top",
            menuCls: "photoPermissionsMenu",
            id: "photoPermissionDropdown",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: [{
              text: "Choose one (optional)",
              value: ""
            }, {
              text: "Share freely",
              value: "http://creativecommons.org/licenses/by/3.0"
            }, {
              text: "Allow non-commercial use",
              value: "http://creativecommons.org/licenses/by-nc/3.0"
            }, {
              text: "All rights reserved",
              value: "r"
            }]
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Proudly display the Jux badge",
            style: {
              "padding-top": "7px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "badge",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: "hype"
            }, {
              text: "Hide",
              value: ""
            }]
          }]
        }
      ]
    }]
  }
}, app.views.quark.slideshow.Slideshow = Jux.extend(app.views.quark.AbstractSlideshowWithTitleSlide, {
  abstractClass: !0,
  createTitleSlide: function () {
    var e = new app.views.quark.slideshow.TitleSlideContentContainer({
      model: this.model
    });
    return new app.components.slideshow.slide.Slide({
      cls: "titleSlide",
      items: [e]
    })
  },
  createGeneralSlide: function (e) {
    var t = new app.views.quark.slideshow.GeneralSlideContentContainer({
      model: e
    });
    return new app.components.slideshow.slide.Slide({
      cls: "generalSlide",
      items: [t]
    })
  }
}), app.views.quark.slideshow.DesktopSlideshow = Jux.extend(app.views.quark.slideshow.Slideshow, {
  createSlideshow: function () {
    return new app.components.slideshow.DesktopSlideshow({
      navigationControlVisible: !1
    })
  },
  onActiveSlideChange: function (e, t, n) {
    this.slideshow[n > 0 ? "showNavigationControl" : "hideNavigationControl"](), this._super(arguments)
  }
}), app.views.quark.slideshow.GeneralSlideContentContainer = app.views.quark.SlideContentContainer.extend({
  createLayoutContainer: function () {
    return new app.views.quark.slideshow.GeneralSlideLayoutContainer({
      model: this.model
    })
  },
  getPictureAttr: function () {
    return "picture"
  }
}), app.views.quark.slideshow.GeneralSlideLayoutContainer = app.views.quark.SlideLayoutContainer.extend({
  initComponent: function () {
    var e = this,
      t = this.model;
    e._super(arguments), e.picture = e.findById("backgroundPicture"), e.contentWrap = e.findById("contentWrap"), e.titleLabel = e.findById("title"), e.descriptionLabel = e.findById("description"), e.updateTitle(), e.updateDescription(), t.on({
      "change:title": e.updateTitle,
      "change:description": e.updateDescription,
      "change:picture.chosen_center": e.onChosenCenterChange,
      scope: e
    })
  },
  createConfig: function () {
    var e = app.views.quark.slideshow.layouts;
    if (Jux.isHandheld) return e.handheld;
    var t = this.model,
      n = t.get("picture_size"),
      r = t.get("layout");
    return e[n][r]
  },
  getBackgroundPictureAttributeName: function () {
    return "picture"
  },
  updateTitle: function () {
    var e = this.model.get("title");
    this.titleLabel.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.updateContentWrapVisibility()
  },
  updateDescription: function () {
    var e = this.model.get("description");
    this.descriptionLabel.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.updateContentWrapVisibility()
  },
  updateContentWrapVisibility: function () {
    var e = this.model,
      t = e.get("title"),
      n = e.get("description");
    this.contentWrap[t || n ? "show" : "hide"]()
  },
  onChosenCenterChange: function (e, t, n) {
    this.picture.setSrc(this.picture.getSrc(), {
      focusX: t ? t.x : 50,
      focusY: t ? t.y : 50
    })
  },
  onDestroy: function () {
    var e = this;
    e.model.un({
      "change:title": e.updateTitle,
      "change:description": e.updateDescription,
      "change:picture.chosen_center": e.onChosenCenterChange,
      scope: e
    }), e._super(arguments)
  }
}), app.views.quark.slideshow.TitleSlideContentContainer = app.views.quark.SlideContentContainer.extend({
  initComponent: function () {
    this.addEvents("click"), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments)
  },
  createLayoutContainer: function () {
    return new app.views.quark.TitleSlideLayoutContainer({
      model: this.model
    })
  },
  getPictureAttr: function () {
    return "cover_picture"
  }
}), app.views.quark.slideshow.TouchSlideshow = Jux.extend(app.views.quark.slideshow.Slideshow, {
  createSlideshow: function () {
    return new app.components.slideshow.TouchSlideshow
  }
}),
function () {
  var e = 32;
  app.views.quark.slideshow.layouts.fill = {
    left: {
      layout: "legacyhbox",
      width: "100%",
      height: "100%",
      cls: "textPosition-left",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        creditsIcon: !1,
        flex: 1
      }, {
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          left: 0
        },
        id: "contentWrap",
        cls: "content-wrap jux-bg-color",
        style: {
          "max-width": "50em",
          "white-space": "normal"
        },
        items: [{
          type: "container",
          style: {
            padding: e + "px"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    },
    center: {
      layout: "legacyhbox",
      width: "100%",
      height: "100%",
      cls: "textPosition-center",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        creditsIcon: !1,
        flex: 1
      }, {
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          left: 0,
          right: 0
        },
        style: {
          "text-align": "center"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap jux-bg-color",
          style: {
            display: "inline-block",
            "max-width": "65em",
            "white-space": "normal",
            "text-align": "left",
            position: "relative"
          },
          items: [{
            type: "container",
            style: {
              padding: e + "px"
            },
            items: [{
              type: "label",
              id: "title",
              cls: "slideTitle"
            }, {
              type: "label",
              id: "description",
              cls: "slideDescription"
            }]
          }]
        }]
      }]
    },
    right: {
      layout: "legacyhbox",
      width: "100%",
      height: "100%",
      cls: "textPosition-right",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture",
        creditsIcon: !1,
        flex: 1
      }, {
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          right: 0
        },
        id: "contentWrap",
        cls: "content-wrap jux-bg-color",
        style: {
          "max-width": "50em",
          "white-space": "normal"
        },
        items: [{
          type: "container",
          style: {
            padding: e + "px"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle"
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    }
  }
}(), app.views.quark.slideshow.layouts.fit = {
  left: {
    layout: "legacyhbox",
    cls: "textPosition-left backgroundColor",
    items: [{
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          right: 0
        },
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          width: "100%",
          "box-sizing": "border-box",
          "-moz-box-sizing": "border-box",
          "text-align": "left",
          padding: "32px 64px 32px 32px"
        },
        items: [{
          type: "label",
          id: "title",
          cls: "slideTitle"
        }, {
          type: "label",
          id: "description",
          cls: "slideDescription"
        }]
      }]
    }, {
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }]
  },
  center: {
    layout: "legacyvbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1,
      style: {
        "z-index": 1
      }
    }, {
      height: 200,
      width: "100%",
      id: "contentWrap",
      cls: "content-wrap",
      style: {
        "text-align": "left",
        "box-sizing": "border-box",
        "-moz-box-sizing": "border-box",
        padding: "32px",
        position: "relative"
      },
      items: [{
        type: "label",
        id: "title",
        cls: "slideTitle",
        style: {
          "max-width": "70%"
        }
      }, {
        type: "label",
        id: "description",
        cls: "slideDescription",
        style: {
          "max-width": "70%"
        }
      }]
    }]
  },
  right: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-right backgroundColor",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      flex: 1,
      style: {
        position: "relative"
      },
      items: [{
        layout: {
          type: "legacyabsolute",
          bottom: 50,
          left: 0
        },
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          width: "100%",
          "box-sizing": "border-box",
          "-moz-box-sizing": "border-box",
          padding: "32px 64px 32px 32px"
        },
        items: [{
          type: "label",
          id: "title",
          cls: "slideTitle"
        }, {
          type: "label",
          id: "description",
          cls: "slideDescription"
        }]
      }]
    }]
  }
}, app.views.quark.slideshow.layouts.frame = {
  left: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-left",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      cls: "frameBox",
      style: {
        margin: "0 auto"
      },
      items: [{
        flex: 1,
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          style: {
            overflow: "hidden",
            "box-sizing": "border-box",
            margin: "0 auto",
            "text-align": "center",
            position: "relative",
            "max-width": "76%"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle",
            text: "",
            style: {
              "word-wrap": "pre"
            }
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }, {
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          margins: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 350
          }
        }]
      }]
    }]
  },
  center: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-center",
    items: [{
      layout: {
        type: "center",
        align: "stretch"
      },
      id: "frameBox",
      height: "100%",
      cls: "frameBox",
      style: {
        margin: "0 auto"
      },
      items: [{
        type: "container",
        layout: "frame",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          style: {
            margin: "0 auto"
          },
          margins: {
            top: 0,
            right: 0,
            bottom: 150,
            left: 0
          }
        }, {
          layout: "center",
          style: {
            "min-height": "150px",
            width: "100%"
          },
          items: [{
            id: "contentWrap",
            cls: "content-wrap",
            width: "100%",
            style: {
              padding: "32px",
              "box-sizing": "border-box",
              "-moz-box-sizing": "border-box",
              "text-align": "left",
              position: "relative"
            },
            items: [{
              type: "label",
              id: "title",
              cls: "slideTitle"
            }, {
              type: "label",
              id: "description",
              cls: "slideDescription"
            }]
          }]
        }]
      }]
    }]
  },
  right: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      cls: "frameBox",
      style: {
        margin: "0 auto",
        "padding-right": "60px"
      },
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        vAlign: "middle",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          margins: {
            top: 0,
            right: 350,
            bottom: 0,
            left: 0
          }
        }]
      }, {
        flex: 1,
        style: {
          "box-sizing": "border-box"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap showCaption",
          style: {
            overflow: "hidden",
            margin: "0 auto",
            "text-align": "center",
            position: "relative",
            "max-width": "76%"
          },
          items: [{
            type: "label",
            id: "title",
            cls: "slideTitle",
            text: "",
            style: {
              "white-space": "pre-wrap"
            }
          }, {
            type: "label",
            id: "description",
            cls: "slideDescription"
          }]
        }]
      }]
    }]
  }
}, app.views.quark.slideshow.layouts.handheld = {
  layout: {
    type: "legacyhbox",
    align: "start"
  },
  width: "100%",
  height: "100%",
  items: [{
    type: "FillmorableImage",
    cls: "picture-container",
    id: "backgroundPicture",
    creditsIcon: !1,
    flex: 1
  }, {
    id: "contentWrap",
    cls: "content-wrap contain-content backgroundColor",
    layout: {
      type: "legacyabsolute",
      bottom: 20,
      left: 0
    },
    style: {
      background: "rgba(0,0,0,0.6)",
      "max-width": "100%",
      "white-space": "normal",
      "z-index": 9e3
    },
    items: {
      type: "ExpandableContainer",
      cls: "contentInner",
      items: [{
        type: "label",
        id: "title",
        cls: "slideTitle"
      }, {
        type: "label",
        id: "description",
        cls: "slideDescription"
      }]
    }
  }]
}, app.views.quark.slideshow.layouts.titleSlide = {
  fill: {
    layout: "legacyhbox",
    width: "100%",
    height: "100%",
    cls: "textPosition-center",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      layout: {
        type: "legacyabsolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      style: {
        "text-align": "left",
        "z-index": 1
      },
      items: [{
        layout: {
          type: "center",
          centerX: !1,
          useTable: !1
        },
        id: "scrollWrapper",
        height: "100%",
        style: {
          "overflow-y": "auto",
          "overflow-x": "hidden",
          "float": "right"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap jux-bg-color",
          style: {
            display: "inline-block",
            "max-width": "70em",
            "min-width": "34em",
            "white-space": "normal",
            padding: "4em 10em 6em 4em",
            position: "relative"
          },
          items: [{
            id: "quarkTitleWrap",
            cls: "quark-title",
            items: []
          }]
        }]
      }]
    }]
  },
  fit: {
    layout: "legacyhbox",
    cls: "textPosition-right",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      flex: 1,
      cls: "backgroundColor"
    }, {
      layout: {
        type: "legacyabsolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      items: [{
        layout: {
          type: "center",
          useTable: Jux.isTouch ? !1 : !0
        },
        id: "scrollWrapper",
        height: "100%",
        width: "50.02%",
        style: {
          "float": "right",
          padding: "0"
        },
        items: [{
          id: "contentWrap",
          cls: "content-wrap",
          style: {
            "text-align": "left",
            padding: "6em 10em 6em 3em",
            "white-space": "normal"
          }
        }]
      }]
    }]
  },
  frame: {
    layout: "center",
    width: "100%",
    height: "100%",
    cls: "backgroundColor textPosition-right",
    items: [{
      layout: {
        type: "legacyhbox",
        align: "stretch",
        vAlign: "middle"
      },
      id: "frameBox",
      width: "100%",
      cls: "frameBox",
      style: {},
      items: [{
        type: "container",
        layout: "frame",
        cls: "imageBg",
        items: [{
          type: "FillmorableImage",
          cls: "picture-container",
          id: "backgroundPicture",
          creditsIcon: !1,
          fillmore: !1,
          margins: {
            top: 0,
            right: 500,
            bottom: 0,
            left: 0
          }
        }]
      }, {
        id: "contentWrap",
        cls: "content-wrap",
        style: {
          overflow: "hidden",
          padding: "6em 10em 6em 3em",
          "box-sizing": "border-box",
          "-moz-box-sizing": "border-box",
          "text-align": "left",
          "word-break": "break-word"
        }
      }]
    }]
  },
  handheld: {
    layout: {
      type: "legacyhbox",
      align: "start"
    },
    width: "100%",
    height: "100%",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture",
      creditsIcon: !1,
      flex: 1
    }, {
      id: "contentWrap",
      cls: "content-wrap",
      layout: {
        type: "legacyabsolute",
        bottom: 20,
        left: 0
      },
      style: {
        background: "rgba(0,0,0,0.6)",
        "max-width": "100%",
        "white-space": "normal"
      }
    }]
  }
}, app.views.quark.slideshow.paletteManifest = {
  items: {
    layout: "Accordion",
    cls: "accordion-slideshow",
    height: 429,
    items: [{
      title: "Make the Show",
      items: [{
        type: "Section",
        cls: "dialog-section-slideshow",
        items: [{
          type: "carousel_slideshow",
          id: "carousel"
        }, {
          cls: "itemEditor",
          id: "slideEditPanelContainer",
          layout: "cards",
          activeItem: 0,
          items: [{
            id: "titleSlideEditPanel",
            items: [{
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "PictureSelector",
                key: "cover_picture",
                picture: {
                  picture: {
                    id: "519cffb21a1102d44900000f",
                    source: null,
                    url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/26/10/152/slideshow_fill.jpg",
                    description: null,
                    hidden: !1,
                    license: "",
                    original_created_at: null,
                    service: null,
                    service_creator_displayname: null,
                    service_creator_id: null,
                    service_creator_username: null,
                    service_media_id: null,
                    service_media_url: null,
                    service_uploaded_at: null,
                    title: null,
                    facial_center: null,
                    height: 934,
                    width: 1410
                  }
                },
                height: 80,
                width: 80,
                cls: "itemPicture"
              }, {
                columnWidth: "70%",
                items: [{
                  type: "Text",
                  key: "title",
                  emptyText: "Life in Photos",
                  restoreEmptyText: !0
                }, {
                  type: "TextArea",
                  key: "subtitle",
                  label: "Tell us what the show's about",
                  labelPosition: "infield",
                  height: 70,
                  autoGrow: !1,
                  restoreEmptyText: !1
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "Label",
                text: "Photo size",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: "72%",
                type: "ItemSelector",
                key: "picture_size",
                items: [{
                  cls: "pictureSize pictureSize-fill",
                  value: "fill"
                }, {
                  cls: "pictureSize pictureSize-fit",
                  value: "fit"
                }, {
                  cls: "pictureSize pictureSize-frame",
                  value: "frame"
                }]
              }]
            }]
          }, {
            id: "generalSlideEditPanel",
            items: [{
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "PictureSelector",
                id: "pictureSelector",
                picture: {
                  picture: {
                    id: "519cffb21a1102d44900000f",
                    source: null,
                    url: "http://jux-user-files-prod.s3.amazonaws.com/2013/05/22/17/26/10/152/slideshow_fill.jpg",
                    description: null,
                    hidden: !1,
                    license: "",
                    original_created_at: null,
                    service: null,
                    service_creator_displayname: null,
                    service_creator_id: null,
                    service_creator_username: null,
                    service_media_id: null,
                    service_media_url: null,
                    service_uploaded_at: null,
                    title: null,
                    facial_center: null,
                    height: 934,
                    width: 1410
                  }
                },
                height: 80,
                width: 80,
                cls: "itemPicture"
              }, {
                columnWidth: "70%",
                items: [{
                  type: "Text",
                  id: "slideTitleField",
                  label: "Title your pic",
                  labelPosition: "infield"
                }, {
                  type: "TextArea",
                  id: "slideDescriptionField",
                  label: "Say more, if you dare!",
                  labelPosition: "infield",
                  height: 70,
                  autoGrow: !1,
                  restoreEmptyText: !1
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "28%",
                type: "Label",
                text: "Photo size",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: "72%",
                type: "ItemSelector",
                id: "pictureSizeSelector",
                items: [{
                  cls: "pictureSize pictureSize-fill",
                  value: "fill"
                }, {
                  cls: "pictureSize pictureSize-fit",
                  value: "fit"
                }, {
                  cls: "pictureSize pictureSize-frame",
                  value: "frame"
                }]
              }]
            }, {
              type: "Section",
              layout: "Columns",
              items: [{
                columnWidth: "28%",
                type: "Label",
                text: "Text position"
              }, {
                columnWidth: "72%",
                type: "ItemSelector",
                id: "layoutSelector",
                items: [{
                  cls: "textPosition textPosition-left",
                  value: "left"
                }, {
                  cls: "textPosition textPosition-center",
                  value: "center"
                }, {
                  cls: "textPosition textPosition-right",
                  value: "right"
                }]
              }]
            }]
          }]
        }]
      }]
    }, {
      title: "Stylize",
      items: [{
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "SlideShow title",
            key: "title_font",
            minSize: 2,
            maxSize: 7,
            step: .1
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "SlideShow subtitle",
            key: "subtitle_font",
            minSize: 1,
            maxSize: 4,
            step: .1,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Slide title",
            key: "item_title_font",
            hideColorPicker: !1,
            minSize: 1,
            maxSize: 7,
            step: .1
          }]
        }]
      }, {
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Slide descriptions",
            key: "body_text_font",
            minSize: 1,
            maxSize: 3,
            step: .1,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "45%",
          type: "Label",
          text: "Background Color"
        }, {
          columnWidth: "55%",
          type: "ColorSetCustomizer",
          key: "color_scheme",
          colors: [{
            name: "background_color"
          }]
        }]
      }]
    }, {
      title: "Set Options",
      items: [{
          type: "Section",
          id: "galleryDropdownSection",
          items: [{
            type: "dropdown",
            id: "galleryDropdown",
            label: "In Jux",
            labelPosition: "top",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: []
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "DateTime",
            key: "sort_time",
            label: "Schedule post or date in the past",
            labelPosition: "top"
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_posted_time",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "21px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        },
        app.views.quark.PaletteShared.customizeBylineSection, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Proudly display the Jux badge",
            style: {
              "padding-top": "2px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "badge",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: "hype"
            }, {
              text: "Hide",
              value: ""
            }]
          }]
        }
      ]
    }]
  }
}, app.views.quark.streetview.Streetview = Jux.extend(app.views.quark.Quark, {
  abstractClass: !0,
  onRender: function () {
    var e = this;
    e._super(arguments);
    var t = e.$el;
    e.$mapEl = t.find('*[data-elem="map"]'), e.$infoCardEl = t.find('*[data-elem="infoCard"]'), e.$titleEl = e.$infoCardEl.find('*[data-elem="title"]'), e.$captionEl = e.$infoCardEl.find('*[data-elem="caption"]'), this.byline = new app.views.quark.shared.Byline({
      renderTo: e.$infoCardEl.find(".bylineWrap"),
      quark: e.model,
      listeners: {
        show: this.updateInfoCard,
        hide: this.updateInfoCard,
        scope: this
      }
    }), e.updateTitle(), e.updateCaption(), e.updateInfoCard()
  },
  afterRender: function () {
    this._super(arguments), this.byline.doLayout()
  },
  onDataChange: function (e, t, n) {
    var r = this;
    r._super(arguments);
    switch (t) {
    case "lat_lng":
      r.updateLocation();
      break;
    case "title":
      r.updateTitle(), r.updateInfoCard();
      break;
    case "caption":
      r.updateCaption(), r.updateInfoCard()
    }
  },
  updateLocation: Class.abstractMethod,
  updateTitle: function () {
    var e = this.model.get("title");
    this.$titleEl.html(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.$titleEl[e ? "show" : "hide"]()
  },
  updateCaption: function () {
    var e = this.model.get("caption");
    this.$captionEl.html(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(e))), this.$captionEl[e ? "show" : "hide"]()
  },
  updateInfoCard: function () {
    var e = this.model,
      t = !! e.get("title"),
      n = !! e.get("caption");
    this.$infoCardEl.css("visibility", t || n || this.byline.shouldBeVisible() ? "visible" : "hidden")
  }
}), app.views.quark.streetview.DesktopStreetview = Jux.extend(app.views.quark.streetview.Streetview, {
  deferredMapCreate: !1,
  initComponent: function () {
    this._super(arguments), Jux.Google.isMapsApiLoaded() || (Jux.Google.on("mapsapiload", this.onMapsApiLoad, this), Jux.Google.loadMapsApi())
  },
  onRender: function () {
    this._super(arguments), Jux.Google.isMapsApiLoaded() && this.createMap()
  },
  onMapsApiLoad: function () {
    this.rendered && this.createMap()
  },
  createMap: function () {
    var e = this,
      t = e.model,
      n = t.get("lat_lng");
    n = new google.maps.LatLng(n.lat, n.lng);
    var r = e.map = new google.maps.Map(e.$mapEl[0], {
      zoom: t.get("map_view_zoom"),
      center: n,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: !1
    }),
      i = e.streetView = e.map.getStreetView();
    i.setOptions({
      position: n,
      pov: t.get("pov"),
      visible: !t.get("map_view_visible"),
      addressControl: !1,
      panControl: !1
    });
    var s = e.mapMarker = new google.maps.Marker({
      map: r,
      position: n,
      draggable: !0
    });
    e.geocoder = new google.maps.Geocoder, e.streetViewService = new google.maps.StreetViewService, i.getVisible() && this.isImageryAvailable(n, {
      onUnavailable: function () {
        i.setVisible(!1)
      }
    });
    var o = google.maps.event;
    o.addListener(r, "bounds_changed", e.onMapBoundsChange.createDelegate(e)), o.addListener(r, "zoom_changed", e.onMapZoomChange.createDelegate(e)), o.addListener(i, "position_changed", e.onStreetviewPositionChange.createDelegate(e)), o.addListener(i, "pov_changed", e.onStreetviewPovChange.createDelegate(e)), o.addListener(i, "visible_changed", e.onStreetviewVisibleChange.createDelegate(e)), o.addListener(s, "click", e.onMarkerClick.createDelegate(e)), o.addListener(s, "dragend", e.onMarkerDragEnd.createDelegate(e)), t.set("mapBounds", r.getBounds()), e.onLoad()
  },
  isImageryAvailable: function (e, t) {
    t = t || {};
    var n = t.scope || this,
      r = t.onAvailable || Jux.emptyFn,
      i = t.onUnavailable || Jux.emptyFn;
    this.streetViewService.getPanoramaByLocation(e, 50, function (e, t) {
      t === google.maps.StreetViewStatus.OK ? r.call(n) : i.call(n)
    })
  },
  onMapBoundsChange: function () {
    this.model.set("mapBounds", this.map.getBounds())
  },
  onMapZoomChange: function () {
    var e = this,
      t = e.map,
      n = t.getZoom(),
      r = e.streetView;
    n > 20 ? (r.setPosition(t.getCenter()), r.setVisible(!0)) : e.model.set("map_view_zoom", n)
  },
  onStreetviewPositionChange: function () {
    if (this.streetView.getVisible()) {
      var e = this.streetView.getPosition();
      this.model.set("lat_lng", {
        lat: e.lat(),
        lng: e.lng()
      })
    }
  },
  onStreetviewPovChange: function () {
    var e = this.streetView.getPov();
    this.model.set("pov", {
      heading: e.heading,
      pitch: e.pitch,
      zoom: e.zoom
    })
  },
  onStreetviewVisibleChange: function () {
    this.model.set("map_view_visible", !this.streetView.getVisible())
  },
  onMarkerClick: function () {
    var e = this.streetView;
    e.setPosition(this.mapMarker.getPosition()), e.setVisible(!0)
  },
  onMarkerDragEnd: function () {
    var e = this.mapMarker.getPosition();
    this.model.set("lat_lng", {
      lat: e.lat(),
      lng: e.lng()
    }), this.geocoder.geocode({
      latLng: e
    }, function (e, t) {
      if (t === google.maps.GeocoderStatus.OK) {
        var n = e[0].formatted_address;
        n && this.model.set("address", n)
      }
    }.createDelegate(this))
  },
  updateLocation: function () {
    if (this.map) {
      var e = this.model.get("lat_lng");
      e = new google.maps.LatLng(e.lat, e.lng), this.mapMarker.setPosition(e), this.streetView.getVisible() && !e.equals(this.streetView.getPosition()) && this.streetView.setPosition(e);
      var t = this.map.getBounds();
      t.contains(e) || this.map.setCenter(e)
    }
  },
  onDestroy: function () {
    Jux.Google.un("mapsapiload", this.createMap, this), this._super(arguments)
  }
}), app.views.quark.streetview.TouchStreetview = Jux.extend(app.views.quark.streetview.Streetview, {
  onRender: function () {
    var e = this;
    e._super(arguments);
    var t = e.$window = jQuery(window);
    e.createMapImageEl(), e.resizeDelegate = e.updateMapImageEl.createDelegate(e), t.bind("resize", e.resizeDelegate)
  },
  createMapImageEl: function () {
    this.$mapImageEl = jQuery('<img style="width: 100%; height: 100%;" />').bind("load error", this.onImageLoad.createDelegate(this)).appendTo(this.$mapEl), this.updateMapImageEl()
  },
  updateMapImageEl: function () {
    this.$mapImageEl.attr("src", this.createImageUrl())
  },
  createImageUrl: function () {
    var e = this.$window;
    return this.model.createStaticImageUrl({
      width: e.width(),
      height: e.height()
    })
  },
  onImageLoad: function () {
    this.onLoad()
  },
  updateLocation: function () {
    this.updateMapImageEl()
  },
  onDestroy: function () {
    this.rendered && this.$window.unbind("resize", this.resizeDelegate), this._super(arguments)
  }
}), app.views.quark.streetview.paletteManifest = {
  items: {
    layout: "Accordion",
    id: "mainAccordion",
    height: 340,
    items: [{
      title: "Pick Your Spot",
      items: [{
        type: "Section",
        width: "98%",
        items: [{
          type: "Label",
          text: "Address"
        }, {
          type: "MapsAutocompleteTextField",
          key: "address",
          emptyText: "Enter a location"
        }]
      }, {
        type: "Section",
        width: "98%",
        items: [{
          type: "Label",
          text: "Title"
        }, {
          type: "text",
          key: "title",
          emptyText: "Place name",
          restoreEmptyText: !1
        }, {
          type: "Label",
          text: "Caption"
        }, {
          type: "textarea",
          key: "caption",
          label: "Watch your step!",
          labelPosition: "infield",
          autoGrow: !0,
          restoreEmptyText: !1
        }]
      }]
    }, {
      title: "Stylize",
      id: "styleIt",
      items: [{
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Title font",
            key: "title_font",
            minSize: 18,
            maxSize: 100
          }, {
            type: "FontCustomizer",
            label: "Caption font",
            key: "caption_font",
            minSize: 10,
            maxSize: 32,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "45%",
          type: "Label",
          text: "Caption background"
        }, {
          columnWidth: "55%",
          type: "ColorSetCustomizer",
          key: "color_scheme",
          colors: [{
            name: "background_color"
          }]
        }]
      }]
    }, {
      title: "Set Options",
      items: [{
          type: "Section",
          id: "galleryDropdownSection",
          items: [{
            type: "dropdown",
            id: "galleryDropdown",
            label: "In Jux",
            labelPosition: "top",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: []
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "DateTime",
            key: "sort_time",
            label: "Schedule post or date in the past",
            labelPosition: "top"
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_posted_time",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "21px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        },
        app.views.quark.PaletteShared.customizeBylineSection, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Proudly display the Jux badge",
            style: {
              "padding-top": "7px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "badge",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: "hype"
            }, {
              text: "Hide",
              value: ""
            }]
          }]
        }
      ]
    }]
  }
};
var Froogaloop = function () {
  function e(t) {
    return new e.fn.init(t)
  }

  function i(e, t, n) {
    if (!n.contentWindow.postMessage) return !1;
    var r = n.getAttribute("src").split("?")[0],
      i = JSON.stringify({
        method: e,
        value: t
      });
    n.contentWindow.postMessage(i, r)
  }

  function s(e) {
    if (e.origin != playerDomain) return !1;
    var t = JSON.parse(e.data),
      n = t.value,
      r = t.event || t.method,
      i = t.data,
      s = s == "" ? null : t.player_id,
      o = u(r, s),
      a = [];
    return o ? (n !== undefined && a.push(n), i && a.push(i), s && a.push(s), a.length > 0 ? o.apply(null, a) : o.call()) : !1
  }

  function o(e, n, r) {
    r ? (t[r] || (t[r] = {}), t[r][e] = n) : t[e] = n
  }

  function u(e, n) {
    return n ? t[n][e] : t[e]
  }

  function a(e, n) {
    if (n && t[n]) {
      if (!t[n][e]) return !1;
      t[n][e] = null
    } else {
      if (!t[e]) return !1;
      t[e] = null
    }
    return !0
  }

  function f(e) {
    var t = e.split("/"),
      n = "";
    for (var r = 0, i = t.length; r < i; r++) {
      if (!(r < 3)) break;
      n += t[r], r < 2 && (n += "/")
    }
    return n
  }

  function l(e) {
    return !!(e && e.constructor && e.call && e.apply)
  }

  function c(e) {
    return toString.call(e) === "[object Array]"
  }
  var t = {}, n = !1,
    r = Array.prototype.slice;
  return e.fn = e.prototype = {
    playerDomain: "",
    element: null,
    init: function (e) {
      return typeof e == "string" && (e = document.getElementById(e)), this.element = e, this
    },
    api: function (e, t) {
      if (!this.element || !e) return !1;
      var n = this,
        r = n.element,
        s = r.id != "" ? r.id : null,
        u = l(t) ? null : t,
        a = l(t) ? t : null;
      return a && o(e, a, s), i(e, u, r), n
    },
    addEvent: function (e, t) {
      if (!this.element) return !1;
      var r = this,
        u = r.element,
        a = u.id != "" ? u.id : null;
      return o(e, t, a), e != "ready" && i("addEventListener", e, u), n ? r : (playerDomain = f(u.getAttribute("src")), window.addEventListener ? window.addEventListener("message", s, !1) : window.attachEvent("onmessage", s, !1), n = !0, r)
    },
    removeEvent: function (e) {
      if (!this.element) return !1;
      var t = this,
        n = t.element,
        r = n.id != "" ? n.id : null,
        s = a(e, r);
      e != "ready" && s && i("removeEventListener", e, n)
    }
  }, e.fn.init.prototype = e.fn, window.Froogaloop = window.$f = e
}();
app.views.quark.video.player.Player = Jux.extend(Jux.util.Observable, {
  constructor: function (e, t) {
    this.addEvents("ready", "play", "pause", "end"), this.on("ready", function () {
      this._isReady = !0
    }, this);
    if (!e) throw new Error("app.views.quarks.video.player::Player() : 'id' argument required");
    this.id = e, this.layout = t, this._super(arguments)
  },
  _isReady: !1,
  isReadyToPlay: function () {
    return this._isReady
  },
  getId: function () {
    return this.id
  },
  isCurrentlyPlaying: function () {
    return this._isPlaying
  },
  _hasRendered: !1,
  hasRendered: function () {
    return this._hasRendered
  },
  render: function (e) {
    var t = this.createIFrame();
    e.append(t), this.createInternalPlayer(), this._hasRendered = !0
  },
  updateLayout: function (e) {
    e && (this.layout = e)
  },
  createIFrame: Jux.abstractFn,
  getIFrame: Jux.abstractFn,
  createInternalPlayer: Jux.abstractFn,
  play: Jux.abstractFn,
  pause: Jux.abstractFn,
  hasPlayed: Jux.abstractFn,
  remove: Jux.abstractFn
}), Jux.apply(app.views
  .quark.video.player.Player, {
    fromUrl: function (e) {
      var t = app.views.quark.video.player,
        n;
      return (n = t.VimeoPlayer.parseVideoId(e)) ? new t.VimeoPlayer(n) : (n = t.YoutubePlayer.parseVideoId(e)) ? new t.YoutubePlayer(n) : null
    }
  }), app.views.quark.video.LayoutContainer = app.views.quark.LayoutContainer.extend({
  maxBgWidth: 1600,
  maxBgHeight: 900,
  videoDimensionMultiplier: 1.3,
  frameLeftHeightPadding: 60,
  currentImageUrl: "",
  initComponent: function () {
    this._super(arguments), this.addEvents({
      videoReady: !0
    }), this.byline = this.findById("bylineWrap"), this.title = this.findById("title"), this.description = this.findById("description"), this.author = this.findById("author"), this.uiBackgroundImage = this.findById("userBackgroundImage"), this.uiBackgroundImageCover = this.findById("userBackgroundCover"), this.player = this.createPlayer(), this.setupPlayerBindings(), this.setupModelBindings(), this.fillUiFromModel(), this.player === null && this.fireEvent("videoReady", !1)
  },
  setupModelBindings: function () {
    this.model.on({
      "change:title": this.updateTitle,
      "change:description": this.updateDescription,
      "change:show_asset_creator": this.showOrHideAuthor,
      "change:autoPlay": this.pauseVideo,
      metadataUpdated: this.fillUiFromModel,
      "change:background_picture": this.changeBackground,
      scope: this
    }), this.model.get("property_set").on({
      "change:creator_displayname": this.updateAuthor,
      "change:service": this.updateAuthor,
      scope: this
    })
  },
  changeBackground: function (e, t, n) {
    if (t) {
      var r = t.get("picture");
      if (!r || !this.uiBackgroundImage) return;
      var i = r.get("url"),
        s = app.Defaults.getQuarkDefaults("video").background_picture.url;
      t !== n && this.uiBackgroundImage && this.uiBackgroundImage.getEl() && (e === "activate" || t === n ? this.setVideoBackground(i, !1) : this.setVideoBackground(i, !0))
    } else this.setVideoBackground(null, !0)
  },
  setVideoBackground: function (e, t) {
    if (this.currentImageUrl === e) return;
    this.currentImageUrl = e;
    var n = this;
    if (this.uiBackgroundImage && this.animation) {
      var r = function () {
        n.uiBackgroundImage.getEl().css(n.getBackgroundImageCSS(e))
      }, i;
      if (e) {
        e = this.getBackgroundUrl(e);
        var s = function () {
          t ? n.animation.animateBackgroundCover("opaque", function () {
            r(), n.animation.setBackgroundVisibility(!0), n.animation.animateToClosed(!0)
          }) : (r(), n.animation.setBackgroundVisibility(!0))
        };
        i = new Image, i.src = e, i.onload = s
      } else this.animation.setBackgroundVisibility(!1)
    }
  },
  getBackgroundUrl: function (e) {
    var t = this.model.get("background_image_extension");
    return t.toLowerCase() !== "gif" && (e = Jux.Magickly.convertImageUrl(e, {
      thumb: this.maxBgWidth + "x" + this.maxBgHeight + ">"
    })), e
  },
  getBackgroundImageCSS: function (e) {
    var t = {
      "background-image": "url(" + e + ")"
    }, n = Jux.Util.getViewportSize(),
      r = this.model.get("background_picture_dimensions"),
      i, s, o = .9;
    return r && (i = r.width / n.width, s = r.height / n.height, i >= o && s >= o ? t["background-size"] = "cover" : (t["background-size"] = "auto", t["background-repeat"] = "repeat")), t
  },
  setupPlayerBindings: function () {
    this.player && (this.player.on("play", function () {
      this.fireEvent("videoPlaying", !0)
    }.createDelegate(this)), this.player.on("pause", function () {
      this.fireEvent("videoPaused", !1)
    }.createDelegate(this)), this.player.on("ready", function () {
      this.fireEvent("videoReady", !0), this.model.get("autoPlay") && this.autoPlay()
    }, this))
  },
  createConfig: function () {
    var e = Jux.Util.getQueryString("video_size"),
      t = "";
    return this.queryString = Jux.Util.getQueryString("video_size"), this.queryString ? t = this.layoutType = e : t = this.autoPickLayout(), Jux.isHandheld && (t = "handheld"), this.model.set("video_layout_type", t), app.views.quark.video.layouts[t]
  },
  _numBetween: function (e, t, n) {
    return e <= n && e >= t
  },
  autoPickLayout: function () {
    var e = this.getExpandedVideoDimensions(),
      t = "full_screen",
      n = "frame_left",
      r = "frame_top",
      i = "handheld";
    if (Jux.isHandheld) return i;
    if (e === null) return n;
    var s = Jux.Util.getViewportSize(),
      o = e.width / s.width,
      u = .45,
      a = 0,
      f = 200;
    if (Jux.isIPad) return this.layoutType = r, r;
    if (this._numBetween(o, u, Infinity) && e.height > s.height - f || e.width > s.width) return this.layoutType = t, this.layoutType;
    if (this._numBetween(o, u, Infinity) && e.height < s.height - f) return this.layoutType = r, this.layoutType;
    if (this._numBetween(o, a, u)) return this.layoutType = n, this.layoutType
  },
  afterRender: function () {},
  fillUiFromModel: function () {
    var e = this.model.get("title"),
      t = this.model.get("description");
    this.updateAuthor(), this.updateDescription(null, t), this.updateTitle(null, e)
  },
  updateTitle: function (e, t, n) {
    this.updateOneUiLabel(this.title, t)
  },
  updateDescription: function (e, t, n) {
    this.updateOneUiLabel(this.description, t)
  },
  updateAuthor: function () {
    var e = this.model.get("property_set").get("creator_username"),
      t = this.model.get("property_set").get("creator_displayname"),
      n = "from <span class='author'>",
      r = "",
      i = "",
      s = "",
      o = "",
      u = "</span>",
      a = this.model.get("property_set").get("service"),
      f = this.model.get("show_asset_creator");
    e && (r = "<a href='", a === "vimeo" ? (i = "http://www.vimeo.com/", url = e) : (i = "http://www.youtube.com/user/", url = e), s = "' target='_blank'>", o = "</a>"), e && f ? this.updateOneUiLabel(this.author, [n, r, i, url, s, t, o, u].join("")) : this.updateOneUiLabel(this.author, "")
  },
  showOrHideAuthor: function () {
    this.model.get("show_asset_creator") === !1 ? this.updateAuthor(null, null) : this.updateAuthor(null, this.model.get("property_set").get("creator_displayname"))
  },
  updateOneUiLabel: function (e, t) {
    e.setText(Jux.util.Html.nl2br(app.views.quark.Quark.autolinkUrls(t)))
  },
  onDestroy: function () {
    this.model.un({
      "change:title": this.updateTitle,
      "change:description": this.updateDescription,
      "change:show_asset_creator": this.showOrHideAuthor,
      "change:autoPlay": this.pauseVideo,
      metadataUpdated: this.fillUiFromModel,
      "change:background_picture": this.changeBackground
    }), this.model.get("property_set").un({
      "change:creator_displayname": this.updateAuthor,
      "change:service": this.updateAuthor
    }), this.animation && this.animation.destroy(), this._super(arguments)
  },
  playVideo: function () {
    this.isActive() && this.player && this.player.play()
  },
  pauseVideo: function () {
    this.player && this.player.pause()
  },
  onActivate: function () {
    this._super(arguments);
    if (!this.player) return;
    if (!this.$el) {
      Jux.logError("$el not defined.  Video not able to laod");
      return
    }
    this.$videoContainer = this.$el.find(".videoPlayerContainer"), Jux.isHandheld || (this.animation = this.setupAnimationStrategy(), this.adjustVideoSize(), this.autoPlay(), this.changeBackground("activate", this.model.get("background_picture"))), this.player.hasRendered() || this.player.render(this.$videoContainer)
  },
  autoPlay: function () {
    var e = 2e3,
      t = 2e3;
    this.model.get("autoPlay") && !Jux.isIPad && (this.player.isReadyToPlay() && setTimeout(this.playVideo.createDelegate(this), e), (Jux.isIE || Jux.isMoz && this.model.get("property_set").get("service") === "youtube") && setTimeout(this.playVideo.createDelegate(this), t))
  },
  getExpandedVideoDimensions: function () {
    var e = this.model.get("property_set").get("dimensions");
    e === null && (Jux.logError("JUX: NULL DATA FOR VIDEO"), e = {
      width: 459,
      height: 344
    });
    var t = e.width * this.videoDimensionMultiplier,
      n = e.height * this.videoDimensionMultiplier;
    return {
      width: t,
      height: n
    }
  },
  adjustVideoSize: function () {
    var e = this.getExpandedVideoDimensions();
    switch (this.layoutType) {
    case "frame_top":
      e.width < 700 && this.$videoContainer.parent().css({
        "max-width": e.width + "px"
      });
      if (Jux.isIPad) {
        var t = e.height;
        t > 380 && (t = 380), this.$videoContainer.css({
          height: t + "px"
        });
        break
      }
      this.$videoContainer.css({
        height: e.height + "px"
      }), this.$videoContainer.parent().css("width", e.width + "px");
      break;
    case "frame_left":
      this.$videoContainer.css({
        width: e.width + "px",
        height: e.height + "px"
      }), this.$videoContainer.parent().parent().css({
        height: e.height + this.frameLeftHeightPadding + "px"
      })
    }
  },
  onDeactivate: function () {
    this._super(arguments), this.animation && this.animation.deactivate(), this.pauseVideo()
  },
  setupAnimationStrategy: function () {
    var e = this.layoutType,
      t = this.$el,
      n = this.$el.find(".textWrapper"),
      r = n,
      i, s;
    this.animation && this.animation.destroy(), this.queryString && (e = this.queryString), e || (e = "frame_left");
    switch (e) {
    case "frame_top":
      i = r;
      break;
    case "frame_left":
      i = this.$el.find(".videoContainerWrapper"), s = r, r = this.findById("videoExpanderArrow").getEl();
      break;
    case "full_screen":
      i = this.$el.find(".videoPlayerContainer"), s = r, r = this.findById("videoInvisibleHotspot").getEl()
    }
    return new app.views.quark.video.Animation[e]({
      $el: this.$el,
      $triggerEl: r,
      $animateEl: i,
      $containerEl: t,
      $textWrapper: n,
      $videoContainer: this.$videoContainer,
      $mouseLeaveEl: s,
      uiBackgroundImage: this.uiBackgroundImage,
      uiBackgroundImageCover: this.uiBackgroundImageCover,
      player: this.player,
      model: this.model
    })
  },
  createPlayer: function () {
    var e = this.model.get("youtube_link"),
      t = app.views.quark.video.player.Player.fromUrl(e);
    return t
  }
}), app.views.quark.video.Video = Jux.extend(app.views.quark.Quark, {
  currentPlayer: null,
  layout: null,
  createLayoutContainer: function () {
    return new app.views.quark.video.LayoutContainer({
      currentUser: this.currentUser,
      model: this.model,
      quarkPackageName: this.quarkTypeName
    })
  },
  onRender: function () {
    this._super(arguments), this.model.on({
      "change:description_font": this.updateStyles,
      "change:title_font": this.updateStyles,
      metadataUpdated: this.rerenderStage,
      fetchingVideoData: this.createMask,
      scope: this
    }), this.redrawLayoutContainer(!1)
  },
  rerenderStage: function () {
    if (!this.model.get("youtube_link")) return;
    this.hideMyMask(), this.redrawLayoutContainer(!0)
  },
  redrawLayoutContainer: function (e) {
    if (!this.rendered) return;
    this.removeAll(), e === !0, this.layoutContainer && this.layoutContainer.destroy(), this.layoutContainer = this.createLayoutContainer(), this.layoutContainer.on("videoReady", this.onVideoReady, this), this.layoutContainer.on("videoPlaying", function () {
      this.badge && this.badge.fadeOut()
    }, this), this.layoutContainer.on("videoPaused", function () {
      this.badge && this.badge.fadeIn()
    }, this), this.add(this.layoutContainer), this.isActive() && this.layoutContainer.activate(), this.onLoad()
  },
  hideMyMask: function () {
    this.myMask && this.myMask.hide()
  },
  createMask: function () {
    !this.myMask && this.$el && (this.myMask = new ui.Mask(this.$el)), this.myMask && this.myMask.show()
  },
  onVideoReady: function () {
    this.onLoadCalled || (this.onLoad(), this.onLoadCalled = !0)
  },
  onActivate: function () {
    this._super(arguments), this.layoutContainer && this.layoutContainer.activate(), this.doLayout();
    if (Jux.isHandheld) {
      var e = this.$el;
      this.$videoWrapEl = e.find(".videoWrap");
      var t = this.$videoWrapEl[0];
      this.scroller = new iScroll(t, {
        hScrollbar: !1
      }), e.one("touchstart", function (e) {
        this.scroller.refresh()
      }.createDelegate(this)), setTimeout(function () {
        this.scroller.refresh()
      }.createDelegate(this), 500)
    }
  },
  onDeactivate: function () {
    this.layoutContainer && this.layoutContainer.deactivate(), this._super(arguments)
  },
  afterRender: function () {
    this._super(arguments)
  },
  onDestroy: function () {
    this.layoutContainer && this.layoutContainer.destroy(), this._super(arguments)
  }
}), app.views.quark.video.Animation = Class.extend(Jux.util.Observable, {
  animationState: "open",
  isAnimating: !1,
  firstAnimationDelay: 1500,
  firstAnimationSpeed: 1e3,
  firstAnimation: !0,
  delayToHideTextArea: 2e3,
  bgCoverCoveredOpacity: .7,
  bgCoverInvisibleOpacity: 0,
  bgCoverOpaqueOpacity: 1,
  backgroundFadeInSpeed: 1e3,
  backgroundFadeOutSpeed: 1500,
  backgroundFadeInEasing: "easeInExpo",
  backgroundFadeOutEasing: "easeOutExpo",
  constructor: function (e) {
    this.model = e.model, this.uiBackgroundImage = e.uiBackgroundImage, this.uiBackgroundImageCover = e.uiBackgroundImageCover, this.$triggerEl = e.$triggerEl, this.$animateEl = e.$animateEl, this.$containerEl = e.$containerEl, this.$textWrapper = e.$textWrapper, this.$videoContainer = e.$videoContainer, e.$mouseLeaveEl && (this.$mouseLeaveEl = e.$mouseLeaveEl), this.$el = e.$el, this.player = e.player, this.player.on({
      play: this.animateToClosed,
      pause: this.animateToOpen,
      scope: this
    }), this.addEvents({
      animationStarted: !0,
      animationEnded: !0,
      "open:animationStarted": !0,
      "open:animationEnded": !0,
      "closed:animationStarted": !0,
      "closed:animationEnded": !0
    }), this.attachMouseEvents(), this.listenForWindowResize(), this.listenForTextBoxSizeChange()
  },
  determineIfThereIsContent: function () {
    var e = _.trim(this.model.get("title")),
      t = _.trim(this.model.get("description")),
      n = this.model.get("show_asset_creator"),
      r = this.model.get("author_enabled"),
      i = this.model.get("show_posted_time");
    return {
      itemsViewable: !! (e || t || n || r || i),
      title: !! e,
      description: !! t,
      author: !! n,
      byline: !! r,
      date: !! i
    }
  },
  determineStartingState: Jux.abstractFn,
  listenForTextBoxSizeChange: function () {
    this.model.on({
      "change:description": this.animateToPosition,
      "change:title": this.animateToPosition,
      "change:show_asset_creator": this.animateToPosition,
      "change:show_posted_time": this.animateToPosition,
      "change:description_font": this.animateToPosition,
      "change:title_font": this.animateToPosition,
      "change:author_enabled": this.animateToPosition,
      scope: this
    })
  },
  animateToPosition: function () {
    this.animateToOpen(), this.updatePosition()
  },
  updatePosition: function () {
    this.determineStartingState(this.determineIfThereIsContent()), this.animationState === "open" ? this.animateToOpen(!0) : this.animateToClosed(!0)
  },
  windowResizeHandler: Jux.emptyFn,
  resizeHandlerPlaced: !1,
  windowResizeHandlerDefinition: function () {
    if (this.isAnimating || this.resizeHandlerPlaced || this.firstAnimation) return;
    this.resizeHandlerPlaced = !0;
    var e = 500;
    switch (this.animationState) {
    case "open":
      setTimeout(function () {
        this.animateToOpen(!0), this.resizeHandlerPlaced = !1
      }.createDelegate(this), e);
      break;
    case "closed":
      setTimeout(function () {
        this.animateToClosed(!0), this.resizeHandlerPlaced = !1
      }.createDelegate(this), e)
    }
  },
  listenForWindowResize: function () {
    if (Jux.isHandheld) return;
    this.windowResizeHandler = this.windowResizeHandlerDefinition.createDelegate(this), jQuery(window).bind("resize", this.windowResizeHandler)
  },
  detachWindowResizeEvent: function () {
    this.windowResizeHandler && jQuery(window).unbind("resize", this.windowResizeHandler)
  },
  createAnimationObjects: Jux.abstractFn,
  attachMouseEvents: function () {
    if (!this.$triggerEl && !this.$mouseLeaveEl) return;
    var e = this,
      t;
    this.$mouseLeaveEl ? t = this.$mouseLeaveEl : t = this.$triggerEl, t.on("mouseleave", function () {
      e.isAnimating === !1 && setTimeout(function () {
        e.animateToClosed()
      }, e.delayToHideTextArea)
    }), this.$triggerEl && this.$triggerEl.on("mouseover", function () {
      e.animateToOpen()
    })
  },
  computeCssOnAnimateEl: function (e) {
    var t = this.computeObject(e, this);
    this.$animateEl.css(t)
  },
  animateToClosed: function (e) {
    if (!this.player.isCurrentlyPlaying() && e !== !0) return;
    this._animate(this.closeAnimationObj, e)
  },
  forceAnimateToClosed: function () {
    this.animateToClosed(!0)
  },
  animateToOpen: function (e) {
    this._animate(this.openAnimationObj, e)
  },
  forceAnimateToOpen: function () {
    this.animateToOpen(!0)
  },
  _animate: function (e, t) {
    if (t !== !0) {
      if (this.isAnimating === !0 || !this.player.hasPlayed() || e.getToState() === this.animationState) return
    } else if (this.isAnimating === !0) return;
    this.isAnimating = !0, this.animationState = e.getToState();
    var n = this,
      r, i;
    this.firstAnimation ? (this.firstAnimation = !1, r = this.firstAnimationSpeed, i = this.firstAnimationDelay) : (r = e.getSpeed(), i = e.getDelay()), setTimeout(function () {
      e.getBeforeAnimate().call(n, function () {
        n.fireEvent(n.animationState + ":animationStarted", !0), n.fireEvent("animationStarted", !0), e.getParallelAnimation().call(n), $(n.$containerEl).addClass("animating"), n.$animateEl.animate(n.computeObject(e.getAnimateTo(), n), r, e.getEasing(), function () {
          $(n.$containerEl).removeClass("animating"), $(n.$containerEl).removeClass(e.getToggleClassFromTo()[0]).addClass(e.getToggleClassFromTo()[1]), n.isAnimating = !1, n.fireEvent(n.animationState + ":animationEnded", !0), n.fireEvent("animationEnded", !0), e.getBeforeBackgroundFadeAnimation().call(n), n.model.set("video_caption_state", n.animationState), e.adjustBackground(function () {
            e.getAfterAnimate().call(n)
          }, !n.model.get("background_picture"))
        })
      })
    }, i)
  },
  animateBackgroundCover: function (e, t) {
    if (!this.uiBackgroundImageCover) return;
    t = t || Jux.emptyFn;
    var n = this.uiBackgroundImageCover.getEl(),
      r;
    if (!n) return;
    switch (e) {
    case "covered":
      r = this.bgCoverCoveredOpacity;
      break;
    case "invisible":
      r = this.bgCoverInvisibleOpacity;
      break;
    case "opaque":
      r = this.bgCoverOpaqueOpacity
    }
    n.stop().animate({
      opacity: r
    }, this.backgroundFadeInSpeed, this.backgroundFadeInEasing, t)
  },
  setBackgroundVisibility: function (e) {
    if (!this.uiBackgroundImageCover) return;
    var t = this.uiBackgroundImageCover.getEl(),
      n = this.uiBackgroundImage.getEl();
    if (!t || !n) return;
    e ? (t.show(), n.show()) : (t.hide(), n.hide())
  },
  deactivate: function () {
    this.detachWindowResizeEvent(), this.resetBackground()
  },
  resetBackground: function () {
    this.openAnimationObj.adjustBackground()
  },
  destroy: function () {
    this.model.un({
      "change:description": this.animateToPosition,
      "change:title": this.animateToPosition,
      "change:show_asset_creator": this.animateToPosition,
      "change:show_posted_time": this.animateToPosition,
      "change:description_font": this.animateToPosition,
      "change:title_font": this.animateToPosition,
      "change:author_enabled": this.animateToPosition
    }), this.player && this.player.un({
      play: this.animateToClosed,
      pause: this.animateToOpen
    }), this.detachWindowResizeEvent()
  },
  computeObject: function (e, t) {
    var n = {};
    for (var r in e) e.hasOwnProperty(r) && (typeof e[r] != "function" ? n[r] = e[r] : n[r] = e[r].call(t));
    return n
  }
}), app.views.quark.video.Animation.frame_left = Class.extend(app.views.quark.video.Animation, {
  constructor: function () {
    this._super(arguments), this.$backgroundImage = this.uiBackgroundImage.getEl(), this.$backgroundCover = this.uiBackgroundImageCover.getEl(), this.$videoOuterWrap = this.$containerEl.find(".videoOuterWrap"), this.$byline = this.$containerEl.find(".bylineWrap"), this.$arrow = this.$containerEl.find(".arrowIcon"), this.createAnimationObjects(), this.determineStartingState(this.determineIfThereIsContent()), this.setupMouseInactiyListener()
  },
  mouseStagnantCls: "mouseStagnant",
  setStagnantClass: function (e) {
    e ? this.$animateEl.addClass(this.mouseStagnantCls) : this.$animateEl.removeClass(this.mouseStagnantCls)
  },
  setupMouseInactiyListener: function () {
    this.$el.on("mousemove", _.throttle(this.onMouseMove.createDelegate(this), 100))
  },
  onMouseMove: function (e) {
    this.stagnantTimeOut && clearTimeout(this.stagnantTimeOut), this.$animateEl.removeClass(this.mouseStagnantCls), this.stagnantTimeOut = setTimeout(this.onMouseStagnant.createDelegate(this), 2e3)
  },
  onMouseStagnant: function () {
    this.setStagnantClass(!0)
  },
  determineStartingState: function (e) {
    e.itemsViewable ? (this.$videoOuterWrap.removeClass("noText"), this.closeAnimationObj.setUseRegularAnimateTo(!0), this.openAnimationObj.setUseRegularAnimateTo(!0), this.$triggerEl.show(), !e.author && !e.title && !e.description && (e.byline || e.date) ? (this.$byline.addClass("noCreditOrTitle"), !e.author && !e.title && !e.description && (e.byline || e.date) && setTimeout(function () {
      var e = this.$byline.parent().height();
      this.$byline.css({
        top: e / 2 + "px"
      }), this.$byline.addClass("centerByline")
    }.createDelegate(this), 10)) : (this.$byline.removeClass("noCreditOrTitle"), (e.author || e.title || e.description) && (e.byline || e.date) && this.$byline.removeClass("centerByline"))) : (this.$videoOuterWrap.addClass("noText"), this.closeAnimationObj.setUseRegularAnimateTo(!1), this.openAnimationObj.setUseRegularAnimateTo(!1), this.firstAnimation ? (this.$triggerEl.hide(), this.computeCssOnAnimateEl(this.closeAnimationObj.getAnimateTo())) : this.animateToClosed(!0))
  },
  createAnimationObjects: function () {
    this.closeAnimationObj = new app.views.quark.video.Transition.Closed({
      easing: "easeInQuint",
      speed: 1e3,
      beforeAnimate: function (e) {
        e()
      },
      animateTo: {
        width: function () {
          var e = Jux.Util.getViewportSize().width + 2;
          return e + "px"
        }
      },
      animateToNoText: {
        width: "50%"
      },
      beforeBackgroundFade: function () {
        this.$animateEl.removeClass("expanded"), this.setStagnantClass(!0)
      },
      afterAnimate: function () {
        this.animateBackgroundCover("invisible")
      }
    }), this.openAnimationObj = new app.views.quark.video.Transition.Open({
      beforeAnimate: function (e) {
        this.$animateEl.addClass("expanded"), e()
      },
      easing: "swing",
      animateTo: {
        width: "25%"
      },
      animateToNoText: {},
      afterAnimate: function () {
        this.animateBackgroundCover("covered")
      }
    })
  },
  destroy: function () {
    this.stagnantTimeOut && clearTimeout(this.stagnantTimeOut), this._super(arguments)
  }
}), app.views.quark.video.Animation.frame_top = Class.extend(app.views.quark.video.Animation, {
  constructor: function () {
    this._super(arguments), this.$backgroundImage = this.uiBackgroundImage.getEl(), this.$backgroundCover = this.uiBackgroundImageCover.getEl(), this.$byline = this.$containerEl.find(".byline"), this.$arrow = this.$containerEl.find(".arrowIcon"), this.createAnimationObjects(), this.determineStartingState(this.determineIfThereIsContent())
  },
  determineStartingState: function (e) {
    e.itemsViewable ? (this.closeAnimationObj.setUseRegularAnimateTo(!0), this.openAnimationObj.setUseRegularAnimateTo(!0), this.$triggerEl.show(), !e.author && !e.title && (e.byline || e.date) ? this.$byline.addClass("noCreditOrTitle") : this.$byline.removeClass("noCreditOrTitle")) : (this.closeAnimationObj.setUseRegularAnimateTo(!1), this.openAnimationObj.setUseRegularAnimateTo(!1), this.firstAnimation ? this.$triggerEl.hide() : this.animateToClosed(!0))
  },
  createAnimationObjects: function () {
    var e = this;
    this.closeAnimationObj = new app.views.quark.video.Transition.Closed({
      animateTo: {
        "margin-top": function () {
          var e = 25;
          return "-" + (this.$triggerEl.outerHeight() - e) + "px"
        },
        opacity: .15
      },
      animateToNoText: {
        "margin-top": function () {
          return "-" + this.$triggerEl.outerHeight() + "px"
        }
      },
      afterAnimate: function () {
        this.animateBackgroundCover("invisible", function () {
          this.$arrow.animate({
            opacity: 1
          })
        }.createDelegate(this))
      }
    }), this.openAnimationObj = new app.views.quark.video.Transition.Open({
      beforeAnimate: function (e) {
        this.$arrow.animate({
          opacity: .01
        }), e()
      },
      animateTo: {
        "margin-top": "0px",
        opacity: 1
      },
      animateToNoText: {
        opacity: 1
      },
      afterAnimate: function () {
        this.animateBackgroundCover("covered")
      }
    })
  }
}), app.views.quark.video.Animation.full_screen = Class.extend(app.views.quark.video.Animation, {
  constructor: function () {
    this._super(arguments), this.$byline = this.$containerEl.find(".byline"), this.$quarkContainer = this.$containerEl.parent(), this.$textWrapper = this.$containerEl.find(".textWrapper"), this.createAnimationObjects(), this.setTextWrapperInitialHeight(), this.determineStartingState(this.determineIfThereIsContent())
  },
  maxHeight: 280,
  setTextWrapperInitialHeight: function () {
    this.textWrapperHeight = Jux.Util.getViewportSize().height * .28, this.textWrapperHeight > this.maxHeight && (this.textWrapperHeight = this.maxHeight), this.$textWrapper.css("height", this.textWrapperHeight + "px")
  },
  determineStartingState: function (e) {
    e.itemsViewable ? (this.closeAnimationObj.setUseRegularAnimateTo(!0), this.openAnimationObj.setUseRegularAnimateTo(!0), this.$textWrapper.show(), this.firstAnimation && this.computeCssOnAnimateEl(this.openAnimationObj.getAnimateTo()), !e.author && !e.title && (e.byline || e.date) ? this.$byline.addClass("noCreditOrTitle") : this.$byline.removeClass("noCreditOrTitle")) : (this.closeAnimationObj.setUseRegularAnimateTo(!1), this.openAnimationObj.setUseRegularAnimateTo(!1), this.$textWrapper.hide(), this.firstAnimation && this.computeCssOnAnimateEl(this.closeAnimationObj.getAnimateTo()))
  },
  getNegativeMarginTop: function () {
    var e = Jux.Util.getViewportSize(),
      t = 10,
      n = this.textWrapperHeight + t;
    return n > this.maxHeight && (n = this.maxHeight), -n + "px"
  },
  afterAnimateOnClosed: function () {
    this.$animateEl.css("margin-top", "0px"), this.$quarkContainer.scrollTop(0)
  },
  createAnimationObjects: function () {
    var e = this;
    this.$animateEl.css({
      "margin-top": this.getNegativeMarginTop()
    }), this.closeAnimationObj = new app.views.quark.video.Transition.Closed({
      animateTo: {
        "margin-top": "0px"
      },
      animateToNoText: {
        "margin-top": "0px"
      },
      afterAnimate: this.afterAnimateOnClosed
    }), this.openAnimationObj = new app.views.quark.video.Transition.Open({
      animateTo: {
        "margin-top": this.getNegativeMarginTop
      },
      animateToNoText: {
        "margin-top": "0px"
      }
    })
  }
}), app.views.quark.video.layouts.frame_left = {
  cls: "frame_left ",
  items: [{
    cls: "videoOverlay"
  }, {
    cls: "userBackgroundContainer",
    items: [{
      cls: "userBackgroundImage",
      type: "container",
      id: "userBackgroundImage"
    }, {
      cls: "userBackgroundCover",
      type: "container",
      id: "userBackgroundCover"
    }]
  }, {
    cls: "videoVerticalCenterer",
    items: [{
      cls: "videoOuterWrap",
      items: [{
        cls: "videoContainerWrapper backgroundColorFaded expanded",
        items: [{
          cls: "videoPlayerContainer",
          items: {
            id: "videoExpanderArrow",
            cls: "videoExpanderArrow",
            html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="18px" xml:space="preserve"><polyline fill="none" stroke-width="2px" points="10,2 2,9 10,16"></polyline></svg>'
          }
        }]
      }, {
        cls: "textWrapper backgroundColor videoVerticalCenterer",
        items: [{
          cls: "verticalCentered",
          items: [{
            cls: "textContainer",
            items: [{
              cls: "textRightCol col2 ",
              items: [{
                cls: "titleAndAuthor",
                items: [{
                  type: "label",
                  id: "title",
                  cls: "titleText titleFont",
                  text: "Title"
                }, {
                  type: "label",
                  id: "author",
                  cls: "nameFont",
                  text: "Author"
                }]
              }, {
                type: "label",
                id: "description",
                cls: "titleText video-description",
                text: "Description"
              }]
            }]
          }, {
            cls: "stickyFooter"
          }]
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }]
  }]
}, app.views.quark.video.layouts.frame_top = {
  cls: "frame_top",
  items: [{
    cls: "videoOverlay"
  }, {
    cls: "userBackgroundContainer",
    items: [{
      cls: "userBackgroundImage",
      type: "container",
      id: "userBackgroundImage"
    }, {
      cls: "userBackgroundCover",
      type: "container",
      id: "userBackgroundCover"
    }]
  }, {
    cls: "videoVerticalCenterer ",
    items: [{
      cls: "videoOuterWrap",
      items: [{
        cls: "videoPlayerContainer"
      }, {
        cls: "textWrapper backgroundColor",
        items: [{
          cls: "textContainer",
          items: [{
            cls: "bothColumns",
            items: [{
              cls: "textLeftCol col2",
              items: [{
                cls: "titleAndAuthor",
                items: [{
                  type: "label",
                  id: "title",
                  cls: "titleText titleFont",
                  text: "Title"
                }, {
                  type: "label",
                  id: "author",
                  cls: "nameFont",
                  text: "Author"
                }]
              }, {
                id: "bylineWrap",
                cls: "bylineWrap"
              }]
            }, {
              cls: "textRightCol col2",
              items: [{
                type: "label",
                id: "description",
                cls: "titleText video-description",
                text: "Description"
              }]
            }]
          }, {
            id: "arrowIcon",
            cls: "arrowIcon"
          }]
        }]
      }]
    }]
  }]
}, app.views.quark.video.layouts.full_screen = {
  cls: "full_screen backgroundColor",
  items: [{
    cls: "videoOuterWrap",
    items: [{
      id: "videoInvisibleHotspot",
      cls: "videoInvisibleHotspot"
    }, {
      cls: "videoOverlay"
    }, {
      cls: "videoPlayerContainer"
    }, {
      cls: "textWrapper backgroundColor",
      items: [{
        cls: "textContainer",
        items: [{
          cls: "textLeftCol col2",
          items: [{
            cls: "titleAndAuthor",
            items: [{
              type: "label",
              id: "title",
              cls: "titleText titleFont",
              text: "Title"
            }, {
              type: "label",
              id: "author",
              cls: "nameFont",
              text: "Author"
            }]
          }, {
            id: "bylineWrap",
            cls: "bylineWrap"
          }]
        }, {
          cls: "textRightCol col2",
          items: [{
            type: "label",
            id: "description",
            cls: "titleText video-description",
            text: "Description"
          }]
        }, {
          id: "arrowIcon",
          cls: "arrowIcon"
        }]
      }]
    }]
  }]
}, app.views.quark.video.layouts.handheld = {
  cls: "videoWrap",
  items: [{
    cls: "inner-scroller",
    items: [{
      cls: "videoFrameWrap videoPlayerContainer"
    }, {
      cls: "infoCard backgroundColor",
      items: [{
        cls: "infoWrap",
        items: [{
          type: "label",
          id: "title",
          cls: "title titleFont"
        }, {
          type: "label",
          id: "author",
          cls: "nameFont",
          text: "Author"
        }, {
          type: "label",
          id: "description",
          cls: "video-description"
        }, {
          id: "bylineWrap",
          cls: "bylineWrap"
        }]
      }]
    }]
  }]
}, app.views.quark.video.player.VimeoPlayer = Jux.extend(app.views.quark.video.player.Player, {
  player: null,
  played: !1,
  _isPlaying: !1,
  createIFrame: function () {
    var e = "vimeo_gen_playerId_" + Jux.newId(),
      t = window.location.protocol + "//player.vimeo.com/video/" + this.id + "?byline=0&title=0&color=5b5b5b&portrait=0&api=1&player_id=" + e;
    return this.$iframe = jQuery('<iframe id="' + e + '" src="' + t + '" frameborder="0" width="100%" height="100%" webkitAllowFullScreen allowfullscreen></iframe>'), this.$iframe
  },
  getIFrame: function () {
    return this.$iframe || null
  },
  createInternalPlayer: function () {
    var e = this.player = new Froogaloop(this.$iframe[0]),
      t, n = function () {
        try {
          e.addEvent("play", this.onVideoPlay.createDelegate(this)), e.addEvent("pause", this.onVideoPause.createDelegate(this)), e.addEvent("finish", this.onVideoEnd.createDelegate(this))
        } catch (n) {}
        t && clearTimeout(t), this.fireEvent("ready", this)
      }.createDelegate(this);
    e.addEvent("ready", n), t = setTimeout(n, 7e3)
  },
  play: function () {
    if (this.player) try {
      this.player.api("play"), this._isPlaying = !0
    } catch (e) {
      this._isPlaying = !1
    }
  },
  pause: function () {
    if (this.player) try {
      this.player.api("pause"), this._isPlaying = !1
    } catch (e) {}
  },
  onVideoPlay: function () {
    this.played = !0, this._isPlaying = !0, this.fireEvent("play", this)
  },
  onVideoPause: function () {
    this._isPlaying = !1, this.fireEvent("pause", this)
  },
  onVideoEnd: function () {
    this._isPlaying = !1, this.fireEvent("end", this)
  },
  hasPlayed: function () {
    return this.played
  },
  remove: function () {
    this.$iframe && (this.$iframe.remove(), this.$iframe = null), this.player = null
  }
}), Jux.apply(app.views.quark.video.player.VimeoPlayer, {
  parseVideoId: function (e) {
    var t = /vimeo\.com\/((video\/)|(moogaloop.swf\?clip_id=)|(couchmode.*\/))?([^\?#&"'>]+)/,
      n = t.exec(e);
    return n !== null ? n[5] : ""
  }
}), app.views.quark.video.player.YoutubePlayer = Jux.extend(app.views.quark.video.player.Player, {
  deferredCreate: !1,
  player: null,
  played: !1,
  _isPlaying: !1,
  constructor: function (e) {
    var t = app.views.quark.video.player.YoutubePlayer;
    this._super(arguments), t.instances.push(this), t.youtubeApiRequested || t.requestApi()
  },
  createIFrame: function () {
    return this.$iframe = jQuery('<iframe src="" frameborder="0" height="100%" width="100%"></iframe>'), this.$iframe
  },
  getIFrame: function () {
    return this.$iframe
  },
  onYoutubeApiReady: function () {
    this.deferredCreate && (this.createInternalPlayer(), this.deferredCreate = !1)
  },
  createInternalPlayer: function () {
    if (!app.views.quark.video.player.YoutubePlayer.youtubeApiLoaded) this.deferredCreate = !0;
    else {
      var e = Jux.util.uri.getWindowOrigin(),
        t = (Jux.isIE ? "wmode=opaque" : "wmode=direct") + "&controls=1&autohide=1&hd=1&color=white&rel=0&showinfo=0&enablejsapi=1&origin=" + e;
      this.$iframe.attr("src", window.location.protocol + "//www.youtube.com/embed/" + this.id + "?" + t), this.player = new YT.Player(this.$iframe[0], {
        events: {
          onStateChange: this.onVidStateChange.createDelegate(this)
        }
      }), this.onVideoReady()
    }
  },
  onVidStateChange: function (e) {
    var t = e.data;
    switch (t) {
    case -1:
      this.onVideoReady();
      break;
    case YT.PlayerState.PLAYING:
      this.onVideoPlay();
      break;
    case YT.PlayerState.PAUSED:
      this.onVideoPause();
      break;
    case YT.PlayerState.ENDED:
      this.onVideoEnd()
    }
  },
  play: function () {
    if (this.player && typeof this.player.playVideo == "function") try {
      this.player.playVideo(), this._isPlaying = !0
    } catch (e) {
      this._isPlaying = !1
    }
  },
  pause: function () {
    if (this.player && typeof this.player.pauseVideo == "function") try {
      this.player.pauseVideo(), this._isPlaying = !1
    } catch (e) {}
  },
  onVideoReady: function () {
    this.fireEvent("ready", this)
  },
  onVideoPlay: function () {
    this.played = !0, this._isPlaying = !0, this.fireEvent("play", this)
  },
  onVideoPause: function () {
    this._isPlaying = !1, this.fireEvent("pause", this)
  },
  onVideoEnd: function () {
    this.paused = !1, this._isPlaying = !1, this.fireEvent("end", this)
  },
  hasPlayed: function () {
    return this.played
  },
  remove: function () {
    if (this.player) {
      if (typeof this.player.stopVideo == "function") try {
        this.player.stopVideo()
      } catch (e) {}
      if (typeof this.player.clearVideo == "function") try {
        this.player.clearVideo()
      } catch (t) {}
      this.player = null, this.$iframe.remove(), this.$iframe = null
    }
    this.deferredCreate = !1
  }
}), Jux.apply(app.views.quark.video.player.YoutubePlayer, {
  instances: [],
  youtubeApiRequested: !1,
  youtubeApiLoaded: !1,
  requestApi: function () {
    var e = app.views.quark.video.player.YoutubePlayer;
    e.youtubeApiRequested || (e.youtubeApiRequested = !0, window.onYouTubePlayerAPIReady = function () {
      e.youtubeApiLoaded = !0, e.onYoutubeApiReady(), window.onYouTubePlayerAPIReady = null
    }, jQuery('<script src="//www.youtube.com/player_api"></script>').appendTo("body"))
  },
  onYoutubeApiReady: function () {
    var e = app.views.quark.video.player.YoutubePlayer.instances;
    for (var t = 0, n = e.length; t < n; t++) e[t].onYoutubeApiReady()
  },
  parseVideoId: function (e) {
    var t = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?#&"'>]+)/,
      n = t.exec(e);
    return n !== null ? n[5] : ""
  }
}), app.views.quark.video.Transition = Class.extend(Object, {
  delay: 0,
  speed: 500,
  beforeAnimate: function (e) {
    e()
  },
  afterAnimate: Jux.emptyFn,
  toggleClassFromTo: ["", ""],
  parallelAnimation: Jux.emptyFn,
  easing: "",
  beforeBackgroundFade: Jux.emptyFn,
  useRegularAnimateTo: !0,
  constructor: function (e) {
    if (!e.animateTo) throw "AnimateTo required for for transition";
    this.animateTo = e.animateTo, this.animateToNoText = e.animateToNoText, typeof e.delay == "number" && (this.delay = e.delay), typeof e.speed != "undefined" && (this.speed = e.speed), typeof e.beforeAnimate == "function" && (this.beforeAnimate = e.beforeAnimate), typeof e.afterAnimate == "function" && (this.afterAnimate = e.afterAnimate), typeof e.toggleClassFromTo != "undefined" && (this.toggleClassFromTo = e.toggleClassFromTo), typeof e.parallelAnimation == "function" && (this.parallelAnimation = e.parallelAnimation), typeof e.easing == "string" && (this.easing = e.easing), typeof e.beforeBackgroundFade == "function" && (this.beforeBackgroundFade = e.beforeBackgroundFade)
  },
  setUseRegularAnimateTo: function (e) {
    if (typeof e != "boolean") throw "arg must be a boolean";
    this.useRegularAnimateTo = e
  },
  getAnimateTo: function () {
    return this.useRegularAnimateTo ? this.animateTo : this.animateToNoText
  },
  getSpeed: function () {
    return this.speed
  },
  getDelay: function () {
    return this.delay
  },
  getBeforeAnimate: function () {
    return this.beforeAnimate
  },
  getAfterAnimate: function () {
    return this.afterAnimate
  },
  getToggleClassFromTo: function () {
    return this.toggleClassFromTo
  },
  getParallelAnimation: function () {
    return this.parallelAnimation
  },
  getEasing: function () {
    return this.easing
  },
  getToState: function () {
    return this.toState
  },
  getBeforeBackgroundFadeAnimation: function () {
    return this.beforeBackgroundFade
  },
  adjustBackground: function (e, t) {
    typeof e != "function" && (t = e, e = Jux.emptyFn), t ? (this.$galleryItemTakeover || (this.$galleryItemTakeover = $(".view-frame-scroller")), this.$galleryItemTakeover.stop().animate({
      "background-color": this.destinationBackgroundColor
    }, this.changeBackgroundColorSpeed, e)) : e()
  }
}), app.views.quark.video.Transition.Closed = Class.extend(app.views.quark
  .video.Transition, {
    toState: "closed",
    toggleClassFromTo: ["open", "closed"],
    destinationBackgroundColor: "#101010",
    changeBackgroundColorSpeed: 5e3
  }), app.views.quark.video.Transition.Open = Class.extend(app.views.quark.video.Transition, {
  toState: "open",
  toggleClassFromTo: ["closed", "open"],
  destinationBackgroundColor: "#2E2D2D",
  changeBackgroundColorSpeed: 1500
}), app.views.quark.video.paletteManifest = {
  items: {
    layout: "Accordion",
    id: "mainAccordion",
    height: 375,
    items: [{
      title: "Pick a Video",
      items: [{
        type: "Section",
        layout: "Columns",
        items: [{
          columnWidth: "24%",
          type: "Label",
          text: "Video link (YouTube or Vimeo)"
        }, {
          columnWidth: "74%",
          type: "Text",
          key: "youtube_link",
          emptyText: "http://vimeo.com/63745419",
          selectOnFocus: !0,
          autoGrow: !0
        }]
      }, {
        type: "Section",
        layout: "Columns",
        items: [{
          columnWidth: "24%",
          type: "Label",
          text: "Title"
        }, {
          columnWidth: "74%",
          type: "Text",
          key: "title",
          emptyText: "Jonah and The City",
          autoGrow: !0,
          restoreEmptyText: !1
        }, {
          columnWidth: "24%",
          type: "Label",
          text: "Description"
        }, {
          columnWidth: "74%",
          type: "textArea",
          key: "description",
          emptyText: "Dear Jonah,\n\nThis was our first trip to NYC together. You had been once, with your mom, a few years ago, but it was a first for us. We had no real plans or schedule, we just hopped on a train in South Norwalk and got off in Manhattan. Clearly you had never seen Grand Central Station. You took it all in slowly and were relieved to see that many other people were doing the same thing. There was a lot to look at but that was only the beginning. \n\nOn the street I could tell you wanted to stop and see it all. Your only other visit was over two years ago so while I'm sure you remembered bits and pieces, it was probably all new and exciting. The City looks, smells, and feels a lot different than our life upstate.\n\nWe didn't have enough time, of course, and we both tired of the scene by 3pm and caught the last off-peak train back to Connecticut. It was a fun day and you had nothing but good things to say about our adventure. Me too, but then again, the second we got home I puked my brains out.\n\nLove,\nDad\n\n * * *\nMusic is \"New Theory\" by Washed Out",
          autoGrow: !0,
          restoreEmptyText: !1
        }]
      }]
    }, {
      title: "Stylize",
      id: "styleIt",
      items: [{
        type: "Section",
        items: [{
          items: [{
            type: "FontCustomizer",
            label: "Title",
            key: "title_font",
            minSize: 18,
            maxSize: 100
          }, {
            type: "FontCustomizer",
            label: "Description",
            key: "description_font",
            minSize: 11,
            maxSize: 32,
            fontFaceOptions: [{
              text: "Muli",
              value: "Muli",
              style: {
                "font-family": "Muli"
              }
            }, {
              text: "Helvetica",
              value: "HelveticaNeueLt",
              style: {
                "font-family": "HelveticaNeueLt"
              }
            }, {
              text: "Din",
              value: "dinLtCnd",
              style: {
                "font-family": "dinLtCnd"
              }
            }, {
              text: "Francois",
              value: "Francois One",
              style: {
                "font-family": "Francois One"
              }
            }, {
              text: "Sansation",
              value: "sansation",
              style: {
                "font-family": "sansation"
              }
            }, {
              text: "Baskerville",
              value: "baskervilleITC",
              style: {
                "font-family": "baskervilleITC"
              }
            }, {
              text: "Kameron",
              value: "Kameron",
              style: {
                "font-family": "Kameron"
              }
            }, {
              text: "Courier",
              value: "Courier",
              style: {
                "font-family": "Courier"
              }
            }, {
              text: "Anonymous",
              value: "Anonymous Pro",
              style: {
                "font-family": "Anonymous Pro"
              }
            }, {
              text: "Aurore",
              value: "La Belle Aurore",
              style: {
                "font-family": "La Belle Aurore"
              }
            }]
          }]
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "45%",
          type: "Label",
          text: "Background color"
        }, {
          columnWidth: "55%",
          type: "ColorSetCustomizer",
          key: "color_scheme",
          colors: [{
            name: "background_color"
          }]
        }]
      }, {
        type: "Section",
        layout: "Columns",
        items: [{
          columnWidth: "45%",
          type: "Label",
          text: "Background photo (when video smaller than window)"
        }, {
          columnWidth: "55%",
          type: "PictureSelectorVideo",
          cls: "backgroundImage-pictureSelector",
          key: "background_picture",
          height: 75,
          width: 75
        }]
      }]
    }, {
      title: "Set Options",
      items: [{
          type: "Section",
          id: "galleryDropdownSection",
          items: [{
            type: "dropdown",
            id: "galleryDropdown",
            label: "In Jux",
            labelPosition: "top",
            style: {
              margin: "0 8px 0 0",
              "padding-top": "2px"
            },
            options: []
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "DateTime",
            key: "sort_time",
            label: "Schedule post or date in the past",
            labelPosition: "top"
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_posted_time",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "21px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        },
        app.views.quark.PaletteShared.customizeBylineSection, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Video Credit",
            style: {
              "padding-top": "7px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "show_asset_creator",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: !0
            }, {
              text: "Hide",
              value: !1
            }]
          }]
        }, {
          type: "Section",
          layout: "columns",
          items: [{
            columnWidth: "66%",
            type: "Label",
            text: "Proudly display the Jux badge",
            style: {
              "padding-top": "7px"
            }
          }, {
            columnWidth: "34%",
            type: "ButtonSet",
            key: "badge",
            style: {
              margin: "0 0 0 8px",
              "padding-top": "2px"
            },
            options: [{
              text: "Show",
              value: "hype"
            }, {
              text: "Hide",
              value: ""
            }]
          }]
        }
      ]
    }]
  }
}, app.views.quark.creationSubchild.components.CreationComponent = ui.Container.extend({
  baseComponentClass: "creation-component",
  enteredViewAnimationDuration: 0,
  exitingViewAnimationDuration: 0,
  exitingViewAnimCfg: null,
  enteredViewAnimCfg: null,
  preventAnimations: !0,
  preventEnteredViewAnimation: !1,
  preventExitViewAnimation: !1,
  initComponent: function () {
    this.model = this.getParentContainerModel(!0), this.model.on("paging_slideshow:scrolling_to_another_slide", this.stopAnimation, this), this.model.on("paging_slideshow:out_of_view", this.resetStyles, this), this.addCls(this.baseComponentClass), this.addCls(this.componentCls), this.setupItems(), this.afterSetupItems(), this._super(arguments)
  },
  afterRender: function () {
    this.initialStyle = this.getStyleState(this.getAnimateEl())
  },
  hasExitViewAnimation: function () {
    return !!this.exitingViewAnimCfg && this.exitingViewAnimationDuration && !this.preventAnimations && !this.preventExitViewAnimation
  },
  hasEnteredViewAnimation: function () {
    return !!this.enteredViewAnimCfg && this.enteredViewAnimationDuration && !this.preventAnimations && !this.preventEnteredViewAnimation
  },
  hasAnyAnimation: function () {
    return this.hasExitViewAnimation() || this.hasEnteredViewAnimation()
  },
  setupItems: Jux.emptyFn,
  afterSetupItems: Jux.emptyFn,
  getStyleState: function (e) {
    return e ? e.attr("style") : ""
  },
  getAnimateEl: function () {
    return this.$el
  },
  getExitViewAnimation: function () {
    return this.exitingViewPromise = this.createAnimationPromise(this.getAnimateEl(), this.exitingViewAnimCfg, this.exitingViewAnimationDuration), this.exitingViewPromise
  },
  getEnteredViewAimation: function () {
    return this.enteredViewPromise = this.createAnimationPromise(this.getAnimateEl(), this.enteredViewAnimCfg, this.enteredViewAnimationDuration), this.enteredViewPromise
  },
  stopAnimation: function () {
    this.getAnimateEl().stop()
  },
  killDeferreds: function () {},
  onComponentOutOfView: function () {
    this.resetStyles(), this.killDeferreds()
  },
  resetStyles: function () {
    this.isRendered() && this.hasAnyAnimation() && this.getAnimateEl().stop().attr("style", this.initialStyle || "")
  },
  createAnimationPromise: function (e, t, n) {
    return $.when($(e).animate(t, n))
  },
  onDestroy: function () {
    this._super(arguments), this.killDeferreds()
  }
}), app.views.quark.creationSubchild.components.TextContainer = app.views.quark.creationSubchild.components.CreationComponent.extend({
  modelTextProperty: "",
  textContainerCls: "",
  initComponent: function () {
    this._super(arguments), this.textArea = this.findById("text")
  },
  setupItems: function () {
    this.items = [{
      id: "text",
      cls: this.textContainerCls,
      type: "label"
    }]
  },
  afterRender: function () {
    this._super(arguments), this.textArea.render(this.getEl()), this.model.on("change:" + this.modelTextProperty, this.updateTextContainer, this), this.updateTextContainer()
  },
  updateTextContainer: function () {
    var e = this.model.get(this.modelTextProperty);
    this.textArea.setText(e), $.trim(e) ? this.removeCls("text-empty") : this.addCls("text-empty")
  },
  onDestroy: function () {
    this.model.un("change:" + this.modelTextProperty, this.updateTextContainer, this), this._super(arguments)
  }
}), ui.ComponentManager.registerType("creation-TextContainer", app.views.quark.creationSubchild.components.TextContainer), app.views.quark.creationSubchild.components.PulleyedTextContainer = app.views.quark.creationSubchild.components.TextContainer.extend({
  enablePulley: !1,
  afterRender: function () {
    this._super(arguments), this.enablePulley && this.textArea.on("render", this.setupPulleyPlugin, this)
  },
  setupPulleyPlugin: function () {
    var e = this.getEl();
    e.pulley({
      $overflowingElements: this.textArea.getEl()
    })
  }
}), app.views.quark.creationSubchild.components.BillboardContainer = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "billboard-container",
  setupItems: function () {
    this.items = [{
      cls: "billboard-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }, {
        type: "creation-DescriptionContainer"
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-BillboardContainer", app.views.quark.creationSubchild.components.BillboardContainer), app.views.quark.creationSubchild.components.CircleBubbleContainer = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "circle-bubble-container",
  setupItems: function () {
    this.items = [{
      cls: "circle-bubble-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }, {
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-CircleBubbleContainer", app.views.quark.creationSubchild.components.CircleBubbleContainer), app.views.quark.creationSubchild.components.DescriptionContainer = app.views.quark.creationSubchild.components.PulleyedTextContainer.extend({
  componentCls: "description-container dehorse",
  textContainerCls: "creation-description text-font",
  modelTextProperty: "text"
}), ui.ComponentManager.registerType("creation-DescriptionContainer", app.views.quark.creationSubchild.components.DescriptionContainer), app.views.quark.creationSubchild.components.HeaderBlockquote = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "header-blockquote content-bg",
  enteredViewAnimationDuration: 1e3,
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    color: "yellow"
  },
  enteredViewAnimCfg: {
    color: "red"
  },
  setupItems: function () {
    this.items = [{
      cls: "header-blockquote-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }, {
        id: "bylineWrap",
        cls: "creationContent-author"
      }, {
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-HeaderBlockquote", app.views.quark.creationSubchild.components.HeaderBlockquote), app.views.quark.creationSubchild.components.HeaderBubbleCenter = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "header-bubble-center",
  setupItems: function () {
    this.items = [{
      cls: "header-bubble-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }, {
        id: "bylineWrap",
        cls: "creationContent-author"
      }, {
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-HeaderBubbleCenter", app.views.quark.creationSubchild.components.HeaderBubbleCenter), app.views.quark.creationSubchild.components.HeaderCenterAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "header-centeralign content-bg",
  enteredViewAnimationDuration: 1e3,
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    color: "yellow"
  },
  enteredViewAnimCfg: {
    color: "red"
  },
  setupItems: function () {
    this.items = [{
      cls: "header-centeralign-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }, {
        id: "bylineWrap",
        cls: "creationContent-author"
      }, {
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-HeaderCenterAlign", app.views.quark.creationSubchild.components.HeaderCenterAlign), app.views.quark.creationSubchild.components.HeaderLeftAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "header-leftalign content-bg",
  enteredViewAnimationDuration: 1e3,
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    color: "yellow"
  },
  enteredViewAnimCfg: {
    color: "red"
  },
  setupItems: function () {
    this.items = [{
      cls: "header-leftalign-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }, {
        id: "bylineWrap",
        cls: "creationContent-author"
      }, {
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-HeaderLeftAlign", app.views.quark.creationSubchild.components.HeaderLeftAlign), app.views.quark.creationSubchild.components.HeaderOverlayBlockquote = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "header-overlay-blockquote",
  enteredViewAnimationDuration: 1e3,
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    color: "yellow"
  },
  enteredViewAnimCfg: {
    color: "red"
  },
  setupItems: function () {
    this.items = [{
      cls: "header-overlay-blockquote-contents",
      items: [{
        layout: "creation-vertically-centered",
        items: [{
          items: [{
            type: "creation-TitleContainer"
          }, {
            type: "creation-SubtitleContainer"
          }, {
            id: "bylineWrap",
            cls: "creationContent-author"
          }, {
            type: "creation-DescriptionContainer",
            enablePulley: !0
          }]
        }]
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-HeaderOverlayBlockquote", app.views.quark.creationSubchild.components.HeaderOverlayBlockquote), app.views.quark.creationSubchild.components.HeaderStripedCenterAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "header-striped-centeralign content-bg",
  enteredViewAnimationDuration: 1e3,
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    color: "yellow"
  },
  enteredViewAnimCfg: {
    color: "red"
  },
  setupItems: function () {
    this.items = [{
      cls: "header-striped-centeralign-contents",
      items: [{
        cls: "top",
        items: [{
          type: "creation-TitleContainer"
        }, {
          type: "creation-SubtitleContainer",
          cls: "dehorse"
        }, {
          id: "bylineWrap",
          cls: "creationContent-author dehorse"
        }]
      }, {
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-HeaderStripedCenterAlign", app.views.quark.creationSubchild.components.HeaderStripedCenterAlign), app.views.quark.creationSubchild.components.PictureContainer = app.views.quark.creationSubchild.components.CreationComponent.extend({
  setupItems: function () {
    this.items = [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-PictureContainer", app.views.quark.creationSubchild.components.TextContainer), app.views.quark.creationSubchild.components.PulleyedBillboardContainer = app.views.quark.creationSubchild.components.BillboardContainer.extend({
  setupItems: function () {
    this.items = [{
      type: "creation-TitleContainer"
    }, {
      type: "creation-SubtitleContainer"
    }, {
      type: "creation-DescriptionContainer",
      enablePulley: !0
    }]
  }
}), ui.ComponentManager.registerType("creation-PulleyedBillboardContainer", app.views.quark.creationSubchild.components.PulleyedBillboardContainer), app.views.quark.creationSubchild.components.StackingContext = app.views.quark.creationSubchild.components.CreationComponent.extend({
  initComponent: function () {
    this._super(arguments), this.addCls("creation-StackingContext")
  }
}), ui.ComponentManager.registerType("creation-StackingContext", app.views.quark.creationSubchild.components.StackingContext), app.views.quark.creationSubchild.components.StripedContainerLeftAlign = app.views.quark.creationSubchild.components.BillboardContainer.extend({
  componentCls: "striped-container-left-align",
  setupItems: function () {
    this.items = [{
      cls: "striped-contents",
      items: [{
        cls: "top-stripe",
        items: [{
          type: "creation-TitleContainer"
        }, {
          type: "creation-SubtitleContainer"
        }]
      }, {
        cls: "bottom-stripe",
        items: [{
          type: "creation-DescriptionContainer",
          enablePulley: !0
        }]
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-StripedContainerLeftAlign", app.views.quark.creationSubchild.components.StripedContainer), app.views.quark.creationSubchild.components.SubtitleContainer = app.views.quark.creationSubchild.components.PulleyedTextContainer.extend({
  componentCls: "subtitle-container",
  modelTextProperty: "subtitle",
  textContainerCls: "creation-subtitle subtitle-font"
}), ui.ComponentManager.registerType("creation-SubtitleContainer", app.views.quark.creationSubchild.components.SubtitleContainer), app.views.quark.creationSubchild.components.TextCenterAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-centeralign content-bg",
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    opacity: .5
  },
  setupItems: function () {
    this.items = [{
      cls: "text-centeralign-contents animate-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextCenterAlign", app.views.quark.creationSubchild.components.TextCenterAlign), app.views.quark.creationSubchild.components.TextCenterAlignBlockquote = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-centeralign-blockquote content-bg",
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    opacity: .5
  },
  setupItems: function () {
    this.items = [{
      cls: "text-centeralign-blockquote-contents animate-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextCenterAlignBlockquote", app.views.quark.creationSubchild.components.TextCenterAlignBlockquote), app.views.quark.creationSubchild.components.TextLeftAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-leftalign content-bg",
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    opacity: .5
  },
  setupItems: function () {
    this.items = [{
      cls: "text-leftalign-contents animate-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextLeftAlign", app.views.quark.creationSubchild.components.TextLeftAlign), app.views.quark.creationSubchild.components.TextMatteCenterAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-matte-centeralign",
  setupItems: function () {
    this.items = [{
      cls: "text-matte-centeralign-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextMatteCenterAlign", app.views.quark.creationSubchild.components.TextMatteCenterAlign), app.views.quark.creationSubchild.components.TextMatteLeftAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-matte-leftalign",
  setupItems: function () {
    this.items = [{
      cls: "text-matte-leftalign-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextMatteLeftAlign", app.views.quark.creationSubchild.components.TextMatteLeftAlign), app.views.quark.creationSubchild.components.TextOverlayBlockquote = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-overlay-blockquote",
  setupItems: function () {
    this.items = [{
      cls: "text-overlay-blockquote-contents",
      items: [{
        layout: "creation-vertically-centered",
        items: [{
          cls: "animate-contents",
          type: "creation-DescriptionContainer",
          enablePulley: !0
        }]
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextOverlayBlockquote", app.views.quark.creationSubchild.components.TextOverlayBlockquote), app.views.quark.creationSubchild.components.TextOverlayPanelBlockquote = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-overlay-panel-blockquote",
  setupItems: function () {
    this.items = [{
      cls: "text-overlay-panel-blockquote-contents",
      items: [{
        layout: "creation-vertically-centered",
        items: [{
          cls: "animate-contents",
          type: "creation-DescriptionContainer",
          enablePulley: !0
        }]
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextOverlayPanelBlockquote", app.views.quark.creationSubchild.components.TextOverlayPanelBlockquote), app.views.quark.creationSubchild.components.TextPanelCenterAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-panel-centeralign",
  setupItems: function () {
    this.items = [{
      cls: "text-panel-centeralign-contents content-bg animate-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextPanelCenterAlign", app.views.quark.creationSubchild.components.TextPanelCenterAlign), app.views.quark.creationSubchild.components.TextPanelLeftAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-panel-leftalign content-bg animate-contents",
  setupItems: function () {
    this.items = [{
      cls: "text-panel-leftalign-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextPanelLeftAlign", app.views.quark.creationSubchild.components.TextPanelLeftAlign), app.views.quark.creationSubchild.components.TextStripedCenterAlign = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "text-striped-centeralign content-bg",
  exitingViewAnimationDuration: 1e3,
  exitingViewAnimCfg: {
    opacity: .5
  },
  setupItems: function () {
    this.items = [{
      cls: "text-striped-centeralign-contents animate-contents",
      items: [{
        type: "creation-DescriptionContainer",
        enablePulley: !0
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TextStripedCenterAlign", app.views.quark.creationSubchild.components.TextStripedCenterAlign), app.views.quark.creationSubchild.components.TitleAndSubTitleContainer = app.views.quark.creationSubchild.components.CreationComponent.extend({
  componentCls: "title-and-subtitle-container",
  setupItems: function () {
    this.items = [{
      cls: "title-and-subtitle-contents",
      items: [{
        type: "creation-TitleContainer"
      }, {
        type: "creation-SubtitleContainer"
      }]
    }]
  }
}), ui.ComponentManager.registerType("creation-TitleAndSubTitleContainer", app.views.quark.creationSubchild.components.TitleAndSubTitleContainer), app.views.quark.creationSubchild.components.TitleContainer = app.views.quark.creationSubchild.components.PulleyedTextContainer.extend({
  componentCls: "title-container",
  modelTextProperty: "title",
  textContainerCls: "creation-title title-font"
}), ui.ComponentManager.registerType("creation-TitleContainer", app.views.quark.creationSubchild.components.TitleContainer), app.views.quark.creationSubchild.components.componentLayouts.CreationComponentLayout = Class.extend(ui.layout.Layout, {
  baseLayoutCls: "creation-layout",
  initLayout: function () {
    this._super(arguments), this.setupContainer()
  },
  setupContainer: function () {
    this.container.addCls(this.baseLayoutCls + " " + this.layoutClass)
  },
  onLayout: function (e, t) {
    this._super(arguments);
    var n = this.container.getEl();
    for (var r = 0, i = e.length; r < i; r++) this.renderComponent(e[r], n, {
      position: r
    })
  }
}), app.views.quark.creationSubchild.components.componentLayouts.FullScreen = app.views.quark.creationSubchild.components.componentLayouts.CreationComponentLayout.extend({
  layoutClass: "full-screen-container"
}), ui.Container.registerLayout("creation-fullscreen", app.views.quark.creationSubchild.components.componentLayouts.FullScreen), app.views.quark.creationSubchild.components.componentLayouts.VerticallyCentered = app.views.quark.creationSubchild.components.componentLayouts.CreationComponentLayout.extend({
  layoutClass: "vertical-center-container",
  centeredClass: "vertical-center-child",
  onLayout: function (e, t) {
    this._super(arguments), _.each(e, this.centerVertically.createDelegate(this))
  },
  centerVertically: function (e) {
    e.addCls(this.centeredClass)
  }
}), ui.Container.registerLayout("creation-vertically-centered", app.views.quark.creationSubchild.components.componentLayouts.VerticallyCentered), app.views.quark.creation.Creation = app.views.quark.AbstractSlideshow.extend({
  abstractClass: !0,
  spinnerEnabled: !0,
  slideCollectionPropertyName: "quarks",
  firstQuarkCls: "creation-first",
  interiorQuarkCls: "creation-interior",
  initComponent: function () {
    this._super(arguments), this.model.on({
      "change:style_id": this.onStyleSwitch,
      "change:style_filter_enabled": this.onStyleSwitch,
      "change:activeItemId": this.onActiveItemChange,
      scope: this
    }), this.setMoodAndGenreCls()
  },
  onStyleSwitch: function () {
    this.setMoodAndGenreCls()
  },
  setMoodAndGenreCls: function () {
    this.removeCls(this.currentMoodCls), this.removeCls(this.currentGenreCls), this.currentMoodCls = "mood-" + this.model.get("mood"), this.currentGenreCls = "genre-" + this.model.get("genre"), this.addCls(this.currentGenreCls), this.addCls(this.currentMoodCls)
  },
  preprocessSubquarkView: function (e, t) {
    return t === 0 && e.on("backgroundPictureLoaded", this.onLoad, this), e
  },
  onActiveItemChange: Jux.emptyFn,
  getSubChildViews: function () {
    return this.childComponents.length ? this.getItemAt(0).getItems() : []
  },
  createSubQuarkView: function (e, t) {
    var n = this.model,
      r = app.views.quark.Quark,
      i = r.fromModel(e, this.currentUser, n);
    return i.addCls(this.getClassForIndex(t)), this.preprocessSubquarkView(i, t), i
  },
  getClassForIndex: function (e) {
    return e === 0 ? this.firstQuarkCls : this.interiorQuarkCls
  },
  onActivate: function () {
    this._super(arguments), _.each(this.getSubChildViews(), function (e) {
      e.activate()
    }), this.doLayout()
  },
  onDeactivate: function () {
    _.each(this.getSubChildViews(), function (e) {
      e.deactivate()
    }), this._super(arguments)
  }
}), app.views.quark.creation.DesktopCreation = Jux.extend(app.views.quark.creation.Creation, {
  afterSlideshowSetup: Jux.emptyFn,
  createSlideshow: function () {
    return new app.components.slideshow.HorizontalPagingSlideshow({
      model: this.model
    })
  },
  onStyleSwitch: function () {
    this._super(arguments), this.showSpinner()
  },
  onActivate: function () {
    this._super(arguments);
    var e = this.getActiveQuarkView();
    e && e.getImageIsLoading() ? this.showSpinner() : this.hideSpinner()
  },
  createGeneralSlide: function (e, t) {
    return this.createSubQuarkView(e, t)
  },
  onActiveItemChange: function () {
    var e = this.getActiveQuarkView();
    e && e.getImageIsLoading() ? this.showSpinner() : this.hideSpinner()
  },
  getActiveItemId: function () {
    var e = this.model.get("activeItemId");
    return e === "" && (e = this.model.get("quarks").getFirst().getId()), e
  },
  getActiveQuarkModel: function () {
    return this.model.get("quarks").getById(this.getActiveItemId())
  },
  getQuarkViewByModelId: function (e) {
    if (!e) return null;
    var t = this.getSubChildViews(),
      n = t.length,
      r;
    for (r = 0; r < n; r++)
      if (t[r].getModel().getId() === e) return t[r];
    return null
  },
  getActiveQuarkView: function () {
    var e = this.getActiveQuarkModel();
    return e ? this.getQuarkViewByModelId(e.getId()) : null
  },
  onSubQuarkLoaded: function (e, t) {
    e === this.getActiveQuarkView() && this.isActive() && this.hideSpinner()
  },
  onSubQuarkLoading: function (e, t) {
    e === this.getActiveQuarkView() && this.isLoaded() && this.isActive() && this.showSpinner()
  },
  showSpinner: function () {
    this.fireEvent("showSpinner")
  },
  hideSpinner: function () {
    this.fireEvent("hideSpinner")
  },
  preprocessSubquarkView: function (e, t) {
    e.on({
      backgroundPictureLoading: this.onSubQuarkLoading,
      backgroundPictureLoaded: this.onSubQuarkLoaded,
      scope: this
    }), this._super(arguments)
  }
}), app.views.quark.creation.HandheldCreation = Jux.extend(app.views.quark.creation.Creation, {
  createGeneralSlide: function (e, t) {
    return this.createSubQuarkView(e, t)
  },
  createSlideshow: function () {
    return new app.components.slideshow.Slideshow({
      layout: "iphonemultiquarklayout"
    })
  }
}), app.views.quark.creation.HorizontalScrollLayout = Class.extend(ui.layout.Layout, {
  quarkIsActive: !1,
  onLayout: function (e, t) {
    this._super(arguments), this.createScrollElement(t), this.$destinationEl = this.$destinationEl || this.$scrollEl.find(".scrollableArea");
    for (var n = 0, r = e.length; n < r; n++) this.renderComponent(e[n], this.$destinationEl, {
      position: n
    });
    this.setupHoverScroller(e.length)
  },
  setupHoverScroller: function (e) {
    if (this.hoverScroller) {
      this.hoverScroller.updateHoverScroller();
      return
    }
    e > 1 && (this.hoverScroller = new ui.utils.SmoothDivScroll({
      $el: this.$scrollEl,
      options: {
        mousewheelScrolling: !1,
        scrollElementPosition: "left",
        hotSpotScrolling: !1,
        scrollToAnimationDuration: 800,
        scrollToEasingFunction: "easeInOutCubic"
      }
    }), this.hoverScroller.on({
      movedToElement: this.onMovedToElement,
      scrollingToElement: this.onScrollingToElement,
      scope: this
    }), this.relayEvents(this.hoverScroller, ["movedToElement", "scrollingToElement"]), this.setHoverScrollerVisibility(this.quarkIsActive))
  },
  createScrollElement: function (e) {
    if (this.$scrollEl) return;
    var t = ['<div data-elem="creation-horizontalScrollLayout" style="width: 100%; height: 100%">', '<div class="scrollWrapper"><div class="scrollableArea"></div></div>', "</div>"];
    this.$scrollEl = jQuery(t.join("")).appendTo(e)
  },
  onScrollingToElement: Jux.emptyFn,
  onMovedToElement: Jux.emptyFn,
  scrollToElement: function (e) {
    this.hoverScroller && this.hoverScroller.scrollToElement(e)
  },
  jumpToElement: function (e) {
    this.hoverScroller && this.hoverScroller._jumpToElement(e)
  },
  onDestroy: function () {
    this.hoverScroller && (this.hoverScroller.destroy(), this.$scrollEl.remove(), delete this.$scrollEl, this.hoverScroller = null), this._super(arguments)
  },
  onActivate: function () {
    this.quarkIsActive = !0, this.setHoverScrollerVisibility(!0)
  },
  setHoverScrollerVisibility: function (e) {
    this.hoverScroller && this.hoverScroller.setIsVisible(e)
  },
  updateScroller: function () {
    this.hoverScroller && this.hoverScroller.updateHoverScroller()
  },
  onDeactivate: function () {
    this.quarkIsActive = !1, this.setHoverScrollerVisibility(!1)
  }
}), ui.Container.registerLayout("horizontalscroll", app.views.quark.creation.HorizontalScrollLayout), app.views.quark.creation.TabletCreation = Jux.extend(app.views.quark.creation.Creation, {
  createSlideshow: function () {
    return new app.components.slideshow.CreationTabletSlideshow
  },
  createGeneralSlide: function (e, t) {
    var n = this.createSubQuarkView(e, t);
    return new app.components.slideshow.slide.Slide({
      cls: "generalSlide",
      items: [n]
    })
  }
}), app.views.quark.creation.paletteManifest = {
  id: "mainAccordion",
  layout: "Accordion",
  height: 430,
  items: [{
    title: "Express Yourself",
    layout: "vbox",
    items: [{
      type: "carousel_article",
      id: "carousel"
    }, {
      flex: 1,
      id: "quarkEditContainer",
      cls: "itemEditor",
      layout: "cards",
      items: []
    }]
  }, {
    title: "Style",
    id: "genreMoodSelector",
    type: "GenreMoodSelector",
    moods_by_genre: {
      Photo: ["Dawn", "Day", "Afternoon", "Dusk", "Night"],
      Article: ["Dawn", "Day", "Afternoon", "Dusk", "Night"],
      Blockquote: ["Dawn", "Day", "Afternoon", "Dusk", "Night"],
      Bubble: ["Dawn", "Day", "Afternoon", "Dusk", "Night"],
      Daydream: ["Dawn", "Day", "Afternoon", "Dusk", "Night"]
    }
  }, {
    title: "Set Options",
    items: [{
        type: "Section",
        id: "galleryDropdownSection",
        items: [{
          type: "dropdown",
          id: "galleryDropdown",
          label: "In Jux",
          labelPosition: "top",
          style: {
            margin: "0 8px 0 0",
            "padding-top": "2px"
          },
          options: []
        }]
      }, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "66%",
          type: "DateTime",
          key: "sort_time",
          label: "Schedule post or date in the past",
          labelPosition: "top"
        }, {
          columnWidth: "34%",
          type: "ButtonSet",
          key: "show_posted_time",
          style: {
            margin: "0 0 0 8px",
            "padding-top": "21px"
          },
          options: [{
            text: "Show",
            value: !0
          }, {
            text: "Hide",
            value: !1
          }]
        }]
      },
      app.views.quark.PaletteShared.customizeBylineSection, {
        type: "Section",
        layout: "columns",
        items: [{
          columnWidth: "66%",
          type: "Label",
          text: "Proudly display the Jux badge",
          style: {
            "padding-top": "7px"
          }
        }, {
          columnWidth: "34%",
          type: "ButtonSet",
          key: "badge",
          style: {
            margin: "0 0 0 8px",
            "padding-top": "2px"
          },
          options: [{
            text: "Show",
            value: "hype"
          }, {
            text: "Hide",
            value: ""
          }]
        }]
      }
    ]
  }]
}, app.views.quark.creationSubchild.CreationSubchild = app.views.quark.AbstractMonoQuark.extend({
  modelTextProperties: ["text", "title", "subtitle"],
  imageIsLoading: !0,
  spinnerEnabled: !1,
  initComponent: function () {
    this._super(arguments), this.listenForTextValueChanges(), this.hasText = this.textPresentInQuark(), this.viewIndex = this.parentQuark.get("quarks").indexOf(this.model), this.isFirstSubQuark = this.viewIndex === 0, this.parentQuark.get("quarks").on("reorder", this.onCollectionReorder, this), this.model.on({
      "change:current_canvas_layout": this.delayedRedraw,
      "change:detail_image_url": this.delayedRedraw,
      "change:background_picture": this.onBackgroundPictureChange,
      scope: this
    }), this.delayedRedrawTask = new Jux.util.DelayedTask
  },
  onBackgroundPictureChange: function (e, t, n) {
    t !== n && this.onPictureLoading()
  },
  delayedRedraw: function () {
    this.onPictureLoading(), this.delayedRedrawTask.cancel(), this.delayedRedrawTask.delay(10, this.redrawLayoutContainer, this)
  },
  createLayoutContainer: function () {
    var e, t;
    return Jux.isDesktop && (e = "DesktopLayoutContainer"), new app.views.quark.creationSubchild[e || "LayoutContainer"]({
      currentUser: this.currentUser,
      model: this.model,
      parentQuark: this.parentQuark,
      quarkPackageName: this.quarkTypeName,
      textPresentInQuark: this.textPresentInQuark(),
      viewIndex: this.viewIndex,
      isFirstSubQuark: this.viewIndex === 0,
      allowBylineToBeShown: !1,
      listeners: {
        backgroundPictureLoading: this.onPictureLoading,
        backgroundPictureLoaded: this.onPictureLoaded,
        scope: this
      }
    })
  },
  onPictureLoading: function () {
    this.fireEvent("backgroundPictureLoading", this, this.model)
  },
  onPictureLoaded: function () {
    this.fireEvent("backgroundPictureLoaded", this, this.model)
  },
  onDataChange: Jux.emptyFn,
  listenForTextValueChanges: function () {
    _.each(this.modelTextProperties, function (e) {
      this.model.on("change:" + e, this.onTextValueChange, this)
    }.createDelegate(this))
  },
  onCollectionReorder: function () {
    this.viewIndex = this.parentQuark.get("quarks").indexOf(this.model)
  },
  onTextValueChange: function () {
    this.onTextPresenceChange(this.textPresentInQuark())
  },
  onTextPresenceChange: function (e) {
    if (e === this.hasText) return;
    this.hasText = e
  },
  resetPosition: Jux.emptyFn,
  textPresentInQuark: function () {
    return _.some(this.modelTextProperties, function (e) {
      return !!$.trim(this.model.get(e))
    }.createDelegate(this))
  },
  getPreloadImageUrl: function () {
    return this.model.get("detail_image_url")
  },
  onDestroy: function () {
    this._super(arguments), _.each(this.modelTextProperties, function (e) {
      this.model.un("change:" + e, this.onTextValueChange)
    }.createDelegate(this))
  }
}), app.views
  .quark.creationSubchild.LayoutContainer = app.views.quark.MonoQuarkLayoutContainer.extend({
    initComponent: function () {
      this.hasByline = this.isFirstSubQuark, this._super(arguments), this.addCls(this.layoutCls), this.textPresentInQuark || this.addCls(this.textMissingCls)
    },
    createConfig: function () {
      var e, t, n;
      if (Jux.isHandheld) e = "1", t = app.views.quark.creation.layouts.handheld, n = "base";
      else {
        var r = this.model.get("current_canvas_layout"),
          i = r.split("-");
        e = i[0], t = app.views.quark.creation.layouts.desktop[e], i.shift(), n = i.join("-")
      }
      var s = t[n];
      if (!s) {
        Jux.logError("'" + n + "' creation canvas layout not found");
        var o = _.keys(t);
        n = o[0], s = t[n]
      }
      return this.layoutCls = "layout-" + e + "-" + n, s
    },
    findCreationComponents: function () {
      return this.creationComponents = this.findBy(function (e) {
        return e instanceof app.views.quark.creationSubchild.components.CreationComponent
      }, this)
    },
    getBackgroundPictureUrl: function () {
      var e = this.model.get("detail_image_url");
      return e ? e : app.helpers.PictureSize.getPictureUrl(this.model, "background_picture")
    }
  }), app.views.quark.creationSubchild.DesktopLayoutContainer = app.views.quark.creationSubchild.LayoutContainer.extend({
    textMissingCls: "is-all-text-empty",
    enteredViewCls: "is-inView",
    exitingViewCls: "is-exitingView",
    enteringViewCls: "is-enteringView",
    imageLoadedCls: "is-imgloaded",
    imageLoaded: !1,
    initComponent: function () {
      this._super(arguments), this.bindModelEvents(), this.parentQuark.get("activeItemId") === this.model.getId() && this.addCls(this.enteredViewCls)
    },
    updateBackgroundPicture: function () {
      this.removeCls(this.imageLoadedCls), this.imageLoaded = !1, this._super(arguments)
    },
    onBackgroundPictureLoad: function () {
      this._super(arguments), this.imageLoaded = !0;
      if (!this.rendered) return;
      this.addCls(this.imageLoadedCls)
    },
    bindModelEvents: function () {
      this.model.on({
        "paging_slideshow:entering_view": this.onEnteringView,
        "paging_slideshow:entered_view": this.onEnteredView,
        "paging_slideshow:exiting_view": this.onExitingView,
        "paging_slideshow:out_of_view": this.onOutOfView,
        scope: this
      })
    },
    onEnteringView: function () {
      this.removeCls(this.enteredViewCls), this.removeCls(this.exitingViewCls), this.addCls(this.enteringViewCls)
    },
    onExitingView: function (e) {
      this.removeCls(this.enteredViewCls), this.removeCls(this.enteringViewCls), this.addCls(this.exitingViewCls);
      var t = this.getComponentAnimationQueue("exiting");
      t.done(function () {
        e.resolve()
      })
    },
    onEnteredView: function (e) {
      this.removeCls(this.enteringViewCls), this.removeCls(this.exitingViewCls), this.addCls(this.enteredViewCls), this.getComponentAnimationQueue("entered")
    },
    onOutOfView: Jux.emptyFn,
    getComponentAnimationQueue: function (e) {
      var t = e === "exiting" ? this.getComponentsWithExitAnimations() : this.getComponentsWithEnteredViewAnimations(),
        n = e === "exiting" ? "getExitViewAnimation" : "getEnteredViewAimation",
        r = (new $.Deferred).resolve();
      return _.each(t, function (e, t) {
        r = r.then(function () {
          return e[n]()
        })
      }), r
    },
    getComponentsWithExitAnimations: function () {
      return this.returnedFilteredComponents(function (e) {
        return e.hasExitViewAnimation()
      })
    },
    getComponentsWithEnteredViewAnimations: function () {
      return this.returnedFilteredComponents(function (e) {
        return e.hasEnteredViewAnimation()
      })
    },
    getComponentsWithAnyAnimation: function () {
      return this.returnedFilteredComponents(function (e) {
        return e.hasAnyAnimation()
      })
    },
    returnedFilteredComponents: function (e) {
      var t = this.findCreationComponents();
      return _.filter(t, e)
    },
    whenAllCreationComponentsRendered: function (e) {
      var t = this.findCreationComponents(),
        n = 0;
      t.length ? _.each(t, function (r) {
        r.on("afterRender", function (r) {
          n++, n >= t.length && e()
        })
      }) : e()
    },
    onDestroy: function () {
      this._super(arguments), this.model.un({
        "paging_slideshow:entering_view": this.onEnteringView,
        "paging_slideshow:entered_view": this.onEnteredView,
        "paging_slideshow:exiting_view": this.onExitingView,
        "paging_slideshow:out_of_view": this.onOutOfView,
        scope: this
      })
    }
  }), app.views.quark.creationSubchild.HandheldCreationSubchild = app.views.quark.creationSubchild.CreationSubchild.extend({
    layout: "container"
  }), app.views.quark.creationSubchild.paletteManifest = {
    cls: "paletteTabs creation-subchild-palette",
    items: [{
      title: "Content",
      items: [{
        layout: "columns",
        cls: "title-and-subtitle",
        items: [{
          columnWidth: "23%",
          type: "ImageSelector",
          key: "background_picture",
          height: 60,
          width: 60
        }, {
          columnWidth: "77%",
          id: "containerRightOfImg",
          items: [{
            id: "titleArea",
            cls: "title-creation",
            type: "TextArea",
            key: "title",
            emptyText: "Title",
            height: 30,
            autoGrow: !1,
            restoreEmptyText: !1
          }, {
            type: "TextArea",
            cls: "subtitle-creation",
            id: "subtitleArea",
            key: "subtitle",
            labelPosition: "top",
            emptyText: "Subtitle",
            autoGrow: !1,
            height: 30,
            restoreEmptyText: !1
          }]
        }]
      }, {
        type: "TextArea",
        key: "text",
        id: "descriptionArea",
        style: {
          margin: "0 6px"
        },
        labelPosition: "top",
        emptyText: "More delicious words, words, words.",
        autoGrow: !0,
        restoreEmptyText: !1
      }]
    }, {
      title: " ",
      id: "StyleTab",
      items: [{
        type: "Section",
        items: [{
          type: "dropdown",
          label: "Photo permissions",
          labelPosition: "top",
          menuCls: "photoPermissionsMenu",
          id: "photoPermissionDropdown",
          style: {
            margin: "0 8px 0 0",
            "padding-top": "2px"
          },
          options: [{
            text: "Choose one (optional)",
            value: ""
          }, {
            text: "Share freely",
            value: "http://creativecommons.org/licenses/by/3.0"
          }, {
            text: "Allow non-commercial use",
            value: "http://creativecommons.org/licenses/by-nc/3.0"
          }, {
            text: "All rights reserved",
            value: "r"
          }]
        }]
      }]
    }]
}, app.views.quark.creation.layouts.desktop[1].articleCoverLandscapeLeft = {
  layout: "creation-fullscreen",
  cls: "cover-landscape-left",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      layout: "creation-vertically-centered",
      items: [{
        type: "creation-HeaderLeftAlign"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articleCoverPortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-HeaderLeftAlign"
    }]
  }, {
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articleFullscreen = {
  layout: "creation-fullscreen",
  cls: "fullscreen",
  items: [{
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextPanelCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articleLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextMatteLeftAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articlePortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextLeftAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articlePortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextLeftAlign"
    }]
  }, {
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articleSquareLeft = {
  layout: "creation-fullscreen",
  cls: "square-left",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteLeftAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].articleSquareRight = {
  layout: "creation-fullscreen",
  cls: "square-right",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteLeftAlign"
    }, {
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteCoverLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      items: [{
        type: "creation-HeaderOverlayBlockquote"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteCoverPortraitCenter = {
  layout: "creation-fullscreen",
  cls: "portrait-center-pictureAndHeader content-bg",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      items: [{
        type: "creation-HeaderOverlayBlockquote"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteCoverPortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-HeaderBlockquote"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteFullscreen = {
  layout: "creation-fullscreen",
  cls: "fullscreen",
  items: [{
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextOverlayPanelBlockquote"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextOverlayBlockquote"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquotePortraitCenter = {
  layout: "creation-fullscreen",
  cls: "portrait-center-pictureAndHeader content-bg",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      items: [{
        type: "creation-TextOverlayBlockquote"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquotePortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextCenterAlignBlockquote"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquotePortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextCenterAlignBlockquote"
    }]
  }, {
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteSquareCenter = {
  layout: "creation-fullscreen",
  cls: "square-left",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextOverlayBlockquote"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteSquareLeft = {
  layout: "creation-fullscreen",
  cls: "square-left",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].blockquoteSquareRight = {
  layout: "creation-fullscreen",
  cls: "square-right",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }, {
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubbleCoverLandscapeLeft = {
  layout: "creation-fullscreen",
  cls: "cover-landscape-left",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      items: [{
        type: "creation-HeaderStripedCenterAlign"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubbleCoverPortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-HeaderBubbleCenter"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubbleFullscreen = {
  layout: "creation-fullscreen",
  cls: "fullscreen",
  items: [{
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextPanelLeftAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubbleLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubblePortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextStripedCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubblePortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextStripedCenterAlign"
    }]
  }, {
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubbleSquareLeft = {
  layout: "creation-fullscreen",
  cls: "square-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].bubbleSquareRight = {
  layout: "creation-fullscreen",
  cls: "square-right",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }, {
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamCoverLandscapeLeft = {
  layout: "creation-fullscreen",
  cls: "cover-landscape-left",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      items: [{
        type: "creation-HeaderStripedCenterAlign"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamCoverPortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    items: [{
      type: "creation-HeaderStripedCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamFullscreen = {
  layout: "creation-fullscreen",
  cls: "fullscreen",
  items: [{
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextPanelLeftAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamPortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextStripedCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamPortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextStripedCenterAlign"
    }]
  }, {
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamSquareLeft = {
  layout: "creation-fullscreen",
  cls: "square-left",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].daydreamSquareRight = {
  layout: "creation-fullscreen",
  cls: "square-right",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }, {
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].noTextFullscreen = {
  layout: "creation-fullscreen",
  cls: "fullscreen",
  items: [{
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].noTextLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container matte-centeralign",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      id: "bylineWrap",
      cls: "creationContent-author"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].noTextPortraitCenter = {
  layout: "creation-fullscreen",
  cls: "portrait-center content-bg",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].noTextSmallSquareCenter = {
  layout: "creation-fullscreen",
  items: [{
    cls: "pictureAndHeader-container matte-small-centeralign",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].noTextSquareCenter = {
  layout: "creation-fullscreen",
  cls: "square-center",
  items: [{
    cls: "pictureAndHeader-container matte-centeralign",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].noTextSquareSmallCenter = {
  layout: "creation-fullscreen",
  items: [{
    cls: "pictureAndHeader-container matte-small-centeralign",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoCoverLandscapeLeft = {
  layout: "creation-fullscreen",
  cls: "cover-landscape-left",
  items: [{
    cls: "pictureAndHeader-container",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      items: [{
        type: "creation-HeaderStripedCenterAlign"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoCoverPortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    items: [{
      type: "creation-HeaderStripedCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoFullscreen = {
  layout: "creation-fullscreen",
  cls: "fullscreen",
  items: [{
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextPanelLeftAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoLandscapeCenter = {
  layout: "creation-fullscreen",
  cls: "landscape-center",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoPortraitLeft = {
  layout: "creation-fullscreen",
  cls: "portrait-left",
  items: [{
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }, {
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextStripedCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoPortraitRight = {
  layout: "creation-fullscreen",
  cls: "portrait-right",
  items: [{
    cls: "header-container",
    layout: "creation-vertically-centered",
    items: [{
      type: "creation-TextStripedCenterAlign"
    }]
  }, {
    cls: "picture-wrapper",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoSquareLeft = {
  layout: "creation-fullscreen",
  cls: "square-left",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }, {
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }]
  }]
}, app.views.quark.creation.layouts.desktop[1].photoSquareRight = {
  layout: "creation-fullscreen",
  cls: "square-right",
  items: [{
    cls: "pictureAndHeader-container matte",
    items: [{
      cls: "header-container",
      layout: "creation-vertically-centered",
      type: "creation-TextMatteCenterAlign"
    }, {
      cls: "picture-wrapper",
      items: [{
        type: "FillmorableImage",
        cls: "picture-container",
        id: "backgroundPicture"
      }]
    }]
  }]
}, app.views.quark.creation.layouts.handheld.base = {
  items: [{
    type: "creation-StackingContext",
    layout: "fullscreen",
    items: [{
      type: "FillmorableImage",
      cls: "picture-container",
      id: "backgroundPicture"
    }, {
      cls: "textOverlayContainer",
      items: [{
        type: "creation-TitleAndSubTitleContainer"
      }]
    }, {
      id: "bylineWrap",
      cls: "creationContent-author"
    }]
  }, {
    type: "creation-DescriptionContainer"
  }]
};