'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('ProfileCtrl', function ($scope, $auth, $state, $mdDialog, $mdToast) {

    $scope.logout = function() {
      $auth.logout()
        .then(function() {
          $scope.cancel();
          $mdToast.show(
            $mdToast.simple()
              .content('You are now logged out!')
              .position('bottom left')
              .hideDelay(3000)
          );
        });
    };

    $scope.navigateTo = function(to) {
      $mdDialog.hide();
      $state.go(to);
    };

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

  });
