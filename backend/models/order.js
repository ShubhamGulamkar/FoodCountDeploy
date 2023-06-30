const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  date: { type: String },
  veg: { type: [String] },
  non_veg: { type: [String] },
});

module.exports = mongoose.model("Order", OrderSchema);
