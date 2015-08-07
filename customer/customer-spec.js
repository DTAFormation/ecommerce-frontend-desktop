describe('customerTest', function() {

	beforeEach(function(){
		module('ecDesktopApp.customer');
	});

	it("test unitaire createCustomerController.addCustomer en cas de error:404",inject(function($controller, $httpBackend){
		var createCustomerCtrl = $controller('CreateCustomerController');
		var customer = {name: "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST("http://localhost:9001/data/bouchoncustomer.json", customer).respond(404, '');
       
		createCustomerCtrl.addCustomer(customer);

		$httpBackend.flush();
		expect(createCustomerCtrl.err).toEqual(true);

	}));


	it("test unitaire createCustomerCtrl.addCustomer en cas de succes:201",inject(function($controller, $httpBackend){
		var createCustomerCtrl = $controller('CreateCustomerController');
		var customer = {name : "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST("http://localhost:9001/data/bouchoncustomer.json", customer).respond(201, '');
       
		createCustomerCtrl.addCustomer(customer);

		$httpBackend.flush();

		expect(createCustomerCtrl.err).toEqual(false);
	}));

});
