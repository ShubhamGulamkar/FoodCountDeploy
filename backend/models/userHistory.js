const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userHistorySchema = new Schema({
  empid: {
    type: Number,
  },
  orderlist: {
    type:[{}]
  }
});

module.exports = mongoose.model("UserHistory", userHistorySchema);
