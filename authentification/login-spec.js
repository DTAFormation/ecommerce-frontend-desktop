describe('loginTest', function(API_URL) {

	beforeEach(function() {
        module('ecDesktopApp.authentification');
    });

	it("test de la fonction de login succès", inject(function($controller,$httpBackend, loginService, API_URL) {
		var apiUrl = API_URL + "/admin/connect";
		 $httpBackend.expect("POST",apiUrl).respond(200);

		 var loginCtrl = $controller("LoginCtrl");

		 loginCtrl.username = "loginTest";
		 loginCtrl.password = "testPassword";

		 spyOn(loginService, "SetCredentials");

		 loginCtrl.login();

		 $httpBackend.flush();

		 expect(loginService.SetCredentials).toHaveBeenCalledWith(loginCtrl.username ,loginCtrl.password);
	 }));

	 it("test de la fonction de login échec", inject(function($controller,$httpBackend,loginService,API_URL) {
		 var apiUrl = API_URL + "/admin/connect";
		 var respond = $httpBackend.expect("POST",apiUrl).respond(400);

		 var loginCtrl = $controller("LoginCtrl");

		 loginCtrl.username = "loginTest";
		 loginCtrl.password = "testPassword";


		 loginCtrl.login();

		 $httpBackend.flush();
		 expect(loginCtrl.dataLoading).toEqual(true);
	 }));

});
