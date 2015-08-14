'use strict';

module.exports = function(app) {
  app.directive('logoutDirective', function() {
    return {
      restrict: 'CA',
      replace: true,
      scope: {},
      templateUrl: 'js/logout_template.html',
      controller: 'logoutController'
    }
  });
};
