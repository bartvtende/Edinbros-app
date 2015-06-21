'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('edinbrosApp')
  .controller('UserCtrl', function ($scope, $stateParams, Profile, $mdToast) {

        Profile.get($stateParams.id)
            .success(function(data){
                console.log(data);
                $scope.user = data.result;
            })
            .error(function(){
                $mdToast.show(
                    $mdToast.simple()
                        .content('Oopsay! Something went wrong')
                        .position('bottom left')
                        .hideDelay(3000)
                );
            })

  });
