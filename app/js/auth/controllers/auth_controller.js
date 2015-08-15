'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
    if (auth.isSignedIn()) $location.path('/restaurants');
    $scope.moveToCreate = function() {
      $location.path('/createuser');
    };
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      if (user.password_confirmation) {
        auth.create(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create user'});
          }
          $location.path('/restaurants');
        })
      } else {
        auth.signin(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }
          $location.path('/restaurants');
        });
      }
    }
    $scope.signedIn = function() {
          return auth.isSignedIn();
        };

    $scope.signOut = function() {
      auth.logout();
      $location.path('/signin');
    };
  }]);
};
