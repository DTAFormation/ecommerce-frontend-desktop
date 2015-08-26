// Déclaration du module 'Customer'
angular.module('ecDesktopApp.commandes', [
    'ngRoute',
   ]);

// Configuration du module 'home'
angular.module('ecDesktopApp.commandes').config(function($routeProvider) {

    $routeProvider
    .when('/commandes/listCommandes/', {
        templateUrl : "commandes/template/listCommandes.html",
        controller : "commandeCtrl",
        controllerAs : "commandeCtrl"
    });
});

//controlleur pour formulaire liste des commandes
angular.module('ecDesktopApp.commandes').controller('commandeCtrl', function (commandeService, ETATS_COMMANDE, ETATS_COMMANDE_LIBELLE) {


    var commandeCtrl = this;
    commandeCtrl.commandes = null;
    commandeCtrl.etatsCommande = ETATS_COMMANDE;
    commandeCtrl.etatsCommandeLibelle = ETATS_COMMANDE_LIBELLE;
    commandeCtrl.etat="EC";
    commandeCtrl.etatLibelle="En cours";


    commandeCtrl.getCommandes = function() {
        commandeService.getCommandes()
        .then(function(commandes) {
            commandeCtrl.commandes = commandes;
        });
    };

    commandeCtrl.changerEtat = function(etat) {
      commandeService.getCommandes()
      .then(function(commandes) {
        commandeCtrl.etat=etat;
        switch (etat) {
          case "En cours":
            commandeCtrl.etat="EC";
            commandeCtrl.etatLibelle="En cours";
            break;
          case "Terminée":
            commandeCtrl.etat="TR";
            commandeCtrl.etatLibelle="Terminée";
            break;
          case "Annulée":
            commandeCtrl.etat="AN";
            commandeCtrl.etatLibelle="Annulée";
            break;
        }
      });
  };

    commandeCtrl.getCommandes();

});
