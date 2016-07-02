angular.module('MyApp')
    .controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.signup = function() {
            Auth.signup({
                username: $scope.email,
                password: $scope.password
            });
        };
    }]);