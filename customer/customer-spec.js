describe('customerTest', function() {

	beforeEach(function(){
		module('ecDesktopApp.customer');
	});

	it("test unitaire createCustomerController.addCustomer en cas de error:404",inject(function($controller, $httpBackend){
		var createCustomerCtrl = $controller('CreateCustomerController');
		var customer = {name: "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST("data/api/customer/", customer).respond(404, '');
       
		createCustomerCtrl.addCustomer(customer);

		$httpBackend.flush();
		expect(createCustomerCtrl.err).toEqual(true);

	}));//fin du 1er it


	it("test unitaire createCustomerCtrl.addCustomer en cas de succes:201",inject(function($controller, $httpBackend){
		var createCustomerCtrl = $controller('CreateCustomerController');
		var customer = {name : "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST("data/api/customer/", customer).respond(201, '');
       
		createCustomerCtrl.addCustomer(customer);

		$httpBackend.flush();

		expect(createCustomerCtrl.err).toEqual(false);
	}));//fin du 2ieme it

	// TEST du del du controlleur en cas de succes
	it("test unitaire customerCtrl.delCustomer en cas de succes:200",inject(function($controller, $httpBackend){
		$httpBackend.when('GET',"data/api/customer/all.json").respond(200,'');
		
		var customerCtrl = $controller('customerCtrl');
		var id = 1;

		$httpBackend.expectDELETE("data/api/customer/"+ id).respond(200,'');
		customerCtrl.delCustomer(id);
		$httpBackend.flush();

		expect(customerCtrl.err).toEqual(false);
	}));//fin du 3ieme it

});
