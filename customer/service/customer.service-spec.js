describe('customerServiceTest', function() {
	//var apiUrl="http://5.196.89.85:9080/ec-backend/api/user/get/";
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


    //test modification des clients
    
	it('test modification client', inject(function(_$httpBackend_, customerService) {
	    var mockBackend = _$httpBackend_;

	    mockBackend.expectPUT('data/api/customer/1', 
	    {
		    "id": 1,
		    "nom": "Dillon",
		    "prenom": "Gladice",
		    "login": "Hammond",
		    "email": "rosaliehammond@helixo.com",
		    "password": "hogan",
		    "address": {"number":12, "street":"rue Jean-Jean", "city":"Tomtom"}
		}).respond({});

	        // modified device name test
	    var item = {
		    id: 1,
		    nom: "Dillon",
		    prenom: "Gladice",
		    login: "Hammond",
		    email: "rosaliehammond@helixo.com",
		    password: "hogan",
		    address: {"number":12, "street":"rue Jean-Jean", "city":"Tomtom"}
		};
	    customerService.updateCustomer(item);

	    mockBackend.flush();
	        
	}));


	it("est ce que la fonction cherche la liste des clients? ", inject(function(customerService,$httpBackend){
        //code du test de vérification

        //simulation de la réponse que l'on recevra
        var reponseSimule= {
							    id: 1,
							    nom: "Dillon",
							    prenom: "Rosalie",
							    login: "Hammond",
							    email: "rosaliehammond@helixo.com",
							    password: "hogan",
							    adress: "12 rue tomtom"
                            };

        //l'adresse sur laquelle on récupère les données
        $httpBackend.when("GET", "data/api/customer/all.json").respond(reponseSimule);

        //récupération des données
        var reponsePromesse=customerService.getCustomers();

        // vérification du résultat
        reponsePromesse.then(function(response){
            console.log("response:"+JSON.stringify(response));
            var customer = response;
            expect(customer.id).toEqual(1);
            expect(customer.nom).toEqual("Dillon");
            expect(customer.prenom).toEqual("Rosalie");
            expect(customer.login).toEqual("Hammond");
            expect(customer.email).toEqual("rosaliehammond@helixo.com");
            expect(customer.password).toEqual("hogan");
            expect(customer.adress).toEqual("12 rue tomtom");
        });
        //pour déclencher les réponses des requêtes faites avec $http.
        $httpBackend.flush();
    })); // fin du test

});
