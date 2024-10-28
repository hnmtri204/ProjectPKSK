require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require ( 'cloudinary' ). v2 ; 
const upload = require ( './multer-config' ); 
const session = require('express-session');

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET  = process.env.CLOUDINARY_API_SECRET ;
const SESSION_SECRET = process.env.SESSION_SECRET


const userRouterRole = require("./routers/Role");
const userRouterDoctor = require("./routers/Doctor");
const userRouterPatient = require("./routers/Patient");
const userRouterSpecialization = require("./routers/Specialization");
const userRouterNotification = require("./routers/Notification");
const userRouterAppointment = require("./routers/Appointment");
const userRouterSchedule = require("./routers/Schedule");
const userRouterHome = require("./routers/Home");

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb is connected."))
  .catch((e) => console.log(e));

//data json
app.use(express.json());

//session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


//user route
app.use("/role", userRouterRole);
app.use("/doctor", userRouterDoctor);
app.use("/patient", userRouterPatient);
app.use("/specialization", userRouterSpecialization);
app.use("/notification", userRouterNotification);
app.use("/appointment", userRouterAppointment);
app.use("/schedule", userRouterSchedule);
app.use("/", userRouterHome);


//route defauld
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Express route for image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path , {
       folder:'doctor'
    });

    // Send the Cloudinary URL in the response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

