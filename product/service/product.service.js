angular.module('ecDesktopApp.product').service('productService', function($http) {

	var apiUrl="http://5.196.89.85:9080/ec-backend/api/produit/";
	
	//recupere la liste des produits
	this.getProducts = function(){
		return $http.get(apiUrl);
    };

    //créé un produit en base
	this.addProduct = function(product){
		console.log("service de creation de produit");
		return $http.post(apiUrl,product);
    };

    //supprimer un produit en base
    this.deleteProduct = function(id){
        console.log("tentative de suppression du produit"+id);
        return $http.delete(apiUrl+id);
    };

    //Editer un produit en base
    this.updateProduct = function(product){
        return $http.put(apiUrl,product);     
    };
    
    //Rechercher un produit par id
    this.get = function(id){
        return $http.get(apiUrl+id)
        .then(function(result){
            return result.data;
        });
    };

});