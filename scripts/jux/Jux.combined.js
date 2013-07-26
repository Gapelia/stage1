(function (e, t) {
  var n;
  e.rails = n = {
    linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
    inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
    formSubmitSelector: "form",
    formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
    disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
    enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
    requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
    fileInputSelector: "input:file",
    linkDisableSelector: "a[data-disable-with]",
    CSRFProtection: function (t) {
      var n = e('meta[name="csrf-token"]').attr("content");
      n && t.setRequestHeader("X-CSRF-Token", n)
    },
    fire: function (t, n, r) {
      var i = e.Event(n);
      return t.trigger(i, r), i.result !== !1
    },
    confirm: function (e) {
      return confirm(e)
    },
    ajax: function (t) {
      return e.ajax(t)
    },
    href: function (e) {
      return e.attr("href")
    },
    handleRemote: function (r) {
      var i, s, o, u, a, f;
      if (n.fire(r, "ajax:before")) {
        u = r.data("cross-domain") || null, a = r.data("type") || e.ajaxSettings && e.ajaxSettings.dataType;
        if (r.is("form")) {
          i = r.attr("method"), s = r.attr("action"), o = r.serializeArray();
          var l = r.data("ujs:submit-button");
          l && (o.push(l), r.data("ujs:submit-button", null))
        } else r.is(n.inputChangeSelector) ? (i = r.data("method"), s = r.data("url"), o = r.serialize(), r.data("params") && (o = o + "&" + r.data("params"))) : (i = r.data("method"), s = n.href(r), o = r.data("params") || null);
        return f = {
          type: i || "GET",
          data: o,
          dataType: a,
          crossDomain: u,
          beforeSend: function (e, i) {
            return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), n.fire(r, "ajax:beforeSend", [e, i])
          },
          success: function (e, t, n) {
            r.trigger("ajax:success", [e, t, n])
          },
          complete: function (e, t) {
            r.trigger("ajax:complete", [e, t])
          },
          error: function (e, t, n) {
            r.trigger("ajax:error", [e, t, n])
          }
        }, s && (f.url = s), n.ajax(f)
      }
      return !1
    },
    handleMethod: function (r) {
      var i = n.href(r),
        s = r.data("method"),
        o = r.attr("target"),
        u = e("meta[name=csrf-token]").attr("content"),
        a = e("meta[name=csrf-param]").attr("content"),
        f = e('<form method="post" action="' + i + '"></form>'),
        l = '<input name="_method" value="' + s + '" type="hidden" />';
      a !== t && u !== t && (l += '<input name="' + a + '" value="' + u + '" type="hidden" />'), o && f.attr("target", o), f.hide().append(l).appendTo("body"), f.submit()
    },
    disableFormElements: function (t) {
      t.find(n.disableSelector).each(function () {
        var t = e(this),
          n = t.is("button") ? "html" : "val";
        t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
      })
    },
    enableFormElements: function (t) {
      t.find(n.enableSelector).each(function () {
        var t = e(this),
          n = t.is("button") ? "html" : "val";
        t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
      })
    },
    allowAction: function (e) {
      var t = e.data("confirm"),
        r = !1,
        i;
      return t ? (n.fire(e, "confirm") && (r = n.confirm(t), i = n.fire(e, "confirm:complete", [r])), r && i) : !0
    },
    blankInputs: function (t, n, r) {
      var i = e(),
        s, o = n || "input,textarea";
      return t.find(o).each(function () {
        s = e(this);
        if (r ? s.val() : !s.val()) i = i.add(s)
      }), i.length ? i : !1
    },
    nonBlankInputs: function (e, t) {
      return n.blankInputs(e, t, !0)
    },
    stopEverything: function (t) {
      return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
    },
    callFormSubmitBindings: function (n, r) {
      var i = n.data("events"),
        s = !0;
      return i !== t && i.submit !== t && e.each(i.submit, function (e, t) {
        if (typeof t.handler == "function") return s = t.handler(r)
      }), s
    },
    disableElement: function (e) {
      e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function (e) {
        return n.stopEverything(e)
      })
    },
    enableElement: function (e) {
      e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.data("ujs:enable-with", !1)), e.unbind("click.railsDisable")
    }
  }, e.ajaxPrefilter(function (e, t, r) {
    e.crossDomain || n.CSRFProtection(r)
  }), e(document).delegate(n.linkDisableSelector, "ajax:complete", function () {
    n.enableElement(e(this))
  }), e(document).delegate(n.linkClickSelector, "click.rails", function (r) {
    var i = e(this),
      s = i.data("method"),
      o = i.data("params");
    if (!n.allowAction(i)) return n.stopEverything(r);
    i.is(n.linkDisableSelector) && n.disableElement(i);
    if (i.data("remote") !== t) return (r.metaKey || r.ctrlKey) && (!s || s === "GET") && !o ? !0 : (n.handleRemote(i) === !1 && n.enableElement(i), !1);
    if (i.data("method")) return n.handleMethod(i), !1
  }), e(document).delegate(n.inputChangeSelector, "change.rails", function (t) {
    var r = e(this);
    return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(t)
  }), e(document).delegate(n.formSubmitSelector, "submit.rails", function (r) {
    var i = e(this),
      s = i.data("remote") !== t,
      o = n.blankInputs(i, n.requiredInputSelector),
      u = n.nonBlankInputs(i, n.fileInputSelector);
    if (!n.allowAction(i)) return n.stopEverything(r);
    if (o && i.attr("novalidate") == t && n.fire(i, "ajax:aborted:required", [o])) return n.stopEverything(r);
    if (s) return u ? n.fire(i, "ajax:aborted:file", [u]) : !e.support.submitBubbles && e().jquery < "1.7" && n.callFormSubmitBindings(i, r) === !1 ? n.stopEverything(r) : (n.handleRemote(i), !1);
    setTimeout(function () {
      n.disableFormElements(i)
    }, 13)
  }), e(document).delegate(n.formInputClickSelector, "click.rails", function (t) {
    var r = e(this);
    if (!n.allowAction(r)) return n.stopEverything(t);
    var i = r.attr("name"),
      s = i ? {
        name: i,
        value: r.val()
      } : null;
    r.closest("form").data("ujs:submit-button", s)
  }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function (t) {
    this == t.target && n.disableFormElements(e(this))
  }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function (t) {
    this == t.target && n.enableFormElements(e(this))
  })
})(jQuery),
function () {
  var e = JSON.parse;
  JSON.parse = function (t) {
    if (typeof t == "string") {
      var n = t.match(/^\s*"(.*)"\s*$/);
      if (n) return n[1];
      if ("" === t.replace(/ /, "")) return null
    }
    return t ? e(t) : null
  }
}();
var Autolinker = {
  htmlRegex: /<(\/)?(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g,
  prefixRegex: /^(https?:\/\/)?(www\.)?/,
  link: function (e, t) {
    function h(e) {
      return e = e.replace(r, function (e, t, n, r, u, a) {
        var f = t,
          l = n,
          c = r,
          h = u,
          p = "",
          d = "",
          v = "",
          m = [];
        return d = e, v = e, f ? (p = l, d = "https://twitter.com/" + c, v = "@" + c) : h ? (d = "mailto:" + h, v = h) : /^[A-Za-z]{3,9}:/i.test(d) || (d = "http://" + d), s && (v = v.replace(Autolinker.prefixRegex, "")), v.charAt(v.length - 1) === "/" && (v = v.slice(0, -1)), m.push('href="' + d + '"'), i && m.push('target="_blank"'), o && v.length > o && (v = v.substring(0, o - 2) + ".."), p + "<a " + m.join(" ") + ">" + v + "</a>"
      }), e
    }
    t = t || {};
    var n = Autolinker.htmlRegex,
      r = Autolinker.matcherRegex,
      i = "newWindow" in t ? t.newWindow : !0,
      s = "stripPrefix" in t ? t.stripPrefix : !0,
      o = t.truncate,
      u, a = 0,
      f, l = "",
      c = 0;
    while ((u = n.exec(e)) !== null) {
      var p = u[0],
        d = u[2],
        v = !! u[1];
      f = e.substring(a, u.index), a = u.index + p.length, d === "a" ? v ? (c--, c === 0 && (l += f)) : (c++, l += h(f)) : c === 0 && (l += h(f)), l += p
    }
    return a < e.length && (l += h(e.substring(a))), l
  }
};
Autolinker.matcherRegex = /((^|\s)@(\w{1,15}))|((?:[\-;:&=\+\$,\w\.]+@)[A-Za-z0-9\.\-]*[A-Za-z0-9\-]\.(?:biz|br|cc|co\.uk|com|de|edu|fr|gov|hu|info|io|me|mil|mobi|name|net|org|ru|tv|us|ws))|((?:(?:(?:[A-Za-z]{3,9}:(?:\/\/)?)[A-Za-z0-9\.\-]*[A-Za-z0-9\-])|(?:(?:www\.)[A-Za-z0-9\.\-]*[A-Za-z0-9\-])|(?:[A-Za-z0-9\.\-]*[A-Za-z0-9\-]\.(?:biz|br|cc|co\.uk|com|de|edu|fr|gov|hu|info|io|me|mil|mobi|name|net|org|ru|tv|us|ws)))(?:(?:\/(?:[\+~%\/\.\w\-]*[\+~%\/\w\-])?)?(?:\?[\-\+=&;%@\.\w]*)?(?:#[\-\.\!\/\\\w%]*)?)?)/g;
var Class = function () {
  function e(e) {
    return !!e && Object.prototype.toString.call(e) === "[object Object]"
  }
  var t = !1;
  if (typeof window != "undefined") {
    var n = window.navigator.userAgent.toLowerCase();
    t = /msie/.test(n) && !/opera/.test(n)
  }
  var r = 0,
    i = function (e) {
      return i.extend(Object, e)
    };
  return i.create = function (e) {
    return i.extend(Object, e)
  }, i.apply = function (e, t, n) {
    n && i.apply(e, n);
    if (e && t && typeof t == "object")
      for (var r in t) e[r] = t[r];
    return e
  }, i.applyIf = function (e, t) {
    if (e)
      for (var n in t) typeof e[n] == "undefined" && (e[n] = t[n]);
    return e
  }, i.abstractMethod = function () {
    throw new Error("method must be implemented in subclass")
  }, i.extend = function () {
    var e = /xyz/.test(function () {
      var e = "xyz"
    }) ? /\b_super\b/ : /.*/,
      t = function (e) {
        for (var t in e) this[t] = e[t]
      };
    return function (n, r) {
      arguments.length === 1 && (r = n, n = Object);
      var s, o, u = function () {}, a, f = n.prototype,
        l = !! r.abstractClass,
        c, h = r.statics,
        p = r.inheritedStatics,
        d = r.mixins;
      delete r.statics, delete r.inheritedStatics, delete r.mixins;
      var v = function (e, t) {
        return function () {
          var n = this._super,
            r = this;
          this._super = function (t) {
            return f[e].apply(r, t || [])
          };
          var i = t.apply(this, arguments);
          return this._super = n, i
        }
      };
      for (c in r) c !== "constructor" && r.hasOwnProperty(c) && typeof r[c] == "function" && typeof f[c] == "function" && !r[c].hasOwnProperty("__Class") && e.test(r[c]) && (r[c] = v(c, r[c]));
      r.hasOwnProperty("constructor") && typeof r.constructor == "function" && typeof f.constructor == "function" && e.test(r.constructor) && (r.constructor = v("constructor", r.constructor)), r.constructor !== Object ? (o = r.constructor, delete r.constructor) : o = n === Object ? function () {} : function () {
        return n.apply(this, arguments)
      }, s = function () {
        var e = this.constructor.prototype;
        if (e.hasOwnProperty("abstractClass") && e.abstractClass === !0) throw new Error("Error: Cannot instantiate abstract class");
        return o.apply(this, arguments)
      }, u.prototype = f, a = s.prototype = new u, a.constructor = s, s.superclass = s.__super__ = f, s.__Class = !0, s.override = function (e) {
        i.override(s, e)
      }, s.extend = function (e) {
        return i.extend(s, e)
      }, s.hasMixin = function (e) {
        return i.hasMixin(s, e)
      }, a.superclass = a.supr = function () {
        return f
      }, a.override = t, a.hasMixin = function (e) {
        return i.hasMixin(this.constructor, e)
      }, i.override(s, r);
      if (!l)
        for (var m in a)
          if (a[m] === i.abstractMethod) throw a.hasOwnProperty(m) ? new Error("The class being created has abstract method '" + m + "', but is not declared with 'abstractClass: true'") : new Error("The concrete subclass being created must implement abstract method: '" + m + "', or be declared abstract as well (using 'abstractClass: true')");
      if (p || n.__Class_inheritedStatics) p = i.apply({}, p, n.__Class_inheritedStatics), i.apply(s, p), s.__Class_inheritedStatics = p;
      h && i.apply(s, h);
      if (d) {
        for (var g = d.length - 1; g >= 0; g--) {
          var y = d[g].prototype;
          for (c in y) typeof a[c] == "undefined" && (a[c] = y[c])
        }
        s.mixins = d
      }
      return typeof s.onClassExtended == "function" && s.onClassExtended(s), s
    }
  }(), i.override = function (e, n) {
    if (n) {
      var r = e.prototype;
      i.apply(r, n), t && n.hasOwnProperty("toString") && (r.toString = n.toString)
    }
  }, i.isInstanceOf = function (t, n) {
    if (typeof n != "function") throw new Error("jsClass argument of isInstanceOf method expected a Function (constructor function) for a JavaScript class");
    return e(t) ? t instanceof n ? !0 : i.hasMixin(t.constructor, n) ? !0 : !1 : !1
  }, i.isSubclassOf = function (e, t) {
    if (typeof e != "function" || typeof t != "function") return !1;
    if (e === t) return !0;
    var n = e,
      r = n.prototype;
    while (n = (r = n.__super__) && r.constructor)
      if (r.constructor === t) return !0;
    return !1
  }, i.hasMixin = function (e, t) {
    var n = t.__Class_classId;
    n || (n = t.__Class_classId = ++r);
    var s = e.__Class_hasMixinCache;
    s || (s = e.__Class_hasMixinCache = {});
    if (n in s) return s[n];
    var o = e.mixins,
      u = e.superclass || e.__super__;
    if (o)
      for (var a = 0, f = o.length; a < f; a++)
        if (o[a] === t) return s[n] = !0;
    if (u && u.constructor && u.constructor !== Object) {
      var l = i.hasMixin(u.constructor, t);
      return s[n] = l
    }
    return s[n] = !1
  }, i
}();
(function () {
  var e = this,
    t = e._,
    n = {}, r = Array.prototype,
    i = Object.prototype,
    s = Function.prototype,
    o = r.push,
    u = r.slice,
    a = r.concat,
    f = i.toString,
    l = i.hasOwnProperty,
    c = r.forEach,
    h = r.map,
    p = r.reduce,
    d = r.reduceRight,
    v = r.filter,
    m = r.every,
    g = r.some,
    y = r.indexOf,
    b = r.lastIndexOf,
    w = Array.isArray,
    E = Object.keys,
    S = s.bind,
    x = function (e) {
      if (e instanceof x) return e;
      if (!(this instanceof x)) return new x(e);
      this._wrapped = e
    };
  typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.4.4";
  var T = x.each = x.forEach = function (e, t, r) {
    if (e == null) return;
    if (c && e.forEach === c) e.forEach(t, r);
    else if (e.length === +e.length) {
      for (var i = 0, s = e.length; i < s; i++)
        if (t.call(r, e[i], i, e) === n) return
    } else
      for (var o in e)
        if (x.has(e, o) && t.call(r, e[o], o, e) === n) return
  };
  x.map = x.collect = function (e, t, n) {
    var r = [];
    return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function (e, i, s) {
      r[r.length] = t.call(n, e, i, s)
    }), r)
  };
  var N = "Reduce of empty array with no initial value";
  x.reduce = x.foldl = x.inject = function (e, t, n, r) {
    var i = arguments.length > 2;
    e == null && (e = []);
    if (p && e.reduce === p) return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
    T(e, function (e, s, o) {
      i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
    });
    if (!i) throw new TypeError(N);
    return n
  }, x.reduceRight = x.foldr = function (e, t, n, r) {
    var i = arguments.length > 2;
    e == null && (e = []);
    if (d && e.reduceRight === d) return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
    var s = e.length;
    if (s !== +s) {
      var o = x.keys(e);
      s = o.length
    }
    T(e, function (u, a, f) {
      a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
    });
    if (!i) throw new TypeError(N);
    return n
  }, x.find = x.detect = function (e, t, n) {
    var r;
    return C(e, function (e, i, s) {
      if (t.call(n, e, i, s)) return r = e, !0
    }), r
  }, x.filter = x.select = function (e, t, n) {
    var r = [];
    return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function (e, i, s) {
      t.call(n, e, i, s) && (r[r.length] = e)
    }), r)
  }, x.reject = function (e, t, n) {
    return x.filter(e, function (e, r, i) {
      return !t.call(n, e, r, i)
    }, n)
  }, x.every = x.all = function (e, t, r) {
    t || (t = x.identity);
    var i = !0;
    return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function (e, s, o) {
      if (!(i = i && t.call(r, e, s, o))) return n
    }), !! i)
  };
  var C = x.some = x.any = function (e, t, r) {
    t || (t = x.identity);
    var i = !1;
    return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function (e, s, o) {
      if (i || (i = t.call(r, e, s, o))) return n
    }), !! i)
  };
  x.contains = x.include = function (e, t) {
    return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function (e) {
      return e === t
    })
  }, x.invoke = function (e, t) {
    var n = u.call(arguments, 2),
      r = x.isFunction(t);
    return x.map(e, function (e) {
      return (r ? t : e[t]).apply(e, n)
    })
  }, x.pluck = function (e, t) {
    return x.map(e, function (e) {
      return e[t]
    })
  }, x.where = function (e, t, n) {
    return x.isEmpty(t) ? n ? null : [] : x[n ? "find" : "filter"](e, function (e) {
      for (var n in t)
        if (t[n] !== e[n]) return !1;
      return !0
    })
  }, x.findWhere = function (e, t) {
    return x.where(e, t, !0)
  }, x.max = function (e, t, n) {
    if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
    if (!t && x.isEmpty(e)) return -Infinity;
    var r = {
      computed: -Infinity,
      value: -Infinity
    };
    return T(e, function (e, i, s) {
      var o = t ? t.call(n, e, i, s) : e;
      o >= r.computed && (r = {
        value: e,
        computed: o
      })
    }), r.value
  }, x.min = function (e, t, n) {
    if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
    if (!t && x.isEmpty(e)) return Infinity;
    var r = {
      computed: Infinity,
      value: Infinity
    };
    return T(e, function (e, i, s) {
      var o = t ? t.call(n, e, i, s) : e;
      o < r.computed && (r = {
        value: e,
        computed: o
      })
    }), r.value
  }, x.shuffle = function (e) {
    var t, n = 0,
      r = [];
    return T(e, function (e) {
      t = x.random(n++), r[n - 1] = r[t], r[t] = e
    }), r
  };
  var k = function (e) {
    return x.isFunction(e) ? e : function (t) {
      return t[e]
    }
  };
  x.sortBy = function (e, t, n) {
    var r = k(t);
    return x.pluck(x.map(e, function (e, t, i) {
      return {
        value: e,
        index: t,
        criteria: r.call(n, e, t, i)
      }
    }).sort(function (e, t) {
      var n = e.criteria,
        r = t.criteria;
      if (n !== r) {
        if (n > r || n === void 0) return 1;
        if (n < r || r === void 0) return -1
      }
      return e.index < t.index ? -1 : 1
    }), "value")
  };
  var L = function (e, t, n, r) {
    var i = {}, s = k(t || x.identity);
    return T(e, function (t, o) {
      var u = s.call(n, t, o, e);
      r(i, u, t)
    }), i
  };
  x.groupBy = function (e, t, n) {
    return L(e, t, n, function (e, t, n) {
      (x.has(e, t) ? e[t] : e[t] = []).push(n)
    })
  }, x.countBy = function (e, t, n) {
    return L(e, t, n, function (e, t) {
      x.has(e, t) || (e[t] = 0), e[t]++
    })
  }, x.sortedIndex = function (e, t, n, r) {
    n = n == null ? x.identity : k(n);
    var i = n.call(r, t),
      s = 0,
      o = e.length;
    while (s < o) {
      var u = s + o >>> 1;
      n.call(r, e[u]) < i ? s = u + 1 : o = u
    }
    return s
  }, x.toArray = function (e) {
    return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
  }, x.size = function (e) {
    return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
  }, x.first = x.head = x.take = function (e, t, n) {
    return e == null ? void 0 : t != null && !n ? u.call(e, 0, t) : e[0]
  }, x.initial = function (e, t, n) {
    return u.call(e, 0, e.length - (t == null || n ? 1 : t))
  }, x.last = function (e, t, n) {
    return e == null ? void 0 : t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
  }, x.rest = x.tail = x.drop = function (e, t, n) {
    return u.call(e, t == null || n ? 1 : t)
  }, x.compact = function (e) {
    return x.filter(e, x.identity)
  };
  var A = function (e, t, n) {
    return T(e, function (e) {
      x.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
    }), n
  };
  x.flatten = function (e, t) {
    return A(e, t, [])
  }, x.without = function (e) {
    return x.difference(e, u.call(arguments, 1))
  }, x.uniq = x.unique = function (e, t, n, r) {
    x.isFunction(t) && (r = n, n = t, t = !1);
    var i = n ? x.map(e, n, r) : e,
      s = [],
      o = [];
    return T(i, function (n, r) {
      if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n)) o.push(n), s.push(e[r])
    }), s
  }, x.union = function () {
    return x.uniq(a.apply(r, arguments))
  }, x.intersection = function (e) {
    var t = u.call(arguments, 1);
    return x.filter(x.uniq(e), function (e) {
      return x.every(t, function (t) {
        return x.indexOf(t, e) >= 0
      })
    })
  }, x.difference = function (e) {
    var t = a.apply(r, u.call(arguments, 1));
    return x.filter(e, function (e) {
      return !x.contains(t, e)
    })
  }, x.zip = function () {
    var e = u.call(arguments),
      t = x.max(x.pluck(e, "length")),
      n = new Array(t);
    for (var r = 0; r < t; r++) n[r] = x.pluck(e, "" + r);
    return n
  }, x.object = function (e, t) {
    if (e == null) return {};
    var n = {};
    for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
    return n
  }, x.indexOf = function (e, t, n) {
    if (e == null) return -1;
    var r = 0,
      i = e.length;
    if (n) {
      if (typeof n != "number") return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
      r = n < 0 ? Math.max(0, i + n) : n
    }
    if (y && e.indexOf === y) return e.indexOf(t, n);
    for (; r < i; r++)
      if (e[r] === t) return r;
    return -1
  }, x.lastIndexOf = function (e, t, n) {
    if (e == null) return -1;
    var r = n != null;
    if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
    var i = r ? n : e.length;
    while (i--)
      if (e[i] === t) return i;
    return -1
  }, x.range = function (e, t, n) {
    arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
    var r = Math.max(Math.ceil((t - e) / n), 0),
      i = 0,
      s = new Array(r);
    while (i < r) s[i++] = e, e += n;
    return s
  }, x.bind = function (e, t) {
    if (e.bind === S && S) return S.apply(e, u.call(arguments, 1));
    var n = u.call(arguments, 2);
    return function () {
      return e.apply(t, n.concat(u.call(arguments)))
    }
  }, x.partial = function (e) {
    var t = u.call(arguments, 1);
    return function () {
      return e.apply(this, t.concat(u.call(arguments)))
    }
  }, x.bindAll = function (e) {
    var t = u.call(arguments, 1);
    return t.length === 0 && (t = x.functions(e)), T(t, function (t) {
      e[t] = x.bind(e[t], e)
    }), e
  }, x.memoize = function (e, t) {
    var n = {};
    return t || (t = x.identity),
    function () {
      var r = t.apply(this, arguments);
      return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
    }
  }, x.delay = function (e, t) {
    var n = u.call(arguments, 2);
    return setTimeout(function () {
      return e.apply(null, n)
    }, t)
  }, x.defer = function (e) {
    return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
  }, x.throttle = function (e, t) {
    var n, r, i, s, o = 0,
      u = function () {
        o = new Date, i = null, s = e.apply(n, r)
      };
    return function () {
      var a = new Date,
        f = t - (a - o);
      return n = this, r = arguments, f <= 0 ? (clearTimeout(i), i = null, o = a, s = e.apply(n, r)) : i || (i = setTimeout(u, f)), s
    }
  }, x.debounce = function (e, t, n) {
    var r, i;
    return function () {
      var s = this,
        o = arguments,
        u = function () {
          r = null, n || (i = e.apply(s, o))
        }, a = n && !r;
      return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
    }
  }, x.once = function (e) {
    var t = !1,
      n;
    return function () {
      return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
    }
  }, x.wrap = function (e, t) {
    return function () {
      var n = [e];
      return o.apply(n, arguments), t.apply(this, n)
    }
  }, x.compose = function () {
    var e = arguments;
    return function () {
      var t = arguments;
      for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
      return t[0]
    }
  }, x.after = function (e, t) {
    return e <= 0 ? t() : function () {
      if (--e < 1) return t.apply(this, arguments)
    }
  }, x.keys = E || function (e) {
    if (e !== Object(e)) throw new TypeError("Invalid object");
    var t = [];
    for (var n in e) x.has(e, n) && (t[t.length] = n);
    return t
  }, x.values = function (e) {
    var t = [];
    for (var n in e) x.has(e, n) && t.push(e[n]);
    return t
  }, x.pairs = function (e) {
    var t = [];
    for (var n in e) x.has(e, n) && t.push([n, e[n]]);
    return t
  }, x.invert = function (e) {
    var t = {};
    for (var n in e) x.has(e, n) && (t[e[n]] = n);
    return t
  }, x.functions = x.methods = function (e) {
    var t = [];
    for (var n in e) x.isFunction(e[n]) && t.push(n);
    return t.sort()
  }, x.extend = function (e) {
    return T(u.call(arguments, 1), function (t) {
      if (t)
        for (var n in t) e[n] = t[n]
    }), e
  }, x.pick = function (e) {
    var t = {}, n = a.apply(r, u.call(arguments, 1));
    return T(n, function (n) {
      n in e && (t[n] = e[n])
    }), t
  }, x.omit = function (e) {
    var t = {}, n = a.apply(r, u.call(arguments, 1));
    for (var i in e) x.contains(n, i) || (t[i] = e[i]);
    return t
  }, x.defaults = function (e) {
    return T(u.call(arguments, 1), function (t) {
      if (t)
        for (var n in t) e[n] == null && (e[n] = t[n])
    }), e
  }, x.clone = function (e) {
    return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
  }, x.tap = function (e, t) {
    return t(e), e
  };
  var O = function (e, t, n, r) {
    if (e === t) return e !== 0 || 1 / e == 1 / t;
    if (e == null || t == null) return e === t;
    e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
    var i = f.call(e);
    if (i != f.call(t)) return !1;
    switch (i) {
    case "[object String]":
      return e == String(t);
    case "[object Number]":
      return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object RegExp]":
      return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
    }
    if (typeof e != "object" || typeof t != "object") return !1;
    var s = n.length;
    while (s--)
      if (n[s] == e) return r[s] == t;
    n.push(e), r.push(t);
    var o = 0,
      u = !0;
    if (i == "[object Array]") {
      o = e.length, u = o == t.length;
      if (u)
        while (o--)
          if (!(u = O(e[o], t[o], n, r))) break
    } else {
      var a = e.constructor,
        l = t.constructor;
      if (a !== l && !(x.isFunction(a) && a instanceof a && x.isFunction(l) && l instanceof l)) return !1;
      for (var c in e)
        if (x.has(e, c)) {
          o++;
          if (!(u = x.has(t, c) && O(e[c], t[c], n, r))) break
        }
      if (u) {
        for (c in t)
          if (x.has(t, c) && !(o--)) break;
        u = !o
      }
    }
    return n.pop(), r.pop(), u
  };
  x.isEqual = function (e, t) {
    return O(e, t, [], [])
  }, x.isEmpty = function (e) {
    if (e == null) return !0;
    if (x.isArray(e) || x.isString(e)) return e.length === 0;
    for (var t in e)
      if (x.has(e, t)) return !1;
    return !0
  }, x.isElement = function (e) {
    return !!e && e.nodeType === 1
  }, x.isArray = w || function (e) {
    return f.call(e) == "[object Array]"
  }, x.isObject = function (e) {
    return e === Object(e)
  }, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
    x["is" + e] = function (t) {
      return f.call(t) == "[object " + e + "]"
    }
  }), x.isArguments(arguments) || (x.isArguments = function (e) {
    return !!e && !! x.has(e, "callee")
  }), typeof / . / != "function" && (x.isFunction = function (e) {
    return typeof e == "function"
  }), x.isFinite = function (e) {
    return isFinite(e) && !isNaN(parseFloat(e))
  }, x.isNaN = function (e) {
    return x.isNumber(e) && e != +e
  }, x.isBoolean = function (e) {
    return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
  }, x.isNull = function (e) {
    return e === null
  }, x.isUndefined = function (e) {
    return e === void 0
  }, x.has = function (e, t) {
    return l.call(e, t)
  }, x.noConflict = function () {
    return e._ = t, this
  }, x.identity = function (e) {
    return e
  }, x.times = function (e, t, n) {
    var r = Array(e);
    for (var i = 0; i < e; i++) r[i] = t.call(n, i);
    return r
  }, x.random = function (e, t) {
    return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
  };
  var M = {
    escape: {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;"
    }
  };
  M.unescape = x.invert(M.escape);
  var _ = {
    escape: new RegExp("[" + x.keys(M.escape).join("") + "]", "g"),
    unescape: new RegExp("(" + x.keys(M.unescape).join("|") + ")", "g")
  };
  x.each(["escape", "unescape"], function (e) {
    x[e] = function (t) {
      return t == null ? "" : ("" + t).replace(_[e], function (t) {
        return M[e][t]
      })
    }
  }), x.result = function (e, t) {
    if (e == null) return null;
    var n = e[t];
    return x.isFunction(n) ? n.call(e) : n
  }, x.mixin = function (e) {
    T(x.functions(e), function (t) {
      var n = x[t] = e[t];
      x.prototype[t] = function () {
        var e = [this._wrapped];
        return o.apply(e, arguments), j.call(this, n.apply(x, e))
      }
    })
  };
  var D = 0;
  x.uniqueId = function (e) {
    var t = ++D + "";
    return e ? e + t : t
  }, x.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var P = /(.)^/,
    H = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "	": "t",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  x.template = function (e, t, n) {
    var r;
    n = x.defaults({}, n, x.templateSettings);
    var i = new RegExp([(n.escape || P).source, (n.interpolate || P).source, (n.evaluate || P).source].join("|") + "|$", "g"),
      s = 0,
      o = "__p+='";
    e.replace(i, function (t, n, r, i, u) {
      return o += e.slice(s, u).replace(B, function (e) {
        return "\\" + H[e]
      }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
    }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
    try {
      r = new Function(n.variable || "obj", "_", o)
    } catch (u) {
      throw u.source = o, u
    }
    if (t) return r(t, x);
    var a = function (e) {
      return r.call(this, e, x)
    };
    return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
  }, x.chain = function (e) {
    return x(e).chain()
  };
  var j = function (e) {
    return this._chain ? x(e).chain() : e
  };
  x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
    var t = r[e];
    x.prototype[e] = function () {
      var n = this._wrapped;
      return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], j.call(this, n)
    }
  }), T(["concat", "join", "slice"], function (e) {
    var t = r[e];
    x.prototype[e] = function () {
      return j.call(this, t.apply(this._wrapped, arguments))
    }
  }), x.extend(x.prototype, {
    chain: function () {
      return this._chain = !0, this
    },
    value: function () {
      return this._wrapped
    }
  })
}).call(this);
var Kevlar = function () {
  var e = window.navigator.userAgent.toLowerCase();
  this.isIE = /msie/.test(e) && !/opera/.test(e)
};
Kevlar.prototype = {
  constructor: Kevlar,
  emptyFn: function () {},
  newId: function () {
    var e = 0;
    return function () {
      return ++e
    }
  }(),
  apply: Class.apply,
  applyIf: Class.applyIf,
  extend: Class.extend,
  bind: function (e, t) {
    return function () {
      return e.apply(t, arguments)
    }
  },
  namespace: function () {
    var e, t, n, r, i, s, o, u = arguments;
    for (n = 0, r = u.length; n < r; n++) {
      t = u[n].split("."), e = window[t[0]] = window[t[0]] || {};
      for (i = 1, s = t.length; i < s; i++) o = t[i], e = e[o] = e[o] || {}
    }
    return e
  },
  toArray: function (e, t, n, r) {
    if (Kevlar.isIE) {
      r = [];
      for (var i = 0, s = e.length; i < s; i++) r.push(e[i]);
      return r.slice(t || 0, n || r.length)
    }
    return Array.prototype.slice.call(e, t || 0, n || e.length)
  },
  isArray: function (e) {
    return !!e && Object.prototype.toString.apply(e) === "[object Array]"
  },
  isObject: function (e) {
    return !!e && Object.prototype.toString.call(e) === "[object Object]"
  },
  isFunction: function (e) {
    return !!e && e.constructor === Function
  },
  isDate: function (e) {
    return Object.prototype.toString.apply(e) === "[object Date]"
  },
  isString: function (e) {
    return typeof e == "string"
  },
  isNumber: function (e) {
    return typeof e == "number" && isFinite(e)
  },
  isBoolean: function (e) {
    return typeof e == "boolean"
  },
  isRegExp: function (e) {
    return !!e && e.constructor === RegExp
  },
  isElement: function (e) {
    return e ? e.nodeType === 1 : !1
  },
  isJQuery: function (e) {
    return e instanceof jQuery
  },
  isDefined: function (e) {
    return typeof e != "undefined"
  },
  isUndefined: function (e) {
    return typeof e == "undefined"
  },
  isPrimitive: function (e) {
    return Kevlar.isString(e) || Kevlar.isNumber(e) || Kevlar.isBoolean(e)
  },
  isEmpty: function (e, t) {
    return e === null || e === undefined || Kevlar.isArray(e) && !e.length || (t ? !1 : e === "")
  }
}, Kevlar = new Kevlar, Kevlar.namespace("Kevlar.attribute", "Kevlar.data", "Kevlar.persistence", "Kevlar.util"),
function () {
  function o(e, n, r) {
    return function () {
      n.target == arguments[0] && e.apply(r, t(arguments))
    }
  }

  function u(n, r, i, s) {
    return i.task = new e.DelayedTask,
    function () {
      i.task.delay(r.buffer, n, s, t(arguments))
    }
  }

  function a(e, t, n, r) {
    return function () {
      return t.removeListener(n, r), e.apply(r, arguments)
    }
  }

  function f(n, r, i, s) {
    return function () {
      var o = new e.DelayedTask;
      i.tasks || (i.tasks = []), i.tasks.push(o), o.delay(r.delay || 10, n, s, t(arguments))
    }
  }
  var e = Kevlar.util,
    t = Kevlar.toArray,
    n = Kevlar.isObject,
    r = !0,
    i = !1;
  e.Observable = Class.extend(Object, {
    constructor: function () {
      var e = this,
        t = e.events;
      e.events = t || {}, e.listeners && (e.on(e.listeners), delete e.listeners), this.addEvents("all")
    },
    filterOptRe: /^(?:scope|delay|buffer|single)$/,
    fireEvent: function () {
      var e = t(arguments),
        s = e[0].toLowerCase(),
        o = this,
        u = r,
        a = o.events[s],
        f, l;
      if (o.eventsSuspended === r) f = o.eventQueue, f && f.push(e);
      else if (n(a) && a.bubble) {
        if (a.fire.apply(a, e.slice(1)) === !1) return i;
        var c = a.bubbleFn,
          h = a.bubbleFnScope;
        if (c && c.call(h, this) === !1) return !1;
        l = o.getBubbleTarget && o.getBubbleTarget();
        if (l && l.enableBubble) return (!l.events[s] || !Kevlar.isObject(l.events[s]) || !l.events[s].bubble || !l.events[s].bubbleFn && c) && l.enableBubble({
          eventName: s,
          bubbleFn: c,
          scope: h
        }), l.fireEvent.apply(l, e)
      } else n(a) && (e.shift(), u = a.fire.apply(a, e));
      return s !== "all" && this.fireEvent.apply(this, ["all"].concat(Array.prototype.slice.call(arguments, 0))), u
    },
    addListener: function (t, i, s, o) {
      var u = this,
        a, f, l, c;
      if (n(t)) {
        o = t;
        for (a in o) f = o[a], u.filterOptRe.test(a) || u.addListener(a, f.fn || f, f.scope || o.scope, f.fn ? f : o)
      } else t = t.toLowerCase(), c = u.events[t] || r, Kevlar.isBoolean(c) && (u.events[t] = c = new e.Event(u, t)), c.addListener(i, s, n(o) ? o : {});
      return this
    },
    removeListener: function (e, t, r) {
      if (typeof e == "object") {
        var i = e;
        for (var s in i) this.removeListener(s, i[s], i.scope)
      } else {
        var o = this.events[e.toLowerCase()];
        n(o) && o.removeListener(t, r)
      }
      return this
    },
    purgeListeners: function () {
      var e = this.events,
        t, r;
      for (r in e) t = e[r], n(t) && t.clearListeners()
    },
    addEvents: function (e) {
      var t = this;
      t.events = t.events || {};
      if (Kevlar.isString(e)) {
        var n = arguments,
          i = n.length;
        while (i--) t.events[n[i]] = t.events[n[i]] || r
      } else Kevlar.applyIf(t.events, e)
    },
    hasListener: function (e) {
      var t = this.events[e];
      return n(t) && t.listeners.length > 0
    },
    suspendEvents: function (e) {
      this.eventsSuspended = r, e && !this.eventQueue && (this.eventQueue = [])
    },
    resumeEvents: function () {
      var e = this,
        t = e.eventQueue || [];
      e.eventsSuspended = i, delete e.eventQueue;
      for (var n = 0, r = t.length; n < r; n++) {
        var s = e.fireEvent.apply(e, t[n]);
        if (s === !1) return
      }
    },
    relayEvents: function (e, t) {
      function r(e) {
        return function () {
          return n.fireEvent.apply(n, [e].concat(Array.prototype.slice.call(arguments, 0)))
        }
      }
      var n = this;
      for (var i = 0, s = t.length; i < s; i++) {
        var o = t[i];
        n.events[o] = n.events[o] || !0, e.on(o, r(o), n)
      }
    },
    enableBubble: function (t) {
      var n = this,
        r, i, s, o;
      if (!Kevlar.isEmpty(t)) {
        t = Kevlar.isArray(t) ? t : Kevlar.toArray(arguments);
        for (var u = 0, a = t.length; u < a; u++) {
          r = t[u], i = s = o = undefined, typeof r == "object" ? (i = r.eventName, s = r.bubbleFn, o = r.scope) : i = r, i = i.toLowerCase();
          var f = n.events[i] || !0;
          Kevlar.isBoolean(f) && (f = new e.Event(n, i), n.events[i] = f), f.bubble = !0, typeof s == "function" && (f.bubbleFn = s, f.bubbleFnScope = o || n)
        }
      }
    },
    getBubbleTarget: function () {
      return null
    }
  });
  var s = e.Observable.prototype;
  s.on = s.addListener, s.un = s.removeListener, s.bind = s.addListener, s.unbind = s.removeListener, s.trigger = s.fireEvent, e.Event = function (e, t) {
    this.name = t, this.obj = e, this.listeners = []
  }, e.Event.prototype = {
    addListener: function (e, t, n) {
      var r = this,
        i;
      t = t || r.obj, r.isListening(e, t) || (i = r.createListener(e, t, n), r.firing && (r.listeners = r.listeners.slice(0)), r.listeners.push(i))
    },
    createListener: function (e, t, n) {
      n = n || {}, t = t || this.obj;
      var r = {
        fn: e,
        scope: t,
        options: n
      }, i = e;
      return n.target && (i = o(i, n, t)), n.delay && (i = f(i, n, r, t)), n.single && (i = a(i, this, e, t)), n.buffer && (i = u(i, n, r, t)), r.fireFn = i, r
    },
    findListener: function (e, t) {
      var n = this.listeners,
        r = n.length,
        i, s;
      while (r--) {
        i = n[r];
        if (i) {
          s = i.scope;
          if (i.fn == e && (s == t || s == this.obj)) return r
        }
      }
      return -1
    },
    isListening: function (e, t) {
      return this.findListener(e, t) != -1
    },
    removeListener: function (e, t) {
      var n, s, o, u = this,
        a = i;
      if ((n = u.findListener(e, t)) != -1) {
        u.firing && (u.listeners = u.listeners.slice(0)), s = u.listeners[n], s.task && (s.task.cancel(), delete s.task), o = s.tasks && s.tasks.length;
        if (o) {
          while (o--) s.tasks[o].cancel();
          delete s.tasks
        }
        u.listeners.splice(n, 1), a = r
      }
      return a
    },
    clearListeners: function () {
      var e = this,
        t = e.listeners,
        n = t.length;
      while (n--) e.removeListener(t[n].fn, t[n].scope)
    },
    fire: function () {
      var e = this,
        n = t(arguments),
        s = e.listeners,
        o = s.length,
        u = 0,
        a, f = !1;
      if (o > 0) {
        e.firing = r;
        for (; u < o; u++) a = s[u], a && a.fireFn.apply(a.scope || e.obj || window, n) === i && (f = !0)
      }
      return e.firing = i, f ? !1 : !0
    }
  }
}(), Kevlar.persistence.Proxy = Kevlar.extend(Kevlar.util.Observable, {
  abstractClass: !0,
  constructor: function (e) {
    Kevlar.apply(this, e)
  },
  create: Class.abstractMethod,
  read: Class.abstractMethod,
  update: Class.abstractMethod,
  destroy: Class.abstractMethod
}), Kevlar.apply(Kevlar.persistence.Proxy, {
  proxies: {},
  register: function (e, t) {
    var n = Kevlar.persistence.Proxy;
    e = e.toLowerCase();
    if (typeof t != "function") throw new Error("A Proxy subclass constructor function must be provided to registerProxy()");
    if ( !! n.proxies[e]) throw new Error("Error: Proxy type '" + e + "' already registered.");
    n.proxies[e] = t
  },
  create: function (e) {
    var t = Kevlar.persistence.Proxy,
      n = e.type ? e.type.toLowerCase() : undefined;
    if (e instanceof Kevlar.persistence.Proxy) return e;
    if (t.proxies[n]) return new t.proxies[n](e);
    throw "type" in e ? new Error("Kevlar.persistence.Proxy.create(): Unknown Proxy type: '" + n + "'") : new Error("Kevlar.persistence.Proxy.create(): No `type` property provided on persistenceProxy config object")
  }
}), Kevlar.DataComponent = Kevlar.util.Observable.extend({
  abstractClass: !0,
  constructor: function () {
    this._super(arguments), this.clientId = "c" + Kevlar.newId()
  },
  getClientId: function () {
    return this.clientId
  },
  getData: Class.abstractMethod,
  isModified: Class.abstractMethod,
  commit: Class.abstractMethod,
  rollback: Class.abstractMethod
}), Kevlar.Model = Kevlar.DataComponent.extend({
  persistenceProxy: null,
  idAttribute: "id",
  dirty: !1,
  setCallCount: 0,
  bubbleNonPersistedEmbeddedChanges: !0,
  inheritedStatics: {
    onClassExtended: function (e) {
      e.__Kevlar_modelTypeId = Kevlar.newId();
      var t = e.prototype,
        n = e.superclass,
        r = n.attributes || {}, i = {}, s = [],
        o, u, a;
      t.hasOwnProperty("attributes") ? s = t.attributes : t.hasOwnProperty("addAttributes") && (s = t.addAttributes);
      for (u = 0, a = s.length; u < a; u++) {
        o = s[u], typeof o == "string" && (o = {
          name: o
        });
        var f = Kevlar.attribute.Attribute.create(o);
        i[f.getName()] = f
      }
      e.prototype.attributes = Kevlar.apply({}, i, r)
    },
    getAttributes: function () {
      return this.prototype.attributes
    }
  },
  constructor: function (e, t) {
    var n = this;
    e = e || {}, n = Kevlar.ModelCache.get(n, e[n.idAttribute]);
    if (n !== this) return t !== !0 && n.set(e), n;
    this._super(arguments), n.persistenceProxy && typeof n.persistenceProxy == "object" && !(n.persistenceProxy instanceof Kevlar.persistence.Proxy) && (n.constructor.prototype.persistenceProxy = Kevlar.persistence.Proxy.create(n.persistenceProxy));
    var r = n.attributes,
      i;
    for (var s in r) e[s] === undefined && (i = r[s].getDefaultValue()) !== undefined && (e[s] = i);
    n.data = {}, n.modifiedData = {}, n.embeddedDataComponentChangeHandlers = {}, n.embeddedCollectionAddRemoveReorderHandlers = {}, n.set(e), n.commit(), n.initialize(), n.addEvents("change", "changeset", "commit", "rollback", "destroy")
  },
  initialize: Kevlar.emptyFn,
  getAttributes: function () {
    return this.attributes
  },
  getId: function () {
    if (this.idAttribute in this.attributes) return this.get(this.idAttribute);
    throw new Error("Error: The `idAttribute` (currently set to an attribute named '" + this.idAttribute + "') was not found on the Model. Set the `idAttribute` config to the name of the id attribute in the Model. The model can't be saved or destroyed without it.")
  },
  getIdAttribute: function () {
    return this.attributes[this.idAttribute] || null
  },
  getIdAttributeName: function () {
    return this.idAttribute
  },
  hasIdAttribute: function () {
    return !!this.attributes[this.idAttribute]
  },
  set: function (e, t) {
    this.setCallCount === 0 && (this.changeSetNewValues = {}, this.changeSetOldValues = {}), this.setCallCount++;
    var n = this.attributes,
      r = this.changeSetNewValues,
      i = this.changeSetOldValues;
    if (typeof e == "object") {
      var s = e,
        o = [];
      for (var u in s)
        if (s.hasOwnProperty(u)) {
          if (!n[u]) throw new Error("Kevlar.Model.set(): An attribute with the attributeName '" + u + "' was not found.");
          n[u].hasUserDefinedSetter() ? o.push(u) : this.set(u, s[u])
        }
      for (var a = 0, f = o.length; a < f; a++) u = o[a], this.set(u, s[u])
    } else {
      var l = n[e];
      if (!l) throw new Error("Kevlar.Model.set(): An attribute with the attributeName '" + e + "' was not found.");
      var c = this.data[e],
        h = this.get(e);
      t = l.beforeSet(this, t, c), t = l.doSet(this, t, c), l.hasOwnProperty("set") && t === undefined && (e in this.data || (this.data[e] = undefined), t = this.get(e), this.changeSetNewValues[e] = t, e in i || (this.changeSetOldValues[e] = h), this.fireEvent("change:" + e, this, t, h), this.fireEvent("change", this, e, t, h)), t = l.afterSet(this, t);
      if (!(e in this.data) || !l.valuesAreEqual(c, t)) e in this.modifiedData || (this.modifiedData[e] = c), this.data[e] = t, this.dirty = !0, t = this.get(e), e === this.idAttribute && (this.id = t, Kevlar.ModelCache.get(this, t)), r[e] = t, e in i || (i[e] = h), this.fireEvent("change:" + e, this, t, h), this.fireEvent("change", this, e, t, h)
    }
    this.setCallCount--, this.setCallCount === 0 && this.fireEvent("changeset", this, r, i)
  },
  get: function (e) {
    if (e in this.attributes) {
      var t = this.data[e],
        n = this.attributes[e];
      return typeof n.get == "function" && (t = n.get.call(this, t)), t
    }
    throw new Error("Kevlar.Model::get() error: attribute '" + e + "' was not found on the Model.")
  },
  raw: function (e) {
    if (e in this.attributes) {
      var t = this.data[e],
        n = this.attributes[e];
      return typeof n.raw == "function" && (t = n.raw.call(this, t, this)), t
    }
    throw new Error("Kevlar.Model::raw() error: attribute '" + e + "' was not found on the Model.")
  },
  getDefault: function (e) {
    return this.attributes[e].getDefaultValue()
  },
  has: function (e) {
    return !!this.attributes[e]
  },
  subscribeEmbeddedModel: function (e, t) {
    var n = function (t, n, r, i, s) {
      this.onEmbeddedDataComponentChange(e, null, t, n, r, i, s)
    };
    this.embeddedDataComponentChangeHandlers[e] = n, t.on("change", n, this)
  },
  subscribeEmbeddedCollection: function (e, t) {
    var n = function (t, n, r, i, s, o) {
      if (!this.bubbleNonPersistedEmbeddedChanges && n && !n.getAttributes()[r].isPersisted()) return !1;
      this.onEmbeddedDataComponentChange(e, t, n, r, i, s, o)
    };
    this.embeddedDataComponentChangeHandlers[e] = n, t.on("change", n, this);
    var r = function (t) {
      this.onEmbeddedCollectionAddRemoveReorder(e, t)
    };
    this.embeddedCollectionAddRemoveReorderHandlers[e] = r, t.on({
      addset: r,
      removeset: r,
      reorder: r,
      scope: this
    })
  },
  unsubscribeEmbeddedModel: function (e, t) {
    this.unsubscribeEmbeddedDataComponent(e, t)
  },
  unsubscribeEmbeddedCollection: function (e, t) {
    this.unsubscribeEmbeddedDataComponent(e, t);
    var n = this.embeddedCollectionAddRemoveReorderHandlers[e];
    t.un({
      addset: n,
      removeset: n,
      reorder: n,
      scope: this
    })
  },
  unsubscribeEmbeddedDataComponent: function (e, t) {
    var n = this.embeddedDataComponentChangeHandlers[e];
    t.un("change", n, this)
  },
  onEmbeddedDataComponentChange: function (e, t, n, r, i, s, o) {
    o || (o = {
      pathToChangedAttr: r,
      origNewValue: i,
      origOldValue: s,
      embeddedDataComponents: [n],
      isPersistedValue: n.getAttributes()[r].isPersisted()
    }), t && o.embeddedDataComponents.unshift(t), o.embeddedDataComponents.unshift(this), o.pathToChangedAttr = e + "." + o.pathToChangedAttr;
    var u = o.pathToChangedAttr,
      a = o.embeddedDataComponents,
      f = o.origNewValue,
      l = o.origOldValue,
      c = u.split("."),
      h = a[a.length - 1],
      p = c.slice(0, c.length - 1).join("."),
      d = c[c.length - 1],
      v = a[a.length - 2];
    v instanceof Kevlar.Collection ? (this.fireEvent("change:" + u, v, h, f, l), this.fireEvent("change:" + p + ".*", v, h, d, f, l)) : (this.fireEvent("change:" + u, h, f, l), this.fireEvent("change:" + p + ".*", h, d, f, l));
    for (var m = c.length - 2; m >= 0; m--) {
      var g = c.slice(0, m + 1).join("."),
        y = c.slice(0, m).join("."),
        b = c[m],
        w = a[m],
        E = a[m + 1];
      w instanceof Kevlar.Collection ? (this.fireEvent("change:" + g, w, E, E), y !== "" && this.fireEvent("change:" + y + ".*", w, b, E, E)) : (this.fireEvent("change:" + g, w, E, E), y !== "" && this.fireEvent("change:" + y + ".*", w, b, E, E))
    }
    t ? this.fireEvent("change", this, e, t, t, o) : this.fireEvent("change", this, e, n, n, o)
  },
  onEmbeddedCollectionAddRemoveReorder: function (e, t) {
    this.fireEvent("change:" + e, this, t, t), this.fireEvent("change", this, e, t, t)
  },
  isNew: function () {
    if (!this.hasIdAttribute()) return !0;
    var e = this.getId();
    return typeof e == "undefined" || e === null
  },
  isDirty: function () {
    return this.dirty
  },
  isModified: function (e, t) {
    typeof e == "object" && (t = e, e = undefined), t = t || {};
    var n = this.attributes,
      r = this.data,
      i = this.modifiedData;
    if (!e) {
      for (var s in i)
        if (i.hasOwnProperty(s) && (!t.persistedOnly || t.persistedOnly && n[s].isPersisted())) return !0;
      var o = this.getEmbeddedDataComponentAttributes(),
        u;
      for (var a = 0, f = o.length; a < f; a++) {
        var l = o[a].getName();
        if ((u = r[l]) && u.isModified(t)) return !0
      }
      return !1
    }
    var c = n[e];
    return c instanceof Kevlar.attribute.DataComponentAttribute && c.isEmbedded() && r[e].isModified(t) ? !0 : i.hasOwnProperty(e) && (!t.persistedOnly || t.persistedOnly && n[e].isPersisted()) ? !0 : !1
  },
  getData: function (e) {
    return Kevlar.data.NativeObjectConverter.convert(this, e)
  },
  getChanges: function (e) {
    e = e || {}, e.attributeNames = Kevlar.util.Object.keysToArray(this.modifiedData);
    var t = this.getEmbeddedDataComponentAttributes(),
      n = this.data,
      r;
    for (var i = 0, s = t.length; i < s; i++) {
      var o = t[i].getName();
      (r = n[o]) && r.isModified(e) && e.attributeNames.push(o)
    }
    return Kevlar.data.NativeObjectConverter.convert(this, e)
  },
  commit: function () {
    this.modifiedData = {}, this.dirty = !1;
    var e = this.getEmbeddedDataComponentAttributes(),
      t = this.data,
      n;
    for (var r = 0, i = e.length; r < i; r++) {
      var s = e[r].getName();
      (n = t[s]) && n.commit()
    }
    this.fireEvent("commit", this)
  },
  rollback: function () {
    var e = this.modifiedData;
    for (var t in e) e.hasOwnProperty(t) && (this.data[t] = e[t]);
    this.modifiedData = {}, this.dirty = !1, this.fireEvent("rollback", this)
  },
  clone: function (e) {
    var t = Kevlar.util.Object.clone(this.getData());
    return typeof e == "undefined" ? delete t[this.idAttribute] : t[this.idAttribute] = e, new this.constructor(t)
  },
  getPersistenceProxy: function () {
    return this.persistenceProxy
  },
  reload: function (e) {
    e = e || {};
    if (!this.persistenceProxy) throw new Error("Kevlar.Model::reload() error: Cannot load. No persistenceProxy.");
    var t = {
      async: typeof e.async == "undefined" ? !0 : e.async,
      success: e.success || Kevlar.emptyFn,
      failure: e.failure || Kevlar.emptyFn,
      complete: e.complete || Kevlar.emptyFn,
      scope: e.scope || window
    };
    this.persistenceProxy.read(this, t)
  },
  save: function (e) {
    e = e || {};
    var t = e.scope || e.context || window;
    if (!this.persistenceProxy) throw new Error("Kevlar.Model::save() error: Cannot save. No persistenceProxy.");
    if (!this.hasIdAttribute) throw new Error("Kevlar.Model::save() error: Cannot save. Model does not have an idAttribute that relates to a valid attribute.");
    var n = Kevlar.util.Object.clone(this.getData({
      persistedOnly: !0
    })),
      r = function (r) {
        r = r || this.getData(), this.commit();
        var i = this.getData();
        for (var s in n) n.hasOwnProperty(s) && !Kevlar.util.Object.isEqual(n[s], i[s]) && (this.modifiedData[s] = n[s], this.dirty = !0);
        typeof e.success == "function" && e.success.call(t, this, r)
      }, i = function () {
        typeof e.error == "function" && e.error.call(t)
      }, s = function () {
        typeof e.complete == "function" && e.complete.call(t)
      }, o = {
        async: typeof e.async == "undefined" ? !0 : e.async,
        success: r,
        error: i,
        complete: s,
        scope: this
      };
    this.persistenceProxy[this.isNew() ? "create" : "update"](this, o)
  },
  destroy: function (e) {
    e = e || {};
    var t = e.scope || e.context || window;
    if (this.isNew()) this.fireEvent("destroy", this), typeof e.success == "function" && e.success.call(t), typeof e.complete == "function" && e.complete.call(t);
    else {
      if (!this.persistenceProxy) throw new Error("Kevlar.Model::destroy() error: Cannot destroy model on server. No persistenceProxy.");
      var n = function () {
        this.fireEvent("destroy", this), typeof e.success == "function" && e.success.call(t)
      }, r = function () {
          typeof e.error == "function" && e.error.call(t)
        }, i = function () {
          typeof e.complete == "function" && e.complete.call(t)
        }, s = {
          async: typeof e.async == "undefined" ? !0 : e.async,
          success: n,
          error: r,
          complete: i,
          scope: this
        };
      this.persistenceProxy.destroy(this, s)
    }
  },
  getEmbeddedDataComponentAttributes: function () {
    var e = this.attributes,
      t, n = Kevlar.attribute.DataComponentAttribute,
      r = [];
    for (var i in e) e.hasOwnProperty(i) && (t = e[i]) instanceof n && t.isEmbedded() && r.push(t);
    return r
  }
}), Kevlar.Model.prototype.fetch = Kevlar.Model.prototype.reload, Kevlar.Model.prototype.load = Kevlar.Model.prototype.reload, Kevlar.Model.prototype.toJSON = Kevlar.Model.prototype.getData, Kevlar.Model.prototype.previous = function (e) {
  return undefined
}, Kevlar.Collection = Kevlar.DataComponent.extend({
  modified: !1,
  constructor: function (e) {
    this._super(arguments), this.addEvents("add", "addset", "reorder", "remove", "removeset");
    var t;
    Kevlar.isArray(e) ? t = e : typeof e == "object" && (Kevlar.apply(this, e), t = this.models), typeof this.sortBy == "function" && (this.sortBy = Kevlar.bind(this.sortBy, this)), this.models = [], this.modelsByClientId = {}, this.modelsById = {}, t && (this.add(t), this.modified = !1), this.initialize()
  },
  initialize: Kevlar.emptyFn,
  createModel: function (e) {
    if (!this.model) throw new Error("Cannot instantiate model from anonymous data, 'model' config not provided to Collection.");
    return new this.model(e)
  },
  add: function (e) {
    this.insert(e)
  },
  insert: function (e, t) {
    var n = typeof t != "undefined",
      r, i, s, o, u = [];
    typeof t != "number" ? t = this.models.length : t < 0 ? t = 0 : t > this.models.length && (t = this.models.length), Kevlar.isArray(e) || (e = [e]);
    if (e.length === 0) return;
    for (r = 0, i = e.length; r < i; r++) {
      s = e[r], s instanceof Kevlar.Model || (s = this.createModel(s));
      if (!this.has(s)) this.modified = !0, u.push(s), this.modelsByClientId[s.getClientId()] = s, this.models.splice(t, 0, s), t++, s.hasIdAttribute() && (o = s.getId(), o !== undefined && o !== null && (this.modelsById[o] = s), s.on("change:" + s.getIdAttribute().getName(), this.onModelIdChange, this)), s.on("all", this.onModelEvent, this), this.fireEvent("add", this, s);
      else if (n) {
        this.modified = !0;
        var a = this.indexOf(s);
        this.models.splice(a, 1), this.models.splice(t, 0, s), this.fireEvent("reorder", this, s, t, a), t++
      }
    }
    this.sortBy && this.models.sort(this.sortBy), u.length > 0 && this.fireEvent("addset", this, u)
  },
  remove: function (e) {
    var t = this.models,
      n = [],
      r, i, s, o;
    Kevlar.isArray(e) || (e = [e]);
    for (r = 0, i = e.length; r < i; r++) s = e[r], o = this.indexOf(s), o > -1 && (this.modified = !0, delete this.modelsByClientId[s.getClientId()], s.hasIdAttribute() && (delete this.modelsById[s.getId()], s.un("change:" + s.getIdAttribute().getName(), this.onModelIdChange, this)), s.un("all", this.onModelEvent, this), t.splice(o, 1), this.fireEvent("remove", this, s, o), n.push(s));
    n.length > 0 && this.fireEvent("removeset", this, n)
  },
  removeAll: function () {
    this.remove(Kevlar.util.Object.clone(this.models, !1))
  },
  onModelIdChange: function (e, t, n) {
    delete this.modelsById[n], t !== undefined && t !== null && (this.modelsById[t] = e)
  },
  onModelEvent: function (e) {
    e === "destroy" && this.remove(arguments[1]), this.fireEvent.apply(this, [e, this].concat(Array.prototype.slice.call(arguments, 1)))
  },
  getAt: function (e) {
    return this.models[e] || null
  },
  getFirst: function () {
    return this.models[0] || null
  },
  getLast: function () {
    return this.models[this.models.length - 1] || null
  },
  getRange: function (e, t) {
    var n = this.models,
      r = n.length,
      i = [],
      s;
    if (r === 0) return i;
    e = Math.max(e || 0, 0), t = Math.min(typeof t == "undefined" ? r - 1 : t, r - 1);
    for (s = e; s <= t; s++) i.push(n[s]);
    return i
  },
  getModels: function () {
    return this.getRange()
  },
  getData: function (e) {
    return Kevlar.data.NativeObjectConverter.convert(this, e)
  },
  getCount: function () {
    return this.models.length
  },
  getByClientId: function (e) {
    return this.modelsByClientId[e] || null
  },
  getById: function (e) {
    return this.modelsById[e] || null
  },
  has: function (e) {
    return !!this.getByClientId(e.getClientId())
  },
  indexOf: function (e) {
    var t = this.models,
      n, r;
    if (!this.has(e)) return -1;
    for (n = 0, r = t.length; n < r; n++)
      if (t[n] === e) return n
  },
  indexOfId: function (e) {
    var t = this.getById(e);
    return t ? this.indexOf(t) : -1
  },
  commit: function () {
    this.modified = !1;
    var e = this.models;
    for (var t = 0, n = e.length; t < n; t++) e[t].commit()
  },
  rollback: function () {
    this.modified = !1;
    var e = this.models;
    for (var t = 0, n = e.length; t < n; t++) e[t].rollback()
  },
  isModified: function (e) {
    e = e || {};
    if (this.modified) return !0;
    var t = this.models,
      n, r;
    for (n = 0, r = t.length; n < r; n++)
      if (t[n].isModified(e)) return !0;
    return !1
  },
  find: function (e, t, n) {
    n = n || {};
    var r = this.models,
      i = n.startIndex || 0;
    for (var s = i, o = r.length; s < o; s++)
      if (r[s].get(e) === t) return r[s];
    return null
  },
  findBy: function (e, t) {
    t = t || {};
    var n = this.models,
      r = t.scope || window,
      i = t.startIndex || 0;
    for (var s = i, o = n.length; s < o; s++)
      if (e.call(r, n[s], s) === !0) return n[s];
    return null
  }
}), Kevlar.attribute.Attribute = Kevlar.extend(Object, {
  abstractClass: !0,
  name: "",
  persist: !0,
  statics: {
    attributeTypes: {},
    create: function (e) {
      var t = e.type ? e.type.toLowerCase() : undefined;
      if (e instanceof Kevlar.attribute.Attribute) return e;
      if (this.hasType(t || "mixed")) return new this.attributeTypes[t || "mixed"](e);
      throw new Error("Kevlar.attribute.Attribute: Unknown Attribute type: '" + t + "'")
    },
    registerType: function (e, t) {
      e = e.toLowerCase();
      if ( !! this.attributeTypes[e]) throw new Error("Error: Attribute type '" + e + "' already exists");
      this.attributeTypes[e] = t
    },
    getType: function (e) {
      return this.attributeTypes[e.toLowerCase()]
    },
    hasType: function (e) {
      return e ? !! this.attributeTypes[e.toLowerCase()] : !1
    }
  },
  constructor: function (e) {
    var t = this;
    typeof e != "object" && (e = {
      name: e
    }), Kevlar.apply(t, e);
    var n = t.name;
    if (n === undefined || n === null || n === "") throw new Error("no 'name' property provided to Kevlar.attribute.Attribute constructor");
    typeof t.name == "number" && (t.name = n.toString()), t["default"] && (t.defaultValue = t["default"])
  },
  getName: function () {
    return this.name
  },
  getDefaultValue: function () {
    var e = this.defaultValue;
    return typeof e == "function" && (e = e(this)), typeof e == "object" && (e = Kevlar.util.Object.clone(e)), e
  },
  isPersisted: function () {
    return this.persist
  },
  hasUserDefinedSetter: function () {
    return this.hasOwnProperty("set")
  },
  hasUserDefinedGetter: function () {
    return this.hasOwnProperty("get")
  },
  valuesAreEqual: function (e, t) {
    return Kevlar.util.Object.isEqual(e, t)
  },
  beforeSet: function (e, t, n) {
    return t
  },
  doSet: function (e, t, n) {
    return this.hasOwnProperty("set") ? this.set.call(e, t, n) : this.set(e, t, n)
  },
  set: function (e, t, n) {
    return t
  },
  afterSet: function (e, t) {
    return t
  }
}), Kevlar.attribute.PrimitiveAttribute = Kevlar.attribute.Attribute.extend({
  abstractClass: !0,
  defaultValue: undefined
}), Kevlar.attribute.NumberAttribute = Kevlar.attribute.PrimitiveAttribute.extend({
  abstractClass: !0,
  stripCharsRegex: /[\$,%]/g
}), Kevlar.attribute.ObjectAttribute = Kevlar.attribute.Attribute.extend({
  defaultValue: null,
  beforeSet: function (e, t, n) {
    return typeof t != "object" && (t = null), t
  }
}), Kevlar.attribute.Attribute.registerType("object", Kevlar.attribute.ObjectAttribute), Kevlar.attribute.DataComponentAttribute = Kevlar.attribute.ObjectAttribute.extend({
  abstractClass: !0,
  embedded: !1,
  persistIdOnly: !1,
  isEmbedded: function () {
    return this.embedded
  },
  isPersisted: function () {
    return this._super(arguments) && (this.embedded || this.persistIdOnly)
  },
  resolveGlobalPath: function (e) {
    var t = e.split("."),
      n;
    for (var r = 0, i = t.length; r < i; r++) n = (n || window)[t[r]];
    return n
  }
}), Kevlar.ModelCache = {
  models: {},
  get: function (e, t) {
    var n = e.constructor,
      r = n.__Kevlar_modelTypeId,
      i;
    return this.models[r] || (this.models[r] = {}), typeof t != "undefined" && (i = this.models[r][t], i || (this.models[r][t] = e)), i || e
  }
}, Kevlar.attribute.BooleanAttribute = Kevlar.attribute.PrimitiveAttribute.extend({
  beforeSet: function (e, t, n) {
    return t === undefined || t === null || t === "" ? null : t === !0 || t === "true" || t == 1
  }
}), Kevlar.attribute.Attribute.registerType("boolean", Kevlar.attribute.BooleanAttribute), Kevlar.attribute.Attribute.registerType("bool", Kevlar.attribute.BooleanAttribute), Kevlar.attribute.CollectionAttribute = Kevlar.attribute.DataComponentAttribute.extend({
  embedded: !1,
  persistIdOnly: !1,
  constructor: function () {
    this._super(arguments);
    if ("collectionClass" in this && this.collectionClass === undefined) throw new Error("The 'collectionClass' config provided to an Attribute with the name '" + this.getName() + "' either doesn't exist, or doesn't " + "exist just yet. Consider using the String or Function form of the collectionClass config for late binding, if needed")
  },
  valuesAreEqual: function (e, t) {
    return e === t
  },
  beforeSet: function (e, t, n) {
    this.embedded && n instanceof Kevlar.Collection && e.unsubscribeEmbeddedCollection(this.getName(), n), t = this._super(arguments);
    if (t !== null) {
      var r = this.collectionClass;
      if (typeof r == "string") {
        r = this.resolveGlobalPath(r);
        if (!r) throw new Error("The string value 'collectionClass' config did not resolve to a Collection class for attribute '" + this.getName() + "'")
      } else if (typeof r == "function" && !Class.isSubclassOf(r, Kevlar.Collection)) {
        this.collectionClass = r = r();
        if (!r) throw new Error("The function value 'collectionClass' config did not resolve to a Collection class for attribute '" + this.getName() + "'")
      }
      t && typeof r == "function" && !(t instanceof r) && (t = new r(t))
    }
    return t
  },
  afterSet: function (e, t) {
    if (t === null || t instanceof Kevlar.Collection) return this.embedded && t instanceof Kevlar.Collection && e.subscribeEmbeddedCollection(this.getName(), t), t;
    throw new Error("A value set to the attribute '" + this.getName() + "' was not a Kevlar.Collection subclass")
  }
}), Kevlar.attribute.Attribute.registerType("collection", Kevlar.attribute.CollectionAttribute), Kevlar.attribute.DateAttribute = Kevlar.attribute.ObjectAttribute.extend({
  beforeSet: function (e, t, n) {
    if (!t) return null;
    if (Kevlar.isDate(t)) return t;
    var r = Date.parse(t);
    return r ? new Date(r) : null
  }
}), Kevlar.attribute.Attribute.registerType("date", Kevlar.attribute.DateAttribute), Kevlar.attribute.FloatAttribute = Kevlar.attribute.NumberAttribute.extend({
  beforeSet: function (e, t, n) {
    return t !== undefined && t !== null && t !== "" ? parseFloat(String(t).replace(this.stripCharsRegex, ""), 10) : null
  }
}), Kevlar.attribute.Attribute.registerType("float", Kevlar.attribute.FloatAttribute), Kevlar.attribute.Attribute.registerType("number", Kevlar.attribute.FloatAttribute), Kevlar.attribute.IntegerAttribute = Kevlar.attribute.NumberAttribute.extend({
  beforeSet: function (e, t, n) {
    return t !== undefined && t !== null && t !== "" ? parseInt(String(t).replace(this.stripCharsRegex, ""), 10) : null
  }
}), Kevlar.attribute.Attribute.registerType("int", Kevlar.attribute.IntegerAttribute), Kevlar.attribute.Attribute.registerType("integer", Kevlar.attribute.IntegerAttribute), Kevlar.attribute.MixedAttribute = Kevlar.attribute.Attribute.extend({}), Kevlar.attribute.Attribute.registerType("mixed", Kevlar.attribute.MixedAttribute), Kevlar.attribute.ModelAttribute = Kevlar.attribute.DataComponentAttribute.extend({
  embedded: !1,
  persistIdOnly: !1,
  constructor: function () {
    this._super(arguments);
    if ("modelClass" in this && this.modelClass === undefined) throw new Error("The 'modelClass' config provided to an Attribute with the name '" + this.getName() + "' either doesn't exist, or doesn't " + "exist just yet. Consider using the String or Function form of the modelClass config for late binding, if needed")
  },
  valuesAreEqual: function (e, t) {
    return Kevlar.util.Object.isEqual(e, t)
  },
  beforeSet: function (e, t, n) {
    this.embedded && n instanceof Kevlar.Model && e.unsubscribeEmbeddedModel(this.getName(), n), t = this._super(arguments);
    if (t !== null) {
      var r = this.modelClass;
      if (typeof r == "string") {
        r = this.resolveGlobalPath(r);
        if (!r) throw new Error("The string value 'modelClass' config did not resolve to a Model class for attribute '" + this.getName() + "'")
      } else if (typeof r == "function" && !Class.isSubclassOf(r, Kevlar.Model)) {
        this.modelClass = r = r();
        if (!r) throw new Error("The function value 'modelClass' config did not resolve to a Model class for attribute '" + this.getName() + "'")
      }
      t && typeof r == "function" && !(t instanceof r) && (t = new r(t))
    }
    return t
  },
  afterSet: function (e, t) {
    if (t === null || t instanceof Kevlar.Model) return this.embedded && t instanceof Kevlar.Model && e.subscribeEmbeddedModel(this.getName(), t), t;
    throw new Error("A value set to the attribute '" + this.getName() + "' was not a Kevlar.Model subclass")
  }
}), Kevlar.attribute.Attribute.registerType("model", Kevlar.attribute.ModelAttribute), Kevlar.attribute.StringAttribute = Kevlar.attribute.PrimitiveAttribute.extend({
  beforeSet: function (e, t, n) {
    return t === undefined || t === null ? null : String(t)
  }
}), Kevlar.attribute.Attribute.registerType("string", Kevlar.attribute.StringAttribute), Kevlar.data.NativeObjectConverter = {
  convert: function (e, t) {
    t = t || {};
    var n = {}, r = !! t.persistedOnly,
      i = !! t.raw,
      s = e instanceof Kevlar.Collection ? [] : {};
    return n[e.getClientId()] = s, Kevlar.apply(s, function o(e) {
      var s, u, a, f, l;
      if (e instanceof Kevlar.Model) {
        var c = e.getAttributes(),
          h = t.attributeNames || Kevlar.util.Object.keysToArray(c),
          p, d;
        a = {}, delete t.attributeNames;
        for (f = 0, l = h.length; f < l; f++) {
          p = h[f];
          if (!r || c[p].isPersisted() === !0) d = a[p] = i ? e.raw(p) : e.get(p), d instanceof Kevlar.DataComponent && (s = d.getClientId(), (u = n[s]) ? a[p] = u : (n[s] = a[p] = d instanceof Kevlar.Collection ? [] : {}, Kevlar.apply(n[s], o(d))))
        }
      } else if (e instanceof Kevlar.Collection) {
        var v = e.getModels(),
          m;
        a = [];
        for (f = 0, l = v.length; f < l; f++) m = v[f], s = m.getClientId(), a[f] = n[s] || o(m)
      }
      return a
    }(e)), s
  }
}, Kevlar.persistence.RestProxy = Kevlar.extend(Kevlar.persistence.Proxy, {
  urlRoot: "",
  incremental: !1,
  rootProperty: "",
  actionMethods: {
    create: "POST",
    read: "GET",
    update: "PUT",
    destroy: "DELETE"
  },
  ajax: jQuery.ajax,
  setRootProperty: function (e) {
    this.rootProperty = e
  },
  create: function (e, t) {
    t = t || {};
    var n = e.getData({
      persistedOnly: !0,
      raw: !0
    });
    if (this.rootProperty) {
      var r = {};
      r[this.rootProperty] = n, n = r
    }
    var i = function (n) {
      n && (e.set(n), e.commit()), typeof t.success == "function" && t.success.call(t.scope || window)
    };
    return this.ajax({
      async: typeof t.async == "undefined" ? !0 : t.async,
      url: this.buildUrl(e, "create"),
      type: this.getMethod("create"),
      dataType: "json",
      data: JSON.stringify(n),
      contentType: "application/json",
      success: i,
      error: t.error || Kevlar.emptyFn,
      complete: t.complete || Kevlar.emptyFn,
      context: t.scope || window
    })
  },
  read: function (e, t) {
    t = t || {};
    var n = function (n) {
      e.set(n), e.commit(), typeof t.success == "function" && t.success.call(t.scope || window)
    };
    return this.ajax({
      async: typeof t.async == "undefined" ? !0 : t.async,
      url: this.buildUrl(e, "read"),
      type: this.getMethod("read"),
      dataType: "json",
      success: n,
      error: t.error || Kevlar.emptyFn,
      complete: t.complete || Kevlar.emptyFn,
      context: t.scope || window
    })
  },
  update: function (e, t) {
    t = t || {};
    var n = t.scope || t.context || window,
      r = e.getChanges({
        persistedOnly: !0,
        raw: !0
      });
    if (Kevlar.util.Object.isEmpty(r)) return typeof t.success == "function" && t.success.call(n), typeof t.complete == "function" && t.complete.call(n), null;
    var i;
    this.incremental ? i = r : i = e.getData({
      persistedOnly: !0,
      raw: !0
    });
    if (this.rootProperty) {
      var s = {};
      s[this.rootProperty] = i, i = s
    }
    return this.ajax({
      async: typeof t.async == "undefined" ? !0 : t.async,
      url: this.buildUrl(e, "update"),
      type: this.getMethod("update"),
      dataType: "json",
      data: JSON.stringify(i),
      contentType: "application/json",
      success: t.success || Kevlar.emptyFn,
      error: t.error || Kevlar.emptyFn,
      complete: t.complete || Kevlar.emptyFn,
      context: n
    })
  },
  destroy: function (e, t) {
    return t = t || {}, this.ajax({
      async: typeof t.async == "undefined" ? !0 : t.async,
      url: this.buildUrl(e, "destroy"),
      type: this.getMethod("destroy"),
      dataType: "text",
      success: t.success || Kevlar.emptyFn,
      error: t.error || Kevlar.emptyFn,
      complete: t.complete || Kevlar.emptyFn,
      context: t.scope || window
    })
  },
  buildUrl: function (e, t) {
    var n = this.urlRoot;
    return t !== "create" && (n.match(/\/$/) || (n += "/"), n += encodeURIComponent(e.getId())), n
  },
  getMethod: function (e) {
    return this.actionMethods[e]
  }
}), Kevlar.persistence.Proxy.register("rest", Kevlar.persistence.RestProxy), Kevlar.util.DelayedTask = function (e, t, n) {
  var r = this,
    i, s = function () {
      clearInterval(i), i = null, e.apply(t, n || [])
    };
  r.delay = function (o, u, a, f) {
    r.cancel(), e = u || e, t = a || t, n = f || n, i = setInterval(s, o)
  }, r.cancel = function () {
    i && (clearInterval(i), i = null)
  }, r.isPending = function () {
    return !!i
  }
}, Kevlar.util.Object = {
  clone: function (e, t) {
    typeof t == "undefined" && (t = !0);
    if (typeof e != "object" || e === null) return e;
    switch (e.constructor) {
    case Date:
      return new Date(e.getTime());
    case RegExp:
    case String:
    case Number:
    case Boolean:
      return new e.constructor(e)
    }
    var n = new e.constructor;
    for (var r in e) e.hasOwnProperty(r) && (n[r] = t ? Kevlar.util.Object.clone(e[r], !0) : e[r]);
    return n
  },
  isEqual: _.isEqual,
  length: function (e) {
    var t = 0;
    for (var n in e) e.hasOwnProperty(n) && t++;
    return t
  },
  isEmpty: function (e) {
    for (var t in e)
      if (e.hasOwnProperty(t)) return !1;
    return !0
  },
  keysToArray: function (e) {
    var t = [],
      n;
    for (n in e) e.hasOwnProperty(n) && t.push(n);
    return t
  }
}, ! function (e, t) {
  "use strict";
  var n = t.prototype.trim,
    r = t.prototype.trimRight,
    i = t.prototype.trimLeft,
    s = function (e) {
      return e * 1 || 0
    }, o = function (e, t) {
      if (t < 1) return "";
      var n = "";
      while (t > 0) t & 1 && (n += e), t >>= 1, e += e;
      return n
    }, u = [].slice,
    a = function (e) {
      return e == null ? "\\s" : e.source ? e.source : "[" + p.escapeRegExp(e) + "]"
    }, f = {
      lt: "<",
      gt: ">",
      quot: '"',
      amp: "&",
      apos: "'"
    }, l = {};
  for (var c in f) l[f[c]] = c;
  l["'"] = "#39";
  var h = function () {
    function e(e) {
      return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
    }
    var n = o,
      r = function () {
        return r.cache.hasOwnProperty(arguments[0]) || (r.cache[arguments[0]] = r.parse(arguments[0])), r.format.call(null, r.cache[arguments[0]], arguments)
      };
    return r.format = function (r, i) {
      var s = 1,
        o = r.length,
        u = "",
        a, f = [],
        l, c, p, d, v, m;
      for (l = 0; l < o; l++) {
        u = e(r[l]);
        if (u === "string") f.push(r[l]);
        else if (u === "array") {
          p = r[l];
          if (p[2]) {
            a = i[s];
            for (c = 0; c < p[2].length; c++) {
              if (!a.hasOwnProperty(p[2][c])) throw new Error(h('[_.sprintf] property "%s" does not exist', p[2][c]));
              a = a[p[2][c]]
            }
          } else p[1] ? a = i[p[1]] : a = i[s++]; if (/[^s]/.test(p[8]) && e(a) != "number") throw new Error(h("[_.sprintf] expecting number but found %s", e(a)));
          switch (p[8]) {
          case "b":
            a = a.toString(2);
            break;
          case "c":
            a = t.fromCharCode(a);
            break;
          case "d":
            a = parseInt(a, 10);
            break;
          case "e":
            a = p[7] ? a.toExponential(p[7]) : a.toExponential();
            break;
          case "f":
            a = p[7] ? parseFloat(a).toFixed(p[7]) : parseFloat(a);
            break;
          case "o":
            a = a.toString(8);
            break;
          case "s":
            a = (a = t(a)) && p[7] ? a.substring(0, p[7]) : a;
            break;
          case "u":
            a = Math.abs(a);
            break;
          case "x":
            a = a.toString(16);
            break;
          case "X":
            a = a.toString(16).toUpperCase()
          }
          a = /[def]/.test(p[8]) && p[3] && a >= 0 ? "+" + a : a, v = p[4] ? p[4] == "0" ? "0" : p[4].charAt(1) : " ", m = p[6] - t(a).length, d = p[6] ? n(v, m) : "", f.push(p[5] ? a + d : d + a)
        }
      }
      return f.join("")
    }, r.cache = {}, r.parse = function (e) {
      var t = e,
        n = [],
        r = [],
        i = 0;
      while (t) {
        if ((n = /^[^\x25]+/.exec(t)) !== null) r.push(n[0]);
        else if ((n = /^\x25{2}/.exec(t)) !== null) r.push("%");
        else {
          if ((n = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t)) === null) throw new Error("[_.sprintf] huh?");
          if (n[2]) {
            i |= 1;
            var s = [],
              o = n[2],
              u = [];
            if ((u = /^([a-z_][a-z_\d]*)/i.exec(o)) === null) throw new Error("[_.sprintf] huh?");
            s.push(u[1]);
            while ((o = o.substring(u[0].length)) !== "")
              if ((u = /^\.([a-z_][a-z_\d]*)/i.exec(o)) !== null) s.push(u[1]);
              else {
                if ((u = /^\[(\d+)\]/.exec(o)) === null) throw new Error("[_.sprintf] huh?");
                s.push(u[1])
              }
            n[2] = s
          } else i |= 2; if (i === 3) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
          r.push(n)
        }
        t = t.substring(n[0].length)
      }
      return r
    }, r
  }(),
    p = {
      VERSION: "2.3.1",
      isBlank: function (e) {
        return e == null && (e = ""), /^\s*$/.test(e)
      },
      stripTags: function (e) {
        return e == null ? "" : t(e).replace(/<\/?[^>]+>/g, "")
      },
      capitalize: function (e) {
        return e = e == null ? "" : t(e), e.charAt(0).toUpperCase() + e.slice(1)
      },
      chop: function (e, n) {
        return e == null ? [] : (e = t(e), n = ~~n, n > 0 ? e.match(new RegExp(".{1," + n + "}", "g")) : [e])
      },
      clean: function (e) {
        return p.strip(e).replace(/\s+/g, " ")
      },
      count: function (e, n) {
        if (e == null || n == null) return 0;
        e = t(e), n = t(n);
        var r = 0,
          i = 0,
          s = n.length;
        for (;;) {
          i = e.indexOf(n, i);
          if (i === -1) break;
          r++, i += s
        }
        return r
      },
      chars: function (e) {
        return e == null ? [] : t(e).split("")
      },
      swapCase: function (e) {
        return e == null ? "" : t(e).replace(/\S/g, function (e) {
          return e === e.toUpperCase() ? e.toLowerCase() : e.toUpperCase()
        })
      },
      escapeHTML: function (e) {
        return e == null ? "" : t(e).replace(/[&<>"']/g, function (e) {
          return "&" + l[e] + ";"
        })
      },
      unescapeHTML: function (e) {
        return e == null ? "" : t(e).replace(/\&([^;]+);/g, function (e, n) {
          var r;
          return n in f ? f[n] : (r = n.match(/^#x([\da-fA-F]+)$/)) ? t.fromCharCode(parseInt(r[1], 16)) : (r = n.match(/^#(\d+)$/)) ? t.fromCharCode(~~r[1]) : e
        })
      },
      escapeRegExp: function (e) {
        return e == null ? "" : t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
      },
      splice: function (e, t, n, r) {
        var i = p.chars(e);
        return i.splice(~~t, ~~n, r), i.join("")
      },
      insert: function (e, t, n) {
        return p.splice(e, t, 0, n)
      },
      include: function (e, n) {
        return n === "" ? !0 : e == null ? !1 : t(e).indexOf(n) !== -1
      },
      join: function () {
        var e = u.call(arguments),
          t = e.shift();
        return t == null && (t = ""), e.join(t)
      },
      lines: function (e) {
        return e == null ? [] : t(e).split("\n")
      },
      reverse: function (e) {
        return p.chars(e).reverse().join("")
      },
      startsWith: function (e, n) {
        return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(0, n.length) === n)
      },
      endsWith: function (e, n) {
        return n === "" ? !0 : e == null || n == null ? !1 : (e = t(e), n = t(n), e.length >= n.length && e.slice(e.length - n.length) === n)
      },
      succ: function (e) {
        return e == null ? "" : (e = t(e), e.slice(0, -1) + t.fromCharCode(e.charCodeAt(e.length - 1) + 1))
      },
      titleize: function (e) {
        return e == null ? "" : t(e).replace(/(?:^|\s)\S/g, function (e) {
          return e.toUpperCase()
        })
      },
      camelize: function (e) {
        return p.trim(e).replace(/[-_\s]+(.)?/g, function (e, t) {
          return t.toUpperCase()
        })
      },
      underscored: function (e) {
        return p.trim(e).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
      },
      dasherize: function (e) {
        return p.trim(e).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
      },
      classify: function (e) {
        return p.titleize(t(e).replace(/[\W_]/g, " ")).replace(/\s/g, "")
      },
      humanize: function (e) {
        return p.capitalize(p.underscored(e).replace(/_id$/, "").replace(/_/g, " "))
      },
      trim: function (e, r) {
        return e == null ? "" : !r && n ? n.call(e) : (r = a(r), t(e).replace(new RegExp("^" + r + "+|" + r + "+$", "g"), ""))
      },
      ltrim: function (e, n) {
        return e == null ? "" : !n && i ? i.call(e) : (n = a(n), t(e).replace(new RegExp("^" + n + "+"), ""))
      },
      rtrim: function (e, n) {
        return e == null ? "" : !n && r ? r.call(e) : (n = a(n), t(e).replace(new RegExp(n + "+$"), ""))
      },
      truncate: function (e, n, r) {
        return e == null ? "" : (e = t(e), r = r || "...", n = ~~n, e.length > n ? e.slice(0, n) + r : e)
      },
      prune: function (e, n, r) {
        if (e == null) return "";
        e = t(e), n = ~~n, r = r != null ? t(r) : "...";
        if (e.length <= n) return e;
        var i = function (e) {
          return e.toUpperCase() !== e.toLowerCase() ? "A" : " "
        }, s = e.slice(0, n + 1).replace(/.(?=\W*\w*$)/g, i);
        return s.slice(s.length - 2).match(/\w\w/) ? s = s.replace(/\s*\S+$/, "") : s = p.rtrim(s.slice(0, s.length - 1)), (s + r).length > e.length ? e : e.slice(0, s.length) + r
      },
      words: function (e, t) {
        return p.isBlank(e) ? [] : p.trim(e, t).split(t || /\s+/)
      },
      pad: function (e, n, r, i) {
        e = e == null ? "" : t(e), n = ~~n;
        var s = 0;
        r ? r.length > 1 && (r = r.charAt(0)) : r = " ";
        switch (i) {
        case "right":
          return s = n - e.length, e + o(r, s);
        case "both":
          return s = n - e.length, o(r, Math.ceil(s / 2)) + e + o(r, Math.floor(s / 2));
        default:
          return s = n - e.length, o(r, s) + e
        }
      },
      lpad: function (e, t, n) {
        return p.pad(e, t, n)
      },
      rpad: function (e, t, n) {
        return p.pad(e, t, n, "right")
      },
      lrpad: function (e, t, n) {
        return p.pad(e, t, n, "both")
      },
      sprintf: h,
      vsprintf: function (e, t) {
        return t.unshift(e), h.apply(null, t)
      },
      toNumber: function (e, t) {
        return e ? (e = p.trim(e), e.match(/^-?\d+(?:\.\d+)?$/) ? s(s(e).toFixed(~~t)) : NaN) : 0
      },
      numberFormat: function (e, t, n, r) {
        if (isNaN(e) || e == null) return "";
        e = e.toFixed(~~t), r = typeof r == "string" ? r : ",";
        var i = e.split("."),
          s = i[0],
          o = i[1] ? (n || ".") + i[1] : "";
        return s.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + r) + o
      },
      strRight: function (e, n) {
        if (e == null) return "";
        e = t(e), n = n != null ? t(n) : n;
        var r = n ? e.indexOf(n) : -1;
        return~ r ? e.slice(r + n.length, e.length) : e
      },
      strRightBack: function (e, n) {
        if (e == null) return "";
        e = t(e), n = n != null ? t(n) : n;
        var r = n ? e.lastIndexOf(n) : -1;
        return~ r ? e.slice(r + n.length, e.length) : e
      },
      strLeft: function (e, n) {
        if (e == null) return "";
        e = t(e), n = n != null ? t(n) : n;
        var r = n ? e.indexOf(n) : -1;
        return~ r ? e.slice(0, r) : e
      },
      strLeftBack: function (e, t) {
        if (e == null) return "";
        e += "", t = t != null ? "" + t : t;
        var n = e.lastIndexOf(t);
        return~ n ? e.slice(0, n) : e
      },
      toSentence: function (e, t, n, r) {
        t = t || ", ", n = n || " and ";
        var i = e.slice(),
          s = i.pop();
        return e.length > 2 && r && (n = p.rtrim(t) + n), i.length ? i.join(t) + n + s : s
      },
      toSentenceSerial: function () {
        var e = u.call(arguments);
        return e[3] = !0, p.toSentence.apply(p, e)
      },
      slugify: function (e) {
        if (e == null) return "";
        var n = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
          r = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
          i = new RegExp(a(n), "g");
        return e = t(e).toLowerCase().replace(i, function (e) {
          var t = n.indexOf(e);
          return r.charAt(t) || "-"
        }), p.dasherize(e.replace(/[^\w\s-]/g, ""))
      },
      surround: function (e, t) {
        return [t, e, t].join("")
      },
      quote: function (e) {
        return p.surround(e, '"')
      },
      exports: function () {
        var e = {};
        for (var t in this) {
          if (!this.hasOwnProperty(t) || t.match(/^(?:include|contains|reverse)$/)) continue;
          e[t] = this[t]
        }
        return e
      },
      repeat: function (e, n, r) {
        if (e == null) return "";
        n = ~~n;
        if (r == null) return o(t(e), n);
        for (var i = []; n > 0; i[--n] = e);
        return i.join(r)
      },
      levenshtein: function (e, n) {
        if (e == null && n == null) return 0;
        if (e == null) return t(n).length;
        if (n == null) return t(e).length;
        e = t(e), n = t(n);
        var r = [],
          i, s;
        for (var o = 0; o <= n.length; o++)
          for (var u = 0; u <= e.length; u++) o && u ? e.charAt(u - 1) === n.charAt(o - 1) ? s = i : s = Math.min(r[u], r[u - 1], i) + 1 : s = o + u, i = r[u], r[u] = s;
        return r.pop()
      }
    };
  p.strip = p.trim, p.lstrip = p.ltrim, p.rstrip = p.rtrim, p.center = p.lrpad, p.rjust = p.lpad, p.ljust = p.rpad, p.contains = p.include, p.q = p.quote, typeof exports != "undefined" && (typeof module != "undefined" && module.exports && (module.exports = p), exports._s = p), typeof define == "function" && define.amd && define("underscore.string", [], function () {
    return p
  }), e._ = e._ || {}, e._.string = e._.str = p
}(this, String), _.mixin(_.string.exports()), window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
    window.setTimeout(e, 1e3 / 60)
  }
}(), window.Modernizr = function (e, t, n) {
  function k(e) {
    l.cssText = e
  }

  function L(e, t) {
    return k(d.join(e + ";") + (t || ""))
  }

  function A(e, t) {
    return typeof e === t
  }

  function O(e, t) {
    return !!~("" + e).indexOf(t)
  }

  function M(e, t) {
    for (var r in e)
      if (l[e[r]] !== n) return t == "pfx" ? e[r] : !0;
    return !1
  }

  function _(e, t) {
    var n = e.charAt(0).toUpperCase() + e.substr(1),
      r = (e + " " + v.join(n + " ") + n).split(" ");
    return M(r, t)
  }
  var r = "2.0.6",
    i = {}, s = !0,
    o = t.documentElement,
    u = t.head || t.getElementsByTagName("head")[0],
    a = "modernizr",
    f = t.createElement(a),
    l = f.style,
    c = t.createElement("input"),
    h = ":)",
    p = Object.prototype.toString,
    d = " -webkit- -moz- -o- -ms- -khtml- ".split(" "),
    v = "Webkit Moz O ms Khtml".split(" "),
    m = {
      svg: "http://www.w3.org/2000/svg"
    }, g = {}, y = {}, b = {}, w = [],
    E, S = function (e, n, r, i) {
      var s, u, f, l = t.createElement("div");
      if (parseInt(r, 10))
        while (r--) f = t.createElement("div"), f.id = i ? i[r] : a + (r + 1), l.appendChild(f);
      return s = ["&shy;", "<style>", e, "</style>"].join(""), l.id = a, l.innerHTML += s, o.appendChild(l), u = n(l, e), l.parentNode.removeChild(l), !! u
    }, x = function (t) {
      if (e.matchMedia) return matchMedia(t).matches;
      var n;
      return S("@media " + t + " { #" + a + " { position: absolute; } }", function (t) {
        n = (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle)["position"] == "absolute"
      }), n
    }, T = function () {
      function r(r, i) {
        i = i || t.createElement(e[r] || "div"), r = "on" + r;
        var s = r in i;
        return s || (i.setAttribute || (i = t.createElement("div")), i.setAttribute && i.removeAttribute && (i.setAttribute(r, ""), s = A(i[r], "function"), A(i[r], n) || (i[r] = n), i.removeAttribute(r))), i = null, s
      }
      var e = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img"
      };
      return r
    }(),
    N = {}.hasOwnProperty,
    C;
  !A(N, n) && !A(N.call, n) ? C = function (e, t) {
    return N.call(e, t)
  } : C = function (e, t) {
    return t in e && A(e.constructor.prototype[t], n)
  };
  var D = function (e, t) {}(['@font-face {font-family:"font";src:url("https://")}', ["@media (", d.join("touch-enabled),("), a, ")", "{#touch{top:9px;position:absolute}}"].join(""), ["@media (", d.join("transform-3d),("), a, ")", "{#csstransforms3d{left:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', h, '";visibility:hidden}'].join("")], ["fontface", "touch", "csstransforms3d", "generatedcontent"]);
  g.touch = function () {
    return "ontouchstart" in e
  }, g.cssanimations = function () {
    return _("animationName")
  };
  for (var P in g) C(g, P) && (E = P.toLowerCase(), i[E] = g[P](), w.push((i[E] ? "" : "no-") + E));
  return i.addTest = function (e, t) {
    if (typeof e == "object")
      for (var r in e) C(e, r) && i.addTest(r, e[r]);
    else {
      e = e.toLowerCase();
      if (i[e] !== n) return;
      t = typeof t == "boolean" ? t : !! t(), o.className += " " + (t ? "" : "no-") + e, i[e] = t
    }
    return i
  }, k(""), f = c = null, e.attachEvent && function () {
    var e = t.createElement("div");
    return e.innerHTML = "<elem></elem>", e.childNodes.length !== 1
  }() && function (e, t) {
    function y(e) {
      var t = -1;
      while (++t < o) e.createElement(s[t])
    }
    e.iepp = e.iepp || {};
    var r = e.iepp,
      i = r.html5elements || "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      s = i.split("|"),
      o = s.length,
      u = new RegExp("(^|\\s)(" + i + ")", "gi"),
      a = new RegExp("<(/*)(" + i + ")", "gi"),
      f = /^\s*[\{\}]\s*$/,
      l = new RegExp("(^|[^\\n]*?\\s)(" + i + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"),
      c = t.createDocumentFragment(),
      h = t.documentElement,
      p = h.firstChild,
      d = t.createElement("body"),
      v = t.createElement("style"),
      m = /print|all/,
      g;
    r.getCSS = function (e, t) {
      if (e + "" === n) return "";
      var i = -1,
        s = e.length,
        o, u = [];
      while (++i < s) {
        o = e[i];
        if (o.disabled) continue;
        t = o.media || t, m.test(t) && u.push(r.getCSS(o.imports, t), o.cssText), t = "all"
      }
      return u.join("")
    }, r.parseCSS = function (e) {
      var t = [],
        n;
      while ((n = l.exec(e)) != null) t.push(((f.exec(n[1]) ? "\n" : n[1]) + n[2] + n[3]).replace(u, "$1.iepp_$2") + n[4]);
      return t.join("\n")
    }, r.writeHTML = function () {
      var e = -1;
      g = g || t.body;
      while (++e < o) {
        var n = t.getElementsByTagName(s[e]),
          r = n.length,
          i = -1;
        while (++i < r) n[i].className.indexOf("iepp_") < 0 && (n[i].className += " iepp_" + s[e])
      }
      c.appendChild(g), h.appendChild(d), d.className = g.className, d.id = g.id, d.innerHTML = g.innerHTML.replace(a, "<$1font")
    }, r._beforePrint = function () {
      v.styleSheet.cssText = r.parseCSS(r.getCSS(t.styleSheets, "all")), r.writeHTML()
    }, r.restoreHTML = function () {
      d.innerHTML = "", h.removeChild(d), h.appendChild(g)
    }, r._afterPrint = function () {
      r.restoreHTML(), v.styleSheet.cssText = ""
    }, y(t), y(c);
    if (r.disablePP) return;
    p.insertBefore(v, p.firstChild), v.media = "print", v.className = "iepp-printshim", e.attachEvent("onbeforeprint", r._beforePrint), e.attachEvent("onafterprint", r._afterPrint)
  }(e, t), i._version = r, i._prefixes = d, i._domPrefixes = v, i.mq = x, i.hasEvent = T, i.testProp = function (e) {
    return M([e])
  }, i.testAllProps = _, i.testStyles = S, i.prefixed = function (e) {
    return _(e, "pfx")
  }, o.className = o.className.replace(/\bno-js\b/, "") + (s ? " js " + w.join(" ") : ""), i
}(this, this.document),
function (e) {
  function s(t, n) {
    var r = t.data("jqae");
    r || (r = {});
    var i = r.wrapperElement;
    i || (i = t.wrapInner("<div/>").find(">div"), i.css({
      margin: 0,
      padding: 0,
      border: 0
    }));
    var s = i.data("jqae");
    s || (s = {});
    var f = s.originalContent;
    f ? i = s.originalContent.clone(!0).data("jqae", {
      originalContent: f
    }).replaceAll(i) : i.data("jqae", {
      originalContent: i.clone(!0)
    }), t.data("jqae", {
      wrapperElement: i,
      containerWidth: t.width(),
      containerHeight: t.height()
    });
    var l = t.height(),
      c = (parseInt(t.css("padding-top"), 10) || 0) + (parseInt(t.css("border-top-width"), 10) || 0) - (i.offset().top - t.offset().top),
      h = !1,
      p = i;
    n.selector && (p = e(i.find(n.selector).get().reverse())), p.each(function () {
      var t = e(this),
        r = t.text(),
        s = !1;
      if (i.innerHeight() - t.innerHeight() > l + c) t.remove();
      else {
        a(t);
        if (t.contents().length) {
          h && (u(t).get(0).nodeValue += n.ellipsis, h = !1);
          while (i.innerHeight() > l + c) {
            s = o(t);
            if (!s) {
              h = !0, t.remove();
              break
            }
            a(t);
            if (!t.contents().length) {
              h = !0, t.remove();
              break
            }
            u(t).get(0).nodeValue += n.ellipsis
          }
          n.setTitle == "onEllipsis" && s || n.setTitle == "always" ? t.attr("title", r) : n.setTitle != "never" && t.removeAttr("title")
        }
      }
    })
  }

  function o(t) {
    var n = u(t);
    if (n.length) {
      var r = n.get(0).nodeValue,
        i = r.lastIndexOf(" ");
      return i > -1 ? (r = e.trim(r.substring(0, i)), n.get(0).nodeValue = r) : n.get(0).nodeValue = "", !0
    }
    return !1
  }

  function u(e) {
    if (e.contents().length) {
      var t = e.contents(),
        n = t.eq(t.length - 1);
      return n.filter(f).length ? n : u(n)
    }
    e.append("");
    var t = e.contents();
    return t.eq(t.length - 1)
  }

  function a(t) {
    if (t.contents().length) {
      var n = t.contents(),
        r = n.eq(n.length - 1);
      if (r.filter(f).length) {
        var i = r.get(0).nodeValue;
        return i = e.trim(i), i == "" ? (r.remove(), !0) : !1
      }
      while (a(r));
      return r.contents().length ? !1 : (r.remove(), !0)
    }
    return !1
  }

  function f() {
    return this.nodeType === 3
  }

  function l(e, r) {
    t[e] = r, n || (n = window.setInterval(function () {
      h()
    }, 200))
  }

  function c(e) {
    t[e] && (delete t[e], t.length || n && (window.clearInterval(n), n = undefined))
  }

  function h() {
    if (!r) {
      r = !0;
      for (var n in t) e(n).each(function () {
        var r, i;
        r = e(this), i = r.data("jqae"), (i.containerWidth != r.width() || i.containerHeight != r.height()) && s(r, t[n])
      });
      r = !1
    }
  }
  var t = {}, n, r = !1,
    i = {
      ellipsis: "...",
      setTitle: "never",
      live: !1
    };
  e.fn.ellipsis = function (t, n) {
    var r, o;
    return r = e(this), typeof t != "string" && (n = t, t = undefined), o = e.extend({}, i, n), o.selector = t, r.each(function () {
      var t = e(this);
      s(t, o)
    }), o.live ? l(r.selector, o) : c(r.selector), this
  }
}(jQuery),
function (e) {
  var t = e.fn.off;
  e.fn.off = function (e, n, r) {
    if (e === "resize" && !n && !r)
      for (var i = 0, s = this.length; i < s; i++)
        if (this[i] === window) throw new Error("Error: *all* window 'resize' events being unbound! Check the handler function you are providing.");
    return t.apply(this, arguments)
  }
}(jQuery),
function (e, t, n) {
  function i(e) {
    return e
  }

  function s(e) {
    return decodeURIComponent(e.replace(r, " "))
  }
  var r = /\+/g,
    o = e.cookie = function (r, u, a) {
      if (u !== n) {
        a = e.extend({}, o.defaults, a), u === null && (a.expires = -1);
        if (typeof a.expires == "number") {
          var f = a.expires,
            l = a.expires = new Date;
          l.setDate(l.getDate() + f)
        }
        return typeof a.expires_minutes == "number" && (a.expires = a.expires || new Date, a.expires = new Date(a.expires.getTime() + a.expires_minutes * 1e3 * 60)), u = o.json ? JSON.stringify(u) : String(u), t.cookie = [encodeURIComponent(r), "=", o.raw ? u : encodeURIComponent(u), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
      }
      var c = o.raw ? i : s,
        h = t.cookie.split("; ");
      for (var p = 0, d = h.length; p < d; p++) {
        var v = h[p].split("=");
        if (c(v.shift()) === r) {
          var m = c(v.join("="));
          return o.json ? JSON.parse(m) : m
        }
      }
      return null
    };
  o.defaults = {}, e.removeCookie = function (t, n) {
    return e.cookie(t) !== null ? (e.cookie(t, null, n), !0) : !1
  }
}(jQuery, document),
function () {
  if (!window.console) {
    var e = function () {};
    window.console = {
      log: e,
      debug: e,
      info: e,
      warn: e,
      error: e,
      trace: e,
      dir: e
    }
  }
}();
var Jux = function () {
  this.uA = window.navigator.userAgent.toLowerCase(), this.isSafari = /webkit/.test(this.uA), this.isOpera = /opera/.test(this.uA), this.isIE = /msie/.test(this.uA) && !/opera/.test(this.uA), this.isIE10 = /msie 10.0/.test(this.uA), this.isMoz = /mozilla/.test(this.uA) && !/(compatible|webkit)/.test(this.uA), this.isWebKit = /applewebkit/.test(this.uA), this.isGecko = /gecko/.test(this.uA) && /khtml/.test(this.uA) === !1, this.isKHTML = /khtml/.test(this.uA), this.isMobileSafari = !! this.uA.match(/apple.*mobile.*safari/), this.isMac = /mac/.test(this.uA), this.isWindows = /win/.test(this.uA), this.isLinux = /linux/.test(this.uA), this.isUnix = /x11/.test(this.uA), this.isIPhone = /iphone/.test(this.uA), this.isIPod = /ipod/.test(this.uA), this.isTouch = Modernizr.touch, this.isIPad = this.isTouch && Modernizr.mq("only screen and (min-device-width: 768px) and (max-device-width: 1024px)"), this.isHandheld = this.isTouch && Modernizr.mq("only screen and (min-device-width: 320px) and (max-device-width: 480px)"), this.isTablet = this.isIPad, this.isIOS4 = this.isTouch && /os 4_/.test(this.uA), this.isIOS5 = this.isTouch && /os 5_/.test(this.uA), this.isIOS6 = this.isTouch && /os 6_/.test(this.uA), this.isDesktop = !this.isTouch, this.isIE10 && window.jQuery && $("html").addClass("ie10")
};
Jux.prototype = {
  constructor: Jux,
  blankImgUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  emptyFn: function () {},
  abstractFn: function () {
    throw new Error("method must be implemented in subclass")
  },
  newId: function () {
    var e = 0;
    return function () {
      return ++e
    }
  }(),
  namespace: Kevlar.namespace,
  apply: Class.apply,
  applyIf: Class.applyIf,
  extend: Class.extend,
  isInstanceOf: Class.isInstanceOf,
  isArray: _.isArray,
  isObject: function (e) {
    return !!e && Object.prototype.toString.call(e) === "[object Object]"
  },
  isFunction: _.isFunction,
  isDate: _.isDate,
  isString: function (e) {
    return typeof e == "string"
  },
  isNumber: function (e) {
    return _.isNumber(e) && isFinite(e)
  },
  isBoolean: _.isBoolean,
  isRegExp: _.isRegExp,
  isElement: _.isElement,
  isJQuery: function (e) {
    return e instanceof jQuery
  },
  isDefined: function (e) {
    return typeof e != "undefined"
  },
  isUndefined: _.isUndefined,
  isPrimitive: function (e) {
    return Jux.isString(e) || Jux.isNumber(e) || Jux.isBoolean(e)
  },
  isEmpty: function (e, t) {
    return e === null || e === undefined || Jux.isArray(e) && !e.length || (t ? !1 : e === "")
  },
  clone: Kevlar.util.Object.clone,
  areEqual: Kevlar.util.Object.isEqual,
  getBlankImgUrl: function () {
    return this.blankImgUrl
  },
  getScrollbarSizes: function () {
    var e;
    return function () {
      if (!e) {
        var t = jQuery('<div style="position:absolute;width:100px;height:100px;overflow:scroll;top:-9999px;" />'),
          n = t[0];
        t.appendTo("body"), e = {
          width: n.offsetWidth - n.clientWidth,
          height: n.offsetHeight - n.clientHeight
        }, t.remove()
      }
      return e
    }
  }(),
  getScrollbarWidth: function () {
    return this.getScrollbarSizes().width
  },
  getScrollbarHeight: function () {
    return this.getScrollbarSizes().height
  },
  log: function () {
    return window.console && window.console.log ? function () {
      for (var e = 0, t = arguments.length; e < t; e++) console.log(arguments[e])
    } : Jux.emptyFn
  }(),
  logError: function () {
    return window.console && window.console.error ? function () {
      for (var e = 0, t = arguments.length; e < t; e++) console.error(arguments[e])
    } : Jux.emptyFn
  }()
}, Jux = new Jux, Jux.namespace("Jux.data", "Jux.util"), Jux.Constants = {
  emailRegex: /^(?=.{1,254}$)(?=.{1,64}@.+$)[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([A-Za-z0-9]+([-A-Za-z0-9]+[A-Za-z0-9])?\.)+[A-Za-z0-9]+([-A-Za-z0-9]+[A-Za-z0-9])?\.?$/
}, Jux.util.Observable = Kevlar.util.Observable, Jux.Magickly = {
  GIF_REGEX: /\.gif(\?.*)?$/i,
  convertImageUrl: function (e, t) {
    e.match(this.GIF_REGEX) && (t = {}), t = t || {};
    var n = this.optionsToQueryStr(t);
    n && (n += "&"), n += "src=" + encodeURIComponent(e);
    var r = n.replace(/[&=]/g, "/");
    return Jux.Hosts.magickly + "/q/" + r
  },
  convertImagePathOrUri: function (e, t) {
    t = t || {};
    var n = Jux.util.uri.makeAbsolute(e);
    return this.convertImageUrl(n, t)
  },
  optionsToQueryStr: function (e) {
    e = e || {}, _.isArray(e) || (e = _.map(e, function (e, t) {
      return {
        name: t,
        value: e
      }
    })), e = _.reject(e, function (e) {
      return e.value === !1 || e.value === undefined
    });
    var t = this.EFFECT_WEIGHTS;
    return e = _.sortBy(e, function (e) {
      return e.name in t ? t[e.name] : t.DEFAULT
    }), jQuery.param(e)
  }
}, Jux.Hosts = {
  baseDomain: "jux.com",
  baseHost: "jux.com",
  origin: "https://jux.com",
  magickly: "https://d26houopdteji.cloudfront.net/images"
}, Jux.apply(Function.prototype, {
  createInterceptor: function (e, t) {
    var n = this;
    return Jux.isFunction(e) ? function () {
      var r = this,
        i = arguments;
      return e.target = r, e.method = n, e.apply(t || r || window, i) !== !1 ? n.apply(r || window, i) : null
    } : this
  },
  createSequence: function (e, t) {
    var n = this;
    return typeof e != "function" ? this : function () {
      var r = n.apply(this || window, arguments);
      return e.apply(t || this || window, arguments), r
    }
  },
  createCallback: function () {
    var e = arguments,
      t = this;
    return function () {
      return t.apply(window, e)
    }
  },
  createDelegate: function (e, t, n) {
    var r = this;
    return function () {
      var i = t || arguments;
      if (n === !0) i = Array.prototype.slice.call(arguments, 0), i = i.concat(t);
      else if (Jux.isNumber(n)) {
        i = Array.prototype.slice.call(arguments, 0);
        var s = [n, 0].concat(t);
        Array.prototype.splice.apply(i, s)
      }
      return r.apply(e || window, i)
    }
  },
  defer: function (e, t, n, r) {
    var i = this.createDelegate(t, n, r);
    return e > 0 ? setTimeout(i, e) : (i(), 0)
  }
}), Jux.Util = {
  uuid: function (e, t) {
    var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
      r = [],
      i;
    t = t || n.length;
    if (e)
      for (i = 0; i < e; i++) r[i] = n[0 | Math.random() * t];
    else {
      var s;
      r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4";
      for (i = 0; i < 36; i++) r[i] || (s = 0 | Math.random() * 16, r[i] = n[i == 19 ? s & 3 | 8 : s])
    }
    return r.join("")
  },
  tmpl_cache: {},
  tmpl: function (t, n) {
    try {
      var r = this.tmpl_cache[t];
      if (!r) {
        var i = "var p=[],print=function(){p.push.apply(p,arguments);};with( obj ){ p.push('" + t.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');";
        r = new Function("obj", i), this.tmpl_cache[t] = r
      }
      return r(n)
    } catch (s) {
      throw new Error("Template Error: " + s.message)
    }
  },
  opMap: {
    "jux.com": "production",
    "jux.nu": "development",
    "jux.int": "development",
    "lvh.me": "development",
    ".build.": "testing"
  },
  getModeOfOperation: function () {
    return this.opMap[this.getCurrentOrigin()]
  },
  getCurrentOrigin: function () {
    var e = Jux.Hosts.origin,
      t = this.opMap;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = new RegExp(n);
        if (e.match(r)) return n
      }
    throw new Error("getCurrentOrigin() did not find a mode of operation for the current domain.")
  },
  getEmValueInPxForElement: function (e, t) {
    var n = e.css("font-size").split("px");
    return n.length ? parseInt(n, 10) * t : null
  },
  ellipsis: function (e, t, n) {
    if (e && e.length > t) {
      if (n) {
        var r = e.substr(0, t - 2),
          i = Math.max(r.lastIndexOf(" "), r.lastIndexOf("."), r.lastIndexOf("!"), r.lastIndexOf("?"));
        return i == -1 || i < t - 15 ? e.substr(0, t - 3) + "..." : r.substr(0, i) + "..."
      }
      return e.substr(0, t - 3) + "..."
    }
    return e
  },
  condense: function (e) {
    return e ? (e = Jux.util.Html.stripTags(e), e = e.replace(/\s+/g, " "), e = jQuery.trim(e)) : e = "", e
  },
  loadImages: function (e, t, n) {
    if (!Jux.isArray(e)) return;
    var r = 0,
      i = e.length,
      s, o = function () {
        r++, r >= i && t.call(n || window)
      };
    for (var u = 0; u < i; u++) s = new Image, jQuery(s).on("load error", o), s.src = e[u]
  },
  loadImage: function (e, t, n) {
    this.loadImages([e], t, n)
  },
  throttle: function (e, t, n) {
    var r, i, s = null,
      o, u = 0,
      a = function () {
        u = new Date, s = null
      };
    return function () {
      var o = new Date;
      !u && n === !1 && s === null && (u = o);
      var f = t - (o - u);
      return r = this, i = arguments, f <= 0 ? (clearTimeout(s), s = null, u = o, e.apply(r, i)) : s ? undefined : (s = setTimeout(a, f), e.apply(r, i))
    }
  },
  _windowDim: null,
  getWindowObject: function () {
    return Jux.Util.$window || (Jux.Util.$window = $(window)), Jux.Util.$window
  },
  _getCurrentWindowSize: function () {
    var e = Jux.Util.getWindowObject();
    return {
      width: e.width(),
      height: e.height()
    }
  },
  updateCurrentWindowSizeCache: function () {
    Jux.Util._windowDim = Jux.Util._getCurrentWindowSize()
  },
  getAndUpdateWindowSize: function () {
    return this.updateCurrentWindowSizeCache(), this._windowDim
  },
  getViewportSize: function () {
    if (this._windowDim !== null) return this._windowDim;
    Jux.Util.updateCurrentWindowSizeCache();
    var e = _.debounce(function () {
      this.updateCurrentWindowSizeCache()
    }.createDelegate(Jux.Util), 500);
    return Jux.Util.$window.on("resize", e), this._windowDim
  },
  getQueryString: function (e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = "[\\?&]" + e + "=([^&#]*)",
      n = new RegExp(t),
      r = n.exec(window.location.search);
    return r == null ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
  },
  _mousePos: {
    x: 0,
    y: 0
  },
  getMousePosition: function () {
    return Jux.Util._mousePos
  }
},
function () {
  var e = function (e) {
    Jux.Util._mousePos = {
      x: e.clientX,
      y: e.clientY
    }
  }, t = 100;
  Jux.Util.mouseMoveThrottledDelegate = _.throttle(e.createDelegate(this), t), jQuery(document).on("mousemove", Jux.Util.mouseMoveThrottledDelegate)
}(), Jux.SessionCookieManager = Class.extend(Object, {
  constructor: function (e) {
    this.cookieName = e.cookieName, this.newSession = !this.getCookieVal(), this.sessionDays = e.sessionDays || null, this.sessionMinutes = e.sessionMinutes, this.renewSessionInterval = e.renewSessionInterval || 6e4, this.domain = "." + Jux.Hosts.baseDomain, this.persistCookieValue(), this.cookieUpdateInterval = setInterval(this.persistCookieValue.createDelegate(this), this.renewSessionInterval)
  },
  isNewSession: function () {
    return this.newSession
  },
  getCookieVal: function () {
    return this.cookieVal = $.cookie(this.cookieName)
  },
  getCookieName: function () {
    return this.cookieName
  },
  updateCookie: function (e) {
    $.cookie(this.cookieName, e, {
      expires: this.sessionDays,
      domain: this.domain,
      expires_minutes: this.sessionMinutes,
      path: "/"
    })
  },
  persistCookieValue: function () {
    this.updateCookie(this.getCookieVal() || "-1")
  },
  clearInterval: function () {
    this.cookieUpdateInterval && clearInterval(this.cookieUpdateInterval)
  }
}), Jux.Analytics = {
  CONTENT_CREATOR_COHORT_STARTDATE: new Date("09/01/2011"),
  USERS_COHORT_STARTDATE: new Date("09/01/2011"),
  EVENT_START_DATE: new Date("09/01/2011"),
  userCohortQueryString: "jx_usch",
  gaAccounts: [],
  visitIsFromAnFbInvite: !1,
  authorizeCookieName: "jxauth",
  init: function () {
    this.CURRENT_DATE_FROM_SERVER = window.RailsData.current_server_date, this.sessionWatcher = new Jux.SessionCookieManager({
      sessionMinutes: 30,
      cookieName: "jxssn",
      renewSessionInterval: 2e4
    }), this._loadGoogleAnalytics(), this._loadMixpanel(), this.trackInitialPageView(), this.registerCommonDetails(), this.checkForAuthCookie()
  },
  setContentCreatorAndCurrentUser: function (e) {
    this.setCurrentContentCreator(e.contentCreator), this.setCurrentUser(e.currentUser)
  },
  setCurrentContentCreator: function (e) {
    if (this._setCurrentUserCalled) throw "If both are called, setCurrentContentCreator must be called before setCurrentUser";
    this._setCurrentContentCreatorCalled = !0, this.currentContentCreator = e
  },
  setCurrentUser: function (e) {
    this._setCurrentUserCalled = !0;
    if (!window.mixpanel) {
      Jux.logError("Cannot set mixpanel properties without mixpanel initialized");
      return
    }
    this.currentUser = e, e && this.registerLoggedInUserDetails(e), e || this.registerAnonymousUser(), this.trackVisitorWithMixpanel()
  },
  registerCommonDetails: function () {
    mixpanel.register({
      event_week: this._getWeeksFromDate(this.EVENT_START_DATE, this.CURRENT_DATE_FROM_SERVER),
      event_day: this._getDaysFromDate(this.EVENT_START_DATE, this.CURRENT_DATE_FROM_SERVER),
      isNewSession: this.sessionWatcher.isNewSession()
    })
  },
  registerUtmDataWithUser: function () {
    var e = Jux.Util.getQueryString("utm_campaign"),
      t = Jux.Util.getQueryString("utm_source");
    e && mixpanel.register_once({
      u_utm_campaign: e,
      u_utm_campaign: t
    })
  },
  registerLoggedInUserDetails: function (e) {
    if (!e instanceof app.models.User) {
      Jux.logError("Must be passed a valid user model");
      return
    }
    var t = e.get("created_at"),
      n = e.get("username"),
      r, i = this.getUsersCohortGroup();
    mixpanel.name_tag(n), mixpanel.register({
      created_at: t,
      logged_in: !0,
      has_fullview: e.get("fullview")
    }), i && mixpanel.register({
      users_cohort_group: i
    }), mixpanel.get_property && (r = mixpanel.get_property("content_creator_cohort_group")) && mixpanel.register_once({
      content_creator_cohort_group: r
    }), mixpanel.people.identify(e.getId()), mixpanel.people.set({
      $created: t,
      $email: e.get("email"),
      $last_login: e.get("current_sign_in_at"),
      $name: e.get("displayname"),
      $username: n
    })
  },
  registerAnonymousUser: function () {
    this.currentUser || (mixpanel.register({
      logged_in: !1
    }), this.registerAnonymousUserWithCohort())
  },
  registerAnonymousUserWithCohort: function () {
    if (!this.currentContentCreator || this.currentUser) return;
    var e = this.currentContentCohort = this.getContentCreatorCohortGroup();
    if (e) {
      if (typeof mixpanel.get_property == "function" && mixpanel.get_property("created_at") || typeof mixpanel.register == "undefined") return;
      this.sessionWatcher.isNewSession() && this.registerUserWithContentCohort(e)
    }
  },
  registerUserWithContentCohort: function (e) { !! e && (this.sessionWatcher.isNewSession() || this.visitIsFromAnFbInvite) && mixpanel.register({
      content_creator_cohort_group: e
    })
  },
  trackDisconnectSocial: function (e) {
    e && this.trackSocial(e, "disconnect", document.location.href)
  },
  trackConnectSocial: function (e) {
    e && this.trackSocial(e, "connect", document.location.href)
  },
  getUserValues: function () {
    return !typeof mixpanel.get_property === "function" ? (Jux.log("mixpanel.get_property not accessible"), null) : (this._user = {
      content_creator_cohort: mixpanel.get_property("content_creator_cohort_group"),
      user_cohort: mixpanel.get_property("users_cohort_group")
    }, this._user)
  },
  _getWeeksFromDate: function (e, t) {
    var e = new Date(e),
      t = new Date(t),
      n = e.getTime(),
      r = t.getTime(),
      i = 6048e5,
      s, o = [(new Date(null)).toString(), "Invalid Date"],
      u = _.filter([e, t], function (e) {
        for (var t = 0; t < o.length; t++)
          if (e.toString() === o[t]) return !0
      });
    if (u.length !== 0) return null;
    if (r < n) return null;
    var a = e.getTime(),
      f = t.getTime(),
      l = f - a;
    return Math.floor(l / i)
  },
  _getDaysFromDate: function (e, t) {
    var e = new Date(e),
      t = new Date(t),
      n = e.getTime(),
      r = t.getTime(),
      i = 864e5,
      s, o = [(new Date(null)).toString(), "Invalid Date"],
      u = _.filter([e, t], function (e) {
        for (var t = 0; t < o.length; t++)
          if (e.toString() === o[t]) return !0
      });
    if (u.length !== 0) return null;
    if (r < n) return null;
    var a = e.getTime(),
      f = t.getTime(),
      l = f - a;
    return Math.floor(l / i)
  },
  getContentCreatorCohortGroup: function () {
    if (!this.currentContentCreator) return null;
    var e = this.currentContentCreator.get("created_at"),
      t = this._getWeeksFromDate(this.CONTENT_CREATOR_COHORT_STARTDATE, e);
    return typeof t == "number" && (t += 1), t
  },
  getUsersCohortGroup: function () {
    if (!this.currentUser) return null;
    var e = this.currentUser.get("created_at"),
      t = this._getWeeksFromDate(this.USERS_COHORT_STARTDATE, e);
    return typeof t == "number" && (t += 1), t
  },
  getInviteQueryString: function () {
    var e = this.getUsersCohortGroup(),
      t = this.userCohortQueryString + "=" + e;
    return e ? t : ""
  },
  trackWithMixpanel: function (e) {
    if (_.isArray(e)) switch (e[0]) {
    case "auth":
      mixpanel.track(e[0], {
        context: e[1],
        channel: e[2]
      }, this.onAuthTracked.createDelegate(this));
      break;
    case "invite":
      mixpanel.track(e[0], {
        action: e[1],
        channel: e[2],
        count: e[3]
      });
      break;
    case "social":
      mixpanel.track(e[0], {
        network: e[1].split("-")[0],
        action: e[1].split("-")[1],
        target: e[2]
      })
    } else switch (e) {
    case "createQuark":
      mixpanel.track(e, {
        get_started_page: arguments[1] || !1
      })
    }
  },
  trackVisitorAsFbInvite: function () {
    var e = Jux.Util.getQueryString(this.userCohortQueryString);
    e && this.registerUserWithContentCohort(e), mixpanel.track("Visitor-fbinvite", {
      url: document.location.href
    }), this.trackedVisitorWithMixpanel = !0
  },
  trackVisitorWithMixpanel: function () {
    this.canSaveVisitorWithMixpanel() && (this.visitIsFromAnFbInvite ? this.trackVisitorAsFbInvite() : mixpanel.track("Visitor", {
      url: document.location.href
    }), this.trackedVisitorWithMixpanel = !0)
  },
  trackedVisitorWithMixpanel: !1,
  canSaveVisitorWithMixpanel: function () {
    return this.trackedVisitorWithMixpanel || this.sessionWatcher.isNewSession() == 0 ? !1 : Jux.Util.getQueryString("utm_campaign") === "fb-invite" ? (this.visitIsFromAnFbInvite = !0, !0) : window.location.host === "jux.com" || window.location.host === "surf.jux.com" || window.location.host === "sam.jux.nu:3000" ? !1 : !0
  },
  trackCreateQuark: function (e) {
    e ? this.trackWithMixpanel("createQuark", !0) : this.trackWithMixpanel("createQuark")
  },
  trackEvent: function () {
    var e = _.toArray(arguments);
    this.trackWithMixpanel(e), e.unshift("_trackEvent"), this._pushGACommands(e)
  },
  trackSocial: function (e, t, n) {
    this._pushGACommands(["_trackSocial", e, t, n]), this.trackEvent("social", e + "-" + t, n)
  },
  checkForAuthCookie: function () {
    var e = $.cookie(this.authorizeCookieName),
      t, n;
    e && (t = e.split("|"), n = ["auth", t[0], t[1]], this.trackWithMixpanel(n), n.unshift("_trackEvent"), this._pushGACommands(n))
  },
  onAuthTracked: function () {
    $.cookie(this.authorizeCookieName, null, {
      domain: "." + Jux.Hosts.baseDomain
    })
  },
  trackAuthorizeEvent: function (e, t) {
    var n = e + "|" + t;
    $.cookie(this.authorizeCookieName, n, {
      expires: 90,
      domain: "." + Jux.Hosts.baseDomain
    })
  },
  _loadGoogleAnalytics: function () {
    window._gaq = window._gaq || [];
    if (!window._gat) {
      this.addAccount(this.getUAString());
      var e = document.createElement("script");
      e.type = "text/javascript", e.async = !0, e.src = (document.location.protocol === "https:" ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
      var t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e, t)
    }
  },
  _loadMixpanel: function () {
    (function (e, t) {
      window.mixpanel = t;
      var n, r, i, s;
      n = e.createElement("script"), n.type = "text/javascript", n.async = !0, n.src = ("https:" === e.location.protocol ? "https:" : "http:") + "//cdn.mxpnl.com/libs/mixpanel-2.1.min.js", r = e.getElementsByTagName("script")[0], r.parentNode.insertBefore(n, r), t._i = [], t.init = function (e, n, r) {
        function o(e, t) {
          var n = t.split(".");
          2 == n.length && (e = e[n[0]], t = n[1]), e[t] = function () {
            e.push([t].concat(Array.prototype.slice.call(arguments, 0)))
          }
        }
        var u = t;
        "undefined" != typeof r ? u = t[r] = [] : r = "mixpanel", u.people = u.people || [], i = ["disable", "track", "track_pageview", "track_links", "track_forms", "register", "register_once", "unregister", "identify", "name_tag", "set_config", "people.identify", "people.set", "people.increment"];
        for (s = 0; s < i.length; s++) o(u, i[s]);
        t._i.push([e, n, r])
      }, t.__SV = 1.1
    })(document, window.mixpanel || []);
    var e = {
      production: "333489a446c15de8335534947efcd4fe",
      development: "455be89d39ec71233eb422dae1240d5a",
      testing: "963f3ed59bef40ae826ac73b61edfaf0"
    };
    mixpanel.init(e[Jux.Util.getModeOfOperation()])
  },
  _pushGACommands: function () {
    for (var e = 0; e < this.gaAccounts.length; e++) this._pushGACommandsToAcct(e, arguments)
  },
  _pushGACommandsToAcct: function (e, t) {
    var n = _.map(t, function (t) {
      return t = t.slice(0), t[0] = "t" + e + "." + t[0], t
    });
    _gaq.push.apply(_gaq, n)
  },
  removeAccount: function (e) {
    var t = _.indexOf(this.gaAccounts, e);
    t > -1 && this.gaAccounts.splice(t, 1)
  },
  addAccount: function (e, t) {
    var n = this.gaAccounts;
    if (_.indexOf(n, e) > -1) return !1;
    var r = n.push(e),
      i = [
        ["_setAccount", e],
        ["_setDomainName", this.getDomain()],
        ["_setAllowLinker", !0]
      ];
    return t && i.push(["_trackPageview"]), this._pushGACommandsToAcct(r - 1, i), !0
  },
  trackPageView: function () {
    this._pushGACommands(["_trackPageview"])
  },
  trackInitialPageView: function () {
    if (this.firstViewTracked) return;
    this.firstViewTracked = !0, this.trackPageView(), Jux.Util.getQueryString("utm_campaign") === "fb-invite" && this.sessionWatcher.isNewSession() && this.trackVisitorAsFbInvite()
  },
  getUAString: function () {
    var e = {
      production: "UA-4454143-6",
      development: "UA-4454143-12",
      testing: "UA-5426741-3"
    };
    return e[Jux.Util.getModeOfOperation()]
  },
  getDomain: function () {
    var e = window.location.hostname.split(".");
    return "." + e[e.length - 2] + "." + e[e.length - 1]
  }
}, Jux.Analytics.init(), Jux.AppIds = {
  facebook: "163259900390076",
  google: "AIzaSyDfLVogveSnJSRbBfTVTgVdJuK-4iCRF2A"
}, Jux.Cdn = {
  BASE_URI: "https://d3kstbadygo5b1.cloudfront.net/"
}, Jux.Css = {
  SIDES_MAP: {
    t: "top",
    r: "right",
    b: "bottom",
    l: "left"
  },
  hashToString: function (e) {
    var t = /([A-Z])/g,
      n = "",
      r;
    for (var i in e) e.hasOwnProperty(i) && (r = i.replace(t, "-$1").toLowerCase(), n += r + ":" + e[i] + ";");
    return n
  },
  updateStyleEl: function (e, t) {
    var n = jQuery(e);
    if (Jux.isIE)
      for (var r = 0, i = n.length; r < i; r++) n[r].styleSheet.cssText = t;
    else n.text(t)
  },
  getPadding: function (e, t) {
    return this.sumSides(jQuery(e), "padding", t)
  },
  getMargin: function (e, t) {
    return this.sumSides(jQuery(e), "margin", t)
  },
  getBorderWidth: function (e, t) {
    return this.sumSides(jQuery(e), "border", t, "width")
  },
  getFrameSize: function (e, t) {
    return this.getPadding(e, t) + this.getMargin(e, t) + this.getBorderWidth(e, t)
  },
  sumSides: function (e, t, n, r) {
    var i = 0,
      s = this.SIDES_MAP,
      o = jQuery(e);
    r = r ? "-" + r : "";
    for (var u = 0, a = n.length; u < a; u++) i += parseInt(o.css(t + "-" + s[n.charAt(u)] + r), 10);
    return i
  }
}, Jux.Date = {
  toISO8601: function (e) {
    var t = e.getUTCFullYear(),
      n = e.getUTCMonth() + 1,
      r = e.getUTCDate(),
      i = e.getUTCHours(),
      s = e.getUTCMinutes(),
      o = e.getUTCSeconds();
    return n = n < 10 ? "0" + n : n, r = r < 10 ? "0" + r : r, i = i < 10 ? "0" + i : i, s = s < 10 ? "0" + s : s, o = o < 10 ? "0" + o : o, t + "/" + n + "/" + r + " " + i + ":" + s + ":" + o + " +0000"
  }
}, Jux.Email = {
  isValid: function (e) {
    return Jux.Constants.emailRegex.test(e)
  }
}, Jux.Facebook = {
  initDeferred: undefined,
  init: function () {
    if (!this.initDeferred) {
      var e;
      typeof FB == "undefined" ? e = this.asyncLoad() : e = jQuery.Deferred().resolve(), e = e.pipe(this.afterLoad.createDelegate(this)), this.initDeferred = e
    }
    return this.initDeferred
  },
  afterLoad: function () {
    var e = this.isKnownAccount();
    if (!e) {
      var t = this;
      FB.Event.subscribe("auth.statusChange", function (e) {
        (e.status === "connected" || e.status === "not_authorized") && t.setKnownAccount()
      })
    }
    FB.init({
      appId: Jux.AppIds.facebook,
      channelUrl: Jux.util.uri.getWindowOrigin() + "/facebook/channel.html",
      status: !e,
      cookie: !0
    })
  },
  asyncLoad: function () {
    var e = jQuery.Deferred(),
      t = this;
    return window.fbAsyncInit = function () {
      window.fbAsyncInit = null, e.resolve()
    },
    function (e, t) {
      var n, r = "facebook-jssdk",
        i = e.getElementsByTagName("script")[0];
      if (e.getElementById(r)) return;
      n = e.createElement("script"), n.id = r, n.async = !0, n.src = "//connect.facebook.net/en_US/all" + (t ? "/debug" : "") + ".js", i.parentNode.insertBefore(n, i)
    }(document, !1), e
  },
  getLoginStatus: function () {
    return this.init().pipe(function () {
      var e = jQuery.Deferred();
      return FB.getLoginStatus(function (t) {
        e.resolve(t)
      }), e
    })
  },
  isKnownAccount: function () {
    return !!$.cookie("hasFbAccount")
  },
  setKnownAccount: function () {
    $.cookie("hasFbAccount", !0, {
      expires: 365
    })
  }
}, Jux.FontLoader = Jux.extend(Jux.util.Observable, {
  webFontLoader: typeof WebFont != "undefined" ? WebFont : null,
  batchSize: Jux.isIE ? 5 : 0,
  styleMappings: {},
  loadedFonts: {},
  constructor: function () {
    this.addEvents("fontsload")
  },
  setWebFontLoader: function (e) {
    this.webFontLoader = e, this.verifyWebFontLoader()
  },
  verifyWebFontLoader: function () {
    if (!this.webFontLoader) throw new Error("'webFontLoader' not set");
    if (!this.webFontLoader.load) throw new Error("improper 'webFontLoader' (no 'load' method)")
  },
  setBatchSize: function (e) {
    this.batchSize = e
  },
  setStyleMappings: function (e) {
    this.styleMappings = e
  },
  markFontsLoaded: function (e) {
    for (var t = 0, n = e.length; t < n; t++) this.loadedFonts[e[t]] = !0
  },
  resetLoadedFonts: function () {
    this.loadedFonts = {}
  },
  load: function (e) {
    this.verifyWebFontLoader(), Jux.isArray(e) || (e = [e]), e = this.removeLoadedFonts(e);
    if (e.length > 0) {
      var t = this.batchSize;
      if (t > 0)
        while (e.length > t) {
          var n = e.splice(0, t);
          this.load(n)
        }
      this.webFontLoader.load({
        google: {
          families: this.mapFonts(e)
        },
        active: function () {
          this.fireEvent("fontsload", this)
        }.createDelegate(this)
      }), this.markFontsLoaded(e)
    }
  },
  removeLoadedFonts: function (e) {
    var t = this.loadedFonts,
      n = [];
    for (var r = 0, i = e.length; r < i; r++) {
      var s = e[r];
      t[s] || n.push(s)
    }
    return n
  },
  mapFonts: function (e) {
    var t = this.styleMappings,
      n = [];
    for (var r = 0, i = e.length; r < i; r++) {
      var s = e[r];
      t[s] && (s = s + ":" + t[s]), n.push(s)
    }
    return n
  }
}), Jux.FontLoader = new Jux.FontLoader, Jux.Google = Jux.util.Observable.extend({
  mapsApiRequested: !1,
  mapsApiLoaded: !1,
  constructor: function () {
    this._super(), this.addEvents("mapsapiload")
  },
  isMapsApiRequested: function () {
    return this.mapsApiRequested
  },
  isMapsApiLoaded: function () {
    return this.mapsApiLoaded
  },
  loadMapsApi: function () {
    var e = this;
    e.mapsApiRequested || (e.mapsApiRequested = !0, window.onGoogleMapsApiReady = function () {
      e.mapsApiLoaded = !0, e.onMapsApiReady(), window.onGoogleMapsApiReady = null
    }, jQuery('<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=' + Jux.AppIds.google + ' + &libraries=places&sensor=true&callback=onGoogleMapsApiReady"></script>').appendTo("body"))
  },
  onMapsApiReady: function () {
    this.fireEvent("mapsapiload")
  },
  createStaticMapImageUrl: function (e) {
    var t = this.stringifyLatLng(e.center),
      n = e.markers,
      r = "";
    return n && (n = this.stringifyLatLng(n), r += "&markers=" + n), "https://maps.googleapis.com/maps/api/staticmap?center=" + t + "&size=" + e.width + "x" + e.height + "&zoom=" + e.zoom + r + "&sensor=false"
  },
  createStaticStreetViewImageUrl: function (e) {
    var t = this.stringifyLatLng(e.location);
    return "https://maps.googleapis.com/maps/api/streetview?location=" + t + "&size=" + e.width + "x" + e.height + "&heading=" + e.heading + "&pitch=" + e.pitch + "&sensor=false"
  },
  stringifyLatLng: function (e) {
    return typeof e == "object" && (window.google && e instanceof google.maps.LatLng ? e = e.lat() + "," + e.lng() : e = e.lat + "," + e.lng), e
  }
}), Jux.Google = new Jux.Google, Jux.Hash = {
  lastHash: "",
  hashValuesMap: {},
  getHashValuesMap: function () {
    var e = window.location.hash.substr(1),
      t = this.hashValuesMap,
      n, r;
    e = e.replace(/#/g, "&");
    if (e !== this.lastHash) {
      t = {}, n = e.split("&");
      for (var i = 0, s = n.length; i < s; i++) r = n[i].split("="), t[r[0]] = r[1] || "";
      this.lastHash = e, this.hashValuesMap = t
    }
    return t
  },
  hasKey: function (e) {
    var t = this.getHashValuesMap();
    return e in t
  },
  get: function (e) {
    var t = this.getHashValuesMap();
    return t[e] || ""
  },
  remove: function (e) {
    var t = window.location.hash.substr(1),
      n = new RegExp("(^|&|#)" + e + "(=[^&]*)?");
    t = t.replace(n, ""), t.charAt(0) === "&" && (t = t.substr(1)), window.location.hash = t
  }
}, Jux.Licenses = {
  LICENSE_TEXT_MAP: {
    r: "All rights reserved.",
    "http://creativecommons.org/licenses/by/3.0": "Free for anyone to use.",
    "http://creativecommons.org/licenses/by-nc/3.0": "Free for non-commercial use.",
    "http://creativecommons.org/licenses/by/2.0": "Free for anyone to use.",
    "http://creativecommons.org/licenses/by-nd/2.0": "Free for anyone to use, but not modify.",
    "http://creativecommons.org/licenses/by-nc-nd/2.0": "Free for non-commercial use. Do not modify.",
    "http://creativecommons.org/licenses/by-nc/2.0": "Free for non-commercial use.",
    "http://creativecommons.org/licenses/by-nc-sa/2.0": "Free for non-commercial use. Share forward.",
    "http://creativecommons.org/licenses/by-sa/2.0": "Free for anyone to use. Share forward.",
    "http://www.flickr.com/commons/usage": "Free for anyone to use.",
    "http://www.usa.gov/copyright.shtml": "Free for anyone to use."
  },
  getLicenseText: function (e) {
    return e = Jux.util.uri.chompSlash(e), this.LICENSE_TEXT_MAP[e] || null
  }
}, Jux.Share = {
  createMailtoUrl: function (e, t, n) {
    return t = Jux.util.Html.decode(t), n = Jux.util.Html.decode(n), "mailto:" + encodeURIComponent(e || "") + "?subject=" + encodeURIComponent(t || "") + "&body=" + encodeURIComponent(n || "")
  },
  getShareUrl: function (e) {
    return e || (e = Jux.util.uri.getWindowOrigin() + window.location.pathname), Jux.util.uri.makeAbsolute(e)
  },
  email: function (e) {
    e = e || {};
    var t = this.createMailtoUrl(e.to, e.subject, e.message);
    !e.newWindow && "newWindow" in e ? window.location = t : window.open(t);
    var n = "email";
    e.source && (n = e.source + "_" + n), Jux.Analytics.trackSocial("jux", n, this.getShareUrl())
  },
  facebookShare: function (e, t) {
    e = _.clone(e) || {};
    var n = this.getShareUrl();
    _.defaults(e, {
      app_id: Jux.AppIds.facebook,
      display: "popup",
      link: n,
      redirect_uri: Jux.Hosts.origin + "/facebook/share_callback",
      ref: t.replace(/[\-_]/g, ",")
    }), e.name = e.name ? Jux.util.Html.stripTags(e.name) : "", e.properties && typeof JSON != "undefined" && JSON.stringify && (e.properties = JSON.stringify(e.properties));
    var r = "http://www.facebook.com/dialog/feed?" + jQuery.param(e);
    window.open(r, "fbShare", "width=480,height=220,location=no,toolbar=no"), Jux.Analytics.trackSocial("facebook", t + "_share", n)
  },
  tweet: function (e, t) {
    t = t || {};
    var n, r = n ? n.length : 15;
    r += 21, e = Jux.util.Html.stripTags(e), e = e.replace(/\n/g, " "), e = Jux.Util.ellipsis(e, 140 - r, !0), n && (e += " " + n);
    var i = this.getShareUrl(t.shareUrl),
      s = "http://twitter.com/intent/tweet?url=" + encodeURIComponent(i) + "&text=" + encodeURIComponent(e) + (n ? "" : "&via=JuxDotCom") + "&related=JuxDotCom";
    if (t.authorize) {
      var o = t.scope || this;
      window.twitterOauthCallback = function (e, n) {
        return t.callback && t.callback.call(o, n.nickname), window.twitterOauthCallback = null, s
      }, window.open("/auth/twitter?callback=twitterOauthCallback")
    } else window.open(s);
    var u = "tweet";
    t.source && (u = t.source + "_" + u), Jux.Analytics.trackSocial("twitter", u, i)
  }
}, Jux.util.DelayedTask = Kevlar.util.DelayedTask, Jux.util.Html = {
  encode: function (e) {
    return e ? String(e).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") : e
  },
  decode: function (e) {
    return e ? String(e).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;/g, " ") : e
  },
  stripTags: function (e) {
    return e ? String(e).replace(/<[^>]+>/g, "") : e
  },
  nl2br: function (e) {
    return e.replace(/\n/gim, "<br />")
  },
  clamp: function (e) {
    e.ellipsis(), Jux.FontLoader.on("fontsload", function () {
      e.ellipsis()
    })
  }
}, Jux.util.TaskRunner = function (e) {
  e = e || 10;
  var t = [],
    n = [],
    r = 0,
    i = !1,
    s = function () {
      i = !1, clearInterval(r), r = 0
    }, o = function () {
      i || (i = !0, r = setInterval(a, e))
    }, u = function (e) {
      n.push(e), e.onStop && e.onStop.apply(e.scope || e)
    }, a = function () {
      var e = n.length,
        r = (new Date).getTime();
      if (e > 0) {
        for (var i = 0; i < e; i++) t.remove(n[i]);
        n = [];
        if (t.length < 1) {
          s();
          return
        }
      }
      for (var i = 0, o, a, f, l = t.length; i < l; ++i) {
        o = t[i], a = r - o.taskRunTime;
        if (o.interval <= a) {
          f = o.run.apply(o.scope || o, o.args || [++o.taskRunCount]), o.taskRunTime = r;
          if (f === !1 || o.taskRunCount === o.repeat) {
            u(o);
            return
          }
        }
        o.duration && o.duration <= r - o.taskStartTime && u(o)
      }
    };
  this.start = function (e) {
    return t.push(e), e.taskStartTime = (new Date).getTime(), e.taskRunTime = 0, e.taskRunCount = 0, o(), e
  }, this.stop = function (e) {
    return u(e), e
  }, this.stopAll = function () {
    s();
    for (var e = 0, r = t.length; e < r; e++) t[e].onStop && t[e].onStop();
    t = [], n = []
  }
}, Jux.TaskMgr = new Jux.util.TaskRunner, Jux.util.lang = {
  escapeSpecialChars: function (e) {
    return String(e).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\'/g, "\\'").replace(/\"/g, '\\"')
  },
  pluralize: function (e, t, n) {
    var r = e.toString() + " ";
    return e === 1 ? r += t : r += n || t + "s", r
  },
  keysToArray: Kevlar.util.Object.keysToArray,
  valuesToArray: function (e) {
    var t = [],
      n;
    for (n in e) e.hasOwnProperty(n) && t.push(e[n]);
    return t
  }
}, Jux.util.Uri = {
  getWindowOrigin: function () {
    var e = window.location;
    return e.protocol + "//" + e.host
  },
  getFolder: function (e) {
    return e.replace(/\/[^\/]*$/, "/")
  },
  getFile: function (e) {
    return e.replace(/.*\//, "")
  },
  getParent: function (e) {
    return e.replace(/\/[^\/]*\/?$/, "/")
  },
  isAbsoluteUrl: function (e) {
    return !!e.match(/^https?:\/\//)
  },
  isRelativeUrl: function (e) {
    return !e.match(/^https?:\/\//) && !e.match(/^\//)
  },
  normalize: function (e, t) {
    return e = e.replace(/\/\/*/g, "/"), e = e.replace(/http:\/(?=[^\/])/, "http://"), e = e.replace(/%20/g, " "), t && (e = Jux.util.uri.chompSlash(e)), e
  },
  makeAbsolute: function (e, t) {
    if (this.isAbsoluteUrl(e)) return e;
    if (e.charAt(0) === "/") return e = e.replace(/^\//, ""), this.addTrailingSlash(t || Jux.util.uri.getWindowOrigin()) + e;
    if (t) throw new Error("If including a baseUrl, please prefix the uri with a slash.");
    return e.match(/^http/) || (e = "http://" + e), e
  },
  isOnDomain: function (e) {
    var t = window.location.hostname;
    return e === t || "www." + e === t
  },
  addProtocol: function (e, t) {
    if (!t) throw new Error("'protocol' arg required");
    var n = e.charAt(0);
    return n === "/" || n === "#" || n === "?" ? e : (/\w{3,9}:\/\//.test(e) || (e = t + "://" + e), e)
  },
  chompSlash: function (e) {
    return e.replace(/[\/\\]*$/, "")
  },
  addTrailingSlash: function (e) {
    return e.charAt(e.length - 1) !== "/" ? e + "/" : e
  },
  isInJuxDomain: function (e) {
    return e.indexOf(this.getJuxDomain()) > -1 ? !0 : !1
  },
  getJuxDomain: function () {
    return Jux.Hosts.origin
  }
}, Jux.util.uri = Jux.util.Uri,
function () {
  _(document.domain).endsWith(Jux.Hosts.baseDomain) && (document.domain = Jux.Hosts.baseDomain)
}(), Jux.Magickly.BASE_VIEWPORT_WIDTH = 1440, Jux.Magickly.EFFECT_WEIGHTS = {
  mustachify: 0,
  mirror_in: 1,
  mirror_out: 2,
  rotate: 3,
  trim_border: 7,
  trim_letterbox: 5,
  big_background: 6,
  fit_width: 8,
  resize: 9,
  thumb: 10,
  flop: 11,
  greyscale: 12,
  cross_process: 13,
  lomo: 14,
  DEFAULT: 15,
  tilt_shift: 16,
  blur: 17,
  gaussian_blur: 18,
  quality: 19,
  interlace: 20
}, Jux.Magickly.QUALITY_BLUR = .05, Jux.Magickly.VIEWPORT_HEIGHT_UPPER_BOUNDS_BY_WIDTH = {
  1024: [615, 922, 1434],
  1280: [768, 1152, 1792],
  1440: [864, 1296, 2016],
  2560: [1536, 2304, 3584],
  1920: [1152, 1728, 2688],
  1680: [1008, 1512, 2352],
  1366: [820, 1230, 1913]
}, Jux.Magickly.VIEWPORT_WIDTH_UPPER_BOUNDS = [1024, 1280, 1366, 1440, 1680, 1920, 2560], Jux.Magickly.QUARK_IMAGE_QUALITY = 83,
function () {
  function e() {
    var e = null,
      t = Jux.Hosts.baseDomain;
    window.location.hostname.indexOf(t) != -1 && (e = "." + t), $.cookie("viewport_size", $(window).width() + "x" + $(window).height(), {
      domain: e,
      path: "/"
    })
  }
  $(window).resize(_.debounce(e, 300)), e()
}(),
function () {
  var e = "isScrolling",
    t = "isNotScrolling",
    n = 0,
    r = !1,
    i = 500,
    s = 500,
    o = $("html");
  $(document).ready(function () {
    o.addClass(t)
  }), $(window).on("scroll", _.throttle(function () {
    r || (o.addClass(e), o.removeClass(t), r = !0)
  }, s)).on("scroll", _.debounce(function () {
    r && (o.removeClass(e), o.addClass(t), r = !1)
  }, i))
}(),
function (e) {
  var t = function () {
    var t = {}, n, r = 65,
      i, s = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
      o = {
        eventName: "click",
        onShow: function () {},
        onBeforeShow: function () {},
        onHide: function () {},
        onChange: function () {},
        onSubmit: function () {},
        color: "ff0000",
        livePreview: !0,
        flat: !1
      }, u = function (t, n) {
        var r = q(t);
        e(n).data("colorpicker").fields.eq(1).val(r.r).end().eq(2).val(r.g).end().eq(3).val(r.b).end()
      }, a = function (t, n) {
        e(n).data("colorpicker").fields.eq(4).val(t.h).end().eq(5).val(t.s).end().eq(6).val(t.b).end()
      }, f = function (t, n) {
        e(n).data("colorpicker").fields.eq(0).val(U(t)).end()
      }, l = function (t, n) {
        e(n).data("colorpicker").selector.css("backgroundColor", "#" + U({
          h: t.h,
          s: 100,
          b: 100
        })), e(n).data("colorpicker").selectorIndic.css({
          left: parseInt(150 * t.s / 100, 10),
          top: parseInt(150 * (100 - t.b) / 100, 10)
        })
      }, c = function (t, n) {
        e(n).data("colorpicker").hue.css("top", parseInt(150 - 150 * t.h / 360, 10))
      }, h = function (t, n) {
        e(n).data("colorpicker").currentColor.css("backgroundColor", "#" + U(t))
      }, p = function (t, n) {
        e(n).data("colorpicker").newColor.css("backgroundColor", "#" + U(t))
      }, d = function (t) {
        var n = t.charCode || t.keyCode || -1;
        if (n > r && n <= 90 || n == 32) return !1;
        var i = e(this).parent().parent();
        i.data("colorpicker").livePreview === !0 && v.apply(this)
      }, v = function (t) {
        var n = e(this).parent().parent(),
          r;
        this.parentNode.className.indexOf("_hex") > 0 ? n.data("colorpicker").color = r = F(B(this.value)) : this.parentNode.className.indexOf("_hsb") > 0 ? n.data("colorpicker").color = r = P({
          h: parseInt(n.data("colorpicker").fields.eq(4).val(), 10),
          s: parseInt(n.data("colorpicker").fields.eq(5).val(), 10),
          b: parseInt(n.data("colorpicker").fields.eq(6).val(), 10)
        }) : n.data("colorpicker").color = r = I(H({
          r: parseInt(n.data("colorpicker").fields.eq(1).val(), 10),
          g: parseInt(n.data("colorpicker").fields.eq(2).val(), 10),
          b: parseInt(n.data("colorpicker").fields.eq(3).val(), 10)
        })), t && (u(r, n.get(0)), f(r, n.get(0)), a(r, n.get(0))), l(r, n.get(0)), c(r, n.get(0)), p(r, n.get(0)), n.data("colorpicker").onChange.apply(n, [r, U(r), q(r)])
      }, m = function (t) {
        var n = e(this).parent().parent();
        n.data("colorpicker").fields.parent().removeClass("colorpicker_focus")
      }, g = function () {
        r = this.parentNode.className.indexOf("_hex") > 0 ? 70 : 65, e(this).parent().parent().data("colorpicker").fields.parent().removeClass("colorpicker_focus"), e(this).parent().addClass("colorpicker_focus")
      }, y = function (t) {
        var n = e(this).parent().find("input").focus(),
          r = {
            el: e(this).parent().addClass("colorpicker_slider"),
            max: this.parentNode.className.indexOf("_hsb_h") > 0 ? 360 : this.parentNode.className.indexOf("_hsb") > 0 ? 100 : 255,
            y: t.pageY,
            field: n,
            val: parseInt(n.val(), 10),
            preview: e(this).parent().parent().data("colorpicker").livePreview
          };
        e(document).bind("mouseup", r, w), e(document).bind("mousemove mousedown", r, b)
      }, b = function (e) {
        return e.data.field.val(Math.max(0, Math.min(e.data.max, parseInt(e.data.val + e.pageY - e.data.y, 10)))), e.data.preview && v.apply(e.data.field.get(0), [!0]), !1
      }, w = function (t) {
        return v.apply(t.data.field.get(0), [!0]), t.data.el.removeClass("colorpicker_slider").find("input").focus(), e(document).unbind("mouseup", w), e(document).unbind("mousemove mousedown", b), !1
      }, E = function (t) {
        var n = {
          cal: e(this).parent(),
          y: e(this).offset().top
        };
        n.preview = n.cal.data("colorpicker").livePreview, e(document).bind("mouseup", n, x), e(document).bind("mousemove mousedown", n, S)
      }, S = function (e) {
        return v.apply(e.data.cal.data("colorpicker").fields.eq(4).val(parseInt(360 * (150 - Math.max(0, Math.min(150, e.pageY - e.data.y))) / 150, 10)).get(0), [e.data.preview]), !1
      }, x = function (t) {
        return u(t.data.cal.data("colorpicker").color, t.data.cal.get(0)), f(t.data.cal.data("colorpicker").color, t.data.cal.get(0)), e(document).unbind("mouseup", x), e(document).unbind("mousemove mousedown", S), !1
      }, T = function (t) {
        var n = {
          cal: e(this).parent(),
          pos: e(this).offset()
        };
        n.preview = n.cal.data("colorpicker").livePreview, e(document).bind("mouseup", n, C), e(document).bind("mousemove mousedown", n, N)
      }, N = function (e) {
        return v.apply(e.data.cal.data("colorpicker").fields.eq(6).val(parseInt(100 * (150 - Math.max(0, Math.min(150, e.pageY - e.data.pos.top))) / 150, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(150, e.pageX - e.data.pos.left)) / 150, 10)).get(0), [e.data.preview]), !1
      }, C = function (t) {
        return u(t.data.cal.data("colorpicker").color, t.data.cal.get(0)), f(t.data.cal.data("colorpicker").color, t.data.cal.get(0)), e(document).unbind("mouseup", C), e(document).unbind("mousemove mousedown", N), !1
      }, k = function (t) {
        e(this).addClass("colorpicker_focus")
      }, L = function (t) {
        e(this).removeClass("colorpicker_focus")
      }, A = function (t) {
        var n = e(this).parent(),
          r = n.data("colorpicker").color;
        n.data("colorpicker").origColor = r, h(r, n.get(0)), n.data("colorpicker").onSubmit(r, U(r), q(r), n.data("colorpicker").el)
      }, O = function (t) {
        var n = e("#" + e(this).data("colorpickerId"));
        n.data("colorpicker").onBeforeShow.apply(this, [n.get(0)]);
        var r = e(this).offset(),
          i = D(),
          s = r.top + this.offsetHeight,
          o = r.left;
        return s + 176 > i.t + i.h && (s -= this.offsetHeight + 176), o + 356 > i.l + i.w && (o -= 356), n.css({
          left: o + "px",
          top: s + "px"
        }), n.data("colorpicker").onShow.apply(this, [n.get(0)]) != 0 && n.show(), e(document).bind("mousedown", {
          cal: n
        }, M), !1
      }, M = function (t) {
        _(t.data.cal.get(0), t.target, t.data.cal.get(0)) || (t.data.cal.data("colorpicker").onHide.apply(this, [t.data.cal.get(0)]) != 0 && t.data.cal.hide(), e(document).unbind("mousedown", M))
      }, _ = function (e, t, n) {
        if (e == t) return !0;
        if (e.contains) return e.contains(t);
        if (e.compareDocumentPosition) return !!(e.compareDocumentPosition(t) & 16);
        var r = t.parentNode;
        while (r && r != n) {
          if (r == e) return !0;
          r = r.parentNode
        }
        return !1
      }, D = function () {
        var e = document.compatMode == "CSS1Compat";
        return {
          l: window.pageXOffset || (e ? document.documentElement.scrollLeft : document.body.scrollLeft),
          t: window.pageYOffset || (e ? document.documentElement.scrollTop : document.body.scrollTop),
          w: window.innerWidth || (e ? document.documentElement.clientWidth : document.body.clientWidth),
          h: window.innerHeight || (e ? document.documentElement.clientHeight : document.body.clientHeight)
        }
      }, P = function (e) {
        return {
          h: Math.min(360, Math.max(0, e.h)),
          s: Math.min(100, Math.max(0, e.s)),
          b: Math.min(100, Math.max(0, e.b))
        }
      }, H = function (e) {
        return {
          r: Math.min(255, Math.max(0, e.r)),
          g: Math.min(255, Math.max(0, e.g)),
          b: Math.min(255, Math.max(0, e.b))
        }
      }, B = function (e) {
        var t = 6 - e.length;
        if (t > 0) {
          var n = [];
          for (var r = 0; r < t; r++) n.push("0");
          n.push(e), e = n.join("")
        }
        return e
      }, j = function (e) {
        var e = parseInt(e.indexOf("#") > -1 ? e.substring(1) : e, 16);
        return {
          r: e >> 16,
          g: (e & 65280) >> 8,
          b: e & 255
        }
      }, F = function (e) {
        return I(j(e))
      }, I = function (e) {
        var t = {
          h: 0,
          s: 0,
          b: 0
        }, n = Math.min(e.r, e.g, e.b),
          r = Math.max(e.r, e.g, e.b),
          i = r - n;
        return t.b = r, r != 0, t.s = r != 0 ? 255 * i / r : 0, t.s != 0 ? e.r == r ? t.h = (e.g - e.b) / i : e.g == r ? t.h = 2 + (e.b - e.r) / i : t.h = 4 + (e.r - e.g) / i : t.h = -1, t.h *= 60, t.h < 0 && (t.h += 360), t.s *= 100 / 255, t.b *= 100 / 255, t
      }, q = function (e) {
        var t = {}, n = Math.round(e.h),
          r = Math.round(e.s * 255 / 100),
          i = Math.round(e.b * 255 / 100);
        if (r == 0) t.r = t.g = t.b = i;
        else {
          var s = i,
            o = (255 - r) * i / 255,
            u = (s - o) * (n % 60) / 60;
          n == 360 && (n = 0), n < 60 ? (t.r = s, t.b = o, t.g = o + u) : n < 120 ? (t.g = s, t.b = o, t.r = s - u) : n < 180 ? (t.g = s, t.r = o, t.b = o + u) : n < 240 ? (t.b = s, t.r = o, t.g = s - u) : n < 300 ? (t.b = s, t.g = o, t.r = o + u) : n < 360 ? (t.r = s, t.g = o, t.b = s - u) : (t.r = 0, t.g = 0, t.b = 0)
        }
        return {
          r: Math.round(t.r),
          g: Math.round(t.g),
          b: Math.round(t.b)
        }
      }, R = function (t) {
        var n = [t.r.toString(16), t.g.toString(16), t.b.toString(16)];
        return e.each(n, function (e, t) {
          t.length == 1 && (n[e] = "0" + t)
        }), n.join("")
      }, U = function (e) {
        return R(q(e))
      }, z = function () {
        var t = e(this).parent(),
          n = t.data("colorpicker").origColor;
        t.data("colorpicker").color = n, u(n, t.get(0)), f(n, t.get(0)), a(n, t.get(0)), l(n, t.get(0)), c(n, t.get(0)), p(n, t.get(0))
      };
    return {
      init: function (t) {
        t = e.extend({}, o, t || {});
        if (typeof t.color == "string") t.color = F(t.color);
        else if (t.color.r != undefined && t.color.g != undefined && t.color.b != undefined) t.color = I(t.color);
        else {
          if (t.color.h == undefined || t.color.s == undefined || t.color.b == undefined) return this;
          t.color = P(t.color)
        }
        return this.each(function () {
          if (!e(this).data("colorpickerId")) {
            var n = e.extend({}, t);
            n.origColor = t.color;
            var r = "collorpicker_" + parseInt(Math.random() * 1e3);
            e(this).data("colorpickerId", r);
            var i = e(s).attr("id", r);
            n.flat ? i.appendTo(this).show() : i.appendTo(document.body), n.fields = i.find("input").bind("keyup", d).bind("change", v).bind("blur", m).bind("focus", g), i.find("span").bind("mousedown", y).end().find(">div.colorpicker_current_color").bind("click", z), n.selector = i.find("div.colorpicker_color").bind("mousedown", T), n.selectorIndic = n.selector.find("div div"), n.el = this, n.hue = i.find("div.colorpicker_hue div"), i.find("div.colorpicker_hue").bind("mousedown", E), n.newColor = i.find("div.colorpicker_new_color"), n.currentColor = i.find("div.colorpicker_current_color"), i.data("colorpicker", n), i.find("div.colorpicker_submit").bind("mouseenter", k).bind("mouseleave", L).bind("click", A), u(n.color, i.get(0)), a(n.color, i.get(0)), f(n.color, i.get(0)), c(n.color, i.get(0)), l(n.color, i.get(0)), h(n.color, i.get(0)), p(n.color, i.get(0)), n.flat ? i.css({
              position: "relative",
              display: "block"
            }) : e(this).bind(n.eventName, O)
          }
        })
      },
      showPicker: function () {
        return this.each(function () {
          e(this).data("colorpickerId") && O.apply(this)
        })
      },
      hidePicker: function () {
        return this.each(function () {
          e(this).data("colorpickerId") && e("#" + e(this).data("colorpickerId")).hide()
        })
      },
      setColor: function (t) {
        if (typeof t == "string") t = F(t);
        else if (t.r != undefined && t.g != undefined && t.b != undefined) t = I(t);
        else {
          if (t.h == undefined || t.s == undefined || t.b == undefined) return this;
          t = P(t)
        }
        return this.each(function () {
          if (e(this).data("colorpickerId")) {
            var n = e("#" + e(this).data("colorpickerId"));
            n.data("colorpicker").color = t, n.data("colorpicker").origColor = t, u(t, n.get(0)), a(t, n.get(0)), f(t, n.get(0)), c(t, n.get(0)), l(t, n.get(0)), h(t, n.get(0)), p(t, n.get(0))
          }
        })
      },
      destroy: function () {
        return this.each(function () {
          var t = e(this).data("colorpickerId");
          if (t) {
            var n = e("#" + t);
            n.remove()
          }
        })
      }
    }
  }();
  e.fn.extend({
    ColorPicker: t.init,
    ColorPickerHide: t.hidePicker,
    ColorPickerShow: t.showPicker,
    ColorPickerSetColor: t.setColor,
    ColorPickerDestroy: t.destroy
  })
}(jQuery),
function (e) {
  function t() {
    this._disabledInputs = [], this.regional = [], this.regional[""] = {
      datetimeFormat: "O/D/Y H:Ma",
      datetimeSeparators: ".",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      ampmNames: ["AM", "PM"],
      spinnerTexts: ["Today", "Previous field", "Next field", "Increment", "Decrement"],
      isRTL: !1
    }, this._defaults = {
      appendText: "",
      initialField: 0,
      useMouseWheel: !0,
      shortYearCutoff: "+10",
      defaultDatetime: null,
      minDatetime: null,
      maxDatetime: null,
      minTime: null,
      maxTime: null,
      timeSteps: [1, 1, 1],
      spinnerImage: "",
      spinnerSize: [20, 20, 8],
      spinnerBigImage: "",
      spinnerBigSize: [40, 40, 16],
      spinnerIncDecOnly: !1,
      spinnerRepeat: [500, 250],
      beforeShow: null,
      altField: null,
      altFormat: null
    }, e.extend(this._defaults, this.regional[""])
  }

  function r(t, r) {
    return t == "option" && (r.length == 0 || r.length == 1 && typeof r[0] == "string") ? !0 : e.inArray(t, n) > -1
  }
  e.extend(t.prototype, {
    markerClassName: "hasDatetimeEntry",
    propertyName: "datetimeEntry",
    _appendClass: "datetimeEntry_append",
    _controlClass: "datetimeEntry_control",
    _expandClass: "datetimeEntry_expand",
    setDefaults: function (t) {
      return e.extend(this._defaults, t || {}), this
    },
    _attachPlugin: function (t, n) {
      var r = e(t);
      if (r.hasClass(this.markerClassName)) return;
      var s = {
        options: e.extend({}, this._defaults, n),
        input: r,
        _field: 0,
        _selectedYear: 0,
        _selectedMonth: 0,
        _selectedDay: 0,
        _selectedHour: 0,
        _selectedMinute: 0,
        _selectedSecond: 0
      };
      this._decodeDatetimeFormat(s), r.data(this.propertyName, s).addClass(this.markerClassName).bind("focus." + this.propertyName, this._doFocus).bind("blur." + this.propertyName, this._doBlur).bind("click." + this.propertyName, this._doClick).bind("keydown." + this.propertyName, this._doKeyDown).bind("keypress." + this.propertyName, this._doKeyPress).bind("paste." + this.propertyName, function (e) {
        setTimeout(function () {
          i._extractDatetime(s)
        }, 1)
      }), this._optionPlugin(t, n)
    },
    _optionPlugin: function (t, n, r) {
      t = e(t);
      var i = t.data(this.propertyName);
      if (!n || typeof n == "string" && r == null) {
        var s = n;
        return n = (i || {}).options, n && s ? n[s] : n
      }
      if (!t.hasClass(this.markerClassName)) return;
      n = n || {};
      if (typeof n == "string") {
        var s = n;
        n = {}, n[s] = r
      }
      var o = this._parseDatetime(i, t.val());
      e.extend(i.options, n), i._field = 0, this._decodeDatetimeFormat(i), o && this._setDatetime(i, o), t.next("span." + this._appendClass).remove(), t.parent().find("span." + this._controlClass).remove(), e.fn.mousewheel && t.unmousewheel();
      var u = i.options.spinnerImage ? e('<span class="' + this._controlClass + '" style="display: inline-block; ' + "background: url('" + i.options.spinnerImage + "') 0 0 no-repeat; width: " + i.options.spinnerSize[0] + "px; height: " + i.options.spinnerSize[1] + 'px;"></span>') : null;
      t.after(i.options.appendText ? '<span class="' + this._appendClass + '">' + i.options.appendText + "</span>" : "").after(u || ""), i.options.useMouseWheel && e.fn.mousewheel && t.mousewheel(this._doMouseWheel), u && u.mousedown(this._handleSpinner).mouseup(this._endSpinner).mouseover(this._expandSpinner).mouseout(this._endSpinner).mousemove(this._describeSpinner)
    },
    _enablePlugin: function (e) {
      this._enableDisable(e, !1)
    },
    _disablePlugin: function (e) {
      this._enableDisable(e, !0)
    },
    _enableDisable: function (t, n) {
      var r = e.data(t, this.propertyName);
      if (!r) return;
      t.disabled = n, t.nextSibling && t.nextSibling.nodeName.toLowerCase() == "span" && i._changeSpinner(r, t.nextSibling, n ? 5 : -1), i._disabledInputs = e.map(i._disabledInputs, function (e) {
        return e == t ? null : e
      }), n && i._disabledInputs.push(t)
    },
    _isDisabledPlugin: function (t) {
      return e.inArray(t, this._disabledInputs) > -1
    },
    _decodeDatetimeFormat: function (e) {
      e._fields = [], e._ampmField = -1;
      for (var t = 0; t < e.options.datetimeFormat.length; t++) e.options.datetimeFormat.charAt(t).match(/[yYoOnNdDwWhHmMsSa]/) && e._fields.push(t), e.options.datetimeFormat.charAt(t) == "a" && (e._ampmField = e._fields.length - 1)
    },
    _destroyPlugin: function (t) {
      t = e(t);
      if (!t.hasClass(this.markerClassName)) return;
      t.removeClass(this.markerClassName).removeData(this.propertyName).unbind("." + this.propertyName), e.fn.mousewheel && t.unmousewheel(), this._disabledInputs = e.map(this._disabledInputs, function (e) {
        return e == t[0] ? null : e
      }), t.siblings("." + this._appendClass + ",." + this._controlClass).remove()
    },
    _setDatetimePlugin: function (t, n) {
      var r = e.data(t, this.propertyName);
      r && (n === null || n === "" ? r.input.val("") : this._setDatetime(r, n ? typeof n == "object" ? new Date(n.getTime()) : n : null))
    },
    _getDatetimePlugin: function (t) {
      var n = e.data(t, this.propertyName);
      return n ? this._parseDatetime(n, n.input.val()) : null
    },
    _getOffsetPlugin: function (t) {
      var n = e.data(t, this.propertyName),
        r = n ? i._parseDatetime(n, n.input.val()) : null;
      return r ? (r.getHours() * 3600 + r.getMinutes() * 60 + r.getSeconds()) * 1e3 : 0
    },
    _doFocus: function (t) {
      var n = t.nodeName && t.nodeName.toLowerCase() == "input" ? t : this;
      if (i._lastInput == n || i._isDisabledPlugin(n)) {
        i._focussed = !1;
        return
      }
      var r = e.data(n, i.propertyName);
      i._focussed = !0, i._lastInput = n, i._blurredInput = null, e.extend(r.options, e.isFunction(r.options.beforeShow) ? r.options.beforeShow.apply(n, [n]) : {}), i._extractDatetime(r), setTimeout(function () {
        i._showField(r)
      }, 10)
    },
    _doBlur: function (e) {
      i._blurredInput = i._lastInput, i._lastInput = null
    },
    _doClick: function (t) {
      var n = t.target,
        r = e.data(n, i.propertyName);
      if (!i._focussed) {
        var s = r.options.datetimeFormat;
        r._field = 0;
        if (n.selectionStart != null) {
          var o = 0;
          for (var u = 0; u < s.length; u++) {
            o += i._fieldLength(r, s.charAt(u));
            if (n.selectionStart < o) break;
            r._field += s.charAt(u).match(/[yondwhmsa]/i) ? 1 : 0
          }
        } else if (n.createTextRange) {
          var a = e(t.srcElement),
            f = n.createTextRange(),
            l = function (e) {
              return {
                thin: 2,
                medium: 4,
                thick: 6
              }[e] || e
            }, c = t.clientX + document.documentElement.scrollLeft - (a.offset().left + parseInt(l(a.css("border-left-width")), 10)) - f.offsetLeft,
            o = 0;
          for (var u = 0; u < s.length; u++) {
            o += i._fieldLength(r, s.charAt(u)), f.collapse(), f.moveEnd("character", o);
            if (c < f.boundingWidth) break;
            r._field += s.charAt(u).match(/[yondwhmsa]/i) ? 1 : 0
          }
        }
      }
      i._showField(r), i._focussed = !1
    },
    _doKeyDown: function (t) {
      if (t.keyCode >= 48) return !0;
      var n = e.data(t.target, i.propertyName);
      switch (t.keyCode) {
      case 9:
        return t.shiftKey ? i._changeField(n, -1, !0) : i._changeField(n, 1, !0);
      case 35:
        t.ctrlKey ? i._setValue(n, "") : (n._field = n._fields.length - 1, i._adjustField(n, 0));
        break;
      case 36:
        t.ctrlKey ? i._setDatetime(n) : (n._field = 0, i._adjustField(n, 0));
        break;
      case 37:
        i._changeField(n, -1, !1);
        break;
      case 38:
        i._adjustField(n, 1);
        break;
      case 39:
        i._changeField(n, 1, !1);
        break;
      case 40:
        i._adjustField(n, -1);
        break;
      case 46:
        i._setValue(n, "");
        break;
      default:
        return !0
      }
      return !1
    },
    _doKeyPress: function (t) {
      var n = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode);
      if (n < " ") return !0;
      var r = e.data(t.target, i.propertyName);
      return i._handleKeyPress(r, n), !1
    },
    _doMouseWheel: function (t, n) {
      if (i._isDisabledPlugin(t.target)) return;
      var r = e.data(t.target, i.propertyName);
      r.input.focus(), r.input.val() || i._extractDatetime(r), i._adjustField(r, n), t.preventDefault()
    },
    _expandSpinner: function (t) {
      var n = i._getSpinnerTarget(t),
        r = e.data(i._getInput(n), i.propertyName);
      if (i._isDisabledPlugin(r.input[0])) return;
      if (r.options.spinnerBigImage) {
        r._expanded = !0;
        var s = e(n).offset(),
          o = null;
        e(n).parents().each(function () {
          var t = e(this);
          if (t.css("position") == "relative" || t.css("position") == "absolute") o = t.offset();
          return !o
        }), e('<div class="' + i._expandClass + '" style="position: absolute; left: ' + (s.left - (r.options.spinnerBigSize[0] - r.options.spinnerSize[0]) / 2 - (o ? o.left : 0)) + "px; top: " + (s.top - (r.options.spinnerBigSize[1] - r.options.spinnerSize[1]) / 2 - (o ? o.top : 0)) + "px; width: " + r.options.spinnerBigSize[0] + "px; height: " + r.options.spinnerBigSize[1] + "px; background: transparent url(" + r.options.spinnerBigImage + ') no-repeat 0px 0px; z-index: 10;"></div>').mousedown(i._handleSpinner).mouseup(i._endSpinner).mouseout(i._endExpand).mousemove(i._describeSpinner).insertAfter(n)
      }
    },
    _getInput: function (t) {
      return e(t).siblings("." + i.markerClassName)[0]
    },
    _describeSpinner: function (t) {
      var n = i._getSpinnerTarget(t),
        r = e.data(i._getInput(n), i.propertyName);
      n.title = r.options.spinnerTexts[i._getSpinnerRegion(r, t)]
    },
    _handleSpinner: function (t) {
      var n = i._getSpinnerTarget(t),
        r = i._getInput(n);
      if (i._isDisabledPlugin(r)) return;
      r == i._blurredInput && (i._lastInput = r, i._blurredInput = null);
      var s = e.data(r, i.propertyName);
      i._doFocus(r);
      var o = i._getSpinnerRegion(s, t);
      i._changeSpinner(s, n, o), i._actionSpinner(s, o), i._timer = null, i._handlingSpinner = !0, o >= 3 && s.options.spinnerRepeat[0] && (i._timer = setTimeout(function () {
        i._repeatSpinner(s, o)
      }, s.options.spinnerRepeat[0]), e(n).one("mouseout", i._releaseSpinner).one("mouseup", i._releaseSpinner))
    },
    _actionSpinner: function (e, t) {
      e.input.val() || i._extractDatetime(e);
      switch (t) {
      case 0:
        this._setDatetime(e);
        break;
      case 1:
        this._changeField(e, -1, !1);
        break;
      case 2:
        this._changeField(e, 1, !1);
        break;
      case 3:
        this._adjustField(e, 1);
        break;
      case 4:
        this._adjustField(e, -1)
      }
    },
    _repeatSpinner: function (e, t) {
      if (!i._timer) return;
      i._lastInput = i._blurredInput, this._actionSpinner(e, t), this._timer = setTimeout(function () {
        i._repeatSpinner(e, t)
      }, e.options.spinnerRepeat[1])
    },
    _releaseSpinner: function (e) {
      clearTimeout(i._timer), i._timer = null
    },
    _endExpand: function (t) {
      i._timer = null;
      var n = i._getSpinnerTarget(t),
        r = i._getInput(n),
        s = e.data(r, i.propertyName);
      e(n).remove(), s._expanded = !1
    },
    _endSpinner: function (t) {
      i._timer = null;
      var n = i._getSpinnerTarget(t),
        r = i._getInput(n),
        s = e.data(r, i.propertyName);
      i._isDisabledPlugin(r) || i._changeSpinner(s, n, -1), i._handlingSpinner && (i._lastInput = i._blurredInput), i._lastInput && i._handlingSpinner && i._showField(s), i._handlingSpinner = !1
    },
    _getSpinnerTarget: function (e) {
      return e.target || e.srcElement
    },
    _getSpinnerRegion: function (t, n) {
      var r = this._getSpinnerTarget(n),
        i = e(r).offset(),
        s = [document.documentElement.scrollLeft || document.body.scrollLeft, document.documentElement.scrollTop || document.body.scrollTop],
        o = t.options.spinnerIncDecOnly ? 99 : n.clientX + s[0] - i.left,
        u = n.clientY + s[1] - i.top,
        a = t.options[t._expanded ? "spinnerBigSize" : "spinnerSize"],
        f = t.options.spinnerIncDecOnly ? 99 : a[0] - 1 - o,
        l = a[1] - 1 - u;
      if (a[2] > 0 && Math.abs(o - f) <= a[2] && Math.abs(u - l) <= a[2]) return 0;
      var c = Math.min(o, u, f, l);
      return c == o ? 1 : c == f ? 2 : c == u ? 3 : 4
    },
    _changeSpinner: function (t, n, r) {
      e(n).css("background-position", "-" + (r + 1) * t.options[t._expanded ? "spinnerBigSize" : "spinnerSize"][0] + "px 0px")
    },
    _extractDatetime: function (e) {
      var t = this._parseDatetime(e, e.input.val()) || this._normaliseDatetime(this._determineDatetime(e, e.options.defaultDatetime) || new Date),
        n = this._constrainTime(e, [t.getHours(), t.getMinutes(), t.getSeconds()]);
      e._selectedYear = t.getFullYear(), e._selectedMonth = t.getMonth(), e._selectedDay = t.getDate(), e._selectedHour = n[0], e._selectedMinute = n[1], e._selectedSecond = n[2], e._lastChr = "", e._field = Math.max(0, e.options.initialField), e.input.val() != "" && this._showDatetime(e)
    },
    _parseDatetime: function (e, t) {
      if (!t) return null;
      var n = 0,
        r = 0,
        i = 0,
        s = 0,
        o = 0,
        u = 0,
        a = 0,
        f = e.options.datetimeFormat,
        l = function () {
          while (a < t.length && t.charAt(a).match(/^[0-9]/)) a++
        }, c;
      for (c = 0; c < f.length && a < t.length; c++) {
        var h = f.charAt(c),
          p = parseInt(t.substring(a), 10);
        if (h.match(/y|o|d|h|m|s/i) && isNaN(p)) throw "Invalid date";
        p = isNaN(p) ? 0 : p;
        switch (h) {
        case "y":
        case "Y":
          n = p, l();
          break;
        case "o":
        case "O":
          r = p, l();
          break;
        case "n":
        case "N":
          var d = e.options[h == "N" ? "monthNames" : "monthNamesShort"];
          for (var v = 0; v < d.length; v++)
            if (t.substring(a).substr(0, d[v].length).toLowerCase() == d[v].toLowerCase()) {
              r = v + 1, a += d[v].length;
              break
            }
          break;
        case "w":
        case "W":
          var m = e.options[h == "W" ? "dayNames" : "dayNamesShort"];
          for (var v = 0; v < m.length; v++)
            if (t.substring(a).substr(0, m[v].length).toLowerCase() == m[v].toLowerCase()) {
              a += m[v].length + 1;
              break
            }
          p = parseInt(t.substring(a), 10), p = isNaN(p) ? 0 : p;
        case "d":
        case "D":
          i = p, l();
          break;
        case "h":
        case "H":
          s = p, l();
          break;
        case "m":
        case "M":
          o = p, l();
          break;
        case "s":
        case "S":
          u = p, l();
          break;
        case "a":
          var g = t.substr(a, e.options.ampmNames[1].length).toLowerCase() == e.options.ampmNames[1].toLowerCase();
          s = (s == 12 ? 0 : s) + (g ? 12 : 0), a += e.options.ampmNames[0].length;
          break;
        default:
          a++
        }
      }
      if (c < f.length) throw "Invalid date";
      n += n >= 100 || f.indexOf("y") == -1 ? 0 : n > this._shortYearCutoff(e) ? 1900 : 2e3;
      var y = this._constrainTime(e, [s, o, u]),
        b = new Date(n, Math.max(0, r - 1), i, y[0], y[1], y[2]);
      if (!f.match(/y|o|n|d|w/i) || b.getFullYear() == n && b.getMonth() + 1 == r && b.getDate() == i) return b;
      throw "Invalid date"
    },
    _showDatetime: function (e) {
      this._setValue(e, this._formatDatetime(e, e.options.datetimeFormat)), this._showField(e)
    },
    _formatDatetime: function (e, t) {
      var n = "",
        r = t.indexOf("a") > -1;
      for (var i = 0; i < t.length; i++) {
        var s = t.charAt(i);
        switch (s) {
        case "y":
          n += this._formatNumber(e._selectedYear % 100);
          break;
        case "Y":
          n += this._formatNumber(e._selectedYear, 4);
          break;
        case "o":
        case "O":
          n += this._formatNumber(e._selectedMonth + 1, s == "o" ? 1 : 2);
          break;
        case "n":
        case "N":
          n += e.options[s == "N" ? "monthNames" : "monthNamesShort"][e._selectedMonth];
          break;
        case "d":
        case "D":
          n += this._formatNumber(e._selectedDay, s == "d" ? 1 : 2);
          break;
        case "w":
        case "W":
          n += e.options[s == "W" ? "dayNames" : "dayNamesShort"][(new Date(e._selectedYear, e._selectedMonth, e._selectedDay)).getDay()] + " " + this._formatNumber(e._selectedDay);
          break;
        case "h":
        case "H":
          n += this._formatNumber(r ? e._selectedHour % 12 || 12 : e._selectedHour, s == "h" ? 1 : 2);
          break;
        case "m":
        case "M":
          n += this._formatNumber(e._selectedMinute, s == "m" ? 1 : 2);
          break;
        case "s":
        case "S":
          n += this._formatNumber(e._selectedSecond, s == "s" ? 1 : 2);
          break;
        case "a":
          n += e.options.ampmNames[e._selectedHour < 12 ? 0 : 1];
          break;
        default:
          n += s
        }
      }
      return n
    },
    _showField: function (e) {
      var t = e.input[0];
      if (e.input.is(":hidden") || i._lastInput != t) return;
      var n = 0;
      for (var r = 0; r < e._fields[e._field]; r++) n += this._fieldLength(e, e.options.datetimeFormat.charAt(r));
      var s = n + this._fieldLength(e, e.options.datetimeFormat.charAt(r));
      if (t.setSelectionRange) t.setSelectionRange(n, s);
      else if (t.createTextRange) {
        var o = t.createTextRange();
        o.moveStart("character", n), o.moveEnd("character", s - e.input.val().length), o.select()
      }
      t.disabled || t.focus()
    },
    _fieldLength: function (e, t) {
      switch (t) {
      case "Y":
        return 4;
      case "n":
      case "N":
        return e.options[t == "N" ? "monthNames" : "monthNamesShort"][e._selectedMonth].length;
      case "w":
      case "W":
        return e.options[t == "W" ? "dayNames" : "dayNamesShort"][(new Date(e._selectedYear, e._selectedMonth, e._selectedDay)).getDay()].length + 3;
      case "y":
      case "O":
      case "D":
      case "H":
      case "M":
      case "S":
        return 2;
      case "o":
        return ("" + (e._selectedMonth + 1)).length;
      case "d":
        return ("" + e._selectedDay).length;
      case "h":
        return ("" + (e._ampmField == -1 ? e._selectedHour : e._selectedHour % 12 || 12)).length;
      case "m":
        return ("" + e._selectedMinute).length;
      case "s":
        return ("" + e._selectedSecond).length;
      case "a":
        return e.options.ampmNames[0].length;
      default:
        return 1
      }
    },
    _formatNumber: function (e, t) {
      e = "" + e, t = t || 2;
      while (e.length < t) e = "0" + e;
      return e
    },
    _setValue: function (t, n) {
      n != t.input.val() && (t.options.altField && e(t.options.altField).val(n ? this._formatDatetime(t, t.options.altFormat || t.options.datetimeFormat) : ""), t.input.val(n).trigger("change"))
    },
    _changeField: function (e, t, n) {
      var r = e.input.val() == "" || e._field == (t == -1 ? 0 : e._fields.length - 1);
      return r || (e._field += t), this._showField(e), e._lastChr = "", r && n
    },
    _adjustField: function (e, t) {
      e.input.val() == "" && (t = 0);
      var n = e.options.datetimeFormat.charAt(e._fields[e._field]),
        r = e._selectedYear + (n.match(/y/i) ? t : 0),
        i = e._selectedMonth + (n.match(/o|n/i) ? t : 0),
        s = n.match(/d|w/i) ? e._selectedDay + t : Math.min(e._selectedDay, this._getDaysInMonth(r, i)),
        o = e.options.timeSteps,
        u = e._selectedHour + (n.match(/h/i) ? t * o[0] : 0) + (n == "a" && t != 0 ? e._selectedHour < 12 ? 12 : -12 : 0),
        a = e._selectedMinute + (n.match(/m/i) ? t * o[1] : 0),
        f = e._selectedSecond + (n.match(/s/i) ? t * o[2] : 0);
      this._setDatetime(e, new Date(r, i, s, u, a, f))
    },
    _getDaysInMonth: function (e, t) {
      return (new Date(e, t + 1, 0, 12)).getDate()
    },
    _setDatetime: function (e, t) {
      t = this._normaliseDatetime(this._determineDatetime(e, t || e.options.defaultDatetime) || new Date);
      var n = this._constrainTime(e, [t.getHours(), t.getMinutes(), t.getSeconds()]);
      t.setHours(n[0], n[1], n[2]);
      var r = this._normaliseDatetime(this._determineDatetime(e, e.options.minDatetime)),
        i = this._normaliseDatetime(this._determineDatetime(e, e.options.maxDatetime)),
        s = this._normaliseDatetime(this._determineDatetime(e, e.options.minTime), "d"),
        o = this._normaliseDatetime(this._determineDatetime(e, e.options.maxTime), "d");
      t = r && t < r ? r : i && t > i ? i : t, s && this._normaliseDatetime(new Date(t.getTime()), "d") < s && this._copyTime(s, t), o && this._normaliseDatetime(new Date(t.getTime()), "d") > o && this._copyTime(o, t), e._selectedYear = t.getFullYear(), e._selectedMonth = t.getMonth(), e._selectedDay = t.getDate(), e._selectedHour = t.getHours(), e._selectedMinute = t.getMinutes(), e._selectedSecond = t.getSeconds(), this._showDatetime(e)
    },
    _copyDate: function (e, t) {
      t.setFullYear(e.getFullYear()), t.setMonth(e.getMonth()), t.setDate(e.getDate())
    },
    _copyTime: function (e, t) {
      t.setHours(e.getHours()), t.setMinutes(e.getMinutes()), t.setSeconds(e.getSeconds())
    },
    _determineDatetime: function (e, t) {
      var n = function (e) {
        var t = new Date;
        return t.setSeconds(t.getSeconds() + e), t
      }, r = function (t) {
          var n;
          try {
            n = i._parseDatetime(e, t);
            if (n) return n
          } catch (r) {}
          t = t.toLowerCase(), n = new Date;
          var s = n.getFullYear(),
            o = n.getMonth(),
            u = n.getDate(),
            a = n.getHours(),
            f = n.getMinutes(),
            l = n.getSeconds(),
            c = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,
            h = c.exec(t);
          while (h) {
            switch (h[2] || "s") {
            case "s":
              l += parseInt(h[1], 10);
              break;
            case "m":
              f += parseInt(h[1], 10);
              break;
            case "h":
              a += parseInt(h[1], 10);
              break;
            case "d":
              u += parseInt(h[1], 10);
              break;
            case "w":
              u += parseInt(h[1], 10) * 7;
              break;
            case "o":
              o += parseInt(h[1], 10);
              break;
            case "y":
              s += parseInt(h[1], 10)
            }
            h = c.exec(t)
          }
          return new Date(s, o, u, a, f, l)
        };
      return t ? typeof t == "string" ? r(t) : typeof t == "number" ? n(t) : t : null
    },
    _normaliseDatetime: function (e, t) {
      return e ? (t == "d" && (e.setFullYear(0), e.setMonth(0), e.setDate(0)), t == "t" && (e.setHours(12), e.setMinutes(0), e.setSeconds(0)), e.setMilliseconds(0), e) : null
    },
    _handleKeyPress: function (e, t) {
      t = t.toLowerCase();
      var n = e.options.datetimeFormat.charAt(e._fields[e._field]),
        r = e.options.datetimeFormat.charAt(e._fields[e._field] + 1);
      r = "yYoOnNdDwWhHmMsSa".indexOf(r) == -1 ? r : "";
      if ((e.options.datetimeSeparators + r).indexOf(t) > -1) this._changeField(e, 1, !1);
      else if (t >= "0" && t <= "9") {
        var i = parseInt(t, 10),
          s = parseInt(e._lastChr + t, 10),
          o = n.match(/y/i) ? s : e._selectedYear,
          u = n.match(/o|n/i) ? s >= 1 && s <= 12 ? s : i > 0 ? i : e._selectedMonth + 1 : e._selectedMonth + 1,
          a = n.match(/d|w/i) ? s >= 1 && s <= this._getDaysInMonth(o, u - 1) ? s : i > 0 ? i : e._selectedDay : e._selectedDay,
          f = n.match(/h/i) ? e._ampmField == -1 ? s < 24 ? s : i : (s >= 1 && s <= 12 ? s : i > 0 ? i : e._selectedHour) % 12 + (e._selectedHour >= 12 ? 12 : 0) : e._selectedHour,
          l = n.match(/m/i) ? s < 60 ? s : i : e._selectedMinute,
          c = n.match(/s/i) ? s < 60 ? s : i : e._selectedSecond,
          h = this._constrainTime(e, [f, l, c]),
          p = this._shortYearCutoff(e);
        this._setDatetime(e, new Date(o + (o >= 100 || n != "y" ? 0 : o > p ? 1900 : 2e3), u - 1, a, h[0], h[1], h[2])), e._lastChr = (n != "Y" ? "" : e._lastChr.substr(Math.max(0, e._lastChr.length - 2))) + t
      } else if (n.match(/n/i)) {
        e._lastChr += t;
        var d = e.options[n == "n" ? "monthNamesShort" : "monthNames"],
          v = function () {
            for (var t = 0; t < d.length; t++)
              if (d[t].toLowerCase().substring(0, e._lastChr.length) == e._lastChr) return t;
            return -1
          }, u = v();
        u == -1 && (e._lastChr = t, u = v());
        if (u == -1) e._lastChr = "";
        else {
          var o = e._selectedYear,
            a = Math.min(e._selectedDay, this._getDaysInMonth(o, u));
          this._setDatetime(e, this._normaliseDatetime(new Date(o, u, a, e._selectedHour, e._selectedMinute, e._selectedSecond)))
        }
      } else if (e._ampmField > -1)
        if (t == e.options.ampmNames[0].substring(0, 1).toLowerCase() && e._selectedHour >= 12 || t == e.options.ampmNames[1].substring(0, 1).toLowerCase() && e._selectedHour < 12) {
          var m = e._field;
          e._field = e._ampmField, this._adjustField(e, 1), e._field = m, this._showField(e)
        }
    },
    _shortYearCutoff: function (e) {
      var t = e.options.shortYearCutoff;
      return typeof t == "string" && (t = (new Date).getFullYear() + parseInt(t, 10)), t % 100
    },
    _constrainTime: function (e, t) {
      var n = t != null;
      if (!n) {
        var r = this._determineTime(e, e.options.defaultTime) || new Date;
        t = [r.getHours(), r.getMinutes(), r.getSeconds()]
      }
      var i = !1,
        s = e.options.timeSteps;
      for (var o = 0; o < s.length; o++) i ? t[o] = 0 : s[o] > 1 && (t[o] = Math.round(t[o] / s[o]) * s[o], i = !0);
      return t
    }
  });
  var n = ["getDatetime", "getOffset", "isDisabled"];
  e.fn.datetimeEntry = function (t) {
    var n = Array.prototype.slice.call(arguments, 1);
    return r(t, n) ? i["_" + t + "Plugin"].apply(i, [this[0]].concat(n)) : this.each(function () {
      if (typeof t == "string") {
        if (!i["_" + t + "Plugin"]) throw "Unknown command: " + t;
        i["_" + t + "Plugin"].apply(i, [this].concat(n))
      } else {
        var r = e.fn.metadata ? e(this).metadata() : {};
        i._attachPlugin(this, e.extend({}, r, t || {}))
      }
    })
  };
  var i = e.datetimeEntry = new t
}(jQuery), Jux.namespace("ui", "ui.anim", "ui.bits", "ui.layout", "ui.containers", "ui.formFields", "ui.toolButtons", "ui.plugins", "ui.utils"), ui.ComponentManager = {
  componentClasses: {},
  registerType: function (e, t) {
    e = e.toLowerCase();
    if ( !! this.componentClasses[e]) throw new Error("Error: ui.ComponentManager already has a type '" + e + "'");
    this.componentClasses[e] = t
  },
  getType: function (e) {
    return this.componentClasses[e.toLowerCase()]
  },
  hasType: function (e) {
    return e ? !! this.componentClasses[e.toLowerCase()] : !1
  },
  create: function (e) {
    var t = e.type ? e.type.toLowerCase() : undefined;
    if (e instanceof ui.Component) return e;
    if (this.hasType(t || "container")) return new this.componentClasses[t || "container"](e);
    throw new Error("ComponentManager.create(): Unknown type: '" + t + "'")
  }
}, ui.Component = Class.extend(Jux.util.Observable, {
  elType: "div",
  hidden: !1,
  cls: "",
  masked: !1,
  dragAndDropSortable: !0,
  parentContainer: null,
  rendered: !1,
  deferMaskShow: !1,
  destroyed: !1,
  constructor: function (e) {
    Jux.apply(this, e), this._super(arguments), this.addEvents("render", "show", "hide", "beforedestroy", "destroy"), this.uuid = Jux.newId(), this.id = this.id || "ui-cmp-" + Jux.newId(), this.plugins = this.plugins || [], Jux.isObject(this.plugins) && (this.plugins = [this.plugins]), this.initComponent(), this.plugins.length > 0 && this.initPlugins(this.plugins), this.renderTo && (this.render(this.renderTo), delete this.renderTo)
  },
  initComponent: Jux.emptyFn,
  initPlugins: function (e) {
    if (Jux.isArray(e)) {
      for (var t = 0, n = e.length; t < n; t++) this.initPlugins(e[t]);
      return
    }
    if (!(e instanceof ui.plugins.AbstractPlugin)) throw new Error("error: a plugin provided to this Component was not of type ui.plugins.AbstractPlugin");
    e.initPlugin(this)
  },
  render: function (e, t) {
    if (this.destroyed) return;
    var n;
    Jux.isNumber(t) || Jux.isString(t) || Jux.isElement(t) || Jux.isJQuery(t) ? (n = t, t = {
      position: n
    }) : (t = t || {}, n = t.position);
    var r = jQuery(e);
    typeof n != "undefined" && (typeof n == "number" ? n = r.children().get(n) : n = r.find(n));
    if (this.rendered) n ? n[0] !== this.$el[0] && this.$el.insertBefore(n) : this.$el.appendTo(r);
    else {
      this.elId = this.elId || "ui-cmp-" + Jux.newId();
      var i = [],
        s = this.attr;
      if (s) {
        for (var o in s) s.hasOwnProperty(o) && i.push(o + '="' + s[o] + '"');
        delete this.attr
      }
      this.dragAndDropSortable === !1 && i.push('data-dragAndDropSortable="false"');
      var u = "";
      this.style && (u = Jux.Css.hashToString(this.style), delete this.style), this.$el = jQuery("<" + this.elType + ' id="' + this.elId + '" class="' + this.cls + '" style="' + u + '" ' + i.join(" ") + " />"), n ? this.$el.insertBefore(n) : this.$el.appendTo(r), this.rendered = !0, this.onRender(r, t);
      var a = this.getContentTarget();
      this.html && (a.append(this.html), delete this.html), this.contentEl && (a.append(this.contentEl), delete this.contentEl), typeof this.height != "undefined" && this.$el.height(this.height), typeof this.width != "undefined" && this.$el.width(this.width), typeof this.minHeight != "undefined" && this.$el.css({
        minHeight: this.minHeight
      }), typeof this.minWidth != "undefined" && this.$el.css({
        minWidth: this.minWidth
      }), typeof this.maxHeight != "undefined" && this.$el.css({
        maxHeight: this.maxHeight
      }), typeof this.maxWidth != "undefined" && this.$el.css({
        maxWidth: this.maxWidth
      }), this.hidden && this.$el.hide(), this.masked && this.mask(this.deferredMaskConfig), this.afterRender(r, t), this.fireEvent("render", this), t.deferLayout || this.doLayout(), this.renderingFinished()
    }
  },
  renderingFinished: Jux.emptyFn,
  isRendered: function () {
    return this.rendered
  },
  onRender: Jux.emptyFn,
  afterRender: Jux.emptyFn,
  update: function (e) {
    this.rendered ? this.getContentTarget().empty().append(e) : (delete this.contentEl, this.html = e)
  },
  doLayout: function () {
    this.onComponentLayout()
  },
  onComponentLayout: Jux.emptyFn,
  updateLayout: function () {
    var e = this;
    while (e.parentContainer) e = e.parentContainer;
    e.doLayout()
  },
  setAttr: function (e, t) {
    return this.rendered ? this.$el.attr(e, t) : (this.attr = this.attr || {}, typeof e == "object" ? Jux.apply(this.attr, e) : this.attr[e] = t), this
  },
  addCls: function (e) {
    e = e || "";
    if (!this.rendered) {
      var t = e.split(" ");
      for (var n = 0, r = t.length; n < r; n++) {
        var i = t[n],
          s = new RegExp("(^| )" + i + "( |$)");
        s.test(this.cls) || (this.cls += " " + i)
      }
      this.cls = jQuery.trim(this.cls)
    } else this.$el.addClass(e);
    return this
  },
  removeCls: function (e) {
    if (!e) return this;
    if (!this.rendered) {
      var t = e.split(" "),
        n = function (e, t, n) {
          return t === " " && n === " " ? " " : ""
        };
      for (var r = 0, i = t.length; r < i; r++) {
        var s = t[r],
          o = new RegExp("(^| )" + s + "( |$)", "g");
        this.cls = this.cls.replace(o, n)
      }
    } else this.$el.removeClass(e);
    return this
  },
  toggleCls: function (e, t) {
    return typeof t == "undefined" ? this[this.hasCls(e) ? "removeCls" : "addCls"](e) : this[t ? "addCls" : "removeCls"](e), this
  },
  hasCls: function (e) {
    if (!this.rendered) {
      var t = new RegExp("(^| )" + e + "( |$)", "g");
      return t.test(this.cls)
    }
    return this.$el.hasClass(e)
  },
  setStyle: function (e, t) {
    return this.rendered ? this.$el.css(e, t) : (this.style = this.style || {}, typeof e == "object" ? Jux.apply(this.style, e) : this.style[e] = t), this
  },
  getContentTarget: function () {
    return this.getEl()
  },
  getUuid: function () {
    return this.uuid
  },
  getId: function () {
    return this.id
  },
  getEl: function () {
    return this.$el
  },
  setHtml: function (e) {
    this.rendered ? this.getContentTarget().html(e) : this.html = e
  },
  setSize: function (e, t) {
    typeof e != "undefined" && (this.width = e, this.rendered && this.$el.width(e)), typeof t != "undefined" && (this.height = t, this.rendered && this.$el.height(t))
  },
  setWidth: function (e) {
    this.setSize(e, undefined)
  },
  setHeight: function (e) {
    this.setSize(undefined, e)
  },
  getWidth: function () {
    return this.$el.width()
  },
  getInnerWidth: function () {
    return this.$el.innerWidth()
  },
  getOuterWidth: function (e) {
    return this.$el.outerWidth(e)
  },
  getHeight: function () {
    return this.$el.height()
  },
  getInnerHeight: function () {
    return this.$el.innerHeight()
  },
  getOuterHeight: function (e) {
    return this.$el.outerHeight(e)
  },
  getConfiguredWidth: function () {
    return this.width
  },
  getConfiguredHeight: function () {
    return this.height
  },
  getPadding: function (e) {
    return Jux.Css.getPadding(this.$el, e)
  },
  getMargin: function (e) {
    return Jux.Css.getMargin(this.$el, e)
  },
  getBorderWidth: function (e) {
    return Jux.Css.getBorderWidth(this.$el, e)
  },
  getFrameSize: function (e) {
    return Jux.Css.getFrameSize(this.$el, e)
  },
  setVisible: function (e) {
    return this[e ? "show" : "hide"]()
  },
  show: function (e) {
    return this.hidden = !1, this.rendered && (typeof e == "object" ? (e.target = this, this.currentAnimation = new ui.anim.Animation(e), this.currentAnimation.addListener("afteranimate", this.showComplete, this), this.currentAnimation.start()) : this.$el.show(), this.onShow(), this.fireEvent("show", this)), this
  },
  showComplete: Jux.emptyFn,
  hideComplete: Jux.emptyFn,
  onShow: function () {
    this.deferMaskShow && this.mask(this.deferredMaskConfig)
  },
  hide: function (e) {
    return this.hidden = !0, this.rendered && (typeof e == "object" ? (e.target = this, this.currentAnimation = new ui.anim.Animation(e), this.currentAnimation.addListener("afteranimate", this.hideComplete, this), this.currentAnimation.start()) : this.$el.hide(), this.onHide(), this.fireEvent("hide", this)), this
  },
  fadeOutAndHide: function () {
    this.hide({
      to: {
        opacity: 0
      }
    })
  },
  fadeInAndShow: function () {
    this.show({
      to: {
        opacity: 1
      }
    })
  },
  onHide: Jux.emptyFn,
  isHidden: function () {
    if (!this.rendered) return this.hidden;
    if (this.$el.css("display") === "none") return !0;
    var e = this.$el.parents(),
      t = e.length;
    if (t === 0 || !e.last().is("html")) return !0;
    for (var n = 0; n < t; n++)
      if (e.eq(n).css("display") === "none") return !0;
    return !1
  },
  detach: function () {
    this.rendered && this.$el.detach()
  },
  mask: function (e) {
    e = e || this.maskConfig, this.masked = !0, this.rendered ? this.isHidden() ? (this.deferMaskShow = !0, this.deferredMaskConfig = e) : (this._mask ? this._mask.updateConfig(e) : this._mask = new ui.Mask(this.getMaskTarget(), e), this._mask.show(), this.deferMaskShow = !1, delete this.deferredMaskConfig) : this.deferredMaskConfig = e
  },
  unMask: function () {
    this.masked = !1, this.deferMaskShow = !1, delete this.deferredMaskConfig, this.rendered && this._mask && this._mask.hide()
  },
  isMasked: function () {
    return this.masked
  },
  getMaskTarget: function () {
    return this.getEl()
  },
  setParentContainer: function (e) {
    this.parentContainer = e
  },
  getParentContainer: function () {
    return this.parentContainer
  },
  bubble: function (e, t, n) {
    var r = this;
    while (r) {
      if (e.apply(t || r, n || [r]) === !1) break;
      r = r.parentContainer
    }
  },
  findParentBy: function (e) {
    for (var t = this.parentContainer; t !== null && !e(t, this); t = t.parentContainer);
    return t || null
  },
  findParentById: function (e) {
    for (var t = this.parentContainer; t && t.id !== e; t = t.parentContainer);
    return t || null
  },
  findParentByType: function (e) {
    if (typeof e == "string") {
      e = ui.ComponentManager.getType(e);
      if (!e) return null
    }
    for (var t = this.parentContainer; t && !(t instanceof e); t = t.parentContainer);
    return t || null
  },
  getBubbleTarget: function () {
    return this.parentContainer
  },
  destroy: function () {
    if (!this.destroyed && this.fireEvent("beforedestroy", this) !== !1) {
      this.onDestroy(), this._mask instanceof ui.Mask && this._mask.destroy();
      for (var e in this)
        if (this.hasOwnProperty(e)) {
          var t = this[e];
          Jux.isElement(t) ? (jQuery(t).remove(), delete this[e]) : Jux.isJQuery(t) && (t.remove(), delete this[e])
        }
      this.rendered = !1, this.destroyed = !0, this.fireEvent("destroy", this), this.purgeListeners()
    }
  },
  onDestroy: Jux.emptyFn
}), ui.ComponentManager.registerType("Component", ui.Component), ui.Container = Class.extend(ui.Component, {
  statics: {
    LAYOUTS: {},
    registerLayout: function (e, t) {
      this.LAYOUTS[e.toLowerCase()] = t
    }
  },
  defaultType: "Container",
  acceptType: ui.Component,
  destroyRemoved: !0,
  deferLayout: !1,
  initComponent: function () {
    this.items && (this.html = undefined, this.contentEl = undefined);
    if (typeof this.getAcceptType() != "function") throw new Error("'acceptType' config did not resolve to a constructor function");
    this.addEvents("beforeadd", "add", "reorder", "beforeremove", "remove", "afterlayout"), this.enableBubble("add", "remove"), this._super(arguments), this.childComponents = [], this.items && (this.add(this.items), delete this.items), this.layout && this.setLayout(this.layout), this.data && this.setData(this.data)
  },
  getAcceptType: function () {
    return this.acceptType
  },
  createComponent: function (e) {
    return e = Jux.apply({}, e, {
      parentContainer: this,
      type: this.defaultType
    }), ui.ComponentManager.create(e)
  },
  add: function (e, t) {
    var n, r, i;
    typeof t == "object" && t !== null && (r = t.keepLayout, i = t.position);
    if (Jux.isArray(e)) {
      n = [];
      for (var s = 0, o = e.length; s < o; s++) n.push(this.doInsert(e[s]))
    } else n = this.doInsert(e, i);
    return r !== !0 && this.doLayout(), n
  },
  insert: function (e, t) {
    return e = this.doInsert(e, t), this.doLayout(), e
  },
  doInsert: function (e, t) {
    typeof t != "number" ? t = this.childComponents.length : t < 0 ? t = 0 : t > this.childComponents.length && (t = this.childComponents.length);
    var n = e instanceof ui.Component,
      r = n && this.has(e);
    if (r) {
      var i = this.childComponents;
      for (var s = 0, o = i.length; s < o; s++)
        if (i[s] === e) {
          this.childComponents.splice(s, 1);
          break
        }
      return this.childComponents.splice(t, 0, e), this.onReorder(e, t, s), this.fireEvent("reorder", this, e, t, s), e
    }
    n || (e = this.createComponent(e));
    if (e instanceof this.getAcceptType()) {
      if (this.fireEvent("beforeadd", this, e) !== !1) {
        var u = e.getParentContainer();
        return u && u.remove(e, !1), e.setParentContainer(this), this.childComponents.splice(t, 0, e), this.onAdd(e, t), this.fireEvent("add", this, e, t), e
      }
      return null
    }
    throw new Error("A Component added to the Container was not of the correct class type ('acceptType' config)")
  },
  onAdd: Jux.emptyFn,
  onReorder: Jux.emptyFn,
  remove: function (e, t) {
    var n;
    if (Jux.isArray(e)) {
      n = [];
      for (var r = 0, i = e.length; r < i; r++) {
        var s = this.doRemove(e[r], t);
        s && n.push(s)
      }
    } else n = this.doRemove(e, t);
    return this.doLayout(), n
  },
  removeAll: function (e) {
    var t = this.childComponents;
    for (var n = t.length - 1; n >= 0; n--) this.doRemove(t[n], e);
    this.doLayout()
  },
  doRemove: function (e, t) {
    var n, r, i = this.childComponents,
      s = -1;
    t = typeof t == "undefined" ? this.destroyRemoved : t;
    for (n = 0, r = i.length; n < r; n++)
      if (i[n] === e) {
        s = n;
        break
      }
    return s !== -1 && this.fireEvent("beforeremove", this, e) !== !1 ? (e.setParentContainer(null), e.detach(), i.splice(s, 1), this.onRemove(e, s), this.fireEvent("remove", this, e, s), t && e.destroy(), e) : null
  },
  onRemove: Jux.emptyFn,
  getCount: function () {
    return this.childComponents.length
  },
  getItems: function () {
    return this.childComponents
  },
  getItemAt: function (e) {
    return this.childComponents[e] || null
  },
  getItemIndex: function (e) {
    var t = this.childComponents;
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n] === e) return n;
    return -1
  },
  getModel: function (e) {
    return this.model ? this.model : e ? this.getParentContainerModel(e) : null
  },
  getParentContainerModel: function (e) {
    var t = this.getParentContainer(),
      n = null;
    return t && t instanceof ui.Container && (n = t.getModel(e)), n
  },
  has: function (e) {
    return this.getItemIndex(e) !== -1
  },
  onShow: function () {
    this._super(arguments), this.deferLayout && this.doLayout();
    var e = this.childComponents;
    for (var t = 0, n = e.length; t < n; t++) {
      var r = e[t];
      r.hidden || e[t].onShow()
    }
  },
  doLayout: function () {
    this._super(arguments), this.canLayout() ? (this.deferLayout = !1, this.onBeforeLayout(), this.getLayout().doLayout(), this.onLayout(), this.fireEvent("afterlayout", this)) : this.deferLayout = !0
  },
  onBeforeLayout: Jux.emptyFn,
  onLayout: Jux.emptyFn,
  canLayout: function () {
    return this.rendered && !this.isHidden()
  },
  getLayout: function () {
    return this.layout || this.setLayout(new ui.layout.ContainerLayout), this.layout
  },
  setLayout: function (e) {
    if (this.layout instanceof ui.layout.Layout && this.layout !== e) {
      var t = this.childComponents;
      for (var n = 0, r = t.length; n < r; n++) t[n].detach();
      this.layout.destroy()
    }
    if (e instanceof ui.layout.Layout) this.layout = e, e.setContainer(this);
    else {
      var i, s = {
          container: this
        };
      if (typeof e == "string") i = e;
      else {
        if (typeof e != "object") throw new Error("Invalid layout argument provided to setLayout. See method description in docs.");
        i = e.type || "container", s = Jux.apply({}, s, e), delete s.type
      }
      i = i.toLowerCase();
      if (!ui.Container.LAYOUTS[i]) throw new Error("layout type '" + i + "' is not a registered layout type.");
      this.layout = new ui.Container.LAYOUTS[i](s)
    }
  },
  setData: function (e) {
    var t = this.getDataControls();
    for (var n = 0, r = t.length; n < r; n++) {
      var i = t[n],
        s = i.getKey();
      typeof e[s] != "undefined" && i.setData(e[s])
    }
  },
  getData: function () {
    var e = {}, t = this.getDataControls();
    for (var n = 0, r = t.length; n < r; n++) {
      var i = t[n],
        s = i.getKey();
      s && (e[s] = i.getData())
    }
    return e
  },
  getDataControls: function () {
    var e = [];
    return this.cascade(function (n) {
      if (Jux.isInstanceOf(n, ui.DataControl)) return e.push(n), !1
    }, this), e
  },
  cascade: function (e, t, n) {
    if (e.apply(t || this, n || [this]) !== !1) {
      var r = this.childComponents;
      for (var i = 0, s = r.length; i < s; i++) r[i].cascade ? r[i].cascade(e, t, n) : e.apply(t || r[i], n || [r[i]])
    }
  },
  findById: function (e) {
    var t = null,
      n = this;
    return this.cascade(function (r) {
      if (r !== n && r.getId() === e) return t = r, !1
    }), t
  },
  findByKey: function (e) {
    if (!e) return null;
    var t = null,
      n = this,
      r = Jux.isInstanceOf,
      i = ui.DataControl;
    return this.cascade(function (s) {
      if (s !== n && r(s, i)) return s.getKey() === e && (t = s), !1
    }), t
  },
  findBy: function (e, t) {
    var n = [],
      r = this;
    return this.cascade(function (i) {
      i != r && e.call(t || i, i, r) === !0 && n.push(i)
    }), n
  },
  findByType: function (e) {
    if (typeof e == "string") {
      e = ui.ComponentManager.getType(e);
      if (!e) return []
    }
    return this.findBy(function (t) {
      if (Jux.isInstanceOf(t, e)) return !0
    })
  },
  onDestroy: function () {
    this.removeAll(), this.layout instanceof ui.layout.Layout && this.layout.destroy(), this._super(arguments)
  }
}), ui.ComponentManager.registerType("Container", ui.Container), ui.AbstractOverlay = Class.extend(ui.Container, {
  autoDestroy: !0,
  autoOpen: !1,
  closeOnEscape: !0,
  closeOnMouseOut: !1,
  closeOnMouseOutDelay: 2e3,
  opened: !1,
  opening: !1,
  closing: !1,
  currentAnimation: null,
  initComponent: function () {
    this._super(arguments), this.addEvents("beforeopen", "open", "openbegin", "opencomplete", "beforeblurclose", "beforeclose", "closebegin", "close", "closecomplete"), this.closeOnMouseOut && (this.mouseOutHideTask = new Jux.util.DelayedTask), this.autoOpen && this.open()
  },
  onRender: function () {
    this._super(arguments), this.$contentContainer = jQuery('<div class="ui-overlay-content" />').appendTo(this.$el), this.closeOnEscape && this.$el.keydown(function (e) {
      e.keyCode === jQuery.ui.keyCode.ESCAPE && this.close()
    }.createDelegate(this)), this.closeOnMouseOut && this.$el.on({
      "mouseenter mousemove": jQuery.proxy(this.onMouseEnter, this),
      mouseleave: jQuery.proxy(this.onMouseLeave, this)
    });
    var e = new Jux.util.DelayedTask(function () {
      this.onWindowResize()
    }, this);
    this.windowResizeHandler = function () {
      e.delay(150)
    }, jQuery(window).bind("resize", this.windowResizeHandler)
  },
  getContentTarget: function () {
    return this.$contentContainer
  },
  onMouseEnter: function () {
    this.mouseOutHideTask.cancel()
  },
  onMouseLeave: function () {
    this.mouseOutHideTask.delay(this.closeOnMouseOutDelay, this.close, this)
  },
  open: function (e) {
    e = e || {}, typeof e.animate == "undefined" && (e.animate = !0), this.closing && this.currentAnimation.end();
    if (!this.opened && this.fireEvent("beforeopen", this) !== !1) {
      this.opened = !0, this.opening = !0, this.rendered || this.render(document.body), this.show(), this.onBeforeOpen(e);
      if (e.anchor) this.setAnchor(e.anchor);
      else if (e.hasOwnProperty("x") || e.hasOwnProperty("y")) {
        var t = typeof e.x != "undefined" ? e.x : this.x,
          n = typeof e.y != "undefined" ? e.y : this.y;
        this.setPosition(t, n)
      } else this.updatePosition();
      this.onOpen(), this.fireEvent("openbegin", this), this.fireEvent("open", this);
      if (this.openAnim && e.animate) {
        var r = Jux.apply({}, {
          target: this
        }, this.openAnim);
        this.currentAnimation = new ui.anim.Animation(r), this.currentAnimation.addListener("afteranimate", this.openComplete, this), this.currentAnimation.start()
      } else this.openComplete()
    }
  },
  onBeforeOpen: Jux.emptyFn,
  openComplete: function () {
    this.opening = !1, this.currentAnimation = null, this.fireEvent("opencomplete", this)
  },
  onOpen: Jux.emptyFn,
  isOpen: function () {
    return this.opened
  },
  getHeight: function () {
    return this.isOpen() ? this.$el.outerHeight() : 0
  },
  getWidth: function () {
    return this.isOpen() ? this.$el.outerWidth() : 0
  },
  setPosition: function (e, t) {
    this.x = e, this.y = t, this.anchor = null, this.updatePosition()
  },
  setAnchor: function (e) {
    this.anchor = e, this.updatePosition()
  },
  updatePosition: function () {
    if (this.isOpen()) {
      var e, t, n, r, i, s = this.$el;
      if (this.anchor) {
        var o = this.anchor;
        e = o.my || "left top", t = o.at || "left bottom", n = o.element || o.of, r = o.offset, i = o.collision || "flip", n instanceof ui.Component && (n = n.getEl())
      } else {
        var u = this.x > 0 ? "left" : "right",
          a = this.y > 0 ? "top" : "bottom";
        e = t = u + " " + a, n = document.body, r = this.x + " " + this.y
      }
      e = this.convertOffsetToNewPositionApi(r, e), s.position({
        my: e,
        at: t,
        of: n,
        collision: i
      }), this.checkCollision()
    }
  },
  convertOffsetToNewPositionApi: function (e, t) {
    if (!e) return t;
    var n = e.split(" "),
      r = t.split(" "),
      i = !1,
      s = _.map(n, function (e, t) {
        if (r[t]) return r[t] + "+" + e;
        i = !0
      });
    return i ? (Jux.logError('Offset did not match "my" value', e, t), t) : s.join(" ")
  },
  checkCollision: function () {
    var e = this.anchor;
    if (e) {
      var t = e.collision || "flip";
      if (t.indexOf("flip") > -1) {
        var n = this.$el.attr("class");
        /(^| )ui-flipped-(top|bottom|left|right)( |$)/.test(n) && this.onCollision("flip", {
          top: /(^| )ui-flipped-bottom( |$)/.test(n),
          bottom: /(^| )ui-flipped-top( |$)/.test(n),
          left: /(^| )ui-flipped-right( |$)/.test(n),
          right: /(^| )ui-flipped-left( |$)/.test(n)
        })
      }
    }
  },
  onCollision: function (e, t) {},
  onWindowResize: function () {
    this.updatePosition()
  },
  close: function (e) {
    e = e || {}, typeof e.animate == "undefined" && (e.animate = !0), this.opening && this.currentAnimation.end();
    if (this.opened && !this.closing && this.fireEvent("beforeclose", this) !== !1) {
      this.opened = !1, this.closing = !0, this.onBeforeClose(e), this.closeOnMouseOut && this.mouseOutHideTask.cancel(), this.fireEvent("closebegin", this);
      if (this.closeAnim && e.animate) {
        var t = Jux.apply({}, {
          target: this
        }, this.closeAnim);
        this.currentAnimation = new ui.anim.Animation(t), this.currentAnimation.addListener("afteranimate", this.closeComplete, this), this.currentAnimation.start()
      } else this.closeComplete()
    }
  },
  onBeforeClose: Jux.emptyFn,
  closeComplete: function () {
    this.closing = !1, this.currentAnimation = null, this.hide(), this.onClose(), this.fireEvent("close", this), this.fireEvent("closecomplete", this), this.autoDestroy && this.destroy()
  },
  onClose: Jux.emptyFn,
  onDestroy: function () {
    this.isOpen() && this.close({
      animate: !1
    }), this.rendered && jQuery(window).unbind("resize", this.windowResizeHandler), this._super(arguments)
  }
}), ui.Overlay = Class.extend(ui.AbstractOverlay, {
  arrow: null,
  initComponent: function () {
    this.cls += " ui-overlay", this.hidden = !0, this.value && this.setArrow(this.arrow), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments), this.arrow && this.renderArrow(this.arrow)
  },
  renderArrow: function (e) {
    this.$arrow && (this.$arrow.remove(), this.$arrow = null);
    if (e) {
      var t = e.side,
        n = e.offset,
        r;
      t === "top" || t === "bottom" ? r = (n < 0 ? "right: " : "left: ") + Math.abs(n) + "px" : r = (n < 0 ? "bottom: " : "top: ") + Math.abs(n) + "px", this.$arrow = jQuery('<div class="ui-overlay-arrow ui-overlay-arrow-' + t + '" style="' + r + '"></div>').prependTo(this.$el)
    }
  },
  open: function (e) {
    e = e || {}, e.dontCloseOn && (this.dontCloseOn = e.dontCloseOn), this._super([e]), this.docBodyClickHandler = function (e) {
      this.onDocBodyClick(e)
    }.createDelegate(this), window.setTimeout(function () {
      jQuery(document.body).bind("mousedown touchend", this.docBodyClickHandler)
    }.createDelegate(this), 10)
  },
  setArrow: function (e) {
    this.arrow = e, e && typeof e.offset == "undefined" && (e.offset = 10), this.rendered && this.renderArrow(e)
  },
  setDontCloseOn: function (e) {
    this.dontCloseOn = e
  },
  onCollision: function (e, t) {
    this._super(arguments);
    var n = Jux.clone(this.arrow);
    if (n && e === "flip") {
      var r = n.side;
      if (t.top || t.bottom) {
        if (r === "top" || r === "bottom") n.side = r === "top" ? "bottom" : "top";
        if (r === "left" || r === "right") n.offset *= -1
      }
      if (t.left || t.right) {
        if (r === "left" || r === "right") n.side = r === "left" ? "right" : "top";
        if (r === "top" || r === "bottom") n.offset *= -1
      }
      this.renderArrow(n)
    }
  },
  onDocBodyClick: function (e) {
    var t = jQuery(e.target).parents().addBack();
    !t.is(this.$el) && !t.is(this.dontCloseOn) && this.fireEvent("beforeblurclose", this, e) !== !1 && this.close()
  },
  onBeforeClose: function () {
    jQuery(document.body).unbind("mousedown", this.docBodyClickHandler).unbind("touchend", this.docBodyClickHandler), this.docBodyClickHandler = null
  }
}), ui.Dialog = Class.extend(ui.Container, {
  autoDestroy: !0,
  autoOpen: !1,
  modal: !1,
  overlay: !0,
  x: "center",
  y: "center",
  height: "auto",
  width: "auto",
  minHeight: 10,
  minWidth: "auto",
  title: "",
  closeButton: !0,
  closeOnEscape: !0,
  buttons: [],
  initComponent: function () {
    this.dialogHeight = this.height, this.height = undefined, this.dialogWidth = this.width, this.width = undefined, this.dialogMinHeight = this.minHeight, this.minHeight = undefined, this.dialogMinWidth = this.minWidth, this.minWidth = undefined, this.dialogMaxHeight = this.maxHeight, this.maxHeight = undefined, this.dialogMaxWidth = this.maxWidth, this.maxWidth = undefined, this.addEvents("beforeopen", "open", "beforeclose", "close", "keypress"), this.cls += " dialog-content", this.setTitle(this.title);
    var e = !1,
      t = this.footer;
    if (Jux.isString(t) || Jux.isElement(t) || Jux.isJQuery(t)) e = !0;
    this.footerContainer = new ui.Container({
      cls: "dialog-bottom-content-left",
      style: {
        display: "inline-block"
      },
      contentEl: e ? t : undefined,
      items: e ? undefined : t
    }), this.buttonsContainer = new ui.Container({
      defaultType: "Button",
      cls: "dialog-bottom-content-right",
      style: {
        display: "inline-block"
      },
      items: this.buttons
    }), this.bottomBarContainer = new ui.Container({
      cls: "dialog-bottom-content ui-corner-all",
      hidden: !0,
      items: [this.footerContainer, this.buttonsContainer]
    }), ui.Dialog.superclass.initComponent.call(this), this.autoOpen && this.open()
  },
  onRender: function () {
    this._super(arguments), this.$dialog = jQuery("<div />"), this.$contentContainer = this.$el.appendTo(this.$dialog), typeof this.dialogMinWidth != "undefined" && this.$contentContainer.css("min-width", this.dialogMinWidth), typeof this.dialogMinHeight != "undefined" && this.$contentContainer.css("min-height", this.dialogMinHeight), this.bottomBarContainer.render(this.$dialog), this.$dialog.dialog({
      dialogClass: "jux-dialog jux " + this.cls,
      title: this.title,
      modal: this.modal,
      draggable: !0,
      autoOpen: !1,
      resizable: !1,
      closeOnEscape: !1,
      minWidth: 0,
      minHeight: 0,
      width: this.dialogWidth,
      height: this.dialogHeight,
      dragStop: this.onDragStop.createDelegate(this)
    });
    var e = this.$dialogOuter = this.$dialog.dialog("widget");
    e.wrapInner('<div class="dialog-innerWrap" />'), this.$dialogInner = e.find(".dialog-innerWrap");
    var t = e.find("div.ui-dialog-titlebar"),
      n = t.find("a.ui-dialog-titlebar-close");
    n.remove(), this.closeButton === !0 && (this.closeButton = new ui.toolButtons.CloseButton({
      handler: function () {
        this.close()
      },
      scope: this
    })), this.closeButton instanceof ui.Button && (this.closeButton.render(t), this.closeButton.getEl().addClass("ui-dialog-titlebar-close")), this.$contentContainer.bind("keypress", this.onKeyPress.createDelegate(this));
    var r = new Jux.util.DelayedTask(function () {
      this.onWindowResize()
    }, this);
    this.windowResizeHandler = function () {
      r.delay(150)
    }, Jux.Util.getWindowObject().bind("resize", this.windowResizeHandler)
  },
  open: function () {
    this.fireEvent("beforeopen", this) !== !1 && (this.rendered || this.render(document.body), this.$dialog.dialog("open"), this.modal === !0 && (this.$overlayEl = jQuery("body div.ui-widget-overlay:last"), this.$overlayEl.css("z-index", 1003), this.overlay === !1 && this.$overlayEl.css("opacity", 0)), this.show(), (this.footer || this.buttons.length > 0) && this.bottomBarContainer.show(), this.resizeContentContainer(), this.setPosition(this.x, this.y), this.onOpen(), this.fireEvent("open", this))
  },
  onOpen: Jux.emptyFn,
  isOpen: function () {
    return this.rendered && this.$dialog.dialog("isOpen")
  },
  getHeight: function () {
    return this.isOpen() ? this.$dialog.dialog("widget").outerHeight() : 0
  },
  getWidth: function () {
    return this.isOpen() ? this.$dialog.dialog("widget").outerWidth() : 0
  },
  setTitle: function (e) {
    if (e instanceof ui.Component) {
      var t = document.createDocumentFragment();
      e.render(t), e = e.getEl()
    }
    this.title = e, this.$dialog && this.$dialog.dialog("option", "title", e)
  },
  setFooter: function (e) {
    this.bottomBarContainer.isHidden() && this.bottomBarContainer.show(), this.footerContainer.removeAll(), this.footerContainer.getEl().empty(), e instanceof ui.Component ? this.footerContainer.add(e) : this.footerContainer.getEl().append(e)
  },
  setButtons: function (e) {
    this.bottomBarContainer.isHidden() && this.bottomBarContainer.show(), this.buttonsContainer.removeAll(), this.buttonsContainer.add(e)
  },
  setPosition: function (e, t) {
    this.x = e, this.y = t;
    if (this.isOpen()) {
      if (e < 0 || t < 0) {
        var n = Jux.Util.getWindowObject();
        e < 0 && (e = n.width() - this.getWidth() - -e), t < 0 && (t = n.height() - this.getHeight() - -t)
      }
      this.$dialog.dialog("option", "position", [e, t])
    }
  },
  getPosition: function () {
    if (!this.isOpen()) return {
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    var e = jQuery(window),
      t = this.$dialog.dialog("widget").position(),
      n = t.left,
      r = t.top,
      i = e.width() - (t.left + this.getWidth()),
      s = e.height() - (t.top + this.getHeight());
    return {
      x: n,
      y: r,
      left: n,
      top: r,
      right: i,
      bottom: s
    }
  },
  resizeContentContainer: function () {
    if (this.isOpen()) {
      var e = jQuery(window),
        t = this.$dialog.dialog("widget"),
        n = this.$dialogInner,
        r = this.$dialog,
        i = t.find("div.ui-dialog-titlebar"),
        s = this.bottomBarContainer.getEl(),
        o = this.$contentContainer,
        u = function (e) {
          return {
            height: parseInt(e.css("marginTop"), 10) + parseInt(e.css("borderTopWidth"), 10) + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("marginBottom"), 10) + parseInt(e.css("borderBottomWidth"), 10) + parseInt(e.css("paddingBottom"), 10),
            width: parseInt(e.css("marginLeft"), 10) + parseInt(e.css("borderLeftWidth"), 10) + parseInt(e.css("paddingLeft"), 10) + parseInt(e.css("marginRight"), 10) + parseInt(e.css("borderRightWidth"), 10) + parseInt(e.css("paddingRight"), 10)
          }
        }, a = u(t),
        f = u(n),
        l = u(r),
        c = a.height + f.height + l.height + i.outerHeight(!0) + s.outerHeight(!0),
        h = a.width + f.width + l.width,
        p = Math.min(+this.dialogMaxHeight || Number.POSITIVE_INFINITY, e.height() - 20),
        d = Math.min(+this.dialogMaxWidth || Number.POSITIVE_INFINITY, e.width() - 20),
        v = p - c,
        m = d - h;
      t.css("maxHeight", Math.max(p - a.height, 0)), t.css("maxWidth", Math.max(d - a.width, 0)), n.css("maxHeight", Math.max(p - a.height - f.height, 0)), n.css("maxWidth", Math.max(d - a.width - f.width, 0)), o.css("maxHeight", Math.max(v, 0)), o.css("maxWidth", Math.max(m, 0)), this.masked && this.mask()
    }
  },
  onWindowResize: function () {
    this.resizeContentContainer(), this.setPosition(this.x, this.y)
  },
  onDragStop: function (e, t) {
    var n = t.position;
    this.x = n.left, this.y = n.top
  },
  onKeyPress: function (e) {
    this.fireEvent("keypress", this, e), this.closeOnEscape && e.keyCode === jQuery.ui.keyCode.ESCAPE && this.close()
  },
  close: function () {
    this.rendered && this.fireEvent("beforeclose", this) !== !1 && (this.onBeforeClose(), this.modal && this.overlay === !1 && this.$overlayEl.css("opacity", ""), this.$overlayEl = null, this.$dialog.dialog("close"), this.onClose(), this.fireEvent("close", this), this.autoDestroy && this.destroy())
  },
  onBeforeClose: Jux.emptyFn,
  onClose: Jux.emptyFn,
  onDestroy: function () {
    this.isOpen() && this.close(), this.bottomBarContainer.destroy(), this.rendered && (jQuery(window).unbind("resize", this.windowResizeHandler), this.$dialog.dialog("destroy"), this.$dialog.unbind()), ui.Dialog.superclass.onDestroy.apply(this, arguments)
  },
  getMaskTarget: function () {
    return this.$dialogInner
  },
  cascade: function () {
    ui.Dialog.superclass.cascade.apply(this, arguments), this.bottomBarContainer.cascade.apply(this.bottomBarContainer, arguments)
  }
}), ui.FieldSet = Class.extend(ui.Container, {
  title: "",
  elType: "fieldset",
  initComponent: function () {
    this.cls += " dialog-fieldSet", ui.FieldSet.superclass.initComponent.call(this)
  },
  onRender: function () {
    ui.FieldSet.superclass.onRender.apply(this, arguments), this.$legendEl = jQuery("<legend>" + this.title + "</legend>").appendTo(this.$el)
  },
  setTitle: function (e) {
    this.rendered ? this.$legendEl.empty().append(e) : this.title = e
  }
}), ui.ComponentManager.registerType("FieldSet", ui.FieldSet), ui.Button = Class.extend(ui.Component, {
  iconSrc: "",
  text: "",
  tooltip: "",
  priority: "normal",
  disabled: !1,
  removeHoverStateOnClick: !1,
  elType: "button",
  initComponent: function () {
    ui.Button.superclass.initComponent.call(this), this.addEvents("click", "mouseenter", "mouseleave"), this.label && (this.text = this.label, delete this.label), this.hasOwnProperty("onClick") && (this.handler = this.onClick, delete this.onClick)
  },
  onRender: function (e) {
    ui.Button.superclass.onRender.apply(this, arguments), this.text && this.$el.append(this.text), this.tooltip && this.$el.attr("title", this.tooltip);
    var t = {
      icons: {
        primary: null,
        secondary: null
      },
      text: this.text !== "" ? !0 : !1,
      disabled: this.disabled
    };
    this.primaryIcon && (t.icons.primary = this.primaryIcon), this.secondaryIcon && (t.icons.secondary = this.secondaryIcon), this.$el.button(t), this.priority === "primary" ? this.$el.addClass("ui-priority-primary") : this.priority === "secondary" && this.$el.addClass("ui-priority-secondary");
    if (this.iconSrc) {
      var n = jQuery('<img src="' + this.iconSrc + '" style="margin-right: 5px; vertical-align: middle;" />');
      this.$el.find("span").prepend(n)
    }
    this.$el.bind({
      mouseenter: this.onMouseEnter.createDelegate(this),
      mouseleave: this.onMouseLeave.createDelegate(this),
      click: this.onClick.createDelegate(this)
    })
  },
  setText: function (e) {
    this.rendered ? this.$el.find("span").empty().append(e) : this.text = e
  },
  disable: function () {
    this.disabled = !0, this.rendered && this.$el.button("disable")
  },
  enable: function () {
    this.disabled = !1, this.rendered && this.$el.button("enable")
  },
  setDisabled: function (e) {
    e ? this.disable() : this.enable()
  },
  onClick: function () {
    this.removeHoverStateOnClick && this.$el.removeClass("ui-state-hover"), typeof this.handler == "function" && this.handler.call(this.scope || this, this), this.fireEvent("click", this)
  },
  onMouseEnter: function () {
    this.fireEvent("mouseenter", this)
  },
  onMouseLeave: function () {
    this.fireEvent("mouseleave", this)
  }
}), ui.ComponentManager.registerType("Button", ui.Button), ui.DataControl = Class.extend(Jux.util.Observable, {
  key: null,
  constructor: function () {
    ui.DataControl.superclass.constructor.call(this), this.addEvents("datachange")
  },
  getKey: function () {
    return this.key
  },
  getData: function () {
    throw new Error("ui.DataControl::getData() must be implemented in subclass.")
  },
  setData: function (e) {
    throw new Error("ui.DataControl::setData() must be implemented in subclass.")
  },
  onDataChange: function () {
    this.fireEvent("datachange", this)
  }
}), ui.Label = Class.extend(ui.Component, {
  text: "",
  initComponent: function () {
    this.cls += " ui-label", this._super(arguments)
  },
  onRender: function () {
    this._super(arguments), this.$el.append(this.text || "")
  },
  setText: function (e) {
    this.rendered ? this.$el.empty().append(e) : this.text = e
  },
  getText: function () {
    return this.rendered ? this.$el.html() : this.text || ""
  }
}), ui.ComponentManager.registerType("Label", ui.Label), ui.Mask = Class.extend(Object, {
  spinner: !0,
  msg: "",
  spinnerURL: Jux.Cdn.BASE_URI + "assets/spinner2e2d2d.gif",
  rendered: !1,
  shown: !1,
  constructor: function (e, t) {
    if (Jux.isElement(e)) this.$targetEl = jQuery(e);
    else {
      if (!Jux.isJQuery(e)) throw new Error("ui.Mask requires the first argument to its constructor to be an HTMLElement, or a jQuery wrapped set");
      if (e.length !== 1) throw new Error("If the 'targetEl' argument to the ui.Mask constructor is a jQuery wrapped set, it must contain exactly one element.");
      this.$targetEl = e
    }
    t || (t = {}), this.updateConfig(t)
  },
  updateConfig: function (e) {
    delete this.spinner, delete this.msg, Jux.apply(this, e), this.rendered && this.updateMaskElements()
  },
  initMaskElements: function () {
    if (!this.rendered) {
      var e = this.$targetEl;
      this.$maskEl = jQuery('<div class="ui-mask" />').click(function (e) {
        e.stopPropagation()
      }).appendTo(e), this.$contentEl = jQuery('<div class="ui-mask-content" />').append('<img class="ui-mask-content-spinner" src="' + this.spinnerURL + '" />').click(function (e) {
        e.stopPropagation()
      }).appendTo(e), this.$msgEl = jQuery('<div class="ui-mask-msg" />').appendTo(this.$contentEl), this.rendered = !0, this.updateMaskElements()
    }
  },
  updateMaskElements: function () {
    this.rendered && (this.spinner ? this.$contentEl.addClass("ui-mask-spinnerEnabled") : this.$contentEl.removeClass("ui-mask-spinnerEnabled"), this.$msgEl.empty(), this.msg ? (this.$contentEl.addClass("ui-mask-contentBox"), this.$msgEl.append(this.msg)) : this.$contentEl.removeClass("ui-mask-contentBox"))
  },
  show: function (e) {
    this.initMaskElements();
    var t = this.$targetEl,
      n = this.$maskEl,
      r = this.$contentEl;
    t.addClass("ui-masked"), t.css("position") === "static" && !t.is("body") && t.addClass("ui-masked-relative"), e ? (n.hide(), n.fadeIn()) : n.show(), n.height(t.outerHeight()), r.show(), this.shown = !0, this.repositionContentEl();
    var i = setInterval(function () {
      this.isShown() ? this.repositionContentEl() : clearInterval(i)
    }.createDelegate(this), 100)
  },
  repositionContentEl: function () {
    this.$contentEl.position({
      my: "center center",
      at: "center center",
      of: this.$targetEl
    })
  },
  hide: function (e) {
    this.isShown() && (e ? (this.$maskEl.fadeOut(), this.$contentEl.fadeOut()) : (this.$maskEl.hide(), this.$contentEl.hide()), this.$targetEl.removeClass("ui-masked").removeClass("ui-masked-relative"), this.shown = !1)
  },
  isShown: function () {
    return this.shown
  },
  destroy: function () {
    this.hide(), this.rendered && (this.$msgEl.remove(), this.$contentEl.remove(), this.$maskEl.remove())
  }
}), ui.Slider = Class.extend(ui.Component, {
  mixins: [ui.DataControl],
  min: 0,
  max: 100,
  step: 1,
  initComponent: function () {
    this.addEvents("change"), this.cls += " ui-sliderComponent", this.handlePositions ? Jux.isArray(this.handlePositions) || (this.handlePositions = [this.handlePositions]) : this.handlePositions = [this.min], this._super(arguments), ui.DataControl.constructor.call(this)
  },
  setMaxSize: function (e) {
    this.max = e, this.$sliderEl && (this.$sliderEl.slider("option", "max", e), this.$sliderEl.slider("option", "min") === e ? this.$sliderEl.slider("disable") : this.$sliderEl.slider("enable"), this.$sliderEl.slider("option", "values")[0] > e && this.setHandlePositions([e]))
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el,
      t = jQuery("<div />").appendTo(e);
    t.slider({
      min: this.min,
      max: this.max,
      step: this.step,
      values: this.handlePositions,
      slide: this.onSlideChange.createDelegate(this)
    }), this.$sliderEl = t, this.setMaxSize(this.max), t.wrapInner('<div class="ui-slider-handleHelper" />'), this.$handleHelper = t.find(".ui-slider-handleHelper"), this.$handles = t.find(".ui-slider-handle"), this.$handles.bind({
      mousedown: function () {
        t.width(this.$handleHelper.width())
      }.createDelegate(this)
    }), t.bind("slidestop", function () {
      t.width("100%")
    }), window.setTimeout(function () {
      this.sizeHandleHelper()
    }.createDelegate(this), 0)
  },
  onShow: function () {
    this._super(arguments), this.sizeHandleHelper()
  },
  sizeHandleHelper: function () {
    if (this.rendered && !this.destroyed) {
      var e = this.$sliderEl,
        t = this.$handleHelper,
        n = this.$handles,
        r = n.outerWidth();
      n.css("margin-left", -r / 2), t.width("").width(e.innerWidth() - r)
    }
  },
  onSlideChange: function (e, t) {
    this.handlePositions = t.values, this.notifyOfChange()
  },
  notifyOfChange: function () {
    this.fireEvent("change", this, this.getHandlePositions()), this.onDataChange()
  },
  setHandlePositions: function (e) {
    Jux.isArray(e) || (e = [e]), this.handlePositions = e, this.rendered && this.$sliderEl.slider("values", e), this.notifyOfChange()
  },
  getHandlePositions: function () {
    return this.handlePositions
  },
  setData: function () {
    this.setHandlePositions.apply(this, arguments)
  },
  getData: function () {
    return this.getHandlePositions()
  }
}), ui.ComponentManager.registerType("Slider", ui.Slider), ui.ButtonSet = Class.extend(ui.Component, {
  mixins: [ui.DataControl],
  buttonSetTpl: '<input type="radio" id="<%=id%>_<%=num%>" name="buttonSet_<%=id%>" value="<%=value%>" title="<%=text%>" <% if( checked ) { %>checked<% } %>><label for="<%=id%>_<%=num%>"><%=text%></label>',
  initComponent: function () {
    this.addEvents("change"), this.optionsStore = new ui.utils.OptionsStore(this.options);
    if (this.optionsStore.getOptions().length === 0) throw new Error("Error: The ButtonSet's 'options' was not configured.");
    typeof this.value == "undefined" ? this.value = this.optionsStore.getOptions()[0].value : this.optionsStore.getByValue(this.value) === null && (this.value = this.optionsStore.getOptions()[0].value), ui.ButtonSet.superclass.initComponent.call(this), ui.DataControl.constructor.call(this)
  },
  onRender: function () {
    ui.ButtonSet.superclass.onRender.apply(this, arguments), this.$el.change(this.onChange.createDelegate(this)), this.redrawOptions()
  },
  onChange: function (e) {
    this.fireEvent("change", this, this.getValue()), this.onDataChange()
  },
  setOptions: function (e) {
    this.optionsStore.setOptions(e), this.redrawOptions()
  },
  getOptions: function () {
    return this.optionsStore.getOptions()
  },
  redrawOptions: function () {
    if (this.rendered) {
      var e = this.getOptions(),
        t = this.buttonSetTpl,
        n = this.$el,
        r, i;
      this.buttonsetInitialized && n.buttonset("destroy"), n.empty();
      var s = "";
      for (r = 0, i = e.length; r < i; r++) {
        var o = e[r],
          u = {
            id: this.id,
            num: r,
            text: o.text,
            value: "radio" + r,
            checked: o.value === this.value
          };
        s += Jux.Util.tmpl(t, u)
      }
      n.append(s);
      var a = n.find("input");
      for (r = 0, i = a.length; r < i; r++) a.eq(r).data("value", e[r].value);
      n.buttonset(), this.buttonsetInitialized = !0
    }
  },
  setValue: function (e) {
    if (typeof e == "undefined" || e === null) return;
    var t = this.optionsStore.getByValue(e);
    if (t !== null) {
      this.value = e;
      if (!this.rendered) this.onChange();
      else {
        var n = this.$el.find(":radio");
        n.prop("checked", !1);
        for (var r = 0, i = n.length; r < i; r++) {
          var s = n.eq(r);
          if (s.data("value") === e) {
            s.prop("checked", !0), s.change();
            break
          }
        }
      }
    }
  },
  getValue: function () {
    return this.rendered ? this.$el.find(":radio:checked").data("value") : this.value
  },
  setData: function () {
    this.setValue.apply(this, arguments)
  },
  getData: function () {
    return this.getValue()
  }
}), ui.ComponentManager.registerType("ButtonSet", ui.ButtonSet), ui.ColorPicker = Class.extend(ui.Component, {
  mixins: [ui.DataControl],
  color: "#000000",
  initComponent: function () {
    this.addEvents("change"), this.cls += " ui-colorPicker", this.color && (this.color = this.normalizeColorValue(this.color)), ui.ColorPicker.superclass.initComponent.call(this), ui.DataControl.constructor.call(this)
  },
  onRender: function () {
    ui.ColorPicker.superclass.onRender.apply(this, arguments);
    var e = this.$el;
    this.$selectedColorEl = jQuery('<div class="ui-colorPicker-selectedColor" style="background-color: ' + this.color + '" />').appendTo(e), e.ColorPicker({
      color: this.color,
      onShow: function (e) {
        return jQuery(e).fadeIn(500), !1
      },
      onHide: function (e) {
        return jQuery(e).fadeOut(500), !1
      },
      onChange: this.onChange.createDelegate(this)
    })
  },
  onChange: function (e, t, n) {
    this.updateStoredColorValue("#" + t)
  },
  normalizeColorValue: function (e) {
    e.charAt(0) !== "#" && (e = "#" + e);
    if (e.length === 4) {
      var t = e.substr(1);
      e = "#";
      for (var n = 0; n < 3; n++) {
        var r = t[n].toString();
        e += r + r
      }
    }
    return e
  },
  updateStoredColorValue: function (e) {
    this.color = e, this.rendered && this.$selectedColorEl.css("background-color", e), this.fireEvent("change", this, e), this.onDataChange()
  },
  setColor: function (e) {
    e = this.normalizeColorValue(e), this.rendered && this.$el.ColorPickerSetColor(e), this.updateStoredColorValue(e)
  },
  getColor: function () {
    return this.color
  },
  onDestroy: function () {
    this.rendered && this.$el.ColorPickerDestroy(), ui.ColorPicker.superclass.onDestroy.apply(this, arguments)
  },
  setData: function () {
    this.setColor.apply(this, arguments)
  },
  getData: function () {
    return this.getColor()
  }
}), ui.ComponentManager.registerType("ColorPicker", ui.ColorPicker), ui.Viewport = Class.extend(ui.Container, {
  layout: "fit",
  initComponent: function () {
    this._super(arguments), this.windowResizeDelayedTask = new Jux.util.DelayedTask, this.onWindowResizeDelegate = this.onWindowResize.createDelegate(this), jQuery(window).bind("resize", this.onWindowResizeDelegate)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el.parent();
    this.getEl().css({
      position: "relative",
      "overflow-x": "hidden",
      "overflow-y": "auto"
    }), this.recalcDimensions()
  },
  recalcDimensions: function () {
    if (this.rendered) {
      var e = this.$el,
        t = e.parent();
      e.css({
        width: t.width(),
        height: t.height()
      })
    }
  },
  onWindowResize: function () {
    this.windowResizeDelayedTask.delay(50, this.doResize, this)
  },
  doResize: function () {
    this.recalcDimensions(), this.doLayout()
  },
  onDestroy: function () {
    jQuery(window).unbind("resize", this.onWindowResizeDelegate), this.windowResizeDelayedTask.cancel(), this._super(arguments)
  }
}), ui.ComponentManager.registerType("Viewport", ui.Viewport), ui.Image = Class.extend(ui.Component, {
  src: "",
  elType: "img",
  loaded: !1,
  errored: !1,
  blankImg: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  initComponent: function () {
    this.addEvents("load", "error"), this.cls += " ui-image", this._super(arguments)
  },
  onRender: function () {
    this._super(arguments), this.src && this.setSrc(this.src)
  },
  setSrc: function (e) {
    this.src = e, this.rendered && (this.loaded = !1, this.errored = !1, this.$el.unbind(".uiImage"), this.$el.attr("src", this.blankImg), this.$el.bind({
      "load.uiImage": this.onImageLoad.createDelegate(this),
      "error.uiImage": this.onImageError.createDelegate(this)
    }), this.$el.attr("src", this.src))
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
  }
}), ui.ComponentManager.registerType("Image", ui.Image), ui.anim.Animation = Class.extend(Jux.util.Observable, {
  duration: 250,
  easing: "linear",
  running: !1,
  complete: !1,
  constructor: function (e) {
    Jux.apply(this, e), ui.anim.Animation.superclass.constructor.call(this), this.addEvents("beforeanimate", "afteranimate");
    if (!this.target) throw new Error("ui.anim.Animation: Error. No 'target' config provided");
    this.target instanceof ui.Component ? this.$target = jQuery(this.target.getEl()) : this.$target = jQuery(this.target), delete this.target;
    if (!this.to && !this.effect) throw new Error("ui.anim.Animation: Error. No 'to' or 'effect' config provided")
  },
  start: function () {
    if (!this.running && !this.complete && this.fireEvent("beforeanimate", this) !== !1) {
      this.running = !0, this.from && this.$target.css(this.from);
      if (this.effect) {
        var e, t;
        typeof this.effect == "object" ? (e = this.effect.type, t = this.effect) : (e = this.effect, t = {}), this.$target.effect(e, t, this.duration, this.onLastFrame.createDelegate(this))
      } else this.$target.animate(this.to, {
        duration: this.duration,
        easing: this.easing,
        complete: this.onLastFrame.createDelegate(this)
      })
    }
  },
  isRunning: function () {
    return this.running
  },
  isComplete: function () {
    return this.complete
  },
  end: function () {
    this.running && (this.$target.stop(!1, !0), this.onLastFrame())
  },
  onLastFrame: function () {
    this.running && (this.running = !1, this.complete = !0, typeof this.callback == "function" && this.callback.call(this.scope || window, this), this.fireEvent("afteranimate", this), delete this.$target)
  }
}), ui.layout.Layout = Class.extend(Jux.util.Observable, {
  abstractClass: !0,
  container: null,
  destroyed: !1,
  constructor: function (e) {
    this.addEvents("destroy"), Jux.apply(this, e), this._super(arguments), this.initLayout(), this.container && this.setContainer(this.container)
  },
  initLayout: Jux.emptyFn,
  setContainer: function (e) {
    this.container = e, this.onContainerSet(e)
  },
  getContainer: function () {
    return this.container
  },
  onContainerSet: Jux.emptyFn,
  doLayout: function () {
    if (this.destroyed) return;
    var e = this.container,
      t = e.getItems(),
      n = t.length,
      r = e.getContentTarget(),
      i, s, o = this.needsLayoutMap = {};
    for (s = 0; s < n; s++) i = t[s], o[i.getUuid()] = !0, i.on("afterlayout", this.markLayoutComplete, this);
    this.onLayout(t, r);
    for (s = 0; s < n; s++) i = t[s], i.un("afterlayout", this.markLayoutComplete, this), o[i.getUuid()] === !0 && i.doLayout();
    this.afterLayout(t, r)
  },
  onLayout: Jux.emptyFn,
  afterLayout: Jux.emptyFn,
  markLayoutComplete: function (e) {
    this.needsLayoutMap[e.getUuid()] = !1
  },
  renderComponent: function (e, t, n) {
    n = n || {};
    var r = n.position,
      i = e.getEl();
    if (!e.isRendered() || typeof r == "undefined" && i.parent()[0] !== t[0] || typeof r == "number" && t.children()[r] !== i[0] || (typeof r == "string" || typeof r == "object") && t.find(r).prev()[0] !== i[0]) Jux.apply(n, {
      deferLayout: !0
    }), e.render(t, n)
  },
  sizeComponent: function (e, t, n) {
    var r = t,
      i = n;
    isNaN(+t) || (r = t - e.getMargin("lr") - e.getPadding("lr") - e.getBorderWidth("lr")), isNaN(+n) || (i = n - e.getMargin("tb") - e.getPadding("tb") - e.getBorderWidth("tb")), e.setSize(r, i)
  },
  destroy: function () {
    this.destroyed || (this.onDestroy(), this.destroyed = !0, this.fireEvent("destroy", this), this.purgeListeners(), this.setContainer(null))
  },
  onDestroy: Jux.emptyFn
}), ui.layout.CardsLayout = Class.extend(ui.layout.Layout, {
  activeItem: 0,
  autoSize: !1,
  deferredRender: !0,
  initLayout: function () {
    this.addEvents("cardchange"), this.componentSizeCache = {}, this.transition || (this.transition = new ui.layout.CardsLayout.SwitchTransition), this._super(arguments)
  },
  onLayout: function (e, t) {
    this._super(arguments), typeof this.activeItem == "number" && (this.activeItem = this.getContainer().getItemAt(this.activeItem));
    var n = t.width(),
      r = t.height();
    if (this.deferredRender) this.activeItem !== null && this.renderAndSizeCard(this.activeItem, t, n, r);
    else
      for (var i = 0, s = e.length; i < s; i++) this.renderAndSizeCard(e[i], t, n, r), this.activeItem !== e[i] && e[i].hide()
  },
  renderAndSizeCard: function (e, t, n, r) {
    this.renderComponent(e, t);
    var i = e.getUuid(),
      s = this.componentSizeCache[i] || {};
    !this.autoSize && r !== s.height && (this.sizeComponent(e, undefined, r), this.componentSizeCache[i] = {
      height: r
    })
  },
  setActiveItem: function (e, t) {
    typeof e == "number" ? e = this.container.getItemAt(e) : e instanceof ui.Component && !this.container.has(e) && (e = null);
    if (!this.container.isRendered()) this.activeItem = e;
    else if (!e || this.activeItem !== e || !e.isRendered() || e.isHidden()) {
      var n = this.activeItem;
      n instanceof ui.Component || (n = null);
      if (e !== null) {
        var r = this.container.getContentTarget();
        this.renderAndSizeCard(e, r, r.width(), r.height())
      }
      this.transition.setActiveItem(this, n, e, t), this.activeItem = e, this.fireEvent("cardchange", e)
    }
  },
  getActiveItem: function () {
    var e = this.activeItem;
    return e instanceof ui.Component || e === null ? e : this.container.getItemAt(e)
  },
  getActiveItemIndex: function () {
    var e = this.activeItem;
    return e === null ? -1 : e instanceof ui.Component ? this.container.getItemIndex(e) : e
  },
  onDestroy: function () {
    this.transition.destroy(), this._super(arguments)
  }
}), ui.Container.registerLayout("cards", ui.layout.CardsLayout), ui.layout.CardsLayout.AbstractTransition = Class.extend(Object, {
  abstractClass: !0,
  setActiveItem: Class.abstractMethod,
  destroy: function () {
    this.onDestroy()
  },
  onDestroy: Jux.emptyFn
}), ui.layout.AccordionLayout = Class.extend(ui.layout.Layout, {
  activeItem: 0,
  icons: null,
  iconPosition: "left",
  accordionLayoutInitialized: !1,
  initLayout: function () {
    this._super(arguments), this.addEvents("itemchange"), this.contentContainerEls = {}
  },
  onLayout: function (e, t) {
    this._super(arguments), this.accordionLayoutInitialized ? this.updateAccordionLayout(e, t) : (this.initAccordionLayout(e, t), this.accordionLayoutInitialized = !0)
  },
  initAccordionLayout: function (e, t) {
    t.addClass("ui-accordion ui-widget"), this.icons && t.addClass(this.iconPosition === "right" ? "ui-accordion-iconsRight" : "ui-accordion-iconsLeft");
    var n = "",
      r = e.length,
      i;
    for (i = 0; i < r; i++) {
      var s = e[i].title || "(No title property set on child item)";
      n += '<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-top"><a href="#">' + s + "</a></h3>", n += '<div class="ui-accordion-content ui-widget-content ui-helper-reset ui-corner-bottom ui-accordion-content-active" />'
    }
    t.append(n);
    var o = this.$contentDivs = t.find("div");
    t.accordion({
      active: this.activeItem,
      heightStyle: "fill",
      icons: this.icons || !1,
      changestart: this.onBeforeActiveItemChange.createDelegate(this),
      activate: this.onActiveItemChange.createDelegate(this)
    });
    for (i = 0; i < r; i++) {
      var u = o.eq(i),
        a, f = u.height();
      this.contentContainerEls[e[i].getUuid()] = u, this.renderComponent(e[i], u), this.sizeComponent(e[i], a, f)
    }
  },
  updateAccordionLayout: function (e, t) {},
  afterLayout: function (e, t) {
    this._super(arguments)
  },
  adjustChildForScrollbar: function (e) {},
  setActiveItem: function (e) {
    e instanceof ui.Component && (e = this.container.getItemIndex(e)), e = parseInt(e, 10), !isNaN(e) && e !== -1 && (this.container.rendered ? this.container.getContentTarget().accordion("option", "active", e) : this.activeItem = e)
  },
  getActiveItem: function () {
    return this.container.rendered ? this.container.getItemAt(this.container.getContentTarget().accordion("option", "active")) : this.container.getItemAt(this.activeItem)
  },
  getActiveItemIndex: function () {
    return this.container.rendered ? this.container.getContentTarget().accordion("option", "active") : this.activeItem
  },
  onBeforeActiveItemChange: function () {
    var e = this.getActiveItem(),
      t = this.contentContainerEls[e.getUuid()];
    t.show(), e.doLayout(), t.hide()
  },
  onActiveItemChange: function () {
    var e = this.getActiveItem();
    e.doLayout(), this.fireEvent("itemchange", e)
  },
  onDestroy: function () {
    this.accordionLayoutInitialized && this.container.getContentTarget().accordion("destroy"), this._super(arguments)
  }
}), ui.Container.registerLayout("accordion", ui.layout.AccordionLayout), ui.layout.CardsLayout.SlideTransition = Class.extend(ui.layout.CardsLayout.AbstractTransition, {
  animRunning: !1,
  setActiveItem: function (e, t, n, r) {
    this.animRunning && this.endAnimation();
    if (!t && n) {
      n.show();
      return
    }
    if (t && !n) {
      t.hide();
      return
    }
    if (!t && !n) return;
    r = r || {}, r.direction = r.direction || "right", r.duration = typeof r.duration != "undefined" ? r.duration : 600, this.$viewportEl || (this.$viewportEl = jQuery('<div style="margin: 0; padding: 0; border: 0; white-space: nowrap;" />'), this.$slideEl = jQuery('<div style="margin: 0; padding: 0; border: 0; white-space: nowrap;" />').appendTo(this.$viewportEl));
    var i = this.$viewportEl,
      s = this.$slideEl,
      o = e.getContainer(),
      u = o.getEl(),
      a = {
        height: 0,
        width: 0,
        outerHeight: 0,
        outerWidth: 0
      }, f = {
        height: 0,
        width: 0,
        outerHeight: 0,
        outerWidth: 0
      }, l = t.getEl();
    a.height = l.height(), a.width = l.width(), a.outerHeight = l.outerHeight(!0), a.outerWidth = l.outerWidth(!0);
    var c = n.getEl(),
      h = c[0].style.position;
    c.css("position", "absolute"), n.show(), n.doLayout(), f.height = c.height(), f.width = c.width(), f.outerHeight = c.outerHeight(!0), f.outerWidth = c.outerWidth(!0), c.css("position", h), i.css({
      height: a.outerHeight + "px",
      width: a.outerWidth + "px",
      overflow: "visible"
    }).appendTo(u), s.css({
      "margin-left": r.direction === "left" ? -f.outerWidth : 0
    }), s.append(l);
    var p = l[0].style,
      d = {
        display: p.display,
        width: p.width,
        height: p.height,
        verticalAlign: p.verticalAlign,
        overflow: p.overflow
      };
    l.css("display", "inline-block"), l.css({
      width: a.width + "px",
      height: a.height + "px",
      "vertical-align": "top",
      overflow: "visible"
    }), r.direction === "left" ? s.prepend(c) : s.append(c), n.show();
    var v = c[0].style,
      m = {
        display: v.display,
        width: v.width,
        height: v.height,
        verticalAlign: v.verticalAlign,
        overflow: v.overflow
      };
    c.css("display", "inline-block"), c.css({
      width: f.width,
      height: f.height,
      "vertical-align": "top"
    }), this.animRunning = !0, i.animate({
      height: f.outerHeight + "px",
      width: f.outerWidth + "px"
    }, {
      duration: r.duration,
      step: function (e, t) {
        t.prop === "width" && (r.direction === "left" ? s.css("margin-left", -f.outerWidth * (1 - t.pos)) : s.css("margin-left", -a.outerWidth * t.pos)), typeof r.onStep == "function" && r.onStep.call(r.scope || window, t)
      },
      complete: function () {
        i.detach(), l.appendTo(u), l.css({
          display: d.display,
          width: d.width,
          height: d.height,
          "vertical-align": d.verticalAlign,
          overflow: d.overflow
        }), t.hide(), c.css({
          display: m.display,
          width: m.width,
          height: m.height,
          "vertical-align": m.verticalAlign,
          overflow: m.overflow
        }), c.appendTo(u), this.animRunning = !1, typeof r.onComplete == "function" && r.onComplete.call(r.scope || window)
      }.createDelegate(this)
    })
  },
  endAnimation: function () {
    this.$viewportEl && (this.$viewportEl.stop(!0, !0), this.animRunning = !1)
  },
  onDestroy: function () {
    this.animRunning && this.endAnimation(), this.$viewportEl && (this.$viewportEl.remove(), this.$slideEl.remove()), this._super(arguments)
  }
}), ui.layout.CardsLayout.SwitchTransition = Class.extend(ui.layout.CardsLayout.AbstractTransition, {
  setActiveItem: function (e, t, n, r) {
    t && t.hide(), n && n.show()
  }
}), ui.layout.ColumnsLayout = Class.extend(ui.layout.Layout, {
  onLayout: function (e, t) {
    this._super(arguments), this.columnsLayoutInitialized ? this.updateColumnsLayout(e, t) : (this.initColumnsLayout(e, t), this.columnsLayoutInitialized = !0)
  },
  initColumnsLayout: function (e, t) {
    var n = "",
      r = e.length,
      i;
    for (i = 0; i < r; i++) {
      var s = e[i].columnWidth;
      typeof s != "undefined" ? String(s).lastIndexOf("%") === -1 && (s += "px") : s = "auto", n += '<div style="float: left; width: ' + s + '" />'
    }
    n += '<div style="clear: both;" />', t.append(n);
    var o = this.$columnDivEls = t.find("div");
    for (i = 0; i < r; i++) this.renderComponent(e[i], o[i])
  },
  updateColumnsLayout: function (e, t) {},
  onDestroy: function () {
    this.columnsLayoutInitialized && this.$columnDivEls.remove(), this._super(arguments)
  }
}), ui.Container.registerLayout("columns", ui.layout.ColumnsLayout), ui.layout.ContainerLayout = Class.extend(ui.layout.Layout, {
  onLayout: function (e, t) {
    this._super(arguments);
    for (var n = 0, r = e.length; n < r; n++) this.renderComponent(e[n], t, {
      position: n
    })
  }
}), ui.Container.registerLayout("container", ui.layout.ContainerLayout), ui.layout.FitLayout = Class.extend(ui.layout.Layout, {
  browserManagedWidth: !1,
  browserManagedHeight: !1,
  lastRenderedComponent: null,
  onLayout: function (e, t) {
    this._super(arguments);
    var n = e.length;
    if (n > 0) {
      var r = e[0],
        i = this.browserManagedWidth ? "100%" : t.width(),
        s = this.browserManagedHeight ? "100%" : t.height();
      s = s || "100%", i = i || "100%";
      for (var o = 1; o < n; o++) e[o].detach();
      this.renderComponent(r, t), r !== this.lastRenderedComponent && (this.lastRenderedSize = {}, this.lastRenderedComponent = r);
      var u = this.lastRenderedSize;
      if (i !== u.width || s !== u.height) this.sizeComponent(r, i, s), this.lastRenderedSize = {
        width: i,
        height: s
      }
    }
  }
}), ui.Container.registerLayout("fit", ui.layout.FitLayout), ui.layout.FullscreenLayout = Class.extend(ui.layout.ContainerLayout, {
  onLayout: function (e, t) {
    this._super(arguments);
    var n = window.innerHeight || jQuery(window).height();
    this.container.setHeight(n)
  }
}), ui.Container.registerLayout("fullscreen", ui.layout.FullscreenLayout), ui.layout.HBoxLayout = Class.extend(ui.layout.Layout, {
  onLayout: function (e, t) {
    this._super(arguments);
    var n = [],
      r = 0,
      i = 0,
      s, o, u, a = e.length;
    for (s = 0; s < a; s++) u = e[s], this.renderComponent(u, t, {
      position: s
    }), u.flex ? (n.push(u), r += u.flex) : (u.doLayout(), i += u.getOuterWidth(!0));
    if (r > 0) {
      var f = t.width(),
        l = t.height(),
        c = (f - i) / 100,
        h = 0;
      for (s = 0, o = n.length; s < o; s++) {
        u = n[s];
        var p = u.flex / r * c;
        h += p % 1, p = Math.floor(p), s === o - 1 && (p += Math.floor(h)), this.sizeComponent(u, p + "%", l)
      }
    }
  }
}), ui.Container.registerLayout("hbox", ui.layout.HBoxLayout), ui.layout.TabsLayout = Class.extend(ui.layout.Layout, {
  activeTab: 0,
  tabsLayoutInitialized: !1,
  initLayout: function () {
    this._super(arguments), this.addEvents("tabchange")
  },
  onLayout: function (e, t) {
    this._super(arguments);
    var n = this.activeTab = this.normalizeTabIndex(this.activeTab);
    this.tabsLayoutInitialized ? this.updateTabsLayout(e, t) : (this.initTabsLayout(e, t), this.tabsLayoutInitialized = !0)
  },
  initTabsLayout: function (e, t) {
    var n = this.container.elId,
      r = [],
      i = [],
      s, o = e.length,
      u = this.activeTab;
    r.push('<ul data-elem="TabsLayout-HeadersContainer">');
    for (s = 0; s < o; s++) {
      var a = e[s],
        f = a.title || "(No title property set on child item)",
        l = (a.tabContentCls || "") + (s !== u ? " ui-tabs-hide" : ""),
        c = n + "-tab-" + s;
      r.push('<li class="', a.tabCls || "", '" ><a href="#', c, '">', f, "</a></li>"), i.push('<div data-elem="TabsLayout-ContentContainer" id="', c, '" class="', l, '" style="overflow-y: auto;">', '<div data-elem="TabsLayout-ContentContainerInner" class="ui-tabs-panel-inner" />', "</div>")
    }
    r.push("</ul>");
    var h = r.concat(i);
    t.append(h.join("")), t.tabs({
      active: u,
      activate: this.onTabChange.createDelegate(this)
    }), this.$tabHeadersContainerEl = t.children('ul[data-elem="TabsLayout-HeadersContainer"]'), this.$contentDivEls = t.children('div[data-elem="TabsLayout-ContentContainer"]'), this.$contentDivInnerEls = this.$contentDivEls.children('div[data-elem="TabsLayout-ContentContainerInner"]'), this.resizeContentDivs(t);
    var p = this.$contentDivInnerEls;
    for (s = 0, len = e.length; s < len; s++) this.renderComponent(e[s], p[s])
  },
  updateTabsLayout: function (e, t) {
    this.resizeContentDivs(t)
  },
  resizeContentDivs: function (e) {
    var t = this.$contentDivEls,
      n = this.$tabHeadersContainerEl.outerHeight(),
      r = this.container.height || e.height(),
      i = r - n - Jux.Css.getFrameSize(t.filter(":visible"), "tb");
    t.css("height", i + "px")
  },
  normalizeTabIndex: function (e) {
    var t = this.container,
      n = t.getItems().length;
    return typeof e == "string" && (e = parseInt(e, 10) || -1), n === 0 ? e = -1 : typeof e == "number" ? (e = Math.floor(e), e < 0 ? e = 0 : e > n - 1 && (e = n - 1)) : e instanceof ui.Component ? (e = t.getItemIndex(e), e === -1 && (e = 0)) : e = 0, e
  },
  setActiveTab: function (e) {
    var t = this.container,
      n = this.activeTab,
      r = this.activeTab = this.normalizeTabIndex(e);
    t.rendered ? t.getContentTarget().tabs("option", "active", r) : this.fireEvent("tabchange", this, t.getItemAt(r), t.getItemAt(n))
  },
  getActiveTab: function () {
    return this.container.getItemAt(this.getActiveTabIndex())
  },
  getActiveTabIndex: function () {
    return this.normalizeTabIndex(this.activeTab)
  },
  onTabChange: function () {
    var e = this.container,
      t = this.container.getItemAt(this.activeTab),
      n = this.activeTab = e.getContentTarget().tabs("option", "active"),
      r = e.getItemAt(n);
    r.doLayout(), this.fireEvent("tabchange", this, r, t)
  },
  onDestroy: function () {
    this.tabsLayoutInitialized && (this.container.getContentTarget().tabs("destroy"), this.$tabHeadersContainerEl.remove(), this.$contentDivEls.remove()), this._super(arguments)
  }
}), ui.Container.registerLayout("tabs", ui.layout.TabsLayout), ui.layout.VBoxLayout = Class.extend(ui.layout.Layout, {
  onLayout: function (e, t) {
    this._super(arguments);
    var n = [],
      r = 0,
      i = 0,
      s, o, u, a = e.length;
    for (s = 0; s < a; s++) u = e[s], this.renderComponent(u, t, {
      position: s
    }), u.flex ? (n.push(u), r += u.flex) : (u.doLayout(), i += u.getOuterHeight(!0));
    if (r > 0) {
      var f = "100%",
        l = t.height(),
        c = l - i,
        h = 0;
      for (s = 0, o = n.length; s < o; s++) {
        u = n[s];
        var p = u.flex / r * c;
        h += p % 1, p = Math.floor(p), s === o - 1 && (p += Math.floor(h)), this.sizeComponent(u, f, p)
      }
    }
  }
}), ui.Container.registerLayout("vbox", ui.layout.VBoxLayout), ui.containers.SectionContainer = Class.extend(ui.Container, {
  title: "",
  initComponent: function () {
    this.cls += " dialog-section", this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = jQuery('<div class="dialog-section-inner" />'),
      t = this.title || "",
      n = this.titleStyle || {};
    t || (n.display = "none");
    var r = jQuery('<div class="dialog-section-title" style="' + Jux.Css.hashToString(n) + '">' + this.title + "</div>").prependTo(e);
    this.$contentEl = jQuery('<div class="dialog-section-content" />').appendTo(e), e.appendTo(this.$el)
  },
  getContentTarget: function () {
    return this.$contentEl
  },
  setTitle: function (e) {
    this.title = e = e || "", this.rendered && this.$titleDiv.css("display", e ? "" : "none").html(e)
  }
}), ui.ComponentManager.registerType("Section", ui.containers.SectionContainer), ui.containers.TabsContainer = Class.extend(ui.Container, {
  initComponent: function () {
    this.addEvents("tabchange"), this.layout = new ui.layout.TabsLayout({
      activeTab: this.activeTab,
      listeners: {
        tabchange: this.onTabChange,
        scope: this
      }
    }), ui.containers.TabsContainer.superclass.initComponent.call(this)
  },
  setActiveTab: function (e) {
    this.getLayout().setActiveTab(e)
  },
  getActiveTab: function () {
    this.getLayout().getActiveTab()
  },
  getActiveTabIndex: function () {
    this.getLayout().getActiveTabIndex()
  },
  onTabChange: function (e, t, n) {
    this.fireEvent("tabchange", this, t, n)
  }
}), ui.ComponentManager.registerType("Tabs", ui.containers.TabsContainer), ui.formFields.AbstractField = Class.extend(ui.Component, {
  mixins: [ui.DataControl],
  label: "",
  labelPosition: "left",
  labelWidth: "19%",
  help: "",
  statics: {
    renderTpl: ['<div class="dialog-formField-labelWrap" style="<%= labelWrapStyles %>">', '<label for="<%= inputName %>" class="dialog-formField-label"><%= label %></label>', "</div>", '<div class="dialog-formField-inputContainerWrap" style="<%= inputContainerWrapStyles %>">', '<div class="dialog-formField-inputContainer" style="position: relative;" />', "</div>", '<div class="dialog-formField-help" style="<%= helpStyles %>"><%= help %></div>'].join("")
  },
  initComponent: function () {
    this.addEvents("change", "focus", "blur"), this.cls += " dialog-formField", typeof this.value == "function" && (this.value = this.value()), this.labelPosition = this.labelPosition.toLowerCase(), this.label === "" ? this.cls += " dialog-formField-noLabel" : this.cls += " dialog-formField-" + this.labelPosition + "Label", this.inputId = this.inputId || "ui-cmp-input-" + Jux.newId(), this.inputName = typeof this.inputName != "undefined" ? this.inputName : this.inputId, this._super(arguments), ui.DataControl.constructor.call(this)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el,
      t = ui.formFields.AbstractField.renderTpl,
      n = "",
      r = "",
      i = "";
    if (this.label !== "" && this.labelPosition === "left") {
      var s = parseInt(this.labelWidth, 10);
      n += "width: " + s + "%;", r += "width: " + (100 - s) + "%;", i += "padding-left: " + s + "%;"
    }
    var o = Jux.Util.tmpl(t, {
      inputName: this.inputName || this.inputId,
      label: this.label || "",
      help: this.help || "",
      labelWrapStyles: n,
      inputContainerWrapStyles: r,
      helpStyles: i
    });
    e.append(o), this.$labelEl = e.find("label.dialog-formField-label"), this.$inputContainerWrapEl = e.find("div.dialog-formField-inputContainerWrap"), this.$inputContainerEl = e.find("div.dialog-formField-inputContainer"), this.$helpEl = e.find("div.dialog-formField-help")
  },
  setLabel: function (e) {
    this.rendered ? (e !== "" ? this.$el.removeClass("dialog-formField-noLabel") : this.$el.addClass("dialog-formField-noLabel"), this.$labelEl.empty().append(e)) : this.label = e
  },
  setHelp: function (e) {
    this.rendered ? this.$helpEl.html(e) : this.help = e
  },
  getLabelEl: function () {
    return this.$labelEl
  },
  getInputContainerEl: function () {
    return this.$inputContainerEl
  },
  getHelpEl: function () {
    return this.$helpEl
  },
  setValue: function (e) {
    throw new Error("setValue() must be implemented in AbstractField subclass")
  },
  getValue: function () {
    throw new Error("getValue() must be implemented in AbstractField subclass")
  },
  onChange: function (e) {
    this.fireEvent("change", this, e), this.lastDataChangeValue !== e && (this.lastDataChangeValue = e, this.onDataChange())
  },
  focus: function () {
    this.onFocus()
  },
  onFocus: function () {
    this.fireEvent("focus", this)
  },
  blur: function () {
    this.onBlur()
  },
  onBlur: function () {
    this.fireEvent("blur", this)
  },
  setData: function () {
    this.setValue.apply(this, arguments)
  },
  getData: function () {
    return this.getValue()
  }
}), ui.formFields.WrappedInputField = Class.extend(ui.formFields.AbstractField, {
  onRender: function (e) {
    this._super(arguments), this.$inputContainerEl.addClass("dialog-formField-wrappedInputField")
  },
  onFocus: function () {
    this.$inputContainerEl.addClass("dialog-formField-wrappedInputField-focus"), this._super(arguments)
  },
  onBlur: function () {
    this.$inputContainerEl.removeClass("dialog-formField-wrappedInputField-focus"), this._super(arguments)
  }
}), ui.formFields.TextField = Class.extend(ui.formFields.WrappedInputField, {
  selectOnFocus: !1,
  restoreEmptyText: !0,
  initComponent: function () {
    this._super(arguments), this.addEvents("keydown", "keyup", "keypress"), this.labelPosition === "infield" ? this.behaviorState = new ui.formFields.TextField.InfieldLabelBehavior : this.behaviorState = new ui.formFields.TextField.EmptyTextBehavior, this.value = this.normalizeValue(this.value), this.value === "" && this.emptyText && (this.value = this.emptyText)
  },
  onRender: function (e) {
    this._super(arguments), this.$inputEl = this.createInputEl().appendTo(this.$inputContainerEl), this.$inputEl.bind({
      change: function (e) {
        this.onChange(this.getValue())
      }.createDelegate(this),
      focus: this.onFocus.createDelegate(this),
      blur: this.onBlur.createDelegate(this),
      keydown: this.onKeyDown.createDelegate(this),
      keyup: this.onKeyUp.createDelegate(this),
      keypress: this.onKeyPress.createDelegate(this)
    }), this.behaviorState.onRender(this)
  },
  createInputEl: function () {
    var e = this.value ? Jux.util.Html.encode(this.value) : "";
    return jQuery('<input type="text" class="text" id="' + this.inputId + '" name="' + this.inputName + '" value="' + e + '" />')
  },
  getInputEl: function () {
    return this.$inputEl || null
  },
  normalizeValue: function (e) {
    return typeof e == "undefined" || e === null ? "" : typeof e != "string" ? e.toString() : e
  },
  setValue: function (e) {
    e = this.normalizeValue(e), this.rendered ? (this.$inputEl.val(e), this.behaviorState.onSetValue(this, e)) : this.value = e, this.onChange(e)
  },
  getValue: function () {
    return this.rendered ? this.$inputEl.val() : this.value
  },
  setEmptyText: function (e) {
    this.emptyText = e
  },
  getEmptyText: function () {
    return this.emptyText
  },
  select: function () {
    this.$inputEl.select()
  },
  onChange: function () {
    this.behaviorState.onChange(this), this._super(arguments)
  },
  focus: function () {
    this.$inputEl.focus(), this._super(arguments)
  },
  blur: function () {
    this.$inputEl.blur(), this._super(arguments)
  },
  onFocus: function () {
    this.behaviorState.onFocus(this), this.selectOnFocus && this.select(), this._super(arguments)
  },
  onBlur: function () {
    this.behaviorState.onBlur(this), this._super(arguments)
  },
  isFocus: function () {
    return !!this.$inputEl && !! this.$inputEl.is(":focus")
  },
  onKeyDown: function (e) {
    this.behaviorState.onKeyDown(this, e), this.fireEvent("keydown", this, e)
  },
  onKeyUp: function (e) {
    this.behaviorState.onKeyUp(this, e), this.fireEvent("keyup", this, e);
    var t = this.getValue();
    this.lastDataChangeValue !== t && (this.lastDataChangeValue = t, this.onDataChange())
  },
  onKeyPress: function (e) {
    this.behaviorState.onKeyPress(this, e), this.fireEvent("keypress", this, e)
  }
}), ui.ComponentManager.registerType("Text", ui.formFields.TextField), ui.ComponentManager.registerType("TextField", ui.formFields.TextField), ui.formFields.TextField.AbstractBehavior = Class.extend(Object, {
  onRender: Jux.emptyFn,
  onSetValue: Jux.emptyFn,
  onChange: Jux.emptyFn,
  onFocus: Jux.emptyFn,
  onBlur: Jux.emptyFn,
  onKeyDown: Jux.emptyFn,
  onKeyUp: Jux.emptyFn,
  onKeyPress: Jux.emptyFn
}), ui.formFields.CheckboxField = Class.extend(ui.formFields.AbstractField, {
  checkboxLabel: "",
  onRender: function () {
    ui.formFields.CheckboxField.superclass.onRender.apply(this, arguments), this.$inputEl = jQuery('<input type="checkbox" class="checkbox" id="' + this.inputId + '" name="' + this.inputName + '"' + (this.value ? " checked" : "") + " />").appendTo(this.$inputContainerEl), this.$checkboxLabelEl = jQuery('<label for="' + this.inputId + '" class="dialog-formField-label" />&nbsp;' + (this.checkboxLabel || "")).appendTo(this.$inputContainerEl), this.$inputEl.bind({
      change: function () {
        this.onChange(this.getValue())
      }.createDelegate(this)
    })
  },
  setValue: function (e) {
    this.rendered ? this.$inputEl.prop("checked", !! e) : this.value = e
  },
  getValue: function () {
    return this.rendered ? this.$inputEl.prop("checked") : !! this.value
  }
}), ui.ComponentManager.registerType("Checkbox", ui.formFields.CheckboxField), ui.ComponentManager.registerType("Boolean", ui.formFields.CheckboxField), ui.formFields.DateField = Class.extend(ui.formFields.TextField, {
  initComponent: function () {
    ui.formFields.DateField.superclass.initComponent.apply(this, arguments), this.emptyText = this.handleDateValue(this.emptyText), this.value = this.handleDateValue(this.value)
  },
  onRender: function (e) {
    ui.formFields.DateField.superclass.onRender.apply(this, arguments), this.$inputEl.datepicker({
      dateFormat: "mm/dd/yy"
    })
  },
  setValue: function (e) {
    e = this.handleDateValue(e), ui.formFields.DateField.superclass.setValue.call(this, e)
  },
  setEmptyText: function (e) {
    e = this.handleDateValue(e), ui.formFields.DateField.superclass.setEmptyText.call(this, e)
  },
  handleDateValue: function (e) {
    return e === "now" ? jQuery.datepicker.formatDate("mm/dd/yy", new Date) : e
  },
  onDestroy: function () {
    this.rendered && this.$inputEl.datepicker("destroy"), ui.formFields.DateField.superclass.onDestroy.apply(this, arguments)
  }
}), ui.ComponentManager.registerType("Date", ui.formFields.DateField), ui.formFields.DateTimeField = Class.extend(ui.formFields.TextField, {
  value: "now",
  initComponent: function () {
    ui.formFields.DateTimeField.superclass.initComponent.apply(this, arguments), this.emptyText = this.handleDateValue(this.emptyText), this.value = this.handleDateValue(this.value)
  },
  onRender: function (e) {
    ui.formFields.DateTimeField.superclass.onRender.apply(this, arguments), this.$inputEl.datetimeEntry({
      datetimeFormat: "Y/O/D H:M"
    })
  },
  setValue: function (e) {
    e = this.handleDateValue(e);
    var t = e.getHours(),
      n = e.getMinutes();
    t = t < 10 ? "0" + t : t, n = n < 10 ? "0" + n : n, e = jQuery.datepicker.formatDate("yy/mm/dd", e) + " " + t + ":" + n, ui.formFields.DateTimeField.superclass.setValue.call(this, e)
  },
  setEmptyText: function (e) {
    e = this.handleDateValue(e), ui.formFields.DateTimeField.superclass.setEmptyText.call(this, e)
  },
  handleDateValue: function (e) {
    return e === "now" ? new Date : new Date(e)
  },
  onDestroy: function () {
    this.rendered && this.$inputEl.datetimeEntry("destroy"), ui.formFields.DateTimeField.superclass.onDestroy.apply(this, arguments)
  }
}), ui.ComponentManager.registerType("DateTime", ui.formFields.DateTimeField), ui.formFields.DropdownField = Class.extend(ui.formFields.WrappedInputField, {
  menuCls: "",
  menuCollisionStrategy: "flip",
  optionsMenuOpen: !1,
  statics: {
    dropdownRenderTpl: ['<input type="hidden" name="<%= inputName %>" value="<%= initialValue %>" />', '<div class="ui-dropdownField">', '<div class="ui-dropdownField-selectText">', '<div class="<%= optionClass %>" style="<%= optionStyles %>"><%= optionText %></div>', "</div>", '<div class="ui-dropdownField-openButton" />', "</div>"].join(" "),
    optionsMenuRenderTpl: ["<li>", '<a href="#" class="<%= anchorClass %>" style="<%= anchorStyle %>"><%= text %></a>', "</li>"].join(" ")
  },
  initComponent: function () {
    this._super(arguments), this.options = this.options || [], this.optionsStore = new ui.utils.OptionsStore(this.options), this.initValue()
  },
  initValue: function () {
    var e = this.optionsStore,
      t = e.getOptions(),
      n = t.length;
    typeof this.value == "undefined" ? n > 0 && (this.value = t[0].value) : e.getByValue(this.value) === null && (this.value = n > 0 ? t[0].value : undefined)
  },
  onRender: function (e) {
    this._super(arguments);
    var t = this.$inputContainerEl,
      n = ui.formFields.DropdownField.dropdownRenderTpl,
      r = this.getValue(),
      i = this.optionsStore.getByValue(r),
      s = Jux.Util.tmpl(n, {
        inputName: this.inputName,
        initialValue: r,
        optionText: i ? i.text : "",
        optionClass: i && i.cls ? i.cls : "",
        optionStyles: i && i.style ? Jux.Css.hashToString(i.style) : ""
      });
    t.append(s), this.$inputEl = t.find('input[name="' + this.inputName + '"]'), this.$dropdownContainer = t.find("div.ui-dropdownField"), this.$selectText = this.$dropdownContainer.find("div.ui-dropdownField-selectText"), this.$openButton = this.$dropdownContainer.find("div.ui-dropdownField-openButton");
    var o = this.onDropdownClick.createDelegate(this);
    this.$selectText.click(o), this.$openButton.click(o), this.$optionsMenu = jQuery('<ul class="ui-dropdownField-menu ' + this.menuCls + '" />').hide().appendTo(document.body), this.redrawOptions(), this.documentClickHandler = this.onDocumentClick.createDelegate(this), jQuery(document).bind("mousedown", this.documentClickHandler)
  },
  onDocumentClick: function (e) {
    if (this.optionsMenuOpen) {
      var t = jQuery(e.target).parents().andSelf(),
        n = this.$dropdownContainer[0],
        r = this.$optionsMenu[0],
        i = !1;
      for (var s = 0, o = t.length; s < o; s++)
        if (t[s] === n || t[s] === r) {
          i = !0;
          break
        }
      i || this.hideOptionsMenu()
    }
  },
  onDropdownClick: function (e) {
    e.preventDefault(), this.toggleOptionsMenu();
    var t = this.$optionsMenu,
      n = jQuery("a.selected", t).offset().top - t.offset().top;
    t.animate({
      scrollTop: n
    })
  },
  onOptionClick: function (e) {
    e.preventDefault();
    var t = jQuery(e.target),
      n = this.getValue(),
      r = t.data("value");
    n !== r && (this.setValue(r), this.onChange(this.getValue())), this.hideOptionsMenu()
  },
  setOptions: function (e) {
    this.optionsStore.setOptions(e), this.onOptionsChange(), this.redrawOptions()
  },
  addOption: function (e, t) {
    this.optionsStore.addOption(e, t), this.onOptionsChange(), this.redrawOptions()
  },
  removeOptionByValue: function (e) {
    this.optionsStore.removeOptionByValue(e), this.onOptionsChange(), this.redrawOptions()
  },
  removeOptionByText: function (e) {
    this.optionsStore.removeOptionByText(e), this.onOptionsChange(), this.redrawOptions()
  },
  onOptionsChange: function () {
    var e = this.getValue(),
      t = this.optionsStore;
    if (t.getCount() === 0) throw new Error("Error: no 'options' remain in the DropdownField after options modification. This is an error condition.");
    t.getByValue(e) === null && this.setValue(t.getAtIndex(0).value)
  },
  getOptions: function () {
    return this.optionsStore.getOptions()
  },
  redrawOptions: function () {
    if (this.rendered) {
      var e = this.getOptions(),
        t = e.length,
        n = this.$optionsMenu,
        r = ui.formFields.DropdownField.optionsMenuRenderTpl,
        i = this.getValue(),
        s, o;
      n.empty();
      var u = "";
      for (s = 0; s < t; s++) o = e[s], u += Jux.Util.tmpl(r, {
        anchorClass: (o.cls || "") + (o.value === i ? " selected" : ""),
        anchorStyle: o.style ? Jux.Css.hashToString(o.style) : "",
        text: o.text
      });
      n.append(u);
      var a = n.find("a");
      for (s = 0; s < t; s++) a.eq(s).data("value", e[s].value);
      n.find("a").click(this.onOptionClick.createDelegate(this))
    }
  },
  showOptionsMenu: function () {
    this.optionsMenuOpen = !0, this.$optionsMenu.show(), this.$optionsMenu.width(this.$selectText.width()), this.$optionsMenu.position({
      my: "left center",
      at: "left center",
      of: this.$selectText,
      collision: this.menuCollisionStrategy
    })
  },
  hideOptionsMenu: function (e) {
    this.optionsMenuOpen = !1, this.$optionsMenu.hide()
  },
  toggleOptionsMenu: function () {
    this.optionsMenuOpen ? this.hideOptionsMenu() : this.showOptionsMenu()
  },
  setValue: function (e) {
    if (typeof e == "undefined" || e === null) return;
    var t = this.optionsStore.getByValue(e);
    if (t) {
      this.value = e;
      if (this.rendered) {
        var n = jQuery('<div class="' + t.cls + '" style="' + (t.style ? Jux.Css.hashToString(t.style) : "") + '">' + t.text + "</div>");
        this.$selectText.empty().append(n);
        var r = this.$optionsMenu;
        r.find("a.selected").removeClass("selected");
        var i = r.find("a");
        for (var s = 0, o = i.length; s < o; s++) {
          var u = i.eq(s);
          if (u.data("value") === e) {
            u.addClass("selected");
            break
          }
        }
        this.$inputEl.val(e)
      }
    }
  },
  getValue: function () {
    return this.value
  },
  setText: function (e) {
    var t = this.optionsStore.getByText(e);
    t && this.setValue(t.value)
  },
  getText: function () {
    var e = this.optionsStore.getByValue(this.getValue());
    return e.text
  },
  hasOptionValue: function (e) {
    var t = this.getOptions();
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].value === e) return !0;
    return !1
  },
  onDestroy: function () {
    this.rendered && (jQuery(document).unbind("mousedown", this.documentClickHandler), this.$optionsMenu.remove()), ui.formFields.DropdownField.superclass.onDestroy.call(this)
  }
}), ui.ComponentManager.registerType("Dropdown", ui.formFields.DropdownField), ui.formFields.HiddenField = Class.extend(ui.formFields.AbstractField, {
  initComponent: function () {
    this.label = "", this.help = "", this.hidden = !0, ui.formFields.HiddenField.superclass.initComponent.call(this)
  },
  onRender: function (e) {
    ui.formFields.HiddenField.superclass.onRender.apply(this, arguments), this.$inputEl = jQuery('<input type="hidden" id="' + this.inputId + '" name="' + this.inputName + '" value="' + (this.value || "") + '" />').appendTo(this.$inputContainerEl)
  },
  setValue: function (e) {
    this.rendered ? this.$inputEl.val(e) : this.value = e
  },
  getValue: function () {
    return this.rendered ? this.$inputEl.val() : this.value
  }
}), ui.ComponentManager.registerType("Hidden", ui.formFields.HiddenField), ui.formFields.LinkTextField = Class.extend(ui.formFields.TextField, {
  initComponent: function () {
    this.cls += " linkTextField", this.linkPickerOverlay = new ui.components.LinkPickerOverlay, ui.formFields.LinkTextField.superclass.initComponent.call(this)
  },
  onRender: function (e) {
    ui.formFields.LinkTextField.superclass.onRender.apply(this, arguments), this.linkPickerOverlay.setAnchor({
      element: this.$inputEl,
      offset: "0 10"
    }), this.$linkButton = jQuery('<button class="linkTextField-linkButton">Link</button>').button(), this.$linkButton.appendTo(this.$inputContainerEl), this.$linkButton.bind({
      click: function () {
        this.linkPickerOverlay.open()
      }.createDelegate(this)
    })
  },
  setValue: function (e) {
    typeof e == "string" && (e = {
      text: e
    });
    if (!this.rendered) this.value = e;
    else {
      var t = e || {}, n = t.text || "";
      this.$inputEl.val(n);
      var r = this.getDefaultValue();
      typeof r == "object" && n === r.text ? this.$inputEl.addClass("ui-hint-text") : this.$inputEl.removeClass("ui-hint-text"), this.linkPickerOverlay.setState({
        url: t.url,
        pageid: t.pageid
      })
    }
  },
  getValue: function () {
    var e = {};
    if (!this.rendered) Jux.apply(e, typeof this.value == "string" ? {
      text: this.value
    } : this.value);
    else {
      var t = this.linkPickerOverlay.getState();
      e.url = t.url, e.pageid = t.pageid, e.target = t.target, e.text = this.$inputEl.val()
    }
    return e
  },
  onDestroy: function () {
    this.linkPickerOverlay.destroy(), ui.formFields.LinkTextField.superclass.onDestroy.apply(this, arguments)
  }
}), ui.ComponentManager.registerType("Link", ui.formFields.LinkTextField), ui.ComponentManager.registerType("LinkTextField", ui.formFields.LinkTextField), ui.formFields.RadioField = Class.extend(ui.formFields.AbstractField, {
  stacked: !1,
  radioTpl: ['<input type="radio" id="<%= name %>-<%= num %>" name="<%= name %>" class="radio" value="<%= inputValue %>" <% if( checked ) { %>checked<% } %>>', '<label for="<%= name %>-<%= num %>" ><%= text %></label>'].join(""),
  initComponent: function () {
    this.optionsStore = new ui.utils.OptionsStore(this.options);
    if (this.optionsStore.getOptions().length === 0) throw new Error("Error: The ButtonSet's 'options' was not configured.");
    typeof this.value == "undefined" ? this.value = this.optionsStore.getOptions()[0].value : this.optionsStore.getByValue(this.value) === null && (this.value = this.optionsStore.getOptions()[0].value), ui.formFields.RadioField.superclass.initComponent.call(this);
    if (!this.inputName) throw new Error("Error: RadioField must have a valid inputName. Make sure that the inputName and inputId configs have not been set to an empty string or other falsy value.")
  },
  onRender: function (e) {
    ui.formFields.RadioField.superclass.onRender.apply(this, arguments);
    var t = this.optionsStore.getOptions(),
      n = this.radioTpl,
      r = this.inputName,
      i = this.$inputContainerEl,
      s = this.stacked,
      o = this.value,
      u = "";
    for (var a = 0, f = t.length; a < f; a++) {
      var l = t[a];
      u += Jux.Util.tmpl(n, {
        name: r,
        num: a,
        inputValue: l.value,
        text: l.text,
        checked: o === l.value
      }) + (s ? "<br />" : "")
    }
    i.append(u), i.bind({
      change: function () {
        this.onChange(this.getValue())
      }.createDelegate(this)
    })
  },
  setValue: function (e) {
    var t = this.optionsStore.getByValue(e);
    t !== null && (this.rendered ? this.$inputContainerEl.find(":radio[value=" + e + "]").prop("checked", !0) : this.value = e)
  },
  getValue: function () {
    return this.rendered ? this.$inputContainerEl.find(":radio:checked").val() : this.value
  }
}), ui.ComponentManager.registerType("Radio", ui.formFields.RadioField), ui.formFields.TextAreaField = Class.extend(ui.formFields.TextField, {
  autoGrow: !1,
  autoGrowMimicStyles: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontSize", "lineHeight", "fontFamily", "width", "fontWeight"],
  onRender: function () {
    this._super(arguments);
    if ("height" in this) {
      var e = this.height;
      this.labelPosition === "top" && (e -= this.$labelEl.outerHeight(!0)), e -= this.getTopBottomMarginPaddingHeight(this.$inputContainerWrapEl), e -= this.getTopBottomMarginPaddingHeight(this.$inputContainerEl), e -= this.getTopBottomMarginPaddingHeight(this.$inputEl), this.help && (e -= this.$helpEl.outerHeight(!0)), this.$inputEl.css("height", e + "px")
    }
    if (this.autoGrow) {
      var t = this.autoGrowMimicStyles,
        n = this.$inputEl,
        r = jQuery("<div />").css({
          position: "absolute",
          display: "none",
          "word-wrap": "break-word"
        }),
        i = parseInt(n.css("line-height"), 10) || parseInt(n.css("font-size"), 10),
        s = parseInt(n.css("height"), 10) || i * 3,
        o = parseInt(n.css("max-height"), 10) || Number.MAX_VALUE;
      o < 0 && (o = Number.MAX_VALUE), n.css("resize", "none"), this.autoGrowComputedStyles = {
        lineHeight: i,
        minHeight: s,
        maxHeight: o
      }, r.appendTo(n.parent());
      var u = t.length;
      while (u--) r.css(t[u], n.css(t[u]));
      n.css("minHeight", s), n.css("overflow", "hidden"), n.bind("cut paste", function () {
        this.updateAutoGrowHeight()
      }.createDelegate(this)), this.autoGrowPasteHandler = function () {
        this.updateAutoGrowHeight.defer(250, this)
      }.createDelegate(this), n.on("input", this.autoGrowPasteHandler), n.on("paste", this.autoGrowPasteHandler), this.$autoGrowTwinDiv = r, this.updateAutoGrowHeight()
    }
  },
  createInputEl: function () {
    return jQuery('<textarea id="' + this.inputId + '" name="' + this.inputName + '">' + (this.value || "") + "</textarea>")
  },
  getTopBottomMarginPaddingHeight: function (e) {
    return parseInt(e.css("margin-top"), 10) + parseInt(e.css("padding-top"), 10) + parseInt(e.css("padding-bottom"), 10) + parseInt(e.css("margin-bottom"), 10)
  },
  setHeightAndOverflow: function (e, t) {
    var n = this.$inputEl,
      r = Math.floor(parseInt(e, 10));
    n.height() != r && n.css({
      height: r + "px",
      overflow: t
    })
  },
  updateAutoGrowHeight: function () {
    if (this.rendered) {
      var e = this.$inputEl,
        t = this.$autoGrowTwinDiv,
        n = this.autoGrowComputedStyles,
        r = e.val().replace(/&/g, "&amp;").replace(/ {2}/g, "&nbsp;").replace(/<|>/g, "&gt;").replace(/\n/g, "<br />"),
        i = t.html().replace(/<br>/ig, "<br />");
      if (r + "&nbsp;" != i) {
        t.html(r + "&nbsp;");
        if (Math.abs(t.height() + n.lineHeight - e.height()) > 3) {
          var s = t.height() + n.lineHeight;
          s >= n.maxHeight ? this.setHeightAndOverflow(n.maxHeight, "auto") : s <= n.minHeight ? this.setHeightAndOverflow(n.minHeight, "hidden") : this.setHeightAndOverflow(s, "hidden")
        }
      }
    }
  },
  setValue: function () {
    this._super(arguments), this.autoGrow && this.updateAutoGrowHeight()
  },
  onChange: function () {
    this._super(arguments), this.autoGrow && this.updateAutoGrowHeight()
  },
  onKeyUp: function (e) {
    this._super(arguments), this.autoGrow && this.updateAutoGrowHeight()
  },
  onBlur: function () {
    this._super(arguments);
    if (this.autoGrow) {
      var e = this.$inputEl,
        t = this.$autoGrowTwinDiv,
        n = this.autoGrowComputedStyles;
      t.height() < n.maxHeight && (t.height() > n.minHeight ? e.height(t.height()) : e.height(n.minHeight))
    }
  },
  onDestroy: function () {
    if (this.autoGrow && this.rendered) {
      var e = this.$inputEl;
      e.off("input", this.autoGrowPasteHandler), e.off("paste", this.autoGrowPasteHandler), this.$autoGrowTwinDiv.remove()
    }
    this._super(arguments)
  }
}), ui.ComponentManager.registerType("TextArea", ui.formFields.TextAreaField), ui.formFields.TextField.EmptyTextBehavior = Class.extend(ui.formFields.TextField.AbstractBehavior, {
  emptyTextCls: "ui-hint-text",
  onSetValue: function (e, t) {
    t === e.getEmptyText() ? e.getInputEl().addClass(this.emptyTextCls) : e.getInputEl().removeClass(this.emptyTextCls)
  },
  onFocus: function (e) {
    e.getInputEl().removeClass(this.emptyTextCls), e.getValue() === e.getEmptyText() && e.setValue("")
  },
  onBlur: function (e) {
    e.restoreEmptyText && e.getValue() === "" && e.setValue(e.getEmptyText() || "")
  }
}), ui.formFields.TextField.InfieldLabelBehavior = Class.extend(ui.formFields.TextField.AbstractBehavior, {
  fadeOpacity: .5,
  fadeDuration: 300,
  labelShown: !0,
  onRender: function (e) {
    var t = e.getLabelEl();
    t.bind("click", function () {
      e.focus()
    }), e.getInputContainerEl().append(t), e.getInputEl().attr("autocomplete", "false"), this.checkForEmpty(e)
  },
  onSetValue: function (e, t) {
    e.rendered && this.checkForEmpty(e)
  },
  onChange: function (e) {
    e.rendered && this.checkForEmpty(e)
  },
  onFocus: function (e) {
    e.rendered && this.labelShown && this.setLabelOpacity(e.getLabelEl(), this.fadeOpacity)
  },
  onBlur: function (e) {
    e.rendered && this.checkForEmpty(e)
  },
  onKeyDown: function (e, t) {
    if (e.rendered) {
      if (t.keyCode === 16 || t.keyCode === 9) return;
      this.labelShown && (e.getLabelEl().hide(), this.labelShown = !1)
    }
  },
  setLabelOpacity: function (e, t) {
    e.stop().animate({
      opacity: t
    }, this.fadeDuration), this.labelShown = t > 0, this.labelShown ? e.show() : e.hide()
  },
  checkForEmpty: function (e) {
    var t = e.getLabelEl();
    e.getValue() === "" ? this.setLabelOpacity(t, 1) : this.setLabelOpacity(t, 0)
  }
}), ui.toolButtons.ToolButton = Class.extend(ui.Button, {
  size: "large",
  initComponent: function () {
    this.cls += " ui-toolButton ui-toolButton-" + this.size, ui.toolButtons.ToolButton.superclass.initComponent.call(this)
  }
}), ui.ComponentManager.registerType("ToolButton", ui.toolButtons.ToolButton), ui.toolButtons.CloseButton = Class.extend(ui.toolButtons.ToolButton, {
  tooltip: "Close",
  initComponent: function () {
    this.size === "tiny" ? this.primaryIcon = "jux-icon-x-dkgray-sm" : this.size === "small" ? this.primaryIcon = "ui-icon-delete" : this.primaryIcon = "jux-icon-close", ui.toolButtons.CloseButton.superclass.initComponent.call(this)
  }
}), ui.ComponentManager.registerType("CloseButton", ui.toolButtons.CloseButton), ui.toolButtons.DeleteButton = Class.extend(ui.toolButtons.ToolButton, {
  tooltip: "Delete",
  setToolTip: function (e) {
    typeof e == "string" && (this.tooltip = e)
  },
  initComponent: function () {
    this.size === "tiny" ? this.primaryIcon = "jux-icon-x-ltgray-sm" : this.size === "small" ? this.primaryIcon = "ui-icon-delete" : this.primaryIcon = "jux-icon-x-circle-lg", ui.toolButtons.DeleteButton.superclass.initComponent.call(this)
  }
}), ui.ComponentManager.registerType("DeleteButton", ui.toolButtons.DeleteButton), ui.toolButtons.EditButton = Class.extend(ui.toolButtons.ToolButton, {
  tooltip: "Edit",
  initComponent: function () {
    this.size === "small" ? this.primaryIcon = "ui-icon-pencil" : this.primaryIcon = "ui-icon-pencil-lg", ui.toolButtons.EditButton.superclass.initComponent.call(this)
  }
}), ui.ComponentManager.registerType("EditButton", ui.toolButtons.EditButton), ui.toolButtons.HideButton = Class.extend(ui.toolButtons.ToolButton, {
  buttonState: "visible",
  visibleTooltip: "Hide",
  hiddenTooltip: "Show",
  initComponent: function () {
    if (this.buttonState !== "visible" && this.buttonState !== "hidden") throw new Error("Invalid buttonState config. Must be either 'visible' or 'hidden'.");
    this.size === "small" ? (this.visibleIconCls = "ui-icon-eyeopen", this.hiddenIconCls = "ui-icon-eyeclosed") : (this.visibleIconCls = "jux-icon-show-lg", this.hiddenIconCls = "jux-icon-hide-lg"), this.buttonState === "visible" ? (this.primaryIcon = this.visibleIconCls, this.tooltip = this.visibleTooltip) : (this.primaryIcon = this.hiddenIconCls, this.tooltip = this.hiddenTooltip), ui.toolButtons.HideButton.superclass.initComponent.call(this)
  },
  onClick: function () {
    this.toggleButtonState(), ui.toolButtons.HideButton.superclass.onClick.apply(this, arguments)
  },
  toggleButtonState: function () {
    this.buttonState === "visible" ? this.setButtonState("hidden") : this.setButtonState("visible")
  },
  setButtonState: function (e) {
    if (e !== "visible" && e !== "hidden") throw new Error("Invalid buttonState argument. Must be either 'visible' or 'hidden'.");
    this.buttonState = e, e === "visible" ? (this.$el.button("option", "icons", {
      primary: this.visibleIconCls,
      secondary: null
    }), this.$el.attr("title", this.visibleTooltip)) : (this.$el.button("option", "icons", {
      primary: this.hiddenIconCls,
      secondary: null
    }), this.$el.attr("title", this.hiddenTooltip))
  },
  getButtonState: function () {
    return this.buttonState
  }
}), ui.ComponentManager.registerType("HideButton", ui.toolButtons.HideButton), ui.plugins.AbstractPlugin = Class.extend(Jux.util.Observable, {
  constructor: function (e) {
    Jux.apply(this, e), ui.plugins.AbstractPlugin.superclass.constructor.call(this)
  },
  initPlugin: function (e) {}
}), ui.plugins.DragAndDropSort = Class.extend(ui.plugins.AbstractPlugin, {
  itemsSelector: '> *:not( [data-dragAndDropSortable="false"] )',
  axis: !1,
  draggedItem: null,
  sortableInitialized: !1,
  initPlugin: function (e) {
    if (!(e instanceof ui.Container)) throw new Error("error: DragAndDropSort plugin can only be added as a plugin to a ui.Container, or ui.Container subclass");
    this.container = e, e.doLayout = e.doLayout.createSequence(this.doLayout, this), e.on("beforedestroy", this.onDestroy, this)
  },
  doLayout: function () {
    var e = this.container;
    e && e.isRendered() && (this.hasSortable ? this.refreshSortable() : this.setupSortable())
  },
  setupSortable: function () {
    var e = this.container,
      t = e.getContentTarget();
    t.find(this.itemsSelector).length > 0 && (t.addClass("juxUI-draggable"), t.sortable({
      containment: "parent",
      tolerance: "pointer",
      items: this.itemsSelector,
      axis: this.axis,
      start: function (n, r) {
        var i = t.children().index(r.item);
        this.draggedItem = e.getItemAt(i), this.draggedItem.addCls("ui-dragged")
      }.createDelegate(this),
      beforeStop: function (n, r) {
        var i = t.children().index(r.item);
        e.insert(this.draggedItem, i), this.draggedItem.removeCls("ui-dragged"), this.draggedItem = null
      }.createDelegate(this)
    }), this.hasSortable = !0)
  },
  refreshSortable: function () {
    var e = this.container;
    if (e.isRendered()) {
      var t = e.getContentTarget();
      t.sortable("refreshPositions"), t.sortable("refresh")
    }
  },
  onDestroy: function () {
    this.container = null, this.shouldBeDestroyed = !0, this.purgeListeners()
  }
}), ui.utils.OptionsStore = Class.extend(Object, {
  constructor: function (e) {
    this.setOptions(e || [])
  },
  normalizeOptions: function (e) {
    var t = [];
    for (var n = 0, r = e.length; n < r; n++) t.push(this.normalizeOption(e[n]));
    return t
  },
  normalizeOption: function (e) {
    var t = {};
    if (typeof e == "object") {
      t.text = e.text, t.value = typeof e.value != "undefined" ? e.value : e.text;
      for (var n in e) n !== "text" && n !== "value" && e.hasOwnProperty(n) && (t[n] = e[n])
    } else t.text = e, t.value = e;
    return t
  },
  setOptions: function (e) {
    typeof e == "function" && (e = e()), this.options = this.normalizeOptions(e)
  },
  addOption: function (e, t) {
    var n = this.options;
    e = this.normalizeOption(e), t = typeof t != "undefined" ? t : n.length, n.splice(t, 0, e)
  },
  removeOptionByValue: function (e) {
    var t = this.options;
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].value === e) {
        t.splice(n, 1);
        return
      }
  },
  removeOptionByText: function (e) {
    var t = this.options;
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].text === e) {
        t.splice(n, 1);
        return
      }
  },
  getOptions: function () {
    return this.options
  },
  getCount: function () {
    return this.options.length
  },
  getAtIndex: function (e) {
    return this.options[e] || null
  },
  getByValue: function (e) {
    var t = this.options;
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].value === e) return t[n];
    return null
  },
  getByText: function (e) {
    var t = this.options;
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].text === e) return t[n];
    return null
  }
}), ui.utils.SmoothDivScroll = Jux.extend(Jux.util.Observable, {
  hideLeftHotSpotCls: "atLeftEdge",
  hideRightHotSpotCls: "atRightEdge",
  isVisible: !1,
  defaultOptions: {
    mousewheelScrolling: "allDirections",
    hotSpotScrolling: !0
  },
  constructor: function (e) {
    this._super(arguments), e && e.options ? this.options = e.options : this.options = {}, this.options = _.extend(_.clone(this.defaultOptions), this.options), this.$el = e.$el, this.scroller = e.scroller, this.forceFullPageWidth = e.forceFullPageWidth, this.$scrollableArea = this.$el.find(".scrollableArea"), this.setupScroller()
  },
  setIsVisible: function (e) {
    this.isVisible = e
  },
  setScrollTo: function (e) {
    this.hoverScroller && e && typeof e == "number" && !isNaN(e) && this.hoverScroller.setWrapperScrollPosition(e)
  },
  setupScroller: function () {
    var e = 1500;
    this.hoverScroller = this.$el.smoothDivScroll(this.options).data("thomaskahnSmoothDivScroll"), this.$el.on({
      smoothdivscrollscrollerleftlimitreached: _.throttle(this.scrollerLeftLimitHit.createDelegate(this), e),
      smoothdivscrollscrollerrightlimitreached: _.throttle(this.scrollerRightLimitHit.createDelegate(this), e),
      smoothdivscrollmouseoverlefthotspot: this.mouseOverLeftHotSpot.createDelegate(this),
      smoothdivscrollmouseoverrighthotspot: this.mouseOverRightHotSpot.createDelegate(this),
      smoothdivscrollmouseoutright: this.mouseOutRightHotSpot.createDelegate(this),
      smoothdivscrollmouseoutleft: this.mouseOutLeftHotSpot.createDelegate(this),
      smoothdivscrollmouseleaveleft: this.mouseOutLeftHotSpot.createDelegate(this),
      smoothdivscrollmouseenterleft: this.mouseOverLeftHotSpot.createDelegate(this),
      smoothdivscrollmouseenterright: this.mouseOverRightHotSpot.createDelegate(this),
      smoothdivscrollmouseleaveright: this.mouseOutRightHotSpot.createDelegate(this),
      mouseout: this.mouseOutOfNav.createDelegate(this),
      mouseleave: this.mouseOutOfNav.createDelegate(this),
      smoothdivscrollscrollingtoelementid: this.onScrollingToElement.createDelegate(this),
      smoothdivscrollscrolledtoelementid: this.onScrolledToElement.createDelegate(this),
      smoothdivscrolljumpedtoelementid: this.onJumpToElement.createDelegate(this)
    }), this.updateHoverScroller()
  },
  onScrollingToElement: function (e, t) {
    this.trigger("scrollingToElement", this.$el.find("#" + t.elementId), t.elementId)
  },
  onScrolledToElement: function (e, t) {
    this.onMovedToElement(e, t, !0)
  },
  onJumpToElement: function (e, t) {
    this.onMovedToElement(e, t, !1)
  },
  onMovedToElement: function (e, t, n) {
    this.trigger("movedToElement", this.$el.find("#" + t.elementId), t.elementId, n)
  },
  addElement: function (e, t) {
    var n;
    t === "beginning" ? n = "addFirst" : n = "addLast", this.hoverScroller.getHtmlContent(e, n)
  },
  mouseOutOfNav: function () {
    this.userIsScrolling = !1
  },
  scrollerLeftLimitHit: function () {
    this.disableHoverBars(-1), this.enableHoverBars(1), this.userIsScrolling = !1, this.trigger("leftLimitHit")
  },
  scrollerRightLimitHit: function () {
    this.disableHoverBars(1), this.enableHoverBars(-1), this.userIsScrolling = !1, this.trigger("rightLimitHit")
  },
  mouseOverLeftHotSpot: function () {
    this.userIsScrolling = !0, this.updateHoverScroller(), this.enableHoverBars(1), this.trigger("mouseOverLeftHotSpot")
  },
  getIsUserScrolling: function () {
    return this.userIsScrolling
  },
  mouseOverRightHotSpot: function () {
    this.userIsScrolling = !0, this.updateHoverScroller(), this.enableHoverBars(-1), this.trigger("mouseOverRightHotSpot")
  },
  mouseOutRightHotSpot: function () {
    this.userIsScrolling = !1, this.enableHoverBars(-1), this.trigger("mouseOutRightHotSpot")
  },
  mouseOutLeftHotSpot: function () {
    this.userIsScrolling = !1, this.enableHoverBars(1), this.trigger("mouseOutLeftHotSpot")
  },
  updateScrollerPosition: function (e, t) {
    if (!this.hoverScroller || e !== -1 && typeof t == "number") return;
    var n = this.hoverScroller.getScrollableAreaWidth() - t;
    n > 0 && this.hoverScroller.setWrapperScrollPosition(n)
  },
  updateHoverScroller: function (e) {
    if (!this.hoverScroller) return;
    this.hoverScroller.updateOffset(), this.hoverScroller.recalculateScrollableArea(), this.hoverScroller._showHideHotSpots(e);
    if (this.forceFullPageWidth) {
      var t = Jux.Util.getViewportSize().width;
      this.$scrollableArea.width() < t && (this.$scrollableArea.css("width", Jux.Util.getViewportSize().width + "px"), this.$scrollableArea.css("min-width", Jux.Util.getViewportSize().width + "px"))
    }
  },
  enableHoverBars: function (e) {
    if (!this.hoverScroller || !this.options.hotSpotScrolling) return;
    e === 1 && this.hoverScroller.showHoverBar("right"), e === -1 && this.hoverScroller.showHoverBar("left"), e === 0 && this.hoverScroller.showHoverBar("both")
  },
  disableHoverBars: function (e) {
    if (!this.hoverScroller || !this.options.hotSpotScrolling) return;
    e === 1 && (this.hoverScroller.hideHoverBar("right"), this.hoverScroller.clearIntervals("right"), this.hoverScroller.showHoverBar("left")), e === -1 && (this.hoverScroller.hideHoverBar("left"), this.hoverScroller.clearIntervals("left"), this.hoverScroller.showHoverBar("right")), e === 0 && (this.userIsScrolling = !1, this.hoverScroller.hideHoverBar("both"), this.hoverScroller.clearIntervals())
  },
  getScrollableAreaWidth: function () {
    return this.hoverScroller.getScrollableAreaWidth()
  },
  determineIfEnoughContentForHoverBars: function () {
    if (!this.hoverScroller || !this.scroller.isRendered()) return;
    var e = this.hoverScroller.getScrollableAreaWidth(),
      t = this.scroller.getWidth();
    return e >= t ? !0 : !1
  },
  isAtEndOfScroll: function () {
    return this.hoverScroller.isAtEndOfScroll()
  },
  scrollToElement: function (e) {
    if (!e || !this.hoverScroller) return;
    this.enableHoverBars(0), this.isVisible ? this.hoverScroller.scrollToElement("id", e.attr("id")) : this._jumpToElement(e)
  },
  _jumpToElement: function (e) {
    if (!e || !this.hoverScroller) return;
    this.hoverScroller.jumpToElement("id", e.attr("id"))
  },
  showHoverBarsIfEnoughContent: function () {
    this.updateHoverScroller();
    var e = this.determineIfEnoughContentForHoverBars();
    e ? this.enableHoverBars(1) : this.disableHoverBars(0)
  },
  destroy: function () {
    this.purgeListeners(), this.hoverScroller.destroy();
    for (var e in this) this.hasOwnProperty(e) && (this[e] = null)
  }
}), ui.Dialog.DeleteJux = Class.extend(ui.Dialog, {
  cls: "palette alertBox",
  modal: !0,
  autoOpen: !0,
  title: "",
  html: '<div class="alertText"><div class="alertText-heading">Delete this WHOLE JUX?</div></div>',
  constructor: function (e) {
    if (!e.gallery) throw "Gallery required to delete Jux";
    this.gallery = e.gallery, this.onDelete = e.onDelete || Jux.emptyFn, this.onCancel = e.onCancel || Jux.emptyFn;
    var t = this;
    this.buttons = [{
      text: "Yes, delete this Jux and all its posts",
      cls: "alertAction",
      handler: this.onDeleteClicked.createDelegate(this)
    }, {
      text: "Cancel",
      cls: "alertAction",
      handler: this.onCancelClicked.createDelegate(this)
    }], this.closeButton = new ui.toolButtons.CloseButton({
      size: "tiny",
      handler: function () {
        t.close()
      },
      scope: this
    }), this._super()
  },
  onDeleteClicked: function () {
    this.close(), this.gallery.destroy({
      complete: this.onGalleryDestroyComplete,
      scope: this
    })
  },
  onCancelClicked: function () {
    this.close(), this.onCancel()
  },
  onGalleryDestroyComplete: function () {
    this.onDelete(), this.destroy()
  }
});