// déclaration du module commandes
angular.module('ecDesktopApp.commandes', [
    'ngRoute',
    'ui.bootstrap',
    'ecDesktopApp.shared'
    ]);


// routage
angular.module('ecDesktopApp.commandes').config(function($routeProvider) {

$routeProvider
	.when('/commandes/detailsCommande/:id', {
		templateUrl:'commandes/template/detailsCommande.html',
		controller : "detailsCommandeCtrl",
		controllerAs:"dtlCmdCtrl",
	});

});

// controlleur pour l'affichage des détails d'une commande
angular.module('ecDesktopApp.commandes').controller('commandes', function($location,$routeParams,commandeService){
    var dtlCmdCtrl = this;

    dtlCmdCtrl.getDetailsProduit();

    var dtlCmdCtrl.getDetailsProduit = function () {
      commandeService.getDetailsProduit($routeParams.id).then(function (result){
        dtlCmdCtrl.commande = result;
      });
    }

    var dtlCmdCtrl.commande = null;
});
