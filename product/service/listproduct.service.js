angular.module('ecDesktopApp.product').service('productService', function($http) {

	var apiUrl="http://localhost:9001/data/bouchonproduct.json";

	//recupere la liste des produits
	this.getProducts = function(){
		var bouchonproduct="data/bouchonproduct.json";
		return $http.get(bouchonproduct);
    };

    //créé un produit en base
	this.addProduct = function(product){
		console.log("service de creation de produit");
		return $http.post(apiUrl,product);
    };

});