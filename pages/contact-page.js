const { By } = require("selenium-webdriver");

// const returnByCssLocator = function (locator) {
//   return By.css(locator);
// };

function returnByCssLocator(locator) {
  return By.css(locator);
}
const domen = require("../pages/info/domen");

const contactPage = {
  pageURL: `${domen}/contacts/`,
  titleH1: returnByCssLocator("section.copycenter-list h1"),
  titleH1Link: returnByCssLocator("section.copycenter-list h1 a"),
};

module.exports = { contactPage };
