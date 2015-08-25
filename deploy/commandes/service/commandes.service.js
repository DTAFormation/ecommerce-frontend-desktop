angular.module('ecDesktopApp.commandes').service('commandeService', function($http) {
    var apiUrl="http://5.196.89.85:9080/ec-backend/api/user/commande";


    // Fonction qui récupère les commandes
    this.getCommandes = function(){

        return $http.get(apiUrl)
        .then(
            function(response){
                return response.data;
            });
    };



});
