const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const { infoForInputs } = require("../pages/info/info-for-inputs");
const {
  getFormattedPhoneNumber,
  sendKeysToTheElement,
} = require("../utils/helpers");
const { quickOrderForm } = require("../pages/forms/quick-order-form");
const { mainPage } = require("../pages/main-page");
const { successfulSendPopup } = require("../pages/forms/successful-send-popup");

describe("Проверка формы 'Быстрый заказ'", async function () {
  it("50630 Быстрый заказ - Отправка формы с незаполненными полями", async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');
  });
  it('50631 Быстрый заказ - Отправка формы с корректно заполненным полем "Имя"', async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста в поле "Имя"
    await sendKeysToTheElement(quickOrderForm.inputName, infoForInputs.name);

    // проверка введённого текста в поле "Имя"
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в формае "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');
  });
  it('50632 Быстрый заказ - Отправка формы с корректно заполненным полем "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста в поле "Номер телефона"
    await sendKeysToTheElement(quickOrderForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поле "Номер телефона"
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50633 Быстрый заказ - Отправка формы с корректно заполненным полем "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста в поле "Электронная почта"
    await sendKeysToTheElement(quickOrderForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поле "Электронная почта"
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
  it('50634 Быстрый заказ - Отправка формы с корректно заполненными полями "Имя" и "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста в поля "Имя" и "Номер телефона"
    await sendKeysToTheElement(quickOrderForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(quickOrderForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поля "Номер телефона" и "Электронная почта"
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50635 Быстрый заказ - Отправка формы с корректно заполненными полями "Имя" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста в поля "Имя" и "Электронная почта"
    await sendKeysToTheElement(quickOrderForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(quickOrderForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Имя" и "Электронная почта"
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it('50636 Быстрый заказ - Отправка формы с корректно заполненными полеми "Телефон" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста в поля "Номер телефона" и "Электронная почта"
    await sendKeysToTheElement(quickOrderForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(quickOrderForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Телефон" и "Электронная почта"
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50637 Быстрый заказ - Отправка формы со всеми корректно заполненными необходимыми полями", async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста во все необходимые поля
    await sendKeysToTheElement(quickOrderForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(quickOrderForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(quickOrderForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Имя", "Телефон" и "Электронная почта"
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления поп-апа успешной отправки
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(mainPage.successfulSendPopup),
        5000,
        "Поп-ап успешной отправки не отобразился"
      )
    );

    // проверка заголовка в поп-апе успешной отправки
    expect(
      await driver.findElement(successfulSendPopup.title).getText()
    ).to.equal("Заявка принята", "Текст в заголовке поп-апа некорректный");

    // нажатие на кнопку "Понятно" в поп-апе успешной отправки
    await driver.findElement(successfulSendPopup.submitButton).click();

    await driver.sleep(3000);
  });
  it("50638 Быстрый заказ - Отправка формы со всеми корректно заполненными полями (включая необязательные)", async function () {
    // открытие страницы
    await driver.get(mainPage.pageURL);

    // нажатие на кнопку "Быстрый заказ" и ожидание отображения формы "Быстрый заказ"
    await driver.findElement(mainPage.quickOrderButton).click();
    await driver.wait(
      until.elementLocated(quickOrderForm.quickOrderFormActive),
      5000,
      "Форма Быстрый заказ не отобразилась"
    );

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(quickOrderForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(quickOrderForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(quickOrderForm.inputEmail, infoForInputs.email);
    await sendKeysToTheElement(
      quickOrderForm.inputMessage,
      infoForInputs.message
    );

    // выбор случайного элемента в блоке "Способ связи" и нажатие на него
    const elementsFromSocials = await driver.findElements(
      quickOrderForm.socials
    );
    const randomElementFromSocials =
      elementsFromSocials[
        Math.floor(Math.random() * elementsFromSocials.length)
      ];
    await randomElementFromSocials.click();

    // выбор тестового копицентра из списка "Пункт самовывоза"
    await driver.findElement(quickOrderForm.copycentersList).click();
    await driver.findElement(quickOrderForm.copycenterForTest).click();

    // прикрепление файла
    await driver
      .findElement(quickOrderForm.inputFile)
      .sendKeys(infoForInputs.filePath);

    // проверка введённого текста в поля "Имя", "Телефон" и "Электронная почта"
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(quickOrderForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(quickOrderForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver
        .findElement(quickOrderForm.quickOrderForm)
        .getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(quickOrderForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(quickOrderForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(quickOrderForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
});
