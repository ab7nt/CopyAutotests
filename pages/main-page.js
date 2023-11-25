const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const { infoForChangeRegion } = require("../pages/info/info-for-change-region");

const mainPage = {
  pageURL: "https://dev.copy.ru/",
  citySelectPopup: returnByCssLocator("div.popup.popup--town.popup--active"),
  inHeaderRegionButton: returnByCssLocator(
    "div.header-top .popup-open[data-popup=town]"
  ),
  cityButton: returnByCssLocator(
    `button[data-region='${infoForChangeRegion.cityName}']`
  ),
  mapTitleCity: returnByCssLocator("section.map h1 span"),
  phoneOnHeader: returnByCssLocator(
    "a.font-control.footer-middle__contacts.wt-region-phones"
  ),
  emailOnHeader: returnByCssLocator("header .wt-region-emails"),
  phoneOnFooter: returnByCssLocator("footer .wt-region-phones"),
  emailOnFooter: returnByCssLocator(
    "a.font-control.footer-middle__contacts.wt-region-emails"
  ),
  inFooterRegionButton: returnByCssLocator(
    "a.footer-middle__contacts.popup-open[data-popup=town]"
  ),
  inFooterAdressButton: returnByCssLocator(
    "a.font-control.footer-middle__contacts[href='https://dev.copy.ru/contacts/']"
  ),
};

module.exports = {
  mainPage,
};
