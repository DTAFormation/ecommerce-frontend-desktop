angular.module('ecDesktopApp.product').service('productService', function($http) {

// TODO Service Home
this.getProducts = function(){
     var bouchonproduct="data/bouchonproduct.json";
     return $http.get(bouchonproduct);
    };

});