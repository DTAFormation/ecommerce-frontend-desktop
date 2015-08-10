describe('customerServiceTest', function() {
	beforeEach(function(){
		module('ecDesktopApp.customer');
	});

	it("Les données du formulaire de creation de client doivent être postées", inject(function(customerService, $httpBackend){
		var customer = {name : "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST("data/api/customer/",customer).respond(404,'');

		//$httpBackend.whenPOST('http://localhost:9001/#/customer/createCustomer',customer).respond(201,'');

		customerService.addCustomer(customer).then(function(response){
			console.log("Ok" + response);
		}, function(error){
			console.log("ko" + error);
		});

		$httpBackend.flush();

	}));//fin du 1er it

	it("Test sur la suppression d'un client", inject(function(customerService, $httpBackend){
		var id = 1;

		$httpBackend.expectDELETE("data/api/customer/"+id).respond(200,'');
		customerService.deleteCustomer(id);
		$httpBackend.flush();

	}));//fin du 2eme it



});
