(function() {
  var app;

  app = {
    settings: {
      stage: ["main", "product", "company", "news", "people"][0],
      path: ["/assets/"][0]
    },
    api: (function() {
      return {
        getAllCategories: function() {
          return $.get('/');
        }
      };
    })()
  };

  window.app = app;

}).call(this);
