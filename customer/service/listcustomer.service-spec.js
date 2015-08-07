//test unitaire pour la liste des clients

describe('listcustomerServiceTest', function() {

     beforeEach(function(){
        module("ecDesktopApp.customer");
    });

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
        $httpBackend.when("GET", "http://localhost:9001/data/bouchoncustomer.json").respond(reponseSimule);

        //récupération des données
        var reponsePromesse=customerService.getCustomers();

        // vérification du résultat
        reponsePromesse.then(function(response){
            var customer = response.data;
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

    }));
});
