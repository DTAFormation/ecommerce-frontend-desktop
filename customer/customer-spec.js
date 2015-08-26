describe('customerTest', function() { //test du customer.js

	var mockcompteClient = [{nom : "aze", prenom : "aze", login : "aze@aze", password : "azeaze"}];
	beforeEach(function(){
		module('ecDesktopApp.customer');
	});

	it("test de la fonction doesNotExist doit renvoyer true si le login n'existe pas", inject(function($controller, $httpBackend, API_URL) {
		var apiUrl=API_URL + "/user/";
	    var value = "aze@aze";
		$httpBackend.expectGET(apiUrl+"chercher/"+value).respond(200, mockcompteClient);
	    var createCustomerCtrl = $controller("CreateCustomerController");
	    createCustomerCtrl.doesNotExist("aze@aze").then(function(result){
	      expect(result).toEqual(false);
	    });
	    $httpBackend.flush();
	}));


	it("test unitaire createCustomerController.ajoutClient en cas de error:404",inject(function($controller, $httpBackend, API_URL){
		var apiUrl=API_URL + "/user/";
		var createCustomerCtrl = $controller('CreateCustomerController');
		var customer = {name: "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST(apiUrl, customer).respond(404, '');

		createCustomerCtrl.ajoutClient(customer);

		$httpBackend.flush();
		expect(createCustomerCtrl.err).toEqual(true);

	}));


	it("test unitaire createCustomerCtrl.ajoutClient en cas de succes:201",inject(function($controller, $httpBackend, API_URL){
		var apiUrl=API_URL + "/user/";
		var createCustomerCtrl = $controller('CreateCustomerController');
		var customer = {name : "Dendooven", firstname :"Remi", address : "rue de la paix", login :"login", password :"password"};

		$httpBackend.expectPOST(apiUrl, customer).respond(201, '');

		createCustomerCtrl.ajoutClient(customer);

		$httpBackend.flush();

		expect(createCustomerCtrl.err).toEqual(false);
	}));

	// TEST du del du controlleur en cas de succes
	it("test unitaire customerCtrl.delCustomer en cas de succes:200",inject(function($controller, $httpBackend, API_URL){
		var apiUrl=API_URL + "/user/";
		$httpBackend.when('GET',apiUrl).respond(200,'');

		var customerCtrl = $controller('customerCtrl');
		var id = 1;

		$httpBackend.expectDELETE(apiUrl+id).respond(200,'');
		customerCtrl.delCustomer(id);
		$httpBackend.flush();

		expect(customerCtrl.err).toEqual(false);
	}));


//test du controleur de l'updateCustomer
	//on mock les services = on fait croire que le service marche sans vraiment le lancer
	it("test unitaire du controlleur modification client ",inject(function($controller, customerService, $location){
		var customer= {
		    id: 1,
		    nom: "Dillon",
		    prenom: "Rosalie",
		    login: "Hammond",
		    password: "hogan",
		    adresses: [{"number":12, "street":"rue Jean-Jean", "city":"Tomtom"}]
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

		spyOn($location, 'path'); // doit etre placé avant l'appel a la fonction

		updateCustomerCtrl.updateCustomer(customer);

		//on s'attend à ce que le location.path soit appelé avec le chemin defini dans la promesse du controlleur
       expect($location.path).toHaveBeenCalledWith('/customer/listcustomer');//correspond au $location.path de la fonction updateCustomer du controlleur updateCustomereController

	}));

});
