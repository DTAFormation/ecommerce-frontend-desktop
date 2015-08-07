describe('productServiceTest', function() {

	beforeEach(function() {
		module('ecDesktopApp.product');

 });

    // Tests
	it("Le service productService.addProduct()"+
		"ajoute le produit a la base avec un POST", inject(function(productService, $httpBackend) {
        //expect(7).toEqual(7);
        var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectPOST('http://localhost:9001/data/bouchonproduct.json', {id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(201, '');
        productService.addProduct(product);
        $httpBackend.flush();
	}));


});
