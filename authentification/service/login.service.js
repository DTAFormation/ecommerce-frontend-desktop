angular.module('ecDesktopApp.authentification')
.factory('loginService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        var apiUrl = "http://localhost:9001/data/loginbouchon.json";

        service.Login = function (username, password, callback) {

            // fonction de test pour vérifier le fonctionnement de l'authentification avec username et login valant test
            $timeout(function(){
            console.log(username + " " + password);
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);


            //Authentification possible selon bdd, il faut cibler une url existante
            // $http.post(apiUrl, { username : username, password : password })
            //    .then(function (response) {
            //         console.log(response.data);
            //        sessionStorage.data=response.data;
                   
            //        callback(response);

            //    });

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