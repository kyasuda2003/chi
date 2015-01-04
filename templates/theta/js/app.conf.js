(function() {
 var app={};
  app.settings = {
    dev: true,
    stage: ["main", "product", "company", "news", "people"][0],
    apipath: ["/obj"][0],
    apihost: ["http://localhost:9000", ""][1],
    mediapath: ["/media"][0],
    apppath: ["/theta/", "/assets/"][1]
  };
  window.app=app;

}).call(this);
