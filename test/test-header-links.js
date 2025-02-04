const { By } = require("selenium-webdriver");
const { mainPage } = require("../pages/main-page");
const { bottomLinksTexts } = require("../pages/info/info-for-header");

describe("Проверка ссылок на произвольные страницы из нижней части хедера", async function () {
  it("Проверка ссылки на страницу Портфолио", async function () {
    await driver.get(mainPage.pageURL);

    const allPagesLinks = [];
    const headerTopLinkElements = await driver.findElements(
      By.css(".header-top__services a")
    );
    const headerBottomLinkElements = await driver.findElements(
      By.css(".header-bottom a")
    );

    headerTopLinkElements.forEach(async (el) => {
      allPagesLinks.push(await el.getAttribute("href"));
    });

    headerBottomLinkElements.forEach(async (el) => {
      allPagesLinks.push(await el.getAttribute("href"));
    });

    allPagesLinks.forEach((el) => {
      // await driver.get(el);
      console.log(el);
    });

    // await driver.executeScript(
    //   `arguments.forEach((el) => {${allPagesLinks}.push(el.getAttribute('href'))}`
    // );

    // function showLinksIntoList(params) {
    //   const allLinks = document.querySelectorAll("div.header-bottom a");
    //   allLinks.forEach((el) => {
    //     if (el.parentElement.classList.contains("header-bottom__list")) {
    //       console.log(el);
    //     }
    //   });
    // }

    //   document.querySelectorAll("div.header-bottom a").forEach((el) => {
    //     if (el.parentElement.classList.contains("header-bottom__list")) {
    //        el.parentElement.style = "opacity:1"
    //     }
    // })

    // const allHeaderBottomDropdowns = await driver.findElements(
    //   By.css(".font-control.header-bottom__dropdown")
    // );

    // await allHeaderBottomDropdowns.forEach(async (el) => {
    //   await el.click();
    // });

    // console.log(await driver.findElement(By.css("div.header-bottom a")));
    // await driver
    //   .findElement(By.css(".font-control.header-bottom__dropdown"))
    //   .click();

    // const allHeaderBottomLinks = await driver.findElements(
    //   By.css("div.header-bottom a")
    // );

    // await allHeaderBottomLinks.forEach(async (el) => {
    // console.log(await el.getText());
    // console.log(await el.getAttribute("href"));
    // await el.click();
    // await driver.sleep(3000);
    // console.log(el.parent);
    // if (
    //   await driver.executeScript(
    //     "arguments[0].parentElement.classList.contains('header-bottom__list')",
    //     el
    //   )
    // ) {
    // }
    // await driver
    //   .actions()
    //   .move({ origin: await el })
    //   .perform();
    // await driver.sleep(3000);
    // });

    // await driver.sleep(3000);
  });
});
