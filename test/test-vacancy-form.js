const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const {
  getFormattedPhoneNumber,
  sendKeysToTheElement,
  hideElementIfVisible,
} = require("../utils/helpers");
const { infoForInputs } = require("../pages/info/info-for-inputs");
const { vacancyPage } = require("../pages/vacancy-page");
const { vacancyForm } = require("../pages/forms/vacancy-form");
const { mainPage } = require("../pages/main-page");

describe("Проверка формы 'Отклик на вакансию'", async function () {
  it("50669 Отклик на вакансию - Отправка формы с незаполненными полями", async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');
  });
  it('50670 Отклик на вакансию - Отправка формы с корректно заполненным полем "Имя"', async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста в поле "Имя"
    await sendKeysToTheElement(vacancyForm.inputName, infoForInputs.name);

    // проверка введённого текста в поле "Имя"
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');
  });
  it('50671 Отклик на вакансию - Отправка формы с корректно заполненным полем "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста в поле "Номер телефона"
    await sendKeysToTheElement(vacancyForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поле "Телефон"
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50672 Отклик на вакансию - Отправка формы с корректно заполненным полем "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста в поле "Электронная почта"
    await sendKeysToTheElement(vacancyForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поле "Электронная почта""
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
  it('50673 Отклик на вакансию - Отправка формы с корректно заполненными полями "Имя" и "Номер телефона"', async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста в поле "Имя" и "Номер телефона"
    await sendKeysToTheElement(vacancyForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(vacancyForm.inputPhone, infoForInputs.phone);

    // проверка введённого текста в поля "Имя" и "Телефон"
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.include("not-valid", 'У поля "Электронная почта" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
  });
  it('50674 Отклик на вакансию - Отправка формы с корректно заполненными полями "Имя" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      5000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста в поля "Имя" и "Электронная почта"
    await sendKeysToTheElement(vacancyForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(vacancyForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Имя" и "Электронная почта"
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.include("not-valid", 'У поля "Номер телефона" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it('50675 Отклик на вакансию - Отправка формы с корректно заполненными полеми "Телефон" и "Электронная почта"', async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      10000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста в поле "Номер телефона" и "Электронная почта"
    await sendKeysToTheElement(vacancyForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(vacancyForm.inputEmail, infoForInputs.email);

    // проверка введённого текста в поля "Номер телефона" и "Электронная почта"
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у незаполненных обязательных полей наличия класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.include("not-valid", 'У поля "Имя" нет красной обводки');

    // проверка у сообщения валидации наличия класса, отвечающего за жёлтую обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("invalid", "Обводка у сообщения не жёлтая");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50676 Отклик на вакансию - Отправка формы со всеми корректно заполненными необходимыми полями", async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      10000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста во все необходимые поля
    await sendKeysToTheElement(vacancyForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(vacancyForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(vacancyForm.inputEmail, infoForInputs.email);

    // проверка введённого текста во все обязательные поля
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');

    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );

    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта"" есть красная обводка'
    );
  });
  it("50677 Отклик на вакансию - Отправка формы со всеми корректно заполненными полями (включая необязательные)", async function () {
    // открытие страницы
    await driver.get(vacancyPage.pageURL);

    // скрытие лишнего блока
    await driver.executeScript(
      "arguments[0].style.display = 'none'",
      await driver.findElement(By.css("div.job-row-swiper"))
    );

    // пропуск процесса обновления формы
    await driver.wait(
      until.elementLocated(By.css("div.popup--job.popup form.resetting")),
      10000,
      "Форма не успела обновиться"
    );

    // скрытие виджета, мешающего нажатию на кнопку "Откликнуться"
    if (await driver.findElement(mainPage.b24widget)) {
      await hideElementIfVisible(mainPage.b24widget);
    }

    //нажатие на кнопку "Откликнуться" и ожидание отображения формы "Отклик на вакансию"
    await driver.findElement(vacancyPage.vacanciesButton).click();
    await driver.wait(
      until.elementLocated(vacancyPage.vacanciesFormActive),
      5000,
      "Форма 'Отклик на вакансию' не отобразилась"
    );

    // ввод текста во все текстовые поля
    await sendKeysToTheElement(vacancyForm.inputName, infoForInputs.name);
    await sendKeysToTheElement(vacancyForm.inputPhone, infoForInputs.phone);
    await sendKeysToTheElement(vacancyForm.inputEmail, infoForInputs.email);

    // проверка введённого текста во все обязательные поля
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("value")
    ).to.be.equal(
      infoForInputs.name,
      "Значение в поле 'Имя' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("value")
    ).to.be.equal(
      getFormattedPhoneNumber(infoForInputs.phone),
      "Значение в поле 'Номер телефона' не совпадает с введённым"
    );
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("value")
    ).to.be.equal(
      infoForInputs.email,
      "Значение в поле 'Электронная почта' не совпадает с введённым"
    );

    // выбор случайного элемента в блоке "Способ связи" и нажатие на него
    const elementsFromSocials = await driver.findElements(vacancyForm.socials);
    const randomElementFromSocials =
      elementsFromSocials[
        Math.floor(Math.random() * elementsFromSocials.length)
      ];
    await randomElementFromSocials.click();

    // прикрепление файла
    await sendKeysToTheElement(vacancyForm.inputFile, infoForInputs.filePath);

    // нажатие на кнпоку "Отправить" в форме и ожидание появления сообщения валидации обязательных полей
    await driver.findElement(vacancyForm.submitButton).click();
    await driver.wait(
      until.elementIsVisible(
        await driver.findElement(vacancyForm.validationMessage),
        5000,
        "Сообщение валидации не отобразилось"
      )
    );

    // проверка у сообщения валидации наличия класса, отвечающего за зелёную обводку
    expect(
      await driver.findElement(vacancyPage.vacanciesForm).getAttribute("class")
    ).to.include("sent", "Обводка у сообщения не зелёная");

    // проверка отсутствия у корректно заполненных полей класса, отвечающего за красную обводку
    expect(
      await driver.findElement(vacancyForm.inputName).getAttribute("class")
    ).to.not.include("not-valid", 'У поля "Имя" есть красная обводка');
    expect(
      await driver.findElement(vacancyForm.inputPhone).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Номер телефона" есть красная обводка'
    );
    expect(
      await driver.findElement(vacancyForm.inputEmail).getAttribute("class")
    ).to.not.include(
      "not-valid",
      'У поля "Электронная почта" есть красная обводка'
    );
  });
});
