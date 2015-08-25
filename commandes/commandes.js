// déclaration du module commandes
angular.module('ecDesktopApp.commandes', [
    'ngRoute',
    'ui.bootstrap',
    ]);


// routage
angular.module('ecDesktopApp.commandes').config(function($routeProvider) {

$routeProvider
	.when('/commandes/detailsCommande', {
		templateUrl:'commandes/template/detailsCommande.html',
		controller : "detailsCommandeCtrl",
		controllerAs:"dtlCmdCtrl",
	});

});

// controlleur pour l'affichage des détails d'une commande
angular.module('ecDesktopApp.commandes').controller('commandes', function(ventesService){
    var dtlCmdCtrl = this;
    var dtlCmdCtrl.commande = null;
});
