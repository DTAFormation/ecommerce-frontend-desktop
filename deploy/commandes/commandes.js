// Déclaration du module 'Customer'
angular.module('ecDesktopApp.commandes', [
    'ngRoute'
   ]);

// Configuration du module 'home'
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

angular.module('ecDesktopApp.commandes').controller('rechercheCmdCtrl', function(commandeService, $location) {

    var rechercheCmdCtrl = this;
    rechercheCmdCtrl.idCmd = null;

    rechercheCmdCtrl.goToCommande = function() {
        $location.path("/commandes/" + rechercheCmdCtrl.idCmd);
    };

});
