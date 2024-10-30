const Appointment = require("../../models/Appointment");
const Appointment_history = require("../../models/Appointment_history");
const validateAppointment = require("../../requests/validateAppointment");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const Notification = require("../../models/Notification");
const transporter = require("../../helpers/mailer-config");
const User = require("../../models/User");
const moment = require("moment-timezone");

const createAppointment = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateAppointment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const appointment = await Appointment.create(req.body);
    await Appointment_history.create({
      status: appointment.status,
      appointment_id: appointment._id,
      date: appointment.createdAt,
      patient_id: appointment.patient_id,
      doctor_id: appointment.doctor_id,
    });
    if (appointment) {
      return res.status(200).json(appointment);
    }
    return res.status(400).json({ message: "Appointment not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    if (appointments) {
      return res.status(200).json(appointments);
    }
    return res.status(400).json({ message: "Appointment not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (appointment) {
      return res.status(200).json(appointment);
    }
    return res.status(400).json({ message: "Appointment not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const updateAppointment = async (req, res) => {
//   try {
//     // Validate dữ liệu từ client
//     const { error } = validateAppointment(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const { id } = req.params;
//     const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     if (!appointment) {
//       return res.status(400).json({ message: "Appointment not found" });
//     }

//     await Appointment_history.findOneAndUpdate(
//       { appointment_id: appointment._id },
//       {
//         status: appointment.status,
//         appointment_id: appointment._id,
//         date: appointment.updatedAt,
//         patient_id: appointment.patient_id,
//         doctor_id: appointment.doctor_id,
//       },
//       { new: true } // Trả về bản ghi đã cập nhật
//     );

//     const notification = await Notification.create({
//       patient_id: appointment.patient_id,
//       doctor_id: appointment.doctor_id,
//       content: `Your appointment changed`,
//       new_date: appointment.work_date,
//     });

//     const appointmentUpdate = await Appointment.findById(id);
//     return res.status(200).json(appointmentUpdate);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const updateAppointment = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateAppointment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!appointment) {
      return res.status(400).json({ message: "Appointment not found" });
    }

    await Appointment_history.findOneAndUpdate(
      { appointment_id: appointment._id },
      {
        status: appointment.status,
        appointment_id: appointment._id,
        date: appointment.updatedAt,
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id,
      },
      { new: true }
    );

    await Notification.create({
      content: `Your appointment has been changed.`,
      new_date: appointment.work_date,
      new_work_shift: appointment.work_shift
    });

    // Gửi email cho bệnh nhân
    const patient = await Patient.findById(appointment.patient_id);
    const doctor = await Doctor.findById(appointment.doctor_id);
    const patientInfo = await User.findOne({ _id: patient.user_id });
    const doctorInfo = await User.findOne({ _id: doctor.user_id });

    const vietnamTime = moment(appointment.work_date)
      .tz("Asia/Ho_Chi_Minh")
      .format("dddd, MMMM DD YYYY");

    const mailOptionsPatient = {
      from: process.env.EMAIL_USER,
      to: patientInfo.email,
      subject: "Notification Appointment",
      text: `Dear Patient, your appointment has been updated. \nNew date: ${vietnamTime}. \nTime: ${appointment.work_shift}.`,
    };

    const mailOptionsDoctor = {
      from: process.env.EMAIL_USER,
      to: doctorInfo.email,
      subject: "Notification Appointment",
      text: `Dear Doctor, your appointment with patient has been updated. \nNew date: ${vietnamTime}. \nTime: ${appointment.work_shift}.`,
    };

    // Gửi email
    await transporter.sendMail(mailOptionsPatient);
    await transporter.sendMail(mailOptionsDoctor);

    const appointmentUpdate = await Appointment.findById(id);
    return res.status(200).json(appointmentUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(400).json({ message: "Appointment not found" });
    }
    await Appointment.findByIdAndDelete(id);
    await Appointment_history.findOneAndDelete({
      appointment_id: appointment._id,
    });
    return res.status(200).json({ message: "Delete appointment success!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const patientCreateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      patient_id: req.user.id,
    });
    await Appointment_history.create({
      status: appointment.status,
      appointment_id: appointment._id,
      date: appointment.createdAt,
      patient_id: appointment.patient_id,
      doctor_id: appointment.doctor_id,
    });
    if (appointment) {
      return res.status(200).json(appointment);
    }
    return res.status(400).json({ message: "Appointment not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCurrentUserAppointments = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const user_role = req.user?.role;
    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    if (user_role === "patient") {
      const patient = await Patient.findOne({ user_id: user_id });
      if (!patient) {
        return res.status(400).json({ message: "User not found" });
      }
      const appointments = await Appointment.find({ patient_id: patient._id });
      if (appointments.length > 0) {
        return res.status(200).json(appointments);
      }
    } else if (user_role === "doctor") {
      const doctor = await Doctor.findOne({ user_id: user_id });
      if (!doctor) {
        return res.status(400).json({ message: "Doctor not found" });
      }

      const appointments = await Appointment.find({ doctor_id: doctor._id });
      if (appointments.length > 0) {
        return res.status(200).json(appointments);
      }
    }
    return res.status(404).json({ message: "No appointments found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  findAllAppointment,
  findAppointment,
  updateAppointment,
  deleteAppointment,
  patientCreateAppointment,
  getCurrentUserAppointments,
};
