const express = require('express');
const { EMAIL_USER } = require('../config');
const smtpTransport = require('./transport');

const contactRouter = express.Router()

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