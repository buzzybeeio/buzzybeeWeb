const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const subscribeRouter = require('./contact/subscribe');
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const forceSsl = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && port != 3000) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.use(forceSsl);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(subscribeRouter);

app.get('/assets/*', (req, res, next) => {
  res.append('Cache-Control', 'max-age=604800000'); // 1 week
  next();
});

app.get('/static/*', (req, res, next) => {
  res.append('Cache-Control', 'max-age=2419200000'); // 4 weeks (doesn't matter because of react-script's cache busting)
  next();
});

app.use(express.static('build'));

app.get(/.*\/$/, (req, res) => {
  res.redirect(req.originalUrl.slice(0, -1));
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
