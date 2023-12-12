const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};
const domen = require("../pages/info/domen");

const directorsPage = {
  pageURL: `${domen}/director/`,
  directorsForm: returnByCssLocator("section.appeal form"),
};

module.exports = { directorsPage };
