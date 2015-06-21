/**
 * Created by hartger on 20/06/15.
 */
angular.module('edinbrosApp')
    .controller('LoginCtrl', function($scope, $auth, $mdToast) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

        $scope.signup = function(user) {
            $auth
                .signup(user)
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('You are now signed up!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                })
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });

            return false;
        };

        $scope.login = function(user) {
            $auth
                .login(user)
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('You are now logged in!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                })
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Something went wrong!')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        };

    });