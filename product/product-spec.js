// Tests unitaires module / contrôleurs product
describe("createProductCtrl Tests", function(){

    beforeEach(function(){
        module('ecDesktopApp.product');
    });

    it("test unitaire createProductCtrl.addProduct en cas de error:404",inject(function($controller, $httpBackend, API_URL){
        var apiUrl=API_URL + "/produit/";
        var createProductCtrl = $controller('createProductCtrl');
        var product={id:'1', actif:true, libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};

        $httpBackend.expectPOST(apiUrl, {id:'1', actif:true, libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(404, '');

        createProductCtrl.addProd(product);

        $httpBackend.flush();
        expect(createProductCtrl.err).toEqual(true);

    }));

    it("test unitaire createProductCtrl.addProduct en cas de succes:201",inject(function($controller, $httpBackend, API_URL){
        var apiUrl=API_URL + "/produit/";
        var createProductCtrl = $controller('createProductCtrl');
        var product={id:'1', actif:true, libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};

        $httpBackend.expectPOST(apiUrl, {id:'1', actif:true, libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(201, '');

        createProductCtrl.addProd(product);

        $httpBackend.flush();

        expect(createProductCtrl.err).toEqual(false);
    }));

    //test du controller d'update
    it("test unitaire updateCtrl.updateProduct",inject(function($controller, $httpBackend, API_URL){
        var product={id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        var apiUrl=API_URL + "/produit/";
        $httpBackend.when('GET',apiUrl+1).respond(200,product);
        var updateProductCtrl = $controller('updateProductController', {
            '$routeParams' : {
                id: 1
            }
        });

        $httpBackend.flush();
        $httpBackend.expectPUT(apiUrl, {id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(200, '');
        updateProductCtrl.updateProduct(product); //ici bug
        $httpBackend.flush();
    }));

    //test du controleur => meilleure manière (cf Rémi)
    //on mock les services = on fait croire que le service marche sans vraiment le lancer
    it("test unitaire updateCtrl.updateProduct 2 better way",inject(function($controller, productService, $location){
        var product={id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};

        var mockPromise =  {
            then : function(fn) {
                fn(product);
            }
        };

        spyOn(productService, "get").and.returnValue(mockPromise); // simule que le service est ok, "force le resultat"

        var updateProductCtrl = $controller('updateProductController', {
            '$routeParams' : {
                id: 1
            }
        });

        spyOn(productService,"updateProduct").and.returnValue(mockPromise); //simule la fonction updateProduct
        console.log(updateProductCtrl.product);

        spyOn($location, 'path'); // doit etre placé avant l'appel a la fonction

        updateProductCtrl.updateProduct(product);

        //on s'attend à ce que le location.path soit appelé avec le chemin defini dans la promesse du controlleur
        expect($location.path).toHaveBeenCalledWith('/product/listproduct');
    }));


});
