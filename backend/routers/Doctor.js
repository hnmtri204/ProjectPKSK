// const express = require("express");
// const router = express.Router();
// const {
//   createDoctor,
//   findAllDoctor,
//   findDoctor,
//   updateDoctor,
//   deleteDoctor
// } = require("../controllers/DoctorController/index");

// // Định nghĩa route
// router.post("/create", createDoctor);
// router.get("/find-all", findAllDoctor);
// router.get("/find/:id", findDoctor);
// router.put("/update/:id", updateDoctor);
// router.delete("/delete/:id", deleteDoctor);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  createDoctor,
  findAllDoctor,
  findDoctor,
  updateDoctor,
  deleteDoctor
} = require("../controllers/DoctorController/index");
const upload = require('../multer-config'); // Import multer config

// Định nghĩa route
router.post("/create", upload.single('image'), createDoctor); // Sử dụng middleware upload
router.get("/find-all", findAllDoctor);
router.get("/find/:id", findDoctor);
router.put("/update/:id", updateDoctor);
router.delete("/delete/:id", deleteDoctor);

module.exports = router;
