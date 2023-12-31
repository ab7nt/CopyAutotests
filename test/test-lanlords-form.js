const { By, until } = require("selenium-webdriver");
const { expect, assert } = require("chai");
const {
  getFormattedPhoneNumber,
  sendKeysToTheElement,
  hideElementIfVisible,
} = require("../utils/helpers");
const { infoForInputs } = require("../pages/info/info-for-inputs");
const { lanlordsPage } = require("../pages/landlords-page");
const { lanlordsForm } = require("../pages/forms/lanlords-form");
const { mainPage } = require("../pages/main-page");

describe("Проверка формы 'Арендодателям'", async function () {
  // из-за некорректной настройки формы, при загрузке страницы форма сначала удаляет все значения и перезагружается
  // поэтому приходится пропускать это процесс

  it("50639 Арендодателям - Отправка формы с незаполненными полями", async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // скролл к кнопке "Отправить", нажатие на неё и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage)
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');
  });
  it('50640 Арендодателям - Отправка формы с корректно заполненным полем "Имя"', async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Имя"
    await sendKeysToTheElement(lanlordsForm.inputName, infoForInputs.name);

    // проверка введённого текста в поле "Имя"
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');
  });
  it('50641 Арендодателям - Отправка формы с корректно заполненным полем "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Номер телефона"
    await sendKeysToTheElement(lanlordsForm.inputPhone, infoForInputs.phone);
    await driver.sleep(500);

    // проверка введённого текста в поле "Номер телефона"
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50642 Арендодателям - Отправка формы с корректно заполненным полем "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Электронная почта"
    await sendKeysToTheElement(lanlordsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поле "Электронная почта"
    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("value")
    ).to.be.equal(infoForInputs.email);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
  it('50643 Арендодателям - Отправка формы с корректно заполненными полями "Имя" и "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поля "Имя" и "Электронная почта"
    await sendKeysToTheElement(lanlordsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(lanlordsForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поле "Имя" и "Номер телефона"
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50644 Арендодателям - Отправка формы с корректно заполненными полями "Имя" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоковдание полной загрузки страницы
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поле "Электронная почта"
    await sendKeysToTheElement(lanlordsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(lanlordsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поле "Имя" и "Электронная почта"
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it('50645 Арендодателям - Отправка формы с корректно заполненными полеми "Телефон" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста в поля "Номер телефона" и "Электронная почта"
    await sendKeysToTheElement(lanlordsForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(lanlordsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поле "Номер телефона" и "Электронная почта"
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50646 Арендодателям - Отправка формы со всеми корректно заполненными необходимыми полями", async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста во все необходимые поля
    await sendKeysToTheElement(lanlordsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(lanlordsForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(lanlordsForm.inputEmail, infoForInputs.email);

    // проверка введённого текста во все необходимые поля
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("value")
    ).to.be.equal(getFormattedPhoneNumber(infoForInputs.phone));
    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("value")
    ).to.be.equal(infoForInputs.email);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50647 Арендодателям - Отправка формы со всеми корректно заполненными полями (включая необязательные)", async function () {
    // открытие страницы
    await driver.get(lanlordsPage.pageURL);

    // скрытие лишних блоков
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-invite"))
    );
    await driver.executeScript(
      "arguments[0].style.display='none'",
      await driver.findElement(By.css("div.rent-require"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.rent-form form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(lanlordsForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(lanlordsForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(lanlordsForm.inputEmail, infoForInputs.email);
    await sendKeysToTheElement(lanlordsForm.inputCity, infoForInputs.city);
    await sendKeysToTheElement(lanlordsForm.inputArea, infoForInputs.area);
    await sendKeysToTheElement(
      lanlordsForm.inputDistance,
      infoForInputs.distance
    );
    await sendKeysToTheElement(
      lanlordsForm.inputMessage,
      infoForInputs.message
    );

    // прикрепление файла
    await driver
      .findElement(lanlordsForm.inputFile)
      .sendKeys(infoForInputs.filePath);

    // проверка введённого текста во все поля
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(
        infoForInputs.phone,
        "Значение в поле 'Номере телефона' не совпадает с введённым"
      )
    );
    expect(
      await driver
        .findElement(
          lanlordsForm.inputEmail,
          "Значение в поле 'Электронная почта' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.email);
    expect(
      await driver
        .findElement(
          lanlordsForm.inputCity,
          "Значение в поле 'Город' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.city);
    expect(
      await driver.findElement(lanlordsForm.inputArea).getAttribute("value")
    ).to.be.equal(
      infoForInputs.area.toString(),
      "Значение в поле 'Площадь' не совпадает с введённым"
    );
    expect(
      await driver
        .findElement(
          lanlordsForm.inputDistance,
          "Значение в поле 'Расстояние до ст. метро' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.distance);
    expect(
      await driver
        .findElement(
          lanlordsForm.inputMessage,
          "Значение в поле 'Дополнительная информация' не совпадает с введённым"
        )
        .getAttribute("value")
    ).to.be.equal(infoForInputs.message);

    // скрытие виджета, мешающего нажатию на кнопку "Отправить"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(lanlordsForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(lanlordsForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver.findElement(lanlordsPage.lanlordsForm).getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(lanlordsForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(lanlordsForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(lanlordsForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
});
