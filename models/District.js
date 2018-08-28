const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema({
  id: { type: String, required: true },
  stateId: { type: String, required: true },
  name: { type: String, required: true }
});

const DistrictModel = mongoose.model("District", DistrictSchema);
export default DistrictModel;
