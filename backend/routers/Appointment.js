const express = require("express");
const router = express.Router();
const {
  createAppointment,
  findAllAppointment,
  findAppointment,
  updateAppointment,
  deleteAppointment
} = require("../controllers/AppointmentController/index");

// Định nghĩa route
router.post("/create", createAppointment);
router.get("/find-all", findAllAppointment);
router.get("/find/:id", findAppointment);
router.put("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);

module.exports = router;
