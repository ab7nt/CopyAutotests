const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};
const domen = require("../pages/info/domen");

const quickOrderPage = {
  pageURL: "https://dev.copy.ru/",
  quickOrderButton: returnByCssLocator(
    "header.header--pc button[data-popup=fast-order]"
  ),
  quickOrderForm: returnByCssLocator("div.popup--fast-order form"),
  quickOrderFormActive: returnByCssLocator(
    "div.popup--fast-order.popup--active"
  ),
};

module.exports = { quickOrderPage };
