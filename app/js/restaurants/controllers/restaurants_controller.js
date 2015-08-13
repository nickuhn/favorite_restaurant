'use strict';
var _ = require('lodash');

module.exports = function(app) {
  app.controller('restaurantController', ['$scope', 'RESTResource', function($scope, resource) {
    $scope.restaurants = [];
    $scope.errors = [];
    var Restaurants = new resource('restaurants');

    $scope.getAll = function() {
      Restaurants.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push(err);
        }
        $scope.restaurants = data;
      });
    };

    $scope.create = function(restaurant) {
      $scope.newRestaurant = null;
      Restaurants.create(restaurant, function(err, data) {
        if (err) {
          return $scope.errors.push(err);
        }
        $scope.restaurants.push(data);
      });
    };

    $scope.delete = function(restaurant) {
      Restaurants.delete(restaurant, function(err, data) {
        if (err) {
          return $scope.errors.push(err);
        }
        $scope.restaurants.splice($scope.restaurants.indexOf(restaurant), 1);
      });
    };

    $scope.update = function(restaurant) {
      Restaurants.update(restaurant, function(err, data) {
        if (err) {
          return $scope.errors.push(err);
        }
        restaurant.editing = false;
      });
    };

    $scope.saveTemp = function(restaurant) {
      restaurant.editing = true;
      $scope.backup = _.cloneDeep(restaurant);
    };

    $scope.resetForm = function(restaurant) {
      for (var key in restaurant) {
        restaurant[key] = $scope.backup[key];
      }
      restaurant.editing = false;
    };

  }]);
};
