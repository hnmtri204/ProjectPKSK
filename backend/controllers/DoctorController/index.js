const bcrypt = require('bcrypt');
const Role = require("../../models/Role");
const User = require("../../models/User");
const UserRole = require("../../models/User_role");
const Doctor = require("../../models/Doctor");
const validateDoctor = require("../../requests/validateDoctor");

//{ key: value } là một đtuong trong js, thường dùng để crud
/*
{id} dgl "destructuring assignment" (gán giá trị phân rã) lấy các giá trị
từ đối tượng hoặc mảng và gán chúng vào các biến riêng biệt (cach viet khac id = user.id)
*/
/**
  populate dung de lấy dữ liệu từ các bảng (collections) khác trong MongoDB dựa trên các trường 
 tham chiếu (reference fields)
 */
//...req.body: Đây là cú pháp spread operator

const createDoctor = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateDoctor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 là số vòng băm

    const doctor = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Kiểm tra xem người dùng có được tạo thành công không
    if (doctor) {
      // Tìm ID của vai trò "doctor"
      const role = await Role.findOne({ name: "doctor" });

      if (!role) {
        return res.status(400).json({ message: "Role 'doctor' not found" });
      }

      // Tạo bản ghi trong bảng user_role
      await UserRole.create({ user_id: doctor._id, role_id: role._id });

      // Tạo bản ghi trong bảng doctor
      const specializationId = req.body.specialization_id;
      await Doctor.create({
        user_id: doctor._id,
        specialization_id: specializationId,
        description: req.body.description,
      });

      // Trả về thông tin người dùng
      res.status(200).json(doctor);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find({})
      .populate("user_id")
      .populate("specialization_id");

    if (doctors) {
      return res.status(200).json(doctors);
    } else {
      return res.status(404).json({ message: "Doctors not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id)
      .populate("user_id")
      .populate("specialization_id");
    if (doctor) {
      return res.status(200).json(doctor);
    } else {
      return res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Validate dữ liệu từ client
    const { error } = validateDoctor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const doctorUpdate = await Doctor.findByIdAndUpdate(id, req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(
      { _id: doctor.user_id },
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        image: req.body.image,
        phone: req.body.phone,
      }
    );
    return res.status(200).json(doctorUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
    // Xóa bác sĩ
    await Doctor.findByIdAndDelete(id);

    // Xóa info liên quan
    await User.deleteOne({ _id: doctor.user_id });
    await UserRole.deleteOne({ user_id: doctor.user_id });
    return res.status(200).json({ message: "Delete doctor success!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
  findAllDoctor,
  findDoctor,
  updateDoctor,
  deleteDoctor,
};
