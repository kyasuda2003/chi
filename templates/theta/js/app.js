'use strict';
// Declare app level module which depends on filters, and services
angular.module('poeApp', ['poeApp.filters', 'poeApp.services', 'poeApp.directives', 'poeApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {templateUrl: './assets/partials/alpha.html', controller: 'alpha'});
    $routeProvider.when('/product', {templateUrl: './assets/partials/beta.html', controller: 'beta'});
    $routeProvider.otherwise({redirectTo: '/main'});
  }]);
