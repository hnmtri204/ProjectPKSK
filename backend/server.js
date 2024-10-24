require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouterRole = require("./routers/Role");
const userRouterDoctor = require("./routers/Doctor");
const userRouterPatient = require("./routers/Patient");
const userRouterSpecialization = require("./routers/Specialization");
const userRouterNotification = require("./routers/Notification");
const userRouterAppointment = require("./routers/Appointment");
const userRouterSchedule = require("./routers/Schedule");


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb is connected."))
  .catch((e) => console.log(e));

//data json
app.use(express.json());

//user route
app.use("/role", userRouterRole);
app.use("/doctor", userRouterDoctor);
app.use("/patient", userRouterPatient);
app.use("/specialization", userRouterSpecialization);
app.use("/notification", userRouterNotification);
app.use("/appointment", userRouterAppointment);
app.use("/schedule", userRouterSchedule);


//route defauld
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
