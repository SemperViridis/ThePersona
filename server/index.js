const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const items = require('../database');


const app = express();

// UNCOMMENT FOR ANGULAR
app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

