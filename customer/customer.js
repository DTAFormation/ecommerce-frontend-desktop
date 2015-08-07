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
angular.module('ecDesktopApp.customer').controller('CreateCustomerController', function (customerService) {

    var self = this;
        
    self.addCustomer = function(customer){
       //if (customer.$invalid) {return;}
        
       customerService.addCustomer(customer)
       .then(function(response){
            self.err = false;
        },function(error){
             console.log("erreur de requette"); 
            self.err = true;
            console.log(self.err);
            
        });


    };



});

//controlleur pour formulaire liste des clients
angular.module('ecDesktopApp.customer').controller('customerCtrl', function (customerService) {


    var self = this;
    customerService.getCustomers()
            .then(
                function (customer) {
                    //console.log("customer:"+JSON.stringify(customer));
                    self.customers = customer;
                });

// ...

});


