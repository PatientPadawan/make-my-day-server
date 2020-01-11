const nodemailer = require('nodemailer');
const EMAIL_ACCESS_TOKEN = require('./get-token');
const { EMAIL_USER, EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_CLIENT_REFRESH_TOKEN } = require('../config');

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_USER, 
      clientId: EMAIL_CLIENT_ID,
      clientSecret: EMAIL_CLIENT_SECRET,
      refreshToken: EMAIL_CLIENT_REFRESH_TOKEN,
      accessToken: EMAIL_ACCESS_TOKEN
    }
});
  
smtpTransport.verify((error) => {
    if (error) {
        console.log(error);
    }
});

module.exports = smtpTransport