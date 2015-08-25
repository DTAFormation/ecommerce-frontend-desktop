angular.module('ecDesktopApp.stats', [
    'ngRoute',
    'ui.bootstrap',
    'chart.js'
    ]);

angular.module('ecDesktopApp.stats').config(function($routeProvider) {

$routeProvider
	.when('/stats/Ventes', { 
		templateUrl:'stats/template/ventes.tpl.html',
		controller : "ventesCtrl",
		controllerAs:"ventesCtrl",
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

