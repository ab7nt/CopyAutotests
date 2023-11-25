const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const lanlordsPage = {
  pageURL: "https://dev.copy.ru/landlord/",
  lanlordsForm: returnByCssLocator("div.rent-form form"),
};

module.exports = { lanlordsPage };
