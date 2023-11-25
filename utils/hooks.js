const { Builder } = require("selenium-webdriver");
const { takeScreenshot } = require("./helpers");
const fs = require("fs");

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
    // снятие скриншота при упавшем тесте
    if (this.currentTest.state == "failed") {
      await driver.takeScreenshot().then(function (image) {
        fs.writeFile(`failed.png`, image, "base64", function (err) {
          console.log(err);
        });
      });
    }

    // if (this.currentTest.state == "failed") {
    //   takeScreenshot(this.currentTest.title);
    // }

    // закрытие браузера
    await driver.quit();
  },
};
