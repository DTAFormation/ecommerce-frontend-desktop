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
        templateUrl : "customer/template/listcustomer.html",
        controller : "customerCtrl",
        controllerAs : "customerCtrl"
    });

});

// Contrôleur principal du module 'createCustomer'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.customer').controller('CreateCustomerController', function (customerService) {

    var self = this;
        
    self.addCustomer = function(customer){
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
    .then(function(response) {
        return response.data;
    })
    .then(function (customer) {
        console.log(customer);
        self.customers = customer;
    });

    self.delCustomer = function(id){
        console.log("function delCustomer sur le client "+id);
        customerService.deleteCustomer(id) // appel du service de suppresion d'un client
        .then(function(succes){
            console.log('succes lors de la requete de suppression de client');
            //customerService.getCustomers(); //recharge la liste des clients a jour
            self.err=false;
            //return succes.data;
        },function(error){
            self.err=true;
            setTimeout(function(){window.location.reload();},2000);
            console.log('erreur lors de la requete de suppression de client');
        });
    };

// ...

});


