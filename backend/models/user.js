const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  empid: {
    type: Number,
    required: true,
  },
  ename: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // minlenght: 5
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  mobile: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
