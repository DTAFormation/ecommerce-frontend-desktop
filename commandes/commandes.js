// déclaration du module commandes
angular.module('ecDesktopApp.commandes', [
    'ngRoute',
    'ui.bootstrap',
    'ecDesktopApp.shared'
    ]);


// routage
angular.module('ecDesktopApp.commandes').config(function($routeProvider) {

    $routeProvider
    .when('/commandes/listCommandes/', {
        templateUrl : "commandes/template/listCommandes.html",
        controller : "commandeCtrl",
        controllerAs : "commandeCtrl"
    })
    .when('/commandes/rechercheCommande', {
        templateUrl : "commandes/template/rechercheCommande.html",
        controller : "rechercheCmdCtrl",
        controllerAs : "rechercheCmdCtrl"
    })
    .when('/commandes/detailsCommande/:id', {
      templateUrl:'commandes/template/detailsCommande.html',
      controller : "detailCommandeCtrl",
      controllerAs : "dtlCmdCtrl"
    });
});


//controlleur pour formulaire liste des commandes
angular.module('ecDesktopApp.commandes').controller('commandeCtrl', function (commandeService, ETATS_COMMANDE, ETATS_COMMANDE_LIBELLE, $routeParams,$location) {

  console.log("cmdctrl");

    var commandeCtrl = this;
    commandeCtrl.commandes = null;
    commandeCtrl.etatsCommande = ETATS_COMMANDE;
    commandeCtrl.etatsCommandeLibelle = ETATS_COMMANDE_LIBELLE;
    commandeCtrl.etat="EC";
    commandeCtrl.etatLibelle="En cours";

    commandeCtrl.annulerCommande = function(commande) {
        console.log("annulation");
    };

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

    commandeCtrl.goDetailsProduit = function (idClient, idCommande) {
        $location.path('/commandes/detailsCommande/'+idCommande);
    };
});

// controlleur de la vue dedétail d'une commande.
angular.module('ecDesktopApp.commandes').controller('detailCommandeCtrl', function (commandeService,$routeParams,$location) {

  var dtlCmdCtrl = this;
  dtlCmdCtrl.selectedCommande = null ;

  dtlCmdCtrl.getDetailCommande = function (){
    commandeService.getDetailCommande($routeParams.id)
      .then(function (result){
        dtlCmdCtrl.selectedCommande = result;
    });
  };

    dtlCmdCtrl.getDetailCommande();
});

angular.module('ecDesktopApp.commandes').controller('rechercheCmdCtrl', function(commandeService, $location) {

    var rechercheCmdCtrl = this;
    rechercheCmdCtrl.idCmd = null;
    rechercheCmdCtrl.err = false;

    rechercheCmdCtrl.goToCommande = function() {
        var cmd = null;
        commandeService.getDetailCommande(rechercheCmdCtrl.idCmd)
        .then(function(result) {
            cmd = result;
        })
        .then(function() {
            console.log(cmd);
            if (cmd == null) {
                rechercheCmdCtrl.err = true;
            } else {
                $location.path("/commandes/detailsCommande/" + rechercheCmdCtrl.idCmd);
            }
        });
    };

});
