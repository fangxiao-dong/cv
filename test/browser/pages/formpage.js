'use strict';

class FormPage {
    constructor(driverFindByCss) {
        this.name = driverFindByCss('input#name');
        this.email = driverFindByCss('input#email');
        this.message = driverFindByCss('textarea#message');
        this.send = driverFindByCss('button.submit');
        this.invalidEmail = driverFindByCss('span.invalid-email');
        this.thankYouMessage = driverFindByCss('div.thankyou_message');
    }

    async clickSend() {
        await (await this.send).click();
    }

    async addInputs(elem, message) {
        await elem.sendKeys(message);
    }

    async invalidEmailDisplayed() {
        return await (await this.invalidEmail).isDisplayed();
    }

    async thankYouMessageDisplayed() {
        return await (await this.thankYouMessage).isDisplayed();
    }
}

module.exports = FormPage;