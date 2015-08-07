'use strict'

require('../../app/js/client.js');
require('angular-mocks');

describe('Restaurant Controller', function() {
  var $CC;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('restaurantApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CC = $controller;
  }));

  it('should be able to create the controller', function() {
    var restaurantController = $CC('restaurantController', {$scope:$scope});
    expect(typeof restaurantController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.restaurants)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $CC('restaurantController', {$scope:$scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make GET request when getAll() is called', function() {
      $httpBackend.expectGET('/api/restaurants').respond(200, [
        { _id: 1,
          name: 'Testing Restaurant',
          rating: 2,
          cuisine: 'Testing',
          location: 'Test Boulevard'
        }]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.restaurants.length).toBe(1);
      expect($scope.restaurants[0].name).toBe('Testing Restaurant');
      expect($scope.restaurants[0]._id).toBe(1);
    });

    it('should make POST request when create() is called', function() {
      var testRestaurant = {  name: 'Testing Restaurant',
                              rating: 2,
                              cuisine: 'Testing',
                              location: 'Test Boulevard'
                            };
      $scope.newRestaurant = testRestaurant;
      $httpBackend.expectPOST('/api/restaurants', testRestaurant).respond(200, {  _id:1,
                name: 'Another Restaurant',
                rating: 2,
                cuisine: 'Testing',
                location: 'Test Boulevard'
              });
      $scope.create(testRestaurant);
      expect($scope.newRestaurant).toBe(null);
      $httpBackend.flush();
      expect($scope.restaurants.length).toBe(1);
      expect($scope.restaurants[0].name).toBe('Another Restaurant');
    });

    it('should make DELETE request when delete() is called', function() {
      var testRestaurant = {  _id: 1,
                              name: 'Testing Restaurant',
                              rating: 2,
                              cuisine: 'Testing',
                              location: 'Test Boulevard'
                            };
      $scope.restaurants = [
      { _id: 0,
        name: 'Some Restaurant',
        rating: 5,
        cuisine: 'Tasty Testing',
      },
      testRestaurant,
      { _id: 2,
        name: 'More Restaurant',
        rating: 1,
        cuisine: 'Less Testing',
      },
      ];
      $httpBackend.expectDELETE('/api/restaurants/1').respond(200);
      $scope.delete(testRestaurant);
      $httpBackend.flush();
      expect($scope.restaurants.length).toBe(2);
      expect($scope.restaurants.indexOf(testRestaurant)).toBe(-1);
      expect($scope.restaurants[0].name).toBe('Some Restaurant');
      expect($scope.restaurants[1].name).toBe('More Restaurant');
    });

    it('should make PUT request when update() is called', function() {
      var testRestaurant = {  _id: 1,
                              name: 'Testing Restaurant',
                              rating: 2,
                              cuisine: 'Testing',
                              location: 'Test Boulevard',
                              editing: true
                            };
      $httpBackend.expectPUT('/api/restaurants/1').respond(200);
      $scope.update(testRestaurant);
      $httpBackend.flush();
      expect(testRestaurant.editing).toBe(false);

    });

    it('should save a copy in $scope and set editing to true when saveTemp() is called',  function() {
      $scope.backup = null;
      var testRestaurant = {  _id: 1,
                              name: 'Testing Restaurant',
                              rating: 2,
                              cuisine: 'Testing',
                              location: 'Test Boulevard',
                              editing: false
                            };
      $scope.saveTemp(testRestaurant);
      expect(testRestaurant.editing).toBe(true)
      expect($scope.backup.name).toBe('Testing Restaurant');
      expect($scope.backup.editing).toBe(true);
    });

    it('should reset restaurant attributes to copy stored in scope when resetForm() is called', function() {
      var testRestaurant = {  _id: 1,
                              name: 'Some Restaurant',
                              rating: 4,
                              cuisine: 'Testing',
                              location: 'Test Boulevard',
                              editing: true
                            };
      $scope.backup = { _id: 1,
                        name: 'Testing Restaurant',
                        rating: 2,
                        cuisine: 'Testing Food',
                        location: 'Test Street',
                        editing: true
                      };
      $scope.resetForm(testRestaurant);
      expect(testRestaurant.name).toBe('Testing Restaurant');
      expect(testRestaurant.location).toBe('Test Street');
      expect(testRestaurant.editing).toBe(false);

    });

  })
});
