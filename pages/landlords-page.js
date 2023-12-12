const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};
const domen = require("../pages/info/domen");

const lanlordsPage = {
  pageURL: `${domen}/landlord/`,
  lanlordsForm: returnByCssLocator("div.rent-form form"),
};

module.exports = { lanlordsPage };
