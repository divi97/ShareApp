const ErrorResponse = require('../utils/errorResponse');
const userModel = require("../models/user");
const nodemailer = require("nodemailer")
const config = require('../constants/config')

exports.addToFriendList = async (req, res, next) => {
  try {
    const from = await userModel.findById(req.body.id)
    const to = await userModel.findById(req.params.id)

    if (!from || !to) {
      return next(new ErrorResponse(`No user`, 404))
    }

    //Check if both are friends previously or not
    for(let i=0; i< from.friendList.length; i++){
    const found = from.friendList[i].friendId._id.toString().includes(req.params.id)
    if (found) {
      return next(new ErrorResponse(`Already a friend`, 403))
    }
    }
    
    from.friendList.push({friendId : req.params.id})
    to.friendList.push({friendId : req.body.id})

    await userModel.findByIdAndUpdate(req.body.id, {
      friendList: from.friendList
    })
    await userModel.findByIdAndUpdate(req.params.id, {
      friendList: to.friendList
    })

    ///// Notification for added friend, NOTE: Friend request accepting can also be implemented

    const url = 'http://localhost:3000/'

    let transporter = nodemailer.createTransport({
      service:'gmail',
      host: "smtp.gmail.com",
      port: 465,
      ssl: true,
      auth: {
        user: config.username,
        pass: config.password
      },
    });

    let info = await transporter.sendMail({
      from: transporter.user, 
      to: to.email, 
      subject: "Friend Request",
      html: `<h1>Friend Request</h1><br><hr><h2>${from.name} added you as a friend. </h2><br><h2>Click <a href="${url}">here</a> to check out </h2>`,
    });

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


    if (!from || !to) {
      return next(new ErrorResponse(`No user`, 404))
    }

    for(let i = 0;i < from.friendList.length; i++){
      if (from.friendList[i].friendId._id.toString() === req.params.id){
        from.friendList.splice(i,1)
      }
    }
    for(let i = 0;i < to.friendList.length; i++){
      if (to.friendList[i].friendId._id.toString() === req.body.id){
        to.friendList.splice(i,1)
      }
    }
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