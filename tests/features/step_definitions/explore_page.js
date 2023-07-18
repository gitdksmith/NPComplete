const { Given, When, Then } = require('@cucumber/cucumber');
const { driver, By } = require('./driver');
const expect = require('expect').expect;

const HOST = 'http://localhost:3000/explore'; // todo need a better way to do this for other env.
let clickedActivities = [];

const navigateToExplorePage = async () => {
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl != HOST) {
        await driver.get(HOST);
    }
}

const openFilterModal = async () => {
    const element = await driver.findElement(By.css("#filterIcon"));
    await element.click();
}

const closeFilterModal = async () => {
    const action = driver.actions();
    await action.move({ x: 0, y: 0 }).press().release().perform();
}

const clearFilters = async () => {
    const elements = await driver.findElements(By.css("span[class^='selection_selection']"));
    for (const e of elements) {
        await e.click();
    }
}

Given('The user navigates to the explore page', async function () {
    await navigateToExplorePage();
});

Then('The explore page should be displayed', async () => {
    const element = await driver.findElement(By.css("div[class^='parkElement_parkElement']"));
    expect(element).toBeTruthy();
})

Then('The explore page shows {int} elements', async (int) => {
    navigateToExplorePage();
    const elements = await driver.findElements(By.css("div[class^='parkElement_parkElement']"));
    expect(elements.length).toBe(int)
})

When('The user selects show more button', async () => {
    const element = await driver.findElement(By.css("button[class^='parkList_showMore']"));
    await element.click();
})
When('The user selects TX from the state selector dropdown', async () => {
    await openFilterModal();
    const element = await driver.findElement(By.css("#stateFilter > option:nth-child(52)"));
    await element.click();
    await closeFilterModal();
})

Then('Only TX parks are displayed', async () => {
    const elements = await driver.findElements(By.className('stateTag'));
    await Promise.all(elements.map(async (element) => {
        const text = await element.getText();
        expect(text.includes('TX')).toBeTruthy();
    }));
})

When('The user selects Monument from the type selector dropdown', async () => {
    await openFilterModal();
    const element = await driver.findElement(By.css("#typeFilter > option:nth-child(6)"));
    await element.click();
    await closeFilterModal();
})

Then('Only Monument parks are displayed', async () => {
    const elements = await driver.findElements(By.css("div[class^='parkElement_parkInfo'] > h2"));
    await Promise.all(elements.map(async (element) => {
        const text = await element.getText();
        expect(text.includes('Monument')).toBeTruthy();
    }))
})

When('The user clicks on the filter icon', async () => {
    await openFilterModal();
})

When('The user clicks off the modal', async () => {
    await closeFilterModal();
})

Then('The filters modal is {string}', async (s) => {
    const expected = s == 'visible' ? 'display: flex' : 'display: none'
    const element = await driver.findElement(By.css("[class^='filterIconAndModal_modal']"));
    const style = await element.getAttribute('style');
    expect(style).toContain(expected)
})

When('The user selects multiple activities from the filter modal', async () => {
    await clearFilters();
    await openFilterModal();
    const element1 = await driver.findElement(By.css("#activitiesContainer > button:nth-child(1)"));
    const element2 = await driver.findElement(By.css("#activitiesContainer > button:nth-child(2)"));

    clickedActivities.push(await element1.getText());
    clickedActivities.push(await element2.getText());

    await element1.click();
    await element2.click();

    await closeFilterModal();
})

Then('Only parks with those activities are displayed', async () => {
    const elements = await driver.findElements(By.className('activitiesTag'));
    await Promise.all(elements.map(async (element) => {
        const text = await element.getText();
        const activities = text.split(": ")[1].split(", ");
        for (const activity of activities) {
            expect(clickedActivities.includes(activity)).toBeTruthy();
        }
    }));
})

Then('Each activity is shown in the filters toolbar', async () => {
    const elements = await driver.findElements(By.css("button[data-testid='filter-selected-name']"));
    for (const e of elements) {
        expect(clickedActivities.includes(await e.getText())).toBeTruthy();
    }
})
