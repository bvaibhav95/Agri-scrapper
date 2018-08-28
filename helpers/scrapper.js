const extractedFunctions = require("./extractedFunctions");

const scrapeStatesDistrictsAndMarketsData = async () => {
  try {
    let stateList = [];
    let data = [];
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlState");
    await extractedFunctions.blankClick(page);
    const stateOptionList = await page.$$("#ddlState option");
    for (let i = 1; i < stateOptionList.length; i++) {
      stateList[i - 1] = await page.evaluate(state => {
        return {
          stateName: state.innerHTML,
          stateId: state.value
        };
      }, stateOptionList[i]);
    }
    for (let s = 0; s < 2; s++) {
      await page.click("#ddlState");
      await page.select("#ddlState", stateList[s].stateId);
      await page.waitFor(2000);

      //loop for districts now
      const districtOptionList = await page.$$("#ddlDistrict option");
      let stateWiseDistrictList = [];
      for (let j = 1; j < districtOptionList.length; j++) {
        stateWiseDistrictList[j - 1] = await page.evaluate(district => {
          return {
            districtName: district.innerHTML,
            districtId: district.value
          };
        }, districtOptionList[j]);
      }
      let districtWiseMarketArray = [];
      for (let k = 0; k < stateWiseDistrictList.length; k++) {
        await page.click("#ddlDistrict");
        await page.select("#ddlDistrict", stateWiseDistrictList[k].districtId);
        await page.waitFor(1000);

        const marketOptionList = await page.$$("#ddlMarket option");
        let districtWiseMarketList = [];
        for (let l = 1; l < marketOptionList.length; l++) {
          districtWiseMarketList[l - 1] = await page.evaluate(market => {
            return {
              marketName: market.innerHTML,
              marketId: market.value
            };
          }, marketOptionList[l]);
        }
        districtWiseMarketArray[k] = {
          districtName: stateWiseDistrictList[k].districtName,
          districtId: stateWiseDistrictList[k].districtId,
          markets: districtWiseMarketList
        };
      }
      data[s] = {
        stateName: stateList[s].stateName,
        stateId: stateList[s].stateId,
        districts: districtWiseMarketArray
      };
    }
    await browser.close();
    return data;
  } catch (error) {
    return error;
  }
};

const scrapeAllCommodityList = async () => {
  try {
    let commodityList = [];
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlCommodity");
    const commodityOptionList = await page.$$("#ddlCommodity option");
    for (let i = 1; i < commodityOptionList.length; i++) {
      commodityList[i - 1] = await page.evaluate(commodity => {
        return {
          name: commodity.innerHTML,
          id: commodity.value
        };
      }, commodityOptionList[i]);
    }
    await browser.close();
    return commodityList;
  } catch (error) {
    return error;
  }
};

const scrapeAllStateList = async () => {
  try {
    let stateList = [];
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlState");
    const stateyOptionList = await page.$$("#ddlState option");
    for (let i = 1; i < stateyOptionList.length; i++) {
      stateList[i - 1] = await page.evaluate(state => {
        return {
          name: state.innerHTML,
          id: state.value
        };
      }, stateyOptionList[i]);
    }
    await browser.close();
    return stateList;
  } catch (error) {
    return error;
  }
};

const scrapeStateWiseDistrictList = async stateId => {
  try {
    let stateWiseDistrictList = [];
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlState");
    await extractedFunctions.blankClick(page);
    await page.click("#ddlState");
    await page.select("#ddlState", stateId);
    // await extractedFunctions.blankClick(page);
    await page.waitFor(2000);
    const districtOptionList = await page.$$("#ddlDistrict option");
    for (let i = 1; i < districtOptionList.length; i++) {
      stateWiseDistrictList[i - 1] = await page.evaluate(district => {
        return {
          name: district.innerHTML,
          id: district.value
        };
      }, districtOptionList[i]);
    }
    await browser.close();
    return stateWiseDistrictList;
  } catch (error) {
    return error;
  }
};

const scrapeAllMarketList = async () => {
  try {
    let allMarketList = [];
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlMarket");
    const allMarketOptionList = await page.$$("#ddlMarket option");
    for (let i = 1; i < allMarketOptionList.length; i++) {
      allMarketList[i - 1] = await page.evaluate(market => {
        return {
          name: market.innerHTML,
          id: market.value
        };
      }, allMarketOptionList[i]);
    }
    await browser.close();
    return allMarketList;
  } catch (error) {
    return error;
  }
};

const scrapeDistrictWiseMarketList = async (stateId, districtId) => {
  try {
    let districtWiseMarkettList = [];
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlState");
    await extractedFunctions.blankClick(page);
    await page.click("#ddlState");
    await page.select("#ddlState", stateId);
    await page.waitFor(2000);

    await page.waitForSelector("#ddlDistrict");
    await page.click("#ddlDistrict");
    await page.select("#ddlDistrict", districtId);
    await page.waitFor(2000);

    const marketOptionList = await page.$$("#ddlMarket option");
    for (let i = 1; i < marketOptionList.length; i++) {
      districtWiseMarkettList[i - 1] = await page.evaluate(market => {
        return {
          name: market.innerHTML,
          id: market.value
        };
      }, marketOptionList[i]);
    }
    await browser.close();
    return districtWiseMarkettList;
  } catch (error) {
    return error;
  }
};

