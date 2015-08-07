// Déclaration du module 'Customer'
angular.module('ecDesktopApp.customer', [
    'ngRoute',
   // 'ecDesktopApp.shared'
]);

// Configuration du module 'home'
angular.module('ecDesktopApp.customer').config(function($routeProvider) {

    $routeProvider
    .when("/customer/createCustomer",{
        templateUrl : "customer/template/createCustomer.tpl.html",
        controller: "CreateCustomerController",
        controllerAs: "createCustomer"

    })
    .when('/customer/listcustomer', { //
        controller : "customerCtrl",
        controllerAs : "customerCtrl"
    });

});

// Contrôleur principal du module 'createCustomer'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.customer').controller('createCustomer', function(customerService) {

    var createCustomer = this;

    createCustomer.addCustomer = function(form){
        if (form.$invalid) {return;}
        var clone = angular.copy(createCustomer.emp);
        customerService.addCustomer(clone);
        


    };



});

//controlleur pour formulaire liste des clients
angular.module('ecDesktopApp.customer').controller('customerCtrl', function (customerService) {


    var self = this;
    customerService.getCustomers().then(
                function(response) {
                    return response.data;
                })
            .then(
                function (customer) {
                    console.log(customer);
                    self.customers = customer;
                });

// ...

});


