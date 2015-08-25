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

  console.log("cmdctrl");

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

  dtlCmdCtrl.getDetailCommande = function (){
    commandeService.getDetailCommande($routeParams.id)
      .then(function (result){
        console.log("dans la promesse");
        dtlCmdCtrl.selectedCommande = result;
      })
      .then(function(){
        console.log(dtlCmdCtrl.selectedCommande);
      });
  };

    dtlCmdCtrl.getDetailCommande();
});

angular.module('ecDesktopApp.commandes').controller('rechercheCmdCtrl', function(commandeService, $location) {

    var rechercheCmdCtrl = this;
    rechercheCmdCtrl.idCmd = null;

    rechercheCmdCtrl.goToCommande = function() {
        $location.path("/commandes/" + rechercheCmdCtrl.idCmd);
    };

});
