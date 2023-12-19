const { Builder } = require("selenium-webdriver");
const { takeScreenshot } = require("./helpers");
const fs = require("fs");
const sendStatusInTestRail = require("d:/Autotests/Sites/test-rail/sendStatus");
const { log } = require("console");

exports.mochaHooks = {
  beforeEach: async function () {
    // запуск браузера
    driver = await new Builder().forBrowser("chrome").build();
    // раскрытие окна браузера во весь экран
    await driver.manage().window().maximize();
    // установка ожидания
    await driver.manage().setTimeouts({ implicit: 10000 });
  },

  afterEach: async function () {
    const testTitle = this.currentTest.title;

    // при успехе отправка статуса в TestRai, если ID тестрана не равен 0
    if (this.currentTest.state == "passed") {
      await sendStatusInTestRail(1, Number(testTitle.split(" ").shift()));
    }

    // при упавшем тесте отправка статуса в TestRail и снятие скриншота
    if (this.currentTest.state == "failed") {
      await sendStatusInTestRail(5, Number(testTitle.split(" ").shift()));

      await driver.takeScreenshot().then(function (image) {
        fs.writeFile(
          `failed_test ${testTitle}.png`,
          image,
          "base64",
          function (err) {
            console.log(err);
          }
        );
      });
    }

    // закрытие браузера
    await driver.quit();
  },
};
