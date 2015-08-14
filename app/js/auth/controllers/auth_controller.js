'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
    if (auth.isSignedIn()) $location.path('/restaurants');
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
        console.log('user in auth controller', user);
        auth.signin(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }
          $location.path('/restaurants');
        });
      }
    }
  }]);
};
