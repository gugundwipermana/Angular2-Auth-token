import { AuthTokenPage } from './app.po';

describe('auth-token App', () => {
  let page: AuthTokenPage;

  beforeEach(() => {
    page = new AuthTokenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
