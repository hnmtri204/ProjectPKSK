const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
      },
      work_date: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday ', 'sunday'],
        required: false,
      },
      work_shift: {
        type: String,
        enum: ['morning', 'afternoon'],
        required: false,
      },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Schedule", ScheduleSchema);
