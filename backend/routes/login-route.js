const express = require("express");
const login_signup_controller = require("../controllers/login-signup-controller");
const router = express.Router();
const placeOrder_controller = require("../controllers/order-controller1");
const OrderList_controller = require("../controllers/order-list-controller");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", login_signup_controller.signup);

// login
router.post("/signin", login_signup_controller.login);
router.use(checkAuth);

router.post("/booking", placeOrder_controller.placeOrder1);

router.post("/orderlist", OrderList_controller.orderList);

module.exports = router;
