//Adresse du service REST
angular.module('ecDesktopApp.shared').constant("API_URL","http://5.196.89.85:9080/ec-backend/api");

angular.module('ecDesktopApp.shared').constant("ETATS_COMMANDE",["EC","TR","AN"]);
angular.module('ecDesktopApp.shared').constant("ETATS_COMMANDE_LIBELLE",["En cours","Terminée","Annulée"]);


/*angular.module('ecDesktopApp.shared').constant("DATA_MENU",	[
[{affichage:'Afficher Produits',url:'#/product/listproduct',id:"afficherProduits"},
{affichage:'Créer Produit',url:'#/product/createProduct',id:"creerProduits"}],
[{affichage:'Afficher Clients',url:'#/customer/listcustomer',id:"afficherClients"},
{affichage:'Créer Client',url:'#/customer/createCustomer',id:"creerClients"}],
[{affichage:'Afficher Commandes',url:'#/commandes/listCommandes',id:"afficherCommandes"},
{affichage:'Rechercher Commande par ID',url:'#/commandes/rechercheCommande',id:"rechercherCommandes"}],

[{affichage:'Afficher les meilleurs clients',url:'#/stats/bestCustomers',id:"bestCustomers"},
{affichage:'Afficher les produits les plus vendus',url:'#/stats/topProduits',id:"bestProducts"},
{affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc',id:"bestClientsOnProduct"},
{affichage:'Histogramme des ventes mensuelles cette année',url:'#/stats/Ventes',id:"histrogramLink"}
]]);


angular.module('ecDesktopApp.shared').constant("DATA_MENU",	[
	[
		{affichage:'Afficher Produits',url:'#/product/listproduct',id:"afficherProduits"},
		{affichage:'Créer Produit',url:'#/product/createProduct',id:"creerProduits"}
	],
	[
		{affichage:'Afficher Clients',url:'#/customer/listcustomer',id:"afficherClients"},
		{affichage:'Créer Client',url:'#/customer/createCustomer',id:"creerClients"}
	],
	[
		{affichage:'Afficher Commandes',url:'#/commandes/listCommandes',id:"afficherCommandes"},
		{affichage:'Rechercher Commande par ID',url:'#/commandes/rechercheCommande',id:"rechercherCommandes"}
	],
	[
		{affichage:'Afficher les meilleurs clients',url:'#/stats/bestCustomers',id:"bestCustomers"},
		{affichage:'Afficher les produits les plus vendus',url:'#/bbbbb',id:"bestProducts"},
		{affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc',id:"bestClientsOnProduct"},
		{affichage:'Histogramme des ventes mensuelles cette année',url:'#/stats/Ventes',id:"histrogramLink"}
	]
]);*/


angular.module('ecDesktopApp.shared').constant("DATA_MENU",	{
	"produits" : {
		titre : {libelle: "Administrer Produits", id:"adminProduits"},
		links : [
			{affichage:'Afficher Produits',url:'#/product/listproduct',id:"afficherProduits"},
			{affichage:'Créer Produit',url:'#/product/createProduct',id:"creerProduits"}
		]
	},
	"clients" : {
		titre : {libelle: "Administrer Clients", id:"adminClients"},
		links : [
			{affichage:'Afficher Clients',url:'#/customer/listcustomer',id:"afficherClients"},
			{affichage:'Créer Client',url:'#/customer/createCustomer',id:"creerClients"}
		]
	},
	"commandes" : {
		titre : {libelle: "Administrer Commandes", id:"adminCommandes"},
		links : [
			{affichage:'Afficher Commandes',url:'#/commandes/listCommandes',id:"afficherCommandes"},
			{affichage:'Rechercher Commande par ID',url:'#/commandes/rechercheCommande',id:"rechercherCommandes"}
		]
	},
	"stats" : {
		titre : {libelle:"Statistiques", id:"adminStats"},
		links : [
			{affichage:'Afficher les meilleurs clients',url:'#/stats/bestCustomers',id:"bestCustomers"},
			{affichage:'Afficher les produits les plus vendus',url:'#/stats/topProduits',id:"bestProducts"},
			//{affichage:'Afficher les clients ayant acheté le plus un produit donné',url:'#/ccccc',id:"bestClientsOnProduct"},
			{affichage:'Histogramme des ventes mensuelles cette année',url:'#/stats/Ventes',id:"histrogramLink"}
		]
	}
});


/*Object.keys(DATA_MENU).foreach(function(key) {
	var menu = DATA_MENU[key];
	var titre = menu.titre;
	var links = menu.links;
});*/
