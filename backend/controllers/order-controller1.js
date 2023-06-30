const HttpError = require("../models/http-error");
const Order = require("../models/order");
const mongoose = require("mongoose");
const userHistory = require("../models/userHistory");

const placeOrder1 = async (req, res, next) => {
  const { id, type, date } = req.body;

  console.log(date);
  //var d = new Date(date);
  console.log(date);
  // console.log(req.body);
  // console.log(d);
  let bookingstatus = 0;
  let userhistory;
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
        bookingstatus = 1;
        orderl.veg.push(id);
      }
    } else {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        bookingstatus = 1;
        orderl.non_veg.push(id);
      }
    }
  } else {
    orderl = new Order({
      date: date,
    });
    if (type === "0") {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        bookingstatus = 1;
        orderl.veg.push(id);
      }
    } else {
      if (!orderl.non_veg.includes(id) && !orderl.veg.includes(id)) {
        bookingstatus = 1;
        orderl.non_veg.push(id);
      }
    }
  }
  try {
    userhistory = await userHistory.findOne({ empid: id });
  } catch (e) {
    const error = new HttpError("connection failed,try again", 500);
    return next(error);
  }

  if (bookingstatus == 1) {
    try {
      userhistory = await userHistory.findOne({ empid: id });
    } catch (e) {
      const error = new HttpError("connection failed,try again", 500);
      return next(error);
    }

    if (userhistory) {
      userhistory.orderlist.push({ date, type });
      try {
        await userhistory.save();
      } catch (e) {
        const error = new HttpError("connection failed,try again", 500);
        return next(error);
      }
    } else {
      userhistory = new userHistory({
        empid: id,
        orderlist: [],
      });
      userhistory.orderlist.push({ date: date, type: type });
      console.log(userhistory);
      try {
        await userhistory.save();
      } catch (e) {
        const error = new HttpError("connection failed,try again", 500);
        return next(error);
      }
    }
  }

  console.log(orderl);

  try {
    await orderl.save();
  } catch (e) {
    console.log(e);
    const error = new HttpError("connection failed,try again", 500);
    return next(error);
  }
  res.status(201).json({
    booking_status: bookingstatus,
    userhistory: userhistory
      ? userhistory
      : {
          empid: id,
          orderlist: [],
        },
  });
};

exports.placeOrder1 = placeOrder1;
