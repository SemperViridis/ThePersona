const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('../database');

const app = express();

app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.get('/api/items', (req, res) => {
  res.status(200);
  // items.selectAll((err, data) => {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.status(200).json(data);
  //   }
  // });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

module.exports = app;

