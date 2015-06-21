'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LeaderboardsCtrl
 * @description
 * # LeaderboardsCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('LeaderboardsCtrl', function ($scope, Leaderboards, $mdToast, $state) {

      $scope.$watch('$viewContentLoaded', function() {
        Leaderboards.get()
            .success(function(board) {
              $scope.board = board.result;
            })
            .error(function() {
              $mdToast.show(
                  $mdToast.simple()
                      .content('Something went wrong!')
                      .position('bottom left')
                      .hideDelay(3000)
              );
            })
      });

      $scope.goToPerson = function(id) {
        console.log(id);
        $state.go('overview.profile', { id: id });
      };

  });
