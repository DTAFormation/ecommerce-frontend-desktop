angular.module('ecDesktopApp.authentification', [
    'ngRoute',
    'ngCookies',
    'ecDesktopApp.shared'
]);

angular.module('ecDesktopApp.authentification').controller('LoginCtrl',
    ['$location', 'loginService',
    function ($location, loginService) {
        var loginCtrl = this;
        //masque le message d'erreur sur la page du login
        loginCtrl.dataLoading = false;

        loginCtrl.login = function () {
          loginService.Login(loginCtrl.username, loginCtrl.password)
            .then( function(response) {
                loginService.SetCredentials(loginCtrl.username, loginCtrl.password);
                $location.path('/home');
            },function (response){
                loginCtrl.dataLoading = true;
              });
        };
    }]);
