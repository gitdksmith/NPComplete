const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { AfterAll } = require('@cucumber/cucumber');
require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { 
    "w3c": false,
    "args": ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--start-maximized']
});
const driver = new Builder().forBrowser('chrome').withCapabilities(capabilities).build();

AfterAll(async function(){
    await driver.quit();
});

exports.driver = driver;
exports.By = By;
exports.Key = Key;