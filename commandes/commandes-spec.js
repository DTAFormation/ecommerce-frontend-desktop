describe("Test du controlleur de commandes", function() {

    var mockCmd = {
        "id":1,
        "client":{
            "id":2,
            "actif":true,
            "nom":"GUILLOTEAU",
            "prenom":"Nathan",
            "login":"loginDeNathan",
            "adresses":[{"id":2,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"},{"id":2,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"}]
        },
        "commandeProduits":[{
            "id":3,
            "quantite":3,
            "produit":{"id":1,"libelle":"Truc High-Tech","caracteristique":"Il sert ? rien mais il est cool","categorie":"High-Tech","image":"http://lorempixel.com/200/200/technics","prix":100.0}
        }],
        "etat":"EC"
    };

    var mockCmdUpdated = {
        "id":1,
        "client":{
            "id":2,
            "actif":true,
            "nom":"GUILLOTEAU",
            "prenom":"Nathan",
            "login":"loginDeNathan",
            "adresses":[{"id":2,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"},{"id":2,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"}]
        },
        "commandeProduits":[{
            "id":3,
            "quantite":3,
            "produit":{"id":1,"libelle":"Truc High-Tech","caracteristique":"Il sert ? rien mais il est cool","categorie":"High-Tech","image":"http://lorempixel.com/200/200/technics","prix":100.0}
        }],
        "etat":"AN"
    };

    beforeEach(function() {
        module("ecDesktopApp.commandes");
    });

    it("Passe le statut de la commande en annulé", inject(function($controller, $httpBackend, API_URL) {
        var commandeCtrl = $controller("commandeCtrl");
        $httpBackend.expectGET(API_URL + '/commande').respond(200);
        $httpBackend.expectPUT(API_URL + '/commande', mockCmd).respond(200, mockCmdUpdated);
        $httpBackend.expectGET(API_URL + '/commande').respond(200);
        commandeCtrl.annulerCommande(mockCmd);
        $httpBackend.flush();
    }));

    it("Envoie sur la page de la commande 1", inject(function($controller, commandeService, $httpBackend, $location, API_URL) {
        var rechCmdCtrl = $controller("rechercheCmdCtrl");
        rechCmdCtrl.idCmd = 1;
        $httpBackend.expectGET(API_URL + '/commande/1').respond(200, mockCmd);
        rechCmdCtrl.goToCommande();
        $httpBackend.flush();
        expect($location.path()).toEqual("/commandes/detailsCommande/1");
    }));

    it("Ne change pas de page en cas de commande inexistante", inject(function($controller, commandeService, $httpBackend, $location, API_URL) {
        var rechCmdCtrl = $controller("rechercheCmdCtrl");
        rechCmdCtrl.idCmd = 2;
        $httpBackend.expectGET(API_URL + '/commande/2').respond(404);
        rechCmdCtrl.goToCommande();
        $httpBackend.flush();
        expect(rechCmdCtrl.err).toEqual(true);
    }));
});

describe("Test du controlleur du détail des commandes", function() {

    var mockCmd = {
      "id":14,
      "client":{
          "id":8,
          "actif":true,
          "nom":"KLEIN",
          "prenom":"Pauline",
          "login":"loginPauline",
          "adresses":[{"id":8,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"}]},
      "commandeProduits":[{
          "id":17,
          "quantite":4,
          "produit":{"id":2,"libelle":"Moto","caracteristique":"Elle a 2 roues et un guidon","categorie":"Vehicule","image":"http://lorempixel.com/200/200/transport","prix":2999.99,"actif":true}}],
      "facture":{"id":14,"date":1167606000000,"modePaiement":"Par CB","adresseLivraison":{"id":8,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"},"adresseFacturation":{"id":8,"numero":1,"rue":"rue capitaine corhumel","ville":"Nantes"}},
      "etat":"EC"
    };

    beforeEach(function() {
        module("ecDesktopApp.commandes");
    });

    it("Affiche les informations de la bonne commande", inject(function($controller, commandeService, $httpBackend, $routeParams, API_URL ){
        $httpBackend.expectGET(API_URL + '/commande/14').respond(200,mockCmd);

        var dtlCmdCtrl = $controller("detailCommandeCtrl", {
          '$routeParams' : {
            id: 14
          }
        });

        $httpBackend.flush();

        expect(dtlCmdCtrl.selectedCommande).toEqual(mockCmd);

        }));

});
