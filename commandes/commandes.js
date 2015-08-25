// déclaration du module commandes
angular.module('ecDesktopApp.commandes', [
    'ngRoute',
    'ui.bootstrap',
    'ecDesktopApp.shared'
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
angular.module('ecDesktopApp.commandes').controller('commandes', function($location,$routeParams,commandeService){
    var dtlCmdCtrl = this;

    dtlCmdCtrl.getDetailsProduit();

    dtlCmdCtrl.getDetailsProduit = function () {
      commandeService.getDetailsProduit($routeParams.id).then(function (result){
        dtlCmdCtrl.commande = result;
      });
    };

    dtlCmdCtrl.commande = null;
});
