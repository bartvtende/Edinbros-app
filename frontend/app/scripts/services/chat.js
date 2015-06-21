'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Chat
 * @description
 * # Chat
 * Service in the frontendApp.
 */
angular.module('edinbrosApp')
  .service('Chat', function ($http, urls) {

      this.get = function(id) {
        return $http.get(urls.API + '/chat/' + id);
      }

  });
