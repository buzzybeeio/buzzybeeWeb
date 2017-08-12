const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sendmail = require('sendmail')();

const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('build'))

app.post('/contact', (req, res) => {
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message
  console.log(name, email, message)
  sendmail({
    from: 'no-reply@yourdomain.com',
    to: 'thisisrailee@gmail.com',
    subject: `From ${email} by ${name}`,
    html: message,
  }, function (err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  })
  res.redirect('/')
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})