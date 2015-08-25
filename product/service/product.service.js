angular.module('ecDesktopApp.product').service('productService', function($http, API_URL) {

	var url=API_URL + "/produit/";

	//recupere la liste des produits
	this.getProducts = function(){
		return $http.get(url);
    };

    //créé un produit en base
	this.addProduct = function(product){
		return $http.post(url,product);
    };

    //supprimer un produit en base
    this.deleteProduct = function(id){
        return $http.delete(url+id);
    };

    //Editer un produit en base
    this.updateProduct = function(product){
        return $http.put(url,product);
    };

    //Rechercher un produit par id
    this.get = function(id){
        return $http.get(url+id)
        .then(function(result){
            return result.data;
        });
    };

});
