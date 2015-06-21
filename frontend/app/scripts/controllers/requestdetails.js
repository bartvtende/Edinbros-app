'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RequestdetailsCtrl
 * @description
 * # RequestdetailsCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('RequestDetailsCtrl', function ($scope, Request, $stateParams, $state, $mdToast, $auth, Chat) {

      $scope.showChat = false;

      $scope.$watch('$viewContentLoaded', function() {
        if ($stateParams.id == null || $stateParams.id == '')
          $state.go('overview.home');

        // Get the recipe
        Request.get($stateParams.id)
            .success(function(request) {
              $scope.request = request.result;
              $scope.chat($scope.request);
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

        Chat.get($stateParams.id)
            .success(function(messages) {
                $scope.messages = messages.result;
            })
            .error(function() {

            });
      });

      $scope.join = function() {
          Request.join($stateParams.id)
              .success(function() {
                  $mdToast.show(
                      $mdToast.simple()
                          .content('You have joined this request!')
                          .position('bottom left')
                          .hideDelay(3000)
                  );
              })
              .error(function() {
                  $mdToast.show(
                      $mdToast.simple()
                          .content('Oopsie! Something went wrong!')
                          .position('bottom left')
                          .hideDelay(3000)
                  );
              })
      };

      $scope.chat = function(request) {
          if (request.request.requester == $auth.getPayload().sub) {
              $scope.showChat = true;
          }

          if (request.request.signups != null) {
            for (var i = 0; i < request.request.signups.length; i++) {
                if (request.request.signups[i] == $auth.getPayload().sub) {
                    $scope.showChat = true;
                }
            }
          }
      };

        $scope.sendMessage = function(message) {
            console.log(message);
        }

  });
