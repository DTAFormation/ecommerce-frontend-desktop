angular.module('ecDesktopApp.stats', [
    'ngRoute',
    'ui.bootstrap',
    'chart.js'
    ]);


// Configuration du module 'product'
angular.module('ecDesktopApp.stats').config(function($routeProvider) {

// TODO Définir les routes spécifiques au module 'product' ici
$routeProvider
	.when('/stats/Ventes', {   //quand tu vois la route /product/createProduct utilise le template createProduct
		templateUrl:'stats/template/ventes.tpl.html',
		controller : "ventesCtrl",
		controllerAs:"ventesCtrl",
	});

});

// Contrôleur principal du module 'product'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.product').controller('ventesCtrl', function(ventesService){
    var self = this;
});
