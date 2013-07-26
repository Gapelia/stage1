/*1.5.6*/
(function () {
  function l() {
    this.returnValue = !1
  }

  function c() {
    this.cancelBubble = !0
  }
  var e = 0,
    t = [],
    n = {}, r = {}, i = {
      "<": "lt",
      ">": "gt",
      "&": "amp",
      '"': "quot",
      "'": "#39"
    }, s = /[<>&\"\']/g,
    o, u = window.setTimeout,
    a = {}, f;
  (function (e) {
    var t = e.split(/,/),
      n, i, s;
    for (n = 0; n < t.length; n += 2) {
      s = t[n + 1].split(/ /);
      for (i = 0; i < s.length; i++) r[s[i]] = t[n]
    }
  })("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");
  var h = {
    VERSION: "1.5.6",
    STOPPED: 1,
    STARTED: 2,
    QUEUED: 1,
    UPLOADING: 2,
    FAILED: 4,
    DONE: 5,
    GENERIC_ERROR: -100,
    HTTP_ERROR: -200,
    IO_ERROR: -300,
    SECURITY_ERROR: -400,
    INIT_ERROR: -500,
    FILE_SIZE_ERROR: -600,
    FILE_EXTENSION_ERROR: -601,
    IMAGE_FORMAT_ERROR: -700,
    IMAGE_MEMORY_ERROR: -701,
    IMAGE_DIMENSIONS_ERROR: -702,
    mimeTypes: r,
    ua: function () {
      var e = navigator,
        t = e.userAgent,
        n = e.vendor,
        r, i, s;
      return r = /WebKit/.test(t), s = r && n.indexOf("Apple") !== -1, i = window.opera && window.opera.buildNumber, {
        windows: navigator.platform.indexOf("Win") !== -1,
        android: /Android/.test(t),
        ie: !r && !i && /MSIE/gi.test(t) && /Explorer/gi.test(e.appName),
        webkit: r,
        gecko: !r && /Gecko/.test(t),
        safari: s,
        opera: !! i
      }
    }(),
    typeOf: function (e) {
      return {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
    },
    extend: function (e) {
      return h.each(arguments, function (t, n) {
        n > 0 && h.each(t, function (t, n) {
          e[n] = t
        })
      }), e
    },
    cleanName: function (e) {
      var t, n;
      n = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"];
      for (t = 0; t < n.length; t += 2) e = e.replace(n[t], n[t + 1]);
      return e = e.replace(/\s+/g, "_"), e = e.replace(/[^a-z0-9_\-\.]+/gi, ""), e
    },
    addRuntime: function (e, n) {
      return n.name = e, t[e] = n, t.push(n), n
    },
    guid: function () {
      var t = (new Date).getTime().toString(32),
        n;
      for (n = 0; n < 5; n++) t += Math.floor(Math.random() * 65535).toString(32);
      return (h.guidPrefix || "p") + t + (e++).toString(32)
    },
    buildUrl: function (e, t) {
      var n = "";
      return h.each(t, function (e, t) {
        n += (n ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(e)
      }), n && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
    },
    each: function (e, t) {
      var n, r, i;
      if (e) {
        n = e.length;
        if (n === o) {
          for (r in e)
            if (e.hasOwnProperty(r) && t(e[r], r) === !1) return
        } else
          for (i = 0; i < n; i++)
            if (t(e[i], i) === !1) return
      }
    },
    formatSize: function (e) {
      return e === o || /\D/.test(e) ? h.translate("N/A") : e > 1073741824 ? Math.round(e / 1073741824, 1) + " GB" : e > 1048576 ? Math.round(e / 1048576, 1) + " MB" : e > 1024 ? Math.round(e / 1024, 1) + " KB" : e + " b"
    },
    getPos: function (e, t) {
      function a(e) {
        var t, n, r = 0,
          i = 0;
        return e && (n = e.getBoundingClientRect(), t = s.compatMode === "CSS1Compat" ? s.documentElement : s.body, r = n.left + t.scrollLeft, i = n.top + t.scrollTop), {
          x: r,
          y: i
        }
      }
      var n = 0,
        r = 0,
        i, s = document,
        o, u;
      e = e, t = t || s.body;
      if (e && e.getBoundingClientRect && h.ua.ie && (!s.documentMode || s.documentMode < 8)) return o = a(e), u = a(t), {
        x: o.x - u.x,
        y: o.y - u.y
      };
      i = e;
      while (i && i != t && i.nodeType) n += i.offsetLeft || 0, r += i.offsetTop || 0, i = i.offsetParent;
      i = e.parentNode;
      while (i && i != t && i.nodeType) n -= i.scrollLeft || 0, r -= i.scrollTop || 0, i = i.parentNode;
      return {
        x: n,
        y: r
      }
    },
    getSize: function (e) {
      return {
        w: e.offsetWidth || e.clientWidth,
        h: e.offsetHeight || e.clientHeight
      }
    },
    parseSize: function (e) {
      var t;
      return typeof e == "string" && (e = /^([0-9]+)([mgk]?)$/.exec(e.toLowerCase().replace(/[^0-9mkg]/g, "")), t = e[2], e = +e[1], t == "g" && (e *= 1073741824), t == "m" && (e *= 1048576), t == "k" && (e *= 1024)), e
    },
    xmlEncode: function (e) {
      return e ? ("" + e).replace(s, function (e) {
        return i[e] ? "&" + i[e] + ";" : e
      }) : e
    },
    toArray: function (e) {
      var t, n = [];
      for (t = 0; t < e.length; t++) n[t] = e[t];
      return n
    },
    inArray: function (e, t) {
      if (t) {
        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e);
        for (var n = 0, r = t.length; n < r; n++)
          if (t[n] === e) return n
      }
      return -1
    },
    addI18n: function (e) {
      return h.extend(n, e)
    },
    translate: function (e) {
      return n[e] || e
    },
    isEmptyObj: function (e) {
      if (e === o) return !0;
      for (var t in e) return !1;
      return !0
    },
    hasClass: function (e, t) {
      var n;
      return e.className == "" ? !1 : (n = new RegExp("(^|\\s+)" + t + "(\\s+|$)"), n.test(e.className))
    },
    addClass: function (e, t) {
      h.hasClass(e, t) || (e.className = e.className == "" ? t : e.className.replace(/\s+$/, "") + " " + t)
    },
    removeClass: function (e, t) {
      var n = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
      e.className = e.className.replace(n, function (e, t, n) {
        return t === " " && n === " " ? " " : ""
      })
    },
    getStyle: function (e, t) {
      if (e.currentStyle) return e.currentStyle[t];
      if (window.getComputedStyle) return window.getComputedStyle(e, null)[t]
    },
    addEvent: function (e, t, n) {
      var r, i, s, u;
      u = arguments[3], t = t.toLowerCase(), f === o && (f = "Plupload_" + h.guid()), e.addEventListener ? (r = n, e.addEventListener(t, r, !1)) : e.attachEvent && (r = function () {
        var e = window.event;
        e.target || (e.target = e.srcElement), e.preventDefault = l, e.stopPropagation = c, n(e)
      }, e.attachEvent("on" + t, r)), e[f] === o && (e[f] = h.guid()), a.hasOwnProperty(e[f]) || (a[e[f]] = {}), i = a[e[f]], i.hasOwnProperty(t) || (i[t] = []), i[t].push({
        func: r,
        orig: n,
        key: u
      })
    },
    removeEvent: function (e, t) {
      var n, r, i;
      typeof arguments[2] == "function" ? r = arguments[2] : i = arguments[2], t = t.toLowerCase();
      if (!(e[f] && a[e[f]] && a[e[f]][t])) return;
      n = a[e[f]][t];
      for (var s = n.length - 1; s >= 0; s--)
        if (n[s].key === i || n[s].orig === r) {
          e.removeEventListener ? e.removeEventListener(t, n[s].func, !1) : e.detachEvent && e.detachEvent("on" + t, n[s].func), n[s].orig = null, n[s].func = null, n.splice(s, 1);
          if (r !== o) break
        }
      n.length || delete a[e[f]][t];
      if (h.isEmptyObj(a[e[f]])) {
        delete a[e[f]];
        try {
          delete e[f]
        } catch (u) {
          e[f] = o
        }
      }
    },
    removeAllEvents: function (e) {
      var t = arguments[1];
      if (e[f] === o || !e[f]) return;
      h.each(a[e[f]], function (n, r) {
        h.removeEvent(e, r, t)
      })
    }
  };
  h.Uploader = function (e) {
    function f() {
      var e, t = 0,
        n;
      if (this.state == h.STARTED) {
        for (n = 0; n < i.length; n++)!e && i[n].status == h.QUEUED ? (e = i[n], e.status = h.UPLOADING, this.trigger("BeforeUpload", e) && this.trigger("UploadFile", e)) : t++;
        t == i.length && (this.stop(), this.trigger("UploadComplete", i))
      }
    }

    function l() {
      var e, t;
      r.reset();
      for (e = 0; e < i.length; e++) t = i[e], t.size !== o ? (r.size += t.size, r.loaded += t.loaded) : r.size = o, t.status == h.DONE ? r.uploaded++ : t.status == h.FAILED ? r.failed++ : r.queued++;
      r.size === o ? r.percent = i.length > 0 ? Math.ceil(r.uploaded / i.length * 100) : 0 : (r.bytesPerSec = Math.ceil(r.loaded / ((+(new Date) - s || 1) / 1e3)), r.percent = r.size > 0 ? Math.ceil(r.loaded / r.size * 100) : 0)
    }
    var n = {}, r, i = [],
      s, a = !1;
    r = new h.QueueProgress, e = h.extend({
      chunk_size: 0,
      multipart: !0,
      multi_selection: !0,
      file_data_name: "file",
      filters: []
    }, e), h.extend(this, {
      state: h.STOPPED,
      runtime: "",
      features: {},
      files: i,
      settings: e,
      total: r,
      id: h.guid(),
      init: function () {
        function v() {
          var e = a[p++],
            t, r, i;
          if (e) {
            t = e.getFeatures(), r = n.settings.required_features;
            if (r) {
              r = r.split(",");
              for (i = 0; i < r.length; i++)
                if (!t[r[i]]) {
                  v();
                  return
                }
            }
            e.init(n, function (r) {
              r && r.success ? (n.features = t, n.runtime = e.name, n.trigger("Init", {
                runtime: e.name
              }), n.trigger("PostInit"), n.refresh()) : v()
            })
          } else n.trigger("Error", {
            code: h.INIT_ERROR,
            message: h.translate("Init error.")
          })
        }
        var n = this,
          r, a, c, p = 0,
          d;
        typeof e.preinit == "function" ? e.preinit(n) : h.each(e.preinit, function (e, t) {
          n.bind(t, e)
        }), e.page_url = e.page_url || document.location.pathname.replace(/\/[^\/]+$/g, "/"), /^(\w+:\/\/|\/)/.test(e.url) || (e.url = e.page_url + e.url), e.chunk_size = h.parseSize(e.chunk_size), e.max_file_size = h.parseSize(e.max_file_size), n.bind("FilesAdded", function (t, r) {
          var s, a, f = 0,
            l, c = e.filters;
          c && c.length && (l = [], h.each(c, function (e) {
            h.each(e.extensions.split(/,/), function (e) {
              /^\s*\*\s*$/.test(e) ? l.push("\\.*") : l.push("\\." + e.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"))
            })
          }), l = new RegExp(l.join("|") + "$", "i"));
          for (s = 0; s < r.length; s++) {
            a = r[s], a.loaded = 0, a.percent = 0, a.status = h.QUEUED;
            if (l && !l.test(a.name)) {
              t.trigger("Error", {
                code: h.FILE_EXTENSION_ERROR,
                message: h.translate("File extension error."),
                file: a
              });
              continue
            }
            if (a.size !== o && a.size > e.max_file_size) {
              t.trigger("Error", {
                code: h.FILE_SIZE_ERROR,
                message: h.translate("File size error."),
                file: a
              });
              continue
            }
            i.push(a), f++
          }
          if (!f) return !1;
          u(function () {
            n.trigger("QueueChanged"), n.refresh()
          }, 1)
        }), e.unique_names && n.bind("UploadFile", function (e, t) {
          var n = t.name.match(/\.([^.]+)$/),
            r = "tmp";
          n && (r = n[1]), t.target_name = t.id + "." + r
        }), n.bind("UploadProgress", function (e, t) {
          t.percent = t.size > 0 ? Math.ceil(t.loaded / t.size * 100) : 100, l()
        }), n.bind("StateChanged", function (e) {
          if (e.state == h.STARTED) s = +(new Date);
          else if (e.state == h.STOPPED)
            for (r = e.files.length - 1; r >= 0; r--) e.files[r].status == h.UPLOADING && (e.files[r].status = h.QUEUED, l())
        }), n.bind("QueueChanged", l), n.bind("Error", function (e, t) {
          t.file && (t.file.status = h.FAILED, l(), e.state == h.STARTED && u(function () {
            f.call(n)
          }, 1))
        }), n.bind("FileUploaded", function (e, t) {
          t.status = h.DONE, t.loaded = t.size, e.trigger("UploadProgress", t), u(function () {
            f.call(n)
          }, 1)
        });
        if (e.runtimes) {
          a = [], d = e.runtimes.split(/\s?,\s?/);
          for (r = 0; r < d.length; r++) t[d[r]] && a.push(t[d[r]])
        } else a = t;
        v(), typeof e.init == "function" ? e.init(n) : h.each(e.init, function (e, t) {
          n.bind(t, e)
        })
      },
      refresh: function () {
        this.trigger("Refresh")
      },
      start: function () {
        i.length && this.state != h.STARTED && (this.state = h.STARTED, this.trigger("StateChanged"), f.call(this))
      },
      stop: function () {
        this.state != h.STOPPED && (this.state = h.STOPPED, this.trigger("CancelUpload"), this.trigger("StateChanged"))
      },
      disableBrowse: function () {
        a = arguments[0] !== o ? arguments[0] : !0, this.trigger("DisableBrowse", a)
      },
      getFile: function (e) {
        var t;
        for (t = i.length - 1; t >= 0; t--)
          if (i[t].id === e) return i[t]
      },
      removeFile: function (e) {
        var t;
        for (t = i.length - 1; t >= 0; t--)
          if (i[t].id === e.id) return this.splice(t, 1)[0]
      },
      splice: function (e, t) {
        var n;
        return n = i.splice(e === o ? 0 : e, t === o ? i.length : t), this.trigger("FilesRemoved", n), this.trigger("QueueChanged"), n
      },
      trigger: function (e) {
        var t = n[e.toLowerCase()],
          r, i;
        if (t) {
          i = Array.prototype.slice.call(arguments), i[0] = this;
          for (r = 0; r < t.length; r++)
            if (t[r].func.apply(t[r].scope, i) === !1) return !1
        }
        return !0
      },
      hasEventListener: function (e) {
        return !!n[e.toLowerCase()]
      },
      bind: function (e, t, r) {
        var i;
        e = e.toLowerCase(), i = n[e] || [], i.push({
          func: t,
          scope: r || this
        }), n[e] = i
      },
      unbind: function (e) {
        e = e.toLowerCase();
        var t = n[e],
          r, i = arguments[1];
        if (t) {
          if (i !== o) {
            for (r = t.length - 1; r >= 0; r--)
              if (t[r].func === i) {
                t.splice(r, 1);
                break
              }
          } else t = [];
          t.length || delete n[e]
        }
      },
      unbindAll: function () {
        var e = this;
        h.each(n, function (t, n) {
          e.unbind(n)
        })
      },
      destroy: function () {
        this.stop(), this.trigger("Destroy"), this.unbindAll()
      }
    })
  }, h.File = function (e, t, n) {
    var r = this;
    r.id = e, r.name = t, r.size = n, r.loaded = 0, r.percent = 0, r.status = 0
  }, h.Runtime = function () {
    this.getFeatures = function () {}, this.init = function (e, t) {}
  }, h.QueueProgress = function () {
    var e = this;
    e.size = 0, e.loaded = 0, e.uploaded = 0, e.failed = 0, e.queued = 0, e.percent = 0, e.bytesPerSec = 0, e.reset = function () {
      e.size = e.loaded = e.uploaded = e.failed = e.queued = e.percent = e.bytesPerSec = 0
    }
  }, h.runtimes = {}, window.plupload = h
})(),
function () {
  if (window.google && google.gears) return;
  var e = null;
  if (typeof GearsFactory != "undefined") e = new GearsFactory;
  else try {
    e = new ActiveXObject("Gears.Factory"), e.getBuildInfo().indexOf("ie_mobile") != -1 && e.privateSetGlobalObject(this)
  } catch (t) {
    typeof navigator.mimeTypes != "undefined" && navigator.mimeTypes["application/x-googlegears"] && (e = document.createElement("object"), e.style.display = "none", e.width = 0, e.height = 0, e.type = "application/x-googlegears", document.documentElement.appendChild(e))
  }
  if (!e) return;
  window.google || (window.google = {}), google.gears || (google.gears = {
    factory: e
  })
}(),
function (e, t, n, r) {
  function s(e, t, n) {
    var r, i, s, o;
    i = google.gears.factory.create("beta.canvas");
    try {
      i.decode(e), t.width || (t.width = i.width), t.height || (t.height = i.height), o = Math.min(t.width / i.width, t.height / i.height);
      if (o < 1) i.resize(Math.round(i.width * o), Math.round(i.height * o));
      else if (!t.quality || n !== "image/jpeg") return e;
      return t.quality ? i.encode(n, {
        quality: t.quality / 100
      }) : i.encode(n)
    } catch (u) {}
    return e
  }
  var i = {};
  n.runtimes.Gears = n.addRuntime("gears", {
    getFeatures: function () {
      return {
        dragdrop: !0,
        jpgresize: !0,
        pngresize: !0,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      }
    },
    init: function (r, o) {
      function d(e) {
        var t, s, o = [],
          u;
        for (s = 0; s < e.length; s++) t = e[s], u = n.guid(), i[u] = t.blob, o.push(new n.File(u, t.name, t.blob.length));
        r.trigger("FilesAdded", o)
      }
      var u, l, h = !1;
      if (!e.google || !google.gears) return o({
        success: !1
      });
      try {
        u = google.gears.factory.create("beta.desktop")
      } catch (p) {
        return o({
          success: !1
        })
      }
      r.bind("PostInit", function () {
        var e = r.settings,
          i = t.getElementById(e.drop_element);
        i && (n.addEvent(i, "dragover", function (e) {
          u.setDropEffect(e, "copy"), e.preventDefault()
        }, r.id), n.addEvent(i, "drop", function (e) {
          var t = u.getDragData(e, "application/x-gears-files");
          t && d(t.files), e.preventDefault()
        }, r.id), i = 0), n.addEvent(t.getElementById(e.browse_button), "click", function (t) {
          var n = [],
            r, i, s;
          t.preventDefault();
          if (h) return;
          e: for (r = 0; r < e.filters.length; r++) {
            s = e.filters[r].extensions.split(",");
            for (i = 0; i < s.length; i++) {
              if (s[i] === "*") {
                n = [];
                break e
              }
              n.push("." + s[i])
            }
          }
          u.openFiles(d, {
            singleFile: !e.multi_selection,
            filter: n
          })
        }, r.id)
      }), r.bind("CancelUpload", function () {
        l.abort && l.abort()
      }), r.bind("UploadFile", function (e, t) {
        function v() {
          function y(r) {
            var i, s = "----pluploadboundary" + n.guid(),
              o = "--",
              u = "\r\n",
              f, h;
            a && (l.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + s), i = google.gears.factory.create("beta.blobbuilder"), n.each(n.extend(m, e.settings.multipart_params), function (e, t) {
              i.append(o + s + u + 'Content-Disposition: form-data; name="' + t + '"' + u + u), i.append(e + u)
            }), h = n.mimeTypes[t.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream", i.append(o + s + u + 'Content-Disposition: form-data; name="' + e.settings.file_data_name + '"; filename="' + t.name + '"' + u + "Content-Type: " + h + u + u), i.append(r), i.append(u + o + s + o + u), f = i.getAsBlob(), p = f.length - r.length, r = f), l.send(r)
          }
          var s, a = e.settings.multipart,
            p = 0,
            m = {
              name: t.target_name || t.name
            }, g = e.settings.url;
          if (t.status == n.DONE || t.status == n.FAILED || e.state == n.STOPPED) return;
          d && (m.chunk = r, m.chunks = o), s = Math.min(u, t.size - r * u), a || (g = n.buildUrl(e.settings.url, m)), l = google.gears.factory.create("beta.httprequest"), l.open("POST", g), a || (l.setRequestHeader("Content-Disposition", 'attachment; filename="' + t.name + '"'), l.setRequestHeader("Content-Type", "application/octet-stream")), n.each(e.settings.headers, function (e, t) {
            l.setRequestHeader(t, e)
          }), l.upload.onprogress = function (n) {
            t.loaded = h + n.loaded - p, e.trigger("UploadProgress", t)
          }, l.onreadystatechange = function () {
            var i;
            if (l.readyState == 4 && e.state !== n.STOPPED)
              if (l.status == 200) {
                i = {
                  chunk: r,
                  chunks: o,
                  response: l.responseText,
                  status: l.status
                }, e.trigger("ChunkUploaded", t, i);
                if (i.cancelled) {
                  t.status = n.FAILED;
                  return
                }
                h += s, ++r >= o ? (t.status = n.DONE, e.trigger("FileUploaded", t, {
                  response: l.responseText,
                  status: l.status
                })) : v()
              } else e.trigger("Error", {
                code: n.HTTP_ERROR,
                message: n.translate("HTTP Error."),
                file: t,
                chunk: r,
                chunks: o,
                status: l.status
              })
          }, r < o && y(i[t.id].slice(r * u, s))
        }
        var r = 0,
          o, u, h = 0,
          p = e.settings.resize,
          d;
        p && /\.(png|jpg|jpeg)$/i.test(t.name) && (i[t.id] = s(i[t.id], p, /\.png$/i.test(t.name) ? "image/png" : "image/jpeg")), t.size = i[t.id].length, u = e.settings.chunk_size, d = u > 0, o = Math.ceil(t.size / u), d || (u = t.size, o = 1), v()
      }), r.bind("DisableBrowse", function (e, t) {
        h = t
      }), r.bind("Destroy", function (e) {
        var r, i, s = {
            browseButton: e.settings.browse_button,
            dropElm: e.settings.drop_element
          };
        for (r in s) i = t.getElementById(s[r]), i && n.removeAllEvents(i, e.id)
      }), o({
        success: !0
      })
    }
  })
}(window, document, plupload),
function (e, t, n, r) {
  function o(e) {
    var t, n = typeof e,
      i, s, u;
    if (e === r || e === null) return "null";
    if (n === "string") return t = "\bb	t\nn\ff\rr\"\"''\\\\", '"' + e.replace(/([\u0080-\uFFFF\x00-\x1f\"])/g, function (e, n) {
      var r = t.indexOf(n);
      return r + 1 ? "\\" + t.charAt(r + 1) : (e = n.charCodeAt().toString(16), "\\u" + "0000".substring(e.length) + e)
    }) + '"';
    if (n == "object") {
      i = e.length !== r, t = "";
      if (i) {
        for (s = 0; s < e.length; s++) t && (t += ","), t += o(e[s]);
        t = "[" + t + "]"
      } else {
        for (u in e) e.hasOwnProperty(u) && (t && (t += ","), t += o(u) + ":" + o(e[u]));
        t = "{" + t + "}"
      }
      return t
    }
    return "" + e
  }

  function u(e) {
    var t = !1,
      n = null,
      r = null,
      i, s, o, u, a, f = 0;
    try {
      try {
        r = new ActiveXObject("AgControl.AgControl"), r.IsVersionSupported(e) && (t = !0), r = null
      } catch (l) {
        var c = navigator.plugins["Silverlight Plug-In"];
        if (c) {
          i = c.description, i === "1.0.30226.2" && (i = "2.0.30226.2"), s = i.split(".");
          while (s.length > 3) s.pop();
          while (s.length < 4) s.push(0);
          o = e.split(".");
          while (o.length > 4) o.pop();
          do u = parseInt(o[f], 10), a = parseInt(s[f], 10), f++; while (f < o.length && u === a);
          u <= a && !isNaN(u) && (t = !0)
        }
      }
    } catch (h) {
      t = !1
    }
    return t
  }
  var i = {}, s = {};
  n.silverlight = {
    trigger: function (e, t) {
      var r = i[e],
        s, o;
      r && (o = n.toArray(arguments).slice(1), o[0] = "Silverlight:" + t, setTimeout(function () {
        r.trigger.apply(r, o)
      }, 0))
    }
  }, n.runtimes.Silverlight = n.addRuntime("silverlight", {
    getFeatures: function () {
      return {
        jpgresize: !0,
        pngresize: !0,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      }
    },
    init: function (r, l) {
      function E() {
        return t.getElementById(r.id + "_silverlight").content.Upload
      }
      var p, v = "",
        m = r.settings.filters,
        y, w = t.body;
      if (!u("2.0.31005.0") || e.opera && e.opera.buildNumber) {
        l({
          success: !1
        });
        return
      }
      s[r.id] = !1, i[r.id] = r, p = t.createElement("div"), p.id = r.id + "_silverlight_container", n.extend(p.style, {
        position: "absolute",
        top: "0px",
        background: r.settings.shim_bgcolor || "transparent",
        zIndex: 99999,
        width: "100px",
        height: "100px",
        overflow: "hidden",
        opacity: r.settings.shim_bgcolor || t.documentMode > 8 ? "" : .01
      }), p.className = "plupload silverlight", r.settings.container && (w = t.getElementById(r.settings.container), n.getStyle(w, "position") === "static" && (w.style.position = "relative")), w.appendChild(p);
      for (y = 0; y < m.length; y++) v += (v != "" ? "|" : "") + m[y].title + " | *." + m[y].extensions.replace(/,/g, ";*.");
      p.innerHTML = '<object id="' + r.id + '_silverlight" data="data:application/x-silverlight," type="application/x-silverlight-2" style="outline:none;" width="1024" height="1024"><param name="source" value="' + r.settings.silverlight_xap_url + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="id=' + r.id + ",filter=" + v + ",multiselect=" + r.settings.multi_selection + '"/></object>', r.bind("Silverlight:Init", function () {
        var e, u = {};
        if (s[r.id]) return;
        s[r.id] = !0, r.bind("Silverlight:StartSelectFiles", function (t) {
          e = []
        }), r.bind("Silverlight:SelectFile", function (t, r, i, s) {
          var o;
          o = n.guid(), u[o] = r, u[r] = o, e.push(new n.File(o, i, s))
        }), r.bind("Silverlight:SelectSuccessful", function () {
          e.length && r.trigger("FilesAdded", e)
        }), r.bind("Silverlight:UploadChunkError", function (e, t, i, s, o) {
          r.trigger("Error", {
            code: n.IO_ERROR,
            message: "IO Error.",
            details: o,
            file: e.getFile(u[t])
          })
        }), r.bind("Silverlight:UploadFileProgress", function (e, t, r, i) {
          var s = e.getFile(u[t]);
          s.status != n.FAILED && (s.size = i, s.loaded = r, e.trigger("UploadProgress", s))
        }), r.bind("Refresh", function (e) {
          var r, i, s;
          r = t.getElementById(e.settings.browse_button), r && (i = n.getPos(r, t.getElementById(e.settings.container)), s = n.getSize(r), n.extend(t.getElementById(e.id + "_silverlight_container").style, {
            top: i.y + "px",
            left: i.x + "px",
            width: s.w + "px",
            height: s.h + "px"
          }))
        }), r.bind("Silverlight:UploadChunkSuccessful", function (e, t, r, i, s) {
          var o, a = e.getFile(u[t]);
          o = {
            chunk: r,
            chunks: i,
            response: s
          }, e.trigger("ChunkUploaded", a, o), a.status != n.FAILED && e.state !== n.STOPPED && E().UploadNextChunk(), r == i - 1 && (a.status = n.DONE, e.trigger("FileUploaded", a, {
            response: s
          }))
        }), r.bind("Silverlight:UploadSuccessful", function (e, t, r) {
          var i = e.getFile(u[t]);
          i.status = n.DONE, e.trigger("FileUploaded", i, {
            response: r
          })
        }), r.bind("FilesRemoved", function (e, t) {
          var n;
          for (n = 0; n < t.length; n++) E().RemoveFile(u[t[n].id])
        }), r.bind("UploadFile", function (e, t) {
          var r = e.settings,
            i = r.resize || {};
          E().UploadFile(u[t.id], e.settings.url, o({
            name: t.target_name || t.name,
            mime: n.mimeTypes[t.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream",
            chunk_size: r.chunk_size,
            image_width: i.width,
            image_height: i.height,
            image_quality: i.quality,
            multipart: !! r.multipart,
            multipart_params: r.multipart_params || {},
            file_data_name: r.file_data_name,
            headers: r.headers
          }))
        }), r.bind("CancelUpload", function () {
          E().CancelUpload()
        }), r.bind("Silverlight:MouseEnter", function (e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button), s = e.settings.browse_button_hover, i && s && n.addClass(i, s)
        }), r.bind("Silverlight:MouseLeave", function (e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button), s = e.settings.browse_button_hover, i && s && n.removeClass(i, s)
        }), r.bind("Silverlight:MouseLeftButtonDown", function (e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button), s = e.settings.browse_button_active, i && s && (n.addClass(i, s), n.addEvent(t.body, "mouseup", function () {
            n.removeClass(i, s)
          }))
        }), r.bind("Sliverlight:StartSelectFiles", function (e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button), s = e.settings.browse_button_active, i && s && n.removeClass(i, s)
        }), r.bind("DisableBrowse", function (e, t) {
          E().DisableBrowse(t)
        }), r.bind("Destroy", function (e) {
          var r;
          n.removeAllEvents(t.body, e.id), delete s[e.id], delete i[e.id], r = t.getElementById(e.id + "_silverlight_container"), r && r.parentNode.removeChild(r)
        }), l({
          success: !0
        })
      })
    }
  })
}(window, document, plupload),
function (e, t, n, r) {
  function o() {
    var e;
    try {
      e = navigator.plugins["Shockwave Flash"], e = e.description
    } catch (t) {
      try {
        e = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
      } catch (n) {
        e = "0.0"
      }
    }
    return e = e.match(/\d+/g), parseFloat(e[0] + "." + e[1])
  }
  var i = {}, s = {};
  n.flash = {
    trigger: function (e, t, n) {
      setTimeout(function () {
        var r = i[e],
          s, o;
        r && r.trigger("Flash:" + t, n)
      }, 0)
    }
  }, n.runtimes.Flash = n.addRuntime("flash", {
    getFeatures: function () {
      return {
        jpgresize: !0,
        pngresize: !0,
        maxWidth: 8091,
        maxHeight: 8091,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      }
    },
    init: function (e, r) {
      function p() {
        return t.getElementById(e.id + "_flash")
      }

      function v() {
        if (l++ > 5e3) {
          r({
            success: !1
          });
          return
        }
        s[e.id] === !1 && setTimeout(v, 1)
      }
      var u, f, l = 0,
        h = t.body;
      if (o() < 10) {
        r({
          success: !1
        });
        return
      }
      s[e.id] = !1, i[e.id] = e, u = t.getElementById(e.settings.browse_button), f = t.createElement("div"), f.id = e.id + "_flash_container", n.extend(f.style, {
        position: "absolute",
        top: "0px",
        background: e.settings.shim_bgcolor || "transparent",
        zIndex: 99999,
        width: "100%",
        height: "100%"
      }), f.className = "plupload flash", e.settings.container && (h = t.getElementById(e.settings.container), n.getStyle(h, "position") === "static" && (h.style.position = "relative")), h.appendChild(f),
      function () {
        var r, i;
        r = '<object id="' + e.id + '_flash" type="application/x-shockwave-flash" data="' + e.settings.flash_swf_url + '" ', n.ua.ie && (r += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), r += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + e.settings.flash_swf_url + '" /><param name="flashvars" value="id=' + escape(e.id) + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', n.ua.ie ? (i = t.createElement("div"), f.appendChild(i), i.outerHTML = r, i = null) : f.innerHTML = r
      }(), v(), u = f = null, e.bind("Destroy", function (e) {
        var r;
        n.removeAllEvents(t.body, e.id), delete s[e.id], delete i[e.id], r = t.getElementById(e.id + "_flash_container"), r && r.parentNode.removeChild(r)
      }), e.bind("Flash:Init", function () {
        var i = {}, o;
        try {
          p().setFileFilters(e.settings.filters, e.settings.multi_selection)
        } catch (u) {
          r({
            success: !1
          });
          return
        }
        if (s[e.id]) return;
        s[e.id] = !0, e.bind("UploadFile", function (t, r) {
          var s = t.settings,
            o = e.settings.resize || {};
          p().uploadFile(i[r.id], s.url, {
            name: r.target_name || r.name,
            mime: n.mimeTypes[r.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream",
            chunk_size: s.chunk_size,
            width: o.width,
            height: o.height,
            quality: o.quality,
            multipart: s.multipart,
            multipart_params: s.multipart_params || {},
            file_data_name: s.file_data_name,
            format: /\.(jpg|jpeg)$/i.test(r.name) ? "jpg" : "png",
            headers: s.headers,
            urlstream_upload: s.urlstream_upload
          })
        }), e.bind("CancelUpload", function () {
          p().cancelUpload()
        }), e.bind("Flash:UploadProcess", function (e, t) {
          var r = e.getFile(i[t.id]);
          r.status != n.FAILED && (r.loaded = t.loaded, r.size = t.size, e.trigger("UploadProgress", r))
        }), e.bind("Flash:UploadChunkComplete", function (e, t) {
          var r, s = e.getFile(i[t.id]);
          r = {
            chunk: t.chunk,
            chunks: t.chunks,
            response: t.text
          }, e.trigger("ChunkUploaded", s, r), s.status !== n.FAILED && e.state !== n.STOPPED && p().uploadNextChunk(), t.chunk == t.chunks - 1 && (s.status = n.DONE, e.trigger("FileUploaded", s, {
            response: t.text
          }))
        }), e.bind("Flash:SelectFiles", function (t, r) {
          var s, o, u = [],
            a;
          for (o = 0; o < r.length; o++) s = r[o], a = n.guid(), i[a] = s.id, i[s.id] = a, u.push(new n.File(a, s.name, s.size));
          u.length && e.trigger("FilesAdded", u)
        }), e.bind("Flash:SecurityError", function (t, r) {
          e.trigger("Error", {
            code: n.SECURITY_ERROR,
            message: n.translate("Security error."),
            details: r.message,
            file: e.getFile(i[r.id])
          })
        }), e.bind("Flash:GenericError", function (t, r) {
          e.trigger("Error", {
            code: n.GENERIC_ERROR,
            message: n.translate("Generic error."),
            details: r.message,
            file: e.getFile(i[r.id])
          })
        }), e.bind("Flash:IOError", function (t, r) {
          e.trigger("Error", {
            code: n.IO_ERROR,
            message: n.translate("IO error."),
            details: r.message,
            file: e.getFile(i[r.id])
          })
        }), e.bind("Flash:ImageError", function (t, r) {
          e.trigger("Error", {
            code: parseInt(r.code, 10),
            message: n.translate("Image error."),
            file: e.getFile(i[r.id])
          })
        }), e.bind("Flash:StageEvent:rollOver", function (r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button), s = r.settings.browse_button_hover, i && s && n.addClass(i, s)
        }), e.bind("Flash:StageEvent:rollOut", function (r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button), s = r.settings.browse_button_hover, i && s && n.removeClass(i, s)
        }), e.bind("Flash:StageEvent:mouseDown", function (r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button), s = r.settings.browse_button_active, i && s && (n.addClass(i, s), n.addEvent(t.body, "mouseup", function () {
            n.removeClass(i, s)
          }, r.id))
        }), e.bind("Flash:StageEvent:mouseUp", function (r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button), s = r.settings.browse_button_active, i && s && n.removeClass(i, s)
        }), e.bind("Flash:ExifData", function (t, n) {
          e.trigger("ExifData", e.getFile(i[n.id]), n.data)
        }), e.bind("Flash:GpsData", function (t, n) {
          e.trigger("GpsData", e.getFile(i[n.id]), n.data)
        }), e.bind("QueueChanged", function (t) {
          e.refresh()
        }), e.bind("FilesRemoved", function (e, t) {
          var n;
          for (n = 0; n < t.length; n++) p().removeFile(i[t[n].id])
        }), e.bind("StateChanged", function (t) {
          e.refresh()
        }), e.bind("Refresh", function (r) {
          var i, s, o;
          p().setFileFilters(e.settings.filters, e.settings.multi_selection), i = t.getElementById(r.settings.browse_button), i && (s = n.getPos(i, t.getElementById(r.settings.container)), o = n.getSize(i), n.extend(t.getElementById(r.id + "_flash_container").style, {
            top: s.y + "px",
            left: s.x + "px",
            width: o.w + "px",
            height: o.h + "px"
          }))
        }), e.bind("DisableBrowse", function (e, t) {
          p().disableBrowse(t)
        }), r({
          success: !0
        })
      })
    }
  })
}(window, document, plupload),
function (e) {
  e.runtimes.BrowserPlus = e.addRuntime("browserplus", {
    getFeatures: function () {
      return {
        dragdrop: !0,
        jpgresize: !0,
        pngresize: !0,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      }
    },
    init: function (t, n) {
      function u(n) {
        var r, s, o = [],
          u, f;
        for (s = 0; s < n.length; s++) u = n[s], f = e.guid(), i[f] = u, o.push(new e.File(f, u.name, u.size));
        s && t.trigger("FilesAdded", o)
      }

      function f() {
        var f = !1;
        t.bind("PostInit", function () {
          function h(e, t) {
            r.DragAndDrop.AddDropTarget({
              id: e
            }, function (n) {
              r.DragAndDrop.AttachCallbacks({
                id: e,
                hover: function (e) {
                  !e && t && t()
                },
                drop: function (e) {
                  t && t(), u(e)
                }
              }, function () {})
            })
          }

          function p() {
            document.getElementById(o).style.top = "-1000px"
          }
          var n, i = s.drop_element,
            o = t.id + "_droptarget",
            l = document.getElementById(i),
            c;
          l && (document.attachEvent && /MSIE/gi.test(navigator.userAgent) ? (n = document.createElement("div"), n.setAttribute("id", o), e.extend(n.style, {
            position: "absolute",
            top: "-1000px",
            background: "red",
            filter: "alpha(opacity=0)",
            opacity: 0
          }), document.body.appendChild(n), e.addEvent(l, "dragenter", function (t) {
            var n, r;
            n = document.getElementById(i), r = e.getPos(n), e.extend(document.getElementById(o).style, {
              top: r.y + "px",
              left: r.x + "px",
              width: n.offsetWidth + "px",
              height: n.offsetHeight + "px"
            })
          }), h(o, p)) : h(i)), e.addEvent(document.getElementById(s.browse_button), "click", function (t) {
            var n = [],
              i, o, l = s.filters,
              c, h;
            t.preventDefault();
            if (f) return;
            e: for (i = 0; i < l.length; i++) {
              c = l[i].extensions.split(",");
              for (o = 0; o < c.length; o++) {
                if (c[o] === "*") {
                  n = [];
                  break e
                }
                h = e.mimeTypes[c[o]], h && e.inArray(h, n) === -1 && n.push(e.mimeTypes[c[o]])
              }
            }
            r.FileBrowse.OpenBrowseDialog({
              mimeTypes: n
            }, function (e) {
              e.success && u(e.value)
            })
          }), l = n = null
        }), t.bind("CancelUpload", function () {
          r.Uploader.cancel({}, function () {})
        }), t.bind("DisableBrowse", function (e, t) {
          f = t
        }), t.bind("UploadFile", function (t, n) {
          function d(i, s) {
            var o;
            if (n.status == e.FAILED) return;
            u.name = n.target_name || n.name, f && (u.chunk = "" + i, u.chunks = "" + s), o = p.shift(), r.Uploader.upload({
              url: t.settings.url,
              files: {
                file: o
              },
              cookies: document.cookies,
              postvars: e.extend(u, t.settings.multipart_params),
              progressCallback: function (e) {
                var r, s = 0;
                l[i] = parseInt(e.filePercent * o.size / 100, 10);
                for (r = 0; r < l.length; r++) s += l[r];
                n.loaded = s, t.trigger("UploadProgress", n)
              }
            }, function (r) {
              var o, u;
              r.success ? (o = r.value.statusCode, f && t.trigger("ChunkUploaded", n, {
                chunk: i,
                chunks: s,
                response: r.value.body,
                status: o
              }), p.length > 0 ? d(++i, s) : (n.status = e.DONE, t.trigger("FileUploaded", n, {
                response: r.value.body,
                status: o
              }), o >= 400 && t.trigger("Error", {
                code: e.HTTP_ERROR,
                message: e.translate("HTTP Error."),
                file: n,
                status: o
              }))) : t.trigger("Error", {
                code: e.GENERIC_ERROR,
                message: e.translate("Generic Error."),
                file: n,
                details: r.error
              })
            })
          }

          function v(e) {
            n.size = e.size, f ? r.FileAccess.chunk({
              file: e,
              chunkSize: f
            }, function (e) {
              if (e.success) {
                var t = e.value,
                  n = t.length;
                l = Array(n);
                for (var r = 0; r < n; r++) l[r] = 0, p.push(t[r]);
                d(0, n)
              }
            }) : (l = Array(1), p.push(e), d(0, 1))
          }
          var s = i[n.id],
            u = {}, f = t.settings.chunk_size,
            l, p = [];
          o && /\.(png|jpg|jpeg)$/i.test(n.name) ? BrowserPlus.ImageAlter.transform({
            file: s,
            quality: o.quality || 90,
            actions: [{
              scale: {
                maxwidth: o.width,
                maxheight: o.height
              }
            }]
          }, function (e) {
            e.success && v(e.value.file)
          }) : v(s)
        }), n({
          success: !0
        })
      }
      var r = window.BrowserPlus,
        i = {}, s = t.settings,
        o = s.resize;
      r ? r.init(function (e) {
        var t = [{
          service: "Uploader",
          version: "3"
        }, {
          service: "DragAndDrop",
          version: "1"
        }, {
          service: "FileBrowse",
          version: "1"
        }, {
          service: "FileAccess",
          version: "2"
        }];
        o && t.push({
          service: "ImageAlter",
          version: "4"
        }), e.success ? r.require({
          services: t
        }, function (e) {
          e.success ? f() : n()
        }) : n()
      }) : n()
    }
  })
}(plupload),
function (e, t, n, r) {
  function u(t, n) {
    var r;
    if (!("FileReader" in e)) return n(t.getAsDataURL());
    r = new FileReader, r.readAsDataURL(t), r.onload = function () {
      n(r.result)
    }
  }

  function a(t, n) {
    var r;
    if (!("FileReader" in e)) return n(t.getAsBinary());
    r = new FileReader, r.readAsBinaryString(t), r.onload = function () {
      n(r.result)
    }
  }

  function f(e, n, r, i) {
    var o, a, f, l, p = this;
    u(s[e.id], function (s) {
      o = t.createElement("canvas"), o.style.display = "none", t.body.appendChild(o), a = o.getContext("2d"), f = new Image, f.onerror = f.onabort = function () {
        i({
          success: !1
        })
      }, f.onload = function () {
        var t, u, d, m, g;
        n.width || (n.width = f.width), n.height || (n.height = f.height), l = Math.min(n.width / f.width, n.height / f.height);
        if (l < 1) t = Math.round(f.width * l), u = Math.round(f.height * l);
        else {
          if (!n.quality || r !== "image/jpeg") {
            i({
              success: !1
            });
            return
          }
          t = f.width, u = f.height
        }
        o.width = t, o.height = u, a.drawImage(f, 0, 0, t, u), r === "image/jpeg" && (m = new c(atob(s.substring(s.indexOf("base64,") + 7))), m.headers && m.headers.length && (g = new h, g.init(m.get("exif")[0]) && (g.setExif("PixelXDimension", t), g.setExif("PixelYDimension", u), m.set("exif", g.getBinary()), p.hasEventListener("ExifData") && p.trigger("ExifData", e, g.EXIF()), p.hasEventListener("GpsData") && p.trigger("GpsData", e, g.GPS()))));
        if (n.quality && r === "image/jpeg") try {
          s = o.toDataURL(r, n.quality / 100)
        } catch (y) {
          s = o.toDataURL(r)
        } else s = o.toDataURL(r);
        s = s.substring(s.indexOf("base64,") + 7), s = atob(s), m && m.headers && m.headers.length && (s = m.restore(s), m.purge()), o.parentNode.removeChild(o), i({
          success: !0,
          data: s
        })
      }, f.src = s
    })
  }

  function l() {
    function n(n, r) {
      var i = e ? 0 : -8 * (r - 1),
        s = 0,
        o;
      for (o = 0; o < r; o++) s |= t.charCodeAt(n + o) << Math.abs(i + o * 8);
      return s
    }

    function i(e, n, r) {
      var r = arguments.length === 3 ? r : t.length - n - 1;
      t = t.substr(0, n) + e + t.substr(r + n)
    }

    function s(t, n, r) {
      var s = "",
        o = e ? 0 : -8 * (r - 1),
        u;
      for (u = 0; u < r; u++) s += String.fromCharCode(n >> Math.abs(o + u * 8) & 255);
      i(s, t, r)
    }
    var e = !1,
      t;
    return {
      II: function (t) {
        if (t === r) return e;
        e = t
      },
      init: function (n) {
        e = !1, t = n
      },
      SEGMENT: function (e, n, r) {
        switch (arguments.length) {
        case 1:
          return t.substr(e, t.length - e - 1);
        case 2:
          return t.substr(e, n);
        case 3:
          i(r, e, n);
          break;
        default:
          return t
        }
      },
      BYTE: function (e) {
        return n(e, 1)
      },
      SHORT: function (e) {
        return n(e, 2)
      },
      LONG: function (e, t) {
        if (t === r) return n(e, 4);
        s(e, t, 4)
      },
      SLONG: function (e) {
        var t = n(e, 4);
        return t > 2147483647 ? t - 4294967296 : t
      },
      STRING: function (e, t) {
        var r = "";
        for (t += e; e < t; e++) r += String.fromCharCode(n(e, 1));
        return r
      }
    }
  }

  function c(e) {
    var t = {
      65505: {
        app: "EXIF",
        name: "APP1",
        signature: "Exif\0"
      },
      65506: {
        app: "ICC",
        name: "APP2",
        signature: "ICC_PROFILE\0"
      },
      65517: {
        app: "IPTC",
        name: "APP13",
        signature: "Photoshop 3.0\0"
      }
    }, n = [],
      i, s, o = r,
      u = 0,
      a;
    i = new l, i.init(e);
    if (i.SHORT(0) !== 65496) return;
    s = 2, a = Math.min(1048576, e.length);
    while (s <= a) {
      o = i.SHORT(s);
      if (o >= 65488 && o <= 65495) {
        s += 2;
        continue
      }
      if (o === 65498 || o === 65497) break;
      u = i.SHORT(s + 2) + 2, t[o] && i.STRING(s + 4, t[o].signature.length) === t[o].signature && n.push({
        hex: o,
        app: t[o].app.toUpperCase(),
        name: t[o].name.toUpperCase(),
        start: s,
        length: u,
        segment: i.SEGMENT(s, u)
      }), s += u
    }
    return i.init(null), {
      headers: n,
      restore: function (e) {
        i.init(e);
        var t = new c(e);
        if (!t.headers) return !1;
        for (var r = t.headers.length; r > 0; r--) {
          var o = t.headers[r - 1];
          i.SEGMENT(o.start, o.length, "")
        }
        t.purge(), s = i.SHORT(2) == 65504 ? 4 + i.SHORT(4) : 2;
        for (var r = 0, u = n.length; r < u; r++) i.SEGMENT(s, 0, n[r].segment), s += n[r].length;
        return i.SEGMENT()
      },
      get: function (e) {
        var t = [];
        for (var r = 0, i = n.length; r < i; r++) n[r].app === e.toUpperCase() && t.push(n[r].segment);
        return t
      },
      set: function (e, t) {
        var r = [];
        typeof t == "string" ? r.push(t) : r = t;
        for (var i = ii = 0, s = n.length; i < s; i++) {
          n[i].app === e.toUpperCase() && (n[i].segment = r[ii], n[i].length = r[ii].length, ii++);
          if (ii >= r.length) break
        }
      },
      purge: function () {
        n = [], i.init(null)
      }
    }
  }

  function h() {
    function u(t, n) {
      var i = e.SHORT(t),
        u, a, f, l, c, h, p, d, v = [],
        m = {};
      for (u = 0; u < i; u++) {
        p = h = t + 12 * u + 2, f = n[e.SHORT(p)];
        if (f === r) continue;
        l = e.SHORT(p += 2), c = e.LONG(p += 2), p += 4, v = [];
        switch (l) {
        case 1:
        case 7:
          c > 4 && (p = e.LONG(p) + s.tiffHeader);
          for (a = 0; a < c; a++) v[a] = e.BYTE(p + a);
          break;
        case 2:
          c > 4 && (p = e.LONG(p) + s.tiffHeader), m[f] = e.STRING(p, c - 1);
          continue;
        case 3:
          c > 2 && (p = e.LONG(p) + s.tiffHeader);
          for (a = 0; a < c; a++) v[a] = e.SHORT(p + a * 2);
          break;
        case 4:
          c > 1 && (p = e.LONG(p) + s.tiffHeader);
          for (a = 0; a < c; a++) v[a] = e.LONG(p + a * 4);
          break;
        case 5:
          p = e.LONG(p) + s.tiffHeader;
          for (a = 0; a < c; a++) v[a] = e.LONG(p + a * 4) / e.LONG(p + a * 4 + 4);
          break;
        case 9:
          p = e.LONG(p) + s.tiffHeader;
          for (a = 0; a < c; a++) v[a] = e.SLONG(p + a * 4);
          break;
        case 10:
          p = e.LONG(p) + s.tiffHeader;
          for (a = 0; a < c; a++) v[a] = e.SLONG(p + a * 4) / e.SLONG(p + a * 4 + 4);
          break;
        default:
          continue
        }
        d = c == 1 ? v[0] : v, o.hasOwnProperty(f) && typeof d != "object" ? m[f] = o[f][d] : m[f] = d
      }
      return m
    }

    function a() {
      var n = r,
        i = s.tiffHeader;
      return e.II(e.SHORT(i) == 18761), e.SHORT(i += 2) !== 42 ? !1 : (s.IFD0 = s.tiffHeader + e.LONG(i += 2), n = u(s.IFD0, t.tiff), s.exifIFD = "ExifIFDPointer" in n ? s.tiffHeader + n.ExifIFDPointer : r, s.gpsIFD = "GPSInfoIFDPointer" in n ? s.tiffHeader + n.GPSInfoIFDPointer : r, !0)
    }

    function f(n, r, o) {
      var u, a, f, l = 0;
      if (typeof r == "string") {
        var c = t[n.toLowerCase()];
        for (hex in c)
          if (c[hex] === r) {
            r = hex;
            break
          }
      }
      u = s[n.toLowerCase() + "IFD"], a = e.SHORT(u);
      for (i = 0; i < a; i++) {
        f = u + 12 * i + 2;
        if (e.SHORT(f) == r) {
          l = f + 8;
          break
        }
      }
      return l ? (e.LONG(l, o), !0) : !1
    }
    var e, t, s = {}, o;
    return e = new l, t = {
      tiff: {
        274: "Orientation",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer"
      },
      exif: {
        36864: "ExifVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        36867: "DateTimeOriginal",
        33434: "ExposureTime",
        33437: "FNumber",
        34855: "ISOSpeedRatings",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41990: "SceneCaptureType",
        41988: "DigitalZoomRatio",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness"
      },
      gps: {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude"
      }
    }, o = {
      ColorSpace: {
        1: "sRGB",
        0: "Uncalibrated"
      },
      MeteringMode: {
        0: "Unknown",
        1: "Average",
        2: "CenterWeightedAverage",
        3: "Spot",
        4: "MultiSpot",
        5: "Pattern",
        6: "Partial",
        255: "Other"
      },
      LightSource: {
        1: "Daylight",
        2: "Fliorescent",
        3: "Tungsten",
        4: "Flash",
        9: "Fine weather",
        10: "Cloudy weather",
        11: "Shade",
        12: "Daylight fluorescent (D 5700 - 7100K)",
        13: "Day white fluorescent (N 4600 -5400K)",
        14: "Cool white fluorescent (W 3900 - 4500K)",
        15: "White fluorescent (WW 3200 - 3700K)",
        17: "Standard light A",
        18: "Standard light B",
        19: "Standard light C",
        20: "D55",
        21: "D65",
        22: "D75",
        23: "D50",
        24: "ISO studio tungsten",
        255: "Other"
      },
      Flash: {
        0: "Flash did not fire.",
        1: "Flash fired.",
        5: "Strobe return light not detected.",
        7: "Strobe return light detected.",
        9: "Flash fired, compulsory flash mode",
        13: "Flash fired, compulsory flash mode, return light not detected",
        15: "Flash fired, compulsory flash mode, return light detected",
        16: "Flash did not fire, compulsory flash mode",
        24: "Flash did not fire, auto mode",
        25: "Flash fired, auto mode",
        29: "Flash fired, auto mode, return light not detected",
        31: "Flash fired, auto mode, return light detected",
        32: "No flash function",
        65: "Flash fired, red-eye reduction mode",
        69: "Flash fired, red-eye reduction mode, return light not detected",
        71: "Flash fired, red-eye reduction mode, return light detected",
        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
        89: "Flash fired, auto mode, red-eye reduction mode",
        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
      },
      ExposureMode: {
        0: "Auto exposure",
        1: "Manual exposure",
        2: "Auto bracket"
      },
      WhiteBalance: {
        0: "Auto white balance",
        1: "Manual white balance"
      },
      SceneCaptureType: {
        0: "Standard",
        1: "Landscape",
        2: "Portrait",
        3: "Night scene"
      },
      Contrast: {
        0: "Normal",
        1: "Soft",
        2: "Hard"
      },
      Saturation: {
        0: "Normal",
        1: "Low saturation",
        2: "High saturation"
      },
      Sharpness: {
        0: "Normal",
        1: "Soft",
        2: "Hard"
      },
      GPSLatitudeRef: {
        N: "North latitude",
        S: "South latitude"
      },
      GPSLongitudeRef: {
        E: "East longitude",
        W: "West longitude"
      }
    }, {
      init: function (t) {
        return s = {
          tiffHeader: 10
        }, t === r || !t.length ? !1 : (e.init(t), e.SHORT(0) === 65505 && e.STRING(4, 5).toUpperCase() === "EXIF\0" ? a() : !1)
      },
      EXIF: function () {
        var e;
        e = u(s.exifIFD, t.exif);
        if (e.ExifVersion && n.typeOf(e.ExifVersion) === "array") {
          for (var r = 0, i = ""; r < e.ExifVersion.length; r++) i += String.fromCharCode(e.ExifVersion[r]);
          e.ExifVersion = i
        }
        return e
      },
      GPS: function () {
        var e;
        return e = u(s.gpsIFD, t.gps), e.GPSVersionID && (e.GPSVersionID = e.GPSVersionID.join(".")), e
      },
      setExif: function (e, t) {
        return e !== "PixelXDimension" && e !== "PixelYDimension" ? !1 : f("exif", e, t)
      },
      getBinary: function () {
        return e.SEGMENT()
      }
    }
  }
  var s = {}, o;
  n.runtimes.Html5 = n.addRuntime("html5", {
    getFeatures: function () {
      var r, i, s, u, a, f;
      return i = s = a = f = !1, e.XMLHttpRequest && (r = new XMLHttpRequest, s = !! r.upload, i = !! r.sendAsBinary || !! r.upload), i && (u = !! (r.sendAsBinary || e.Uint8Array && e.ArrayBuffer), a = !(!File || !File.prototype.getAsDataURL && !e.FileReader || !u), f = !! File && !! (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)), o = n.ua.safari && n.ua.windows, {
        html5: i,
        dragdrop: function () {
          var e = t.createElement("div");
          return "draggable" in e || "ondragstart" in e && "ondrop" in e
        }(),
        jpgresize: a,
        pngresize: a,
        multipart: a || !! e.FileReader || !! e.FormData,
        canSendBinary: u,
        cantSendBlobInFormData: !! (n.ua.gecko && e.FormData && e.FileReader && !FileReader.prototype.readAsArrayBuffer) || n.ua.android,
        progress: s,
        chunks: f,
        multi_selection: !n.ua.safari || !n.ua.windows,
        triggerDialog: n.ua.gecko && e.FormData || n.ua.webkit
      }
    },
    init: function (r, i) {
      function c(e) {
        var t, i, o = [],
          u, a = {};
        for (i = 0; i < e.length; i++) {
          t = e[i];
          if (a[t.name]) continue;
          a[t.name] = !0, u = n.guid(), s[u] = t, o.push(new n.File(u, t.fileName || t.name, t.fileSize || t.size))
        }
        o.length && r.trigger("FilesAdded", o)
      }
      var u, l;
      u = this.getFeatures();
      if (!u.html5) {
        i({
          success: !1
        });
        return
      }
      r.bind("Init", function (e) {
        var i, s, o = [],
          u, a, f = e.settings.filters,
          l, h, d = t.body,
          v;
        i = t.createElement("div"), i.id = e.id + "_html5_container", n.extend(i.style, {
          position: "absolute",
          background: r.settings.shim_bgcolor || "transparent",
          width: "100px",
          height: "100px",
          overflow: "hidden",
          zIndex: 99999,
          opacity: r.settings.shim_bgcolor ? "" : 0
        }), i.className = "plupload html5", r.settings.container && (d = t.getElementById(r.settings.container), n.getStyle(d, "position") === "static" && (d.style.position = "relative")), d.appendChild(i);
        e: for (u = 0; u < f.length; u++) {
          l = f[u].extensions.split(/,/);
          for (a = 0; a < l.length; a++) {
            if (l[a] === "*") {
              o = [];
              break e
            }
            h = n.mimeTypes[l[a]], h && n.inArray(h, o) === -1 && o.push(h)
          }
        }
        i.innerHTML = '<input id="' + r.id + '_html5"  style="font-size:999px" type="file" accept="' + o.join(",") + '" ' + (r.settings.multi_selection && r.features.multi_selection ? 'multiple="multiple"' : "") + " />",
        i.scrollTop = 100,
        v = t.getElementById(r.id + "_html5"),
        e.features.triggerDialog ? n.extend(v.style, {
          position: "absolute",
          width: "100%",
          height: "100%"
        }) : n.extend(v.style, {
          cssFloat: "right",
          styleFloat: "right"
        }),
        v.onchange = function () {
          c(this.files), this.value = ""
        },
        s = t.getElementById(e.settings.browse_button);
        if (s) {
          var m = e.settings.browse_button_hover,
            g = e.settings.browse_button_active,
            y = e.features.triggerDialog ? s : i;
          m && (n.addEvent(y, "mouseover", function () {
            n.addClass(s, m)
          }, e.id), n.addEvent(y, "mouseout", function () {
            n.removeClass(s, m)
          }, e.id)), g && (n.addEvent(y, "mousedown", function () {
            n.addClass(s, g)
          }, e.id), n.addEvent(t.body, "mouseup", function () {
            n.removeClass(s, g)
          }, e.id)), e.features.triggerDialog && n.addEvent(s, "click", function (n) {
            var r = t.getElementById(e.id + "_html5");
            r && !r.disabled && r.click(), n.preventDefault()
          }, e.id)
        }
      }), r.bind("PostInit", function () {
        var e = t.getElementById(r.settings.drop_element);
        if (e) {
          if (o) {
            n.addEvent(e, "dragenter", function (i) {
              var s, o, u;
              s = t.getElementById(r.id + "_drop"), s || (s = t.createElement("input"), s.setAttribute("type", "file"), s.setAttribute("id", r.id + "_drop"), s.setAttribute("multiple", "multiple"), n.addEvent(s, "change", function () {
                c(this.files), n.removeEvent(s, "change", r.id), s.parentNode.removeChild(s)
              }, r.id), n.addEvent(s, "dragover", function (e) {
                e.stopPropagation()
              }, r.id), e.appendChild(s)), o = n.getPos(e, t.getElementById(r.settings.container)), u = n.getSize(e), n.getStyle(e, "position") === "static" && n.extend(e.style, {
                position: "relative"
              }), n.extend(s.style, {
                position: "absolute",
                display: "block",
                top: 0,
                left: 0,
                width: u.w + "px",
                height: u.h + "px",
                opacity: 0
              })
            }, r.id);
            return
          }
          n.addEvent(e, "dragover", function (e) {
            e.preventDefault()
          }, r.id), n.addEvent(e, "drop", function (e) {
            var t = e.dataTransfer;
            t && t.files && c(t.files), e.preventDefault()
          }, r.id)
        }
      }), r.bind("Refresh", function (e) {
        var i, s, o, u, a;
        i = t.getElementById(r.settings.browse_button), i && (s = n.getPos(i, t.getElementById(e.settings.container)), o = n.getSize(i), u = t.getElementById(r.id + "_html5_container"), n.extend(u.style, {
          top: s.y + "px",
          left: s.x + "px",
          width: o.w + "px",
          height: o.h + "px"
        }), r.features.triggerDialog && (n.getStyle(i, "position") === "static" && n.extend(i.style, {
          position: "relative"
        }), a = parseInt(n.getStyle(i, "zIndex"), 10), isNaN(a) && (a = 0), n.extend(i.style, {
          zIndex: a
        }), n.extend(u.style, {
          zIndex: a - 1
        })))
      }), r.bind("DisableBrowse", function (e, n) {
        var r = t.getElementById(e.id + "_html5");
        r && (r.disabled = n)
      }), r.bind("CancelUpload", function () {
        l && l.abort && l.abort()
      }), r.bind("UploadFile", function (t, r) {
        function h(e, t, n) {
          var r;
          if (!File.prototype.slice) return (r = File.prototype.webkitSlice || File.prototype.mozSlice) ? r.call(e, t, n) : null;
          try {
            return e.slice(), e.slice(t, n)
          } catch (i) {
            return e.slice(t, n - t)
          }
        }

        function p(s) {
          function c() {
            function S(e) {
              if (l.sendAsBinary) l.sendAsBinary(e);
              else if (t.features.canSendBinary) {
                var n = new Uint8Array(e.length);
                for (var r = 0; r < e.length; r++) n[r] = e.charCodeAt(r) & 255;
                l.send(n.buffer)
              }
            }

            function T(i) {
              var s = 0,
                f = "----pluploadboundary" + n.guid(),
                h, d = "--",
                v = "\r\n",
                x = "";
              l = new XMLHttpRequest, l.upload && (l.upload.onprogress = function (e) {
                r.loaded = Math.min(r.size, a + e.loaded - s), t.trigger("UploadProgress", r)
              }), l.onreadystatechange = function () {
                var e, s;
                if (l.readyState == 4 && t.state !== n.STOPPED) {
                  try {
                    e = l.status
                  } catch (u) {
                    e = 0
                  }
                  if (e >= 400) t.trigger("Error", {
                    code: n.HTTP_ERROR,
                    message: n.translate("HTTP Error."),
                    file: r,
                    status: e
                  });
                  else {
                    if (m) {
                      s = {
                        chunk: o,
                        chunks: m,
                        response: l.responseText,
                        status: e
                      }, t.trigger("ChunkUploaded", r, s), a += b;
                      if (s.cancelled) {
                        r.status = n.FAILED;
                        return
                      }
                      r.loaded = Math.min(r.size, (o + 1) * y)
                    } else r.loaded = r.size;
                    t.trigger("UploadProgress", r), i = p = h = x = null, !m || ++o >= m ? (r.status = n.DONE, t.trigger("FileUploaded", r, {
                      response: l.responseText,
                      status: e
                    })) : c()
                  }
                }
              };
              if (t.settings.multipart && u.multipart) {
                g.name = r.target_name || r.name, l.open("post", E, !0), n.each(t.settings.headers, function (e, t) {
                  l.setRequestHeader(t, e)
                });
                if (typeof i != "string" && !! e.FormData) {
                  h = new FormData, n.each(n.extend(g, t.settings.multipart_params), function (e, t) {
                    h.append(t, e)
                  }), h.append(t.settings.file_data_name, i), l.send(h);
                  return
                }
                if (typeof i == "string") {
                  l.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + f), n.each(n.extend(g, t.settings.multipart_params), function (e, t) {
                    x += d + f + v + 'Content-Disposition: form-data; name="' + t + '"' + v + v, x += unescape(encodeURIComponent(e)) + v
                  }), w = n.mimeTypes[r.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream", x += d + f + v + 'Content-Disposition: form-data; name="' + t.settings.file_data_name + '"; filename="' + unescape(encodeURIComponent(r.name)) + '"' + v + "Content-Type: " + w + v + v + i + v + d + f + d + v, s = x.length - i.length, i = x, S(i);
                  return
                }
              }
              E = n.buildUrl(t.settings.url, n.extend(g, t.settings.multipart_params)), l.open("post", E, !0), l.setRequestHeader("Content-Type", "application/octet-stream"), n.each(t.settings.headers, function (e, t) {
                l.setRequestHeader(t, e)
              }), typeof i == "string" ? S(i) : l.send(i)
            }
            var p, d, m, g, y, b, w, E = t.settings.url;
            if (r.status == n.DONE || r.status == n.FAILED || t.state == n.STOPPED) return;
            g = {
              name: r.target_name || r.name
            }, i.chunk_size && r.size > i.chunk_size && (u.chunks || typeof s == "string") ? (y = i.chunk_size, m = Math.ceil(r.size / y), b = Math.min(y, r.size - o * y), typeof s == "string" ? p = s.substring(o * y, o * y + b) : p = h(s, o * y, o * y + b), g.chunk = o, g.chunks = m) : (b = r.size, p = s), t.settings.multipart && u.multipart && typeof p != "string" && f && u.cantSendBlobInFormData && u.chunks && t.settings.chunk_size ? (f.onload = function () {
              T(f.result)
            }, f.readAsBinaryString(p)) : T(p)
          }
          var o = 0,
            a = 0,
            f = "FileReader" in e ? new FileReader : null;
          c()
        }
        var i = t.settings,
          o, c;
        o = s[r.id], u.jpgresize && t.settings.resize && /\.(png|jpg|jpeg)$/i.test(r.name) ? f.call(t, r, t.settings.resize, /\.png$/i.test(r.name) ? "image/png" : "image/jpeg", function (e) {
          e.success ? (r.size = e.data.length, p(e.data)) : u.chunks ? p(o) : a(o, p)
        }) : !u.chunks && u.jpgresize ? a(o, p) : p(o)
      }), r.bind("Destroy", function (e) {
        var r, i, s = t.body,
          o = {
            inputContainer: e.id + "_html5_container",
            inputFile: e.id + "_html5",
            browseButton: e.settings.browse_button,
            dropElm: e.settings.drop_element
          };
        for (r in o) i = t.getElementById(o[r]), i && n.removeAllEvents(i, e.id);
        n.removeAllEvents(t.body, e.id), e.settings.container && (s = t.getElementById(e.settings.container)), s.removeChild(t.getElementById(o.inputContainer))
      }), i({
        success: !0
      })
    }
  })
}(window, document, plupload),
function (e, t, n, r) {
  function i(e) {
    return t.getElementById(e)
  }
  n.runtimes.Html4 = n.addRuntime("html4", {
    getFeatures: function () {
      return {
        multipart: !0,
        triggerDialog: n.ua.gecko && e.FormData || n.ua.webkit
      }
    },
    init: function (r, s) {
      r.bind("Init", function (s) {
        function T() {
          var e, u, l, c;
          p = n.guid(), v.push(p), e = t.createElement("form"), e.setAttribute("id", "form_" + p), e.setAttribute("method", "post"), e.setAttribute("enctype", "multipart/form-data"), e.setAttribute("encoding", "multipart/form-data"), e.setAttribute("target", s.id + "_iframe"), e.style.position = "absolute", u = t.createElement("input"), u.setAttribute("id", "input_" + p), u.setAttribute("type", "file"), u.setAttribute("accept", g), u.setAttribute("size", 1), c = i(s.settings.browse_button), s.features.triggerDialog && c && n.addEvent(i(s.settings.browse_button), "click", function (e) {
            u.disabled || u.click(), e.preventDefault()
          }, s.id), n.extend(u.style, {
            width: "100%",
            height: "100%",
            opacity: 0,
            fontSize: "99px",
            cursor: "pointer"
          }), n.extend(e.style, {
            overflow: "hidden"
          }), l = s.settings.shim_bgcolor, l && (e.style.background = l), m && n.extend(u.style, {
            filter: "alpha(opacity=0)"
          }), n.addEvent(u, "change", function (t) {
            var o = t.target,
              a, l = [],
              h;
            o.value && (i("form_" + p).style.top = "-1048575px", a = o.value.replace(/\\/g, "/"), a = a.substring(a.length, a.lastIndexOf("/") + 1), l.push(new n.File(p, a)), s.features.triggerDialog ? n.removeEvent(c, "click", s.id) : n.removeAllEvents(e, s.id), n.removeEvent(u, "change", s.id), T(), l.length && r.trigger("FilesAdded", l))
          }, s.id), e.appendChild(u), o.appendChild(e), s.refresh()
        }

        function N() {
          var r = t.createElement("div");
          r.innerHTML = '<iframe id="' + s.id + '_iframe" name="' + s.id + '_iframe" src="' + l + ':&quot;&quot;" style="display:none"></iframe>', u = r.firstChild, o.appendChild(u), n.addEvent(u, "load", function (t) {
            var r = t.target,
              i, o;
            if (!c) return;
            try {
              i = r.contentWindow.document || r.contentDocument || e.frames[r.id].document
            } catch (u) {
              s.trigger("Error", {
                code: n.SECURITY_ERROR,
                message: n.translate("Security error."),
                file: c
              });
              return
            }
            o = i.documentElement.innerText || i.documentElement.textContent, o && (c.status = n.DONE, c.loaded = 1025, c.percent = 100, s.trigger("UploadProgress", c), s.trigger("FileUploaded", c, {
              response: o
            }))
          }, s.id)
        }
        var o = t.body,
          u, l = "javascript",
          c, h, p, v = [],
          m = /MSIE/.test(navigator.userAgent),
          g = [],
          y = s.settings.filters,
          w, E, S, x;
        e: for (w = 0; w < y.length; w++) {
          E = y[w].extensions.split(/,/);
          for (x = 0; x < E.length; x++) {
            if (E[x] === "*") {
              g = [];
              break e
            }
            S = n.mimeTypes[E[x]], S && n.inArray(S, g) === -1 && g.push(S)
          }
        }
        g = g.join(","),
        s.settings.container && (o = i(s.settings.container), n.getStyle(o, "position") === "static" && (o.style.position = "relative")),
        s.bind("UploadFile", function (e, r) {
          var s, o;
          if (r.status == n.DONE || r.status == n.FAILED || e.state == n.STOPPED) return;
          s = i("form_" + r.id), o = i("input_" + r.id), o.setAttribute("name", e.settings.file_data_name), s.setAttribute("action", e.settings.url), n.each(n.extend({
            name: r.target_name || r.name
          }, e.settings.multipart_params), function (e, r) {
            var i = t.createElement("input");
            n.extend(i, {
              type: "hidden",
              name: r,
              value: e
            }), s.insertBefore(i, s.firstChild)
          }), c = r, i("form_" + p).style.top = "-1048575px", s.submit()
        }),
        s.bind("FileUploaded", function (e) {
          e.refresh()
        }),
        s.bind("StateChanged", function (t) {
          t.state == n.STARTED ? N() : t.state == n.STOPPED && e.setTimeout(function () {
            n.removeEvent(u, "load", t.id), u.parentNode && u.parentNode.removeChild(u)
          }, 0), n.each(t.files, function (e, t) {
            if (e.status === n.DONE || e.status === n.FAILED) {
              var r = i("form_" + e.id);
              r && r.parentNode.removeChild(r)
            }
          })
        }),
        s.bind("Refresh", function (e) {
          var r, s, o, u, f, l, c, h, d;
          r = i(e.settings.browse_button), r && (f = n.getPos(r, i(e.settings.container)), l = n.getSize(r), c = i("form_" + p), h = i("input_" + p), n.extend(c.style, {
            top: f.y + "px",
            left: f.x + "px",
            width: l.w + "px",
            height: l.h + "px"
          }), e.features.triggerDialog && (n.getStyle(r, "position") === "static" && n.extend(r.style, {
            position: "relative"
          }), d = parseInt(r.style.zIndex, 10), isNaN(d) && (d = 0), n.extend(r.style, {
            zIndex: d
          }), n.extend(c.style, {
            zIndex: d - 1
          })), o = e.settings.browse_button_hover, u = e.settings.browse_button_active, s = e.features.triggerDialog ? r : c, o && (n.addEvent(s, "mouseover", function () {
            n.addClass(r, o)
          }, e.id), n.addEvent(s, "mouseout", function () {
            n.removeClass(r, o)
          }, e.id)), u && (n.addEvent(s, "mousedown", function () {
            n.addClass(r, u)
          }, e.id), n.addEvent(t.body, "mouseup", function () {
            n.removeClass(r, u)
          }, e.id)))
        }),
        r.bind("FilesRemoved", function (e, t) {
          var n, r;
          for (n = 0; n < t.length; n++) r = i("form_" + t[n].id), r && r.parentNode.removeChild(r)
        }),
        r.bind("DisableBrowse", function (e, n) {
          var r = t.getElementById("input_" + p);
          r && (r.disabled = n)
        }),
        r.bind("Destroy", function (e) {
          var r, s, o, u = {
              inputContainer: "form_" + p,
              inputFile: "input_" + p,
              browseButton: e.settings.browse_button
            };
          for (r in u) s = i(u[r]), s && n.removeAllEvents(s, e.id);
          n.removeAllEvents(t.body, e.id), n.each(v, function (e, t) {
            o = i("form_" + e), o && o.parentNode.removeChild(o)
          })
        }),
        T()
      }), s({
        success: !0
      })
    }
  })
}(window, document, plupload),
function () {
  var e = window.navigator.userAgent.toLowerCase(),
    t = /msie/.test(e) && !/opera/.test(e),
    n = /mozilla/.test(e) && !/(compatible|webkit)/.test(e),
    r = /applewebkit/.test(e);
  _.Events = window.Backbone ? Backbone.Events : {
    bind: function (e, t) {
      var n = this._callbacks || (this._callbacks = {}),
        r = this._callbacks[e] || (this._callbacks[e] = []);
      return r.push(t), this
    },
    unbind: function (e, t) {
      var n;
      if (!e) this._callbacks = {};
      else if (n = this._callbacks)
        if (!t) n[e] = [];
        else {
          var r = n[e];
          if (!r) return this;
          for (var i = 0, s = r.length; i < s; i++)
            if (t === r[i]) {
              r.splice(i, 1);
              break
            }
        }
      return this
    },
    trigger: function (e) {
      var t, n, r, i;
      if (!(n = this._callbacks)) return this;
      if (t = n[e])
        for (r = 0, i = t.length; r < i; r++) t[r].apply(this, Array.prototype.slice.call(arguments, 1));
      if (t = n.all)
        for (r = 0, i = t.length; r < i; r++) t[r].apply(this, arguments);
      return this
    }
  }, _.stripTags = function (e, t) {
    t = (((t || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    var n = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      r = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return e.replace(r, "").replace(n, function (e, n) {
      return t.indexOf("<" + n.toLowerCase() + ">") > -1 ? e : ""
    })
  }, controlsTpl = '     <div class="proper-commands">       <a href="#" title="Emphasis (CTRL+SHIFT+E)" class="command em" command="em"><div>Emphasis</div></a>       <a href="#" title="Strong (CTRL+SHIFT+S)" class="command strong" command="strong"><div>Strong</div></a>       <a href="#" title="Inline Code (CTRL+SHIFT+C)" class="command code" command="code"><div>Code</div></a>       <a title="Link (CTRL+SHIFT+L)" href="#" class="command link" command="link"><div>Link</div></a>      <a href="#" title="Bullet List (CTRL+SHIFT+B)" class="command ul" command="ul"><div>Bullets List</div></a>      <a href="#" title="Numbered List (CTRL+SHIFT+N)" class="command ol" command="ol"><div>Numbered List</div></a>      <a href="#" title="Indent (TAB)" class="command indent" command="indent"><div>Indent</div></a>      <a href="#" title="Outdent (SHIFT+TAB)" class="command outdent" command="outdent"><div>Outdent</div></a>      <br class="clear"/>    </div>', this.Proper = function (e) {
    function l(e) {
      var t = d[e];
      t.exec ? t.exec() : t.isActive() ? t.toggleOff() : t.toggleOn()
    }

    function c() {
      document.execCommand("removeFormat", !1, !0), _.each(["em", "strong", "code"], function (e) {
        var t = d[e];
        t.isActive() && t.toggleOff()
      })
    }

    function h() {
      $(i).find("font").addClass("proper-code")
    }

    function v(e, n) {
      function r(e) {
        return ("" + e).replace(/\s*,\s*/g, ",").replace(/'/g, '"')
      }
      return e = r(e), n = r(n), t ? e.split(",").length === 1 ? _.indexOf(n.split(","), e) > -1 : n.split(",").length === 1 ? _.indexOf(e.split(","), n) > -1 : e === n : e === n
    }

    function m(e) {
      return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }

    function g(e) {
      function t(t, n) {
        e.find(t).each(function () {
          $(this).replaceWith($(document.createElement(n)).html($(this).html()))
        })
      }
      t("i", "em"), t("b", "strong"), t(".proper-code", "code"), t("div", "p"), e.find("span").each(function () {
        this.firstChild && $(this.firstChild).unwrap()
      }), e.find("p, ul, ol").each(function () {
        while ($(this).parent().is("p")) $(this).unwrap()
      }), e.find("ul > ul, ul > ol, ol > ul, ol > ol").each(function () {
        $(this).prev() ? $(this).prev().append(this) : $(this).wrap($("<li />"))
      }),
      function () {
        function n() {
          if (t.length) {
            var e = $("<p />").insertBefore(t[0]);
            for (var n = 0, r = t.length; n < r; n++) $(t[n]).remove().appendTo(e);
            t = []
          }
        }
        var t = [],
          r = _.clone(e.get(0).childNodes);
        for (var i = 0, s = r.length; i < s; i++) {
          var o = r[i];
          !$(o).is("p, ul, ol") && (o.nodeType !== f.TEXT_NODE || !/^\s*$/.exec(o.data)) ? t.push(o) : n()
        }
        n()
      }(), e.find("br").each(function () {
        this.parentNode.lastChild === this && $(this).remove()
      }), e.find("span").each(function () {
        $(this).children().first().unwrap()
      })
    }

    function y(t) {
      N(function () {
        function n(e, n) {
          t.find(e).each(function () {
            var e = $(n).get(0),
              t;
            while (t = this.firstChild) e.appendChild(t);
            $(this).replaceWith(e)
          })
        }
        n("em", "<i />"), n("strong", "<b />"), n("code", '<font class="proper-code" face="' + m(e.codeFontFamily) + '" />')
      })
    }

    function b() {
      if (!e.markup) return;
      s.find(".command").removeClass("selected"), _.each(d, function (e, t) {
        e.isActive && e.isActive() && s.find(".command." + t).addClass("selected")
      })
    }

    function w() {
      $.trim($(i).text()).length === 0 && ($(i).addClass("empty"), e.markup ? $(i).html("<p>" + e.placeholder + "</p>") : $(i).html(e.placeholder))
    }

    function E() {
      $(i).hasClass("empty") && ($(i).removeClass("empty"), T(), document.execCommand("delete", !1, ""))
    }

    function S() {
      if (window.getSelection) {
        var e = window.getSelection();
        if (e.rangeCount > 0) return e.getRangeAt(0)
      } else if (document.selection && document.selection.createRange) return document.selection.createRange();
      return null
    }

    function x(e) {
      if (e)
        if (window.getSelection) {
          var t = window.getSelection();
          t.removeAllRanges(), t.addRange(e)
        } else document.selection && e.select && e.select()
    }

    function T() {
      var e = $(i)[0],
        t;
      document.body.createTextRange ? (t = document.body.createTextRange(), t.moveToElementText(e), t.select()) : (t = document.createRange(), t.selectNodeContents(e)), x(t)
    }

    function N(e) {
      var t = S();
      if (t) var n = t.startContainer,
      r = t.startOffset, i = t.endContainer, s = t.endOffset;
      e();
      if (t) {
        function o(e) {
          if (e) {
            if (e === document.body) return !0;
            if (e.parentNode) return o(e.parentNode)
          }
          return !1
        }
        o(n) && t.setStart(n, r), o(i) && t.setEnd(i, s), x(t)
      }
    }

    function C(e) {
      var t = $('<div id="proper_tmp_el" contenteditable="true" />').css({
        position: "fixed",
        top: "20px",
        left: "20px",
        opacity: "0"
      }).appendTo(document.body).focus();
      setTimeout(function () {
        t.remove(), e(t)
      }, 10)
    }

    function k(e) {
      function n(e) {
        $(e).contents().filter(function () {
          return this.nodeType === f.COMMENT_NODE
        }).remove(), $(e).children().each(function () {
          var e = this.tagName.toLowerCase();
          n(this);
          if (t[e]) {
            var r = $(this),
              i = $(document.createElement(e));
            i.html(r.html()), _.each(t[e], function (e) {
              i.attr(e, r.attr(e))
            }), r.replaceWith(i)
          } else(e !== "font" || !$(this).hasClass("proper-code")) && $(this).contents().first().unwrap()
        })
      }
      var t = {
        p: [],
        ul: [],
        ol: [],
        li: [],
        strong: [],
        code: [],
        em: [],
        b: [],
        i: [],
        a: ["href"]
      };
      $(e).find("script, style").remove();
      var r = "strong, em, b, i, code, a";
      $(e).find(r).each(function () {
        $(this).find(r).each(function () {
          $(this).contents().first().unwrap()
        })
      }), n(e)
    }

    function L(e) {
      $(e).find("b, i, font").each(function () {
        $(this).contents().first().unwrap()
      })
    }

    function A(t) {
      function r(e, t) {
        return !e || e === i ? !1 : e.tagName && e.tagName.toLowerCase() === t ? !0 : r(e.parentNode, t)
      }
      $(t).unbind("paste").unbind("keydown").unbind("keyup").unbind("focus").unbind("blur"), $(t).bind("paste", function () {
        var e = d.strong.isActive() || d.em.isActive() || d.code.isActive(),
          n = S();
        C(function (r) {
          x(n), $(t).focus(), k($(r)), y($(r)), e && L($(r)), document.execCommand("insertHTML", !1, $(r).html())
        })
      }), $(t).bind("keydown", function (t) {
        if (!e.multiline && t.keyCode === 13) {
          t.stopPropagation(), t.preventDefault();
          return
        }
        t.keyCode === 8 && $.trim($(i).text()) === "" && $(i).find("p, li").length === 1 && t.preventDefault();
        if (n) {
          var s = S().startContainer;
          e.multiline && !r(s, "p") && !r(s, "ul") && document.execCommand("insertParagraph", !1, !0), t.keyCode === 13 && !t.shiftKey && window.setTimeout(function () {
            r(s, "ul") || document.execCommand("insertParagraph", !1, !0)
          }, 10)
        }
      }), $(t).bind("focus", E).bind("blur", w).bind("click", b), $(t).bind("keyup", function (e) {
        return b(), h(), setTimeout(function () {
          u || (u = !0, setTimeout(function () {
            u = !1, o.trigger("changed")
          }, 200))
        }, 10), !0
      })
    }

    function O() {
      $(i).attr("contenteditable", "false").unbind("paste").unbind("keydown"), $(".proper-commands").remove(), o.unbind("changed")
    }

    function M(t, n) {
      e = {}, _.extend(e, a, n), O(), $(t).attr("contenteditable", !0), i = t, A(t), e.markup && (s = $(controlsTpl), s.appendTo($(e.controlsTarget)));
      if (e.markup) {
        function r(e) {
          return function (t) {
            t.preventDefault(), l(e)
          }
        }
        $(i).keydown("ctrl+shift+e", r("em")).keydown("ctrl+shift+s", r("strong")).keydown("ctrl+shift+c", r("code")).keydown("ctrl+shift+l", r("link")).keydown("ctrl+shift+b", r("ul")).keydown("ctrl+shift+n", r("ol")).keydown("tab", r("indent")).keydown("shift+tab", r("outdent"))
      }
      $(i).focus(), b(), y($(i));
      try {
        document.execCommand("styleWithCSS", !1, !1)
      } catch (u) {}
      $(".proper-commands a.command").click(function (e) {
        e.preventDefault(), $(i).focus(), l($(e.currentTarget).attr("command")), b(), setTimeout(function () {
          o.trigger("changed")
        }, 10)
      })
    }

    function D() {
      if ($(i).hasClass("empty")) return "";
      if (e.markup) {
        if (!i) return "";
        var t = $(i).clone();
        return g(t), t.html()
      }
      return e.multiline ? $.trim(_.stripTags($(i).html().replace(/<div>/g, "\n").replace(/<\/div>/g, ""))) : $.trim(_.stripTags($(i).html()))
    }
    var i = null,
      s, o = _.extend({}, _.Events),
      u = !1,
      e = {}, a = {
        multiline: !0,
        markup: !0,
        placeholder: "Enter Text",
        codeFontFamily: 'Monaco, Consolas, "Lucida Console", monospace'
      }, f = window.Node || {
        TEXT_NODE: 3,
        COMMENT_NODE: 8
      }, p = $("<span>&nbsp;</span>").text(),
      d = {
        em: {
          isActive: function () {
            return document.queryCommandState("italic", !1, !0)
          },
          toggleOn: function () {
            c(), document.execCommand("italic", !1, !0)
          },
          toggleOff: function () {
            document.execCommand("italic", !1, !0)
          }
        },
        strong: {
          isActive: function () {
            return document.queryCommandState("bold", !1, !0)
          },
          toggleOn: function () {
            c(), document.execCommand("bold", !1, !0)
          },
          toggleOff: function () {
            document.execCommand("bold", !1, !0)
          }
        },
        code: {
          isActive: function () {
            return v(document.queryCommandValue("fontName"), e.codeFontFamily)
          },
          toggleOn: function () {
            c(), document.execCommand("fontName", !1, e.codeFontFamily), h()
          },
          toggleOff: function () {
            var e;
            if (r && (e = S()).collapsed) {
              var t = e.endContainer,
                n = e.endOffset;
              t.data = t.data.slice(0, n) + p + t.data.slice(n);
              var i = document.createRange();
              i.setStart(t, n), i.setEnd(t, n + 1), x(i), document.execCommand("removeFormat", !1, !0)
            } else document.execCommand("removeFormat", !1, !0)
          }
        },
        link: {
          exec: function () {
            c(), document.execCommand("createLink", !1, window.prompt("URL:", "http://"))
          }
        },
        ul: {
          isActive: function () {
            return document.queryCommandState("insertUnorderedList", !1, !0)
          },
          exec: function () {
            document.execCommand("insertUnorderedList", !1, !0)
          }
        },
        ol: {
          isActive: function () {
            return document.queryCommandState("insertOrderedList", !1, !0)
          },
          exec: function () {
            document.execCommand("insertOrderedList", !1, !0)
          }
        },
        indent: {
          exec: function () {
            (document.queryCommandState("insertOrderedList", !1, !0) || document.queryCommandState("insertUnorderedList", !1, !0)) && document.execCommand("indent", !1, !0)
          }
        },
        outdent: {
          exec: function () {
            (document.queryCommandState("insertOrderedList", !1, !0) || document.queryCommandState("insertUnorderedList", !1, !0)) && document.execCommand("outdent", !1, !0)
          }
        }
      };
    return {
      bind: function () {
        o.bind.apply(o, arguments)
      },
      unbind: function () {
        o.unbind.apply(o, arguments)
      },
      trigger: function () {
        o.trigger.apply(o, arguments)
      },
      activate: M,
      deactivate: O,
      content: D,
      exec: l,
      commands: d
    }
  }
}(), app.PaletteConstants = {
  themes: {
    day: {
      titleFontOptions: [{
        text: "AvantGarde Lt It",
        value: "avantGardeLtIt",
        style: {
          "font-family": "avantGardeLtIt"
        }
      }, {
        text: "Helvetica",
        value: "helveticaNeueThin",
        style: {
          "font-family": "helveticaNeueThin"
        }
      }, {
        text: "Engravers",
        value: "engravers",
        style: {
          "font-family": "engravers"
        }
      }, {
        text: "Eagle",
        value: "eagle",
        style: {
          "font-family": "eagle"
        }
      }, {
        text: "Baskerville",
        value: "baskervilleITCIt",
        style: {
          "font-family": "baskervilleITCIt"
        }
      }, {
        text: "Abril",
        value: "Abril Fatface",
        style: {
          "font-family": "Abril Fatface"
        }
      }, {
        text: "Typewriter",
        value: "americanTypewriterLtIt",
        style: {
          "font-family": "americanTypewriterLtIt"
        }
      }, {
        text: "Cutive",
        value: "Cutive Mono",
        style: {
          "font-family": "Cutive Mono"
        }
      }, {
        text: "Fling",
        value: "fling",
        style: {
          "font-family": "fling"
        }
      }],
      titleFontColorOptions: ["#000000", "#4ba63b", "#0195b7", "#B06D25", "#797c7f", "#276adb", "#de1b1e", "#e52e76"],
      authorFontOptions: [{
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
        value: "baskervilleITCIt",
        style: {
          "font-family": "baskervilleITCIt"
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
      }],
      quarktitleFontOptions: [{
        text: "Baskerville",
        value: "baskervilleITCIt",
        style: {
          "font-family": "baskervilleITCIt"
        }
      }, {
        text: "Helvetica",
        value: "helveticaNeueThin",
        style: {
          "font-family": "helveticaNeueThin"
        }
      }, {
        text: "AvantGarde Lt It",
        value: "avantGardeLtIt",
        style: {
          "font-family": "avantGardeLtIt"
        }
      }],
      captionFontOptions: [{
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
        value: "baskervilleITCIt",
        style: {
          "font-family": "baskervilleITCIt"
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
      }],
      textFontOptions: [{
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
    },
    dusk: {
      titleFontOptions: [{
        text: "Din Light",
        value: "dinLtCnd",
        style: {
          "font-family": "dinLtCnd"
        }
      }, {
        text: "Alt Gothic",
        value: "alternateGothic",
        style: {
          "font-family": "alternateGothic"
        }
      }, {
        text: "Novecento",
        value: "novecentoWdDBd",
        style: {
          "font-family": "novecentoWdDBd"
        }
      }, {
        text: "Helserif",
        value: "helserifMd",
        style: {
          "font-family": "helserifMd"
        }
      }, {
        text: "Ostrich",
        value: "ostrichSansBd",
        style: {
          "font-family": "ostrichSansBd"
        }
      }, {
        text: "Blackout",
        value: "blackoutMidnight",
        style: {
          "font-family": "blackoutMidnight"
        }
      }],
      titleFontColorOptions: ["#FFFFFF", "#938E8E", "#F2E409", "#D8F87A", "#99E6E7", "#70BAF1", "#D25036", "#D22983"],
      authorFontOptions: [{
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
      }],
      quarktitleFontOptions: [{
        text: "Francois",
        value: "Francois One",
        style: {
          "font-family": "Francois One"
        }
      }, {
        text: "Alt Gothic",
        value: "alternateGothic",
        style: {
          "font-family": "alternateGothic"
        }
      }, {
        text: "Din Light",
        value: "dinLtCnd",
        style: {
          "font-family": "dinLtCnd"
        }
      }],
      captionFontOptions: [{
        text: "Andada",
        value: "Andada",
        style: {
          "font-family": "Andada"
        }
      }, {
        text: "Helserif",
        value: "helserifMd",
        style: {
          "font-family": "helserifMd"
        }
      }, {
        text: "Francois",
        value: "Francois One",
        style: {
          "font-family": "Francois One"
        }
      }, {
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
      }],
      textFontOptions: [{
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
    }
  }
}, app.components.contentEditable.ContentEditableField = Backbone.View.extend({
  events: {
    blur: function (e) {
      this.trigger("blur", e)
    }
  },
  initialize: function (e) {
    var t = this.$el;
    t.attr("contenteditable", !0), this.attr = e.attr, this.editor = new Proper, this.editor.activate(t, this.getEditorOpts()), t.blur();
    var n = this;
    t.on({
      focus: function () {
        n.hasFocus = !0
      },
      blur: function () {
        n.hasFocus = !1
      }
    });
    var r = _.debounce(this.save.createDelegate(this), 1e3);
    this.editor.bind("changed", r), this.model.on("change:" + this.attr, this.onAttrChange, this)
  },
  onAttrChange: function () {
    if (!this.hasFocus) {
      var e = this.model.get(this.attr);
      this.setValue(e)
    }
  },
  getEditorOpts: function () {
    return {
      markup: !1,
      placeholder: this.$el.attr("data-empty-value")
    }
  },
  setValue: function (e) {
    this.$el.html(jQuery.trim(e))
  },
  getValue: Jux.abstractFn,
  save: function (e) {
    var t = this.getValue(),
      n = this.model.get(this.attr);
    t !== n && (this.model.set(this.attr, t), this.model.save())
  }
}), app.components.contentEditable.MultilineField = app.components.contentEditable.ContentEditableField.extend({
  getEditorOpts: function () {
    var e = app.components.contentEditable.ContentEditableField.prototype.getEditorOpts.apply(this, arguments);
    return e.multiline = !0, e
  },
  getValue: function () {
    var e = this.$el.html().replace(/<\/p>/g, "\n");
    return e = jQuery.trim(Jux.util.Html.stripTags(e)), e
  }
}), app.components.contentEditable.SinglelineField = app.components.contentEditable.ContentEditableField.extend({
  initialize: function (e) {
    app.components.contentEditable.ContentEditableField.prototype.initialize.apply(this, arguments);
    var t = this.$el;
    t.keydown(function (e) {
      e.which === 13 && t.blur()
    })
  },
  getEditorOpts: function () {
    var e = app.components.contentEditable.ContentEditableField.prototype.getEditorOpts.apply(this, arguments);
    return e.multiline = !1, e
  },
  getValue: function () {
    var e = this.$el.html();
    return e = Jux.util.Html.stripTags(e), e = Jux.util.Html.decode(e), e = jQuery.trim(e), e
  }
}), app.components.controls.PictureSelector = Jux.extend(ui.Component, {
  mixins: [ui.DataControl],
  emptyImageUrl: "/assets/jux-media-picker.png",
  initComponent: function () {
    this.addEvents("beforeclick", "picturechange"), this.cls += " juxUI-pictureSelector", this._super(arguments), ui.DataControl.constructor.call(this), this.picture ? this.picture = this.normalizePicture(this.picture) : this.picture = new app.models.PictureWithOptions({
      picture: {
        url: ""
      }
    })
  },
  onRender: function () {
    this._super(arguments), this.$el.bind({
      click: this.onClick.createDelegate(this)
    }), this.mask();
    var e = this.picture.get("url") ? this.buildImageUrl(this.picture.get("url")) : this.emptyImageUrl,
      t = "juxUI-pictureSelector-picture" + (this.picture.get("url") ? "" : " juxUI-pictureSelector-noPictureSelected");
    this.$imageEl = jQuery('<img class="' + t + '" src="' + e + '" alt="" style="width:' + this.width + "px; height:" + this.height + 'px" />').bind({
      load: this.onImageLoadSuccess.createDelegate(this),
      error: this.onImageLoadFailure.createDelegate(this)
    }).appendTo(this.$el)
  },
  setPicture: function (e) {
    e = this.picture = this.normalizePicture(e), this.updatePreviewImage(), this.fireEvent("picturechange", this, e), this.onDataChange()
  },
  getPicture: function () {
    return this.picture
  },
  onClick: function (e) {
    e.preventDefault(), this.fireEvent("beforeclick", this)
  },
  updatePreviewImage: function () {
    if (this.rendered) {
      var e = this.picture.get("url");
      e ? this.showImage(e) : this.showEmptyImage()
    }
  },
  showImage: function (e) {
    this.$imageEl.removeClass("juxUI-pictureSelector-noPictureSelected");
    var t = this.buildImageUrl(e);
    this.$imageEl.attr("src") !== t && (this.mask(), this.$imageEl.attr("src", t))
  },
  showEmptyImage: function () {
    this.$imageEl.addClass("juxUI-pictureSelector-noPictureSelected").attr("src", this.emptyImageUrl)
  },
  onImageLoadSuccess: function () {
    this.unMask()
  },
  onImageLoadFailure: function () {
    this.unMask(), this.showEmptyImage()
  },
  normalizePicture: function (e) {
    return typeof e == "string" ? e = new app.models.PictureWithOptions({
      picture: {
        url: e
      }
    }) : typeof e == "object" && !(e instanceof app.models.PictureWithOptions) && (e = new app.models.PictureWithOptions(e)), e
  },
  buildImageUrl: function (e) {
    var t = this.width + "x" + this.height + "#";
    return Jux.Magickly.convertImagePathOrUri(e, {
      thumb: t
    })
  },
  setData: function () {
    this.setPicture.apply(this, arguments)
  },
  getData: function () {
    return this.getPicture()
  }
}), ui.ComponentManager.registerType("PictureSelector", app.components.controls.PictureSelector), ui.ComponentManager.registerType("ImageSelector", app.components.controls.PictureSelector), app.components.controls.GenreMoodSelector = Jux.extend(ui.Container, {
  initComponent: function () {
    this.setItems(), this._super(arguments), this.genreSelector = this.findById("GenreSelector"), this.genreSelector.on("useritemselect", this.onUserGenreSelect, this), this.moodSelector = this.findById("MoodSelector"), this.moodSelector.on("useritemselect", this.onUserMoodSelect, this)
  },
  setItems: function () {
    this.items = [{
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "20%",
        type: "Label",
        text: "Genre",
        style: {
          "padding-top": "2px"
        }
      }, {
        columnWidth: "80%",
        id: "GenreSelector",
        cls: "genre-selector",
        type: "ItemSelector",
        items: this.generateGenreItems(this.moods_by_genre)
      }]
    }, {
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "20%",
        type: "Label",
        text: "Mood",
        style: {
          "padding-top": "2px"
        }
      }, {
        columnWidth: "80%",
        id: "MoodSelector",
        cls: "mood-selector",
        type: "ItemSelector",
        items: this.generateMoodItems(this.moods_by_genre)
      }]
    }, {
      type: "Section",
      layout: "columns",
      items: [{
        columnWidth: "25%",
        type: "Label",
        text: "Enable Filters",
        style: {
          "padding-top": "7px"
        }
      }, {
        columnWidth: "34%",
        type: "ButtonSet",
        key: "style_filter_enabled",
        style: {
          margin: "0 0 0 8px",
          "padding-top": "2px"
        },
        options: [{
          text: "Enable",
          value: !0
        }, {
          text: "Disable",
          value: !1
        }]
      }]
    }]
  },
  generateMoodItems: function (e) {
    var t = _.uniq(_.flatten(_.map(e, function (e) {
      return e
    })));
    return _.map(t, function (e) {
      return {
        id: "Mood-" + e,
        cls: "mood-selection mood-" + e,
        type: "ItemSelector-MoodItem",
        title: e,
        value: e
      }
    })
  },
  getGenreItemCmp: function (e) {
    return this.findById("Genre-" + e)
  },
  getMoodItemCmp: function (e) {
    return this.findById("Mood-" + e)
  },
  generateGenreItems: function (e) {
    return _.map(e, function (e, t) {
      return {
        title: t,
        id: "Genre-" + t,
        cls: "genre-selection genre-" + t,
        type: "ItemSelector-GenreItem",
        value: t,
        availableMoods: e
      }
    })
  },
  showAvailableMoods: function (e) {
    var t = this.getGenreItemCmp(e),
      n = this.findById("MoodSelector"),
      r = this.findById("GenreSelector"),
      i = n.getItems(),
      s;
    t && (s = t.getAvailableMoods(), _.each(i, function (e) {
      var t = e.getValue(),
        n = _.contains(s, t);
      n ? e.show() : e.hide()
    }))
  },
  selectGenre: function (e) {
    var t = this.findById("GenreSelector");
    t.select(e), this.showAvailableMoods(e), this.setCurrentGenre(e)
  },
  selectMood: function (e) {
    this.setCurrentMood(e), this.moodSelector.deselectAll();
    try {
      this.selectedMoodCmp = this.findById("MoodSelector").select(e)
    } catch (t) {
      Jux.logError(t), Jux.logError("Unable to select mood - " + e)
    }
  },
  onUserGenreSelect: function (e) {
    this.selectGenre(e.getValue()), this.fireEvent("genre-select", this, e, e.getValue())
  },
  onUserMoodSelect: function (e) {
    this.setCurrentMood(e.getValue()), this.fireEvent("mood-select", this, e, e.getValue())
  },
  setCurrentMood: function (e) {
    this.currentMood = e
  },
  setCurrentGenre: function (e) {
    var t = this.getGenreItemCmp(e),
      n = t.getAvailableMoods(),
      r;
    _.contains(n, this.currentMood) || (this.moodSelector.deselectAll(), r = this.getMoodItemCmp(n[0]), r.select(), this.fireEvent("mood-select", this, r, n[0])), this.moodSelector.removeCls("genre-selected-" + this.currentGenre), this.currentGenre = e, this.moodSelector.addCls("genre-selected-" + this.currentGenre)
  }
}), ui.ComponentManager.registerType("GenreMoodSelector", app.components.controls.GenreMoodSelector), app.components.controls.PictureSelectorVideo = Jux.extend(app.components.controls.PictureSelector, {
  emptyImageUrl: "/assets/blank.gif",
  initComponent: function () {
    this._super(arguments), this.removeButton = new ui.toolButtons.DeleteButton({
      cls: "removeButton removeBackgroundButton",
      size: "small",
      handler: this.onRemoveButtonClick,
      scope: this
    }), this.removeButton.setToolTip("Remove")
  },
  onRender: function () {
    this._super(arguments), this.removeButton.render(this.$el)
  },
  onClick: function (e) {
    if (this.removeImage) {
      this.removeImage = !1;
      return
    }
    e.preventDefault(), this.setRemoveButtonVisibility(!0), this.fireEvent("beforeBeforeClickEvt", this), this.fireEvent("beforeclick", this)
  },
  onRemoveButtonClick: function (e) {
    this.removeImage = !0, this.fireEvent("removeButtonClicked", this), this.setRemoveButtonVisibility(!1)
  },
  setRemoveButtonVisibility: function (e) {
    this.removeButton.setVisible(e)
  }
}), ui.ComponentManager.registerType("PictureSelectorVideo", app.components.controls.PictureSelectorVideo), app.components.controls.ToggleItem = Jux.extend(ui.Container, {
  mixins: [ui.DataControl],
  label: "",
  buttons: !0,
  toggled: !1,
  initComponent: function () {
    this.addEvents("change"), this.cls += " toggleItem", this.label = new ui.Label({
      cls: "toggleItem-label",
      text: this.label
    }), this.contentComponent = new ui.Component({
      cls: "toggleItem-content",
      listeners: {
        render: function (e) {
          e.getEl().click(this.toggle.createDelegate(this))
        },
        scope: this
      }
    }), this.buttonSet = new ui.ButtonSet({
      cls: "toggleItem-buttonSet",
      options: [{
        text: "On",
        value: "on"
      }, {
        text: "Off",
        value: "off"
      }],
      value: this.toggled ? "on" : "off",
      listeners: {
        change: function (e, t) {
          this.onChange(t)
        },
        scope: this
      }
    }), this.items = [this.label, {
      type: "Container",
      cls: "toggleItem-contentWrap",
      items: this.contentComponent
    }], this.buttons === !0 && this.items.push(this.buttonSet), app.components.controls.ToggleItem.superclass.initComponent.call(this), ui.DataControl.constructor.call(this)
  },
  afterRender: function () {
    this._super(arguments), this.updateDisplayState()
  },
  toggle: function () {
    this.isToggled() === !0 ? this.setToggled(!1) : this.setToggled(!0)
  },
  setToggled: function (e) {
    this.buttonSet.setValue(e ? "on" : "off")
  },
  isToggled: function () {
    return this.buttonSet.getValue() === "on"
  },
  onChange: function () {
    this.updateDisplayState(), this.fireEvent("change", this.isToggled()), this.onDataChange()
  },
  updateDisplayState: function () {
    if (this.rendered) {
      var e = this.isToggled(),
        t = this.contentComponent;
      e ? (this.removeCls("toggleItemOff").addCls("toggleItemOn"), t.removeCls(this.offCls).addCls(this.onCls)) : (this.removeCls("toggleItemOn").addCls("toggleItemOff"), t.removeCls(this.onCls).addCls(this.offCls))
    }
  },
  setData: function (e) {
    this.setToggled(e)
  },
  getData: function () {
    return this.isToggled()
  }
}), ui.ComponentManager.registerType("ToggleItem", app.components.controls.ToggleItem), app.components.controls.MapsAutocompleteTextField = ui.formFields.TextField.extend({
  bounds: null,
  currentPlace: null,
  autocompleteApplied: !1,
  deferSearchValue: "",
  autocompleteHasSelection: !1,
  initComponent: function () {
    this._super(arguments), this.addEvents("latlngchange"), Jux.Google.isMapsApiLoaded() ? this.onMapsApiLoaded() : (Jux.Google.on("mapsapiload", this.onMapsApiLoaded, this), Jux.Google.loadMapsApi())
  },
  onRender: function () {
    this._super(arguments), this.applyAutocomplete()
  },
  createInputEl: function () {
    var e = this._super(arguments);
    return e.attr("placeholder", this.emptyText), e
  },
  onMapsApiLoaded: function () {
    this.geocoder = new google.maps.Geocoder, this.applyAutocomplete(), this.deferSearchValue && this.doSearch(this.deferSearchValue)
  },
  onKeyDown: function (e) {
    e.which === 13 && (this.autocompleteHasSelection = jQuery("body > .pac-container .pac-selected").length > 0), this._super(arguments)
  },
  onKeyPress: function (e) {
    e.which === 13 && !this.autocompleteHasSelection && this.doSearch(this.getValue()), this._super(arguments)
  },
  applyAutocomplete: function () {
    this.rendered && !this.autocompleteApplied && Jux.Google.isMapsApiLoaded() && (this.autocompleteApplied = !0, this.autocomplete = new google.maps.places.Autocomplete(this.$inputEl[0], {
      bounds: this.bounds
    }), this.autocompletePlaceChangeListener = google.maps.event.addListener(this.autocomplete, "place_changed", this.onPlaceChange.createDelegate(this)))
  },
  doSearch: function (e) {
    Jux.Google.isMapsApiLoaded() ? this.geocoder.geocode({
      address: e
    }, this.onSearchComplete.createDelegate(this)) : this.deferSearchValue = e
  },
  onSearchComplete: function (e, t) {
    t === google.maps.GeocoderStatus.OK && this.onPlaceChange(e[0])
  },
  onPlaceChange: function (e) {
    var t = null;
    e = typeof e != "undefined" ? e : this.autocomplete.getPlace(), this.currentPlace = e, e && (e.formatted_address && this.setValue(e.formatted_address), e.geometry && e.geometry.location && (t = e.geometry.location)), this.fireEvent("latlngchange", this, t)
  },
  getBounds: function () {
    return this.autocomplete ? this.autocomplete.getBounds() || null : null
  },
  setBounds: function (e) {
    this.bounds = e, this.autocomplete && this.autocomplete.setBounds(e)
  },
  getPlace: function () {
    return this.currentPlace
  },
  onDestroy: function () {
    Jux.Google.un("mapsapiload", this.applyAutocomplete, this), this.autocompletePlaceChangeListener && google.maps.event.removeListener(this.autocompletePlaceChangeListener), this._super(arguments)
  }
}), ui.ComponentManager.registerType("mapsautocompletetextfield", app.components.controls.MapsAutocompleteTextField), app.components.controls.colorSets.ColorSetCustomizer = Jux.extend(ui.Container, {
  mixins: [ui.DataControl],
  initComponent: function () {
    if (!Jux.isArray(this.colors)) throw new Error("'colors' config not provided to ColorSetCustomizer, or is not an array.");
    this.addEvents("colorchange"), this.cls += " colorSetCustomizer", this.colorPickers = {};
    var e = this.colors,
      t = [];
    for (var n = 0, r = e.length; n < r; n++) {
      var i = e[n],
        s = i.value,
        o = {
          key: i.name,
          listeners: {
            change: this.onColorChange,
            scope: this
          }
        };
      s && (o.color = s);
      var u = new ui.ColorPicker(o),
        a = new ui.Container({
          cls: "colorSetCustomizer-colorPickerWrapper",
          items: [{
              type: "Label",
              text: i.title
            },
            u
          ]
        });
      t.push(a);
      if ( !! this.colorPickers[i.name]) throw new Error("Error: each 'color' provided to the ColorSetCustomizer must have a unique name. Color '" + i.name + "' already used.");
      this.colorPickers[i.name] = u
    }
    this.items = t, app.components.controls.colorSets.ColorSetCustomizer.superclass.initComponent.call(this), ui.DataControl.constructor.call(this)
  },
  onColorChange: function () {
    this.fireEvent("colorchange", this), this.onDataChange()
  },
  setData: function (e) {
    var t = {}, n = this.colorPickers;
    for (var r in e) e.hasOwnProperty(r) && n[r] && n[r].setColor(e[r]);
    this.onColorChange()
  },
  getData: function () {
    var e = {}, t = this.colorPickers;
    for (var n in t) e[n] = t[n].getColor();
    return e
  }
}), ui.ComponentManager.registerType("ColorSetCustomizer", app.components.controls.colorSets.ColorSetCustomizer), app.components.controls.itemSelector.ItemSelector = Jux.extend(ui.Container, {
  mixins: [ui.DataControl],
  allowReorder: !1,
  defaultType: "ItemSelector-Item",
  initComponent: function () {
    this.addEvents("select", "deselect", "useritemselect"), this.cls += " itemSelector", this.allowReorder && this.plugins.push(new ui.plugins.DragAndDropSort({
      axis: "x"
    })), this._super(arguments), ui.DataControl.call(this), "selected" in this && this.select(this.selected)
  },
  onAdd: function (e) {
    this._super(arguments), e.addListener("click", this.onItemClick, this)
  },
  onRemove: function (e) {
    e.removeListener("click", this.onItemClick, this), this._super(arguments)
  },
  onItemClick: function (e) {
    this.select(e), this.fireEvent("useritemselect", this.getSelected())
  },
  select: function (e) {
    var t = app.components.controls.itemSelector.Item;
    if (!(e instanceof t)) {
      var n = e;
      e = this.getItemByValue(n)
    }
    if (!this.has(e)) throw new Error("Error: Attempted to select item that doesn't exist within ItemSelector " + n);
    this.deselectAll(), e.select(), this.onSelect(e), this.fireEvent("select", this, e)
  },
  selectItemAt: function (e) {
    var t = this.getItemAt(e);
    t && this.select(t)
  },
  onSelect: function (e) {
    this.onDataChange()
  },
  deselect: function (e) {
    e.isSelected() && (e.deselect(), this.onDeselect(e), this.fireEvent("deselect", this, e))
  },
  onDeselect: Jux.emptyFn,
  deselectAll: function () {
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++) this.deselect(e[t])
  },
  getSelected: function () {
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++)
      if (e[t].isSelected()) return e[t];
    return null
  },
  getValue: function () {
    var e = this.getSelected();
    return e ? e.getValue() : null
  },
  setValue: function (e) {
    this.select(e)
  },
  hasValue: function (e) {
    return !!this.getItemByValue(e)
  },
  getItemByValue: function (e) {
    var t = this.getItems();
    for (var n = 0, r = t.length; n < r; n++)
      if (t[n].getValue() === e) return t[n];
    return null
  },
  scrollToItem: function (e) {
    if (this.rendered && this.has(e)) {
      var t = this.$el,
        n = e.getEl().position();
      t.scrollTop(n.top), t.scrollLeft(n.left)
    }
  },
  setData: function () {
    this.setValue.apply(this, arguments)
  },
  getData: function () {
    return this.getValue()
  }
}), ui.ComponentManager.registerType("ItemSelector", app.components.controls.itemSelector.ItemSelector), app.components.controls.itemSelector.Item = ui.Component.extend({
  selected: !1,
  selectedCls: "itemSelector-itemSelected",
  hasTitle: !1,
  initComponent: function () {
    this.addEvents("click"), this.cls += " itemSelector-item ui-corner-all", this._super(arguments)
  },
  onRender: function () {
    this._super(arguments), this.$el.click(this.onClick.createDelegate(this)), this.selected && this.select(), this.renderTitle()
  },
  onClick: function (e) {
    this.fireEvent("click", this)
  },
  setValue: function (e) {
    this.value = e
  },
  getValue: function () {
    return this.value
  },
  select: function () {
    this.selected = !0, this.rendered && this.$el.addClass(this.selectedCls)
  },
  getTitle: function () {
    return this.title
  },
  setTitle: function (e) {
    this.title = e
  },
  renderTitle: function () {
    this.rendered && this.hasTitle && this.getTextEl().text(this.getTitle())
  },
  getTextEl: function () {
    return this.$el
  },
  deselect: function () {
    this.selected = !1, this.rendered && this.$el.removeClass(this.selectedCls)
  },
  isSelected: function () {
    return this.selected
  }
}), ui.ComponentManager.registerType("ItemSelector-Item", app.components.controls.itemSelector.Item), app.components.controls.itemSelector.GenreItem = app.components.controls.itemSelector.Item.extend({
  availableMoods: [],
  getAvailableMoods: function () {
    return this.availableMoods
  }
}), ui.ComponentManager.registerType("ItemSelector-GenreItem", app.components.controls.itemSelector.GenreItem), app.components.controls.itemSelector.ModelItem = app.components.controls.itemSelector.Item.extend({
  initComponent: function () {
    if (!this.tpl) throw new Error("'tpl' config required");
    this._super(arguments);
    if (this.model) {
      var e = this.model;
      delete this.model, this.setModel(e)
    }
  },
  onRender: function () {
    this._super(arguments), this.$itemInner = jQuery('<div class="itemSelector-item-inner"></div>').appendTo(this.$el), this.renderTemplate()
  },
  setModel: function (e) {
    var t = this.onModelChange,
      n = this.model;
    n && n.un("change", t, this), this.model = e, e.on("change", t, this), this.renderTemplate()
  },
  getModel: function () {
    return this.model
  },
  setValue: function (e) {
    this.setModel(e)
  },
  getValue: function () {
    return this.getModel()
  },
  onModelChange: function () {
    this.renderTemplate()
  },
  renderTemplate: function () {
    if (this.rendered) {
      var e = Jux.Util.tmpl(this.tpl, {
        model: this.model
      });
      this.$itemInner.html(e)
    }
  },
  onDestroy: function () {
    this.model && this.model.un("change", this.onModelChange, this), this._super(arguments)
  }
}), ui.ComponentManager.registerType("ItemSelector-ModelItem", app.components.controls.itemSelector.ModelItem), app.components.controls.itemSelector.MoodItem = app.components.controls.itemSelector.Item.extend({
  hasTitle: !0,
  onRender: function () {
    this.$textTarget = $('<div class="mood-text"></div>'), this.$el.append(this.$textTarget), this._super(arguments)
  },
  getTitle: function () {
    return this.value
  },
  getTextEl: function () {
    return this.$textTarget
  }
}), ui.ComponentManager.registerType("ItemSelector-MoodItem", app.components.controls.itemSelector.MoodItem), app.components.controls.fonts.FontCustomizer = Jux.extend(ui.Container, {
  mixins: [ui.DataControl],
  minSize: 0,
  maxSize: 100,
  step: 1,
  color: "#000000",
  hideFontSizeSlider: !1,
  hideColorPicker: !1,
  colorOptions: [],
  initComponent: function () {
    this.colorOptions.length > 0 && (this.hideColorPicker = !0), this.hideColorPicker || (this.colorOptions = []), this.cls += " fontCustomizer";
    var e = app.components.controls.fonts,
      t = 0,
      n = 0,
      r = 0;
    this.hideFontSizeSlider && this.hideColorPicker ? t = 100 : this.hideFontSizeSlider && !this.hideColorPicker ? (t = 80, r = 20) : !this.hideFontSizeSlider && this.hideColorPicker ? (t = 55, n = 45) : (t = 45, n = 35.5, r = 19.5), this.label = new ui.Label({
      cls: "fontCustomizer-label",
      text: this.label
    }), this.fontFaceDropdown = new e.FontFaceDropdown({
      columnWidth: t + "%",
      options: this.fontFaceOptions,
      listeners: {
        change: function () {
          this.onDataChange()
        },
        scope: this
      }
    });
    var i = [this.fontFaceDropdown];
    this.fontSizeSlider = new e.FontSizeSlider({
      columnWidth: n + "%",
      minSize: this.minSize,
      maxSize: this.maxSize,
      step: this.step,
      listeners: {
        change: function () {
          this.onDataChange()
        },
        scope: this
      }
    }), this.hideFontSizeSlider || i.push(this.fontSizeSlider), this.hideColorPicker || (this.colorPicker = new ui.ColorPicker({
      columnWidth: r + "%",
      color: this.color,
      listeners: {
        change: function () {
          this.onDataChange()
        },
        scope: this
      }
    }), i.push({
      items: this.colorPicker
    })), this.colorOptions.length > 0 && (this.colorSwatchSelector = new app.components.controls.itemSelector.ItemSelector({
      items: this.createColorOptionItems(this.colorOptions),
      listeners: {
        select: function () {
          this.onDataChange()
        },
        scope: this
      }
    }), i.push(this.colorSwatchSelector)), this.items = [this.label, {
      layout: "columns",
      items: i
    }], this._super(arguments), ui.DataControl.constructor.call(this)
  },
  setMaxSize: function (e) {
    this.maxSize = e, this.fontSizeSlider.setMaxSize(e)
  },
  createColorOptionItems: function (e) {
    var t = e.length,
      n = [];
    for (var r = 0; r < t; r++) n.push({
      cls: "colorSwatchIcon",
      columnWidth: 100 / t + "%",
      style: {
        background: e[r]
      },
      value: e[r]
    });
    return n
  },
  setLabel: function (e) {
    this.label.setText(e)
  },
  setFontOptions: function (e) {
    this.fontFaceDropdown.setOptions(e)
  },
  setColorOptions: function (e) {
    var t = this.colorSwatchSelector,
      n = t.getValue();
    t.removeAll(), t.add(this.createColorOptionItems(e));
    if (t.hasValue(n)) t.setValue(n);
    else {
      var r = t.getItemAt(0);
      r && t.setValue(r.getValue())
    }
  },
  setColor: function (e) {
    this.colorSwatchSelector && this.colorSwatchSelector.setData(e), this.colorPicker && this.colorPicker.setColor(e)
  },
  getColor: function () {
    if (this.colorSwatchSelector) return this.colorSwatchSelector.getData();
    if (this.colorPicker) return this.colorPicker.getColor()
  },
  setData: function (e) {
    this.fontFaceDropdown.setValue(e.family), this.fontSizeSlider.setValue(e.size), this.setColor(e.color)
  },
  getData: function () {
    return {
      family: this.fontFaceDropdown.getValue(),
      size: this.fontSizeSlider.getValue(),
      color: this.getColor()
    }
  }
}), ui.ComponentManager.registerType("FontCustomizer", app.components.controls.fonts.FontCustomizer), app.components.controls.fonts.FontFaceDropdown = Jux.extend(ui.formFields.DropdownField, {
  menuCollisionStrategy: "fit",
  initComponent: function () {
    this.cls += " fontFaceDropdown", this.options || (this.options = [{
      text: "Didot",
      value: "didotHeadline",
      style: {
        "font-family": "didotHeadline"
      }
    }, {
      text: "Baskerville",
      value: "baskervilleITCIt",
      style: {
        "font-family": "baskervilleITCIt"
      }
    }, {
      text: "Helserif",
      value: "helserifMd",
      style: {
        "font-family": "helserifMd"
      }
    }, {
      text: "Bevan",
      value: "Bevan",
      style: {
        "font-family": "Bevan"
      }
    }, {
      text: "Ultra",
      value: "Ultra",
      style: {
        "font-family": "Ultra"
      }
    }, {
      text: "Raleway",
      value: "Raleway",
      style: {
        "font-family": "Raleway"
      }
    }, {
      text: "Muli",
      value: "Muli",
      style: {
        "font-family": "Muli"
      }
    }, {
      text: "Gothic",
      value: "alternateGothic",
      style: {
        "font-family": "alternateGothic"
      }
    }, {
      text: "Francois",
      value: "Francois One",
      style: {
        "font-family": "Francois One"
      }
    }, {
      text: "Helvetica",
      value: "helveticaNeueHvy",
      style: {
        "font-family": "helveticaNeueHvy"
      }
    }, {
      text: "Typewriter",
      value: "americanTypewriterLtIt",
      style: {
        "font-family": "americanTypewriterLtIt"
      }
    }, {
      text: "Amatic",
      value: "Amatic SC",
      style: {
        "font-family": "Amatic SC"
      }
    }, {
      text: "Fling",
      value: "Fling",
      style: {
        "font-family": "Fling"
      }
    }, {
      text: "Aurore",
      value: "La Belle Aurore",
      style: {
        "font-family": "La Belle Aurore"
      }
    }, {
      text: "Blackout",
      value: "blackoutMidnight",
      style: {
        "font-family": "blackoutMidnight"
      }
    }]), this.value && (this.value = this.normalizeValue(this.value)), app.components.controls.fonts.FontFaceDropdown.superclass.initComponent.call(this)
  },
  onRender: function () {
    app.components.controls.fonts.FontFaceDropdown.superclass.onRender.apply(this, arguments), this.loadFonts()
  },
  onOptionsChange: function () {
    this._super(arguments), this.loadFonts()
  },
  loadFonts: function () {
    var e = _.map(this.getOptions(), function (e) {
      return e.value
    });
    Jux.FontLoader.load(e)
  },
  setValue: function (e) {
    e = this.normalizeValue(e), Jux.FontLoader.load(e), app.components.controls.fonts.FontFaceDropdown.superclass.setValue.call(this, e)
  },
  normalizeValue: function (e) {
    return e.replace(/['"]/g, "").split(",")[0]
  }
}), ui.ComponentManager.registerType("FontFaceDropdown", app.components.controls.fonts.FontFaceDropdown), ui.ComponentManager.registerType("FontFamilyDropdown", app.components.controls.fonts.FontFaceDropdown), app.components.controls.fonts.FontSizeSlider = Jux.extend(ui.Container, {
  minSize: 0,
  maxSize: 100,
  step: 1,
  initComponent: function () {
    this.addEvents("change"), this.cls += " fontSizeSlider", this.fontSizeLabel = new ui.Label({
      hidden: !0,
      cls: "fontSizeSlider-fontSizeLabel",
      text: "px"
    }), this.slider = new ui.Slider({
      min: this.minSize,
      max: this.maxSize,
      step: this.step,
      listeners: {
        render: function (e) {
          this.updateFontSizeLabel()
        },
        change: function (e, t) {
          this.onSliderChange(t)
        },
        scope: this
      }
    }), this.items = [{
        layout: "columns",
        items: [{
            columnWidth: "50%",
            type: "Label",
            cls: "fontSizeSlider-fontSizeTitle",
            text: "Size"
          },
          Jux.apply(this.fontSizeLabel, {
            columnWidth: "50%"
          })
        ]
      },
      this.slider
    ], app.components.controls.fonts.FontSizeSlider.superclass.initComponent.call(this)
  },
  setMaxSize: function (e) {
    this.maxSize = e, this.slider.setMaxSize(e)
  },
  onSliderChange: function (e) {
    this.updateFontSizeLabel(), this.fireEvent("change", this.slider, e)
  },
  updateFontSizeLabel: function () {
    this.fontSizeLabel.setText(this.getValue() + "px")
  },
  setValue: function (e) {
    this.slider.setHandlePositions([e])
  },
  getValue: function () {
    return this.slider.getHandlePositions()[0]
  }
}), ui.ComponentManager.registerType("FontSizeSlider", app.components.controls.fonts.FontSizeSlider), app.components.controls.listEditor.ListEditor = Jux.extend(ui.Container, {
  mixins: [ui.DataControl],
  showItemNumbers: !0,
  itemNumberOrdering: "up",
  preventLastItemRemove: !1,
  defaultType: "ListEditorItem",
  initComponent: function () {
    this.addEvents("change", "beforeeditbegin", "editbegin", "editcomplete"), this.cls += " listEditor";
    if (this.itemNumberOrdering !== "up" && this.itemNumberOrdering !== "down") throw new Error("ListEditor: itemNumberOrdering config must either be the string 'up' or 'down'.");
    this.addButton = new ui.Button({
      text: '<span class="buttonPrefix">+</span> &nbsp;Add item',
      listeners: {
        click: this.onAddButtonClick,
        scope: this
      }
    }), this.plugins.push(new ui.plugins.DragAndDropSort), this._super(arguments), ui.DataControl.constructor.call(this)
  },
  onRender: function () {
    this._super(arguments), this.$el.append('<div class="dialog-section-content" /><div class="dialog-section-buttonContainer" style="margin-top: 8px;" />'), this.$listItemsEl = this.$el.find("div.dialog-section-content");
    var e = this.$el.find("div.dialog-section-buttonContainer");
    this.addButton.render(e)
  },
  getContentTarget: function () {
    return this.$listItemsEl
  },
  createComponent: function (e) {
    return Jux.apply(e, {
      displayTpl: this.itemDisplayTpl,
      editor: this.itemEditor,
      showItemNumber: this.showItemNumbers
    }), this._super(arguments)
  },
  onAdd: function (e, t) {
    this._super(arguments);
    if (this.preventLastItemRemove === !0) {
      var n = this.getItems(),
        r = n.length;
      r === 1 ? n[0].hideRemoveButton() : r === 2 && n[Math.abs(t - 1)].showRemoveButton()
    }
    e.addListener({
      displaymodeclick: this.editItem,
      removeclick: this.remove,
      scope: this
    });
    var i = e.getDataControls();
    for (var s = 0, o = i.length; s < o; s++) i[s].addListener("datachange", this.onChange, this);
    this.onDataChange()
  },
  onLayout: function () {
    this._super(arguments), this.updateItemNumbers()
  },
  onReorder: function (e, t, n) {
    this._super(arguments), this.onDataChange()
  },
  onRemove: function (e, t) {
    this._super(arguments);
    if (this.preventLastItemRemove === !0) {
      var n = this.getItems();
      n.length === 1 && n[0].hideRemoveButton()
    }
    e.inEditMode() && this.getItems().length > 0 && this.editItem(Math.max(t - 1, 0)), this.onDataChange()
  },
  getItemEditor: function () {
    return this.itemEditor
  },
  onAddButtonClick: function () {
    var e = this.add({});
    this.editItem(e)
  },
  onChange: function (e) {
    var t = this.getEditedItem();
    this.fireEvent("change", this, t, t.getData()), this.onDataChange()
  },
  displayAll: function () {
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++) this.displayItem(e[t])
  },
  displayItem: function (e) {
    typeof e == "number" && (e = this.getItemAt(e)), e.inEditMode() && (e.setDisplayMode(), this.fireEvent("editcomplete", this, e, this.getItemIndex(e)))
  },
  editItem: function (e) {
    typeof e == "number" && (e = this.getItemAt(e));
    var t = this.getItemIndex(e);
    if (this.fireEvent("beforeeditbegin", this, e, t) !== !1) {
      var n = this.getEditedItem();
      n && this.displayItem(n), e.setEditMode(), this.fireEvent("editbegin", this, e, t)
    }
  },
  getEditedItem: function () {
    var e = this.getEditedItemIndex();
    return e !== -1 ? this.getItems()[e] : null
  },
  getEditedItemIndex: function () {
    var e = this.getItems();
    for (var t = 0, n = e.length; t < n; t++)
      if (e[t].inEditMode()) return t;
    return -1
  },
  moveItemUp: function (e) {
    var t = this.getItems(),
      n = -1;
    for (var r = 0, i = t.length; r < i; r++)
      if (t[r] === e) {
        n = r;
        break
      }
    n > 0 && this.insert(e, n - 1)
  },
  moveItemDown: function (e) {
    var t = this.getItems(),
      n = -1;
    for (var r = 0, i = t.length; r < i; r++)
      if (t[r] === e) {
        n = r;
        break
      }
    n !== -1 && n < t.length - 1 && this.insert(e, n + 1)
  },
  setItemNumberOrdering: function (e) {
    if (e !== "up" && e !== "down") throw new Error("ListEditor: itemNumberOrdering argument to setItemNumberOrdering() must either be the string 'up' or 'down'.");
    this.itemNumberOrdering = e, this.updateItemNumbers()
  },
  updateItemNumbers: function () {
    var e = this.getItems(),
      t = this.itemNumberOrdering;
    for (var n = 0, r = e.length; n < r; n++) {
      var i = t === "up" ? n + 1 : r - n;
      e[n].setItemNumber(i)
    }
  },
  getData: function () {
    var e = [],
      t = this.getItems();
    for (var n = 0, r = t.length; n < r; n++) e.push(t[n].getData());
    return e
  },
  setData: function (e) {
    this.removeAll();
    var t = [];
    for (var n = 0, r = e.length; n < r; n++) t.push({
      data: e[n]
    });
    this.add(t)
  }
}), ui.ComponentManager.registerType("List", app.components.controls.listEditor.ListEditor), ui.ComponentManager.registerType("ListEditor", app.components.controls.listEditor.ListEditor), app.components.controls.listEditor.ListEditorItem = Jux.extend(ui.Container, {
  showItemNumber: !0,
  isEditing: !1,
  renderTpl: ['<table border="0" width="100%" align="center" cellspacing="0" cellpadding="0">', "<tbody>", "<tr>", '<% if( showItemNumber ) { %><td class="listEditorItem-number" width="3%"></td><% } %>', '<td class="listEditorItem-content" width="95%"></td>', '<td class="listEditorItem-actions" width="2%" nowrap></td>', "</tr>", "</tbody>", "</table>"].join(""),
  initComponent: function () {
    this.addEvents("displaymodeclick", "removeclick"), this.cls += " listEditor-listEditorItem", this.displayTpl = this.displayTpl || "No 'displayTpl' config specified.", this.itemNumberLabel = new ui.Label, this.displayComponent = new ui.Component({
      cls: "listEditorItemDisplayMode",
      listeners: {
        render: function (e) {
          e.getEl().bind({
            click: this.onDisplayModeClick.createDelegate(this),
            mousedown: function (e) {
              e.stopPropagation()
            },
            mouseup: function (
              e) {
              e.stopPropagation()
            }
          })
        },
        scope: this
      }
    }), this.editorContainer = new ui.Container({
      cls: "listEditorItemEditMode"
    }), this.removeButton = new ui.toolButtons.DeleteButton({
      size: "tiny",
      cls: "listEditor-removeButton",
      handler: this.onRemoveClick,
      scope: this
    });
    var e = {
      layout: {
        type: "cards"
      },
      items: [this.displayComponent, this.editorContainer]
    };
    Jux.apply(this, e), this._super(arguments), this.editorContainer.add(this.editor), this.data && this.setData(this.data)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el,
      t = app.components.controls.listEditor.ListEditorItem.prototype.renderTpl,
      n = Jux.Util.tmpl(t, {
        showItemNumber: !! this.showItemNumber
      });
    e.append(n);
    var r = e.find("td.listEditorItem-number");
    r.length > 0 && this.itemNumberLabel.render(r), this.$contentEl = e.find("td.listEditorItem-content");
    var i = e.find("td.listEditorItem-actions");
    this.removeButton.render(i), jQuery('<span class="ui-icon jux-icon-arrow-ltgray-n-s" />').appendTo(i), this.isEditing ? this.setEditMode() : this.setDisplayMode()
  },
  setItemNumber: function (e) {
    this.itemNumberLabel.setText(e)
  },
  hideRemoveButton: function () {
    this.removeButton.hide()
  },
  showRemoveButton: function () {
    this.removeButton.show()
  },
  setDisplayMode: function () {
    this.isEditing = !1;
    if (this.rendered) {
      var e = Jux.Util.tmpl(this.displayTpl, this.editorContainer.getData());
      this.displayComponent.update(e), this.layout.setActiveItem(this.displayComponent)
    }
  },
  setEditMode: function () {
    this.isEditing = !0, this.rendered && this.layout.setActiveItem(this.editorContainer)
  },
  inEditMode: function () {
    return this.isEditing
  },
  onDisplayModeClick: function (e) {
    this.fireEvent("displaymodeclick", this)
  },
  onRemoveClick: function () {
    this.fireEvent("removeclick", this)
  },
  getContentTarget: function () {
    return this.$contentEl
  }
}), ui.ComponentManager.registerType("ListEditorItem", app.components.controls.listEditor.ListEditorItem), app.components.mediaPicker.MediaPicker = Jux.extend(ui.Container, {
  media: null,
  initComponent: function () {
    this.addEvents("mediachange"), this.cls += " mediaPicker", this.picturePicker = new app.components.mediaPicker.picturePicker.PicturePicker({
      mediaPicker: this,
      user: this.user,
      listeners: {
        pictureselect: this.onPictureSelect,
        scope: this
      }
    });
    var e = {
      items: [this.picturePicker]
    };
    Jux.apply(this, e), this._super(arguments)
  },
  setMedia: function (e) {
    this.setSelectedMedia(e), e instanceof app.models.PictureWithOptions && this.picturePicker.setPicture(e)
  },
  getMedia: function () {
    return this.media
  },
  bringMediaToTop: function (e) {
    e instanceof app.models.PictureWithOptions && this.picturePicker.bringToTop(e)
  },
  onPictureSelect: function (e, t) {
    this.setSelectedMedia(t), this.onMediaChange()
  },
  onVideoSelect: function (e, t) {
    this.setSelectedMedia(t), this.onMediaChange()
  },
  onMediaChange: function () {
    this.fireEvent("mediachange", this, this.getMedia())
  },
  setSelectedMedia: function (e) {
    this.media && this.media.removeListener("change", this.onMediaChange, this), this.media = e, e.addListener("change", this.onMediaChange, this)
  }
}), app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer = Jux.extend(ui.Container, {
  emptyText: "",
  emptyCssClass: "thumbnailsContainer-noThumbnails",
  clickToSelect: !0,
  multiSelect: !1,
  defaultType: "PicturePicker-Item",
  initComponent: function () {
    this.addEvents("mediaselect", "mediadeselect"), this.cls += " mediaGallery", this._super(arguments)
  },
  onRender: function () {
    this._super(arguments), this.$emptyTextEl = jQuery('<div class="mediaGallery-emptyText">' + this.emptyText + "</div>"), this.updateEmptyState()
  },
  onAdd: function (e, t) {
    this.updateEmptyState(), this.clickToSelect && e.addListener({
      click: this.handleClickToSelect,
      scope: this
    }), this._super(arguments)
  },
  onRemove: function (e, t) {
    this.updateEmptyState(), this.clickToSelect && e.removeListener("click", this.handleClickToSelect, this), this._super(arguments)
  },
  setEmptyText: function (e) {
    this.rendered ? this.$emptyTextEl.html(e) : this.emptyText = e
  },
  updateEmptyState: function () {
    if (this.rendered) {
      var e = this.getItems().length > 0;
      e ? this.$emptyTextEl.detach() : this.$el.append(this.$emptyTextEl), this.$el.toggleClass(this.emptyCssClass, !e)
    }
  },
  getItem: function (e) {
    var t;
    e instanceof app.components.mediaPicker.thumbnailsContainer.Thumbnail || e instanceof app.models.MediaWithOptions ? t = e.getComparator() : t = e;
    var n = this.getItems();
    for (var r = 0, i = n.length; r < i; r++)
      if (n[r].getComparator() === t) return n[r];
    return null
  },
  has: function (e) {
    return !!this.getItem(e)
  },
  selectMedia: function (e) {
    var t;
    e instanceof app.models.MediaWithOptions && (t = e), e = this.getItem(e), e && t && e.getMedia() !== t && e.setMedia(t);
    if (!this.multiSelect) {
      var n = this.getSelectedItems()[0];
      n && n !== e && this.deSelectMedia(n)
    }
    e && !e.isHighlighted() && (e.highlight(), this.fireEvent("mediaselect", this, e))
  },
  deSelectMedia: function (e) {
    e = this.getItem(e), e && e.isHighlighted() && (e.unHighlight(), this.fireEvent("mediadeselect", this, e))
  },
  getSelectedItems: function () {
    var e = this.getItems(),
      t = [];
    for (var n = 0, r = e.length; n < r; n++) e[n].isHighlighted() && t.push(e[n]);
    return t
  },
  getSelectedMedia: function () {
    var e = this.getSelectedItems(),
      t = [];
    for (var n = 0, r = e.length; n < r; n++) t.push(e[n].getMedia());
    return t
  },
  handleClickToSelect: function (e) {
    var t = e.getMedia();
    this.multiSelect ? t.isHighlighted() ? this.deSelectMedia(t) : this.selectMedia(t) : this.selectMedia(t)
  },
  bringToFront: function (e) {
    e = this.getItem(e), e && this.insert(e, 0)
  },
  remove: function (e, t) {
    e = this.getItem(e), this._super([e, t])
  },
  removeAll: function () {
    this._super(arguments), this.updateEmptyState()
  },
  onDestroy: function () {
    this.rendered && this.$emptyTextEl.remove(), this._super(arguments)
  }
}), app.components.mediaPicker.thumbnailsContainer.Thumbnail = Jux.extend(ui.Component, {
  width: 116,
  height: 87,
  tooltip: "",
  buttonAlign: "tr",
  highlighted: !1,
  highlightCls: "highlighted",
  initComponent: function () {
    this.addEvents("click"), this.cls += " mediaGallery-item", this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$el;
    this.highlighted && e.addClass(this.highlightCls), e.bind({
      click: this.onClick.createDelegate(this),
      mouseenter: this.onMouseEnter.createDelegate(this),
      mouseleave: this.onMouseLeave.createDelegate(this)
    });
    var t = "";
    if (this.buttons) {
      var n = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };
      switch (this.buttonAlign.charAt(0)) {
      case "t":
        n.top = "8px";
        break;
      case "b":
        n.bottom = "6px"
      }
      switch (this.buttonAlign.charAt(1)) {
      case "l":
        n.left = "6px";
        break;
      case "c":
        n.width = "100%";
        break;
      case "r":
        n.right = "6px"
      }
      t = Jux.Css.hashToString(n)
    }
    var r = Jux.Util.tmpl(app.components.mediaPicker.thumbnailsContainer.Thumbnail.renderTpl, {
      tooltip: this.tooltip,
      buttons: this.buttons,
      buttonsStyle: t
    });
    e.append(r), this.$innerEl = e.find("div.mediaGallery-item-inner")
  },
  afterRender: function () {
    var e = this.$el.find("div.mediaGallery-item-buttons");
    if (this.buttons) {
      var t = Jux.isArray(this.buttons) ? this.buttons : [this.buttons];
      for (var n = 0, r = t.length; n < r; n++) {
        var i = ui.ComponentManager.create(t[n]);
        i.render(e)
      }
    }
  },
  onClick: function (e) {
    this.fireEvent("click", this)
  },
  onMouseEnter: function (e) {
    this.$innerEl.addClass("gallery-item-hover")
  },
  onMouseLeave: function (e) {
    this.$innerEl.removeClass("gallery-item-hover")
  },
  highlight: function () {
    this.highlighted = !0, this.rendered && this.$el.addClass(this.highlightCls)
  },
  unHighlight: function () {
    this.highlighted = !1, this.rendered && this.$el.removeClass(this.highlightCls)
  },
  isHighlighted: function () {
    return this.highlighted
  },
  setMedia: Jux.abstractFn,
  getMedia: Jux.abstractFn,
  getComparator: function () {
    return this.getMedia().getComparator()
  }
}), Jux.apply(app.components.mediaPicker.thumbnailsContainer.Thumbnail, {
  renderTpl: ['<div class="mediaGallery-item-inner ui-corner-all" tooltip="<%= tooltip %>">', "<% if( buttons ) { %>", '<div class="mediaGallery-item-buttons" style="<%= buttonsStyle %>></div>', "<% } %>", "</div>"].join("")
}), app.components.mediaPicker.thumbnailsContainer.PictureThumbnail = Jux.extend(app.components.mediaPicker.thumbnailsContainer.Thumbnail, {
  deferredLoad: !1,
  loadingImageSrc: Jux.Cdn.BASE_URI + "assets/spinner2e2d2d.gif",
  loadingIndicator: !1,
  loadingText: "Loading...",
  errorText: "Error loading media.",
  progressIndicator: !1,
  loaded: !1,
  cropBoxShown: !1,
  initComponent: function () {
    this.addEvents("loadsuccess", "loadfailure", "click"), this.picture && this.picture.on("change", this.onPictureChange, this), this.imageState = "initialized", this.loadingIndicator || (this.hidden = !0), this._super(arguments)
  },
  onRender: function () {
    this._super(arguments);
    var e = this.$innerEl,
      t = Jux.Util.tmpl(app.components.mediaPicker.thumbnailsContainer.PictureThumbnail.renderTpl, {
        loadingIndicator: this.loadingIndicator,
        loadingImageSrc: this.loadingImageSrc,
        loadingText: this.loadingText,
        progressIndicator: this.progressIndicator
      });
    e.append(t), this.$imgWrapEl = e.find("div.mediaGallery-item-imgWrap"), this.$loadingEl = e.find("div.mediaGallery-item-loading"), this.$progressEl = e.find("div.mediaGallery-item-progress"), this.$imgWrapEl.on({
      mousedown: this.onCropBoxDragStart.createDelegate(this)
    }), jQuery(document).on({
      mousemove: this.onCropBoxDragMove.createDelegate(this),
      mouseup: this.onCropBoxDragEnd.createDelegate(this)
    });
    var n = this.$imgWrapEl;
    this.$cropBox = n.find("div.mediaGallery-item-cropBox"), this.$cropBoxTopMask = n.find("div.mediaGallery-item-cropBoxMaskTop"), this.$cropBoxRightMask = n.find("div.mediaGallery-item-cropBoxMaskRight"), this.$cropBoxBottomMask = n.find("div.mediaGallery-item-cropBoxMaskBottom"), this.$cropBoxLeftMask = n.find("div.mediaGallery-item-cropBoxMaskLeft"), this.$imageEl = jQuery('<img class="mediaGallery-item-img" />').bind({
      load: this.onLoadSuccess.createDelegate(this),
      error: this.onLoadFailure.createDelegate(this)
    }), this.deferredLoad || this.load()
  },
  onShow: function () {
    this._super(arguments), this.isHighlighted() && this.imageState === "success" && this.showCropBox()
  },
  load: function () {
    var e = this.picture.getThumbUrl(this.width, this.height);
    e !== this.currentImgSrc && (this.imageState = "loading", this.$innerEl.removeClass("cursor"), this.$imageEl.attr("src", e), this.currentImgSrc = e)
  },
  onLoadSuccess: function () {
    this.loadingIndicator ? this.$loadingEl.remove() : this.show(), this.$imageEl.appendTo(this.$imgWrapEl), this.$innerEl.addClass("cursor"), this.isHighlighted() && this.showCropBox(), this.loaded = !0, this.imageState = "success", this.fireEvent("loadsuccess", this)
  },
  onLoadFailure: function () {
    this.loadingIndicator ? this.$loadingEl.remove() : this.show(), this.$innerEl.append('<div class="mediaGallery-item-error">' + this.errorText + "</div>"), this.hideCropBox(), this.loaded = !0, this.imageState = "error", this.fireEvent("loadfailure", this)
  },
  onClick: function (e) {
    this.loaded && this.imageState === "success" && this.fireEvent("click", this)
  },
  getNormalizedMousePos: function (e) {
    var t = this.$imgWrapEl.offset();
    return {
      x: e.pageX - t.left,
      y: e.pageY - t.top
    }
  },
  pixelOffsetToPercent: function (e, t) {
    var n = this.$imgWrapEl;
    return {
      x: e * (100 / n.width()),
      y: t * (100 / n.height())
    }
  },
  getNewChosenCenterByOffset: function (e, t, n) {
    var r = this.getNormalizedMousePos(n),
      i = r.x - e.x,
      s = r.y - e.y,
      o = this.pixelOffsetToPercent(i, s),
      u = t.x + o.x,
      a = t.y + o.y;
    return {
      x: u,
      y: a
    }
  },
  onCropBoxDragStart: function (e) {
    return this.isHighlighted() && (this.dragging = !0, this.dragStartMousePos = this.getNormalizedMousePos(e), this.origChosenCenter = this.picture.get("chosen_center") || {
      x: 50,
      y: 50
    }, this.isMove = !1), !1
  },
  onCropBoxDragMove: function (e) {
    if (this.dragging) {
      this.isMove = !0;
      var t = this.getNewChosenCenterByOffset(this.dragStartMousePos, this.origChosenCenter, e);
      this.updateChosenCenter(t.x, t.y)
    }
  },
  onCropBoxDragEnd: function (e) {
    if (this.dragging) {
      this.dragging = !1;
      var t = this.getNormalizedMousePos(e);
      if (this.isMove) {
        var n = this.getNewChosenCenterByOffset(this.dragStartMousePos, this.origChosenCenter, e);
        this.updateChosenCenter(n.x, n.y)
      } else {
        var r = this.pixelOffsetToPercent(t.x, t.y);
        this.updateChosenCenter(r.x, r.y)
      }
    }
  },
  isLoaded: function () {
    return this.loaded
  },
  setPicture: function (e) {
    this.picture && this.picture.un("change", this.onPictureChange, this), this.picture = e, e.on("change", this.onPictureChange, this), this.rendered && !this.deferredLoad && this.load()
  },
  getPicture: function () {
    return this.picture
  },
  onPictureChange: function (e, t, n) {
    t === "chosen_center" && this.isHighlighted() && this.showCropBox(), t === "viewableImageArea" && this.sizeAndPositionCropBox()
  },
  updateProgress: function (e) {
    this.$progressEl && this.lastProgressPercent !== e && (this.lastProgressPercent = e, this.$progressEl.animate({
      width: e + "%"
    }, 150, function () {
      e === 100 && this.$progressEl.fadeOut(250, function () {
        this.$progressEl.remove()
      }.createDelegate(this))
    }.createDelegate(this)))
  },
  updateChosenCenter: function (e, t) {
    e = Math.max(0, Math.min(e, 100)), t = Math.max(0, Math.min(t, 100));
    var n = this.picture.get("viewableImageArea");
    n.percentWidth === 1 && (e = 50), n.percentHeight === 1 && (t = 50);
    if (e !== this.currentCenterX || t !== this.currentCenterY) this.currentCenterX = e, this.currentCenterY = t, this.picture.set("chosen_center", {
      x: e,
      y: t
    }), this.isHighlighted() && this.showCropBox()
  },
  showCropBox: function () {
    this.rendered && (this.$cropBox.show(), this.$cropBoxTopMask.show(), this.$cropBoxRightMask.show(), this.$cropBoxBottomMask.show(), this.$cropBoxLeftMask.show(), this.cropBoxShown = !0, this.sizeAndPositionCropBox())
  },
  sizeAndPositionCropBox: function () {
    if (this.rendered && this.cropBoxShown) {
      var e = this.$imgWrapEl,
        t = e.height(),
        n = e.width(),
        r = this.picture.get("chosen_center"),
        i = this.picture.get("viewableImageArea"),
        s = Jux.isNumber,
        o, u, a, f, l, c, h, p, d = "px";
      i.percentWidth !== 1 || i.percentHeight !== 1 ? e.css("cursor", "move") : e.css("cursor", ""), r && s(r.x) && s(r.y) ? (o = r.x, u = r.y) : o = u = 50, o /= 100, u /= 100, a = Math.round(n * i.percentWidth), f = Math.round(t * i.percentHeight), l = Math.round((n - a) * o), c = Math.round((t - f) * u), h = l + a, p = c + f, this.$cropBox.css({
        width: a + d,
        height: f + d,
        left: l + d,
        top: c + d
      }), this.$cropBoxTopMask.css({
        width: n + d,
        height: c + d
      }), this.$cropBoxBottomMask.css({
        width: n + d,
        height: t - p + d,
        top: p + d
      }), this.$cropBoxLeftMask.css({
        width: l + d,
        height: f + d,
        top: c + d
      }), this.$cropBoxRightMask.css({
        width: n - h + d,
        height: f + d,
        top: c + d,
        right: 0
      })
    }
  },
  hideCropBox: function () {
    this.rendered && (this.$cropBox.hide(), this.$cropBoxTopMask.hide(), this.$cropBoxRightMask.hide(), this.$cropBoxBottomMask.hide(), this.$cropBoxLeftMask.hide(), this.$imgWrapEl.css("cursor", ""), this.cropBoxShown = !1)
  },
  highlight: function () {
    this._super(arguments), this.showCropBox(), this.sizeAndPositionCropBox()
  },
  unHighlight: function () {
    this.hideCropBox(), this._super(arguments)
  },
  setMedia: function () {
    this.setPicture.apply(this, arguments)
  },
  getMedia: function () {
    return this.getPicture()
  },
  onDestroy: function () {
    this.picture && this.picture.un("change", this.onPictureChange, this), this._super(arguments)
  }
}), ui.ComponentManager.registerType("PicturePicker-PictureItem", app.components.mediaPicker.thumbnailsContainer.PictureThumbnail), Jux.apply(app.components.mediaPicker.thumbnailsContainer.PictureThumbnail, {
  renderTpl: ['<div class="mediaGallery-item-imgWrap">', '<div class="mediaGallery-item-cropBox"></div>', '<div class="mediaGallery-item-cropBoxMaskTop"></div>', '<div class="mediaGallery-item-cropBoxMaskRight"></div>', '<div class="mediaGallery-item-cropBoxMaskBottom"></div>', '<div class="mediaGallery-item-cropBoxMaskLeft"></div>', "</div>", '<div class="mediaGallery-item-buttons"></div>', "<% if( loadingIndicator ) { %>", '<div class="mediaGallery-item-loading">', '<img src="<%= loadingImageSrc %>" />', "<% if( loadingText ) { %>", "<br><%= loadingText %>", "<% } %>", "</div>", "<% if( progressIndicator ) { %>", '<div class="mediaGallery-item-progress" />', "<% } %>", "<% } %>"].join("")
}), app.components.mediaPicker.picturePicker.PicturePicker = Jux.extend(ui.containers.TabsContainer, {
  activeTab: 0,
  height: 380,
  width: 405,
  picture: null,
  initComponent: function () {
    if (!this.user) throw new Error("The 'user' config was not provided");
    this.addEvents("pictureselect", "pictureselect", "pictureremove"), this.cls += " mediaPicker-picturePicker", this.items = [], this.elId = this.elId || Jux.Util.uuid(8);
    var e = this.recentLibraryPanel = new app.components.mediaPicker.picturePicker.RecentLibrary({
      picturePicker: this,
      title: "Recent",
      tabContentCls: "picturePicker-recentPanel",
      limit: 9
    });
    this.items.push(e);
    var t = new app.components.mediaPicker.picturePicker.UploadPicture({
      picturePicker: this,
      title: "Upload",
      tabContentCls: "picturePicker-uploadPanel",
      dropzoneId: this.elId
    });
    this.items.push(t);
    var n = new app.components.mediaPicker.picturePicker.Flickr({
      picturePicker: this,
      title: '<div class="jux-icon jux-icon-flickr" />',
      tabContentCls: "picturePicker-flickrPanel",
      cls: "flickrPanel",
      user: this.user
    });
    this.items.push(n);
    var r = new app.components.mediaPicker.picturePicker.facebook.FacebookPhotos({
      picturePicker: this,
      title: '<div class="jux-icon jux-icon-facebook" />',
      tabContentCls: "picturePicker-facebookPanel",
      user: this.user
    });
    this.items.push(r), this.instagramPhotos = new app.components.mediaPicker.picturePicker.instagram.InstagramPhotos({
      picturePicker: this,
      title: '<div class="jux-icon jux-icon-instagram" />',
      tabContentCls: "picturePicker-instagramPanel",
      user: this.user
    }), this.items.push(this.instagramPhotos);
    var i = new app.components.mediaPicker.picturePicker.EnterURL({
      picturePicker: this,
      title: "URL",
      tabContentCls: "picturePicker-urlPanel"
    });
    this.items.push(i), this._super(arguments)
  },
  addImage: function (e) {
    this.recentLibraryPanel(e)
  },
  onRender: function () {
    this._super(arguments), this.recentLibraryPanel.load()
  },
  onTabChange: function (e, t) {
    t.onActivate(), this._super(arguments)
  },
  setPicture: function (e) {
    e = e || null, e !== this.picture && (this.picture = e, this.fireEvent("pictureselect", this, e))
  },
  getPicture: function () {
    return this.picture
  },
  bringToTop: function (e) {
    this.recentLibraryPanel.bringToFront(e)
  }
}), app.components.mediaPicker.picturePicker.PicturePickerPanel = Jux.extend(ui.Container, {
  initComponent: function () {
    if (!this.picturePicker) throw new Error("PicturePickerPanel: Missing picturePicker config.");
    this._super(arguments), this.picturePicker.addListener({
      pictureselect: function (e, t) {
        t !== this.selectedPicture && (this.selectedPicture = t, this.onPicturePickerSelect(t))
      },
      scope: this
    })
  },
  onActivate: Jux.emptyFn,
  onPicturePickerSelect: Jux.abstractFn
}), app.components.mediaPicker.picturePicker.EnterURL = Jux.extend(app.components.mediaPicker.picturePicker.PicturePickerPanel, {
  multiSelect: !1,
  loadingIndicatorImageSrc: Jux.Cdn.BASE_URI + "assets/spinner2e2d2d.gif",
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureadd", "pictureselect", "picturedeselect", "pictureremove"), this.enterUrlField = new ui.formFields.TextField({
      emptyText: "http://www.example.com/images/img.jpg",
      clickToSelect: !0,
      listeners: {
        keypress: function (e, t) {
          t.which === 13 && (this.onAddUrl(), t.stopPropagation())
        },
        scope: this
      }
    }), this.addButton = new ui.Button({
      label: "Add",
      priority: "primary",
      style: {
        margin: "2px 0 0 8px"
      },
      listeners: {
        click: this.onAddUrl,
        scope: this
      }
    }), this.thumbnailsContainer = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      multiSelect: this.multiSelect,
      listeners: {
        mediaselect: function (e, t) {
          this.picturePicker.setPicture(t.getMedia())
        },
        mediadeselect: function (e, t) {},
        remove: function (e, t) {},
        scope: this
      }
    }), this.add([{
        layout: "columns",
        items: [Jux.apply(this.enterUrlField, {
          columnWidth: "70%"
        }), Jux.apply(this.addButton, {
          columnWidth: "16%"
        })]
      },
      this.thumbnailsContainer
    ])
  },
  onLayout: function () {
    this._super(arguments);
    var e = this.enterUrlField.getInputContainerEl();
    this.$loadingIndicator = jQuery('<img class="picturePicker-enterUrl-loading" src="' + this.loadingIndicatorImageSrc + '" />').appendTo(e).hide(), this.$errorMessage = jQuery('<div class="picturePicker-enterUrl-error ui-corner-all">Invalid URL. Please try again.</div>').appendTo(e).hide()
  },
  onActivate: function () {
    this.enterUrlField.focus(), this._super(arguments)
  },
  onPicturePickerSelect: function (e) {
    this.selectPicture(e)
  },
  onAddUrl: function () {
    var e = this.enterUrlField.getValue();
    e = decodeURIComponent(e);
    if (e !== "" && e !== this.enterUrlField.getEmptyText() && !this.thumbnailsContainer.has(e)) {
      this.$loadingIndicator.show();
      var t = new app.components.mediaPicker.thumbnailsContainer.PictureThumbnail({
        picture: new app.models.PictureWithOptions({
          picture: {
            url: e,
            source: "url",
            getSize: !0
          }
        }),
        buttons: [{
          type: "DeleteButton",
          size: "small",
          title: "Click to remove this image from your Image Library.",
          handler: function () {
            this.removePicture(t)
          },
          scope: this
        }],
        listeners: {
          loadsuccess: function () {
            this.$loadingIndicator.hide(), this.enterUrlField.setValue(""), this.fireEvent("pictureadd", t), this.selectPicture(t)
          },
          loadfailure: function () {
            this.$loadingIndicator.hide(), this.removePicture(t), this.$errorMessage.is(":hidden") && this.$errorMessage.width(this.enterUrlField.getInputContainerEl().find("input").innerWidth() - 5).slideDown("slow").delay(3e3).slideUp("slow")
          },
          scope: this
        }
      });
      this.thumbnailsContainer.insert(t, 0)
    }
  },
  selectPicture: function (e) {
    this.thumbnailsContainer.selectMedia(e)
  },
  deSelectPicture: function (e) {
    this.thumbnailsContainer.deSelectMedia(e)
  },
  bringToFront: function (e) {
    this.thumbnailsContainer.bringToFront(e)
  },
  removePicture: function (e) {
    this.thumbnailsContainer.remove(e)
  }
}), app.components.mediaPicker.picturePicker.Flickr = Jux.extend(app.components.mediaPicker.picturePicker.PicturePickerPanel, {
  multiSelect: !1,
  loadingIndicatorImageSrc: Jux.Cdn.BASE_URI + "assets/spinner2e2d2d.gif",
  LICENSES: {
    0: "r",
    4: "http://creativecommons.org/licenses/by/2.0/",
    6: "http://creativecommons.org/licenses/by-nd/2.0/",
    3: "http://creativecommons.org/licenses/by-nc-nd/2.0/",
    2: "http://creativecommons.org/licenses/by-nc/2.0/",
    1: "http://creativecommons.org/licenses/by-nc-sa/2.0/",
    5: "http://creativecommons.org/licenses/by-sa/2.0/",
    7: "http://www.flickr.com/commons/usage/",
    8: "http://www.usa.gov/copyright.shtml"
  },
  URL_SUFFIXES_BY_SIZE: ["o", "b", "l", "c", "z", "n", "m"],
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect"), this.apiExtras = "date_taken,date_upload,description,geo,license,url_s,owner_name", _.each(this.URL_SUFFIXES_BY_SIZE, function (e) {
      this.apiExtras += ",url_" + e
    }, this), this.queryCounter = 0, this.myPhotosButton = new ui.Button({
      label: "My Flickr",
      cls: "flickrButton myPhotos",
      priority: "normal",
      listeners: {
        click: function (e) {
          e.addCls("active"), this.searchTermsField.removeCls("active"), this.onShowMyPhotos()
        },
        scope: this
      }
    }), this.keyPressDelayedTask = new Jux.util.DelayedTask, this.searchTermsField = new ui.formFields.TextField({
      label: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search Flickr",
      labelPosition: "infield",
      cls: "flickrButton search",
      listeners: {
        focus: function (e) {
          e.addCls("active"), this.myPhotosButton.removeCls("active")
        },
        keypress: this.onFlickrTextChange,
        keydown: function (e, t) {
          (t.which === 8 || t.which === 46) && this.onFlickrTextChange(e, t)
        },
        scope: this
      }
    }), this.thumbnailsContainer = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      multiSelect: this.multiSelect,
      listeners: {
        mediaselect: function (e, t) {
          this.picturePicker.setPicture(t.getMedia())
        },
        mediadeselect: function (e, t) {},
        scope: this
      }
    }), this.add([{
        layout: "columns",
        items: [Jux.apply(this.myPhotosButton, {
          columnWidth: "50%"
        }), Jux.apply(this.searchTermsField, {
          columnWidth: "50%"
        })]
      },
      this.thumbnailsContainer
    ])
  },
  onPicturePickerSelect: function (e) {
    this.selectPicture(e)
  },
  onFlickrTextChange: function (e, t) {
    this.keyPressDelayedTask.delay(150, this.onSearch, this), t.which === 13 && t.stopPropagation()
  },
  onLayout: function () {
    this._super(arguments), this.$loadingIndicator = jQuery('<img class="picturePicker-webSearch-loading" src="' + this.loadingIndicatorImageSrc + '" />').appendTo(this.searchTermsField.getInputContainerEl()).hide()
  },
  onActivate: function () {
    this.searchTermsField.focus()
  },
  onShowMyPhotos: function () {
    this.user.get("flickr_token") ? this.getMyPhotos() : this.authorizeUser()
  },
  getMyPhotos: function () {
    this.$loadingIndicator.show();
    var e = "/flickr/client/?method=flickr.people.getPhotos&per_page=100&extras=" + this.apiExtras;
    jQuery.getJSON(e, function (e) {
      this.addThumbnails(e.photo || [], "flickr")
    }.createDelegate(this))
  },
  onSearch: function () {
    var e = this.searchTermsField.getValue();
    if (!_.isBlank(e)) {
      this.$loadingIndicator.show();
      var t = "/flickr/client/?method=flickr.photos.search&sort=relevance&per_page=40&license=4,6,3,2,1,5,7,8&extras=" + this.apiExtras + "&text=" + encodeURIComponent(e);
      this.queryCounter = this.queryCounter + 1;
      var n = this.queryCounter;
      jQuery.getJSON(t, function (e) {
        if (n < this.queryCounter) return;
        this.addThumbnails(e.photo || [], "flickr_search")
      }.createDelegate(this))
    }
  },
  addThumbnails: function (e, t, n) {
    n || this.thumbnailsContainer.removeAll();
    for (var r = 0, i = e.length; r < i; r++) {
      var s = e[r],
        o = _.find(this.URL_SUFFIXES_BY_SIZE, function (e) {
          return !!s["url_" + e]
        });
      if (o) {
        var u = s["url_" + o],
          a = s.url_s.replace(/^http:/, window.location.protocol),
          f = s["width_" + o],
          l = s["height_" + o],
          c = s.datetaken,
          h;
        c && (c = new Date(c), c.getTime() && (h = c));
        var p = new app.components.mediaPicker.thumbnailsContainer.PictureThumbnail({
          picture: new app.models.PictureWithOptions({
            picture: {
              url: u,
              thumbUrl: a,
              source: t,
              width: f,
              height: l,
              description: s.description,
              license: this.LICENSES[s.license],
              location: {
                lat: s.latitude,
                lng: s.longitude,
                accuracy: s.accuracy
              },
              original_created_at: h,
              service: "flickr",
              service_creator_displayname: s.ownername,
              service_creator_id: s.owner,
              service_media_id: s.id,
              service_media_url: "http://www.flickr.com/photos/" + s.owner + "/" + s.id,
              service_uploaded_at: new Date(parseInt(s.dateupload * 1e3, 10)),
              title: s.title
            }
          })
        });
        this.thumbnailsContainer.add(p)
      }
      this.$loadingIndicator.hide()
    }
  },
  selectPicture: function (e) {
    this.thumbnailsContainer.selectMedia(e)
  },
  deSelectPicture: function (e) {
    this.thumbnailsContainer.deSelectMedia(e)
  },
  authorizeUser: function () {
    app.helpers.OmniAuthorizer.authorize("flickr", {
      width: 1e3,
      height: 670,
      success: function () {
        this.getMyPhotos()
      },
      error: function () {
        this.setMessage("Ooops! An error occurred while authorizing. Please try again.")
      },
      scope: this
    })
  }
}), app.components.mediaPicker.picturePicker.RecentLibrary = Jux.extend(app.components.mediaPicker.picturePicker.PicturePickerPanel, {
  multiSelect: !1,
  loaded: !1,
  deferredSelectedPicture: null,
  deferredBringToFrontPicture: null,
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect", "pictureremove"), this.thumbnailsContainer = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      emptyText: "Tap on one of the tabs above to add an image",
      multiSelect: this.multiSelect,
      listeners: {
        mediaselect: function (e, t) {
          this.picturePicker.setPicture(t.getMedia())
        },
        mediadeselect: function (e, t) {},
        remove: function (e, t) {},
        scope: this
      }
    }), this.add(this.thumbnailsContainer)
  },
  onPicturePickerSelect: function (e) {
    this.hasPicture(e) || this.addPicture(e), this.thumbnailsContainer.getSelectedMedia().length === 0 && this.bringToFront(e), this.selectPicture(e)
  },
  load: function () {
    jQuery.ajax({
      url: "/pictures",
      headers: {
        Accept: "application/json"
      },
      type: "GET",
      success: function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var r = this.createPictureItem(e[t]);
          this.thumbnailsContainer.add(r)
        }
        this.loaded = !0, this.deferredSelectedPicture && (this.selectPicture(this.deferredSelectedPicture), this.deferredSelectedPicture = null), this.deferredBringToFrontPicture && (this.bringToFront(this.deferredBringToFrontPicture), this.deferredBringToFrontPicture = null)
      },
      error: function () {
        this.loaded = !0, window.console.warn("Could not retrieve recent picture library.")
      },
      context: this
    })
  },
  createPictureItem: function (e) {
    e.constructor === Object && (e = new app.models.PictureWithOptions({
      picture: e
    }));
    var t = new app.components.mediaPicker.thumbnailsContainer.PictureThumbnail({
      picture: e,
      buttonAlign: "tr",
      buttons: [{
        type: "DeleteButton",
        size: "small",
        title: "Click to remove this image from your Image Library.",
        handler: function () {
          this.removePicture(t), e.set("hidden", !0), e.save()
        },
        scope: this
      }],
      listeners: {
        loadfailure: this.removePicture,
        scope: this
      }
    });
    return t
  },
  addPicture: function (e) {
    var t = this.createPictureItem(e);
    this.thumbnailsContainer.insert(t, 0)
  },
  hasPicture: function (e) {
    return this.thumbnailsContainer.has(e)
  },
  selectPicture: function (e) {
    this.loaded ? this.thumbnailsContainer.selectMedia(e) : this.deferredSelectedPicture = e
  },
  deSelectPicture: function (e) {
    this.thumbnailsContainer.deSelectMedia(e)
  },
  bringToFront: function (e) {
    this.loaded ? this.thumbnailsContainer.bringToFront(e) : this.deferredBringToFrontPicture = e
  },
  removePicture: function (e) {
    this.thumbnailsContainer.remove(e)
  }
}), app.components.mediaPicker.picturePicker.UploadPicture = Jux.extend(app.components.mediaPicker.picturePicker.PicturePickerPanel, {
  multiSelect: !1,
  dragCls: "picturePicker-uploadPicture-drag",
  maxFileSize: "50mb",
  destinationPath: "/pictures.json",
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureadd", "pictureselect", "picturedeselect", "pictureremove"), this.buttonId = Jux.Util.uuid(5), this.findImagesButtonContainer = new ui.Container({
      type: "Container",
      cls: "picturePicker-findImagesButtonContainer",
      items: {
        type: "Button",
        label: "Pick photos",
        priority: "primary",
        elId: this.buttonId,
        cls: "picturePicker-findImagesButton picturePickerButton"
      }
    }), this.thumbnailsContainer = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      multiSelect: this.multiSelect,
      cls: "picturePicker-uploadPicture-thumbnailsContainer",
      height: 243,
      listeners: {
        mediaselect: function (e, t) {
          this.picturePicker.setPicture(t.getMedia())
        },
        mediadeselect: function (e, t) {},
        beforeremove: this.onBeforeImageRemove,
        remove: function (e, t) {},
        scope: this
      }
    }), this.add([{
        layout: "columns",
        items: [{
            columnWidth: "55%",
            type: "label",
            cls: "uploadTxt",
            text: "Upload photos from your computer"
          },
          Jux.apply(this.findImagesButtonContainer, {
            columnWidth: "28%"
          })
        ]
      },
      this.thumbnailsContainer
    ]), this.firstImageSelected = !1
  },
  onRender: function () {
    this._super(arguments), this.$el.on("dragenter dragover", jQuery.proxy(this.onDragEnter, this)).on("dragleave drop dragend", jQuery.proxy(this.onDragEnd, this))
  },
  onDragEnter: function (e) {
    this.$el.addClass(this.dragCls)
  },
  onDragEnd: function (e) {
    this.$el.removeClass(this.dragCls)
  },
  onActivate: function () {
    this.uploader && this.uploader.refresh(), this._super(arguments)
  },
  onPicturePickerSelect: function (e) {
    this.selectPicture(e)
  },
  createDestinationUrl: function (e) {
    return this.destinationPath + e
  },
  onLayout: function () {
    this._super(arguments);
    var e = this.uploader = new plupload.Uploader({
      runtimes: "gears,html5,flash,silverlight,browserplus",
      url: this.destinationPath,
      container: this.elId,
      drop_element: this.dropzoneId,
      multipart: !0,
      multipart_params: {
        _http_accept: "application/javascript",
        authenticity_token: RailsData.authenticity_token
      },
      max_file_size: this.maxFileSize,
      unique_names: !0,
      filters: [{
        title: "Image Files",
        extensions: "jpg,jpeg,gif,png"
      }],
      browse_button: this.buttonId,
      flash_swf_url: "/assets/vendor/plupload/js/plupload.flash.swf",
      silverlight_xap_url: "/assets/vendor/plupload/js/plupload.silverlight.xap"
    });
    e.init(), e.bind("FilesAdded", this.onImagesAdded, this), e.bind("UploadProgress", this.onImageProgress, this), e.bind("FileUploaded", this.onImageComplete, this), e.bind("Error", this.onImageError, this)
  },
  onImagesAdded: function (e, t) {
    for (var n = t.length - 1; n >= 0; n--) {
      var r = t[n],
        i = r.name,
        s = Jux.Util.ellipsis(i, 20),
        o = this.createDestinationUrl(i),
        u = new app.components.mediaPicker.thumbnailsContainer.PictureThumbnail({
          picture: new app.models.PictureWithOptions({
            picture: {
              url: o,
              source: "upload"
            }
          }),
          deferredLoad: !0,
          loadingIndicator: !0,
          loadingText: "Uploading<br>" + s,
          progressIndicator: !0,
          errorText: "Error loading<br>image: " + r.name + ". Please try again.",
          listeners: {
            loadsuccess: this.onImageLoaded,
            scope: this
          }
        });
      this.thumbnailsContainer.insert(u, 0)
    }
    this.firstImageSelected = !1, e.start(), e.refresh()
  },
  onImageProgress: function (e, t) {
    var n = this.createDestinationUrl(t.name),
      r = this.thumbnailsContainer.getItem(n);
    r.updateProgress(t.percent)
  },
  onImageComplete: function (e, t, n) {
    var r = jQuery.parseJSON(n.response),
      i = this.createDestinationUrl(t.name),
      s = this.thumbnailsContainer.getItem(i),
      o = s.getPicture(),
      u = o.get("picture");
    u.set("id", r.id), u.set("url", r.url), u.set("width", r.width), u.set("height", r.height), u.set("facial_center", r.facial_center), s.load()
  },
  onImageError: function (e, t) {
    if (t.code === -600) {
      var n = new ui.Dialog({
        title: "Error uploading image",
        cls: "palette",
        html: '<div style="color: #C0C5CF; padding: 20px;">Error: The image ' + t.file.name + " is too big. Please use images smaller than " + this.maxFileSize + ".</div>",
        closeButton: new ui.toolButtons.CloseButton({
          size: "tiny",
          handler: function () {
            n.close()
          }
        }),
        buttons: [{
          text: "Ok",
          handler: function () {
            n.close()
          }
        }]
      });
      n.open()
    } else {
      var r = t.file,
        i = this.createDestinationUrl(r.name),
        s = this.thumbnailsContainer.getItem(i);
      s.load(), e.refresh()
    }
  },
  onImageLoaded: function (e) {
    this.fireEvent("pictureadd", e.getMedia());
    if (this.multiSelect) this.thumbnailsContainer.selectMedia(e);
    else if (!this.firstImageSelected) {
      var t = e.getMedia();
      this.thumbnailsContainer.bringToFront(e), this.thumbnailsContainer.selectMedia(e), this.firstImageSelected = !0
    }
  },
  onBeforeImageRemove: function (e, t) {},
  selectPicture: function (e) {
    this.thumbnailsContainer.selectMedia(e)
  },
  deSelectPicture: function (e) {
    this.thumbnailsContainer.deSelectMedia(e)
  },
  bringToFront: function (e) {
    this.thumbnailsContainer.bringToFront(e)
  }
}), app.components.mediaPicker.picturePicker.facebook.AlbumPictureItem = Jux.extend(app.components.mediaPicker.thumbnailsContainer.PictureThumbnail, {
  loadingIndicator: !0,
  errorText: "Error loading thumbnail.",
  initComponent: function () {
    if (!this.facebookAlbumObj) throw new Error("facebookAlbumObj config not provided to app.components.mediaPicker.picturePicker.facebook.AlbumPictureItem");
    var e = Jux.Hosts.origin + "/facebook/album_cover?album_id=" + this.facebookAlbumObj.id;
    this.picture = new app.models.PictureWithOptions({
      picture: {
        url: e,
        thumbUrl: e
      }
    }), this.displayedAlbumName = "<br>" + Jux.Util.ellipsis(this.facebookAlbumObj.name, 20), this._super(arguments)
  },
  onLoadSuccess: function () {
    this._super(arguments), this.$innerEl.append(this.displayedAlbumName)
  },
  onLoadFailure: function () {
    this._super(arguments), this.$innerEl.addClass("cursor"), this.$innerEl.append(this.displayedAlbumName)
  },
  onClick: function (e) {
    this.fireEvent("click", this)
  },
  getFacebookAlbumObj: function () {
    return this.facebookAlbumObj
  }
}), ui.ComponentManager.registerType("PicturePicker-AlbumPictureItem", app.components.mediaPicker.picturePicker.facebook.AlbumPictureItem), app.components.mediaPicker.picturePicker.facebook.AlbumsPanel = Jux.extend(ui.Container, {
  multiSelect: !1,
  albumsGalleryEmptyText: "Sorry, you don't seem have any public Facebook photo albums.",
  albumsLoaded: !1,
  initComponent: function () {
    this._super(arguments), this.addEvents("albumselect", "oautherror"), this.albumsGallery = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      emptyText: this.albumsGalleryEmptyText,
      multiSelect: this.multiSelect,
      clickToSelect: !1
    }), this.add([this.albumsGallery])
  },
  showAlbums: function () {
    if (!this.albumsLoaded) {
      var e = "/facebook/my_albums";
      this.albumsGallery.setEmptyText("Loading..."), jQuery.ajax({
        url: e,
        dataType: "json",
        success: this.onAlbumsLoadSuccess,
        error: this.onAlbumsLoadFailure,
        context: this
      })
    }
  },
  onAlbumsLoadSuccess: function (e, t, n) {
    for (var r = 0, i = e.length; r < i; r++) {
      var s = new app.components.mediaPicker.picturePicker.facebook.AlbumPictureItem({
        facebookAlbumObj: e[r],
        listeners: {
          click: this.onAlbumClick,
          scope: this
        }
      });
      this.albumsGallery.add(s)
    }
    this.albumsLoaded = !0, this.albumsGallery.setEmptyText(this.albumsGalleryEmptyText)
  },
  onAlbumsLoadFailure: function (e, t) {
    this.fireEvent("oautherror"), this.albumsGallery.setEmptyText(this.albumsGalleryEmptyText)
  },
  onAlbumClick: function (e) {
    var t = e.getFacebookAlbumObj();
    this.fireEvent("albumselect", t.id, t.name)
  }
}), app.components.mediaPicker.picturePicker.facebook.AuthorizePanel = Jux.extend(ui.Container, {
  authorizeMessage: "Access your Facebook photos",
  initComponent: function () {
    if (!this.user) throw new Error("The 'user' config was not provided");
    this._super(arguments), this.addEvents("authorizesuccess"), this.authorizeMessageLabel = new ui.Label({
      text: this.authorizeMessage
    }), this.add({
      items: [this.authorizeMessageLabel, {
        type: "Button",
        label: "Connect with Facebook",
        style: {
          margin: "15px 0 0 113px"
        },
        buttonCls: "ui-priority-primary picturePickerButton btn-facebook",
        listeners: {
          click: this.authorizeUser,
          scope: this
        }
      }]
    })
  },
  setMessage: function (e) {
    var t = this.authorizeMessage;
    e && (t += "<br><br>" + e), this.authorizeMessageLabel.setText(t)
  },
  authorizeUser: function () {
    app.helpers.OmniAuthorizer.authorize("facebook", {
      width: 1098,
      height: 674,
      success: function () {
        this.fireEvent("authorizesuccess")
      },
      error: function (e) {
        var t = e && e.error || "Ooops! An error occurred while authorizing. Please try again.";
        this.setMessage(t)
      },
      scope: this,
      user: this.user
    })
  }
}), app.components.mediaPicker.picturePicker.facebook.FacebookInnerWrapper = Jux.extend(ui.Container, {
  multiSelect: !1,
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect", "oautherror"), this.breadcrumbsLabel = new ui.Label({
      text: "My Albums"
    }), this.albumsPanel = new app.components.mediaPicker.picturePicker.facebook.AlbumsPanel({
      multiSelect: this.multiSelect,
      listeners: {
        albumselect: this.onAlbumSelect,
        oautherror: function () {
          this.fireEvent("oautherror")
        },
        scope: this
      }
    }), this.photosPanel = new app.components.mediaPicker.picturePicker.facebook.PhotosPanel({
      multiSelect: this.multiSelect,
      listeners: {
        pictureselect: function (e) {
          this.fireEvent("pictureselect", e)
        },
        picturedeselect: function (e) {
          this.fireEvent("picturedeselect", e)
        },
        oautherror: function () {
          this.fireEvent("oautherror")
        },
        scope: this
      }
    }), this.wrapperPanel = new ui.Container({
      layout: "cards",
      items: [this.albumsPanel, this.photosPanel]
    }), this.add([this.breadcrumbsLabel, this.wrapperPanel])
  },
  showAlbums: function () {
    this.wrapperPanel.getLayout().setActiveItem(this.albumsPanel), this.breadcrumbsLabel.setText("<span>My Albums</span>"), this.albumsPanel.showAlbums()
  },
  showPhotos: function (e, t) {
    this.wrapperPanel.getLayout().setActiveItem(this.photosPanel);
    var n = jQuery('<span><a href="#" onclick="return false;">My Albums</a> &raquo; Album: ' + t + "</span>");
    n.find("a").bind({
      click: function () {
        this.showAlbums()
      }.createDelegate(this)
    }), this.breadcrumbsLabel.setText(n), this.photosPanel.showPhotos(e)
  },
  onAlbumSelect: function (e, t) {
    this.showPhotos(e, t)
  },
  selectPicture: function (e) {
    this.photosPanel.selectPicture(e)
  },
  deSelectPicture: function (e) {
    this.photosPanel.deSelectPicture(e)
  }
}), ui.ComponentManager.registerType("PicturePicker-FacebookInnerWrapper", app.components.mediaPicker.picturePicker.facebook.FacebookInnerWrapper), app.components.mediaPicker.picturePicker.facebook.FacebookPhotos = Jux.extend(app.components.mediaPicker.picturePicker.PicturePickerPanel, {
  multiSelect: !1,
  layout: "cards",
  initComponent: function () {
    var e = this.user;
    if (!e) throw new Error("The 'user' config was not provided");
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect"), e.hasFacebookPhotoAccess() ? this.showAlbums() : this.showAuthorizationPanel()
  },
  onPicturePickerSelect: function (e) {
    this.selectPicture(e)
  },
  showAuthorizationPanel: function (e) {
    this.authorizePanel || (this.authorizePanel = new app.components.mediaPicker.picturePicker.facebook.AuthorizePanel({
      user: this.user,
      listeners: {
        authorizesuccess: this.onAuthorizeSuccess,
        scope: this
      }
    }), this.add(this.authorizePanel)), this.authorizePanel.setMessage(e), this.getLayout().setActiveItem(this.authorizePanel)
  },
  createFbInnerWrapperPanel: function () {
    return this.fbInnerWrapperPanel || (this.fbInnerWrapperPanel = new app.components.mediaPicker.picturePicker.facebook.FacebookInnerWrapper({
      multiSelect: this.multiSelect,
      listeners: {
        pictureselect: function (e) {
          this.picturePicker.setPicture(e)
        },
        picturedeselect: function (e) {},
        oautherror: this.onOAuthError,
        scope: this
      }
    }), this.add(this.fbInnerWrapperPanel)), this.fbInnerWrapperPanel
  },
  showAlbums: function () {
    var e = this.createFbInnerWrapperPanel();
    this.getLayout().setActiveItem(e), e.showAlbums()
  },
  showPhotos: function (e, t) {
    var n = this.createFbInnerWrapperPanel();
    this.getLayout().setActiveItem(n), n.showPhotos(e, t)
  },
  onAuthorizeSuccess: function () {
    this.showAlbums()
  },
  onOAuthError: function () {
    this.showAuthorizationPanel("Your session has timed out. Please authorize again.")
  },
  selectPicture: function (e) {
    var t = this.createFbInnerWrapperPanel();
    t.selectPicture(e)
  },
  deSelectPicture: function (e) {
    var t = this.createFbInnerWrapperPanel();
    t.deSelectPicture(e)
  }
}), ui.ComponentManager.registerType("PicturePicker-FacebookPhotos", app.components.mediaPicker.picturePicker.facebook.FacebookPhotos), app.components.mediaPicker.picturePicker.facebook.PhotoPictureItem = Jux.extend(app.components.mediaPicker.thumbnailsContainer.PictureThumbnail, {
  loadingIndicator: !0,
  initComponent: function () {
    if (!this.facebookPhotoObj) throw new Error("facebookPhotoObj config not provided to app.components.mediaPicker.picturePicker.facebook.PhotoPictureItem");
    var e = this.facebookPhotoObj,
      t = e.images[0];
    this.picture = new app.models.PictureWithOptions({
      picture: {
        url: t.source,
        thumbUrl: e.images[2].source,
        source: "facebook",
        width: t.width,
        height: t.height,
        service: "facebook",
        service_creator_displayname: e.from.name,
        service_creator_id: e.from.id,
        service_media_id: e.id,
        service_media_url: e.link,
        title: e.name,
        service_uploaded_at: e.created_time
      }
    }), this._super(arguments)
  },
  getFacebookPhotoObj: function () {
    return this.facebookPhotoObj
  }
}), ui.ComponentManager.registerType("PicturePicker-PhotoPictureItem", app.components.mediaPicker.picturePicker.facebook.PhotoPictureItem), app.components.mediaPicker.picturePicker.facebook.PhotosPanel = Jux.extend(ui.Container, {
  multiSelect: !1,
  photosGalleryEmptyText: "No photos exist in this album.",
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect", "oautherror"), this.photosGallery = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      emptyText: this.photosGalleryEmptyText,
      multiSelect: this.multiSelect,
      listeners: {
        mediaselect: function (e, t) {
          this.fireEvent("pictureselect", t.getMedia())
        },
        mediadeselect: function (e, t) {
          this.fireEvent("picturedeselect", t.getMedia())
        },
        scope: this
      }
    }), this.add([this.photosGallery])
  },
  showPhotos: function (e) {
    var t = "/facebook/photos?album_id=" + e;
    this.photosGallery.setEmptyText("Loading..."), this.photosGallery.removeAll(), jQuery.ajax({
      url: t,
      dataType: "json",
      success: this.onPhotosLoadSuccess,
      error: this.onPhotosLoadFailure,
      context: this
    })
  },
  onPhotosLoadSuccess: function (e, t, n) {
    for (var r = 0, i = e.length; r < i; r++) {
      var s = new app.components.mediaPicker.picturePicker.facebook.PhotoPictureItem({
        facebookPhotoObj: e[r]
      });
      this.photosGallery.add(s)
    }
    this.photosGallery.setEmptyText(this.photosGalleryEmptyText)
  },
  onPhotosLoadFailure: function (e, t) {
    this.fireEvent("oautherror"), this.photosGallery.setEmptyText(this.photosGalleryEmptyText)
  },
  selectPicture: function (e) {
    this.photosGallery.selectMedia(e)
  },
  deSelectPicture: function (e) {
    this.photosGallery.deSelectMedia(e)
  }
}), app.components.mediaPicker.picturePicker.instagram.AuthorizePanel = Jux.extend(ui.Container, {
  authorizeMessage: "Access your Instagram photos",
  initComponent: function () {
    this._super(arguments), this.addEvents("authorizesuccess"), this.authorizeMessageLabel = new ui.Label({
      text: this.authorizeMessage
    }), this.add({
      items: [this.authorizeMessageLabel, {
        type: "Button",
        label: "Connect with Instagram",
        style: {
          margin: "15px 0 0 113px"
        },
        buttonCls: "ui-priority-primary picturePickerButton btn-instagram",
        listeners: {
          click: this.authorizeUser,
          scope: this
        }
      }]
    })
  },
  setMessage: function (e) {
    var t = this.authorizeMessage;
    e && (t += "<br><br>" + e), this.authorizeMessageLabel.setText(t)
  },
  authorizeUser: function () {
    app.helpers.OmniAuthorizer.authorize("instagram", {
      width: 1020,
      height: 550,
      success: function () {
        this.fireEvent("authorizesuccess")
      },
      error: function () {
        this.setMessage("Ooops! An error occurred while authorizing. Please try again.")
      },
      scope: this
    })
  }
}), app.components.mediaPicker.picturePicker.instagram.InstagramPhotos = Jux.extend(app.components.mediaPicker.picturePicker.PicturePickerPanel, {
  multiSelect: !1,
  layout: "cards",
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect"), this.authorizePanel = new app.components.mediaPicker.picturePicker.instagram.AuthorizePanel({
      listeners: {
        authorizesuccess: this.onAuthorizeSuccess,
        scope: this
      }
    }), this.photosPanel = new app.components.mediaPicker.picturePicker.instagram.PhotosPanel({
      multiSelect: this.multiSelect,
      listeners: {
        pictureselect: function (e) {
          this.picturePicker.setPicture(e)
        },
        picturedeselect: function (e) {},
        oautherror: this.onOAuthError,
        scope: this
      }
    }), this.add([this.authorizePanel, this.photosPanel]), this.authorizationRequired() ? this.showAuthorizationPanel() : this.showPhotos()
  },
  onPicturePickerSelect: function (e) {
    this.selectPicture(e)
  },
  authorizationRequired: function () {
    return !this.user.get("instagram_token")
  },
  showAuthorizationPanel: function (e) {
    this.authorizePanel.setMessage(e), this.getLayout().setActiveItem(this.authorizePanel)
  },
  showPhotos: function () {
    this.getLayout().setActiveItem(this.photosPanel), this.photosPanel.showPhotos()
  },
  onAuthorizeSuccess: function () {
    this.showPhotos()
  },
  onOAuthError: function () {
    this.showAuthorizationPanel("Please authorize again.")
  },
  selectPicture: function (e) {
    this.photosPanel.selectPicture(e)
  },
  deSelectPicture: function (e) {
    this.photosPanel.deSelectPicture(e)
  }
}), ui.ComponentManager.registerType("PicturePicker-InstagramPhotos", app.components.mediaPicker.picturePicker.instagram.InstagramPhotos), app.components.mediaPicker.picturePicker.instagram.InstagramPicture = Jux.extend(app.components.mediaPicker.thumbnailsContainer.PictureThumbnail, {
  loadingIndicator: !0,
  initComponent: function () {
    var e = this.instagramPhotoObj;
    if (!e) throw new Error("instagramPhotoObj config not provided to app.components.mediaPicker.picturePicker.instagram.InstagramPicture");
    var t = e.images.standard_resolution,
      n = e.images.thumbnail,
      r = e.location || {};
    this.picture = new app.models.PictureWithOptions({
      picture: {
        height: t.height,
        thumbUrl: e.images.thumbnail.url,
        url: t.url,
        source: "instagram",
        width: t.width,
        filter: e.filter,
        location: {
          lat: r.latitude,
          lng: r.longitude
        },
        service: "instagram",
        service_creator_displayname: e.user.full_name,
        service_creator_id: e.user.id,
        service_creator_username: e.user.username,
        service_media_id: e.id,
        service_media_url: e.link,
        service_uploaded_at: new Date(parseInt(e.created_time * 1e3, 10)),
        title: e.caption ? e.caption.text : ""
      }
    }), this._super(arguments)
  },
  getInstagramPhotoObj: function () {
    return this.instagramPhotoObj
  }
}), ui.ComponentManager.registerType("PicturePicker-InstagramPicture", app.components.mediaPicker.picturePicker.instagram.InstagramPicture), app.components.mediaPicker.picturePicker.instagram.PhotosPanel = Jux.extend(ui.Container, {
  multiSelect: !1,
  photosGalleryEmptyText: "No photos exist in this album.",
  initComponent: function () {
    this._super(arguments), this.addEvents("pictureselect", "picturedeselect", "oautherror"), this.autoInstagramLabel = new ui.Label({
      text: "Psst... post Instagrams on the go by tagging them with #jux"
    }), this.photosGallery = new app.components.mediaPicker.thumbnailsContainer.ThumbnailsContainer({
      emptyText: this.photosGalleryEmptyText,
      multiSelect: this.multiSelect,
      listeners: {
        mediaselect: function (e, t) {
          this.fireEvent("pictureselect", t.getMedia())
        },
        mediadeselect: function (e, t) {
          this.fireEvent("picturedeselect", t.getMedia())
        },
        scope: this
      }
    }), this.add([this.autoInstagramLabel, this.photosGallery])
  },
  showPhotos: function () {
    this.photosGallery.setEmptyText("Loading..."), this.photosGallery.removeAll(), jQuery.ajax({
      url: "/instagram/media",
      dataType: "json",
      success: this.onPhotosLoadSuccess,
      error: this.onPhotosLoadFailure,
      context: this
    })
  },
  onPhotosLoadSuccess: function (e, t, n) {
    if (e.meta.error_type || e.meta.error_message) window.console.warn("Instagram error: " + e.meta.error_message), this.onPhotosLoadFailure(n, t);
    else {
      var r = e.data;
      for (var i = 0; i < r.length; i++) {
        var s = new app.components.mediaPicker.picturePicker.instagram.InstagramPicture({
          instagramPhotoObj: r[i]
        });
        this.photosGallery.add(s)
      }
      this.photosGallery.setEmptyText(this.photosGalleryEmptyText)
    }
  },
  onPhotosLoadFailure: function (e, t) {
    this.fireEvent("oautherror"), this.photosGallery.setEmptyText(this.photosGalleryEmptyText)
  },
  selectPicture: function (e) {
    this.photosGallery.selectMedia(e)
  },
  deSelectPicture: function (e) {
    this.photosGallery.deSelectMedia(e)
  }
}), app.controllers.PaletteController = Jux.extend(app.controllers.Controller, {
  abstractClass: !0,
  initialize: function (e) {
    if (!this.palette) throw new Error("'palette' config required");
    this._super(arguments), this.palette.on("datachange", this.onPaletteDataChange, this)
  },
  onPaletteDataChange: Jux.emptyFn,
  onDestroy: function () {
    this.palette.un("datachange", this.onPaletteDataChange, this), this._super(arguments)
  }
}), app.controllers.QuarkEditor = Jux.extend(Jux.util.Observable, {
  currentUser: null,
  palette: null,
  paletteOpenButton: null,
  errorDialogShown: !1,
  constructor: function (e) {
    Jux.apply(this, e), this._super(arguments), this.addEvents("palettedoneclick");
    var t = this.model,
      n = this.$buttonContainerEl;
    this.quarkModelPersister = new app.components.ModelPersister({
      model: t,
      listeners: {
        error: this.onModelPersistError,
        scope: this
      }
    });
    var r = this.palette = new app.views.palette.QuarkPalette({
      user: this.currentUser,
      listeners: {
        doneclick: this.onPaletteDoneClick,
        scope: this
      }
    });
    this.paletteController = new app.controllers.quark.edit.QuarkPalette({
      palette: r,
      model: t,
      currentUser: this.currentUser
    }), this.paletteOpenButton.setPalette(r)
  },
  getQuark: function () {
    return this.model
  },
  openPalette: function () {
    this.palette.open()
  },
  closePalette: function () {
    this.palette.close()
  },
  saveData: function (e) {
    e = e || {}, this.quarkModelPersister.save({
      async: typeof e.async == "undefined" ? !0 : e.async,
      success: e.success,
      error: e.error,
      complete: e.complete,
      scope: e.scope
    })
  },
  onModelPersistError: function () {
    if (!this.errorDialogShown) {
      var e = new ui.Dialog({
        closeButton: !1,
        closeOnEscape: !1,
        modal: !0,
        cls: "palette alertBox",
        html: ['<div class="alertText"><div class="alertText-heading">Uhoh ...</div>', "We're having trouble saving your changes.<br>Don't want to lose more of your brilliant work...</div>"].join(""),
        footer: {
          items: [{
            type: "Button",
            text: "Reload the page",
            cls: "alertAction",
            handler: function () {
              window.location.reload(!0)
            }
          }, {
            type: "Component",
            cls: "alertAction-secondary",
            html: 'Still having issues? <a href="mailto:helpers@jux.com" target="_blank">Email helpers</a>'
          }]
        }
      });
      e.open(), this.errorDialogShown = !0
    }
  },
  onPaletteDoneClick: function () {
    this.fireEvent("palettedoneclick", this)
  },
  destroy: function () {
    this.paletteController.destroy(), this.palette.destroy(), this.saveData({
      complete: function () {
        this.quarkModelPersister.destroy()
      },
      scope: this
    })
  }
}), app.controllers.gallery.edit.GalleryPalette = Jux.extend(app.controllers.PaletteController, {
  abstractClass: !0,
  labelFieldEmptyText: "Name",
  valueFieldEmptyText: "Web or email address",
  initialize: function () {
    this._super(arguments);
    if (!this.gallery) throw new Error("'gallery' config required");
    if (!this.themes) throw new Error("'themes' config required");
    if (!this.user) throw new Error("'user' config required");
    var e = this.palette;
    this.linksContainerSection = e.findById("linksContainerSection"), this.linksContainer = e.findById("linksContainer"), this.addLinkButton = e.findById("addLinkButton"), this.addLinkButton.on("click", this.onAddLinkClick, this), this.updatePaletteForTheme();
    var t = this.gallery,
      n = t.get("selected_theme_settings");
    this.palette.setData({
      theme: this.getCurrentThemeName(),
      title_font: n.get("title_font"),
      author_font: n.get("author_font"),
      quark_title_font: n.get("quark_title_font"),
      caption_font: n.get("caption_font"),
      text_font: n.get("text_font"),
      show_master_gallery_title: t.get("show_master_gallery_title"),
      show_quark_owner_names: t.get("show_quark_owner_names"),
      show_dates: t.get("show_dates"),
      show_owner_name: t.get("show_owner_name"),
      show_view_counts: t.get("show_view_counts"),
      fullview_heading_look: t.get("fullview_heading_look"),
      text_alignment: t.get("text_alignment")
    }), this.user.on("change:custom_links", this.onCustomLinksChange, this), this.initLinkItems()
  },
  onCustomLinksChange: function (e, t, n) {
    t.clientId !== n.clientId && this.initLinkItems()
  },
  initLinkItems: function () {
    this.linksContainer.removeAll(!0);
    var e = this.user,
      t = [],
      n = app.views.palette.controls,
      r = e.get("custom_links").getModels();
    for (var i = 0, s = r.length; i < s; i++) {
      var o = r[i],
        u = new app.views.palette.controls.CustomLinkItem({
          id: o.getId(),
          labelFieldEmptyText: this.labelFieldEmptyText,
          valueFieldEmptyText: this.valueFieldEmptyText,
          linkLabel: o.get("label"),
          linkValue: o.get("value"),
          linkVisible: o.get("show")
        });
      this.subscribeToLinkItem(u), t.push(u)
    }
    this.linksContainer.add(t)
  },
  subscribeToLinkItem: function (e) {
    e.on({
      change: this.onLinkItemChange,
      deleteclick: this.onLinkItemDeleteClick,
      scope: this
    })
  },
  getCurrentThemeName: function () {
    return this.gallery.get("theme")
  },
  getCurrentTheme: function () {
    return this.themes[this.getCurrentThemeName()]
  },
  onPaletteDataChange: function (e, t) {
    this._super(arguments);
    var n = t.getKey(),
      r = t.getData();
    switch (n) {
    case "theme":
      this.gallery.set(n, r), this.updatePaletteForTheme();
      break;
    case "title_font":
    case "author_font":
    case "quark_title_font":
    case "caption_font":
    case "text_font":
      this.updateSelectedThemeSettings(n, t.getData());
      break;
    case "show_master_gallery_title":
    case "show_quark_owner_names":
    case "show_dates":
    case "show_owner_name":
    case "show_view_counts":
    case "fullview_heading_look":
    case "text_alignment":
      this.gallery.set(n, r);
      break;
    default:
      throw new Error("key '" + n + "' is not set up for changes in GalleryPaletteController")
    }
  },
  updatePaletteForTheme: function () {
    var e = this.getCurrentTheme(),
      t = this.gallery.get("selected_theme_settings"),
      n = this.palette,
      r = t.getData();
    n.setTitleFontOptions(e.getTitleFontOptions()), n.setTitleFontColorOptions(e.getTitleFontColorOptions()), n.setAuthorFontOptions(e.getAuthorFontOptions()), n.setQuarktitleFontOptions(e.getQuarktitleFontOptions()), n.setCaptionFontOptions(e.getCaptionFontOptions()), n.setTextFontOptions(e.getTextFontOptions()), n.setData(r)
  },
  updateSelectedThemeSettings: function (e, t) {
    var n = this.gallery,
      r = n.get("selected_theme_settings");
    r.set(e, t)
  },
  onAddLinkClick: function () {
    var e = new app.models.CustomLink;
    this.user.get("custom_links").add(e);
    var t = new app.views.palette.controls.CustomLinkItem({
      id: e.getId(),
      labelFieldEmptyText: this.labelFieldEmptyText,
      valueFieldEmptyText: this.valueFieldEmptyText,
      linkLabel: e.get("label"),
      linkValue: e.get("value"),
      linkVisible: e.get("show")
    });
    this.subscribeToLinkItem(t), this.linksContainer.add(t)
  },
  onLinkItemChange: function (e) {
    var t = this.user,
      n = e.getId(),
      r = e.getLinkLabel(),
      i = e.getLinkValue(),
      s = e.isLinkVisible();
    if (e instanceof app.views.palette.controls.PermanentLinkItem) switch (n) {
    case "email":
      t.set("show_email", s);
      break;
    case "facebook":
      t.set("show_facebook_link", s);
      break;
    case "twitter":
      t.set("show_twitter_username", s);
      break;
    default:
      throw new Error("PermanentLinkItem with id: '" + n + "' does not have a handler case set up.")
    } else t.get("custom_links").getById(n).set({
      label: r,
      value: i,
      show: s
    })
  },
  onLinkItemDeleteClick: function (e) {
    var t = this.user.get("custom_links"),
      n = t.getById(e.getId());
    t.remove(n), this.linksContainer.remove(e)
  },
  saveData: function (e) {
    this.gallery.save(e)
  }
}), app.controllers.gallery.edit.MultiGalleryPalette = Jux.extend(app.controllers.gallery.edit.GalleryPalette, {}), app.controllers.gallery.edit.UserGalleryPalette = Jux.extend(app.controllers.gallery.edit.GalleryPalette, {
  initialize: function () {
    this._super(arguments), this.user.get("sub_galleries").length === 0 && this.linksContainerSection.setTitle("")
  }
}), app.controllers.quark.edit.Quark = Jux.extend(app.controllers.Controller, {
  initialize: function () {
    this._super(arguments);
    if (!this.model) throw new Error("'model' config required");
    if (!this.user) throw new Error("'user' config required");
    if (!this.controlsPanel) throw new Error("'controlsPanel' config required");
    this.addEvents("pictureselectorclick"), this.controlsPanel.setData(this.model.getData()), this.setUpControlsContainer(this.controlsPanel), this.galleryDropdownSection = this.controlsPanel.findById("galleryDropdownSection"), this.galleryDropdownSection && (this.galleryDropdown = this.controlsPanel.findById("galleryDropdown"), this.setupGalleryDropdown(), this.galleryDropdown.on("change", this.onGalleryDropdownChange, this));
    var e = this.dataControls = this.controlsPanel.getDataControls();
    for (var t = 0, n = e.length; t < n; t++) e[t].on("datachange", this.onDataControlChange, this)
  },
  setUpControlsContainer: function (e) {
    var t = e.findByType(app.components.controls.PictureSelector);
    for (var n = 0, r = t.length; n < r; n++) t[n].on("beforeclick", this.onPictureSelectorClick, this)
  },
  onPictureSelectorClick: function (e) {
    return this.fireEvent("pictureselectorclick", this, e)
  },
  onDataControlChange: function (e) {
    var t = e.getKey();
    t && this.model.set(e.getKey(), e.getData())
  },
  getAutoPictureSize: function (e, t) {
    var n = e / t;
    return n < .8 && e > 600 && t > 600 ? "fit" : e > 1200 && t > 600 ? "fill" : "frame"
  },
  setupGalleryDropdown: function () {
    var e = this.galleryDropdown,
      t = this.user.get("sub_galleries");
    if (t.length <= 1) e.setOptions([{
      text: "",
      value: this.model.get("gallery_id")
    }]), this.galleryDropdownSection.hide();
    else {
      var n = [];
      for (var r = 0, i = t.length; r < i; r++) {
        var s = t[r].title,
          o = t[r].id;
        if (typeof s == "undefined" || typeof o == "undefined") throw new Error("An option added to the dropdown in setupGalleryDropdown() had an undefined property. Did the property names change?");
        n.push({
          text: s,
          value: o
        })
      }
      e.setOptions(n), e.setValue(this.model.get("gallery_id"))
    }
  },
  onGalleryDropdownChange: function () {
    var e = this.galleryDropdown.getValue(),
      t = this.user.getGalleryById(e);
    if (typeof t.name == "undefined") throw new Error("Anonymous Gallery object didn't have `name` property. Was it renamed?");
    this.controlsPanel.mask(), this.model.set("gallery_id", e), this.model.save({
      success: function () {
        window.location = "/" + t.name + "/" + this.model.getId() + "#e"
      },
      scope: this
    })
  },
  onDestroy: function () {
    var e = this.dataControls;
    for (var t = 0, n = e.length; t < n; t++) e[t].un("datachange", this.onDataChange, this);
    this._super(arguments)
  }
}), app.controllers.quark.edit.AbstractMonoQuark = Jux.extend(app.controllers.quark.edit.Quark, {
  initialize: function () {
    this._super(arguments);
    var e = this.controlsPanel,
      t = this.model;
    this.photoPermissionDropdown = e.findById("photoPermissionDropdown"), this.photoPermissionDropdown.on("change", this.onPhotoPermissionChange, this), this.updatePhotoPermissionDropdown(), this.pictureSizeSelector = e.findByKey("picture_size"), this.pictureSizeSelector.on("useritemselect", this.onPictureSizeUserChange, this), t.on({
      "change:background_picture": this.onPictureChange,
      "change:mirror_in": this.onMirrorChange,
      "change:mirror_out": this.onMirrorChange,
      scope: this
    })
  },
  updatePhotoPermissionDropdown: function () {
    var e = this.photoPermissionDropdown,
      t = this.model.get("background_picture"),
      n = t.get("license");
    this.lastUsedPicture !== t && (this.lastUsedPicture = t, this.addedPhotoPermissionOptionValue && (e.removeOptionByValue(this.addedPhotoPermissionOptionValue), delete this.addedPhotoPermissionOptionValue));
    if (e.hasOptionValue(n)) e.setValue(n);
    else if (n) {
      var r = Jux.Licenses.getLicenseText(n) || n;
      e.addOption({
        text: r,
        value: n
      }), e.setValue(n), this.addedPhotoPermissionOptionValue = n
    } else e.setValue("")
  },
  onPhotoPermissionChange: function (e, t) {
    this.model.get("background_picture").set("license", t)
  },
  onPictureChange: function (e, t, n) {
    if (t !== n) {
      if (e.get("picture_size_is_default")) {
        var r = t.get("width"),
          i = t.get("height");
        if (r && i) {
          var s = this.getAutoPictureSize(r, i);
          this.setPictureSize(s)
        }
      }
      if (!t.get("license") && t.isDefaultLicenseable()) {
        var o;
        n && n.isDefaultLicenseable() && (o = n.get("license")) || (o = this.user.get("default_license")), o && t.set("license", o)
      }
      this.updatePhotoPermissionDropdown()
    }
  },
  getAutoPictureSize: function (e, t) {
    return this.model.get("mirror_in") || this.model.get("mirror_out") ? "fill" : this._super(arguments)
  },
  onPictureSizeUserChange: function (e, t) {
    this.model.set("picture_size_is_default", !1)
  },
  onMirrorChange: function (e, t) {
    this.onPictureChange(e, e.get("background_picture"))
  },
  onSmallPicture: Jux.emptyFn,
  setPictureSize: function (e) {
    this.model.set("picture_size", e), this.pictureSizeSelector.select(e)
  },
  onDestroy: function () {
    this.model.un({
      "change:background_picture": this.onPictureChange,
      "change:mirror_in": this.onMirrorChange,
      "change:mirror_out": this.onMirrorChange,
      scope: this
    }), this._super(arguments)
  }
}), app.controllers.quark.edit.AbstractSlideshow = Jux.extend(app.controllers.quark.edit.Quark, {
  abstractClass: !0,
  initialize: function () {
    this._super(arguments);
    var e = this.controlsPanel,
      t = this.model,
      n = this.slidesCollection = t.get("slides"),
      r = this.carousel = e.findById("carousel"),
      i = this.slideEditPanelContainer = e.findById("slideEditPanelContainer"),
      s = this.titleSlideEditPanel = e.findById("titleSlideEditPanel"),
      o = this.generalSlideEditPanel = e.findById("generalSlideEditPanel"),
      u = this.slidesItemSelector = r.getItemSelector(),
      a = this.pictureSelector = e.findById("pictureSelector"),
      f = this.slideTitleField = e.findById("slideTitleField"),
      l = this.slideDescriptionField = e.findById("slideDescriptionField"),
      c = this.pictureSizeSelector = e.findById("pictureSizeSelector"),
      h = this.layoutSelector = e.findById("layoutSelector"),
      p = this.titleSlidePictureSizeSelector = s.findByKey("picture_size");
    this.initSlidesItemSelector(), u.on({
      select: this.onSlideSelect,
      reorder: this.onSlideReorder,
      scope: this
    }), r.on("addbuttonclick", this.onAddSlideClick, this), a.on("picturechange", this.onPictureSelect, this), f.on("keyup", this.onTitleChange, this), l.on("keyup", this.onDescriptionChange, this), c.on("select", this.onPictureSizeSelect, this), c.on("useritemselect", this.onPictureSizeUserChange, this), h.on("select", this.onLayoutChange, this), p.on("useritemselect", this.onCoverPictureSizeUserChange, this), t.on({
      "change:activeItemId": this.onActiveItemIdChange,
      "change:cover_picture": this.onPictureChange,
      scope: this
    }), t.get("slides").on("change:picture", this.onSlidesPictureChange, this)
  },
  initSlidesItemSelector: function () {
    var e = this.slidesItemSelector,
      t = new app.models.Slide({
        id: "",
        picture: {
          url: ""
        }
      });
    e.add(new app.components.controls.itemSelector.ModelItem({
      model: t,
      dragAndDropSortable: !1,
      tpl: '<img src="<% var url = model.get( "picture" ).get( "url" ); if( url ) { %><%=Jux.Magickly.convertImagePathOrUri( url, { thumb: "28x28#" } )%><% } else { %><%=Jux.Cdn.BASE_URI%>assets/icon-titleSlide.png<% } %>" class="listItemImage <% if( !url ) { %>noListItemImage<% } %>" height="28" width="28" />'
    })), e.selectItemAt(0);
    var n = this.slidesCollection.getModels(),
      r = [];
    for (var i = 0, s = n.length; i < s; i++) {
      var o = this.createSlideSelectorItem(n[i]);
      o.on("removebuttonclick", this.onRemoveSlideClick, this), r.push(o)
    }
    e.add(r)
  },
  createSlideModel: Class.abstractMethod,
  createSlideSelectorItem: Class.abstractMethod,
  onSlideSelect: function (e, t) {
    var n = t.getModel(),
      r = n.getId(),
      i = this.slideEditPanelContainer.getLayout();
    this.model.set("activeItemId", r), r === "" ? i.setActiveItem(this.titleSlideEditPanel) : (i.setActiveItem(this.generalSlideEditPanel), this.pictureSelector.setPicture(n.get("picture")), this.slideTitleField.setValue(n.get("title")), this.slideDescriptionField.setValue(n.get("description")), this.pictureSizeSelector.select(n.get("picture_size")), this.layoutSelector.select(n.get("layout")))
  },
  onAddSlideClick: function (e) {
    var t = this.createSlideModel();
    this.slidesCollection.add(t);
    var n = this.createSlideSelectorItem(t);
    n.on("removebuttonclick", this.onRemoveSlideClick, this), this.slidesItemSelector.add(n), this.slidesItemSelector.select(n), this.slidesItemSelector.scrollToItem(n)
  },
  onRemoveSlideClick: function (e) {
    var t = this.slidesItemSelector,
      n = t.getItemIndex(e),
      r = t.getCount(),
      i = e.getModel(),
      s = n < r - 1 ? n : n - 1;
    this.slidesCollection.remove(i), t.remove(e), t.selectItemAt(s)
  },
  onSlideReorder: function (e, t, n, r) {
    var i = this.slidesCollection,
      s = app.components.controls.itemSelector.ModelItem,
      o = t instanceof s ? t.getModel() : null;
    if (o && i.has(o)) {
      var u = 0,
        a = e.getItems();
      for (var f = 0; f < n; f++)(!(a[f] instanceof s) || !i.has(a[f].getModel())) && u++;
      i.insert(t.getModel(), n - u)
    }
  },
  onPictureSelect: function (e, t) {
    var n = this.slidesItemSelector.getSelected().getModel();
    n.set("picture", t)
  },
  onSlidesPictureChange: function (e, t, n, r) {
    this.onPictureChange(t, n, r)
  },
  onPictureChange: function (e, t, n) {
    if (e.get("picture_size_is_default")) {
      var r = n.get("width"),
        i = n.get("height");
      if (r && i) {
        var s = this.getAutoPictureSize(r, i);
        e.set("picture_size", s), e instanceof app.models.AbstractSlideshow ? this.titleSlidePictureSizeSelector.select(s) : e instanceof app.models.Slide ? e.getId() === this.model.get("activeItemId") && this.pictureSizeSelector.select(s) : console.warn("unknown model in AbstractSlideshow.onPictureChange()")
      }
    }
  },
  onTitleChange: function (e, t) {
    var n = this.slidesItemSelector.getSelected().getModel();
    n.set("title", e.getValue())
  },
  onDescriptionChange: function (e, t) {
    var n = this.slidesItemSelector.getSelected().getModel();
    n.set("description", e.getValue())
  },
  onPictureSizeSelect: function (e, t) {
    var n = this.slidesItemSelector.getSelected().getModel();
    n.set("picture_size", t.getValue())
  },
  onPictureSizeUserChange: function (e, t) {
    var n = this.slidesItemSelector.getSelected().getModel();
    n.set("picture_size_is_default", !1)
  },
  onCoverPictureSizeUserChange: function (e, t) {
    this.model.set("picture_size_is_default", !1)
  },
  onLayoutChange: function (e, t) {
    var n = this.slidesItemSelector.getSelected().getModel();
    n.set("layout", t.getValue())
  },
  onActiveItemIdChange: function (e, t) {
    if (t === "") this.slidesItemSelector.selectItemAt(0);
    else {
      var n = this.slidesItemSelector.getItems();
      for (var r = 0, i = n.length; r < i; r++) {
        var s = n[r];
        if (s instanceof app.components.controls.itemSelector.ModelItem && s.getModel().getId() === t) {
          this.slidesItemSelector.select(s);
          break
        }
      }
    }
  },
  onDestroy: function () {
    this.model.un({
      "change:activeItemId": this.onActiveItemIdChange,
      "change:cover_picture": this.onPictureChange,
      scope: this
    }), this.model.get("slides").un("change:picture", this.onSlidesPictureChange, this), this.slidesItemSelector.un({
      select: this.onSlideSelect,
      reorder: this.onSlideReorder,
      scope: this
    }), this._super(arguments)
  }
}), app.controllers.quark.edit.Multiquark = Jux.extend(app.controllers.quark.edit.Quark, {
  quarkItemTpl: '<img src="<% var url = model.getPreviewPicture().get( "url" ); if( url ) { %><%=Jux.Magickly.convertImagePathOrUri( url, { thumb: "28x28#" } )%><% } else { %><%=Jux.Cdn.BASE_URI%>assets/icon-titleSlide.png<% } %>" class="listItemImage <% if( !url ) { %>noListItemImage<% } %>" height="28" width="28" />',
  initialize: function () {
    this._super(arguments);
    var e = this.model;
    this.childQuarkEditors = {}, this.childQuarkControllers = {}, this.childQuarks = e.get("quarks");
    var t = this.carousel = this.controlsPanel.findById("carousel"),
      n = this.quarksItemSelector = t.getItemSelector(),
      r = this.quarkEditContainer = this.controlsPanel.findById("quarkEditContainer");
    t.on("addbuttonclick", this.onAddQuarkClick, this), this.initQuarkEditors(), this.initQuarksItemSelector(), this.updateQuarkRemoveButtons(), this.updateAuthorAndDateVisibilities(), e.set("selectedQuark", this.childQuarks.getAt(0)), e.on({
      "change:selectedQuark": this.onSelectedQuarkChange,
      "change:sort_time": this.onSortTimeChange,
      "change:author_enabled": this.updateAuthorAndDateVisibilities,
      "change:show_posted_time": this.updateAuthorAndDateVisibilities,
      scope: this
    }), n.on({
      select: this.onQuarkSelect,
      reorder: this.onQuarkReorder,
      scope: this
    })
  },
  initQuarkEditors: function () {
    var e = this.model,
      t = e.get("quarks").getModels();
    for (var n = 0, r = t.length; n < r; n++) this.addQuarkEditor(t[n])
  },
  initQuarksItemSelector: function () {
    var e = this.quarksItemSelector,
      t = this.childQuarks.getModels(),
      n = [];
    for (var r = 0, i = t.length; r < i; r++) n.push(this.createQuarkSelectorItem(t[r]));
    e.add(n), e.selectItemAt(0)
  },
  createQuarkModel: function (e) {
    var t = app.Defaults.getQuarkDefaults(e);
    t.type = e, t.owner = this.model.get("owner"), t.sort_time = this.model.get("sort_time");
    var n = this.childQuarks.getLast();
    return t.picture_size = n.get("picture_size"), t.layout = n.get("layout"), t.text_alignment = n.get("text_alignment"), t.color_scheme = Kevlar.util.Object.clone(n.get("color_scheme")), t.title_font = Kevlar.util.Object.clone(n.get("title_font")), t.text_font = Kevlar.util.Object.clone(n.get("text_font")), t.font_effect = Kevlar.util.Object.clone(n.get("font_effect")), app.models.Quark.fromJSON(t)
  },
  createQuarkSelectorItem: function (e) {
    return new app.views.palette.controls.carousel.CarouselItem({
      model: e,
      tpl: this.quarkItemTpl,
      listeners: {
        removebuttonclick: this.onRemoveQuarkClick,
        scope: this
      }
    })
  },
  addQuarkEditor: function (e) {
    var t = e.get("layout_name"),
      n = _.capitalize(t),
      r = app.views.quark[t].paletteManifest,
      i = new ui.Container(r);
    this.setUpControlsContainer(i), this.quarkEditContainer.add(i);
    var s = new app.controllers.quark.edit[n]({
      model: e,
      user: this.user,
      controlsPanel: i,
      parentCollection: this.model.get("quarks")
    }),
      o = e.getClientId();
    this.childQuarkEditors[o] = i, this.childQuarkControllers[o] = s
  },
  removeQuarkEditor: function (e) {
    var t = e.getClientId();
    this.childQuarkControllers[t].destroy(), this.childQuarkEditors[t].destroy()
  },
  onQuarkSelect: function (e, t) {
    var n = t.getModel(),
      r = n.getId(),
      i = this.quarkEditContainer.getLayout();
    i.setActiveItem(this.childQuarkEditors[n.getClientId()]), this.model.set("selectedQuark", n)
  },
  onAddQuarkClick: function (e) {
    var t = this.createQuarkModel("article");
    this.childQuarks.add(t), this.addQuarkEditor(t);
    var n = this.createQuarkSelectorItem(t);
    this.quarksItemSelector.add(n), this.quarksItemSelector.select(n), this.quarksItemSelector.scrollToItem(n), this.updateQuarkRemoveButtons(), this.updateAuthorAndDateVisibilities(), this.controlsPanel.doLayout()
  },
  onRemoveQuarkClick: function (e) {
    var t = this.quarksItemSelector,
      n = t.getItemIndex(e),
      r = t.getCount(),
      i = e.getModel(),
      s = n < r - 1 ? n : n - 1;
    this.removeQuarkEditor(i), this.childQuarks.remove(i), t.remove(e), t.selectItemAt(s), this.updateQuarkRemoveButtons(), this.updateAuthorAndDateVisibilities(), this.controlsPanel.doLayout()
  },
  onQuarkReorder: function (e, t, n, r) {
    var i = this.childQuarks,
      s = app.components.controls.itemSelector.ModelItem,
      o = t instanceof s ? t.getModel() : null;
    if (o && i.has(o)) {
      var u = 0,
        a = e.getItems();
      for (var f = 0; f < n; f++)(!(a[f] instanceof s) || !i.has(a[f].getModel())) && u++;
      i.insert(t.getModel(), n - u)
    }
    this.updateAuthorAndDateVisibilities()
  },
  onSelectedQuarkChange: function (e, t) {
    var n = this.quarksItemSelector,
      r = n.getSelected();
    r.getModel() !== t && n.select(t)
  },
  onSortTimeChange: function (e, t) {
    var n = this.childQuarks.getModels();
    for (var r = 0, i = n.length; r < i; r++) n[r].set("sort_time", t)
  },
  updateQuarkRemoveButtons: function () {
    var e = this.quarksItemSelector,
      t = e.getCount();
    if (t === 1) e.getItemAt(0).hideRemoveButton();
    else
      for (var n = 0; n < t; n++) e.getItemAt(n).showRemoveButton()
  },
  updateAuthorAndDateVisibilities: function () {
    var e = this.model,
      t = this.childQuarks.getModels();
    t[0].set({
      author_enabled: e.get("author_enabled"),
      show_posted_time: e.get("show_posted_time")
    });
    for (var n = 1, r = t.length; n < r; n++) t[n].set({
      author_enabled: !1,
      show_posted_time: !1
    })
  },
  onDestroy: function () {
    this.model.un({
      "change:selectedQuark": this.onSelectedQuarkChange,
      "change:sort_time": this.onSortTimeChange,
      "change:author_enabled": this.updateAuthorAndDateVisibilities,
      "change:show_posted_time": this.updateAuthorAndDateVisibilities,
      scope: this
    }), this.quarksItemSelector.un({
      select: this.onQuarkSelect,
      reorder: this.onQuarkReorder,
      scope: this
    });
    var e = this.childQuarkControllers,
      t = this.childQuarkEditors;
    for (var n in e) e.hasOwnProperty(n) && (e[n].destroy(), t[n].destroy());
    this._super(arguments)
  }
}), app.controllers.quark.edit.Article = Jux.extend(app.controllers.quark.edit.AbstractMonoQuark, {
  getAutoPictureSize: function (e, t) {
    var n = e / t,
      r = n < .8,
      i = n >= .8 && n < 1.2,
      s = n >= 1.2 && n < 2,
      o = n < .8,
      u = n >= 2 && n < 2.3,
      a = n >= 2.3,
      f;
    return this.model.get("layout") === "center" && (o || e < 1200 || t < 500 ? f = "frame" : u && e > 1200 && t > 500 ? f = "fitWide" : a && e > 1200 && t > 500 && (f = "fit")), !f && i && e > 900 && t > 600 && (f = "fitWide"), f || this._super(arguments)
  }
}), app.controllers.quark.edit.Blockquote = Jux.extend(app.controllers.quark.edit.AbstractMonoQuark, {
  initialize: function () {
    this._super(arguments), this.textField = this.controlsPanel.findByKey("text")
  },
  onPictureChange: function (e, t) {
    this._super(arguments);
    var n = e.get("text"),
      r = t.get("title") || "";
    if (r && (!n || n === this.textField.getEmptyText()) || e.get("importedText")) e.set("text", r), this.textField.setValue(r)
  }
}), app.controllers.quark.edit.Countdown = Jux.extend(app.controllers.quark.edit.AbstractSlideshow, {
  slideItemTpl: '<img src="<% var url = model.get( "picture" ).get( "url" ); if( url ) { %><%=Jux.Magickly.convertImagePathOrUri( url, { thumb: "28x28#" } )%><% } else { %><%=Jux.Cdn.BASE_URI%>assets/icon-titleSlide.png<% } %>" class="listItemImage <% if( !url ) { %>noListItemImage<% } %>" height="28" width="28" />',
  createSlideModel: function () {
    return new app.models.Slide({
      picture: app.Defaults.getQuarkDefault("countdown", "picture")
    })
  },
  createSlideSelectorItem: function (e) {
    return new app.views.palette.controls.carousel.CarouselItem({
      model: e,
      tpl: this.slideItemTpl
    })
  }
}), app.controllers.quark.edit.Creation = Jux.extend(app.controllers.quark.edit.Multiquark, {
  MAX_SUB_QUARKS: 15,
  initialize: function () {
    this._super(arguments), this.model.on("change:activeItemId", this.onActiveItemChange, this), this.currentFirstQuark = this.getFirstQuark(), this.setupGenreAndMoodSelector(), this.model.get("quarks").on({
      add: this.onCollectionSizeChange,
      remove: this.onCollectionSizeChange,
      scope: this
    }), this.onCollectionSizeChange()
  },
  onQuarkReorder: function () {
    this._super(arguments), this.currentFirstQuark !== this.getFirstQuark() && (this.transferModelValue({
      key: "title",
      propertyReceiver: this.getFirstQuark(),
      propertyGiver: this.currentFirstQuark,
      replaceGiversValueWith: ""
    }), this.currentFirstQuark = this.getFirstQuark())
  },
  onCollectionSizeChange: function () {
    this.canAddQuarks() ? this.carousel.showAddButton() : this.carousel.hideAddButton()
  },
  transferModelValue: function (e) {
    var t = e.propertyReceiver,
      n = e.propertyGiver,
      r = e.replaceGiversValueWith,
      i = e.key,
      s = e.receiverKey || i;
    t.set(i, n.get(i)), typeof replaceGiversWith != "undefined" && n.set(i, r)
  },
  getFirstQuark: function () {
    return this.model.get("quarks").getFirst()
  },
  onActiveItemChange: function (e) {
    var t = this.model.get("activeItemId"),
      n = this.model.get("quarks").getById(t),
      r = this.quarkEditContainer.getLayout();
    r.container && !! n && n !== this.currentActiveModel && (r.setActiveItem(this.childQuarkEditors[n.getClientId()]), this.quarksItemSelector.select(n))
  },
  onAddQuarkClick: function () {
    this.canAddQuarks() && this._super(arguments)
  },
  canAddQuarks: function () {
    return this.getSubQuarkCount() + 1 <= this.MAX_SUB_QUARKS
  },
  getSubQuarkCount: function () {
    return this.model.get("quarks").getCount()
  },
  createQuarkModel: function () {
    var e = this._super(arguments);
    return e.set("parentQuark", this.model), e
  },
  onQuarkSelect: function (e, t) {
    var n = t.getModel(),
      r = n.getId();
    this.currentActiveModel = n, this.model.set("activeItemId", r), this._super(arguments)
  },
  setupGenreAndMoodSelector: function () {
    this.genreAndMoodSelector = this.controlsPanel.findById("genreMoodSelector"), this.setMoodToValueOnModel(), this.setGenreToValueOnModel(), this.genreAndMoodSelector.on("genre-select", this.onGenreSelect, this), this.genreAndMoodSelector.on("mood-select", this.onMoodSelect, this)
  },
  setGenreToValueOnModel: function () {
    this.genreAndMoodSelector.selectGenre(this.model.get("genre"))
  },
  setMoodToValueOnModel: function () {
    this.genreAndMoodSelector.selectMood(this.model.get("mood"))
  },
  onMoodSelect: function (e, t, n) {
    this.model.set("mood", n)
  },
  onGenreSelect: function (e, t, n) {
    var r = t.getAvailableMoods(),
      i = this.model.get("mood");
    _.contains(r, i) || this.model.set("mood", r[0]), this.model.set("genre", n)
  },
  onDestroy: function () {
    this.model.un("change:activeItemId", this.onActiveItemChange, this), this.model.get("quarks").un({
      add: this.onCollectionSizeChange,
      remove: this.onCollectionSizeChange,
      scope: this
    }), this._super(arguments)
  }
}), app.controllers.quark.edit.CreationSubchild = Jux.extend(app.controllers.quark.edit.Quark, {
  initialize: function () {
    this._super(arguments), this.toggleTitleBox(), this.parentCollection.on("reorder", this.toggleTitleBox, this)
  },
  toggleTitleBox: function () {
    var e = this.parentCollection.indexOf(this.model),
      t = this.titleArea || this.controlsPanel.findById("titleArea"),
      n = this.subtitleArea || this.controlsPanel.findById("subtitleArea");
    t && n && (e > 0 ? (n.hide(), t.hide()) : (n.show(), t.show()))
  }
}), app.controllers.quark.edit.Photo = Jux.extend(app.controllers.quark.edit.AbstractMonoQuark, {
  initialize: function () {
    this._super(arguments), this.captionField = this.controlsPanel.findByKey("caption")
  },
  onPictureChange: function (e, t) {
    this._super(arguments);
    var n = e.get("caption"),
      r = t.get("title") || "";
    if (r && (!n || n === this.captionField.getEmptyText()) || e.get("importedCaption")) e.set("caption", r), this.captionField.setValue(r)
  },
  getAutoPictureSize: function (e, t) {
    var n = e / t,
      r = n < .8,
      i = n >= .8 && n < 1.2,
      s = n >= 1.2 && n < 2,
      o = n < .8,
      u = n >= 2 && n < 2.3,
      a = n >= 2.3,
      f;
    return this.model.get("layout") === "center" && (o || e < 1200 || t < 500 ? f = "frame" : u && e > 1200 && t > 500 ? f = "fitWide" : a && e > 1200 && t > 500 && (f = "fit")), !f && i && e > 900 && t > 600 && (f = "fitWide"), f || this._super(arguments)
  },
  onSmallPicture: function () {
    this.setPictureSize("frame")
  }
}), app.controllers.quark.edit.QuarkPalette = Jux.extend(app.controllers.PaletteController, {
  initialize: function () {
    this._super(arguments);
    if (!this.model) throw new Error("'model' config required");
    if (!this.currentUser) throw new Error("'currentUser' config required");
    var e = this.model.get("layout_name"),
      t = _.capitalize(e),
      n = app.views.quark[e].paletteManifest,
      r = this.controlsPanel = new ui.Container(n);
    this.palette.contentContainer.add(r), this.quarkController = new app.controllers.quark.edit[t]({
      model: this.model,
      user: this.currentUser,
      controlsPanel: r,
      listeners: {
        pictureselectorclick: this.onPictureSelectorClick,
        scope: this
      }
    }), this.palette.on({
      emailclick: this.onEmailClick,
      embedclick: this.onEmbedClick,
      facebookclick: this.onFacebookClick,
      tweetclick: this.onTweetClick,
      mediapickerchange: this.onPaletteMediaPickerChange,
      scope: this
    })
  },
  onPictureSelectorClick: function (e, t) {
    this.currentlyEditedControl = t;
    var n = t.getData();
    return this.palette.setMedia(n), this.palette.bringMediaToTop(n), this.palette.showMediaPicker(), !1
  },
  onPaletteMediaPickerChange: function (e, t, n) {
    this.currentlyEditedControl && this.currentlyEditedControl.setData(n)
  },
  onTweetClick: function (e, t) {
    app.Share.tweet(this.model, "quarkPalette")
  },
  onEmailClick: function (e, t) {
    app.Share.email(this.model, "quarkPalette")
  },
  onEmbedClick: function (e, t) {
    var n = this.model.viewingUrl(),
      r = new ui.Dialog({
        modal: !0,
        cls: "controlsPanel embedDialog",
        title: "Copy this Code in Bed",
        items: {
          type: "Textarea",
          value: '<div style="position:relative"><a style="display: block; width: 100%; height: 100%; min-height: 300px; max-height: 600px; position: absolute;" href="' + n + '"></a>' + '<iframe style="width: 100%; height: 100%; min-height: 300px; max-height: 600px; border: none;" src="' + n + '?sans_gallery=true"></iframe>' + "</div>",
          listeners: {
            render: function (e) {
              e.select()
            }
          }
        },
        buttons: []
      });
    r.open()
  },
  onFacebookClick: function (e, t) {
    app.Share.facebookShare(this.model, "quarkPalette")
  },
  onDestroy: function () {
    this.palette.un({
      emailclick: this.onEmailClick,
      embedclick: this.onEmbedClick,
      facebookclick: this.onFacebookClick,
      tweetclick: this.onTweetClick,
      mediapickerchange: this.onPaletteMediaPickerChange,
      scope: this
    }), this.quarkController.destroy(), this._super(arguments)
  }
}), app.controllers.quark.edit.Slideshow = Jux.extend(app.controllers.quark.edit.AbstractSlideshow, {
  slideItemTpl: '<img src="<% var url = model.get( "picture" ).get( "url" ); if( url ) { %><%=Jux.Magickly.convertImagePathOrUri( url, { thumb: "28x28#" } )%><% } else { %><%=Jux.Cdn.BASE_URI%>assets/icon-titleSlide.png<% } %>" class="listItemImage <% if( !url ) { %>noListItemImage<% } %>" height="28" width="28" />',
  createSlideModel: function () {
    return new app.models.Slide({
      picture: app.Defaults.getQuarkDefault("slideshow", "picture")
    })
  },
  createSlideSelectorItem: function (e) {
    return new app.views.palette.controls.carousel.CarouselItem({
      model: e,
      tpl: this.slideItemTpl
    })
  }
}), app.controllers.quark.edit.Streetview = Jux.extend(app.controllers.quark.edit.Quark, {
  addressMapViewHelpText: "Try dragging man onto map to see if there are street views nearby",
  addressStreetViewHelpText: "Pan around to pick the perfect camera angle",
  addressInvalidHelpText: "Sorry, address not found",
  lastFilledTitleFromAddress: "",
  initialize: function () {
    this._super(arguments);
    var e = this.controlsPanel,
      t = this.model,
      n = this.addressField = e.findByKey("address");
    this.updateAddressHelpText(), n.on("latlngchange", this.onAddressLatLngChange, this), this.titleField = e.findByKey("title"), t.on({
      "change:address": this.onAddressChange,
      "change:lat_lng": this.onLatLngChange,
      "change:mapBounds": this.onMapBoundsChange,
      "change:map_view_visible": function () {
        this.updateAddressHelpText()
      },
      scope: this
    })
  },
  onAddressLatLngChange: function (e, t) {
    t && (this.model.set("lat_lng", {
      lat: t.lat(),
      lng: t.lng()
    }), this.fillTitleField()), this.updateAddressHelpText(t)
  },
  onLatLngChange: function (e, t, n) {
    this.updateAddressHelpText(t)
  },
  onAddressChange: function (e, t, n) {
    this.addressField.setValue(t)
  },
  onMapBoundsChange: function (e, t, n) {
    this.addressField.setBounds(t)
  },
  updateAddressHelpText: function (e) {
    var t = this.addressField,
      n = this.model.get("map_view_visible"),
      r;
    e = typeof e == "undefined" ? this.model.get("lat_lng") : e, e ? r = n ? this.addressMapViewHelpText : this.addressStreetViewHelpText : r = this.addressInvalidHelpText, t.setHelp(r)
  },
  fillTitleField: function () {
    var e = this.titleField,
      t = e.getValue(),
      n;
    if (t === "" || t === e.getEmptyText() || t === this.lastFilledTitleFromAddress) n = this.addressField.getValue(), e.setValue(n), this.lastFilledTitleFromAddress = n
  },
  onDestroy: function () {
    this.model.un({
      "change:address": this.onAddressChange,
      "change:lat_lng": this.onLatLngChange,
      "change:mapBounds": this.onMapBoundsChange,
      scope: this
    }), this._super(arguments)
  }
}), app.controllers.quark.edit.Video = Jux.extend(app.controllers.quark.edit.Quark, {
  refetchVideoDataCount: 3,
  initialize: function () {
    this._super(arguments), this.currentRetryCount = this.refetchVideoDataCount, this.titleField = this.controlsPanel.findByKey("title"), this.descriptionField = this.controlsPanel.findByKey("description"), this.controlsPanel.findByKey("youtube_link").on("focus", this.onPaletteFieldFocus, this), this.titleField.on("focus", this.onPaletteFieldFocus, this), this.descriptionField.on("focus", this.onPaletteFieldFocus, this), this.pictureSelector = this.controlsPanel.findByKey("background_picture"), this.pictureSelector.on("beforeBeforeClickEvt", this.setPictureSelection, this), this.pictureSelector.on("removeButtonClicked", this.removePicture, this), this.setPictureSelection(!0), this.model.on({
      "change:youtube_link": this.onYoutubeLinkChange,
      metadataUpdated: this.validateVideoDimensions,
      scope: this
    }), this.validateVideoDimensions()
  },
  setPictureSelection: function (e) {
    var t = this.model.get("background_picture");
    t && (t = t.get("picture"));
    if (!t) {
      if (e === !0) {
        this.pictureSelector.setRemoveButtonVisibility(!1);
        return
      }
      t = new app.models.Picture(app.Defaults.getQuarkDefaults("video").background_picture)
    }
    this.pictureSelector.setPicture(new app.models.PictureWithOptions({
      picture: t,
      chosen_center: ""
    }))
  },
  removePicture: function () {
    this.model.set("background_picture", null), this.pictureSelector.showEmptyImage()
  },
  onPaletteFieldFocus: function (e) {
    this.model.set("autoPlay", !1)
  },
  onYoutubeLinkChange: function (e, t, n) {
    var r, i;
    this.currentRetryCount = this.refetchVideoDataCount;
    if (r = app.views.quark.video.player.VimeoPlayer.parseVideoId(t)) i = "vimeo";
    else if (r = app.views.quark.video.player.YoutubePlayer.parseVideoId(t)) i = "youtube";
    if (r && i) {
      var s = {
        media_id: r,
        service: i
      };
      i === "youtube" && (s.thumbnail_url = "http://img.youtube.com/vi/" + r + "/hqdefault.jpg"), this.model.set("property_set", s), this.model.updateMetadata().done(this.updateControlPanelWithVideoData.createDelegate(this))
    } else this.model.set("youtube_link", n)
  },
  updateControlPanelWithVideoData: function () {
    var e = this.model.get("property_set"),
      t = Jux.Util.ellipsis(e.get("title") || "", 120),
      n = Jux.Util.ellipsis(e.get("description") || "", 1200);
    this.titleField.setValue(t), this.descriptionField.setValue(n)
  },
  validateVideoDimensions: function () {
    var e = this.model.get("property_set");
    e && !e.get("dimensions") && !e.get("thumbnail_url") && (Jux.log("Video Dimensions Null - Regrabbing dimension data only..."), this.currentRetryCount && (this.model.updateMetadata(!0).done(this.updateControlPanelWithVideoData.createDelegate(this)), this.currentRetryCount--))
  }
}), app.views.PaletteOpenButton = Class.extend(Jux.util.Observable, {
  constructor: function (e) {
    Jux.apply(this, e);
    if (!this.renderTo) throw new Error("'renderTo' config required");
    this._super(arguments), this.editButton = new ui.Button({
      elId: "editButton",
      renderTo: this.renderTo,
      cls: "nav-button",
      primaryIcon: "jux-icon-pencil",
      tooltip: "Edit",
      handler: this.onEditButtonClick,
      scope: this
    }), this.editButton.$el.prependTo(this.renderTo), this.setPalette(this.palette)
  },
  setPalette: function (e) {
    this.palette && this.palette.un({
      open: this.onPaletteOpen,
      close: this.onPaletteClose,
      scope: this
    }), this.palette = e, e && e.on({
      open: this.onPaletteOpen,
      close: this.onPaletteClose,
      scope: this
    })
  },
  hide: function () {
    this.editButton.hide()
  },
  show: function () {
    this.editButton.show()
  },
  openPalette: function () {
    this.open = !0, this.palette.open()
  },
  closePalette: function () {
    this.open = !1, this.palette.close()
  },
  onEditButtonClick: function () {
    this.openPalette()
  },
  onPaletteOpen: function () {
    this.editButton.hide()
  },
  onPaletteClose: function () {
    this.editButton.getEl().fadeIn(500, "easeInOutQuint")
  },
  destroy: function () {
    this.palette.un({
      open: this.onPaletteOpen,
      close: this.onPaletteClose,
      scope: this
    }), this.editButton.destroy()
  }
}), app.views.palette.NavigablePanel = ui.Container.extend({
  initComponent: function () {
    this.addEvents("backclick");
    if (!this.items) throw new Error("'items' config required");
    Jux.isArray(this.items) || (this.items = [this.items]), this.backButton = new ui.Button({
      text: '<span class="jux-icon jux-icon-back"></span> Back',
      cls: "btn-back",
      handler: this.onBackButtonClick,
      scope: this
    }), this.items.push({
      type: "Section",
      cls: "backButtonSection",
      items: this.backButton
    }), this._super(arguments), this.addCls("navigablePanel")
  },
  onBackButtonClick: function () {
    this.fireEvent("backclick", this)
  }
}), app.views.palette.Palette = Jux.extend(ui.Dialog, {
  autoDestroy: !1,
  closeButton: !1,
  closeOnEscape: !1,
  modal: !1,
  initComponent: function () {
    if (!this.user) throw new Error("'user' config required");
    this.cls += " palette", this.addEvents("datachange", "mediapickerchange"), this.historyStack = [];
    var e = {
      closeButton: new ui.toolButtons.CloseButton({
        size: "tiny",
        handler: function () {
          this.close()
        },
        scope: this
      }),
      layout: {
        type: "cards",
        autoSize: !0,
        activeItem: 0,
        deferredRender: !1,
        transition: new ui.layout.CardsLayout.SlideTransition
      },
      items: this.getInitialItems()
    };
    Jux.apply(this, e), this._super(arguments);
    var t = this.getDataControls();
    for (var n = 0, r = t.length; n < r; n++) t[n].on("datachange", this.onDataChange, this)
  },
  getInitialItems: function () {
    return this.contentContainer = new ui.Container({
      items: this.items
    }), this.mediaPicker = new app.components.mediaPicker.MediaPicker({
      user: this.user,
      listeners: {
        mediachange: this.onMediaPickerMediaChange,
        scope: this
      }
    }), this.mediaPickerPanel = new app.views.palette.NavigablePanel({
      items: this.mediaPicker,
      listeners: {
        backclick: function () {
          this.showPreviousPanel(), this.mediaPicker.setMedia(this.mediaPicker.getMedia())
        },
        scope: this
      }
    }), this.profileCustomizer = this.getProfileCustomizer(), [this.contentContainer, this.mediaPickerPanel, this.profileCustomizer]
  },
  getProfileCustomizer: Jux.abstractFn,
  onRender: function () {
    this._super(arguments), Jux.FontLoader.load("Cabin");
    var e = this.findById("showProfileCustomizer");
    e.on("click", this.showProfileCustomizer, this), (Jux.isIE || Jux.isTouch) && this.$dialogOuter.append('<div class="alphaBanner" />')
  },
  onOpen: function () {
    this._super(arguments);
    var e = this.getPosition();
    e.bottom < e.top && this.setPosition(this.x, "center")
  },
  showMediaPicker: function () {
    this.showPanel(this.mediaPickerPanel)
  },
  showProfileCustomizer: function () {
    this.showPanel(this.profileCustomizer)
  },
  setMedia: function (e) {
    this.mediaPicker.setMedia(e)
  },
  bringMediaToTop: function (e) {
    this.mediaPicker.bringMediaToTop(e)
  },
  onMediaPickerMediaChange: function (e, t) {
    this.fireEvent("mediapickerchange", this, e, t)
  },
  showPanel: function (e) {
    var t = this.historyStack,
      n = this.getLayout();
    t.length === 0 && this.contentContainer.getEl().css("opacity", 1).animate({
      opacity: 0
    }, 200), t.push(n.getActiveItem()), n.setActiveItem(e)
  },
  showPreviousPanel: function () {
    var e = this,
      t = this.historyStack,
      n = t.pop(),
      r = t.length === 0,
      i = !1;
    this.getLayout().setActiveItem(n, {
      direction: "left",
      onStep: function (t) {
        r && !i && t.pos >= .85 && (e.contentContainer.getEl().css("opacity", 0).animate({
          opacity: 1
        }, 150), i = !0)
      },
      onComplete: function () {
        r && e.contentContainer.getEl().stop().css("opacity", 1)
      }
    })
  },
  onDataChange: function (e) {
    e.getKey() !== null && this.fireEvent("datachange", this, e)
  }
}), app.views.palette.GalleryPalette = Jux.extend(app.views.palette.Palette, {
  x: -50,
  y: 50,
  width: 368,
  initComponent: function () {
    this._super(arguments), this.addCls("galleryPalette"), this.titleFontCustomizer = this.findById("titleFontCustomizer"), this.authorFontCustomizer = this.findById("authorFontCustomizer"), this.quarktitleFontCustomizer = this.findById("quarktitleFontCustomizer"), this.captionFontCustomizer = this.findById("captionFontCustomizer"), this.textFontCustomizer = this.findById("textFontCustomizer")
  },
  getProfileCustomizer: function () {
    return new app.views.palette.controls.profileCustomizer.GalleryProfileCustomizer({
      title: "Customize your Jux profile",
      user: this.user,
      listeners: {
        backclick: function () {
          this.showPreviousPanel()
        },
        scope: this
      }
    })
  },
  setTitleFontOptions: function (e) {
    this.titleFontCustomizer.setFontOptions(e)
  },
  setTitleFontColorOptions: function (e) {
    this.titleFontCustomizer.setColorOptions(e)
  },
  setAuthorFontOptions: function (e) {
    this.authorFontCustomizer.setFontOptions(e)
  },
  setQuarktitleFontOptions: function (e) {
    this.quarktitleFontCustomizer.setFontOptions(e)
  },
  setCaptionFontOptions: function (e) {
    this.captionFontCustomizer.setFontOptions(e)
  },
  setTextFontOptions: function (e) {
    this.textFontCustomizer.setFontOptions(e)
  }
}), app.views.palette.MultiGalleryPalette = Jux.extend(app.views.palette.GalleryPalette, {
  initComponent: function () {
    var e = 28,
      t = 67,
      n = 100 - e,
      r = 100 - t,
      i = {
        items: {
          layout: "Accordion",
          height: 380,
          items: [{
            title: "Set the Mood",
            items: [{
              type: "Section",
              items: [{
                columnWidth: n + "%",
                type: "ItemSelector",
                key: "theme",
                items: [{
                  cls: "themeIcon day",
                  value: "day",
                  label: "Day"
                }, {
                  cls: "themeIcon dusk",
                  value: "dusk",
                  label: "Dusk"
                }]
              }]
            }, {
              type: "Section",
              items: {
                type: "FontCustomizer",
                label: "Title",
                key: "title_font",
                id: "titleFontCustomizer",
                minSize: 2,
                maxSize: 15,
                step: .1,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }],
                colorOptions: ["#FFFFFF"]
              }
            }, {
              type: "Section",
              items: [{
                type: "Label",
                text: "Author",
                style: {
                  "padding-top": "2px"
                }
              }, {
                layout: "columns",
                items: [{
                  columnWidth: t + "%",
                  type: "FontCustomizer",
                  key: "author_font",
                  id: "authorFontCustomizer",
                  minSize: .5,
                  maxSize: 6,
                  step: .1,
                  hideFontSizeSlider: !0,
                  hideColorPicker: !0,
                  fontFaceOptions: [{
                    text: "Select...",
                    value: ""
                  }]
                }, {
                  columnWidth: r + "%",
                  type: "ButtonSet",
                  style: {
                    "padding-top": "7px"
                  },
                  key: "show_owner_name",
                  options: [{
                    text: "Show",
                    value: !0
                  }, {
                    text: "Hide",
                    value: !1
                  }]
                }]
              }]
            }, {
              type: "Section",
              id: "customizeProfileSection",
              layout: "columns",
              items: [{
                columnWidth: t + "%",
                type: "Label",
                text: "Profile",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: r + "%",
                type: "button",
                id: "showProfileCustomizer",
                text: "Customize"
              }]
            }]
          }, {
            title: "Style Posts",
            items: [{
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "25%",
                type: "Label",
                text: "Titles"
              }, {
                columnWidth: "70%",
                type: "FontCustomizer",
                key: "quark_title_font",
                id: "quarktitleFontCustomizer",
                hideFontSizeSlider: !0,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "25%",
                type: "Label",
                text: "Captions"
              }, {
                columnWidth: "70%",
                type: "FontCustomizer",
                key: "caption_font",
                id: "captionFontCustomizer",
                hideFontSizeSlider: !0,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "25%",
                type: "Label",
                text: "Text"
              }, {
                columnWidth: "70%",
                type: "FontCustomizer",
                key: "text_font",
                id: "textFontCustomizer",
                hideFontSizeSlider: !0,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }]
              }]
            }]
          }]
        }
      };
    Jux.apply(this, i), this._super(arguments)
  }
}), app.views.palette.UserGalleryPalette = Jux.extend(app.views.palette.GalleryPalette, {
  initComponent: function () {
    var e = 28,
      t = 67,
      n = 100 - e,
      r = 100 - t,
      i = {
        items: {
          layout: "Accordion",
          height: 475,
          items: [{
            title: "Set the Mood",
            items: [{
              type: "Section",
              items: [{
                columnWidth: n + "%",
                type: "ItemSelector",
                key: "theme",
                items: [{
                  cls: "themeIcon day",
                  value: "day",
                  label: "Day"
                }, {
                  cls: "themeIcon dusk",
                  value: "dusk",
                  label: "Dusk"
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              cls: "headerLookToggle",
              items: [{
                columnWidth: "30%",
                type: "Label",
                text: "Header layout"
              }, {
                columnWidth: "70%",
                type: "ItemSelector",
                key: "fullview_heading_look",
                items: [{
                  cls: "fullviewHeadingLookType fullviewHeadingLookType-overlay",
                  value: "overlay"
                }, {
                  cls: "fullviewHeadingLookType fullviewHeadingLookType-horizontal",
                  value: "horizontal"
                }, {
                  cls: "fullviewHeadingLookType fullviewHeadingLookType-vertical",
                  value: "vertical"
                }, {
                  cls: "fullviewHeadingLookType fullviewHeadingLookType-verticalWide",
                  value: "verticalWide"
                }]
              }]
            }, {
              type: "Section",
              items: {
                type: "FontCustomizer",
                label: "Title",
                key: "title_font",
                id: "titleFontCustomizer",
                minSize: 1,
                maxSize: 15,
                step: .1,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }],
                colorOptions: ["#FFFFFF"]
              }
            }, {
              type: "Section",
              cls: "alignToggle",
              layout: "columns",
              items: [{
                columnWidth: "30%",
                type: "Label",
                text: "Text alignment"
              }, {
                columnWidth: "70%",
                type: "ItemSelector",
                key: "text_alignment",
                items: [{
                  cls: "textAlignment textAlignment-center",
                  value: "center"
                }, {
                  cls: "textAlignment textAlignment-left",
                  value: "left"
                }]
              }]
            }, {
              type: "Section",
              items: [{
                type: "Label",
                text: "Author",
                style: {
                  "padding-top": "2px"
                }
              }, {
                layout: "columns",
                items: [{
                  columnWidth: t + "%",
                  type: "FontCustomizer",
                  key: "author_font",
                  id: "authorFontCustomizer",
                  hideFontSizeSlider: !0,
                  hideColorPicker: !0,
                  fontFaceOptions: [{
                    text: "Select...",
                    value: ""
                  }]
                }, {
                  columnWidth: r + "%",
                  type: "ButtonSet",
                  style: {
                    "padding-top": "7px"
                  },
                  key: "show_owner_name",
                  options: [{
                    text: "Show",
                    value: !0
                  }, {
                    text: "Hide",
                    value: !1
                  }]
                }]
              }]
            }, {
              type: "Section",
              id: "customizeProfileSection",
              layout: "columns",
              items: [{
                columnWidth: t + "%",
                type: "Label",
                text: "Profile",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: r + "%",
                type: "button",
                id: "showProfileCustomizer",
                text: "Customize"
              }]
            }]
          }, {
            title: "Style Posts",
            items: [{
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "25%",
                type: "Label",
                text: "Titles"
              }, {
                columnWidth: "75%",
                type: "FontCustomizer",
                key: "quark_title_font",
                id: "quarktitleFontCustomizer",
                hideFontSizeSlider: !0,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "25%",
                type: "Label",
                text: "Captions"
              }, {
                columnWidth: "75%",
                type: "FontCustomizer",
                key: "caption_font",
                id: "captionFontCustomizer",
                hideFontSizeSlider: !0,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: "25%",
                type: "Label",
                text: "Text"
              }, {
                columnWidth: "75%",
                type: "FontCustomizer",
                key: "text_font",
                id: "textFontCustomizer",
                hideFontSizeSlider: !0,
                hideColorPicker: !0,
                fontFaceOptions: [{
                  text: "Select...",
                  value: ""
                }]
              }]
            }, {
              type: "Section",
              layout: "columns",
              items: [{
                columnWidth: t + "%",
                type: "Label",
                text: "Author",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: r + "%",
                type: "ButtonSet",
                key: "show_quark_owner_names",
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
                columnWidth: t + "%",
                type: "Label",
                text: "Date",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: r + "%",
                type: "ButtonSet",
                key: "show_dates",
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
                columnWidth: t + "%",
                type: "Label",
                text: "Views",
                style: {
                  "padding-top": "2px"
                }
              }, {
                columnWidth: r + "%",
                type: "ButtonSet",
                key: "show_view_counts",
                options: [{
                  text: "Show",
                  value: !0
                }, {
                  text: "Hide",
                  value: !1
                }]
              }]
            }]
          }]
        }
      };
    Jux.apply(this, i), this._super(arguments)
  }
}), app.views.palette.QuarkPalette = Jux.extend(app.views.palette.Palette, {
  x: -50,
  y: 50,
  initComponent: function () {
    this.addEvents("doneclick", "emailclick", "embedclick", "facebookclick", "tweetclick");
    var e = new ui.Button({
      text: 'Email <span class="jux-icon jux-icon-email-f"></span>',
      elType: "a",
      cls: "emailButton",
      id: "emailButton",
      listeners: {
        click: function (e) {
          this.fireEvent("emailclick", this, e)
        },
        scope: this
      }
    }),
      t = new ui.Button({
        text: "Embed",
        cls: "embedButton",
        id: "embedButton",
        listeners: {
          click: function (e) {
            this.fireEvent("embedclick", this, e)
          },
          scope: this
        }
      }),
      n = new ui.Button({
        text: 'Share <span class="jux-icon jux-icon-facebook-f"></span>',
        cls: "facebookButton",
        id: "facebookButton",
        listeners: {
          click: function (e) {
            this.fireEvent("facebookclick", this, e)
          },
          scope: this
        }
      }),
      r = new ui.Button({
        text: 'Tweet <span class="jux-icon jux-icon-twitter-t"></span>',
        cls: "tweetButton",
        id: "tweetButton",
        listeners: {
          click: function (e) {
            this.fireEvent("tweetclick", this, e)
          },
          scope: this
        }
      }),
      i = {
        footer: [{
          type: "Button",
          text: "Done",
          cls: "doneButton",
          listeners: {
            click: function (e) {
              this.fireEvent("doneclick", this, e)
            },
            scope: this
          }
        }],
        buttons: [e, t, n, r]
      };
    Jux.apply(this, i), this._super(arguments), this.addCls("quarkPalette")
  },
  getProfileCustomizer: function () {
    return new app.views.palette.controls.profileCustomizer.ProfileCustomizer({
      title: "Customize Your Jux Byline",
      width: 320,
      user: this.user,
      listeners: {
        backclick: function () {
          this.showPreviousPanel()
        },
        scope: this
      }
    })
  },
  showPanel: function (e) {
    this.historyStack.length === 0 && this.bottomBarContainer.getEl().slideUp(), this._super(arguments)
  },
  showPreviousPanel: function () {
    this.historyStack.length === 1 && this.bottomBarContainer.getEl().slideDown(), this._super(arguments)
  }
}), app.views.palette.controls.LinkItem = Class.extend(ui.Container, {
  abstractClass: !0,
  linkValue: "",
  linkVisible: !0,
  showHideOption: !0,
  initComponent: function () {
    this.addEvents("change", "deleteclick"), this.cls += " linkItem";
    var e = this.getLabelComponent(),
      t = this.getValueComponent();
    this.showHideButtonSet = new ui.ButtonSet({
      options: [{
        text: "Show",
        value: !0
      }, {
        text: "Hide",
        value: !1
      }],
      value: this.linkVisible,
      hidden: !this.showHideOption,
      listeners: {
        change: this.onShowHideButtonSetChange,
        scope: this
      }
    }), this.deleteButton = new ui.Button({
      cls: "removeButton",
      tooltip: "Remove Link",
      style: {
        "margin-top": "2px"
      },
      handler: this.onDeleteClick,
      scope: this
    });
    var n = {
      layout: "columns",
      items: [Jux.apply(e, {
        columnWidth: "22%",
        style: Jux.apply({}, e.style, {
          "margin-right": "5px"
        })
      }), Jux.apply(t, {
        columnWidth: "43%",
        style: Jux.apply({}, t.style, {
          "margin-right": "6px"
        })
      }), Jux.apply(this.showHideButtonSet, {
        columnWidth: "28%"
      }), Jux.apply(this.deleteButton, {
        columnWidth: "7%"
      })]
    };
    Jux.apply(this, n), this._super(arguments)
  },
  getLabelComponent: Class.abstractMethod,
  getLinkLabel: Class.abstractMethod,
  getValueComponent: Class.abstractMethod,
  getLinkValue: Class.abstractMethod,
  isLinkVisible: function () {
    return this.showHideButtonSet.getValue()
  },
  onShowHideButtonSetChange: function (e, t) {
    this.fireEvent("change", this)
  },
  onDeleteClick: function () {
    this.fireEvent("deleteclick", this)
  }
}), app.views.palette.controls.PermanentLinkItem = Class.extend(app.views.palette.controls.LinkItem, {
  abstractClass: !0,
  initComponent: function () {
    if (!this.linkLabel) throw new Error("'linkLabel' config required");
    this.linkLabelCmp = new ui.Label({
      text: this.linkLabel,
      style: {
        "margin-top": "4px"
      }
    }), this._super(arguments), this.deleteButton.hide()
  },
  getLabelComponent: function () {
    return this.linkLabelCmp
  },
  getLinkLabel: function () {
    return this.linkLabel
  }
}), app.views.palette.controls.ServiceLinkItem = Class.extend(app.views.palette.controls.PermanentLinkItem, {
  initComponent: function () {
    this.authButton = new ui.Button({
      text: "",
      listeners: {
        click: this.onAuthClick,
        scope: this
      }
    }), this.updateAuthButtonText(), this._super(arguments)
  },
  getServiceName: Jux.abstractFn,
  isAuthRequired: Jux.abstractFn,
  getValueComponent: function () {
    return this.authButton
  },
  getLinkValue: Jux.emptyFn,
  onAuthClick: function () {
    var e = this.getServiceName();
    this.isAuthRequired() ? app.helpers.OmniAuthorizer.authorize(e, {
      width: 1098,
      height: 674,
      success: function () {
        this.showHideButtonSet.setValue(!0), Jux.Analytics.trackConnectSocial(e)
      },
      error: function () {
        this.authButton.setText("Connect failed - Retry")
      },
      scope: this,
      user: this.user
    }) : app.helpers.OmniAuthorizer.deauthorize(e, {
      user: this.user,
      success: function () {
        Jux.Analytics.trackDisconnectSocial(e)
      }
    })
  },
  updateAuthButtonText: function () {
    var e = this.isAuthRequired() ? "Connect" : "Disconnect";
    this.authButton.setText(e)
  }
}), app.views.palette.controls.profileCustomizer.ProfileCustomizer = app.views.palette.NavigablePanel.extend({
  initComponent: function () {
    this.items = this.getInitialItems(), this.title && (this.items = {
      layout: "Accordion",
      items: [{
        title: this.title,
        items: this.items
      }]
    }), this._super(arguments), this.addCls("profileCustomizer")
  },
  getInitialItems: function () {
    var e = this.user,
      t = app.views.palette.controls,
      n = new t.DisplaynameLinkItem({
        id: "displayname",
        user: e
      }),
      r = new t.EmailLinkItem({
        id: "email",
        linkLabel: "Email",
        linkValue: e.get("email"),
        linkVisible: e.get("show_email"),
        listeners: {
          change: function (e) {
            var t = e.isLinkVisible();
            this.user.set("show_email", t)
          },
          scope: this
        }
      }),
      i = new t.FacebookLinkItem({
        id: "facebook",
        user: e
      }),
      s = new t.TwitterLinkItem({
        id: "twitter",
        user: e
      });
    return [{
      type: "Section",
      items: n
    }, {
      type: "Section",
      items: [r, i, s]
    }]
  }
}), app.views.palette.controls.CustomLinkItem = Class.extend(app.views.palette.controls.LinkItem, {
  labelFieldEmptyText: "",
  valueFieldEmptyText: "",
  initComponent: function () {
    this.labelField = new ui.formFields.TextField({
      cls: "customLinkLabel",
      label: this.labelFieldEmptyText,
      labelPosition: "infield",
      value: this.linkLabel,
      listeners: {
        keyup: this.onLinkLabelChange,
        scope: this
      }
    }), this.valueField = new ui.formFields.TextField({
      cls: "customLinkValue",
      label: this.valueFieldEmptyText,
      labelPosition: "infield",
      value: this.linkValue,
      listeners: {
        keyup: this.onLinkValueChange,
        scope: this
      }
    }), this._super(arguments)
  },
  getLabelComponent: function () {
    return this.labelField
  },
  getLinkLabel: function () {
    return this.labelField.getValue()
  },
  getValueComponent: function () {
    return this.valueField
  },
  getLinkValue: function () {
    return this.valueField.getValue()
  },
  onLinkLabelChange: function (e, t) {
    this.fireEvent("change", this)
  },
  onLinkValueChange: function (e, t) {
    this.fireEvent("change", this)
  }
}), app.views.palette.controls.DisplaynameLinkItem = Class.extend(app.views.palette.controls.PermanentLinkItem, {
  linkLabel: "Name",
  initComponent: function () {
    this.displaynameField = new ui.formFields.TextField({
      columnWidth: "66%",
      emptyText: this.user.get("username"),
      value: this.user.get("displayname")
    }), this.displaynameField.on("datachange", this.onFieldChanged, this), this.showHideOption = !1, this._super(arguments), this.user.on("change:displayname", this.onDisplaynameChanged, this)
  },
  onFieldChanged: function () {
    this.user.set("displayname", this.displaynameField.getValue())
  },
  onDisplaynameChanged: function () {
    if (!this.displaynameField.isFocus()) {
      var e = this.user.get("displayname");
      this.displaynameField.setValue(e)
    }
  },
  getValueComponent: function () {
    return this.displaynameField
  },
  getLinkValue: function () {
    return this.linkValue
  }
}), app.views.palette.controls.EmailLinkItem = Class.extend(app.views.palette.controls.PermanentLinkItem, {
  initComponent: function () {
    this.urlLabel = new ui.Label({
      text: this.linkValue,
      style: {
        "margin-top": "4px"
      }
    }), this._super(arguments)
  },
  getValueComponent: function () {
    return this.urlLabel
  },
  getLinkValue: function () {
    return this.linkValue
  }
}), app.views.palette.controls.FacebookLinkItem = Class.extend(app.views.palette.controls.ServiceLinkItem, {
  linkLabel: "Facebook",
  initComponent: function () {
    this.linkVisible = this.user.get("show_facebook_link"), this._super(arguments), _.indexOf(this.user.get("auth_methods"), "password") === -1 && this.user.get("facebook_id") ? this.authButton.setStyle("visibility", "hidden") : (this.user.bind("change:facebook_id", this.updateAuthButtonText, this), this.user.bind("change:facebook_token", this.updateAuthButtonText, this))
  },
  getServiceName: function () {
    return "facebook"
  },
  onShowHideButtonSetChange: function (e, t) {
    this.user.set("show_facebook_link", t)
  },
  isAuthRequired: function () {
    return !this.user.getFacebookUrl()
  }
}), app.views.palette.controls.TwitterLinkItem = Class.extend(app.views.palette.controls.ServiceLinkItem, {
  linkLabel: "Twitter",
  initComponent: function () {
    this.linkVisible = this.user.get("show_twitter_username"), this.user.bind("change:twitter_username", this.updateAuthButtonText, this), this._super(arguments)
  },
  getServiceName: function () {
    return "twitter"
  },
  onShowHideButtonSetChange: function (e, t) {
    this.user.set("show_twitter_username", t)
  },
  isAuthRequired: function () {
    return !this.user.get("twitter_username")
  }
}), app.views.palette.controls.carousel.Carousel = Jux.extend(ui.Container, {
  layout: "columns",
  initComponent: function () {
    this.addEvents("addbuttonclick"), this.cls += " carousel", this.itemSelector = new app.components.controls.itemSelector.ItemSelector({
      allowReorder: !0,
      style: {
        "overflow-x": "auto",
        "white-space": "nowrap"
      },
      listeners: {
        add: this.updateClasses,
        remove: this.updateClasses,
        scope: this
      }
    });
    var e = "";
    switch (this.carouselType) {
    case "slideshow":
      e = "Add Slide";
      break;
    case "countdown":
      e = "Add Item";
      break;
    case "article":
      e = "Add Page";
      break;
    default:
      e = "Add"
    }
    this.addButton = new ui.Button({
      cls: "addItemButton",
      text: e,
      tooltip: "Add new page",
      handler: this.onAddButtonClick,
      scope: this
    }), this.items = [Jux.apply(this.itemSelector, {
      columnWidth: "100%"
    }), Jux.apply(this.addButton, {
      columnWidth: "0"
    })], this._super(arguments)
  },
  onAddButtonClick: function () {
    this.fireEvent("addbuttonclick", this)
  },
  getItemSelector: function () {
    return this.itemSelector
  },
  showAddButton: function () {
    this.addButton && this.addButton.show()
  },
  hideAddButton: function () {
    this.addButton && this.addButton.hide()
  },
  updateClasses: function () {
    var e = this.itemSelector.getCount();
    this.toggleCls("carousel-one-item", e === 1)
  }
}), ui.ComponentManager.registerType("carousel", app.views.palette.controls.carousel.Carousel), app.views.palette.controls.carousel.CarouselArticle = Jux.extend(app.views.palette.controls.carousel.Carousel, {
  carouselType: "article"
}), ui.ComponentManager.registerType("carousel_article", app.views.palette.controls.carousel.CarouselArticle), app.views.palette.controls.carousel.CarouselCountdown = Jux.extend(app.views.palette.controls.carousel.Carousel, {
  carouselType: "countdown"
}), ui.ComponentManager.registerType("carousel_countdown", app.views.palette.controls.carousel.CarouselCountdown), app.views.palette.controls.carousel.CarouselCreation = Jux.extend(app.views.palette.controls.carousel.Carousel, {
  carouselType: "creation"
}), ui.ComponentManager.registerType("carousel_creation", app.views.palette.controls.carousel.CarouselCreation), app.views.palette.controls.carousel.CarouselItem = Jux.extend(app.components.controls.itemSelector.ModelItem, {
  removeButton: !0,
  initComponent: function () {
    this._super(arguments), this.addEvents("removebuttonclick"), this.removeButton = new ui.toolButtons.DeleteButton({
      cls: "removeButton",
      size: "small",
      handler: this.onRemoveButtonClick,
      scope: this
    })
  },
  onRender: function () {
    this._super(arguments), this.removeButton.render(this.$el)
  },
  onRemoveButtonClick: function () {
    this.fireEvent("removebuttonclick", this)
  },
  showRemoveButton: function () {
    this.removeButton.show()
  },
  hideRemoveButton: function () {
    this.removeButton.hide()
  },
  onDestroy: function () {
    this.removeButton.destroy(), this._super(arguments)
  }
}), app.views.palette.controls.carousel.CarouselSlideshow = Jux.extend(app.views.palette.controls.carousel.Carousel, {
  carouselType: "slideshow"
}), ui.ComponentManager.registerType("carousel_slideshow", app.views.palette.controls.carousel.CarouselSlideshow), app.views.palette.controls.profileCustomizer.GalleryProfileCustomizer = app.views.palette.controls.profileCustomizer.ProfileCustomizer.extend({
  getInitialItems: function () {
    var e = this._super(arguments);
    return e.push({
      type: "Section",
      id: "linksContainerSection",
      cls: "linksContainerSection",
      items: [{
        id: "linksContainer"
      }, {
        type: "button",
        id: "addLinkButton",
        text: "Add Link"
      }]
    }), e
  }
});