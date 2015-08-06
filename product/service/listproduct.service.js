angular.module('ecDesktopApp.product').service('productService', function($http) {

// Fonction qui récupère les données dans le json. les affiches dans la console comme promise.
this.getProducts = function(){
     var bouchonproduct="data/bouchonproduct.json";
     console.log($http.get(bouchonproduct)); 
     return $http.get(bouchonproduct);  
    };

});