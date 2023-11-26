const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  sendKeysToTheElement,
  getFormattedPhoneNumber,
} = require("../utils/helpers");
const { infoForInputs } = require("../pages/info/info-for-inputs");
const { notfoundPage } = require("../pages/notfound-page");
const { callbackForm } = require("../pages/forms/callback-form");

describe.only("Проверка формы 'Обратный звонок'", async function () {
  it("1. Отправка формы с незаполненными полями", async function () {
    // открытие страницы
    await driver.get(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.wait(
      until.elementLocated(callbackForm.submitButton),
      5000,
      "Кнопка 'Отправить' не найдена'"
    );
    await driver.sleep(1000);

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

    // проверка у обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');
  });
  it('2. Отправка формы с корректно заполненным полем "Имя"', async function () {
    // открытие страницы
    await driver.get(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    // ввод текста в поле "Имя"
    await sendKeysToTheElement(callbackForm.inputName, infoForInputs.name);

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

    // проверка введённого текста в поле "Имя"
    expect(
      await driver.findElement(callbackForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
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
  it('3. Отправка формы с корректно заполненным полем "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    // ввод текста в поле "Номер телефона"
    await sendKeysToTheElement(callbackForm.inputPhone, infoForInputs.phone);

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

    // проверка введённого текста в поле "Телефон"
    expect(
      await driver.findElement(callbackForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номере телефона' не совпадает с введённым"
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
  it.only("4. Отправка формы со всеми корректно заполненными необходимыми полями", async function () {
    // открытие страницы
    await driver.get(notfoundPage.pageURL);

    // нажатие на кнопку "Заказать обратный звонок" и ожидание отображения формы "Обратный звонок"
    await driver.findElement(notfoundPage.callbackButton).click();
    await driver.wait(
      until.elementLocated(notfoundPage.callbackFormActive),
      5000,
      "Форма Обратный звонок не отобразилась"
    );

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(callbackForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(callbackForm.inputPhone, infoForInputs.phone);

    await driver.sleep(1000);

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
