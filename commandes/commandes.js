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
    .when('/commandes/rechercheCommande', {
        templateUrl : "commandes/template/rechercheCommande.html",
        controller : "rechercheCmdCtrl",
        controllerAs : "rechercheCmdCtrl"
    })
    .when('/commandes/detailsCommande', {
      templateUrl:'commandes/template/detailsCommande.html',
      controller : "detailsCommandeCtrl",
      controllerAs:"dtlCmdCtrl"
    })
    .when('/commandes/detailsCommande/:id', {
      templateUrl:'commandes/template/detailsCommande.html',
      controller : "detailCommandeCtrl",
      controllerAs : "dtlCmdCtrl"
    });
});


//controlleur pour formulaire liste des commandes
angular.module('ecDesktopApp.commandes').controller('commandeCtrl', function (commandeService,$routeParams,$location) {

    var commandeCtrl = this;
    commandeCtrl.commandes = null;

    commandeCtrl.getCommandes = function() {
        commandeService.getCommandes()
        .then(function(commandes) {
            commandeCtrl.commandes = commandes;
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
  dtlCmdCtrl.montant = null;
  dtlCmdCtrl.nbreProduits = null;


  dtlCmdCtrl.getDetailCommande = function (){
    commandeService.getDetailCommande($routeParams.id)
      .then(function (result){
        dtlCmdCtrl.selectedCommande = result;
      })
      .then(function(){
      })
      .then(function(){
          dtlCmdCtrl.selectedCommande.commandeProduits.forEach(function(objet){
            dtlCmdCtrl.montant += (objet.produit.prix * objet.quantite);
            dtlCmdCtrl.nbreProduits += objet.quantite;
          });
      });
  };

    dtlCmdCtrl.getDetailCommande();


    // dtlCmdCtrl.calculMontant_nbreProduits = function (){
    //
    // };
    //
    // // dtlCmdCtrl.calculMontant_nbreProduits();
});

angular.module('ecDesktopApp.commandes').controller('rechercheCmdCtrl', function(commandeService, $location) {

    var rechercheCmdCtrl = this;
    rechercheCmdCtrl.idCmd = null;

    rechercheCmdCtrl.goToCommande = function() {
        $location.path("/commandes/" + rechercheCmdCtrl.idCmd);
    };

});
