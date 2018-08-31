var express = require("express");
var router = express.Router();
const scrapper = require("../helpers/scrapper");
const test = require("../helpers/test");

router.get("/", (req, res, next) => {
  res.send("Testing...");
});

router.get("/test", async (req, res, next) => {
  await test.testingFunction();
  res.send("Testing disconnect...");
});

router.get("/pull-data", async (req, res, next) => {
  const data = await scrapper.scrapeStatesDistrictsAndMarketsData();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

router.get("/commodity-list", async (req, res, next) => {
  const commodityArray = await scrapper.scrapeAllCommodityList();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(commodityArray));
});

router.get("/state-list", async (req, res, next) => {
  const stateArray = await scrapper.scrapeAllStateList();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(stateArray));
});

router.get("/all-market-list", async (req, res, next) => {
  const allMarketArray = await scrapper.scrapeAllMarketList();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(allMarketArray));
});

router.get("/district-list/:stateId", async (req, res, next) => {
  const stateWiseDistrictArray = await scrapper.scrapeStateWiseDistrictList(
    req.params.stateId
  );
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(stateWiseDistrictArray));
});

router.get("/market-list/:stateId/:districtId", async (req, res, next) => {
  const districtWiseMarketArray = await scrapper.scrapeDistrictWiseMarketList(
    req.params.stateId,
    req.params.districtId
  );
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(districtWiseMarketArray));
});

router.get("/market-list-in-state/:stateId", function(req, res, next) {});

router.get(
  "/commodity-price/:priceArrivalOption/:commodityId/:stateId/:districtId/:marketId/:date",
  async (req, res, next) => {
    const districtWiseMarketArray = await scrapper.scrapeCommodityPrice(
      req.params.priceArrivalOption,
      req.params.commodityId,
      req.params.stateId,
      req.params.districtId,
      req.params.marketId,
      req.params.date
    );
    // res.setHeader("Content-Type", "application/json");
    res.send(districtWiseMarketArray);
  }
);

router.get(
  "/commodity-arrival/:priceArrivalOption/:commodityId/:stateId/:districtId/:marketId/:date",
  async (req, res, next) => {
    const arrivalData = await scrapper.scrapeCommodityArrival(
      req.params.priceArrivalOption,
      req.params.commodityId,
      req.params.stateId,
      req.params.districtId,
      req.params.marketId,
      req.params.date
    );
    res.setHeader("Content-Type", "application/json");
    res.send(arrivalData);
  }
);

router.get("/eggs", function(req, res, next) {});

module.exports = router;
