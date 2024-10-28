const express = require("express");
const router = express.Router();
const {
  createDoctor,
  findAllDoctor,
  findDoctor,
  updateDoctor,
  deleteDoctor
} = require("../controllers/DoctorController/index");

// Định nghĩa route
router.post("/create", createDoctor);
router.get("/find-all", findAllDoctor);
router.get("/find/:id", findDoctor);
router.put("/update/:id", updateDoctor);
router.delete("/delete/:id", deleteDoctor);

module.exports = router;
