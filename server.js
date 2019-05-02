const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen((process.env.PORT || PORT), (process.env.HOST || HOST));

console.log(`Running on http://${HOST}:${PORT}`);