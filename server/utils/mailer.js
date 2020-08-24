"use strict";
const nodemailer = require("nodemailer");
const config = require('../constants/config')

// async..await is not allowed in global scope, must use a wrapper
async function main(email, emailToken) {
  // let testAccount = await nodemailer.createTestAccount();
  const url = `http://localhost:1234/user/confirmation/${emailToken}`
  // create reusable transporter object using the default SMTP transport
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

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: transporter.user, 
    to: email, 
    subject: "Confirm Email",
    html: `<h1>Confirm Email</h1><br><h3>Please click this link to confirm your email: <a href="${url}">Click here....</a>`,
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

module.exports = {main}