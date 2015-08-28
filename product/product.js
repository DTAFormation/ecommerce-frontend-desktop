// Déclaration du module 'product'
angular.module('ecDesktopApp.product', [
    'ngRoute',
    'ui.bootstrap',
    'ecDesktopApp.shared'
    ]);


// Configuration du module 'product'
angular.module('ecDesktopApp.product').config(function($routeProvider) {

// TODO Définir les routes spécifiques au module 'product' ici
$routeProvider
	.when('/product/createProduct', {   //quand tu vois la route /product/createProduct utilise le template createProduct
		templateUrl:'product/template/createProduct.tpl.html',
		controller : "createProductCtrl",
		controllerAs:"createProductCtrl",
	})
	.when('/product/listproduct', { //
		templateUrl:'product/template/listproduct.html',
		controller : "productCtrl",
		controllerAs : "productCtrl"
	})
	.when("/product/updateProduct/:id",{
		templateUrl : "product/template/updateProduct.tpl.html",
		controller: "updateProductController",
		controllerAs: "updateProductCtrl"
  });

});

// Contrôleur principal du module 'product'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.product').controller('productCtrl', function(productService, $modal, $scope, $location) {
    var productCtrl = this;
    productCtrl.customers = null;

    //afficher la liste des produit récupéré par "getProduct".
    /*productService.getProducts().then(
        function(response) {
         return response.data;
     }, function(response) {
        return "impossible d'afficher des produits";
    })
    .then(
        function(product) {
         productCtrl.products = product;
     });*/


    productCtrl.displayProduct = function() {
      return productService.getProducts()
      .then(function(product) {
        productCtrl.products = product.data;
      });
    };

    //lancer le traitement de supprimer produit.
    productCtrl.delProduct = function(id){
      productService.deleteProduct(id)
      .then(function(succes){
        productCtrl.err=false;
        return productCtrl.displayProduct();
      }, function(error){
        productCtrl.err=true;
        setTimeout(function(){window.location.reload();},2000);
      });
    };

    productCtrl.displayProduct();


    //code pour la modale
    productCtrl.animationsEnabled = true;
    productCtrl.open = function (product) {
      productCtrl.product = product;

      var modalInstance = $modal.open({
        templateUrl: 'modalContent.html',
        controller: 'ModalInstanceCtrl',
        resolve:{
            product: function(){
                return productCtrl.product;
            }
        }
      });
    };
    //fin du code pour la modale

    productCtrl.showBestCustomers = function (idProduct){
        $location.path('/stats/bestCustomersByProduct/' + idProduct);
    };

});

//controlleur pour la modale
angular.module('ecDesktopApp.product').controller('ModalInstanceCtrl', function ($scope, $modalInstance, product){
  
  $scope.product = product;

});

//controlleur pour formulaire de creation des produits
angular.module('ecDesktopApp.product').controller('createProductCtrl', function(productService, $location) {

	var productCtrl = this;
	productCtrl.addProd = function(product){
    product.actif=true;
		productService.addProduct(product)
		.then(function(response){ //en cas de succes
  		productCtrl.err=false;
  		$location.path("/product/listproduct");
		},function(error){ //en cas d'erreur
			productCtrl.err=true;
		});
	};
});

angular.module('ecDesktopApp.product').controller("updateProductController", function(productService, $routeParams, $location){
	var updateCtrl = this;

	productService.get($routeParams.id) // permet de charger le produit dans le formulaire
	.then(function(product){
		updateCtrl.product = product;
	});

	updateCtrl.updateProduct = function(form){
		productService.updateProduct(updateCtrl.product)
		.then(function(succes){
			$location.path("/product/listproduct");
		},function(fail){

		});
	};
});