const scrapeCommodityPrice = async (
  priceArrivalOption,
  commodityId,
  stateId,
  districtId,
  marketId,
  date
) => {
  try {
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlArrivalPrice");
    await page.waitForSelector("#ddlCommodity");
    await page.waitForSelector("#ddlState");
    await page.waitForSelector("#ddlDistrict");
    await page.waitForSelector("#ddlMarket");
    await page.waitForSelector(".commodity");
    await page.waitForSelector("#btnGo");

    await extractedFunctions.blankClick(page);

    await page.click("#ddlArrivalPrice");
    await page.select("#ddlArrivalPrice", priceArrivalOption);

    await page.click("#ddlCommodity");
    await page.select("#ddlCommodity", commodityId);

    await page.click("#ddlState");
    await page.select("#ddlState", stateId);
    await page.waitFor(3000);

    await page.click("#ddlDistrict");
    await page.select("#ddlDistrict", districtId);
    await page.waitFor(1000);

    await page.click("#ddlMarket");
    await page.select("#ddlMarket", marketId);

    await page.click("#txtDate");
    await page.keyboard.down("Control");
    await page.keyboard.press("KeyA");
    await page.keyboard.up("Control");
    await page.keyboard.press("Backspace");

    await page.click("#txtDateTo");
    await page.keyboard.down("Control");
    await page.keyboard.press("KeyA");
    await page.keyboard.up("Control");
    await page.keyboard.press("Backspace");

    await page.click("#txtDate");
    await page.keyboard.type(date);

    await page.click("#txtDateTo");
    await page.keyboard.type(date);

    await page.click("#btnGo");
    await page.waitForNavigation();

    // await browser.close();
    return "done!!!";
  } catch (error) {
    return error;
  }
};

const scrapeCommodityArrival = async (
  priceArrivalOption,
  commodityId,
  stateId,
  districtId,
  marketId,
  date
) => {
  try {
    const page = await extractedFunctions.puppeteerSetup();
    await page.waitForSelector("#ddlArrivalPrice");
    await page.waitForSelector("#ddlCommodity");
    await page.waitForSelector("#ddlState");
    await page.waitForSelector("#ddlDistrict");
    await page.waitForSelector("#ddlMarket");
    await page.waitForSelector(".commodity");
    await page.waitForSelector("#btnGo");

    await extractedFunctions.blankClick(page);

    await page.click("#ddlArrivalPrice");
    await page.select("#ddlArrivalPrice", priceArrivalOption);

    await page.click("#ddlCommodity");
    await page.select("#ddlCommodity", commodityId);

    await page.click("#ddlState");
    await page.select("#ddlState", stateId);
    // await page.waitForSelector("#upl1");
    // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    // await page.on("response", async response => {
    //   if (response.resourceType === "XHR" && response.status() === 200) {
    //     await page.click("#ddlDistrict");
    //     await page.select("#ddlDistrict", districtId);
    //   }
    // });

    await page.click("#ddlMarket");
    await page.select("#ddlMarket", marketId);

    // await extractedFunctions.blankClick(page);
    await extractedFunctions.clearInput(page, "#txtDate");
    await page.keyboard.type(date);

    // await extractedFunctions.blankClick(page);
    await extractedFunctions.clearInput(page, "#txtDateTo");
    await page.keyboard.type(date);

    await page.click("#btnGo");
    await page.waitForNavigation({ waitUntil: "load" });

    const arrivalMarketNameSelector = await page.$(
      "#cphBody_GridArrivalData_LabState_name_0"
    );
    const arrivalQuantitySelector = await page.$(
      "#cphBody_GridArrivalData_lblarrival_std_unit_0"
    );
    const arrivalMarketName = await page.evaluate(market => {
      return market.innerHTML;
    }, arrivalMarketNameSelector);
    const arrivalQuantity = await page.evaluate(qty => {
      return qty.innerHTML;
    }, arrivalQuantitySelector);
    await browser.close();
    return {
      marketName: arrivalMarketName,
      arrivalQty: arrivalQuantity
    };
  } catch (error) {
    return error;
  }
};

const scrapeEggPrice = async () => {};

module.exports = {
  scrapeStatesDistrictsAndMarketsData,
  scrapeAllCommodityList,
  scrapeAllStateList,
  scrapeStateWiseDistrictList,
  scrapeAllMarketList,
  scrapeDistrictWiseMarketList,
  scrapeCommodityPrice,
  scrapeCommodityArrival,
  scrapeEggPrice
};
