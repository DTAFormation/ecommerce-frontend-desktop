angular.module('ecDesktopApp.customer').service('customerService', function($http) {
	var apiUrl = "http://localhost:9001/data/bouchoncustomer.json" ;

    //fonction d'ajout d'un client
	this.addCustomer = function(customer){
		return $http.post(apiUrl, customer);
	};

	// Fonction qui récupère les données dans le bouchon bouchoncustomer.js 
	this.getCustomers = function(){
     console.log($http.get(apiUrl)); 
     return $http.get(apiUrl);  
    };

    //service de suppression de client
    this.deleteCustomer = function(id){
		return $http.delete(apiUrl+"/customer/"+id);
    };


});
