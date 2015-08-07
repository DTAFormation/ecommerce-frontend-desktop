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
		{affichage:'Afficher Produits',url:'#/aaaaa'},
		{affichage:'Créer Produit',url:'#/bbbbb'},
		{affichage:'Modifier Produit',url:'#/ccccc'},
		{affichage:'Supprimer Produit',url:'#/ddddd'}
		];

		var testClientsFunctions = [
		{affichage:'Afficher Clients',url:'#/aaaaa'},
		{affichage:'Créer Clients',url:'#/bbbbb'},
		{affichage:'Modifier Clients',url:'#/ccccc'},
		{affichage:'Supprimer Clients',url:'#/ddddd'}
		];

		var testOrdersFunctions= [
		{affichage:'Afficher Commandes',url:'#/aaaaa'},
		{affichage:'Annuler Commande',url:'#/bbbbb'},
		{affichage:'Rehercher Commande par ID,Client,...',url:'#/ccccc'}
		];

		var testStatsFunctions= [
		{affichage:'Afficher les meilleurs clients',url:'#/aaaaa'},
		{affichage:'Afficher les produits les plus vendus',url:'#/bbbbb'},
		{affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc'},
		{affichage:'Histogramme des ventes mensuelles cette année',url:'#/ddddd'}
		];

		expect(angular.equals(scope.productsFunctions,testProductsFunctions)).toBe(true);
		expect(angular.equals(scope.clientsFunctions,testClientsFunctions)).toBe(true);
		expect(angular.equals(scope.ordersFunctions,testOrdersFunctions)).toBe(true);
		expect(angular.equals(scope.statsFunctions,testStatsFunctions)).toBe(true);

	}));
});