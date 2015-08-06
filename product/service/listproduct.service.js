angular.module('ecDesktopApp.product').service('productService', function($http) {

	var apiUrl="http://localhost:9001/data/bouchonproduct.json";
	var delUrl="http://localhost:9001/data/";

	//recupere la liste des produits
	this.getProducts = function(){
		var bouchonproduct="data/bouchonproduct.json";
		//console.log($http.get(bouchonproduct)); 
		return $http.get(bouchonproduct);
    };

    //créé un produit en base
	this.addProduct = function(product){
		console.log("service de creation de produit");
		return $http.post(apiUrl,product);
    };

    //supprimer un produit en base
    this.delProduct = function(product){
        console.log("tentative de suppression d'un produit");
        return $http.del(delUrl+product.id+"/bouchonproduct.json");
    };

});