const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    new_date: {
      type: Date,
      required: false,
    },
    new_work_shift: {
      type: String,
      enum: ['morning', 'afternoon'],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notification", NotificationSchema);
