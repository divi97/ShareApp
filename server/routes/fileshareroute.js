const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileShareOperations = require('../controllers/fileShareOperations');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'fileuploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') ||
    file.mimetype.startsWith('video') ||
    file.mimetype.startsWith('audio') ||
    file.mimetype == 'application/pdf' ||
    file.mimetype == 'text/plain'
  ) {
    cb(null, true);
  } else {
    console.log('Upload Images, videos, audios, PDF or text files only!');
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000
  },
  fileFilter
});


// Routes
router.post("/uploadfiles/:id", upload.array("files"), fileShareOperations.uploadFiles)
// router.post("/getuploadedfiles", fileShareOperations.getUploadedFiles)

module.exports = router