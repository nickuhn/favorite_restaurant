'use strict';

module.exports = function(app) {
  app.directive('starRating', function() {
    return {
      restrict: 'CA',
      replace: true,
      templateUrl: './../../../html/star_template.html',
      scope: {
        ratingValue: '=',
      },
      link: function(scope, elem, attrs) {
        scope.stars = [];
        for (var i = 0; i < 5; i++) {
          scope.stars.push({filled: i < scope.ratingValue});
        }
      }
    }
  });
}
