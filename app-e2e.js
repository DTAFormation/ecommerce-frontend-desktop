describe('E2E: ecDesktopCtrl', function () {

    var DATA_MENU;

    beforeEach(function(done){
        browser.get(browser.baseUrl);
        browser.executeAsyncScript(function(thenCallback) {
            thenCallback(angular.injector(['ecDesktopApp.shared']).get('DATA_MENU'));
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
    /*var buttonMenu;
    var buttonSousMenu;
    Object.keys(DATA_MENU).foreach(function(key) {
        var menu = DATA_MENU[key];
        var titre = menu.titre;
        var links = menu.links;
        buttonMenu=element(by.id(titre.id+"Button"));
        buttonMenu.click();
        links.foreach(function(link){
            buttonSousMenu=element(by.id((link.id+"Menu")));
            buttonSousMenu.click();
            expect(browser.getLocationAbsUrl()).toEqual(link.url.substring(1));
        });
    });*/

   var buttonProducts=element(by.id('adminProduitsButton'));
    var currentButton;

    var i;
    //get data from angular
    for(i=0;i<DATA_MENU.produits.links.length;i++){
        buttonProducts.click();
        currentButton=element(by.id((DATA_MENU.produits.links[i].id+"Menu")));
        currentButton.click();
        expect(browser.getLocationAbsUrl()).toEqual(DATA_MENU.produits.links[i].url.substring(1));
    }

    var buttonClients=element(by.id('adminClientsButton'));

    for(i=0;i<DATA_MENU.clients.links.length;i++){
        buttonClients.click();
        currentButton=element(by.id((DATA_MENU.clients.links[i].id+"Menu")));
        currentButton.click();
        expect(browser.getLocationAbsUrl()).toEqual(DATA_MENU.clients.links[i].url.substring(1));
    }

    var buttonCommande=element(by.id('adminCommandesButton'));

    for(i=0;i<DATA_MENU.commandes.links.length;i++){
        buttonCommande.click();
        currentButton=element(by.id((DATA_MENU.commandes.links[i].id+"Menu")));
        currentButton.click();
        expect(browser.getLocationAbsUrl()).toEqual(DATA_MENU.commandes.links[i].url.substring(1));
    }
    /*
    buttonProducts.click();
    var boutonAfficherProduits=element(by.id('afficherProduitsMenu'));
    boutonAfficherProduits.click();
    expect(browser.getLocationAbsUrl()).toEqual('/product/listproduct');

    buttonProducts.click();
    var boutoncreerProduits=element(by.id('creerProduits'));
    boutonAfficherProduits.click();
    expect(browser.getLocationAbsUrl()).toEqual('/product/createProduct');*/

    //Menu Clients

    /*var buttonClient=element(by.id('adminClientsButton'));
    buttonClient.click();

    var boutonAfficherClients=element(by.id('afficherClients'));
    boutonAfficherClients.click();
    expect(browser.getLocationAbsUrl()).toEqual('/customer/listcustomer');*/

  });
});

