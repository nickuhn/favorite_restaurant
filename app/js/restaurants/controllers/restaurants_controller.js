'use strict';

module.exports = function(app) {
  app.controller('restaurantController', ['$scope', '$http', function($scope, $http) {
    $scope.restaurants = [];
    $scope.errors = [];

    var handleErrors = function(err) {
      console.log(err.data);
      $scope.errors.push(err.data);
    }

    $scope.getAll = function() {
      $http.get('/api/restaurants')
        .then(function(res) {
          $scope.restaurants = res.data;
        }, function(res) {
          handleErrors(res);
        });
    };

    $scope.create = function(restaurant) {
      $scope.newRestaurant = null;
      $http.post('/api/restaurants', restaurant)
        .then(function(res) {
          $scope.restaurants.push(res.data);
        }, function(res) {
          handleErrors(res);
        });
    };

    $scope.delete = function(restaurant) {
      $http.delete('/api/restaurants/' + restaurant._id)
        .then(function(res) {
          $scope.restaurants.splice($scope.restaurants.indexOf(restaurant), 1);
        }, function(res) {
          handleErrors(res);
        });
    };

    $scope.update = function(restaurant) {
      $http.put('/api/restaurants/' + restaurant._id, restaurant)
        .then(function(res) {
          restaurant.editing = false;
        }, function(res) {
          restaurant.editing = false;
          handleErrors(res);
        });
    };

    $scope.saveTemp = function(restaurant) {
      restaurant.editing = true;
      $scope.backup = angular.copy(restaurant);
    }

    $scope.resetForm = function(restaurant) {
      restaurant.name = $scope.backup.name;
      restaurant.rating = $scope.backup.rating;
      restaurant.cuisine = $scope.backup.cuising;
      restaurant.location = $scope.backup.location;
      restaurant.editing = false;
    }


  }]);
};
