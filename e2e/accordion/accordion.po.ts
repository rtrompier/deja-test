import { browser, by, element, ExpectedConditions } from 'protractor';

export class AccordionPage {
    navigateTo() {
        browser.get('/');
        return element(by.css('md-toolbar-row > a[href="/components"]')).click().then(function () {
            return element(by.css('md-nav-list > a[ng-reflect-router-link="accordion"]')).click();
        });
    }

    headerIsOpen(body) {
         return body.getCssValue('max-height').then((value) => {
            return value !== '0px';
         });
    }

    headerIsOpenAfterAnimation(body) {
        return browser.wait(ExpectedConditions.visibilityOf(body))
        .then(() => {
            return this.headerIsOpen(body);
        });
    }

    openHeader(header) {
        return header.click();
    }
}
