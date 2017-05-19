import { DejajsComponentPage } from './app.po';

describe('dejajs-component App', () => {
  let page: DejajsComponentPage;

  beforeEach(() => {
    page = new DejajsComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
