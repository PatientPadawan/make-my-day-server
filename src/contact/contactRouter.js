const express = require('express')
const nodemailer = require('nodemailer')
const { google } = require("googleapis");
const { EMAIL_USER, EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_CLIENT_REFRESH_TOKEN } = require('../config')

const contactRouter = express.Router()
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: EMAIL_CLIENT_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: EMAIL_USER, 
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_CLIENT_REFRESH_TOKEN,
    accessToken: accessToken
  }
});

smtpTransport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

contactRouter.post('/', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  const content = `name: ${name} \nemail: ${email} \nmessage: ${message} `

  const mail = {
    from: name,
    to: EMAIL_USER, 
    subject: 'New Message from Contact Form',
    text: content
  }

  smtpTransport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
      next();
    } else {
      res.json({
       status: 'success'
      })
      next();
    }
  })
})

module.exports = contactRouter