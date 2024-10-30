
const userMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
      req.user = req.session.user; 
    } else {
      return res.status(401).json({ message: "User not authenticated" }); // Nếu không có thông tin người dùng
    }
    next();
};

module.exports = userMiddleware;
