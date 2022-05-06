require("dotenv").config();
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid');

const transporter = nodemailer.createTransport(sendGrid({
  apiKey: process.env.SENDGRID_API_KEY
}));

const sendMail = async (data)=>{
  var mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: data.to,
    subject: data.subject,
    text: data.message
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  }
  catch(err)
  {
    return false;
  }
}

module.exports = {
  sendMail
}
