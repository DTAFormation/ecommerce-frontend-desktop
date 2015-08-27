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
    var self = this;
    //afficher la liste des produit récupéré par "getProduct".
    productService.getProducts().then(
        function(response) {
         return response.data;
     }, function(response) {
        return "impossible d'afficher des produits";
    })
    .then(
        function(product) {

         self.products = product;
     });

     self.displayProduct = function() {
         return productService.getProducts()
         .then(function(product) {
             self.product = product;
         });
     };

    //lancer le traitement de supprimer produit.
    self.delProduct = function(id){
        productService.deleteProduct(id)
        .then(function(succes){
            productService.err=false;
            return self.displayProduct();
        }, function(error){
            self.err=true;
            setTimeout(function(){window.location.reload();},2000);

        });

      };











    //code pour la modale
    self.animationsEnabled = true;
    self.open = function (product) {
        self.product = product;

        var modalInstance = $modal.open({
            templateUrl: 'modalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve:{
                    product: function(){
                        return self.product;
                    }
                }
            });
    };
    //fin du code pour la modale

    self.showBestCustomers = function (idProduct){
        $location.path('/stats/bestCustomersByProduct/' + idProduct);
    };

});

//controlleur pour la modale
angular.module('ecDesktopApp.product').controller('ModalInstanceCtrl',
    function ($scope, $modalInstance, product){
        $scope.product = product;
    });

//controlleur pour formulaire de creation des produits
angular.module('ecDesktopApp.product').controller('createProductCtrl', function(productService, $location) {

	var self = this;
	self.addProd = function(product){
		productService.addProduct(product)
		.then(function(response){ //en cas de succes

			self.err=false;
			$location.path("/product/listproduct");
		},function(error){ //en cas d'erreur

			self.err=true;
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
