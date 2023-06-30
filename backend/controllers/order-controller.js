const HttpError = require("../models/http-error");
const Order = require("../models/order");
const mongoose = require("mongoose");

const placeOrder = async (req, res, next) => {
  const { id, type, date } = req.body;

  console.log(date);
  //var d = new Date(date);
  console.log(date);
  // console.log(req.body);
  // console.log(d);
  let orderl;
  try {
    orderl = await Order.findOne({ date: date });
    console.log(orderl);
  } catch (e) {
    const error = new HttpError("connection failed,try again", 500);
    return next(error);
  }
  if (orderl) {
    if (type === "0") {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        orderl.veg.push(id);
      }
    } else {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        orderl.non_veg.push(id);
      }
    }
  } else {
    orderl = new Order({
      date: date,
    });
    if (type === "0") {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        orderl.veg.push(id);
      }
    } else {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        orderl.non_veg.push(id);
      }
    }

    console.log(orderl);
  }
  try {
    await orderl.save();
  } catch (e) {
    console.log(e);
    const error = new HttpError("connection failed,try again", 500);
    return next(error);
  }
  res.status(201).json({ order: orderl });
};

exports.placeOrder = placeOrder;
