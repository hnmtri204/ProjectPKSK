require("dotenv").config();
const mongoose = require("mongoose");
const faker = require("faker");

// Import models
const User = require("../models/User");
const Role = require("../models/Role");
const UserRole = require("../models/User_role");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Specialization = require("../models/Specialization");
const Notification = require("../models/Notification");
const Appointment = require("../models/Appointment");
const AppointmentHistory = require("../models/Appointment_history");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb is connected."))
  .catch((e) => console.log(e));

const seedDatabase = async () => {
  // Seed roles
  const roles = ["doctor", "patient", "admin"].map(roleName => new Role({ name: roleName }));
  await Role.insertMany(roles);
  console.log("Roles seeded!");

  // Seed specializations
  const specializations = [
    { name: "Cardiology", description: "Heart related issues" },
    { name: "Neurology", description: "Brain and nervous system" },
    { name: "Pediatrics", description: "Children's health" },
  ].map(spec => new Specialization(spec));
  await Specialization.insertMany(specializations);
  console.log("Specializations seeded!");

  // Seed users, doctors, and patients
  const users = [];
  const doctors = [];
  const patients = [];

  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    users.push(user);

    const role = i < 5 ? "doctor" : "patient"; // 5 doctors and 5 patients
    const savedUser = await user.save();

    if (role === "doctor") {
      const specialization = specializations[Math.floor(Math.random() * specializations.length)];
      const doctor = new Doctor({
        user_id: savedUser._id,
        specialization_id: specialization._id,
      });
      doctors.push(doctor);
    } else {
      const patient = new Patient({
        user_id: savedUser._id,
        medical_history: faker.lorem.sentence(),
      });
      patients.push(patient);
    }

    // Assign role to user
    const roleId = await Role.findOne({ name: role });
    const userRole = new UserRole({
      user_id: savedUser._id,
      role_id: roleId._id,
    });
    await userRole.save();
  }

  await Doctor.insertMany(doctors);
  await Patient.insertMany(patients);
  console.log("Users, Doctors, and Patients seeded!");

  // Seed notifications
  const notifications = users.map(user => new Notification({
    user_id: user._id,
    content: faker.lorem.sentence(),
  }));
  await Notification.insertMany(notifications);
  console.log("Notifications seeded!");

  // Seed appointments
  const appointments = [];
  for (let i = 0; i < 5; i++) {
    const appointment = new Appointment({
      patient_id: patients[i]._id,
      doctor_id: doctors[i]._id,
      work_shift: faker.random.arrayElement(['morning', 'afternoon']),
      status: faker.random.arrayElement(['pending', 'confirmed', 'cancelled']),
    });
    appointments.push(appointment);
  }
  await Appointment.insertMany(appointments);
  console.log("Appointments seeded!");

  // Seed appointment history
  const appointmentHistories = appointments.map(app => new AppointmentHistory({
    status: app.status,
    date: faker.date.recent(),
    appointment_id: app._id,
    patient_id: app.patient_id,
    doctor_id: app.doctor_id,
  }));
  await AppointmentHistory.insertMany(appointmentHistories);
  console.log("Appointment histories seeded!");

  mongoose.connection.close();
};

seedDatabase();
