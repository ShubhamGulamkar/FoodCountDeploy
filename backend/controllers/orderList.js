const { response } = require("express");

const HttpError = require("../models/http-error");

const user = require("../models/user");

const Order = require("../models/order");

const mongoose = require("mongoose");

const orderList = async (req, res, next) => {
  const { date } = req.body;

  let nonVegOrderList, vegOrderList;

  let orders;

  try {
    orders = await Order.findOne({ date: date });

    nonVegOrderList = await user
      .find({ empid: { $in: orders.non_veg } })
      .select("-password");

    vegOrderList = await user
      .find({ empid: { $in: orders.veg } })
      .select("-password");
  } catch (e) {
    const error = new HttpError("connection failed,try again", 500);

    return next(error);
  }

  res
    .status(200)
    .json({ NonvegOrderList: nonVegOrderList, VegOrderList: vegOrderList });
};

exports.orderList = orderList;
