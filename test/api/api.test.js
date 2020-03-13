'use strict';

const test = require('ava');
const request = require('request-promise');
const fs = require('fs');
const path = require('path');

test('POST to Google Script API test', async t => {
    let options = {
        simple: false,
        resolveWithFullResponse: true,
        method: 'POST',
        uri: 'https://script.google.com/macros/s/AKfycbxBXdSzz4BsTMJf24SBywsbAhcOtxxtzQfKpp2TadkWyE9PJDE/exec',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            name: 'API Tester',
            email: 'apitester@dummy.com',
            message: 'This is test messages.',
            formDataNameOrder: '["name", "email", "message"]'
        }
    };

    let result = await request(options);
    t.is(result.statusCode, 302);

    let redirectUrl = result.headers.location;
    options = {
        simple: false,
        resolveWithFullResponse: true,
        method: 'GET',
        uri: redirectUrl,
    };

    result = await request(options);
    t.is(result.statusCode, 200);

    t.is(result.body, fs.readFileSync(path.join(__dirname, '../fixtures/response.txt'), {encoding: 'utf8'}));
});