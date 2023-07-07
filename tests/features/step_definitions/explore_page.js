const { Given, When, Then } = require('@cucumber/cucumber');
const { driver, By } = require('./driver');
const expect = require('expect').expect;

const HOST = 'http://localhost:3000/explore'; // todo need a better way to do this for other env.

const navigateToExplorePage = async () => {
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl != HOST) {
        await driver.get(HOST);
    }
}

Given('The user navigates to the explore page', async function () {
    await navigateToExplorePage();
});

Then('The explore page should be displayed', async () => {
    const element = await driver.findElement(By.css("div[class^='page_parkElement']"));
    expect(element).toBeTruthy();
})

Then('The explore page shows {int} elements', async (int) => {
    navigateToExplorePage();
    const elements = await driver.findElements(By.css("div[class^='page_parkElement']"));
    expect(elements.length).toBe(int)

})

When('The user selects show more button', async () => {
    const element = await driver.findElement(By.css("button[class^='page_loadMore']"));
    await element.click();
})
