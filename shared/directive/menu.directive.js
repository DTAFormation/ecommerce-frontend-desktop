angular.module('ecDesktopApp.shared', [])
.directive('ecNavBarElement', function(DATA_MENU){
	return {
		restrict: 'E',
		link: function link(scope, element, attributes) {
			scope.cleInfoMenu = attributes.cle;

			var infosMenu = DATA_MENU[scope.cleInfoMenu];
			scope.infoMenu = infosMenu;

		},
		templateUrl: 'shared/directive/template/my-navbar-element.html',
		controller: function($scope) {

		}
	};
});
