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

    from.friendList.push({friendId : req.params.id})
    to.friendList.push({friendId : req.body.id})

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
    const populateQuery = [{ path: "friendList.friendId", select: '_id email name profile'}];    
    
    const user = await userModel.findById(req.params.id).populate(populateQuery)
    
    // console.log(user)

    if (!user) {
      return next(new ErrorResponse(`No user`, 404))
    }
    res.status(200).json({friendlist: user.friendList})
  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500))
  }
}

exports.removeFriend = async (req, res, next) => {
  try {

    const from = await userModel.findById(req.body.id)
    const to = await userModel.findById(req.params.id)

    console.log(from)

    if (!from || !to) {
      return next(new ErrorResponse(`No user`, 404))
    }

    // from.friendList.splice(from.friendList.friendId.indexOf(req.params.id), 1)
    // to.friendList.splice(to.friendList.friendId.indexOf(req.body.id), 1)

    for(const i = 0;i < from.friendList.length; i++){
      if (from.friendList.friendId._id === req.params.id){
        from.friendList.splice(i,1)
      }
    }
    console.log(from.friendList)

    
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

    userModel.find({ $and : [{_id: { $ne : req.params.id }},{role: 'user'}] }).select("_id name email profile")
      .exec()
      .then(docs => {
        const response = {
          users: docs.map(doc => {
            return {
              id: doc._id,
              name: doc.name,
              email: doc.email,
              profile: doc.profile
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