angular.module('ecDesktopApp.authentification', [
    'ngRoute'
]);

angular.module('ecDesktopApp.authentification').controller('LoginCtrl',
    ['$location', 'loginService',
    function ($location, loginService) {
        // R.A.Z. du statut de connexion
        var self = this;

        loginService.ClearCredentials();
        console.log("avant toute chose....");
        self.login = function () {
            console.log("avant recherche validité mdp");
            self.dataLoading = true;
            loginService.Login(self.username, self.password, function(response) {
                console.log(self.username + " " + self.password);
                if(response.success) {
                    console.log("succès");
                    loginService.SetCredentials(self.username, self.password);
                    $location.path('/home');
                } else {
                    console.log("mdp/login refusé");
                    self.error = response.message;
                    self.dataLoading = false;
                }
            });
        };
    }]);

