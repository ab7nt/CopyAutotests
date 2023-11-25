const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { waitForUrl, qaLocator } = require("../utils/helpers");
const { mainPage } = require("../pages/main-page");
const { infoForHelpers } = require("../pages/info/info-for-helpers");

const { infoForChangeRegion } = require("../pages/info/info-for-change-region");

describe.only("Проверка смены региона", async function () {
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
    // async function closeSityСonfirmPopup() {
    //   if (
    //     await driver
    //       .findElement(By.css("div.popup.popup--current-city.popup--active"))
    //       .isDisplayed()
    //   ) {
    //     await driver
    //       .findElement(
    //         By.css(
    //           "div.popup.popup--current-city.popup--active div.popup__close.popup-close"
    //         )
    //       )
    //       .click();
    //   }
    // }
    await closeSityСonfirmPopup(
      infoForHelpers.popup,
      infoForHelpers.popupCloseButton
    );

    /// нажатие на кнопку с названием города в футере
    // await driver.executeScript("arguments[0].click();", inFooterRegionButton);
    await driver.executeScript(
      "arguments[0].scrollIntoView()",
      await driver.findElement(mainPage.inFooterRegionButton)
    );
    await driver.sleep(1000);
    await driver.findElement(mainPage.inFooterRegionButton).click();

    // проверка отображения поп-апа выбора города
    expect(
      await await driver.findElement(mainPage.citySelectPopup).isDisplayed()
    ).to.be.true;

    // скрытие поп-апа выбора города
    await driver.findElement(By.css("div.popup-wrapper--active")).click();

    // нажатие на кнопку "Адреса копицентров" в футере
    // await driver.executeScript("arguments[0].click();", inFooterAdressButton);
    await driver.findElement(mainPage.inFooterAdressButton).click();

    // проверка, что в заголовке страницы "Контакты" содержится название выбранного города в родительном падеже
    // const contactPageTitleText = await driver
    //   .findElement(
    //     By.css(
    //       "div.copycenter-list-header h1.copycenter-list-header__title.copycenters__title"
    //     )
    //   )
    //   .getText();

    expect(
      await driver
        .findElement(
          By.css(
            "div.copycenter-list-header h1.copycenter-list-header__title.copycenters__title"
          )
        )
        .getText()
    ).contain(infoForChangeRegion.alternativeSityName);
  });
});
