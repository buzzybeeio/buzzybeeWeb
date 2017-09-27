const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailRouter = require('./contact/mail');

const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(mailRouter);

app.get('/.well-known/acme-challenge/t6d4ttYOi770nZn4fWNnP_4VqBzOPm0PPKTcCjv2IgU', (req, res) => {
  res.send('t6d4ttYOi770nZn4fWNnP_4VqBzOPm0PPKTcCjv2IgU.Sh6Vb9MeILvkeyM3wlDw2OkFFGTY04I7DX6HoBGb2ss')
})

app.get(/.*\/$/, (req, res) => {
  res.redirect(req.originalUrl.slice(0, -1));
})

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
