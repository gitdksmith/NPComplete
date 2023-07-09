const { Given, When, Then } = require('@cucumber/cucumber');
const { driver, By } = require('./driver');
const expect = require('expect').expect;

const HOST = 'http://localhost:3000'; // todo need a better way to do this for other env.

Given('The user navigates to the application', async function () {
    await driver.get(HOST);
});

Then('The app should be displayed', async () => {
    const element = await driver.findElement(By.css("main[class^='page_main']"));
    expect(element).toBeTruthy();
});
