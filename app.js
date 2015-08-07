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
        .otherwise({redirectTo:'/home'});



});

angular.module('ecDesktopApp').run(function($rootScope) {

});

// Contrôleur qui pilote globalement l'application
angular.module('ecDesktopApp').controller("ecDesktopCtrl", function() {
    this.title = "ECommerce Desktop";
});

angular.module('ecDesktopApp').controller('DropdownCtrl', function ($scope) {
    $scope.productFunctions= [
    {affichage:'Afficher Produits',url:'#/aaaaa'},
    {affichage:'Créer Produit',url:'#/bbbbb'},
    {affichage:'Modifier Produit',url:'#/ccccc'},
    {affichage:'Supprimer Produit',url:'#/ddddd'}
    ];

  $scope.trucmucheFunctions = [
    {affichage:'1function1',url:'#/1'},
    {affichage:'2function2',url:'#/2'},
    {affichage:'3function3',url:'#/3'}
  ];

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});