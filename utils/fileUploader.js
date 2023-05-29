const { MulterError } = require("multer");
const multer = require("multer");
const extensionMimeMappings = {
  "image/png": "png",
  "image/jpg": "jgp",
  "image/jpeg": "jpeg",
};
module.exports = {
  uploadMultipleFiles: (fileName, allowedExtensions, uploadPath) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      //set name for uploaded file
      filename: (req, file, cb) => {
        const fileNameParts = file.originalname.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];
        // cb(null, `${fileName}.${fileExtension}`)
        cb(null, Math.random() + "." + fileExtension);
      },
    });
    const fileFilter = (req, file, cb) => {
      //check file size type etc
      const mimeType = file.mimetype;
      if (allowedExtensions.includes(mimeType)) {
        cb(null, true);
      } else {
        const selectedFieldName = file.fieldname;
        cb(new Error(selectedFieldName + " : selected file types are not allowed"), false);
      }
    };
    return multer({ storage, fileFilter });
  },
  uploadSingleFile: (fileName, maxFileSize, allowedExtensions = [], uploadPath) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      //set name for uploaded file
      filename: (req, file, cb) => {
        const fileNameParts = file.originalname.split(".");
        const fileExtension = fileNameParts[fileNameParts.length - 1];
        cb(null, `${fileName}.${fileExtension}`);
      },
    });
    const fileFilter = (req, file, cb) => {
      //check file size type etc
      const mimeType = file.mimetype;
      if (allowedExtensions.includes(mimeType)) {
        cb(null, true);
      } else {
        const selectedFieldName = file.fieldname;
        cb(new Error(selectedFieldName + " : selected file type not allowed"), false);
      }
    };
    return multer({ storage, fileFilter });
  },
};
