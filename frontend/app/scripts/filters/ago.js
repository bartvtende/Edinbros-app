'use strict';

/**
 * @ngdoc filter
 * @name frontendApp.filter:ago
 * @function
 * @description
 * # ago
 * Filter in the frontendApp.
 */
angular.module('edinbrosApp')
  .filter('ago', function () {
      return function(isodate){
        return moment(isodate).fromNow();
      };
  })
    .filter('date', function () {
        return function(isodate){
            var date = new Date(isodate);
            return date.toLocaleDateString();
        };
    })
    .filter('time', function () {
        return function(isodate){
            var date = new Date(isodate);
            return date.toLocaleTimeString();
        };
    });
