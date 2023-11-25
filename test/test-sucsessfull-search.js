const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { waitForUrl, qaLocator } = require("../utils/helpers");

describe.skip("Проверка поиска", async function () {
  it("Ввод корректного значения", async function () {
    // адрес страницы
    const testUrl = "https://dev.copy.ru/";

    // текст для поиска
    const textForSearch = "Визитки";

    // локаторы
    const forSearchFieldLocator = By.css("input.search-nwp__input[name=s]");
    const forSearchButtonLocator = By.css(
      "button.search-nwp__button.search-nwp__button--search-nwp"
    );

    // открытие страницы
    await driver.get(testUrl);

    // ввод теста в поле поиска
    await driver.findElement(forSearchFieldLocator).sendKeys(textForSearch);

    // нажатие на кнпоку поиска
    await driver.findElement(forSearchButtonLocator).click();

    // проверка заголовка на содержание текста поиска
    const searchHeaderText = await driver
      .findElement(By.css("h1.section-header__title--search"))
      .getText();
    expect(await searchHeaderText).to.be.equal(
      `Найдено по запросу «${textForSearch}»:`,
      "Некорректный заголовок"
    );

    // проверка, что отображён хотя бы один элемент результатов поиска
    const searchResultElements = await driver.findElements(By.css("a.card"));
    expect(searchResultElements.length) !== 0;
  });
});
