// Tests unitaires module / contrôleurs app
describe('ecDesktopCtrl', function() {
	beforeEach(function(){
		module('ecDesktopApp');
	});

	it('is a functionnal controller', inject(function($rootScope, $controller){
		var scope = $rootScope.$new();
		var controller = $controller('ecDesktopCtrl');
		expect(controller).toBeDefined();
	}));
});

describe('DropdownCtrl', function() {
	beforeEach(function(){
		module('ecDesktopApp');
	});

	it('links to the right places', inject(function($rootScope, $controller){
		var scope = $rootScope.$new();
		var controller = $controller('DropdownCtrl',{'$scope' : scope});

		var testProductsFunctions = [
		{affichage:'Afficher Produits',url:'#/product/listproduct'},
		{affichage:'Créer Produit',url:'#/product/createProduct'}
		];

		var testClientsFunctions = [
		{affichage:'Afficher Clients',url:'#/customer/listcustomer'},
		{affichage:'Créer Client',url:'#/customer/createCustomer'}
		];

		var testOrdersFunctions= [
    {affichage:'Afficher Commandes',url:'#/commandes/listCommandes'},
    {affichage:'Rechercher Commande par ID,Client,...',url:'#/ccccc'}
    ];

		var testStatsFunctions= [
    {affichage:'Afficher les meilleurs clients',url:'#/stats/bestCustomers'},
    {affichage:'Afficher les produits les plus vendus',url:'#/bbbbb'},
    {affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc'},
    {affichage:'Histogramme des ventes mensuelles cette année',url:'#/stats/Ventes'}
    ];

		expect(angular.equals(scope.productsFunctions,testProductsFunctions)).toBe(true);
		expect(angular.equals(scope.clientsFunctions,testClientsFunctions)).toBe(true);
		expect(angular.equals(scope.ordersFunctions,testOrdersFunctions)).toBe(false);
		expect(angular.equals(scope.statsFunctions,testStatsFunctions)).toBe(true);

	}));
});
