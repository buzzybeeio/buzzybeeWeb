const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailRouter = require('./contact/mail');
const subscribeRouter = require('./contact/subscribe');

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

// app.get(/.*\/$/, (req, res) => {
//   res.redirect(req.originalUrl.slice(0, -1));
// });

app.get('/.well-known/acme-challenge/_GyRakjNOQ6txnb8j_pxJ-YvTfBO-_GQ5S39fnnElUw', (req, res) => {
  res.send("_GyRakjNOQ6txnb8j_pxJ-YvTfBO-_GQ5S39fnnElUw.Sh6Vb9MeILvkeyM3wlDw2OkFFGTY04I7DX6HoBGb2ss");
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
