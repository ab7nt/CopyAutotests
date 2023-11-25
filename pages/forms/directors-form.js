const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const directorsForm = {
  submitButton: returnByCssLocator(
    "section.appeal form.init button[type=submit]"
  ),
  validationMessage: returnByCssLocator(
    "section.appeal form div.wpcf7-response-output"
  ),
  inputName: returnByCssLocator("section.appeal form input[name=first-name]"),
  inputPhone: returnByCssLocator("section.appeal form input[name=phone]"),
  inputEmail: returnByCssLocator("section.appeal form input[name=email]"),
  inputNumberOfOrder: returnByCssLocator(
    "section.appeal form input[name=zakaz]"
  ),
  inputMessage: returnByCssLocator(
    "section.appeal form textarea[name=common_comment]"
  ),
};

module.exports = { directorsForm };
