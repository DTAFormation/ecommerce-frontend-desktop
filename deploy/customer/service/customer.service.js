angular.module('ecDesktopApp.customer').service('customerService', function($http) {
    var apiUrl = "data/api/customer/" ;
    //var apiUrl="http://5.196.89.85:9080/ec-backend/api/user/get/";

    //fonction d'ajout d'un client
    this.addCustomer = function(customer){
        console.log(customer);
        return $http.post(apiUrl, customer);
    };

    // Fonction qui récupère les données dans le bouchon bouchoncustomer.js 
    this.getCustomers = function(){
        console.log($http.get(apiUrl + "all.json")); 
        return $http.get(apiUrl+ "all.json")
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
        return $http.delete(apiUrl+id);
    };

    //recupere un client par Id
    this.getById = function(id){
        return $http.get(apiUrl+id+".json")
        .then(function (result) { //en cas de succes on retourne les data du client id
            return result.data;
        });
    };


   //fonction pour modifier un client
   this.updateCustomer = function(customer){
       console.log(customer); 
       return $http.put(apiUrl+customer.id, customer);
   };


});
