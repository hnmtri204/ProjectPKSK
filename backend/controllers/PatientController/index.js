const bcrypt = require("bcrypt");
const Role = require("../../models/Role");
const User = require("../../models/User");
const UserRole = require("../../models/User_role");
const Doctor = require("../../models/Patient");
const validatePatient = require("../../requests/validatePatient");
const Patient = require("../../models/Patient");

//{ key: value } là một đtuong trong js, thường dùng để crud
/*
{id} dgl "destructuring assignment" (gán giá trị phân rã) lấy các giá trị
từ đối tượng hoặc mảng và gán chúng vào các biến riêng biệt (cach viet khac id = user.id)
*/
/**
  populate dung de lấy dữ liệu từ các bảng (collections) khác trong MongoDB dựa trên các trường 
 tham chiếu (reference fields)
 */
const createPatient = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validatePatient(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 là số vòng băm

    const patient = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Kiểm tra xem người dùng có được tạo thành công không
    if (patient) {
      // Tìm ID của vai trò "patient"
      const role = await Role.findOne({ name: "patient" });

      if (!role) {
        return res.status(400).json({ message: "Role 'patient' not found" });
      }

      // Tạo bản ghi trong bảng user_role
      await UserRole.create({ user_id: patient._id, role_id: role._id });

      // Tạo bản ghi trong bảng patient
      await Patient.create({
        user_id: patient._id,
      });

      // Trả về thông tin người dùng
      res.status(200).json(patient);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllPatient = async (req, res) => {
  try {
    const patient = await Patient.find({}).populate("user_id");

    if (patient) {
      return res.status(200).json(patient);
    } else {
      return res.status(400).json({ message: "Patient not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id).populate("user_id");
    if (patient) {
      return res.status(200).json(patient);
    } else {
      return res.status(400).json({ message: "Patient not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Validate dữ liệu từ client
    const { error } = validatePatient(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const patientUpdate = await Patient.findByIdAndUpdate(id, req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(
      { _id: patient.user_id },
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
      }
    );
    return res.status(200).json(patientUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }
    // Xóa benh nhan
    await Patient.findByIdAndDelete(id);

    // Xóa info liên quan
    await User.deleteOne({ _id: patient.user_id });
    await UserRole.deleteOne({ user_id: patient.user_id });
    return res.status(200).json({ message: "Delete patient success!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profilePatient = async (req, res) => {
  try {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Lấy tất cả thông tin từ session
    const userInfo = req.session.user;

    return res.status(200).json({
      message: "User information retrieved successfully",
      user: userInfo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfilePatient = async (req, res) => {
  try {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!req.session.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    // Lấy tất cả thông tin từ session
    const user_id = req.user.id;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.findByIdAndUpdate(user_id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const userUpdate = await User.findById(user_id);
    if (user) {

      return res.status(200).json({ userUpdate });
    }

    return res.status(400).json({
      message: "User not found!",
    });

  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  findAllPatient,
  findPatient,
  updatePatient,
  deletePatient,
  profilePatient,
  updateProfilePatient,
};
