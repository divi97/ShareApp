const userModel = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');

exports.createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile: req.file.path
    }
    await userModel.create(user);
    res.status(201).json({
      msg: 'User Created Successfully',
    });
  } catch (err) {
    return next(
      new ErrorResponse(`Duplicate Value Entered ${err.message}`, 400)
    );
  }
};

exports.login = async (req, res, next) => {

  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    if (!email || !password) {
      return next(new ErrorResponse('Please Provide Email and Password', 400));
    }

    const user = await userModel.findOne({ email }).select('+password');
    console.log(user);

    if (!user) return next(new ErrorResponse('Invalid Credentials', 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('Invalid Credentials', 401));

    const token = user.getSignedJwtToken();

    console.log(token);
    res.status(200).json({
      msg: 'User logged in',
      token,
      id: user._id,
      role: user.role,
      blocked: user.blocked
    });

  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }


  // const user = {
  //     email: logUser.email,
  //     password: logUser.password
  // }

  // jwt.sign({user}, 'vinove' ,(err, token) => {
  //     res.json({
  //         token
  //     })
  // })
}

exports.get_allusers = (req, res, next) => {
  userModel.find({role: 'user'}).select("_id name email createdAt blocked role")
    .exec()
    .then(docs => {
      const response = {
        users: docs.map(doc => {
          return {
            id: doc._id,
            name: doc.name,
            email: doc.email,
            createdAt: doc.createdAt,
            blocked: doc.blocked,
            role:doc.role
          };
        })
      };
      res.status(200).json(response)
      
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
}



exports.update_block = async(req,res,next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.blocked = user.blocked ? false : true;
    await userModel.findByIdAndUpdate(req.params.id, { blocked: user.blocked });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

exports.update_online = async(req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.online = user.online ? false : true;
    await userModel.findByIdAndUpdate(req.params.id, { online: user.online });
    res.status(200).json(user);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

exports.get_activeusers = async(req, res, next) => {
  try {
    let users = await userModel.find({ online: true });
    users = users.length - 1 
    if (users == 0) {
      return next(new ErrorResponse(`No user`, 404));
    }
    res.status(200).json(users);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

exports.usercount = async(req, res, next) => {
  try {
    let count = await userModel.find({ role: 'user' });
    count = count.length
    if (count == 0) {
      return next(new ErrorResponse(`No user`, 404));
    }
    res.status(200).json(count);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}