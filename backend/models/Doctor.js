const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    specialization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialization",
        required: false
      },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Doctor", DoctorSchema);
