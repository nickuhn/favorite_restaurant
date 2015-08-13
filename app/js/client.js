'use strict'

require('angular/angular');
require('./services/services');
require('./directives/directives');

var restaurantApp = angular.module('restaurantApp', ['services', 'directives']);

require('./restaurants/restaurants')(restaurantApp);

