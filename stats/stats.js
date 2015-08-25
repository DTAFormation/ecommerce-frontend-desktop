angular.module('ecDesktopApp.stats', [
    'ngRoute',
    'ui.bootstrap',
	'ecDesktopApp.shared',
    'chart.js'
    ]);

angular.module('ecDesktopApp.stats').config(function($routeProvider) {

$routeProvider
	.when('/stats/Ventes', {
		templateUrl:'stats/template/ventes.tpl.html',
		controller : "ventesCtrl",
		controllerAs:"ventesCtrl",
	})
	.when('/stats/bestCustomers', {
		templateUrl : 'stats/template/bestCustomers.tpl.html',
		controller : 'BestCustomerController',
		controllerAs : 'bestCtrl'
	});
});


angular.module('ecDesktopApp.stats').controller('ventesCtrl', function(ventesService){
    var ventesCtrl = this;

    ventesCtrl.labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    ventesCtrl.CA_series = ['Chiffre dAffaire (€)'];
    ventesCtrl.CA_colors = ['#1EF9A1'];

    ventesCtrl.Ventes_series = ['Volume des ventes'];
    ventesCtrl.Ventes_colors = ['#FD1F5E'];

    var currentDate = new Date();
    var year = currentDate.getFullYear();

    var prixTotal = [0,0,0,0,0,0,0,0,0,0,0,0];
    var quantites = [0,0,0,0,0,0,0,0,0,0,0,0];

    var mois = ['01','02','03','04','05','06','07','08','09','10','11','12'];


    ventesService.getCommandes().then(function(result){
        result.forEach(function(commande){

            if(parseInt(commande.date.split('/')[2]) === year){
                for(var i=0; i<mois.length;i++){
                    if(commande.date.split('/')[1] === mois[i]){
                        prixTotal[i] += commande.prix_total;

                        commande.panier.forEach(function(produit){
                            quantites[i] += produit.quantite;
                        });
                    }
                }
            }
        });

    ventesCtrl.Ventes_data = [quantites];
    ventesCtrl.CA_data = [prixTotal];
    });

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
