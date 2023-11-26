const { By, until, Key } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  waitForUrl,
  qaLocator,
  closeSityСonfirmPopup,
} = require("../utils/helpers");
const { mainPage } = require("../pages/main-page");
const { contactPage } = require("../pages/contact-page");
const { infoForHelpers } = require("../pages/info/info-for-helpers");
const { infoForChangeRegion } = require("../pages/info/info-for-change-region");

describe("Проверка смены региона", async function () {
  it("Проверка смены контактов и названия города", async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку с названием города в хедере
    await driver.findElement(mainPage.inHeaderRegionButton).click();

    // ожидание отображение поп-апа с выбором города
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(mainPage.citySelectPopup),
        5000
      )
    );

    // нажатие на кнопку выбора города
    await driver.findElement(mainPage.cityButton).click();

    // ожидание смены заголовка карты
    await driver.wait(
      until.elementTextContains(
        await driver.findElement(mainPage.mapTitleCity),
        infoForChangeRegion.alternativeCityName
      ),
      5000,
      "Текст в заголовке не содержит название выбранного города"
    );

    // проверка соответствия контактов в хедере
    expect(
      await driver.findElement(mainPage.phoneOnHeader).getText()
    ).to.be.equal(
      infoForChangeRegion.cityPhone,
      "Некорректный номер телефона в хедере"
    );
    expect(
      await driver.findElement(mainPage.emailOnHeader).getText()
    ).to.be.equal(infoForChangeRegion.cityEmail, "Некорректный емейл в хедере");

    // проверка соответствия контактов в футере
    expect(
      await driver.findElement(mainPage.phoneOnFooter).getText()
    ).to.be.equal(
      infoForChangeRegion.cityPhone,
      "Некорректный номер телефона в футере"
    );
    expect(
      await driver.findElement(mainPage.emailOnFooter).getText()
    ).to.be.equal(infoForChangeRegion.cityEmail, "Некорректный емейл в футере");

    // проверка названия города в кнопках в хедере и футере
    expect(
      await driver.findElement(mainPage.inHeaderRegionButton).getText()
    ).to.be.equal(
      infoForChangeRegion.cityName,
      "Некорректное название города у кнопки смены региона в хедере"
    );
    expect(
      await driver.findElement(mainPage.inFooterRegionButton).getText()
    ).to.be.equal(
      infoForChangeRegion.cityName,
      "Некорректное название города у кнопки смены региона в футере"
    );

    // закрытие поп-апа подтверждения автоопределённого города, если оно открыто
    if (
      await driver
        .findElement(By.css("div.popup.popup--current-city.popup--active"))
        .isDisplayed()
    ) {
      await driver
        .findElement(
          By.css("div.popup.popup--current-city.popup--active div.popup__close")
        )
        .click();
    }

    /// нажатие на кнопку с названием города в футере
    await driver.executeScript(
      "arguments[0].scrollIntoView()",
      await driver.findElement(mainPage.inFooterRegionButton)
    );
    await driver.sleep(1000);

    await driver.findElement(mainPage.inFooterRegionButton).click();

    // ожидание отображение поп-апа с выбором города
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(mainPage.citySelectPopup),
        5000
      )
    );

    // скрытие поп-апа выбора города
    if (driver.findElement(mainPage.citySelectPopup).isDisplayed()) {
      await driver.actions().keyDown(Key.ESCAPE).perform();
    }

    // нажатие на кнопку "Адреса копицентров" в футере
    await driver.findElement(mainPage.inFooterAdressButton).click();

    // ожидание перехода на страницу "Контакты"
    await waitForUrl(contactPage.pageURL);

    // ожидание, пока в заголовке страинцы 'Контакты' отобразится название выбранного города в родительном падеже
    await driver.wait(
      until.elementTextContains(
        await driver.findElement(contactPage.titleH1),
        infoForChangeRegion.alternativeCityName
      ),
      5000,
      "Текст в заголовке страницы 'Контакты' не содержит название выбранного города"
    );

    // проверка, что в заголовке страницы "Контакты" содержится название выбранного города в родительном падеже
    expect(await driver.findElement(contactPage.titleH1Link).getText()).contain(
      infoForChangeRegion.alternativeCityName,
      "В заголовке страницы 'Контакты' название города не совпадает с выбранным ранее"
    );
  });
});
