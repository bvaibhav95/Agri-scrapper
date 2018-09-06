const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
  id: { type: String, required: true },
  stateId: { type: String, required: true },
  districtId: { type: String, required: true },
  name: { type: String, required: true }
});

const MarketModel = mongoose.model("Market", MarketSchema);
export default MarketModel;
