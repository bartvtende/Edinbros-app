/**
 * Created by hartger on 20/06/15.
 */
angular.module('edinbrosApp')
    .controller('LoginCtrl', function($scope, $auth) {

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

    });