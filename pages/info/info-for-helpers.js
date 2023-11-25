const returnByCssLocator = function (locator) {
  return By.css(locator);
};
const infoForHelpers = {
  popup: returnByCssLocator("div.popup.popup--current-city.popup--active"),
  popupCloseButton: returnByCssLocator(
    "div.popup.popup--current-city.popup--active div.popup__close.popup-close"
  ),
};

module.exports = {
  infoForHelpers,
};
