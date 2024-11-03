const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
