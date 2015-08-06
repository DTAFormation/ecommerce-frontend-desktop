// Déclaration du module 'product'
angular.module('ecDesktopApp.product', [
	'ngRoute',
]);

// Configuration du module 'product'
angular.module('ecDesktopApp.product').config(function ($routeProvider) {

// TODO Définir les routes spécifiques au module 'product' ici
	$routeProvider
	.when('/product/createProduct', {   //quand tu vois la route /product/createProduct utilise le template createProduct
		templateUrl:'/product/template/createProduct.tpl.html',
		controller : "createProductCtrl",
		controllerAs:"createProductCtrl",
		})
	.when('/product/listproduct', { //
		controller : "productCtrl",
		controllerAs : "productCtrl"
	});
});

// Contrôleur principal du module 'product'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.product').controller('productCtrl', function (productService) {


	var self = this;
	productService.getProducts().then(
				function(response) {
					return response.data;
				})
			.then(
				function (product) {
					console.log(product);
					self.products = product;
				});

// ...

});
//controlleur pour formulaire de creation des produits
angular.module('ecDesktopApp.product').controller('createProductCtrl', function (productService) {

	var self = this;
	self.addProd = function(product){
		productService.addProduct(product);
	};
// ...

});