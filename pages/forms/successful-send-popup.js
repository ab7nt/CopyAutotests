const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const successfulSendPopup = {
  title: returnByCssLocator(
    "div.popup--active div.popup-send-block div.h3-block__text"
  ),
  text: returnByCssLocator(
    "div.popup--active div.popup-send-block div.popup-send-block_text"
  ),
  submitButton: returnByCssLocator(
    "div.popup--active div.popup-send-block button.popup__close"
  ),
};

module.exports = { successfulSendPopup };
