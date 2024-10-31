const bcrypt = require("bcrypt");
const User = require("../../models/User");
const RoleUser = require("../../models/User_role"); // Import model RoleUser
const Role = require("../../models/Role"); // Import model Role
const validateUser = require("../../requests/validateUser");

const login = async (req, res) => {
  try {
    // Validate dữ liệu từ client
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // console.log(user);

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    // Lấy danh sách role của người dùng
    const roleUsers = await RoleUser.find({ user_id: user._id }).populate('role_id');
    // console.log(roleUsers);

    // Lấy role đầu tiên (nếu có)
    const userRole = roleUsers.length > 0 ? roleUsers[0].role_id.name : null;

    // Lưu thông tin người dùng vào session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: userRole,
    };

    return res.status(200).json({
      message: "Login successful!",
      user: req.session.user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Xóa thông tin người dùng trong session
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: "Could not log out." });
      }
      return res.status(200).json({ message: "Logout successful!" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login, logout };
