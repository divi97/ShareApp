const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
// const jwt = require('jsonwebtoken');
const userOperations = require('../controllers/userOperations');

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


router.post('/create', userOperations.createUser);
router.post('/login', userOperations.login)

module.exports = router;