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

    clickSend() {
        this.send.click();
    }

    addInputs(elem, message) {
        elem.sendKeys(message);
    }

    invalidEmailDisplayed() {
        this.invalidEmail.isDisplayed();
    }

    thankYouMessageDisplayed() {
        this.thankYouMessage.isDisplayed();
    }
}

module.exports = FormPage;