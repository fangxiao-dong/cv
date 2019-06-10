'use strict';

class FormPage {
    constructor(driverFindByCss) {
        this.name = driverFindByCss('input#name');
        this.email = driverFindByCss('input#emial');
        this.message = driverFindByCss('textarea#message');
        this.send = driverFindByCss('button.submit');
    }
}

module.exports = FormPage;