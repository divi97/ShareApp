const ErrorResponse = require('../utils/errorResponse');
const userModel = require("../models/user");

exports.addToFriendList = async (req, res, next) => {
  try {
    const from = await userModel.findById(req.body.id)
    const to = await userModel.findById(req.params.id)

    if (!from || !to) {
      return next(new ErrorResponse(`No user`, 404))
    }

    //Check if both are friends previously or not
    const found = from.friendList.includes(req.params.id)
    if (found) {
      return next(new ErrorResponse(`Already a friend`, 403))
    }

    from.friendList.push(req.params.id)
    to.friendList.push(req.body.id)

    await userModel.findByIdAndUpdate(req.body.id, {
      friendList: from.friendList
    })
    await userModel.findByIdAndUpdate(req.params.id, {
      friendList: to.friendList
    })
    res.status(200).json({ msg: "Added to friendlist" })
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}

exports.getFriendList = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userData.id)
    if (!user) {
      return next(new ErrorResponse(`No user`, 404))
    }
    user.friendList.map(async (id) => {
      const friend = await userModel.findById(id)
      user.friendListData.push(friend);
      await userModel.findByIdAndUpdate(req.userData.id, {
        friendListData: user.friendListData
      })
    });
    const updatedUser = await userModel.findById(req.userData.id)
    if (!updatedUser) {
      return next(new ErrorResponse(`No user`, 404))
    }
    updatedUser.friendList = []
    await userModel.findByIdAndUpdate(req.userData.id, {
      friendList: updatedUser.friendList
    });
    // console.log(updatedUser.friendListData);
    res.status(200).json(updatedUser.friendListData)
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}

exports.removeFriend = async (req, res, next) => {
  try {

    const from = await userModel.findById(req.body.id)
    const to = await userModel.findById(req.params.id)

    if (!from || !to) {
      return next(new ErrorResponse(`No user`, 404))
    }

    from.friendList.splice(from.friendList.indexOf(req.params.id), 1)
    to.friendList.splice(to.friendList.indexOf(req.body.id), 1)

    await userModel.findByIdAndUpdate(req.body.id, {
      friendList: from.friendList
    })
    await userModel.findByIdAndUpdate(req.params.id, {
      friendList: to.friendList
    })

    res.status(200).json({ msg: "Removed your friend" })
    
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}

exports.getuserlistoffriend = async (req, res, next) => {
  try {

    userModel.find({ $and : [{_id: { $ne : req.params.id }},{role: 'user'}] }).select("_id name email")
      .exec()
      .then(docs => {
        const response = {
          users: docs.map(doc => {
            return {
              id: doc._id,
              name: doc.name,
              email: doc.email
            }
          })
        }
        // console.log(response)
        res.status(200).json(response)
      })
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}