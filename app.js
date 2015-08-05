angular.module('ecDesktopApp', [
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ecDesktopApp.shared',
    'ecDesktopApp.home',
    'ecDesktopApp.product'
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
