angular.module('ecDesktopApp.product').service('productService', function($http) {

// TODO Service Home
this.listProducts=function(){
	return [
	{id : 1, libelle : "libelle" , caracteristique : "carac", categorie : "categorie", image : "image" , prix : 0.10},
	{id : 2, libelle : "libelle2" , caracteristique : "caracteristique", categorie : "categorie2", image : "image2" , prix : 0.20}
	];
};

});