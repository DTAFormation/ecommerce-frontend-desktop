angular.module('ecDesktopApp.authentification', [
    'ngRoute'
]);

angular.module('ecDesktopApp.authentification').controller('LoginCtrl',
    ['$location', 'loginService',
    function ($location, loginService) {
        // R.A.Z. du statut de connexion
        var self = this;

        loginService.ClearCredentials();
        self.login = function () {
            self.dataLoading = true;
            loginService.Login(self.username, self.password, function(response) {
                if(response.success) {
                    loginService.SetCredentials(self.username, self.password);
                    $location.path('/home');
                } else {
                    self.error = response.message;
                    self.dataLoading = false;
                }
            });
        };
    }]);

