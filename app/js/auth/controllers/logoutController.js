'use strict'

module.exports = function(app) {
  app.controller('logoutController', ['$scope','$location', 'auth', function($scope, $location, auth) {
        $scope.signedIn = function() {
          return auth.isSignedIn();
        };

        $scope.signOut = function() {
          console.log('clicked');
          auth.logout();
          $location.path('/create_user');
        };
      }]);

}
