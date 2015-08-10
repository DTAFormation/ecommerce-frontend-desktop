describe('productServiceTest', function() {

	beforeEach(function() {
		module('ecDesktopApp.product');

 });

    //test sur le service d'ajout' de produit
	it("Le service productService.addProduct()"+
		"ajoute le produit a la base avec un POST", inject(function(productService, $httpBackend) {
        //expect(7).toEqual(7);
        var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectPOST('data/api/product/', {id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(201, '');
        productService.addProduct(product);
        $httpBackend.flush();
	}));

    //test sur le service de maj de produit
    it("Le service productService.updtadeProduct(product)"+
        " doit envoyer une requete PUT avec les infos", inject(function(productService, $httpBackend){
        var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectPUT('data/api/product/'+1, {id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(200, '');
        productService.updateProduct(product);
        $httpBackend.flush();
    }));

    //test sur le service de récupération de produit par id
    it("Le service productService.get(id)"+
        " doit envoyer une requete GET avec les infos", inject(function(productService, $httpBackend){
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectGET('data/api/product/'+1+".json").respond(200, '');
        productService.get(1);
        $httpBackend.flush();
    }));

    //test sur le service de suppression de produit par id
    it("Le service productService.deleteProduct(id)"+
        " doit envoyer une requete DELETE avec l'id du produit'", inject(function(productService, $httpBackend){
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectDELETE('data/api/product/'+1+".json").respond(200, '');
        productService.deleteProduct(1);
        $httpBackend.flush();
    }));

    //test sur le service de récupération des produits
    it("Le service productService.getProducts()"+
        " doit envoyer une requete GET'", inject(function(productService, $httpBackend){
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectGET('data/bouchonproduct.json').respond(200, '');
        productService.getProducts();
        $httpBackend.flush();
    }));

});
