const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};
const textForSearch = "qrqwrqrqwr";
const domen = require("../pages/info/domen");

const notfoundPage = {
  textForSearch: textForSearch,
  pageURL: `${domen}/?s=${textForSearch}`,
  callbackButton: returnByCssLocator("section.result-found button.popup-open"),
  callbackForm: returnByCssLocator("div.popup--callback form"),
  callbackFormActive: returnByCssLocator(
    "div.popup--callback.popup--active form"
  ),
  callbackPopupNotActive: returnByCssLocator(
    "div.popup--callback:not(.popup--active)"
  ),
  outsideElement: returnByCssLocator("div.popup-wrapper.popup-wrapper--active"),
};

module.exports = { notfoundPage };
