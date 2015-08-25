angular.module('ecDesktopApp.stats').service('ventesService', function($http) {
	var apiRestUrl = "http://localhost:3000/commande";
	return {
		getCommandes : function(){
			return $http.get(apiRestUrl)
			.then(function(result){
				return result.data;
			});
		},
	};
});