describe('E2E: DetailsCommande', function () {

  it ('Find detailsCommande', function(){
          browser.get(browser.baseUrl);
          expect(browser.getLocationAbsUrl()).toEqual('/login');

          /* Chemin pour se conencter et arriver sur home*/
          var login=element(by.model('loginCtrl.username'));
          var password=element(by.model('loginCtrl.password'));
          var connectButton=element(by.id('loginButton'));
          login.sendKeys('loginAdmin');
          password.sendKeys('pwdAdmin');
          connectButton.click();
          expect(browser.getLocationAbsUrl()).toEqual('/home');


          /* Chemin pour afficher les commandes */
          var button=element(by.id('adminCommandesButton'));
          button.click();


          var afficherCommande=element(by.id('afficherCommandesMenu'));
          afficherCommande.click();
          expect(browser.getLocationAbsUrl()).toEqual('/commandes/listCommandes');

          var ongletsEtat = element.all(by.id('ongletEtat'));
          var ongletEtat = ongletsEtat.first();
          ongletEtat.click();

          var tableCommande = element(by.id("CommandeTable"));
          expect(tableCommande.isPresent()).toBeTruthy();
          var allCommande = tableCommande.all(by.css("tr"));
          expect(allCommande.count()).toBeGreaterThan(1);

          var idCommande = element(by.binding('c.id')).getText().then(function(text) {return text;});

          var details = element(by.id('afficherLesDetails'));

          details.click();


          /* Verification que l'URL est correcte */
          var urlSelectedCmd = null;
          var currentUrl=browser.getLocationAbsUrl();

          idCommande.then(function(result){
            urlSelectedCmd = '/commandes/detailsCommande/'+result;
            console.log(urlSelectedCmd);
          })
          .then(function(){
            expect(currentUrl).toEqual(urlSelectedCmd);
          });

        //

          /* Verifications de la présence de tous les blocs*/
          var panelDetails = element(by.id("mainPanel"));
          var dtlCmdPanel = element(by.id("dtlCmdPanel"));
          var clientIDPanel = element(by.id("clientIDPanel"));
          var facturePanel = element(by.id("facturePanel"));
          var adresseLivraisonPanel = element(by.id("adresseLivraisonPanel"));
          var adresseFacturationPanel = element(by.id("adresseFacturationPanel"));
          var ProduitsPanel = element(by.id("ProduitsPanel"));

          expect(panelDetails.isPresent()).toBeTruthy();
          expect(dtlCmdPanel.isPresent()).toBeTruthy();
          expect(clientIDPanel.isPresent()).toBeTruthy();
          expect(facturePanel.isPresent()).toBeTruthy();
          expect(adresseLivraisonPanel.isPresent()).toBeTruthy();
          expect(adresseFacturationPanel.isPresent()).toBeTruthy();
          expect(ProduitsPanel.isPresent()).toBeTruthy();

            /*Vérification de l'affichage des produits */
            var tableProduits = element(by.id("ProduitsCmdTable"));
            expect(tableProduits.isPresent()).toBeTruthy();
            var allProdRows = tableProduits.all(by.css("tr"));
            expect(allProdRows.count()).toBeGreaterThan(1);

          /* Vérification du fonctionnement du bouton retour */
          var retourBtn = element(by.id("retour"));
          retourBtn.click();
          expect(browser.getLocationAbsUrl()).toEqual('/commandes/listCommandes');

          var buttonLogout=element(by.id('logoutButton'));
          buttonLogout.click();
      });
});
