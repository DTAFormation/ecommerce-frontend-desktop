angular.module('ecDesktopApp.product').service('productService', function($http) {

	var apiUrl="data/api/product/";
	

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
    this.deleteProduct = function(id){
        console.log("tentative de suppression du produit"+id);
        return $http.delete(apiUrl+id+".json");
    };

    //Editer un produit en base
    this.updateProduct = function(product){
        return $http.put(apiUrl+product.id,product);     
    };
    
    //Rechercher un produit par id
    this.get = function(id){
        return $http.get(apiUrl+id+".json")
        .then(function(result){
            return result.data;
        });
    };

});