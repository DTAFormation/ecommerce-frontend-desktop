angular.module('ecDesktopApp.customer').service('customerService', function($http, API_URL) {
    var url=API_URL + "/user/";

    //fonction d'ajout d'un client
    this.addCustomer = function(customer){
        return $http.post(url, customer);
    };

    // Fonction qui récupère les données dans le bouchon bouchoncustomer.js
    this.getCustomers = function(){

        return $http.get(url)

        .then(
            function(response){
                return response.data;
            })
        .then(
            function(customers){
                var customersModifie = angular.copy(customers);
                for (var i = 0; i<customersModifie.length;i++)
                {
                    customersModifie[i]["addressString"] = customersModifie[i].adresses.numero+" "+customersModifie[i].adresses.rue+" "+customersModifie[i].adresses.ville;
                }

            return customersModifie;
        });
    };

    //service de suppression de client
    this.deleteCustomer = function(id){
        return $http.delete(url+id);
    };

    //recupere un client par Id
    this.getById = function(id){
        return $http.get(url+id)
        .then(function (result) { //en cas de succes on retourne les data du client id
            return result.data;
        });
    };


   //fonction pour modifier un client
   this.updateCustomer = function(customer){

       return $http.put(url, customer);

   };

   //adresses must have empty id
   this.addAdressesCustomer = function(id,adresses){
        return $http.post(url+id+"/adresses/", adresses);
   }

    this.getlogin = function(login){
      return $http.get(url+"chercher/"+login);
    };


});
