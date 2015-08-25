describe('authentification protractor test', function() {
  it('Login then logout and cannot access some page', function() {
    browser.get(browser.baseUrl);
    expect(browser.getLocationAbsUrl()).toEqual('/login');

    var login=element(by.model('loginCtrl.username'));
    var password=element(by.model('loginCtrl.password'));
    var connectButton=element(by.id('loginButton'));

    login.sendKeys('loginAdmin');
    password.sendKeys('pwdAdmin');
    connectButton.click();

    expect(browser.getLocationAbsUrl()).toEqual('/home');

    var logoutButton=element(by.id('logoutButton'));

    logoutButton.click();

    expect(browser.getLocationAbsUrl()).toEqual('/login'); 

  });
});

