angular.module('ecDesktopApp', [
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ecDesktopApp.shared',
    'ecDesktopApp.home',
    'ecDesktopApp.product',
    'ecDesktopApp.customer',
    'ui.bootstrap'
    ]);

angular.module('ecDesktopApp').config(function($routeProvider) {

    // Ici, les routes générales de l'application
    // Pas de route spécifique ici !
    // Elles doivent être déclarées dans des sous-modules (comme 'home')


    $routeProvider
        .when('/product/listproduct', { //
            templateUrl : "product/template/listproduct.html",
            controller : "productCtrl",
            controllerAs : "productCtrl"
        })
        .when('/customer/listcustomer', { //
            templateUrl : "customer/template/listcustomer.html",
            controller : "customerCtrl",
            controllerAs : "customerCtrl"
        })
        .otherwise({redirectTo:'/home'});



    });

angular.module('ecDesktopApp').run(function($rootScope) {

});

// Contrôleur qui pilote globalement l'application
angular.module('ecDesktopApp').controller("ecDesktopCtrl", function() {
    this.title = "ECommerce Desktop";
});

angular.module('ecDesktopApp').controller('DropdownCtrl', function ($scope) {
    $scope.productsFunctions= [
    {affichage:'Afficher Produits',url:'#/aaaaa'},
    {affichage:'Créer Produit',url:'#/bbbbb'},
    {affichage:'Modifier Produit',url:'#/ccccc'},
    {affichage:'Supprimer Produit',url:'#/ddddd'}
    ];

    $scope.clientsFunctions= [
    {affichage:'Afficher Clients',url:'#/aaaaa'},
    {affichage:'Créer Clients',url:'#/bbbbb'},
    {affichage:'Modifier Clients',url:'#/ccccc'},
    {affichage:'Supprimer Clients',url:'#/ddddd'}
    ];

    $scope.ordersFunctions= [
    {affichage:'Afficher Commandes',url:'#/aaaaa'},
    {affichage:'Annuler Commande',url:'#/bbbbb'},
    {affichage:'Rehercher Commande par ID,Client,...',url:'#/ccccc'}
    ];

    $scope.statsFunctions= [
    {affichage:'Afficher les meilleurs clients',url:'#/aaaaa'},
    {affichage:'Afficher les produits les plus vendus',url:'#/bbbbb'},
    {affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc'},
    {affichage:'Histogramme des ventes mensuelles cette année',url:'#/ddddd'}
    ];
});