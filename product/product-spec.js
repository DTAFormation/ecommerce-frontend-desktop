// Tests unitaires module / contrôleurs product
describe("createProductCtrl Tests", function(){

	beforeEach(function(){
		module('ecDesktopApp.product');
	});

	it("test unitaire createProductCtrl.addProduct en cas de error:404",inject(function($controller, $httpBackend){
		var createProductCtrl = $controller('createProductCtrl');
		var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};

		$httpBackend.expectPOST('data/api/product/', {id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(404, '');
       
		createProductCtrl.addProd(product);

		$httpBackend.flush();
		//console.log(createProductCtrl.err);
		expect(createProductCtrl.err).toEqual(true);

	}));

	it("test unitaire createProductCtrl.addProduct en cas de succes:201",inject(function($controller, $httpBackend){
		var createProductCtrl = $controller('createProductCtrl');
		var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};

		$httpBackend.expectPOST('data/api/product/', {id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(201, '');
       
		createProductCtrl.addProd(product);

		$httpBackend.flush();

		expect(createProductCtrl.err).toEqual(false);
	}));

});
