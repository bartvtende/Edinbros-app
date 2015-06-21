'use strict';


angular.module('edinbrosApp')
  .controller('RequestCtrl', function ($scope,$stateParams,$http) {
    $scope.stateParams = $stateParams;
    $scope.userId = $scope.stateParams.id;

    $http.get('http://localhost:3000/api/request/'+$scope.stateParams.id)
        .success(function(data){
            console.log(data);
            $scope.request = data;
        })
        .error(function(){
           $scope.errors = "EPIC FAILURE, SELF-DESTRUCT IN 10 SECONDS!";
            console.log($scope.errors);
        });




  })
    .controller('CreateRequestCtrl', function ($scope,$http){

        $scope.submit = function(){
            $http.post('http://localhost:3000/api/request', $scope.request)
                .success(function(){
                    //REDIRECT
                })
                .error(function(){
                    console.log("API CALL FAILED");
                });
        };
    });
