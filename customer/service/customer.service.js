angular.module('ecDesktopApp.customer').service('customerService', function($http) {
	var apiUrl = "data/bouchoncustomer.json" ;

	this.addCustomer = function(customer){
		return $http.post(apiUrl, customer);
	};


});
