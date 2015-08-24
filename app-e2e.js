describe('E2E: ecDesktopCtrl', function () {

  it('should work', function () {
    browser.get(browser.baseUrl);

    var appName = element(by.css('h1'));

    expect(appName.isPresent()).toBeTruthy();
  });
});
