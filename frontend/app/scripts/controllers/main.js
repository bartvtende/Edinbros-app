'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('MainCtrl', function ($scope, Request) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      Request.all()
          .success(function(requests) {
            console.log(requests);
          })
  });
