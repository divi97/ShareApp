"use strict";
const nodemailer = require("nodemailer");
const config = require('../constants/config')


async function main(email, emailToken) {

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
    to: email, 
    subject: "Confirm Email",
    html: `<h1>Confirm Email</h1><br><h3>Please click this link to confirm your email: <a href="${url}">Click here....</a>`,
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

module.exports = {main}