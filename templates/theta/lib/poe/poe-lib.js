(function() {
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
                
    app.util = {
      array2json: function(arr, key) {
        var jsn={};
        for (var obj in arr) {
          jsn[arr[obj][key].toString()] = arr[obj];
        }
        return jsn;
      },
      json2array:function(jsn){
          return $.map(jsn,function(value, index){
            return [value];
          });
      },
      getRenderedArr: function(arr, size) {
        //var _ref=$.map(app.data.products,function(value, index){return [value];});
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
          newArr.push(arr.slice(i, i+size));
        }
        return newArr;
      },
      getProducts1RowTable:function(numInARow){
          var _ref={};
          for (var cat in app.data.categories){
              _ref[cat]=app.data.categories[cat];
              var _ref1=$.map(app.data.products,function(value, index){
                if (value.categories.indexOf(_ref[cat].id)>-1)
                    return [value];
                });

                _ref[cat].prodArray=app.util.getRenderedArr(_ref1,numInARow);
                  
          }
        
        return _ref;
      }
    };
    app.ui = {
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
      switchView: function(obj, win, path) {
        $('.menu ul li').removeClass('active');
        $(obj).parent().attr({class:'active'});
        
        if (win.location.href.indexOf(path) > -1) {
          return;
        }
        
        $("body").append(app.ui.popupBlock("login-block", "white", "1", false));
        $("#login-block").fadeIn(500, function() {
            
          $.when(app.api.getAllCategories(),app.api.getAllPhotos(),app.api.getAllProducts()).done(function(){
            win.location.replace(win.location.pathname + path);
          });
        });
      }
    };
    app.api = (function() {
      var _this;
      _this = this;
      return {
        getAllCategories: function() {
          if (!$.isEmptyObject(app.data.categories)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}/categories/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
               app.data.categories=app.util.array2json(data.results, "id");
            });
          }
        },
        getAllPhotos: function() {
          if (!$.isEmptyObject(app.data.photos)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}/photos/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
              app.data.photos= app.util.array2json(data.results, "id");
            });
          }
        },
        getAllProducts: function() {
          if (!$.isEmptyObject(app.data.products)) {
            return $.Deferred().resolve();
          } else {
            return $.get("{0}{1}/products/".format(app.settings.apihost, app.settings.apipath)).success(function(data, textStatus, jqxhr) {
              app.data.products=app.util.array2json(data.results, "id");
            });
          }
        }
      };
      
    })();
    app.data = {
      categories: {},
      photos: {},
      products: {}
    };
}).call(this);
