angular.module('ecDesktopApp', [
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ecDesktopApp.shared',
    'ecDesktopApp.home',
    'ecDesktopApp.product',
    'ecDesktopApp.customer',
    'ecDesktopApp.authentification',
    'ecDesktopApp.stats',
    'ui.bootstrap',
    'chart.js'
    ]);

angular.module('ecDesktopApp').config(['$routeProvider', '$locationProvider', '$cookieStoreProvider', function($routeProvider, $locationProvider, $cookieStoreProvider) {

    // Ici, les routes générales de l'application
    // Pas de route spécifique ici !
    // Elles doivent être déclarées dans des sous-modules (comme 'home')


    $routeProvider
        .when('/login', {
        templateUrl : 'authentification/template/login.html',
        controller : 'LoginCtrl',
        controllerAs : 'loginCtrl'
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
        .when('/home',{
            templateUrl : "home/template/home.tpl.html",
            controller : "homeCtrl",
            controllerAs : "homeCtrl"
        })
        .when('/commandes/listCommandes', {
            templateUrl : "commandes/template/listCommandes.html",
            controller : "commandeCtrl",
            controllerAs : "commandeCtrl"
        })

        // .otherwise({ redirectTo: '/home' });
        .otherwise({redirectTo:'/login'});

    }]).run(['$rootScope', '$location', '$cookieStore', '$http',function($rootScope, $location, $cookieStore, $http) {
    // maintenir l'utilisateur loggé malgrés les F5 et les changements de pages
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
            //mettre un niveau d'accès de base à Basic pour un utilisateur arrivant, et lui ajouter une autorisation global si connecté
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
        //à chaque changement, verification si l'utilisateur est logger, si il ne l'est pas, renvoie vers la page de login
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // renvoie vers la page login si non logger
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                //$location.path('/login');
                $location.path('/');
            }
        });

    }]);



// Contrôleur qui pilote globalement l'application
angular.module('ecDesktopApp').controller("ecDesktopCtrl", function(loginService,$location) {
    var ecDCtrl = this;
    ecDCtrl.title = "ECommerce Desktop";
    ecDCtrl.logout=function(){
      loginService.ClearCredentials();
      $location.path('/login');
    };
});
// Contrôleur de la navbar
angular.module('ecDesktopApp').controller('DropdownCtrl', function ($scope) {
    $scope.productsFunctions= [
    {affichage:'Afficher Produits',url:'#/product/listproduct'},
    {affichage:'Créer Produit',url:'#/product/createProduct'},
    {affichage:'Modifier Produit',url:'#/product/listproduct'},
    {affichage:'Supprimer Produit',url:'#/product/listproduct'}
    ];

    $scope.clientsFunctions= [
    {affichage:'Afficher Clients',url:'#/customer/listcustomer'},
    {affichage:'Créer Client',url:'#/customer/createCustomer'}
    ];

    $scope.ordersFunctions= [
    {affichage:'Afficher Commandes',url:'#/commandes/listCommandes'},
    {affichage:'Rechercher Commande par ID,Client,...',url:'#/ccccc'}
    ];

    $scope.statsFunctions= [
    {affichage:'Afficher les meilleurs clients',url:'#/stats/bestCustomers'},
    {affichage:'Afficher les produits les plus vendus',url:'#/bbbbb'},
    {affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc'},
    {affichage:'Histogramme des ventes mensuelles cette année',url:'#/stats/Ventes'}
    ];
});
