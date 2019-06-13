'use strict';

const formPage = require('../pages/formpage');
const webdriver = require('selenium-webdriver');
const {until, By} = webdriver;
const test = require('ava');

test.before(async t => {
    t.context.driver = await (new webdriver.Builder().build());
});

test('', async t => {
    t.is(1,1);
});

test('', async t => {
    t.is(1,1);
});

test('', async t => {
    t.is(1,1);
});

test.after(async t => {
    t.context.driver.quit();
});