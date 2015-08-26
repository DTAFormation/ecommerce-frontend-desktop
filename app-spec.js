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
		{affichage:'Afficher Produits',url:'#/product/listproduct',id:"afficherProduits"},
		{affichage:'Créer Produit',url:'#/product/createProduct',id:"creerProduits"}
		];

		var testClientsFunctions = [
		{affichage:'Afficher Clients',url:'#/customer/listcustomer',id:"afficherClients"},
		{affichage:'Créer Client',url:'#/customer/createCustomer',id:"creerClients"}
		];

		var testOrdersFunctions= [
    {affichage:'Afficher Commandes',url:'#/commandes/listCommandes',id:"afficherCommandes"},
    {affichage:'Rechercher Commande par ID',url:'#/commandes/rechercheCommande',id:"rechercherCommandes"}
    ];

		var testStatsFunctions= [
    {affichage:'Afficher les meilleurs clients',url:'#/stats/bestCustomers',id:"bestCustomers"},
    {affichage:'Afficher les produits les plus vendus',url:'#/bbbbb',id:"bestProducts"},
    {affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc',id:"bestClientsOnProduct"},
    {affichage:'Histogramme des ventes mensuelles cette année',url:'#/stats/Ventes',id:"histrogramLink"}
    ];

		expect(angular.equals(scope.productsFunctions,testProductsFunctions)).toBe(true);
		expect(angular.equals(scope.clientsFunctions,testClientsFunctions)).toBe(true);
		expect(angular.equals(scope.ordersFunctions,testOrdersFunctions)).toBe(true);
		expect(angular.equals(scope.statsFunctions,testStatsFunctions)).toBe(true);
	}));
});
