angular.module('LoginController')
 
.controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'loginService',
    function ($scope, $rootScope, $location, loginService) {
        // R.A.Z. du statut de connexion
        loginService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            loginService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    loginService.SetCredentials($scope.username, $scope.password);
                    $location.path('/home');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);

