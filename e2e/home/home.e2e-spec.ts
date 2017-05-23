import { HomePage } from './home.po';

describe('dejajs-component App', () => {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display DEJA JS title', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('DEJA JS Components');
    });
});
