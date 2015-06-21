'use strict';


angular.module('edinbrosApp')
  .controller('RequestCtrl', function ($scope, $stateParams, $http, Request, $state) {
    $scope.stateParams = $stateParams;
    $scope.userId = $scope.stateParams.id;

    Request.get($scope.stateParams.id)
        .success(function(data){
            console.log(data);
            $scope.request = data;
        })
        .error(function(){
           $scope.errors = "EPIC FAILURE, SELF-DESTRUCT IN 10 SECONDS!";
            console.log($scope.errors);
        });

        $scope.goToRequest = function(id) {
            console.log(id);
            $state.go('overview.request-details', { id: id });
        };



  })
    .controller('CreateRequestCtrl', function ($scope, $http, Request, $state){

        $scope.submit = function(){
            Request.create($scope.request)
                .success(function(){
                    $state.go('overview.home');
                })
                .error(function(){
                    console.log("API CALL FAILED");
                });
        };
    });
