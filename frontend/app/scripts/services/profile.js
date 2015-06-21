'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Profile
 * @description
 * # Profile
 * Service in the frontendApp.
 */
angular.module('edinbrosApp')
  .service('Profile', function ($http, urls) {

      this.get = function() {
        return $http.get(urls.API + '/user');
      };

      this.get = function(id) {
        return $http.get(urls.API + '/user/' + id);
      };

  });
