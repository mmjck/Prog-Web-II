const multer = require('multer');
const path = require('path');

module.exports = {
  dest: path.resolve(__dirname, '../../public/uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '../../public/uploads'));
    },

    filename: (req, file, cb) => {
      const fileName = `product_image_${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Arquivo invalido'));
    }
  },
};
