
// Déclaration du module 'Customer'
angular.module('ecDesktopApp.customer', [
    'ngRoute',
    'ecDesktopApp.shared'
]);

// Configuration du module 'home'
angular.module('ecDesktopApp.customer').config(function($routeProvider) {

    $routeProvider
    .when("/customer/createCustomer",{
        templateUrl : "customer/template/createCustomer.tpl.html",
        controller: "CreateCustomerController",
        controllerAs: "createCustomer"

    });

});

// Contrôleur principal du module 'createCustomer'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.customer').controller('CreateCustomerController', function(customerService, $location) {

 
    
    this.addCustomer = function(customer){
        
       // if (customer.$invalid) {return;}
       
        var clone = angular.copy(customer);
       customerService.addCustomer(clone).then(function(){
            $location.path("/home");
        });
        


    };



});
