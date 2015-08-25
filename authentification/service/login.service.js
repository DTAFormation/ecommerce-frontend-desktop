angular.module('ecDesktopApp.authentification')
.factory('loginService', ['API_URL', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (API_URL, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        var url = API_URL + "/admin/connect";

        service.Login = function (username, password, callback) {
            var userData = { "login" : username, "password" : password };

            //Authentification possible selon bdd, il faut cibler une url existante
            $http.post(url, userData)
               .then(function (response) {

                response.success = response.status === 200;
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);

               });

        };

		//setCredential permet d'initialiser les valeurs username et mdp pour la fonction test,
		//utilisaton des services CORS (cross-origin-resources-sharing) permettant d'acceder à des services
		//en dehors de leurs origines.
        service.SetCredentials = function (username, password) {
            var authdata = username + ':' + password;

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            //place la personne connecté en accréditation basic + authdata.
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('globals', $rootScope.globals);
        };

		//suppression des infos du cookie
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            //les personnes sur le site mais non connecté on par défaut une accréditation basic.
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    }]);
