'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RequestdetailsCtrl
 * @description
 * # RequestdetailsCtrl
 * Controller of the frontendApp
 */
var socky = io.connect('http://localhost:1338', {'force new connection': true});
angular.module('edinbrosApp')
  .controller('RequestDetailsCtrl', function ($scope, Request, $stateParams, $state, $mdToast, $auth, Chat) {

      $scope.showChat = false;

      $scope.$watch('$viewContentLoaded', function() {
        if ($stateParams.id == null || $stateParams.id == '')
          $state.go('overview.home');

        // Get the recipe
        Request.get($stateParams.id)
            .success(function(request) {
              $scope.request = request.result.request;
              $scope.user = request.result.user;
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
            });

        Chat.get($stateParams.id)
            .success(function(messages) {
                $scope.messages = messages.result;
                $scope.loadSockets($stateParams.id, $auth.getPayload().sub);
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
                  $scope.showChat = true;
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
          if (request.requester == $auth.getPayload().sub) {
              $scope.showChat = true;
          }

          if (request.signups != null) {
            for (var i = 0; i < request.signups.length; i++) {
                if (request.signups[i] == $auth.getPayload().sub) {
                    $scope.showChat = true;
                }
            }
          }
      };

        $scope.loadSockets = function(requestId, userId) {
            socky.emit('join', 'r:' + requestId);

            socky.on('receive', function(msg) {
                $scope.$apply(function() {
                    console.log('YEA BABY');
                    $scope.messages.push({image: 'http://placehold.it/50x50', userId: 'Willem', message: msg.message, time: msg.createdAt});
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Willem says: ' + msg.message)
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
            });
        };

        $scope.sendMessage = function(message) {
            var userId = $auth.getPayload().sub;

            // Push the message to the dummy array
            if (message != '' && message != null) {
                var jsonMessage = '{ "message": "' + message + '", "userId": "' + userId + '", "requesterId": "' + $stateParams.id + '" }';

                socky.emit('chat message', jsonMessage);
            }

            // Delete the message from the input field
            $scope.message = '';

            // Stop the form from submitting
            return false;
        }

  });
