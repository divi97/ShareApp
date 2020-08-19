const express = require('express');
const router = express.Router();
const multer = require('multer');
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

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 3000000
    },
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


module.exports = router;