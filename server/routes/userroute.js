const express = require('express');
const router = express.Router();
const multer = require('multer');
//const Auth = require('../middleware/check-auth');
const userModel = require('../models/user')
const userOperations = require('../controllers/userOperations');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image')
  ) {
    cb(null, true);
  } else {
    console.log('Only Image with jpeg or png extension');
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

router.post('/create', upload.single('profile'), userOperations.createUser);
router.post('/login', userOperations.login)
router.get('/userlist', userOperations.get_allusers)
router.get('/activeusers', userOperations.get_activeusers);
router.get('/usercount', userOperations.usercount);
router.put('/updateblocked/:id', userOperations.update_blocked)
router.put('/updateonlinestatus/:id', userOperations.update_online);
router.get('/confirmation/:token', userOperations.confirm);
router.post('/logout', userOperations.logout);

module.exports = router;