'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('NavbarCtrl', function ($scope, $state, $mdDialog) {

    $scope.navigateTo = function(state) {
      $state.go(state);
    };

    $scope.spawnProfilePopup = function(event) {
      $mdDialog.show({
        controller: 'ProfileCtrl',
        templateUrl: 'views/pages/profile.html',
        targetEvent: event
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

  });
