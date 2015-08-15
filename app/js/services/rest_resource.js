'use strict';

module.exports = function(app) {
  app.factory('RESTResource', ['$http', '$cookies', function($http, $cookies) {

    var errorHandler = function(callback) {
      return function(res) {
        console.log(res.data);
        callback(res.data);
      };
    };

    var successHandler = function(callback) {
      return function(res) {
        callback(null, res.data);
      };
    };

    return function(resourceName) {

      var requestHandler = function(method, data, callback) {
        var url = '/api/' + resourceName;
        if (data && data._id) {
          url += '/' + data._id;
        }
        var jwt = $cookies.get('jwt');
        $http.defaults.headers.common['x-access-token'] = jwt;
        $http({
          method: method,
          url: url,
          data: data,
        })
          .then(successHandler(callback), errorHandler(callback));
      };

      return {
        getAll: function(callback) {
          requestHandler('GET', null, callback);
        },

        create: function(data, callback) {
          requestHandler('POST', data, callback);
        },

        delete: function(data, callback) {
          requestHandler('DELETE', data, callback);
        },

        update: function(data, callback) {
          requestHandler('PUT', data, callback);
        }
      };
    };
  }]);
};
