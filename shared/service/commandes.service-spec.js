describe("Test du commandeService", function() {

    beforeEach(function() {
        module("ecDesktopApp.shared");
    });

    it("Récupère une commande en fonction de l'ID", inject(function(commandeService, $httpBackend, API_URL) {
        var mockCommande = {
          "id":2,
          "client":{
              "id":2,
              "actif":false,
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
          "etat":"Termin"
      };

      $httpBackend.expectGET(API_URL + '/user/commande/2').respond(200, mockCommande);

      commandeService.getDetailCommande(2)
      .then(function(result) {
          expect(result.length).toEqual(mockCommande.length);
          expect(result.id).toEqual(mockCommande.id);
          expect(result.client).toEqual(mockCommande.client);
          expect(result.commandeProduits).toEqual(mockCommande.commandeProduits);
          expect(result.etat).toEqual(mockCommande.etat);
      });
    }));

    it("Récupère tous les produits du panier", inject(function(commandeService, $httpBackend, API_URL){
        var mockCommandes = [
            {
              "id":2,
              "client":{
                  "id":2,
                  "actif":false,
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
              "etat":"Termin"
            },
            {
              "id":3,
              "client":{
                "id":3,
                "actif":true,
                "nom":"LEBON",
                "prenom":"Jonathan",
                "login":"loginDeJo",
                "adresses":[{"id":3,"numero":6,"rue":"rue athenas","ville":"Nantes"}]
              },
              "commandeProduits":[
                {
                  "id":4,
                  "quantite":2,
                  "produit":{"id":2,"libelle":"Moto","caracteristique":"Elle a 2 roues et un guidon","categorie":"Vehicule","image":"http://lorempixel.com/200/200/transport","prix":2999.99}
                },
                {
                  "id":3,
                  "quantite":6,
                  "produit":{"id":1,"libelle":"Truc High-Tech","caracteristique":"Il sert ? rien mais il est cool","categorie":"High-Tech","image":"http://lorempixel.com/200/200/technics","prix":100.0}
                }
              ],
              "etat":"Termin"
            },
            {
              "id":4,
              "client":{
                "id":3,
                "actif":true,
                "nom":"LEBON",
                "prenom":"Jonathan",
                "login":"loginDeJo",
                "adresses":[{"id":3,"numero":6,"rue":"rue athenas","ville":"Nantes"}]
              },
              "commandeProduits":[
                {
                  "id":1,
                  "quantite":2,
                  "produit":{"id":2,"libelle":"Moto","caracteristique":"Elle a 2 roues et un guidon","categorie":"Vehicule","image":"http://lorempixel.com/200/200/transport","prix":50}
                },
                {
                  "id":5,
                  "quantite":6,
                  "produit":{"id":1,"libelle":"Truc High-Tech","caracteristique":"Il sert ? rien mais il est cool","categorie":"High-Tech","image":"http://lorempixel.com/200/200/technics","prix":100.0}
                }
              ],
              "etat":"Termin"
            }
          ];

        $httpBackend.expectGET(API_URL + '/user/commande').respond(200, mockCommandes);

        commandeService.getCommandes().then(function (result){
            expect(result.length).toEqual(mockCommandes.length);
            expect(result[0].id).toEqual(mockCommandes[0].id);
            expect(result[0].client).toEqual(mockCommandes[0].client);
            expect(result[0].commandeProduits).toEqual(mockCommandes[0].commandeProduits);
            expect(result[0].etat).toEqual(mockCommandes[0].etat);
            expect(result[1].id).toEqual(mockCommandes[1].id);
            expect(result[1].client).toEqual(mockCommandes[1].client);
            expect(result[1].commandeProduits).toEqual(mockCommandes[1].commandeProduits);
            expect(result[1].etat).toEqual(mockCommandes[1].etat);
            expect(result[2].id).toEqual(mockCommandes[2].id);
            expect(result[2].client).toEqual(mockCommandes[2].client);
            expect(result[2].commandeProduits).toEqual(mockCommandes[2].commandeProduits);
            expect(result[2].etat).toEqual(mockCommandes[2].etat);
        });

        $httpBackend.flush();
    }));

});
