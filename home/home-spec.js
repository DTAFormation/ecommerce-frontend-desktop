// Tests unitaires module / contrôleurs home
describe('homeCtrl', function() {
    beforeEach(function(){
        module('ecDesktopApp.home');
    });

    it('is a functionnal controller', inject(function($rootScope, $controller){


            // The injector unwraps the underscores (_) from around the parameter names when matching
            var scope = $rootScope.$new();
            var controller = $controller('homeCtrl');


            expect(controller).toBeDefined();
        }));
});
