describe('customerTest', function() {
	//var apiUrl="http://5.196.89.85:9080/ec-backend/api/user/get/";
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


//test du controleur de l'updateCustomer
	//on mock les services = on fait croire que le service marche sans vraiment le lancer
	it("test unitaire du controlleur modification client ",inject(function($controller, customerService, $location){
		var customer= {
		    id: 1,
		    nom: "Dillon",
		    prenom: "Rosalie",
		    login: "Hammond",
		    email: "rosaliehammond@helixo.com",
		    password: "hogan",
		    address: {"number":12, "street":"rue Jean-Jean", "city":"Tomtom"}
	};
		
		var mockPromise =  {
			then : function(fn) {
				fn(customer);
			}
		};

		spyOn(customerService, "getById").and.returnValue(mockPromise); // simule que le service est ok, "force le resultat"

		var updateCustomerCtrl = $controller('updateCustomereController', {
			'$routeParams' : {
				id: 1
			}
		});

		spyOn(customerService,"updateCustomer").and.returnValue(mockPromise); //simule la fonction updateCustomer
		console.log(updateCustomerCtrl.customer);

		spyOn($location, 'path'); // doit etre placé avant l'appel a la fonction

		updateCustomerCtrl.updateCustomer(customer);

		//on s'attend à ce que le location.path soit appelé avec le chemin defini dans la promesse du controlleur
       expect($location.path).toHaveBeenCalledWith('/customer/listcustomer');//correspond au $location.path de la fonction updateCustomer du controlleur updateCustomereController
	
	}));





});
