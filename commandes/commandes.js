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
    .when("/commandes/:id",{
        templateUrl : "commandes/template/rechercheCommande.html",
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

angular.module('ecDesktopApp.commandes').controller('rechercheCmdCtrl', function(commandeService, $location) {

    var rechercheCmdCtrl = this;
    rechercheCmdCtrl.idCmd = null;

    rechercheCmdCtrl.goToCommande = function() {
        $location.path("/commandes/" + rechercheCmdCtrl.idCmd);
    };

});
