angular.module('ecDesktopApp.stats', [
    'ngRoute',
    'ecDesktopApp.shared',
    'ui.bootstrap',
    'ecDesktopApp',
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
        controller : 'BestCustomersController',
        controllerAs : 'bestCtrl'
    })
    .when('/stats/topProduits', { 
        templateUrl:'stats/template/topProduits.tpl.html',
        controller : "ventesCtrl",
        controllerAs:"ventesCtrl",
    })  
    .when('/stats/bestCustomersByProduct/:idProduct', {
        templateUrl : 'stats/template/bestCustomersByProduct.tpl.html',
        controller : 'BestCustomersByProductController',
        controllerAs : 'bestByProductCtrl'
    });
});


angular.module('ecDesktopApp.stats').controller('ventesCtrl', function(ventesService,$filter){
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

            commande.facture.date = $filter('date')(commande.facture.date, "dd/MM/yyyy");

            if(parseInt((commande.facture.date).split('/')[2]) === year){
                mois.forEach(function(mois){
                    if(commande.facture.date.split('/')[1]=== mois){
                        commande.commandeProduits.forEach(function(objet){
                       prixTotal[parseInt(mois)-1] += Math.round(objet.produit.prix * objet.quantite);
                       quantites[parseInt(mois)-1] += objet.quantite;

                     });
                    }
                });
            }
        });

    ventesCtrl.Ventes_data = [quantites];
    ventesCtrl.CA_data = [prixTotal];
    });

    ventesCtrl.products = [];

    function fetchProducts (){
        ventesCtrl.products = [];
        ventesService.getCommandes().then(function (result){
            result.forEach(function (commande){
                commande.commandeProduits.forEach(function(panierProduct){
                    var self = this;
                    self.newProduct = true;
                    ventesCtrl.products.forEach(function(product){
                        if(panierProduct.produit.id === product.id){
                            self.newProduct = false;
                            product.total += panierProduct.quantite;
                        }
                    });
                    if(self.newProduct){
                        ventesCtrl.products.push({id:panierProduct.produit.id, libelle:panierProduct.produit.libelle, prix:panierProduct.produit.prix, total:panierProduct.quantite});
                    }
                }); 
                          
            });

            ventesCtrl.products_total = ventesCtrl.products.map(function(produit) {
                return produit.total;
            });

            ventesCtrl.products_libelle = ventesCtrl.products.map(function(produit) {
                return produit.libelle;
            });
        });
    }

    fetchProducts();

});


// controller pour l'écran des meilleurs clients
angular.module('ecDesktopApp.stats').controller('BestCustomersController', function(commandeService){

    var bestCtrl = this;

    bestCtrl.tri = "depenses";
    bestCtrl.customers = [];

    bestCtrl.fetchCustomers = function (){
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
    };

    bestCtrl.fetchCustomers();

    bestCtrl.changeTri = function (){
        if(bestCtrl.tri === "depenses"){
            bestCtrl.tri = "nbCommandes";
        } else {
            bestCtrl.tri = "depenses";
        }
        bestCtrl.fetchCustomers();
    };
});

angular.module('ecDesktopApp.stats').controller('BestCustomersByProductController', function(commandeService, $routeParams){

	var bestByProductCtrl = this;

	bestByProductCtrl.customers = [];

	bestByProductCtrl.fetchCustomers = function (){
		bestByProductCtrl.customers = [];
		commandeService.getCommandes().then(function (result){
			result.forEach(function (commande){
				commande.commandeProduits.forEach(function (commandeProduit){
					if(commandeProduit.produit.id === parseInt($routeParams['idProduct'])){
						var self = this;
						self.newClient = true;
						bestByProductCtrl.customers.forEach(function(customer){
							if(commande.client.id === customer.id){
								self.newClient = false;
								customer.total += commandeProduit.quantite;
							}
						});
						if(self.newClient){
							bestByProductCtrl.customers.push({id:commande.client.id, nom:commande.client.nom, prenom:commande.client.prenom, total:commandeProduit.quantite});
						}
					}
				});
			});
		});
	};

	bestByProductCtrl.fetchCustomers();
});
