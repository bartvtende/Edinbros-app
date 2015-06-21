'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('MainCtrl', function ($scope, Request, $mdToast) {

    $scope.$watch('$viewContentLoaded', function() {
      Request.all()
        .success(function(requests) {
          $scope.requests = requests.result;
        })
        .error(function() {
          $mdToast.show(
            $mdToast.simple()
              .content('Couldn\'t find any requests, sorry!')
              .position('bottom left')
              .hideDelay(3000)
          );
        });
    });

  });
