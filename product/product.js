// Déclaration du module 'product'
angular.module('ecDesktopApp.product', [
'ngRoute',
]);

// Configuration du module 'product'
angular.module('ecDesktopApp.product').config(function ($routeProvider) {

// TODO Définir les routes spécifiques au module 'product' ici
$routeProvider.when('/product/listproduct', {
templateUrl : "product/template/listproduct.html",
controller : "productCtrl",
controllerAs : "productCtrl"
});
});

// Contrôleur principal du module 'product'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.product').controller('productCtrl', function (productService) {

var self = this;
self.products = productService.listProducts();


// ...

});