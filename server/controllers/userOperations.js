const userModel = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');
const nodemailer = require("nodemailer");
// const mailer = require('../utils/mailer')
const config = require('../constants/config');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile: req.file.path
    }
    const createdUser = await userModel.create(user);
    const emailToken = createdUser.getSignedJwtToken()

    // mailer.main(req.body.email, emailToken)
    const url = `http://localhost:1234/user/confirmation/${emailToken}`

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
      to: req.body.email, 
      subject: "Confirm Email",
      html: `<h1>Confirm Email</h1><br><h3>Please click this link to confirm your email: <a href="${url}">Click here....</a>`,
    });

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
    //console.log(email, password);

    if (!email || !password) {
      return next(new ErrorResponse('Please Provide Email and Password', 400));
    }

    const user = await userModel.findOne({ email }).select('+password');
    console.log(user);

    if (!user) return next(new ErrorResponse('Invalid Credentials', 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) return next(new ErrorResponse('Invalid Credentials', 401));
    
    // if(user.verified === false) return next(new ErrorResponse('Email not verified!!', 401));

    const token = await user.getSignedJwtToken();

    console.log(token);
    res.status(200).json({
      msg: 'User logged in',
      token,
      id: user._id,
      role: user.role,
      blocked: user.blocked,
      verified: user.verified
    });

    user.online = true
    await userModel.findOneAndUpdate({email}, { online: user.online })

  } catch (err) {
    return next(new ErrorResponse(`${err.message}`, 500));
  }

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
      }
      res.status(200).json(response)
      
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
}

exports.update_blocked = async(req,res,next) => {
  try {
    console.log(req.body.blockedStatus)
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`No user`, 404));
    }
    user.blocked = req.body.blockedStatus
    await userModel.findByIdAndUpdate(req.params.id, { blocked: user.blocked });
    //console.log(user);

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
          }
        })
      }
    
    res.status(200).json(response)
  })
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
    // user.online = req.body.onlineStatus             // For changing status when user is logged in or logged out
    user.online = user.online ? false : true;
    await userModel.findByIdAndUpdate(req.params.id, { online: user.online });
    res.status(200).json(user);
  } catch (err) {
  return next(new ErrorResponse(`${err.message}`, 500));
  }
}

exports.get_activeusers = async(req, res, next) => {
  try {
    let users = await userModel.find({ online: true, role: 'user' });
    users = users.length
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

exports.confirm = async(req, res) => {
  try{
    console.log(req.params.token)
    const decodedToken = jwt.verify(req.params.token, config.JWT_SECRET)
    console.log(decodedToken)
    await userModel.findByIdAndUpdate(decodedToken.id, {verified: true})
    res.redirect('http://localhost:3000')
  } catch(error) {
    res.send('error');
  }
}