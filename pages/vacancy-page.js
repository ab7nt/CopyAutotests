const { By } = require("selenium-webdriver");

const returnByCssLocator = function (locator) {
  return By.css(locator);
};

const vacancyPage = {
  pageURL: "https://dev.copy.ru/vakansii/",
  vacanciesButton: returnByCssLocator("div.vacancies button.popup-open"),
  vacanciesForm: returnByCssLocator("div.popup.popup--job form"),
  vacanciesFormActive: returnByCssLocator("div.popup.popup--job.popup--active"),
};

module.exports = { vacancyPage };
