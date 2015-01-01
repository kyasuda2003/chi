(function() {
  var app;

  String.prototype.format = function() {
    var args;
    args = Array.prototype.slice.call(arguments, 0);
    return this.toString().replace(/{(\d+)}/g, function(match, number) {
      if (typeof args[number] !== "undefined") {
        return args[number];
      } else {
        return match;
      }
    });
  };

  app = {
    util: {
      array2json: function(arr, jsn, key) {
        var obj;
        for (obj in arr) {
          jsn[arr[obj][key].toString()] = arr[obj];
        }
      }
    },
    ui: {
      popupBlock: function(blockId, colour, opac, display) {
        $("#" + blockId).each(function(index, val) {
          $(this).remove();
        });
        return $("<div id='" + blockId + "' class='block-window'></div>").css({
          height: "100%",
          width: "100%",
          "z-index": "4000",
          opacity: opac,
          position: "fixed",
          top: "0",
          left: "0",
          display: (display ? "block" : "none"),
          "background-color": colour,
          "background-image": (colour === "white" ? "url('" + app.settings.apppath + "img/temp-load.gif')" : ""),
          "background-repeat": "no-repeat",
          "background-position": "center"
        });
      },
      switchView: function(win, path) {
        if (win.location.href.indexOf(path) > -1) {
          return;
        }
        $("body").append(app.ui.popupBlock("login-block", "white", "1", false));
        $("#login-block").fadeIn(1000, function() {
          win.location.replace(win.location.pathname + path);
        });
      }
    },
    api: (function() {
      var _this;
      _this = this;
      return {
        getAllSizes: function() {
          if ($.isEmptyObject(app.data.sizes)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}obj/sizes/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
              app.util.array2json(data.results, app.data.sizes, "id");
            });
          }
        },
        getAllCategories: function() {
          if ($.isEmptyObject(app.data.categories)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}obj/categories/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
              app.util.array2json(data.results, app.data.categories, "id");
            });
          }
        },
        getAllPhotos: function() {
          if ($.isEmptyObject(app.data.photos)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}obj/photos/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
              app.util.array2json(data.results, app.data.photos, "id");
            });
          }
        },
        getAllProducts: function() {
          if ($.isEmptyObject(app.data.products)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}obj/products/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
              app.util.array2json(data.results, app.data.products, "id");
            });
          }
        }
      };
    })(),
    data: {
      sizes: {},
      categories: {},
      photos: {},
      products: {}
    }
  };

  window.app = app;

}).call(this);
