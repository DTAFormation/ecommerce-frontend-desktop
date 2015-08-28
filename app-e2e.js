describe('E2E: ecDesktopCtrl', function () {

    var DATA_MENU;

    beforeEach(function(done){
        browser.get(browser.baseUrl);
        browser.executeAsyncScript(function(thenCallback) {
            thenCallback(angular.injector(['ng', 'ecDesktopApp.shared']).get('DATA_MENU'));
        }).then(function (service) {
            DATA_MENU = service;
        }).thenCatch(function(error){
            console.log("error", error);
            // TODO : faire échouer le test
        }).thenFinally(function(){
            done();
        });
    });

    it('should work', function () {


        var appName = element(by.css('h1'));

        expect(appName.isPresent()).toBeTruthy();

    });

    it('Go through every pages in the menu without problem', function(){

        expect(browser.getLocationAbsUrl()).toEqual('/login');

        var login=element(by.model('loginCtrl.username'));
        var password=element(by.model('loginCtrl.password'));
        var connectButton=element(by.id('loginButton'));

        login.sendKeys('loginAdmin');
        password.sendKeys('pwdAdmin');
        connectButton.click();

        expect(browser.getLocationAbsUrl()).toEqual('/home');

        //Menu Produits
        var buttonMenu;
        var buttonSousMenu;
        Object.keys(DATA_MENU).forEach(function(key) {
            var menu = Object.getOwnPropertyDescriptor(DATA_MENU,key).value;
            var titre = menu.titre;
            var links = menu.links;
            buttonMenu=element(by.id(titre.id+"Button"));
            links.forEach(function(link){
                buttonMenu.click();
                buttonSousMenu=element(by.id((link.id+"Menu")));
                buttonSousMenu.click();
                expect(browser.getLocationAbsUrl()).toEqual(link.url.substring(1));
            });
        });

        var buttonLogout=element(by.id('logoutButton'));
        buttonLogout.click();

    });


    it('Menu accueil', function(){
    
        expect(browser.getLocationAbsUrl()).toEqual('/login');
    
        var login=element(by.model('loginCtrl.username'));
        var password=element(by.model('loginCtrl.password'));
        var connectButton=element(by.id('loginButton'));
    
        login.sendKeys('loginAdmin');
        password.sendKeys('pwdAdmin');
        connectButton.click();
    
        expect(browser.getLocationAbsUrl()).toEqual('/home');
    
        var currentButton;
        var currentMenuItem;
        var item;
    
        Object.keys(DATA_MENU).forEach(function(menuItem){
            currentMenuItem = Object.getOwnPropertyDescriptor(DATA_MENU, menuItem).value;
            currentMenuItem.links.forEach(function(link){
                currentButton = element(by.id(link.id+"Accueil"));
                currentButton.click();
                expect(browser.getLocationAbsUrl()).toEqual(link.url.substring(1));
                element(by.id('homeButton')).click();
            });
        });

        var buttonLogout=element(by.id('logoutButton'));
        buttonLogout.click();
    });
});
