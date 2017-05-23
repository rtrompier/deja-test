import { browser, by, element } from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get('/');
    }

    getTitleText() {
        return element(by.css('home header h1')).getText();
    }
}
