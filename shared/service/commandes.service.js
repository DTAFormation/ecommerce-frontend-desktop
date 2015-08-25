angular.module('ecDesktopApp.shared')

.factory('commandeService', function ($http, API_URL) {

    var userService = this;
    //var apiRestUrl = "http://5.196.89.85:9080/ec-backend/api";
    //var apiRestUrl = "http://localhost:8082/ecommerce-backend/api";
    var apiRestUrl = API_URL;

    return {

        getCommandes : function(){
            return $http.get(apiRestUrl + "/user/commande")
            .then(function (result){
                return result.data;
            });
        },

        getDetailCommande : function(idCommande){
            return $http.get(apiRestUrl + "/user/commande/"+idCommande)
              .then(function(result){
                return result.data;
              });
        }

    };

});
