angular.module('ecDesktopApp.shared', [])
.directive('ecNavBarElement', function(DATA_MENU){
	return {
		//restrict: 'EAC',
		templateUrl: 'shared/directive/template/my-navbar-element.html',
		scope: true,
		link: function link(scope, element, attributes) {
		
			scope.cleInfoMenu = attributes.cle;
		
			var infosMenu = DATA_MENU[scope.cleInfoMenu];
		
			scope.infoMenu = infosMenu;

		
		},
		controller: function($scope) {
			//var infoMenu;
			/*var data=$scope.infoMenu;
			console.log("data ",data);
			$scope.infoMenu="";*/

		}
	};
});
