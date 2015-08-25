describe('E2E: Details customerCtrl', function () {

  it ('Find details', function(){
          browser.get(browser.baseUrl);
          expect(browser.getLocationAbsUrl()).toEqual('/customer/listcustomer');

          /* Chemin poru se conencter et arriver sur home*/
          var login=element(by.model('loginCtrl.username'));
          var password=element(by.model('loginCtrl.password'));
          var connectButton=element(by.id('loginButton'));
          login.sendKeys('loginAdmin');
          password.sendKeys('pwdAdmin');
          connectButton.click();
          expect(browser.getLocationAbsUrl()).toEqual('/home');

          /* Chemin pour afficher les clients */
          var afficherClient=element(by.id('afficherClient'));
          afficherClient.click();

          /* Chemin pour afficher les clients */
          var tableClient = element(by.css("table"));
          expect(tableClient.isPresent()).toBeTruthy();
          var allClient = tableClient.all(by.css("tr"));
          expect(allClient.count()).toBeGreaterThan(1);
          var details=element(by.css('glyphicon glyphicon-eye-open'));
          details.click();


          /* Verifications */
          var tableDetails = element(by.css("table"));
          expect(tableDetails.isPresent()).toBeTruthy();
          var allRows = tableDetails.all(by.css("tr"));
          expect(allRows.count()).toBeGreaterThan(4);
          var allTd = allRows.all(by.css("td"));
          expect(allTd.count()).toBeGreaterThan(1);
      });
});
