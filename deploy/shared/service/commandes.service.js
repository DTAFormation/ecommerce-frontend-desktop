angular.module('ecDesktopApp.shared')

.factory('commandeService', function ($http, API_URL) {

    var userService = this;
    var apiRestUrl = API_URL;

    return {

        updateCommande : function(commande) {
            return $http.put(apiRestUrl + "/commande", commande)
            .then(function(result) {
                return result.data;
            });
        },

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
