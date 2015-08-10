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

angular.module('ecDesktopApp').config(['$routeProvider', function($routeProvider, $locationProvider) {

    // Ici, les routes générales de l'application
    // Pas de route spécifique ici !
    // Elles doivent être déclarées dans des sous-modules (comme 'home')


    $routeProvider
    .when('/login', {
        controller : 'LoginController',
        templateUrl : 'login/authentification.html',
        controllerAs : 'vm'
    })
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
        // .when('/home',{
        //     templateUrl : "/home",
        //     controller : "",
        //     controllerAs : ""
        // })
        .otherwise({ redirectTo: '/home' });
        // .otherwise({redirectTo:'/login'});
    }]);



// Contrôleur qui pilote globalement l'application
angular.module('ecDesktopApp').controller("ecDesktopCtrl", function() {
    this.title = "ECommerce Desktop";
});

angular.module('ecDesktopApp').controller('DropdownCtrl', function ($scope) {
    $scope.productsFunctions= [
    {affichage:'Afficher Produits',url:'#/product/listproduct'},
    {affichage:'Créer Produit',url:'#/product/createProduct'},
    {affichage:'Modifier Produit',url:'#/product/listproduct'},
    {affichage:'Supprimer Produit',url:'#/product/listproduct'}
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
    {affichage:'Rechercher Commande par ID,Client,...',url:'#/ccccc'}
    ];

    $scope.statsFunctions= [
    {affichage:'Afficher les meilleurs clients',url:'#/aaaaa'},
    {affichage:'Afficher les produits les plus vendus',url:'#/bbbbb'},
    {affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc'},
    {affichage:'Histogramme des ventes mensuelles cette année',url:'#/ddddd'}
    ];
});
// .run(function($rootScope, $location, $cookieStore, $http) {
//     // maintenir l'utilisateur logger malgrés les F5 et les changements de pages
//     $rootScope.globals = $cookieStore.get('globals') || {};
//     if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         }

//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // renvoie vers la page login si non logger
//             if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                 $location.path('/login');
//             }
//         });
//     });
