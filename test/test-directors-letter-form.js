const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  sendKeysToTheElement,
  getFormattedPhoneNumber,
  hideElementIfVisible,
} = require("../utils/helpers");
const { infoForInputs } = require("../pages/info/info-for-inputs");
const { directorsPage } = require("../pages/directors-page");
const { directorsForm } = require("../pages/forms/directors-form");
const { mainPage } = require("../pages/main-page");

describe("Проверка формы 'Письмо директору'", async function () {
  // из-за некорректной настройки формы, при загрузке страницы, форма сначала удаляет все значения и перезагружается
  // поэтому, первым действием приходится пропускать это процесс

  it("50654 Письмо директору - Отправка формы с незаполненными полями", async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');
  });
  it('50655 Письмо директору - Отправка формы с корректно заполненным полем "Имя"', async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Имя"
    await driver
      .findElement(directorsForm.inputName)
      .sendKeys(infoForInputs.name);

    // проверка введённого текста в поле "Имя"
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("value")
    ).to.be.equal(infoForInputs.name);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');
  });
  it('50656 Письмо директору - Отправка формы с корректно заполненным полем "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Номер телефона"
    await driver
      .findElement(directorsForm.inputPhone)
      .sendKeys(infoForInputs.phone);

    // проверка введённого текста в поле "Номер телефона"
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(
        infoForInputs.phone,
        "Значение в поле 'Номере телефона' не совпадает с введённым"
      )
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50657 Письмо директору - Отправка формы с корректно заполненным полем "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Электронная почта"
    await driver
      .findElement(directorsForm.inputEmail)
      .sendKeys(infoForInputs.email);

    // проверка введённого текста в поле "Электронная почта"
    expect(
      await driver
        .findElement(
          directorsForm.inputEmail,
          "Значение в поле 'Электронная почта' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.email);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
  it('50658 Письмо директору - Отправка формы с корректно заполненными полями "Имя" и "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поля "Имя" и "Телефон"
    await sendKeysToTheElement(directorsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(directorsForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поля "Имя" и "Номер телефона"
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(
        infoForInputs.phone,
        "Значение в поле 'Номере телефона' не совпадает с введённым"
      )
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50659 Письмо директору - Отправка формы с корректно заполненными полями "Имя" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле"Имя" и "Электронная почта"
    await sendKeysToTheElement(directorsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(directorsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Имя" и "Электронная почта"
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver
        .findElement(
          directorsForm.inputEmail,
          "Значение в поле 'Электронная почта' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.email);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it('50660 Письмо директору - Отправка формы с корректно заполненными полеми "Телефон" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Телефон" и "Электронная почта"
    await sendKeysToTheElement(directorsForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(directorsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Номер телефона" и "Электронная почта"
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(
        infoForInputs.phone,
        "Значение в поле 'Номере телефона' не совпадает с введённым"
      )
    );
    expect(
      await driver
        .findElement(
          directorsForm.inputEmail,
          "Значение в поле 'Электронная почта' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.email);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50661 Письмо директору - Отправка формы со всеми корректно заполненными необходимыми полями", async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(directorsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(directorsForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(directorsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста во все поля
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(
        infoForInputs.phone,
        "Значение в поле 'Номере телефона' не совпадает с введённым"
      )
    );
    expect(
      await driver
        .findElement(
          directorsForm.inputEmail,
          "Значение в поле 'Электронная почта' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.email);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме "Быстрый заказ" и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50662 Письмо директору - Отправка формы со всеми корректно заполненными полями (включая необязательные)", async function () {
    // открытие страницы
    await driver.get(directorsPage.pageURL);

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("section.appeal form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(directorsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(directorsForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(directorsForm.inputEmail, infoForInputs.email);
    await sendKeysToTheElement(
      directorsForm.inputNumberOfOrder,
      infoForInputs.numberOfOrder
    );
    await sendKeysToTheElement(
      directorsForm.inputMessage,
      infoForInputs.message
    );

    // проверка введённого текста во все поля
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(
        infoForInputs.phone,
        "Значение в поле 'Номере телефона' не совпадает с введённым"
      )
    );
    expect(
      await driver
        .findElement(
          directorsForm.inputEmail,
          "Значение в поле 'Электронная почта' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.email);
    expect(
      await driver
        .findElement(
          directorsForm.inputNumberOfOrder,
          "Значение в поле 'Город' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.numberOfOrder);
    expect(
      await driver.findElement(directorsForm.inputMessage).getAttribute("value")
    ).to.be.equal(
      infoForInputs.message,
      "Значение в поле 'Площадь' не совпадает с введённым"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(directorsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(directorsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver
        .findElement(directorsPage.directorsForm)
        .getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(directorsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(directorsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(directorsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
});
