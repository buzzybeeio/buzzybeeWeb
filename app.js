const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailRouter = require('./contact/mail');
const subscribeRouter = require('./contact/subscribe');
// hi
const port = process.env.PORT || 3000;

const forceSsl = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && port != 3000) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.use(forceSsl);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use(mailRouter);
app.use(subscribeRouter);

app.get(/.*\/$/, (req, res) => {
  res.redirect(req.originalUrl.slice(0, -1));
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
