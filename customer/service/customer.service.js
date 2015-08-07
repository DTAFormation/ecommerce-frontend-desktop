angular.module('ecDesktopApp.customer').service('customerService', function($http) {
	var apiUrl = "data/api/customer/" ;

    //fonction d'ajout d'un client
	this.addCustomer = function(customer){
		return $http.post(apiUrl, customer);
	};

	// Fonction qui récupère les données dans le bouchon bouchoncustomer.js 
	this.getCustomers = function(){
     console.log($http.get(apiUrl + "all.json")); 
     return $http.get(apiUrl + "all.json");  
    };

  this.get = function(id){ 
		return $http.get(apiUrl +id + ".json").then(function (result) {
                    return result.data;
        });
   };
   

   //fonction pour modifier un client
    this.updateCustomer = function(customer){
		console.log(customer); 
		return $http.put(apiUrl, customer);
	};


});
