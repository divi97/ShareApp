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
  if ((file.mimetype == 'image/jpeg') || (file.mimetype == 'image/png') || (file.mimetype == 'image/webp')) {
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

// router.post('/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'vinove', (err, authData) => {
//         if(err) {
//             res.sendStatus(403)
//         } else {
//             res.json({
//                 message: 'Post Created...',
//                 authData
//             })            
//         }
//     })

// })

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1]
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403)
//     }
// }


router.post('/create', upload.single('profile'), userOperations.createUser);
router.post('/login', userOperations.login)
router.get('/userlist',userOperations.get_allusers)
router.get('/activeusers', userOperations.get_activeusers);
router.get('/usercount', userOperations.usercount);
router.put('/updateblocked/:id', userOperations.update_blocked)
router.put('/updateonlinestatus/:id', userOperations.update_online);


module.exports = router;