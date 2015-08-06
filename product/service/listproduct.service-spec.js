//test unitaire de listproduct.service

describe('listproductServiceTest', function(){
    //test
    beforeEach(function(){
        module("ecDesktopApp.product");
    });

    it("est ce que la fonction cherche la liste du produit? ", inject(function(productService,$httpBackend){
        //code du test de vérification

        //simulation de la réponse que l'on recevra
        var reponseSimule={id : 1, libelle : "libelle" , caracteristique : "carac", categorie : "categorie", image : "image" , prix : 0.10};

        //l'adresse sur laquelle on récupère les données
        $httpBackend.when("GET", "data/bouchonproduct.json").respond(reponseSimule);

        //récupération des données
        var reponsePromesse=productService.getProducts();

        // vérification du résultat
        reponsePromesse.then(function(response){
            var product = response.data;
            expect(product.id).toEqual(1);
            expect(product.libelle).toEqual("libelle");
            expect(product.caracteristique).toEqual("carac");
            expect(product.categorie).toEqual("categorie");
            expect(product.image).toEqual("image");
            expect(product.prix).toEqual(0.10);
        });
        
        //pour déclencher les réponses des requêtes faites avec $http.
        $httpBackend.flush();

    }));
});
