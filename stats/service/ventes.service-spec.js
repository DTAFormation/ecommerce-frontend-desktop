describe("Test du ventesService", function() {

	var mockCommandes = [{
      user_id: "1",
      prix_total: 1050,
      panier: [
        {
          id: 1,
          libelle: "Produit 1",
          prix: 150,
          image: "http://lorempixel.com/120/120",
          quantite: 2
        },
        {
          id: 2,
          libelle: "Produit 2",
          prix: 150,
          image: "http://lorempixel.com/120/120",
          quantite: 5
        }
      ],
      type_paiement: "Chèque",
      id: 1,
      date: "24/08/2015"
    }];

    beforeEach(function() {
		module("ecDesktopApp.stats");
	});

it("Récupérer toutes les commandes", inject(function(ventesService, $httpBackend) {

		$httpBackend.expectGET('http://localhost:3000/commande').respond(200, mockCommandes);

		ventesService.getCommandes().then(function (result){
			expect(result.length).toBe(mockCommandes.length);
			expect(result[0].user_id).toBe(mockCommandes[0].user_id);
			expect(result[0].prix_total).toBe(mockCommandes[0].prix_total);
			expect(result[0].panier[0].id).toBe(mockCommandes[0].panier[0].id);
			expect(result[0].panier[0].prix).toBe(mockCommandes[0].panier[0].prix);
			expect(result[0].panier[0].image).toBe(mockCommandes[0].panier[0].image);
			expect(result[0].panier[0].quantite).toBe(mockCommandes[0].panier[0].quantite);
			expect(result[0].panier[1].id).toBe(mockCommandes[0].panier[1].id);
			expect(result[0].panier[1].prix).toBe(mockCommandes[0].panier[1].prix);
			expect(result[0].panier[1].image).toBe(mockCommandes[0].panier[1].image);
			expect(result[0].panier[1].quantite).toBe(mockCommandes[0].panier[1].quantite);
			expect(result[0].type_paiement).toBe(mockCommandes[0].type_paiement);
			expect(result[0].id).toBe(mockCommandes[0].id);
			expect(result[0].date).toBe(mockCommandes[0].date);
		});
		$httpBackend.flush();
	}));
});