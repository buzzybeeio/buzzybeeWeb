const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'trialguest268@gmail.com', // Your email id
    pass: 'trial268' // Your password
  }
})

router.post('/contact', (req, res) => {
  console.log(req.body)
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message

  const mailOptions = {
    from: 'trialguest268@gmail.com', // sender address
    to: 'thisisrailee@gmail.com', // list of receivers
    subject: `From ${name} with email ${email}`, // Subject line
    text: `${message}`
  }
  
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    }else{
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    };
  });
})

module.exports = router