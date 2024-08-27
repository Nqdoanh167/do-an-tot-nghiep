/** @format */

const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../configs/cloudinary');
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   folder: 'img',
   allowedFormats: ['jpg', 'png', 'jepg'],
});
const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
      cb(null, true);
   } else {
      cb(new AppError('Not an image ! Please upload only images', 400), false);
   }
};
const upload = multer({
   storage: storage,
   fileFilter: multerFilter,
});
module.exports = upload;
