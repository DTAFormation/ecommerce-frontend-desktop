describe("Test des controllers du module stats", function() {
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
		var mockPromise =  {
		then : function(fn) {
			fn(mockCommandes);
		}
	};

    beforeEach(function() {
		module("ecDesktopApp.stats");
	});
});