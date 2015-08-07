describe('customerServiceTest', function() {
	beforeEach(function(){
		module('ecDesktopApp.customer');
	});

	it("Les données du formulaires doivent être postées", inject(function(customerService, $httpBackend){
		var customer = {name : "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST("http://localhost:9001/data/bouchoncustomer.json",customer).respond(404,'');

		//$httpBackend.whenPOST('http://localhost:9001/#/customer/createCustomer',customer).respond(201,'');

		customerService.addCustomer(customer).then(function(response){
			console.log("Ok" + response);
		}, function(error){
			console.log("ko" + error);
		});

		$httpBackend.flush();

	}));


});
