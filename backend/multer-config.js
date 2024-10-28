// // multer-config.js

// const multer = require('multer')
// const storage = multer.memoryStorage()  // store image in memory
// const upload = multer({storage:storage})

// module.exports = upload

const multer = require('multer');
const storage = multer.memoryStorage(); // Lưu trữ ảnh trong bộ nhớ
const upload = multer({ storage: storage });

module.exports = upload;
