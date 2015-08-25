angular.module('ecDesktopApp.stats', [
    'ngRoute',
    'ui.bootstrap',
	'ecDesktopApp.shared'//,
    //'chart.js'
    ]);


// Configuration du module 'product'
angular.module('ecDesktopApp.stats').config(function($routeProvider) {

// TODO Définir les routes spécifiques au module 'product' ici
$routeProvider
	.when('/stats/Ventes', {   //quand tu vois la route /product/createProduct utilise le template createProduct
		templateUrl:'stats/template/ventes.tpl.html',
		controller : "ventesCtrl",
		controllerAs:"ventesCtrl"
	})
	.when('/stats/bestCustomers', {
		templateUrl : 'stats/template/bestCustomers.tpl.html',
		controller : 'BestCustomerController',
		controllerAs : 'bestCtrl'
	});

});


angular.module('ecDesktopApp.stats').controller('ventesCtrl', function(ventesService){
    var self = this;
});


// controller pour l'écran des meilleurs clients
angular.module('ecDesktopApp.stats').controller('BestCustomerController', function(commandeService){

	var bestCtrl = this;

	bestCtrl.tri = "depenses";
	bestCtrl.customers = [];

	function fetchCustomers (){
		bestCtrl.customers = [];
		commandeService.getCommandes().then(function (result){
			result.forEach(function (commande){
				var self = this;
				self.newClient = true;
				bestCtrl.customers.forEach(function(customer){
					if(commande.client.id === customer.id){
						self.newClient = false;
						if(bestCtrl.tri === "depenses"){
							var totalCommande = 0;
							commande.commandeProduits.forEach(function(commandeProduit){
								totalCommande += commandeProduit.produit.prix * commandeProduit.quantite;
							});
							customer.total = Math.floor(100 * (customer.total + totalCommande))/100;
						} else {
							customer.total += 1;
						}
					}
				});
				if(self.newClient){
					if(bestCtrl.tri === "depenses"){
						var totalCommande = 0;
						commande.commandeProduits.forEach(function(commandeProduit){
							totalCommande += commandeProduit.produit.prix * commandeProduit.quantite;
						});
						bestCtrl.customers.push({id:commande.client.id, nom:commande.client.nom, prenom:commande.client.prenom, total:Math.floor(100 * totalCommande)/100});
					} else {
						bestCtrl.customers.push({id:commande.client.id, nom:commande.client.nom, prenom:commande.client.prenom, total:1});
					}
				}			
			});
		});
	}

	fetchCustomers();

	bestCtrl.changeTri = function (){
		if(bestCtrl.tri === "depenses"){
			bestCtrl.tri = "nbCommandes";	
		} else {
			bestCtrl.tri = "depenses";
		}
		fetchCustomers();
	};
});