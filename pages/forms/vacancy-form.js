const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const vacancyForm = {
  submitButton: returnByCssLocator(
    "div.popup.popup--job form button[type=submit]"
  ),
  validationMessage: returnByCssLocator(
    "div.popup.popup--job form div.wpcf7-response-output"
  ),
  inputName: returnByCssLocator(
    "div.popup.popup--job form input[name=first-name]"
  ),
  inputPhone: returnByCssLocator("div.popup.popup--job form input[name=phone]"),
  inputEmail: returnByCssLocator("div.popup.popup--job form input[name=email]"),
  socials: returnByCssLocator(
    "div.popup.popup--job form label.popup-order__social"
  ),
  inputFile: returnByCssLocator("div.popup.popup--job form input[type=file]"),
};

module.exports = { vacancyForm };
