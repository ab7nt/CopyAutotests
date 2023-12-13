const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const quickOrderForm = {
  quickOrderFormActive: returnByCssLocator(
    "div.popup--fast-order.popup--active"
  ),
  quickOrderForm: returnByCssLocator("div.popup--fast-order form"),
  submitButton: returnByCssLocator(
    "div.popup--fast-order form button[type=submit]"
  ),
  validationMessage: returnByCssLocator(
    "div.popup--fast-order form div.wpcf7-response-output"
  ),
  inputName: returnByCssLocator(
    "div.popup--fast-order form input[name=first-name]"
  ),
  inputPhone: returnByCssLocator(
    "div.popup--fast-order form  input[name=phone]"
  ),
  inputEmail: returnByCssLocator(
    "div.popup--fast-order form  input[name=email]"
  ),
  socials: returnByCssLocator(
    "div.popup--fast-order form label.popup-order__social"
  ),
  copycentersList: returnByCssLocator(
    "div.popup--fast-order form div.fastorder-copycenter-dropdown"
  ),
  copycenterForTest: returnByCssLocator(
    "div.popup--fast-order form label[for=copycenter3415]"
  ),
  inputFile: returnByCssLocator("div.popup--fast-order form input[type=file]"),
};

module.exports = { quickOrderForm };
