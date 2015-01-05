'use strict';

// Declare app level module which depends on filters, and services
angular.module('poeApp', ['poeApp.filters', 'poeApp.services', 'poeApp.directives', 'poeApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
     
    $routeProvider.when('/main', {templateUrl: app.settings.apppath+'partials/alpha.html', controller: 'alpha'});
    $routeProvider.when('/product', {templateUrl: app.settings.apppath+'partials/beta.html', controller: 'beta'});
    $routeProvider.when('/contact', {templateUrl: app.settings.apppath+'partials/gamma.html', controller: 'gamma'});
    $routeProvider.otherwise({redirectTo: '/main'});
  }]);
