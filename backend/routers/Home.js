const express = require("express");
const router = express.Router();
const {
  login,
  logout,
} = require("../controllers/HomeController/index");
const {
  patientCreateAppointment, 
  getCurrentUserAppointments,
  processPrematureCancellation,
  showUpcomingAppointments,
  getAppointmentByStatus,
  getAppointmentByDoctor
} = require("../controllers/AppointmentController/index");
const {profilePatient, updateProfilePatient} = require("../controllers/PatientController/index");
const userMiddleware = require("../middlewares/index");
const {
  getScheduleByDoctor
} = require("../controllers/ScheduleController/index");


// Định nghĩa route
router.post("/login", login);
router.post("/logout", logout);
router.post("/create-appointment", userMiddleware, patientCreateAppointment);
router.get("/profilePatient", userMiddleware, profilePatient);
router.post("/updateProfilePatient", userMiddleware, updateProfilePatient);
router.get("/user-appointment", userMiddleware, getCurrentUserAppointments);
router.delete("/cancel-appointment/:id", processPrematureCancellation);
router.get("/show-upcoming-appointments", userMiddleware, showUpcomingAppointments);
router.get("/show-upcoming-appointments", userMiddleware, showUpcomingAppointments);
router.get("/get-appointments-status", userMiddleware, getAppointmentByStatus);
router.get("/get-appointments-doctor/:id", getScheduleByDoctor);

module.exports = router;
