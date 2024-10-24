const Specialization = require("../../models/Specialization");
const Notification = require("../../models/Notification");
const Doctor = require("../../models/Doctor");
const validateNotification = require("../../requests/validateNotification");

const createNotification = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateNotification(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const notification = await Notification.create(req.body);
    if (notification) {
      return res.status(200).json(notification);
    }
    return res.status(400).json({ message: "Notification not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    if (notifications) {
      return res.status(200).json(notifications);
    }
    return res.status(400).json({ message: "Notification not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (notification) {
      return res.status(200).json(notification);
    }
    return res.status(400).json({ message: "Notification not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateNotification = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateNotification(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {id} = req.params;
    const notification = await Notification.findByIdAndUpdate(id, req.body);
    if (!notification) {
      return res.status(400).json({ message: "Notification not found" });
    }
    const notificationUpdate = await Notification.findById(id);
    return res.status(200).json(notificationUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(400).json({ message: "Notification not found" });
    }
    await Notification.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete notification success!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createNotification, findAllNotification, findNotification, updateNotification, deleteNotification };
