describe("Test des controllers du module stats", function() {

  var mockCommandes2 = [
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

  var mockPromise2 = {
    then : function(fn){
      fn(mockCommandes2);
    }
  };

  beforeEach(function() {
    module("ecDesktopApp.stats");
  });

  it("BestCustomersController : Récupérer les dix meilleurs clients", inject(function($controller, commandeService) {

    var bestCtrl = $controller("BestCustomersController");
    spyOn(commandeService, "getCommandes").and.returnValue(mockPromise2);
    bestCtrl.fetchCustomers();
    expect(bestCtrl.customers.length).toEqual(2);
    expect(bestCtrl.customers[0]).toEqual({id : 2, nom : "GUILLOTEAU", prenom : "Nathan", total : 300});
    expect(bestCtrl.customers[1]).toEqual({id : 3, nom : "LEBON", prenom : "Jonathan", total : 7299.98});

    bestCtrl.changeTri();

    expect(bestCtrl.tri).toEqual("nbCommandes");
    expect(bestCtrl.customers.length).toEqual(2);
    expect(bestCtrl.customers[0]).toEqual({id : 2, nom : "GUILLOTEAU", prenom : "Nathan", total : 1});
    expect(bestCtrl.customers[1]).toEqual({id : 3, nom : "LEBON", prenom : "Jonathan", total : 2});

  }));

  

});