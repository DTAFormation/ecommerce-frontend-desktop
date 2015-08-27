angular.module('ecDesktopApp.stats').service('ventesService', function($http, API_URL) {
	/*var apiRestUrl = "http://localhost:3000/commande";*/
	var apiRestUrl = API_URL;
	return {
		getCommandes : function(){
			return $http.get(apiRestUrl + "/commande")
			.then(function(result){
				return result.data;
			});
		},
	};
});