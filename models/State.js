const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

const StateModel = mongoose.model("State", StateSchema);
export default StateModel;
