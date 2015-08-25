describe('loginServiceTest', function(API_URL) {

	var url = API_URL + "/personne";

	beforeEach(function() {
        module('ecDesktopApp.authentification');
    });

	// it("Le service loginService.login(username, password, callback) "+
	// 	"envoie à la base avec un POST le couple login/mot de passe.", inject(function(loginService, $httpBackend) {
 //        var log={username : "username", password : "password"};
 //        $httpBackend.expectPOST(apiUrl, {username : "username", password : "password"}).respond(200, '');
 //        loginService.login(username, password);
 //        $httpBackend.flush();
	// }));

});
