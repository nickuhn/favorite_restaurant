'use strict';

module.exports = function(app) {
  app.directive('restaurantsForm', function() {
    return {
      restrict: 'CA',
      replace: true,
      templateUrl: './../../../html/restaurants_form.html',
      scope: {
        save: '&',
        buttonText: '@',
        restaurant: '=',
        needEdit: '=',
        cancel: '&'
      }
    }
  });
}
