describe('Test protractor : affichage des meilleurs clients', function() {

  it('Affiche les clients ayant le plus dépensé, puis les clients ayant fait le plus de commande', function() {

    browser.get(browser.baseUrl);
    expect(browser.getLocationAbsUrl()).toEqual('/login');

    var login=element(by.model('loginCtrl.username'));
    var password=element(by.model('loginCtrl.password'));
    var connectButton=element(by.id('loginButton'));

    login.sendKeys('loginAdmin');
    password.sendKeys('pwdAdmin');
    connectButton.click();
    expect(browser.getLocationAbsUrl()).toEqual('/home');

    // Un clic sur le bouton Statistiques déroule le menu et permet le clic sur le lien "Afficher les meilleurs clients"
    // qui lui doit envoyer à la page correspondante
    var statButton = element(by.id('adminStatsButton'));
    statButton.click();
    var bestCustomersNavButton=element(by.id('bestCustomersMenu'));
    bestCustomersNavButton.click();
    expect(browser.getLocationAbsUrl()).toEqual('/stats/bestCustomers');

    // La page doit contenir un tableau contenant lui même au maximum 10 clients
	var tableClient = element(by.css('table'));
	expect(tableClient.isPresent()).toBeTruthy();
	var allClient = tableClient.all(by.css('tr'));
	expect(allClient.count()).toBeLessThan(12);

	// Le tri doit se faire par dépenses par défaut donc le bouton triParDepenses
	// ne doit pas être accessible.
	// Un clic sur le bouton tri par commande doit changer le contenu du tableau
	// mais doit toujours répondre à la limitation de 10 clients
	// Le bouton de tri par commande ne doit plus être accessible et le bouton
	// triParDepenses doit le devenir
	// Un clic sur le bouton triParDepense doit remettre dans le premier cas
	var triParDepensesButton = element(by.id('triParDepensesButton'));
	expect(triParDepensesButton.isDisplayed()).toBeFalsy();
	var triParCommandesButton = element(by.id('triParCommandesButton'));
	triParCommandesButton.click();
	expect(tableClient.isPresent()).toBeTruthy();
	expect(allClient.count()).toBeLessThan(12);
	expect(triParCommandesButton.isDisplayed()).toBeFalsy();
	expect(triParDepensesButton.isDisplayed()).toBeTruthy();
	triParDepensesButton.click();
	expect(tableClient.isPresent()).toBeTruthy();
	expect(allClient.count()).toBeLessThan(12);
	expect(triParDepensesButton.isDisplayed()).toBeFalsy();
	expect(triParCommandesButton.isDisplayed()).toBeTruthy();

  });

});

