const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { waitForUrl, qaLocator, takeScreenshot } = require("../utils/helpers");

// адрес страницы
const testUrl = "https://dev.copy.ru/";

// текст для поиска
const textForSearch = "qweyqyqwyewqy";

// локаторы
const forSearchFieldLocator = By.css("input.search-nwp__input[name=s]");
const forSearchButtonLocator = By.css(
  "button.search-nwp__button.search-nwp__button--search-nwp"
);

describe.skip("Проверка страницы поиска, если ничего не нашлось", async function () {
  it("Проверка заголовка страницы", async function () {
    // открытие страницы
    await driver.get(testUrl);

    // ввод теста в поле поиска
    await driver.findElement(forSearchFieldLocator).sendKeys(textForSearch);

    // нажатие на кнпоку поиска
    await driver.findElement(forSearchButtonLocator).click();

    // проверка заголовка на содержание текста поиска
    const searchHeaderText = await driver
      .findElement(By.css("h1.result-found__title"))
      .getText();
    expect(await searchHeaderText).to.be.equal(
      `К сожалению, по запросу “${textForSearch}” ничего не найдено.`,
      "Некорректный заголовок"
    );
  });

  it("Проверка кнопки 'Обратный звонок'", async function () {
    // открытие страницы
    await driver.get(testUrl);

    // ввод теста в поле поиска
    await driver.findElement(forSearchFieldLocator).sendKeys(textForSearch);

    // нажатие на кнпоку поиска
    await driver.findElement(forSearchButtonLocator).click();

    // нажатие на кнопку "Заказать обратный звонок"
    // await driver.executeScript(
    //   "arguments[0].click()",
    //   await driver.findElement(By.css("button.btn.popup-open.btn--second"))
    // );

    await driver
      .findElement(By.css("button.btn.popup-open.btn--second"))
      .click();

    // ожидание отображения поп-апа "Заказать обратный звонок"
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(
          By.css("div.popup.popup--callback.popup--active")
        )
      ),
      5000
    );

    // проверка заголовка в поп-апе "Заказать обратный звонок"
    const callbackFormTitle = await driver.findElement(
      By.css("form div.popup__header .h3.popup__title")
    );
    const callbackFormTitleText = await callbackFormTitle.getText();
    expect(callbackFormTitleText).to.be.equal(
      "Заказать обратный звонок",
      "Некорректный заголовок поп-апа формы обратного звонка"
    );

    // закрытие попа-апа "Заказать обратный звонок"
    const popup = await driver.findElement(
      By.css("div.popup.popup--callback.popup--active")
    );

    const closeCallbackPopupButton = await driver.findElement(
      By.css("div.popup--callback.popup--active div.popup__close.popup-close")
    );

    await driver.executeScript(
      "arguments[0].setAttribute('z-index', '1000')",
      await closeCallbackPopupButton
    );

    // await closeCallbackPopupButton.click();

    await driver.executeScript(
      "arguments[0].click()",
      await closeCallbackPopupButton
    );

    // await driver.executeScript(
    //   "arguments[0].click()",
    //   await driver.findElement(
    //     By.css("form div.popup__footer button.popup-close")
    //   )
    // );

    // await driver.sleep(2000);

    // проверка, что поп-ап не отображается
    // expect(await callbackFormTitle.isDisplayed()).to.be.false;

    await driver.sleep(10000);
  });

  it("Проверка блока 'Популярные услуги'", async function () {
    // открытие страницы
    await driver.get(testUrl);

    // ввод теста в поле поиска
    await driver.findElement(forSearchFieldLocator).sendKeys(textForSearch);

    // нажатие на кнпоку поиска
    await driver.findElement(forSearchButtonLocator).click();

    // проверка наличия заголовка блока "Попоулярные улуги"
    const favoriteServicessTitle = await driver.findElement(
      By.css("section.services  p.h2.section-header__title")
    );
    expect(favoriteServicessTitle.getText()) === "Популярные услуги",
      "Некорректный заголовок популярных услуг";

    // проверка, что отображён хотя бы один элемент из блока "Популярные услуги"
    const searchFavoriteBlockElements = await driver.findElements(
      By.css(".card.card--one p")
    );
    expect(searchFavoriteBlockElements.length) !== 0;

    // переход по случайной карточке из блока "Популярные услуги"
    // выбор случайной карточки из блока "Популярные услуги"
    const randomElementFromFavorites =
      searchFavoriteBlockElements[
        Math.floor(Math.random() * searchFavoriteBlockElements.length)
      ];

    // получение заголовка случайной карточки из блока "Популярные услуги"
    const randomElementFromFavoritesTitle =
      await randomElementFromFavorites.getText();

    //нажатие на случайную карточку из блока "Популярные услуги"
    await randomElementFromFavorites.click();

    // сравнение заголовка страницы услуги с названием случайной карточки из блока "Популярные услуги"
    const productHeaderText = await driver.findElement(By.css("h1")).getText();
    expect(productHeaderText).to.be.equal(
      randomElementFromFavoritesTitle,
      "Заголовки не совпадают"
    );
  });
});
