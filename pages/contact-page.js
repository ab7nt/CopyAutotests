const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const contactPage = {
  pageURL: "https://dev.copy.ru/contacts/",
  titleH1: returnByCssLocator("section.copycenter-list h1"),
  titleH1Link: returnByCssLocator("section.copycenter-list h1 a"),
};

module.exports = { contactPage };
