angular.module('ecDesktopApp.customer').service('customerService', function($http) {
	var apiUrl = "http://localhost:9001/data/bouchoncustomer.json" ;

    //fonction d'ajout d'un client
    this.addCustomer = function(customer){
        console.log(customer);
      return $http.post(apiUrl, customer);
  };

	// Fonction qui récupère les données dans le bouchon bouchoncustomer.js 
	this.getCustomers = function(){
     return $http.get(apiUrl)
       .then(
        function(response){
            return response.data;
        })
       .then(
        function(customers){
            var customersModifie = angular.copy(customers);
            for (var i = 0; i<customersModifie.length;i++)
            {
                customersModifie[i]["addressString"] = customersModifie[i].address.number+" "+customersModifie[i].address.street+" "+customersModifie[i].address.city;
            }
            //console.log("customersModifie:"+JSON.stringify(customersModifie));
            return customersModifie;
        });  
 };

    //service de suppression de client
    this.deleteCustomer = function(id){
		return $http.delete(apiUrl+"/customer/"+id);
    };


});
