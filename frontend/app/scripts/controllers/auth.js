/**
 * Created by hartger on 20/06/15.
 */
angular.module('edinbrosApp')
    .controller('LoginCtrl', function($scope, $auth, $http) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

        $scope.signup = function(user) {
            $auth
                .signup(user)
                .then(function(resp) {
                    alert(resp);
                });

            return false;
        };

        $scope.login = function(user) {
            $auth
                .login(user)
                .then(function(resp) {
                    alert(resp);
                });
        };

    });