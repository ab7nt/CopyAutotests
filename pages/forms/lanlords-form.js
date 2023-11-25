const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const lanlordsForm = {
  submitButton: returnByCssLocator(
    "div.rent-form form.init button[type=submit]"
  ),
  validationMessage: returnByCssLocator(
    "div.rent-form form div.wpcf7-response-output"
  ),
  inputName: returnByCssLocator("div.rent-form form input[name=first-name]"),
  inputPhone: returnByCssLocator("div.rent-form form input[name=phone]"),
  inputEmail: returnByCssLocator("div.rent-form form input[name=email]"),
  inputCity: returnByCssLocator("div.rent-form form input[name=city]"),
  inputArea: returnByCssLocator("div.rent-form form input[name=area]"),
  inputDistance: returnByCssLocator("div.rent-form form input[name=distance]"),
  inputMessage: returnByCssLocator("div.rent-form form textarea[name=message]"),
  inputFile: returnByCssLocator("div.rent-form form input[type=file]"),
};

module.exports = { lanlordsForm };
