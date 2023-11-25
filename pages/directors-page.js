const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const directorsPage = {
  pageURL: "https://dev.copy.ru/director/",
  directorsForm: returnByCssLocator("section.appeal form"),
};

module.exports = { directorsPage };
