const express = require("express");
const router = express.Router();
const {
  createRole
} = require("../controllers/RoleController/index");

// Định nghĩa route
router.post("/create", createRole);

module.exports = router;
