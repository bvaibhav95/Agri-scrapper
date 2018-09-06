const puppeteer = require("puppeteer");

const puppeteerSetup = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"]
  });
  const page = await browser.newPage();
  await ignoreImageLoading(page);
  await page.goto("http://agmarknet.gov.in/default.aspx", {
    timeout: 300000
  });
  return page;
};

const ignoreImageLoading = async page => {
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.resourceType() === "image") request.abort();
    else request.continue();
  });
};

const clearInput = async (page, selector) => {
  await page.click(selector);
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
};

const blankClick = async page => {
  await page.click("#accessibility_pan");
};
module.exports = {
  puppeteerSetup,
  clearInput,
  blankClick
};
