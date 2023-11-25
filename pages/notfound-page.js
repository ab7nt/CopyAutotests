const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};
const textForSearch = "qrqwrqrqwr";

const notfoundPage = {
  textForSearch: textForSearch,
  pageURL: `https://dev.copy.ru/?s=${textForSearch}`,
  callbackButton: returnByCssLocator("section.result-found button.popup-open"),
  callbackForm: returnByCssLocator("div.popup--callback form"),
  callbackFormActive: returnByCssLocator("div.popup--callback.popup--active"),
};

module.exports = { notfoundPage };
