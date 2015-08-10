describe('productServiceTest', function() {

	beforeEach(function() {
		module('ecDesktopApp.product');

 });

    // Tests
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

    //test sur le service GET de produit
    it("Le service productService.get(id)"+
        " doit envoyer une requete GET avec les infos", inject(function(productService, $httpBackend){
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectGET('data/api/product/'+1+".json").respond(200, '');
        productService.get(1);
        $httpBackend.flush();
    }));


});
