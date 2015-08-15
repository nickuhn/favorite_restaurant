'use strict'

require('angular/angular');
require('angular-route');
require('./services/services');
require('angular-cookies');

var restaurantApp = angular.module('restaurantApp', ['services', 'ngRoute', 'ngCookies']);

require('./restaurants/restaurants')(restaurantApp);
require('./auth/auth')(restaurantApp);

restaurantApp.config(['$routeProvider', function($route) {
  $route
    .when('/restaurants', {
      templateUrl: 'html/restaurants_view.html',
      controller: 'restaurantController'
    })
    .when('/signin', {
      templateUrl:'html/sign_in.html',
      controller: 'authController'
    })
    .when('/createuser', {
      templateUrl: 'html/create_user.html',
      controller: 'authController'
    })
    .otherwise({
      redirectTo: '/signin'
    })
}])
