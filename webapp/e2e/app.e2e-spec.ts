import { WongwanWebappPage } from './app.po';

describe('wongwan-webapp App', () => {
  let page: WongwanWebappPage;

  beforeEach(() => {
    page = new WongwanWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
