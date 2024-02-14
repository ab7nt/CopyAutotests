const { Builder, By, until } = require("selenium-webdriver");

const fs = require("fs").promises;
// const qaLocator = (locator) => {
//   return By.css(`[data-qa=${locator}]`);
// };

// async function scrollToElementUntilIsVisible(locator) {
//   await driver.executeScript(
//     "arguments[0].scrollIntoView()",
//     await driver.findElement(locator)
//   );

//   (await driver.findElement(locator))
// }

async function getElementAttribute(locator, attribute) {
  return findElement(locator).getAttribute(attribute);
}

function findElement(locator) {
  return driver.findElement(locator);
}

async function openPage(url) {
  await driver.get(url);
}

async function clickOnElement(locator) {
  await driver.findElement(locator).click();
}

async function waitForElementLocated(locator, message, timeout = 5000) {
  await driver.wait(until.elementLocated(locator), timeout, message);
}

async function waitForElementIsVisible(locator, message, timeout = 5000) {
  await driver.wait(
    until.elementIsVisible(await driver.findElement(locator), timeout, message)
  );
}

async function hideElementIfVisible(locator) {
  await driver.executeScript(
    "arguments[0].style.display = 'none'",
    await driver.findElement(locator)
  );
}

function setEnvironmentAndDomen(environment, domen) {
  return environment !== ""
    ? `https://${environment}.${domen}.ru`
    : `https://${domen}.ru/`;
}

async function waitForUrl(url, timeout = 5000) {
  await driver.wait(async () => {
    return (await driver.getCurrentUrl()) === url;
  }, timeout);
}

async function closeSityСonfirmPopup(popup, closebutton) {
  if (await driver.findElement(popup).isDisplayed()) {
    await driver.findElement(closebutton).click();
  }
}

async function sendKeysToTheElement(locator, keys) {
  await driver.findElement(locator).sendKeys(keys);
}

function getFormattedPhoneNumber(phoneNumber) {
  const phone = phoneNumber.toString();
  return []
    .concat(
      "+7 ",
      "(",
      [...phone.split("").slice(0, 3)],
      ")",
      " ",
      [...phone.split("").slice(3, 6)],
      "-",
      [...phone.split("").slice(6, 8)],
      "-",
      [...phone.split("").slice(8)]
    )
    .join("");
}

module.exports = {
  waitForUrl,
  sendKeysToTheElement,
  getFormattedPhoneNumber,
  closeSityСonfirmPopup,
  setEnvironmentAndDomen,
  hideElementIfVisible,
  openPage,
  clickOnElement,
  waitForElementLocated,
  waitForElementIsVisible,
  findElement,
  getElementAttribute,
};
