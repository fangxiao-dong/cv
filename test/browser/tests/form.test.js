'use strict';

const FormPage = require('../pages/formpage');
const webdriver = require('selenium-webdriver');
const {until, By} = webdriver;
const test = require('ava');

test.before(async t => {
    t.context.driver = await (new webdriver.Builder().build());
    const driverFindByCss = async css => await t.context.driver.findElement(By.css(css));
    t.context.driverFindByCss = driverFindByCss;
});

test.beforeEach(async t => {
    await t.context.driver.get('https://127.0.0.1:8080#contact');
    t.context.formPage = new FormPage(t.context.driverFindByCss);
});

test('Alert is present when any required inputs are empty', async t => {
    await t.context.formPage.addInputs(t.context.formPage.message, 'This is the message from Selenium test.');
    await t.context.formPage.clickSend();
    try {
        const contactAlert = await t.context.driver.wait(until.alertIsPresent());
        t.pass("Alert is present.");

        const alertText = await contactAlert.getText();
        t.is(alertText, 'Please complete the form before submitting.');

        await contactAlert.accept();
    }
    catch (e) {
        console.log(e.name);
        t.fail("Alert is not present.");
    }
});

test('Email validation hint is present when invalid email is input', async t => {
    t.is(1,1);
});

test('Successfully send the contact form', async t => {
    t.is(1,1);
});

test.after(async t => {
    t.context.driver.quit();
});