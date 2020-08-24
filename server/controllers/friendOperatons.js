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

//// NOTE : Needs changing (how to access changed value of arr outside map() scope)
exports.getFriendList = (req,res)=>{
  userModel.findById((req.body.id),(err,doc)=>{
    if(err){
      console.log(err);
      res.send("Error Occured while finding friend list");
    }
    if(doc){
      console.log(doc);

      // var arr1 = new Array();
      // for(let i=0;i<user.length;i++){
      //   arr1.push(new Object({"":}))
      // }
    }
  })
}






// exports.getFriendList = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.body.id)
//     console.log(user)
//     // console.log(user.friendList)

//     if (!user) {
//       return next(new ErrorResponse(`No user`, 404))
//     }
//     const response = user.friendList.map( async (id) => {
//       // console.log(id)

//       const friend = await userModel.findById(id)
//        //console.log(friend)
//       return friend
//       // console.log(arr)
//     });

//     // console.log(response)

//     res.status(200).json({frindlist: response})
//   } catch (err) {
//     return next(new ErrorResponse(`${err.message}`, 500))
//   }
// }

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