'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Leaderboards
 * @description
 * # Leaderboards
 * Service in the frontendApp.
 */
angular.module('edinbrosApp')
    .service('Leaderboards', function ($http, urls) {

      this.get = function() {
        return $http.get(urls.API + '/leaderboard');
      }

    });