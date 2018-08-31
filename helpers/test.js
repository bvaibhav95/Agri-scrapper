const extractedFunctions = require("./extractedFunctions");
const puppeteer = require("puppeteer");

const testingFunction = async () => {
  const browser = await puppeteer.launch({
    args: [
      // all related chromium flags I could find
      "--disable-background-timer-throttling",
      "--disable-renderer-backgrounding",
      "--override-plugin-power-saver-for-testing=never",
      "--disable-extensions-http-throttling"
    ],
    headless: false
  });
  const timeout = 3000000;
  const page = await browser.newPage();
  for (let i = 0; i < 3; i++) {
    console.log(`navigating ${i}`);
    await page.goto("https://google.com");
    const input = await page.$('input[type="text"]');
    input.type("test");
    const submit = await page.$('input[type="submit"]');
    await Promise.all([page.waitForNavigation(), submit.click()]);
  }
};

module.exports = {
  testingFunction
};
