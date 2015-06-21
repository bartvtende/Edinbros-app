'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RequestdetailsCtrl
 * @description
 * # RequestdetailsCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('RequestDetailsCtrl', function ($scope, Request, $stateParams, $state, $mdToast) {

      $scope.$watch('$viewContentLoaded', function() {
        if ($stateParams.id == null || $stateParams.id == '')
          $state.go('overview.home');

        Request.get($stateParams.id)
            .success(function(request) {
              $scope.request = request.result;
            })
            .error(function(err) {
              $state.go('overview.home');
              $mdToast.show(
                  $mdToast.simple()
                      .content('Couldn\'t find the request!')
                      .position('bottom left')
                      .hideDelay(3000)
              );
            })
      });

  });
