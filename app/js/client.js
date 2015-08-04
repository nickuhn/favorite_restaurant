'use strict'

require('angular/angular');

var restaurantApp = angular.module('restaurantApp', []);

var restaurantController = restaurantApp.controller('restaurantController', ['$scope', function($scope) {
  $scope.appDescription = 'This app will store your favorite restaurants and display them in a sortable list.'
  $scope.addRestaurant = function() {
    //logic to add a restaurant to DB
  }
}])
