const express = require("express");
const router = express.Router();
const {
  login,
} = require("../controllers/HomeController/index");

// Định nghĩa route
router.post("/login", login);

module.exports = router;
