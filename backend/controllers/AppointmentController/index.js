const Appointment = require("../../models/Appointment");
const Appointment_history = require("../../models/Appointment_history");
const validateAppointment = require("../../requests/validateAppointment");

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
      doctor_id: appointment.doctor_id
    })
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

const updateAppointment = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateAppointment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    
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
        doctor_id: appointment.doctor_id
      },
      { new: true } // Trả về bản ghi đã cập nhật
    );

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
    await Appointment_history.findOneAndDelete({ appointment_id: appointment._id });
    return res.status(200).json({ message: "Delete appointment success!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// const patientCreateAppointment = async (req, res) => {
//   try {
   


//     const appointment = await Appointment.create({
//       ...req.body,
//       patient_id: req.user._id
//     });
//     await Appointment_history.create({
//       status: appointment.status,
//       appointment_id: appointment._id,
//       date: appointment.createdAt,
//       patient_id: appointment.patient_id,
//       doctor_id: appointment.doctor_id
//     })
//     if (appointment) {
//       return res.status(200).json(appointment);
//     }
//     return res.status(400).json({ message: "Appointment not found" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  createAppointment,
  findAllAppointment,
  findAppointment,
  updateAppointment,
  deleteAppointment,
  // patientCreateAppointment
};
