'use strict'

require('angular/angular');

var restaurantApp = angular.module('restaurantApp', []);

require('./restaurants/restaurants')(restaurantApp);

