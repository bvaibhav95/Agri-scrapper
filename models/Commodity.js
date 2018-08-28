const mongoose = require("mongoose");

const CommoditySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

const CommodityModel = mongoose.model("UspImg", CommoditySchema);
export default CommodityModel;
