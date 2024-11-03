const jwt = require('jsonwebtoken');
JWT_SECRET = process.env.JWT_SECRET

const userMiddleware = (req, res, next) => {
<<<<<<< HEAD
    if (req.session && req.session.user) {
      req.user = req.session.user; 
    } else {
      return res.status(401).json({ message: "User not authenticated" });
=======
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
>>>>>>> f315e4ec09de88cbdf4efcd81cbedbf6c7d61f39
    }
    
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next();
  });
};

module.exports = userMiddleware;
