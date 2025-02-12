const { By, until, Key } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  sendKeysToTheElement,
  getFormattedPhoneNumber,
  openPage,
  clickOnElement,
  waitForElementLocated,
  waitForElementIsVisible,
  findElement,
  getElementAttribute,
} = require("../utils/helpers");
const { infoForInputs } = require("../pages/info/info-for-inputs");
const { notfoundPage } = require("../pages/notfound-page");
const { callbackForm } = require("../pages/forms/callback-form");

describe.only("Проверка формы 'Обратный звонок'", async function () {
  // it.only("", async function () {
  //   // открытие страницы
  //   await openPage(notfoundPage.pageURL);

  //   await findElement(notfoundPage.callbackButton).click();
  //   await driver.sleep(2000);
  // });
  it("51708 Обратный звонок - Проверка скрытия поп-апа", async function () {
    // открытие страницы
    await openPage(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await clickOnElement(notfoundPage.callbackButton);
    await waitForElementLocated(
      notfoundPage.callbackFormActive,
      "Форма Обратный звонок не отобразилась"
    );
    await driver.sleep(500);

    // нажатие на кнопку в виде крестика в форме и ожидание скрытия попапа
    await clickOnElement(callbackForm.closeButton);
    await waitForElementLocated(
      notfoundPage.callbackPopupNotActive,
      "Форма Обратный звонок не скрылась после нажатия на крестик"
    );

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await clickOnElement(notfoundPage.callbackButton);
    await waitForElementLocated(
      notfoundPage.callbackFormActive,
      "Форма Обратный звонок не отобразилась"
    );
    await driver.sleep(500);

    // нажатие на кнопку в виде крестика в форме и ожидание скрытия попапа
    await clickOnElement(callbackForm.backButton);
    await waitForElementLocated(
      notfoundPage.callbackPopupNotActive,
      "Форма Обратный звонок не скрылась после нажатия на кнопку Назад"
    );

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await clickOnElement(notfoundPage.callbackButton);
    await waitForElementLocated(
      notfoundPage.callbackFormActive,
      "Форма Обратный звонок не отобразилась"
    );
    await driver.sleep(500);

    // нажатие на клавишу ESCAPE и ожидание скрытия попапа
    await driver.actions().keyDown(Key.ESCAPE).perform();
    await waitForElementLocated(
      notfoundPage.callbackPopupNotActive,
      "Форма Обратный звонок не скрылась после нажатия на клавишу ESC"
    );

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await clickOnElement(notfoundPage.callbackButton);
    await waitForElementLocated(
      notfoundPage.callbackFormActive,
      "Форма Обратный звонок не отобразилась"
    );
    await driver.sleep(500);

    // нажатие на элемент вне пределов попапа и ожидание скрытия попапа
    await driver.executeScript(
      "arguments[0].style.display ='none'",
      await driver.findElement(notfoundPage.callbackFormActive)
    );
    await clickOnElement(notfoundPage.outsideElement);
    await waitForElementLocated(
      notfoundPage.callbackPopupNotActive,
      "Форма Обратный звонок не скрылась после нажатия на элемент вне пределов попапа"
    );
  });
  it("50594 Обратный звонок - Отправка формы с незаполненными полями", async function () {
    // открытие страницы
    await openPage(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await clickOnElement(notfoundPage.callbackButton);
    await waitForElementLocated(
      notfoundPage.callbackFormActive,
      "Форма Обратный звонок не отобразилась"
    );
    await driver.sleep(500);

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await clickOnElement(callbackForm.submitButton);
    await waitForElementIsVisible(
      callbackForm.validationMessage,
      "Сообщение валидации не отобразилось"
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    // expect(
    //   await driver.findElement(notfoundPage.callbackForm).getAttribute("class")
    // ).to.include("invalid", "Обводка у сообщения не жёлтая");
    expect(
      await getElementAttribute(notfoundPage.callbackForm, "class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');
  });
  it('50595 Обратный звонок - Отправка формы с корректно заполненным полем "Имя"', async function () {
    // открытие страницы
    await openPage(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    await driver.sleep(500);

    // ввод текста в поле "Имя"
    await sendKeysToTheElement(callbackForm.inputName, infoForInputs.name);

    // проверка введённого текста в поле "Имя"
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.wait(
      until.elementLocated(callbackForm.submitButton),
      5000,
      "Кнопка 'Отправить' не найдена'"
    );
    await driver.findElement(callbackForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(callbackForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(notfoundPage.callbackForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');
  });
  it('50596 Обратный звонок - Отправка формы с корректно заполненным полем "Номер телефона"', async function () {
    // открытие страницы
    await openPage(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    await driver.sleep(500);

    // ввод текста в поле "Номер телефона"
    await sendKeysToTheElement(callbackForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поле "Телефон"
    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номере телефона' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.wait(
      until.elementLocated(callbackForm.submitButton),
      5000,
      "Кнопка 'Отправить' не найдена'"
    );
    await driver.findElement(callbackForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(callbackForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(notfoundPage.callbackForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it("50597 Обратный звонок - Отправка формы со всеми корректно заполненными необходимыми полями", async function () {
    // открытие страницы
    await openPage(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    await driver.sleep(500);

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(callbackForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(callbackForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поля "Имя" и "Телефон"
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Обратный звонок" и ожидание появления сообщения валидации обязательных полей
    await driver.wait(
      until.elementLocated(callbackForm.submitButton),
      5000,
      "Кнопка 'Отправить' не найдена'"
    );
    await driver.findElement(callbackForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(callbackForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver.findElement(notfoundPage.callbackForm).getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
});
