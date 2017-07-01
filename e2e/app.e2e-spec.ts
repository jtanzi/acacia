import { AcaciaPage } from './app.po';

describe('acacia App', () => {
  let page: AcaciaPage;

  beforeEach(() => {
    page = new AcaciaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
