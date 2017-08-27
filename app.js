const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mailRouter = require('./contact/mail');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('build'));
app.use(mailRouter);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
