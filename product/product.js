// Déclaration du module 'product'
angular.module('ecDesktopApp.product', [
    'ngRoute',
]);

// Configuration du module 'product'
angular.module('ecDesktopApp.product').config(function ($routeProvider) {

    // TODO Définir les routes spécifiques au module 'product' ici
    .when('/product/listproduct', {
    		templateUrl : "template/listproduct.html",
    		controller : "product";//,
    		//controllerAs : ""
    })
});

// Contrôleur principal du module 'product'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.listproduct').controller('homeCtrl', function (userService) {

    var self = this;

    // ...

});