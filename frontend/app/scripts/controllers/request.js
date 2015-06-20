'use strict';


angular.module('edinbrosApp')
  .controller('RequestCtrl', function ($scope,$stateParams,$http) {
    $scope.stateParams = $stateParams;
    $scope.userId = $scope.stateParams.id;

    $http.get()
        .succes(function($data){

        })
        .error(function(){
           $scope.errors = "EPIC FAILURE, SELF-DESTRUCT IN 10 SECONDS!";
        })


  });
