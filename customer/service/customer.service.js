angular.module('ecDesktopApp.customer').service('customerService', function($http) {
	var apiUrl;

	this.addCustomer = function(customer){
		return $http.post(apiUrl, customer);
	};


});
