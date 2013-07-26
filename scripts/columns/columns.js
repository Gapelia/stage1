Modernizr.load([{
		// test need for polyfill
    test: window.matchMedia,
    nope: "matchMedia.js"
  }
]);

var ColumnsDemo = {
  aidPosition: function () {
    var el = $(".position-aid")
    var pos = el.position();
    var minusWidth = 0;

    var minus = el.parent().prevAll().each(function () {
      minusWidth += $(this).width()
    })

    var width = el.width();
    var totalWidth = pos.left - minusWidth + width;
    el.parent().css("width", totalWidth);
  },

  columns: false,
  hyphenated: true,

  toggleHyphenation: function () {
    if (ColumnsDemo.hyphenated) {
      $("p").toggleClass("unhyphenate")
      var softHyphen = /\u00AD/
      var unhyphenate = $("p").each(function (index, element) {
        var oldstring = $(element).html();
        var newstring = oldstring.replace(/\u00AD/g, "")
        $(element).html(newstring)
      })
      ColumnsDemo.hyphenated = false;
    } else {
      $("p").toggleClass("unhyphenate")
      $(".hyphenate").hyphenate("en-us");
      ColumnsDemo.hyphenated = true;
    }
  },

  enableHorizontalScrolling: function () {
    $(document).mousewheel(function (event, delta) {
      if ($(window).width() < 980) {
        return
      }
      event.preventDefault();
      var orig = $(document).scrollLeft();
      var newScroll = orig - (delta * 50);

      $(document).scrollLeft(newScroll);
    });
  },

  disableHorizontalScrolling: function () {
    $(document).unmousewheel();
  },

  registerEnquire: function () {
    enquire.register("screen and (max-width:980px)", {
      match: function () {
        if ($("body.columns").length) {
          $("body").removeClass("columns");
        }
        $(window).off("resize")
        $(".text").removeAttr("style")
        ColumnsDemo.disableHorizontalScrolling();
        $("label.columnswitch input").prop("disabled", true).parent().css("opacity", 0.5);
      },

      unmatch: function () {
        $("label.columnswitch input").prop("disabled", false).parent().removeAttr("style");
      }
    });

    enquire.register("screen and (min-width:980px)", {
      match: function () {
        var id;
        $("body").addClass("columns")

        $(window).on("resize", function () {
          if ($(document).scrollTop() != 0) {
            $(document).scrollTop(0);
          }
        });

        ColumnsDemo.enableHorizontalScrolling();
        $("label.columnswitch input").prop('disabled', false).parent().removeAttr("style");
      },

      setup: function () {
        if (Modernizr.csscolumns && $("body.columns").length) {
          ColumnsDemo.enableHorizontalScrolling();
          ColumnsDemo.aidPosition();
        } else {
          $(".fixed-nav a.main").hide();
        }
      }
    }, true).fire().listen(100);
  },

  unregisterEnquire: function () {
    enquire.unregister("screen and (min-width:980px)");
    ColumnsDemo.disableHorizontalScrolling();
    $(".text").removeAttr("style");
    $(window).off("resize")
  }
}

$(document).ready(function () {
  $(".text p").addClass("hyphenate").attr("lang", "en");
  $(".hyphenate").hyphenate("en-us");
  $(".fixed-nav input").prop("checked", true)

  if (Modernizr.csscolumns) {
    ColumnsDemo.columns = true;
    $("body").addClass("columns")
    ColumnsDemo.registerEnquire();
    $(".fixed-nav .no-support").hide();
  } else {
    $(".fixed-nav .columnswitch input").prop("disabled", true).removeAttr("checked");
  }

  $("label.hyphenationswitch input").click(function () {
    ColumnsDemo.toggleHyphenation();
  })

  $("label.justificationswitch input").click(function () {
    $("p").toggleClass("align-left")
  })

  $("label.columnswitch input").click(function () {
    if (ColumnsDemo.columns && Modernizr.csscolumns) {
      $("body").removeClass("columns");
      ColumnsDemo.unregisterEnquire();
      ColumnsDemo.columns = false;
    } else {
      $("body").addClass("columns");

      ColumnsDemo.columns = true;

      ColumnsDemo.registerEnquire();
      ColumnsDemo.aidPosition();
    }
  })
});
