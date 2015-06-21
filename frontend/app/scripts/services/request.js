'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Request
 * @description
 * # Request
 * Service in the frontendApp.
 */
angular.module('edinbrosApp')
  .service('Request', function ($http, urls) {

      this.all = function() {
        return $http.get(urls.API + '/request');
      };

      this.get = function(id) {
        return $http.get(urls.API + '/request/' + id);
      };

      this.create = function(request) {
        return $http.post(urls.API + '/request', request);
      };

      this.update = function(request) {
        return $http.put(urls.API + '/request', request);
      };

      this.delete = function(id) {
        return $http.delete(urls.API + '/request', id);
      };

      this.join = function(id) {
        return $http.get(urls.API + '/request/' + id + '/join');
      };

      this.mark = function(id) {
        return $http.post(urls.API + '/request/mark', id);
      };
  });
