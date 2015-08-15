'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$cookies', function($http, $cookies) {
    return {
      signin: function(user, callback) {
                $http.post('/auth/signin', user)
                .success(function(data) {
                  $cookies.put('jwt', data.token);
                  callback(null);
                })
                .error(function(data) {
                  console.log(data);
                  callback(data);
                });
              },

      create: function(user, callback) {
                $http.post('/auth/signup', user)
                .success(function(data) {
                  $cookies.put('jwt', data.token);
                  callback(null);
                })
                .error(function(data) {
                  console.log(data);
                  callback(data);
                });
              },

      logout: function() {
                $cookies.put('jwt', '');
              },

      isSignedIn: function() {
                    return !!($cookies.get('jwt') && $cookies.get('jwt').length);
                  }
    }
  }])
}
