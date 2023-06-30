const express = require("express");

const router = express.Router();

router.get("/url", (req, res, next) => {
  console.log("message");
  res.json({ message: "it works" });
});

module.exports = router;
