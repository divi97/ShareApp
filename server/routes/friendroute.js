const express = require('express');
const router = express.Router();
const friendOperations = require('../controllers/friendOperatons')

// router.get('/friendlist', friendOperations.getFriendList)
router.put('/addtofriendlist/:id', friendOperations.addToFriendList)
router.post('/removefriend', friendOperations.removeFriend)
router.post('/userlistoffriend/:id', friendOperations.getuserlistoffriend)

module.exports = router