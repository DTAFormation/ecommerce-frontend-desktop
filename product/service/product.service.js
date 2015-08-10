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
    this.deleteProduct = function(product){
        console.log("tentative de suppression d'un produit"+product);
        return $http.delete(delUrl+product.id+"/bouchonproduct.json");
    };

    //Editer un produit en base
    this.updateProduct = function(product){
        return $http.put(apiUrl,product);
                

    };
    
    //Rechercher un produit par id
    this.get = function(id){
        return $http.get(apiUrl+id+".json").then(function(result){
            return result.data;
        });
    };

});