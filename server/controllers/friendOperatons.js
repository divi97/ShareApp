const ErrorResponse = require('../utils/errorResponse');
const userModel = require("../models/user");

exports.addToFriendList = async (req, res, next) => {
  try {
    const from = await userModel.findById(req.body.id)
    const to = await userModel.findById(req.params.id)

    if (!from || !to) {
      return next(new ErrorResponse(`No user`, 404))
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

    const user = await userModel.find({ _id: req.body.id }).select("friendList")
    console.log(user)

    user.friendList.map(async (id) => {
      const friends = await userModel.findById(id)

    })

    if (!user) {
      return next(new ErrorResponse(`No friends`, 404))
    }
    res.status(200).send("removed")
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}

exports.getuserlistoffriend = async (req, res, next) => {
  try {

    await userModel.find({ role: 'user' }).select("_id name email")
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
      })

    console.log(response)

    if (!user) {
      return next(new ErrorResponse(`No users`, 404))
    }
    res.status(200).json(reponse)
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}