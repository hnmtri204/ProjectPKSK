const express = require("express");
const router = express.Router();
const {
  login,
  logout,
} = require("../controllers/HomeController/index");
const {
  patientCreateAppointment, 
  getCurrentUserAppointments} = require("../controllers/AppointmentController/index");
const {profilePatient, updateProfilePatient} = require("../controllers/PatientController/index");
const userMiddleware = require("../middlewares/index");


// Định nghĩa route
router.post("/login", login);
router.post("/logout", logout);
router.post("/create-appointment", userMiddleware, patientCreateAppointment);
router.get("/profilePatient", userMiddleware, profilePatient);
router.post("/updateProfilePatient", userMiddleware, updateProfilePatient);
router.get("/user-appointment", userMiddleware, getCurrentUserAppointments);

module.exports = router;
