const express = require('express')
const nodemailer = require('nodemailer')
const { EMAIL_PASS, EMAIL_USER } = require('../config')

const contactRouter = express.Router()

const transport = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

contactRouter.post('/', (req, res, next) => {
  debugger
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

  transporter.sendMail(mail, (err, data) => {
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