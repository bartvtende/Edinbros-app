'use strict';


angular.module('edinbrosApp')
  .controller('RequestCtrl', function ($scope,$stateParams,$http,Request) {
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




  })
    .controller('CreateRequestCtrl', function ($scope,$http,Request){

        $scope.submit = function(){
            Request.create($scope.request)
                .success(function(){
                    //REDIRECT
                })
                .error(function(){
                    console.log("API CALL FAILED");
                });
        };
    });
