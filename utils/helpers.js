const { Builder, By } = require("selenium-webdriver");
const fs = require("fs").promises;
// const qaLocator = (locator) => {
//   return By.css(`[data-qa=${locator}]`);
// };

async function waitForUrl(url, timeout = 5000) {
  await driver.wait(async () => {
    return (await driver.getCurrentUrl()) === url;
  }, timeout);
}

// async function takeScreenshot(fileName = "failedTest") {
//   const driver = await new Builder().forBrowser("chrome").build();

//   const image = await driver.takeScreenshot();
//   await fs.writeFileSync(`${fileName}.png`, image, "base64");
// }

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
};
