const assert = require('assert');
const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, WebDriver} = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const expect = require('expect').expect;
require("chromedriver");

const HOST = 'http://localhost:3000'; // todo need a better way to do this for other env.

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { 
    "w3c": false,
    "args": ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
});
// const options = new Options().setChromeBinaryPath('/usr/bin/google-chrome');
// local /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
// const driver = new Builder().setChromeOptions(options).withCapabilities(capabilities).build();
const driver = new Builder().withCapabilities(capabilities).build();

Given('The user navigates to the application', async function () {
    await driver.get(HOST);
});
Then('The app should be displayed', async () => {
    const element = await driver.findElement(By.css("main[class^='page_main']"));
    expect(element).toBeTruthy();
});

// AfterAll(async function(){
//     await driver.quit();
// });
