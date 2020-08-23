const express = require('express');
const router = express.Router();
const friendOperations = require('../controllers/friendOperatons')

router.put('/addtofriendlist/:id', friendOperations.addToFriendList)
router.put('/removefriend/:id', friendOperations.removeFriend)
// router.post('/friendlist/:id', friendOperations.getFriendList)
router.post('/userlistoffriend/:id', friendOperations.getuserlistoffriend)

module.exports = router