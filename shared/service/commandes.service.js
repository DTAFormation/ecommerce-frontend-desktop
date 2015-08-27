angular.module('ecDesktopApp.shared')

.factory('commandeService', function ($http, API_URL) {

    var userService = this;
    var apiRestUrl = API_URL;

    return {

        getCommandes : function(){
            return $http.get(apiRestUrl + "/commande")
            .then(function (result){
                return result.data;
            });
        },

        getDetailCommande : function(idCommande){
            return $http.get(apiRestUrl + "/commande/"+idCommande)
            .then(function(result){
                return result.data;
            }, function(result){
                return null;
            });
        }

    };

});
