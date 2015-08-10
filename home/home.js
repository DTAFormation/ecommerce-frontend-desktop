// Déclaration du module 'home' qui constitue la page d'accueil de l'administration
angular.module('ecDesktopApp.home', [
    'ngRoute',
    'ecDesktopApp.shared',
    'ui.bootstrap'
]);

// Configuration du module 'home'
angular.module('ecDesktopApp.home').config(function($routeProvider) {

    // Routes spécifiques au module 'home'
    $routeProvider
		.when("/home",{
			templateUrl:"home/template/home.tpl.html",
			controller:"homeCtrl"
		});
});

// Contrôleur principal du module 'home'
angular.module('ecDesktopApp.home').controller('homeCtrl', function(userService) {

    var self = this;

});



