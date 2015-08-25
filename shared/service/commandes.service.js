angular.module('ecDesktopApp.shared')

.factory('commandeService', function ($http) {

    var userService = this;
    //var apiRestUrl = "http://5.196.89.85:9080/ec-backend/api";
    var apiRestUrl = "http://localhost:8082/ecommerce-backend/api";

    return {

        getCommandes : function(){
            return $http.get(apiRestUrl + "/user/commande")
            .then(function (result){
                return result.data;
            });
        },

        getDetailsProduit : function(idCommande){
            return $http.get(apiRestUrl + "/user/commande")
            .then(function (result){
                return result.data;
            });
        }

    };

});
