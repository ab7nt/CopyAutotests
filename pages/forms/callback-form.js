const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const callbackForm = {
  submitButton: returnByCssLocator(
    "div.popup--callback form button[type=submit]"
  ),
  validationMessage: returnByCssLocator(
    "div.popup--callback form div.wpcf7-response-output"
  ),
  inputName: returnByCssLocator(
    "div.popup--callback form input[name=first-name]"
  ),
  inputPhone: returnByCssLocator("div.popup--callback form input[name=phone]"),
  closeButton: returnByCssLocator(
    "div.popup--callback form div.popup__close.popup-close"
  ),
  backButton: returnByCssLocator("div.popup--callback button.popup-close"),
};

module.exports = { callbackForm };
