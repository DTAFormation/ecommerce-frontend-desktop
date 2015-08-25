// déclaration du module commandes
angular.module('ecDesktopApp.commandes', [
    'ngRoute',
    'ui.bootstrap',
    ]);


// routage
angular.module('ecDesktopApp.commandes').config(function($routeProvider) {

$routeProvider
  .when('/commandes/listCommandes', {
      templateUrl : "commandes/template/listCommandes.html",
      controller : "commandeCtrl",
      controllerAs : "commandeCtrl"
  })
  .when('/commandes/detailsCommande', {
		templateUrl:'commandes/template/detailsCommande.html',
		controller : "detailsCommandeCtrl",
		controllerAs:"dtlCmdCtrl",
	});

});


//controlleur pour formulaire liste des commandes
angular.module('ecDesktopApp.commandes').controller('commandeCtrl', function (commandeService) {

    var commandeCtrl = this;
    commandeCtrl.commandes = null;

    commandeCtrl.getCommandes = function() {
        commandeService.getCommandes()
        .then(function(commandes) {
            commandeCtrl.commandes = commandes;
        });
    };

    commandeCtrl.getCommandes();
});

// controlleur pour l'affichage des détails d'une commande
angular.module('ecDesktopApp.commandes').controller('commandes', function(ventesService){
    var dtlCmdCtrl = this;
    dtlCmdCtrl.commande = null;
});
