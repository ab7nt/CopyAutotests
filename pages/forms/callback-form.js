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
};

module.exports = { callbackForm };
