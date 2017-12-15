import { AmexioNgExtensionsDemoPage } from './app.po';

describe('amexio-ng-extensions-demo App', () => {
  let page: AmexioNgExtensionsDemoPage;

  beforeEach(() => {
    page = new AmexioNgExtensionsDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
